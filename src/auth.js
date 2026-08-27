// Web Developer Hub — User Authentication & State Manager
// Firebase Auth (Email/Password & Google OAuth) + Safepay Subscription Synchronization

import { auth, db } from "./firebase.js";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { showToast } from "./utils.js";

let currentUserState = null;
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
        notifyAuthListeners();
      }
      return data;
    }
  } catch (err) {
    console.warn("Could not sync verified Safepay subscription status:", err);
  }
  return null;
}

// Listen to Firebase Auth state
if (auth) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
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
      };

      // Sync server-verified Safepay subscription state
      syncVerifiedSubscriptionStatus(user.uid);
    } else {
      currentUserState = null;
    }
    notifyAuthListeners();
  });
}

export async function loginWithEmail(email, pass) {
  if (!auth) throw new Error("Firebase Auth is not initialized.");
  const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
  showToast(`Welcome back, ${cred.user.email}!`, "success");
  return cred.user;
}

export async function registerWithEmail(email, pass, name) {
  if (!auth) throw new Error("Firebase Auth is not initialized.");
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
  if (name && cred.user) {
    await updateProfile(cred.user, { displayName: name.trim() });
  }
  showToast("Account created successfully!", "success");
  return cred.user;
}

export async function loginWithGoogle() {
  if (!auth) throw new Error("Firebase Auth is not initialized.");
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);
  showToast(`Signed in as ${res.user.displayName || res.user.email}`, "success");
  return res.user;
}

export async function logoutUser() {
  if (!auth) return;
  await signOut(auth);
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
