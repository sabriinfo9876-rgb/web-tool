import { auth, db, firebaseConfig } from "./firebase.js";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { showToast } from "./utils.js";

const SANDBOX_STORAGE_KEY = "webdevhub_sandbox_session_v1";

// Check if running in iframe / sandboxed preview
export function isRunningInIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

// Environment helper
export function getAppEnvironment() {
  const hostname = window.location.hostname || "localhost";
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.startsWith("192.168.")) {
    return "development";
  }
  if (hostname.includes("run.app") || hostname.includes("preview") || hostname.includes("vercel.app") || hostname.includes("dev")) {
    return "preview";
  }
  return "production";
}

// Attempt to restore sandbox session on start if Firebase auth hasn't set currentUser
let currentUserState = null;
try {
  const savedSandbox = localStorage.getItem(SANDBOX_STORAGE_KEY);
  if (savedSandbox) {
    currentUserState = JSON.parse(savedSandbox);
  }
} catch (e) {
  console.warn("Could not load stored sandbox auth:", e);
}

const authListeners = new Set();

export function getCurrentUser() {
  return currentUserState;
}

export function subscribeToAuth(callback) {
  authListeners.add(callback);
  callback(currentUserState);
  return () => authListeners.delete(callback);
}

function notifyAuthListeners() {
  authListeners.forEach((fn) => {
    try {
      fn(currentUserState);
    } catch (e) {
      console.error("Auth listener error:", e);
    }
  });
}

/**
 * Human-friendly error translation for Firebase Authentication codes
 */
export function getFriendlyAuthErrorMessage(err) {
  if (!err) return "An unknown authentication error occurred.";
  const msg = err.message || String(err);
  const code = err.code || "";

  if (code === "auth/unauthorized-domain" || msg.includes("unauthorized-domain")) {
    return `Authentication domain not authorized. The current domain '${window.location.hostname}' is not yet in Firebase's Authorized Domains list.`;
  }
  if (code === "auth/popup-blocked" || msg.includes("popup-blocked")) {
    return "Google Sign-In popup was blocked by your browser or container iframe. We'll use redirect authentication or you can use Developer Sandbox login.";
  }
  if (code === "auth/popup-closed-by-user" || msg.includes("popup-closed-by-user")) {
    return "Authentication Cancelled: The sign-in popup was closed before completing.";
  }
  if (code === "auth/cancelled-popup-request" || msg.includes("cancelled-popup-request")) {
    return "Another sign-in window was already opened. Please complete authentication in that window.";
  }
  if (code === "auth/operation-not-allowed" || msg.includes("operation-not-allowed")) {
    return "Sign-In Method Disabled: This authentication provider is not enabled in Firebase Console. You can use Instant Demo Sign-In or enable it in Firebase.";
  }
  if (code === "auth/email-already-in-use" || msg.includes("email-already-in-use")) {
    return "An account with this email address already exists. Please switch to the 'Sign In' tab.";
  }
  if (code === "auth/wrong-password" || code === "auth/invalid-credential" || msg.includes("invalid-credential")) {
    return "Invalid email or password. Please verify your credentials or create a new account.";
  }
  if (code === "auth/user-not-found" || msg.includes("user-not-found")) {
    return "No account registered with this email. Switch to 'Create Account' to sign up.";
  }
  if (code === "auth/weak-password" || msg.includes("weak-password")) {
    return "Password is too weak. Please use at least 6 characters.";
  }
  if (code === "auth/invalid-email" || msg.includes("invalid-email")) {
    return "Please enter a valid email address.";
  }
  if (code === "auth/network-request-failed" || msg.includes("network-request-failed")) {
    return "Unable to connect to the authentication service. Please check your internet connection and try again.";
  }

  return msg.replace(/^Firebase:\s*Error\s*\((.*?)\)\.?/, "$1");
}

