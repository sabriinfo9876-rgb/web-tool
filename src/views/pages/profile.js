// Profile & Account Settings View: Manage Profile, Plan, Personal API Key, GitHub Connection, and Logout

import { getCurrentUser, logoutUser, upgradePlanSimulation } from "../../auth.js";
import { getCustomGeminiKey, setCustomGeminiKey, showToast, getDailyQuotaDetails } from "../../utils.js";
import { getPlanLimits } from "../../config/plans.js";

export function renderProfileView() {
  const user = getCurrentUser();
  const quota = getDailyQuotaDetails();
  const plan = user ? getPlanLimits(user.plan) : quota.plan;
  const customKey = getCustomGeminiKey();

  return `
    <div class="space-y-8 animate-fadeIn max-w-4xl mx-auto py-4">
      
      <!-- Header -->
      <div class="border-b border-slate-800 pb-4">
        <h1 class="text-2xl font-black text-white tracking-tight">Account &amp; Developer Settings</h1>
        <p class="text-xs text-slate-400 mt-1">Manage your developer profile, subscription plan, security keys, and connected integrations.</p>
      </div>

      <!-- Profile Info Card -->
      <div class="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 p-0.5 shadow-lg flex-shrink-0">
              <div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-mono font-bold text-xl text-white">
                ${user?.displayName?.charAt(0).toUpperCase() || "D"}
              </div>
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">${user?.displayName || "Developer Guest"}</h2>
              <p class="text-xs text-slate-400 font-mono">${user?.email || "Local Browser Session"}</p>
              <div class="flex items-center gap-2 mt-1.5">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  ${plan.badge} PLAN
                </span>
                <span class="text-[11px] text-slate-500">Member since 2026</span>
              </div>
            </div>
          </div>

          <div>
            ${user ? `
              <button id="profile-logout-btn" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-300 text-xs font-semibold border border-slate-700 transition">
                Sign Out
              </button>
            ` : `
              <button id="profile-signin-btn" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-500/25">
                Sign In / Register
              </button>
            `}
          </div>
        </div>
      </div>

      <!-- Subscription Plan & Quota Card -->
      <div class="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
            Current Subscription Plan
          </h3>
          <span class="text-xs text-slate-400 font-mono">${plan.name}</span>
        </div>

        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span class="text-slate-500 block">Plan Tier</span>
            <span class="font-bold text-white text-sm font-mono">${plan.badge}</span>
          </div>
          <div>
            <span class="text-slate-500 block">AI Daily Quota</span>
            <span class="font-bold text-indigo-300 text-sm font-mono">${quota.isUnlimited ? "Unlimited (Custom Key)" : `${quota.maxDaily} req / day`}</span>
          </div>
          <div>
            <span class="text-slate-500 block">Cloud Snippet Limit</span>
            <span class="font-bold text-amber-300 text-sm font-mono">${plan.snippetLimit === Infinity ? "Unlimited" : `${plan.snippetLimit} Snippets`}</span>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <a href="#/pricing" class="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold hover:opacity-95 transition shadow-lg shadow-indigo-500/20">
            ${plan.id === "free" ? "Upgrade to Pro ($19/mo)" : "Change / Manage Plan"}
          </a>
        </div>
      </div>

      <!-- Personal Gemini API Key Manager Card -->
      <div class="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-white flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
            Personal Google Gemini API Key
          </h3>
          <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Client-Side Override</span>
        </div>

        <p class="text-xs text-slate-400 leading-relaxed">
          Provide your personal Gemini API key to unlock unlimited AI transformations, design suggestions, code cleanups, and ZIP project debugging.
        </p>

        <div class="space-y-2">
          <label class="text-[11px] font-mono text-slate-300 block">Gemini API Key</label>
          <input 
            type="password" 
            id="profile-gemini-key-input" 
            placeholder="AIzaSy..." 
            value="${customKey}"
            class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-indigo-400"
          />
          <p class="text-[11px] text-amber-400/90 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Your API key is sensitive. Never share it publicly. It is stored securely in your browser session.
          </p>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button id="profile-save-key-btn" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition">Save Key</button>
        </div>
      </div>

    </div>
  `;
}

export function initProfileView() {
  const logoutBtn = document.getElementById("profile-logout-btn");
  const signinBtn = document.getElementById("profile-signin-btn");
  const saveKeyBtn = document.getElementById("profile-save-key-btn");
  const keyInput = document.getElementById("profile-gemini-key-input");

  logoutBtn?.addEventListener("click", async () => {
    await logoutUser();
    window.location.hash = "#/";
  });

  signinBtn?.addEventListener("click", () => {
    if (typeof window.openAuthModal === "function") window.openAuthModal();
  });

  saveKeyBtn?.addEventListener("click", () => {
    const val = keyInput?.value?.trim() || "";
    setCustomGeminiKey(val);
  });
}
