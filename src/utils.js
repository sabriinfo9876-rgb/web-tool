// Global UI Utilities, Toast Notification, Quota & AI Service Client
import { PLANS, QUOTA_CONFIG, getPlanLimits } from "./config/plans.js";
import { getCurrentUser } from "./auth.js";

export { getPlanLimits };

export function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const colors = {
    success: "bg-emerald-950/90 border-emerald-500/50 text-emerald-300 shadow-emerald-900/30",
    error: "bg-rose-950/90 border-rose-500/50 text-rose-300 shadow-rose-900/30",
    info: "bg-indigo-950/90 border-indigo-500/50 text-indigo-300 shadow-indigo-900/30",
    warning: "bg-amber-950/90 border-amber-500/50 text-amber-300 shadow-amber-900/30",
  };

  const icons = {
    success: `<svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
    error: `<svg class="w-4 h-4 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
    info: `<svg class="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    warning: `<svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl text-xs font-semibold pointer-events-auto transition-all duration-300 transform translate-y-2 opacity-0 ${colors[type] || colors.info}`;
  toast.innerHTML = `
    ${icons[type] || icons.info}
    <span class="flex-1 leading-snug">${escapeHtml(message)}</span>
    <button class="text-slate-400 hover:text-white text-base leading-none ml-2" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

export function copyToClipboard(text, label = "Code") {
  if (!text) {
    showToast("Nothing to copy", "warning");
    return;
  }
  navigator.clipboard.writeText(text).then(
    () => showToast(`${label} copied to clipboard!`, "success"),
    () => showToast("Failed to copy to clipboard", "error")
  );
}

export function escapeHtml(str) {
  if (typeof str !== "string") return String(str || "");
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Daily Usage Quota Manager
const QUOTA_KEY = "webdevhub_daily_quota";

export function getDailyQuotaDetails() {
  const user = getCurrentUser();
  const plan = user ? getPlanLimits(user.plan) : PLANS.FREE;
  const maxDaily = plan.aiDailyLimit;
  const today = new Date().toISOString().split("T")[0];

  let used = 0;
  try {
    const raw = localStorage.getItem(QUOTA_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.date === today) {
        used = data.used || 0;
      } else {
        localStorage.setItem(QUOTA_KEY, JSON.stringify({ date: today, used: 0 }));
      }
    }
  } catch {
    used = 0;
  }

  const customKey = getCustomGeminiKey();
  const remaining = customKey ? Infinity : Math.max(0, maxDaily - used);

  return {
    plan,
    used,
    maxDaily,
    remaining,
    isUnlimited: Boolean(customKey),
    resetInHours: getHoursUntilMidnightUtc(),
  };
}

export function getRemainingDailyQuota() {
  const details = getDailyQuotaDetails();
  return details.remaining;
}

export function getHoursUntilMidnightUtc() {
  const now = new Date();
  const utcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  const diffMs = utcMidnight.getTime() - now.getTime();
  const diffHours = Math.max(1, Math.round(diffMs / (1000 * 60 * 60)));
  return diffHours;
}

export function consumeDailyQuota() {
  const customKey = getCustomGeminiKey();
  if (customKey) return true; // Custom key has unlimited quota

  const details = getDailyQuotaDetails();
  if (details.used >= details.maxDaily) {
    openUpgradeModal("AI Daily Limit Reached");
    return false;
  }

  const today = new Date().toISOString().split("T")[0];
  try {
    localStorage.setItem(QUOTA_KEY, JSON.stringify({ date: today, used: details.used + 1 }));
    updateHeaderQuotaDisplay();
    return true;
  } catch {
    return true;
  }
}

export function updateHeaderQuotaDisplay() {
  const customKey = getCustomGeminiKey();
  const headerElem = document.getElementById("header-quota-text");
  const modalElem = document.getElementById("modal-quota-stat");
  const details = getDailyQuotaDetails();

  if (customKey) {
    if (headerElem) headerElem.textContent = "Unlimited (Custom Key)";
    if (modalElem) modalElem.textContent = "Unlimited via Personal API Key";
    return;
  }

  const text = `${details.used}/${details.maxDaily} used (${details.plan.badge})`;
  if (headerElem) headerElem.textContent = text;
  if (modalElem) modalElem.textContent = `${details.remaining} of ${details.maxDaily} remaining today (Resets in ${details.resetInHours}h)`;
}

export function getCustomGeminiKey() {
  try {
    return localStorage.getItem("webdevhub_custom_gemini_key") || "";
  } catch {
    return "";
  }
}

export function setCustomGeminiKey(key) {
  try {
    if (key) {
      localStorage.setItem("webdevhub_custom_gemini_key", key.trim());
      showToast("Personal Gemini API key saved! Unlimited AI enabled.", "success");
    } else {
      localStorage.removeItem("webdevhub_custom_gemini_key");
      showToast("Personal Gemini API key removed.", "info");
    }
    updateHeaderQuotaDisplay();
  } catch (err) {
    showToast("Error saving key: " + err.message, "error");
  }
}

// Simple Line-by-Line Diff Computer for visual diffing
export function computeSimpleLineDiff(originalText = "", modifiedText = "") {
  const origLines = (originalText || "").split("\n");
  const modLines = (modifiedText || "").split("\n");
  const diff = [];
  
  const maxLen = Math.max(origLines.length, modLines.length);
  for (let i = 0; i < maxLen; i++) {
    const o = origLines[i];
    const m = modLines[i];
    
    if (o === undefined) {
      diff.push({ type: "added", text: m, lineNum: i + 1 });
    } else if (m === undefined) {
      diff.push({ type: "removed", text: o, lineNum: i + 1 });
    } else if (o !== m) {
      diff.push({ type: "removed", text: o, lineNum: i + 1 });
      diff.push({ type: "added", text: m, lineNum: i + 1 });
    } else {
      diff.push({ type: "unchanged", text: o, lineNum: i + 1 });
    }
  }
  return diff;
}

// Global API Helper for AI tasks via secure backend proxy
export async function callAiAssist(task, prompt, context = "") {
  const customKey = getCustomGeminiKey();
  const user = getCurrentUser();

  const res = await fetch("/api/ai/assist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(customKey ? { "x-gemini-api-key": customKey } : {}),
      ...(user ? { "x-user-plan": user.plan } : {}),
    },
    body: JSON.stringify({
      task,
      prompt,
      context,
      customApiKey: customKey || undefined,
      userPlan: user?.plan || "free",
    }),
  });

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error("Daily AI quota reached. Please upgrade to Pro or provide your own Gemini API Key.");
    }
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.error || `Server returned status ${res.status}`);
  }
  return await res.json();
}

// Global Upgrade Modal Trigger
export function openUpgradeModal(featureName = "Developer Pro Feature") {
  if (typeof window.openProUpgradeModal === "function") {
    window.openProUpgradeModal(featureName);
  } else {
    window.location.hash = "#/pricing";
  }
}