// Fetch verified subscription status from server
export async function syncVerifiedSubscriptionStatus(userId) {
  if (!userId) return null;
  try {
    const res = await fetch(`/api/safepay/subscription-status?userId=${encodeURIComponent(userId)}`, {
      headers: { "x-user-id": userId },
    });
    if (res.ok) {
      const data = await res.json();
      if (currentUserState && currentUserState.uid === userId && data.plan) {
        currentUserState.plan = data.plan;
        currentUserState.isPaid = Boolean(data.isPaid);
        currentUserState.currentPeriodEnd = data.currentPeriodEnd;
        if (currentUserState.isSandbox) {
          localStorage.setItem(SANDBOX_STORAGE_KEY, JSON.stringify(currentUserState));
        }
        notifyAuthListeners();
      }
      return data;
    }
  } catch (err) {
    console.warn("Could not sync verified Safepay subscription status:", err);
  }
  return null;
}

// Check redirect result on initialization
if (auth) {
  getRedirectResult(auth).then((result) => {
    if (result && result.user) {
      showToast(`Signed in as ${result.user.displayName || result.user.email}`, "success");
    }
  }).catch((err) => {
    console.warn("Redirect auth result notice:", err);
  });

  // Listen to Firebase Auth state
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Clear sandbox override if real Firebase user authenticates
      try {
        localStorage.removeItem(SANDBOX_STORAGE_KEY);
      } catch (e) {}

      const today = new Date().toISOString().split("T")[0];
      let userDocData = null;

      try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          userDocData = snap.data();
        } else {
          // Initialize new user profile document in Firestore
          userDocData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split("@")[0] || "Developer",
            photoURL: user.photoURL || null,
            plan: "free",
            createdAt: new Date().toISOString(),
            aiUsageToday: 0,
            lastAiUsageDate: today,
          };
          await setDoc(userRef, userDocData, { merge: true });
        }
      } catch (err) {
        console.warn("Firestore user profile fetch warning (using fallback):", err);
        userDocData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split("@")[0] || "Developer",
          photoURL: user.photoURL || null,
          plan: "free",
          createdAt: new Date().toISOString(),
          aiUsageToday: 0,
          lastAiUsageDate: today,
        };
      }

      currentUserState = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || userDocData?.displayName || user.email?.split("@")[0] || "Developer",
        photoURL: user.photoURL || userDocData?.photoURL || null,
        plan: userDocData?.plan || "free",
        createdAt: userDocData?.createdAt || new Date().toISOString(),
        aiUsageToday: userDocData?.lastAiUsageDate === today ? (userDocData?.aiUsageToday || 0) : 0,
        lastAiUsageDate: today,
        githubConnected: Boolean(userDocData?.githubConnected),
        githubUsername: userDocData?.githubUsername || undefined,
        isSandbox: false,
      };

      // Sync server-verified Safepay subscription state
      syncVerifiedSubscriptionStatus(user.uid);
    } else {
      // If no Firebase user, check if we have a valid sandbox user session
      try {
        const savedSandbox = localStorage.getItem(SANDBOX_STORAGE_KEY);
        if (savedSandbox) {
          currentUserState = JSON.parse(savedSandbox);
        } else {
          currentUserState = null;
        }
      } catch (e) {
        currentUserState = null;
      }
    }
    notifyAuthListeners();
  });
}

export async function loginWithEmail(email, pass) {
  if (!auth) throw new Error("Firebase Auth is not initialized.");
  try {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
    showToast(`Welcome back, ${cred.user.email}!`, "success");
    return cred.user;
  } catch (err) {
    const friendly = getFriendlyAuthErrorMessage(err);
    const errorWithFriendly = new Error(friendly);
    errorWithFriendly.original = err;
    errorWithFriendly.code = err.code;
    throw errorWithFriendly;
  }
}

export async function registerWithEmail(email, pass, name) {
  if (!auth) throw new Error("Firebase Auth is not initialized.");
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    if (name && cred.user) {
      await updateProfile(cred.user, { displayName: name.trim() });
    }
    showToast("Account created successfully!", "success");
    return cred.user;
  } catch (err) {
    const friendly = getFriendlyAuthErrorMessage(err);
    const errorWithFriendly = new Error(friendly);
    errorWithFriendly.original = err;
    errorWithFriendly.code = err.code;
    throw errorWithFriendly;
  }
}

/**
 * Robust Google Authentication with Popup and Redirect Fallback
 */
export async function loginWithGoogle() {
  if (!auth) throw new Error("Firebase Auth is not initialized.");
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    // Attempt popup login first
    const res = await signInWithPopup(auth, provider);
    showToast(`Signed in as ${res.user.displayName || res.user.email}`, "success");
    return res.user;
  } catch (err) {
    const code = err.code || "";
    // If popup was blocked or iframe restriction detected, fallback to redirect
    if (code === "auth/popup-blocked" || code === "auth/cancelled-popup-request") {
      try {
        showToast("Popup blocked by browser. Initiating secure redirect sign-in...", "info");
        await signInWithRedirect(auth, provider);
        return null;
      } catch (redirectErr) {
        const friendly = getFriendlyAuthErrorMessage(redirectErr);
        const errorWithFriendly = new Error(friendly);
        errorWithFriendly.original = redirectErr;
        errorWithFriendly.code = redirectErr.code;
        throw errorWithFriendly;
      }
    }

    const friendly = getFriendlyAuthErrorMessage(err);
    const errorWithFriendly = new Error(friendly);
    errorWithFriendly.original = err;
    errorWithFriendly.code = err.code;
    throw errorWithFriendly;
  }
}

/**
 * Deterministic Sandbox / Developer Testing Authentication
 * Available in development and preview modes for testing tools, quotas, and Safepay.
 */
export function loginWithSandbox(plan = "free", customProfile = {}) {
  const isPro = plan === "pro" || plan === "team";
  const defaultEmail = customProfile.email || (isPro ? "pro-developer@example.com" : "developer@example.com");
  const defaultName = customProfile.displayName || (isPro ? "Alan Turing (Pro)" : "Ada Lovelace (Free)");
  const uid = customProfile.uid || (isPro ? "sandbox_pro_alanturing" : "sandbox_free_adalovelace");

  const sandboxUser = {
    uid,
    email: defaultEmail,
    displayName: defaultName,
    photoURL: null,
    plan,
    isPaid: isPro,
    createdAt: "2026-01-01T00:00:00.000Z",
    aiUsageToday: 0,
    lastAiUsageDate: new Date().toISOString().split("T")[0],
    githubConnected: false,
    isSandbox: true,
  };

  try {
    localStorage.setItem(SANDBOX_STORAGE_KEY, JSON.stringify(sandboxUser));
  } catch (e) {}

  currentUserState = sandboxUser;
  notifyAuthListeners();
  showToast(`Signed in as ${sandboxUser.displayName} (${plan.toUpperCase()} Sandbox)`, "success");
  return sandboxUser;
}

export async function logoutUser() {
  try {
    localStorage.removeItem(SANDBOX_STORAGE_KEY);
  } catch (e) {}

  if (auth) {
    try {
      await signOut(auth);
    } catch (e) {}
  }
  currentUserState = null;
  notifyAuthListeners();
  showToast("You have been signed out.", "info");
}

export async function initiateCheckout(targetPlan = "pro", interval = "month") {
  if (!currentUserState) {
    showToast("Please sign in or create an account first.", "warning");
    if (typeof window.openAuthModal === "function") {
      window.openAuthModal();
    } else {
      window.location.hash = "#/";
    }
    return;
  }

  showToast("Connecting to Safepay secure checkout...", "info");
  try {
    const successUrl = `${window.location.origin}/#/billing/success`;
    const cancelUrl = `${window.location.origin}/#/billing/cancel`;

    const res = await fetch("/api/safepay/create-checkout-session", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-user-id": currentUserState.uid,
      },
      body: JSON.stringify({
        plan: targetPlan,
        interval,
        userId: currentUserState.uid,
        userEmail: currentUserState.email,
        successUrl,
        cancelUrl,
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
      return;
    }

    if (data.configured === false && data.sandboxUrl) {
      window.location.href = data.sandboxUrl;
      return;
    }

    throw new Error(data.error || data.message || "Failed to initialize Safepay checkout.");
  } catch (err) {
    showToast("Safepay checkout error: " + err.message, "error");
  }
}

export async function upgradePlanSimulation(targetPlan) {
  return initiateCheckout(targetPlan, "month");
}

