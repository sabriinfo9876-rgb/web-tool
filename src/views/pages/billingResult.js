// Web Developer Hub — Safepay Payment Result & Status Verification View
// Verifies server-side payment state with Safepay without trusting client parameters

import { getCurrentUser } from "../../auth.js";
import { showToast } from "../../utils.js";

export function renderBillingSuccessView() {
  return `
    <div class="max-w-xl mx-auto py-12 px-4 animate-fadeIn text-center space-y-6">
      <div id="billing-loading-card" class="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <svg class="w-7 h-7 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white tracking-tight">Verifying Safepay Payment...</h2>
        <p class="text-xs text-slate-400 leading-relaxed">
          Contacting secure Safepay servers to verify payment settlement and activate your Developer Pro workspace.
        </p>
      </div>

      <div id="billing-verified-card" class="hidden p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-5">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div class="space-y-1.5">
          <span class="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
            Payment Verified &amp; Active
          </span>
          <h2 class="text-2xl font-black text-white tracking-tight">Welcome to Developer Pro!</h2>
          <p class="text-xs text-slate-300 leading-relaxed max-w-md mx-auto" id="verified-plan-desc">
            Your Pro plan is active. You now have full access to high-capacity AI operations, automated GitHub project repair, and unlimited cloud snippet storage.
          </p>
        </div>
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#/dashboard" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 text-white text-xs font-bold transition shadow-lg shadow-indigo-500/20">
            Open Dashboard &rarr;
          </a>
          <a href="#/tools/fix-github-project" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700">
            Try GitHub Repair Engine
          </a>
        </div>
      </div>

      <div id="billing-pending-card" class="hidden p-8 rounded-3xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-5">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="space-y-1.5">
          <span class="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
            Verification Pending
          </span>
          <h2 class="text-xl font-bold text-white tracking-tight">Payment is Being Processed</h2>
          <p class="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
            Safepay is settling your payment. As soon as the webhook event confirms settlement, your account will activate automatically.
          </p>
        </div>
        <div class="pt-3">
          <a href="#/dashboard" class="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition">
            Go to Dashboard
          </a>
        </div>
      </div>

      <div id="billing-failed-card" class="hidden p-8 rounded-3xl bg-slate-900 border border-rose-500/40 shadow-2xl space-y-5">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
        <div class="space-y-1.5">
          <span class="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
            Payment Incomplete
          </span>
          <h2 class="text-xl font-bold text-white tracking-tight">Payment Was Not Completed</h2>
          <p class="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
            We could not verify a successful transaction with Safepay. No charges were made to your account.
          </p>
        </div>
        <div class="pt-3 flex items-center justify-center gap-3">
          <a href="#/pricing" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition">
            Return to Pricing
          </a>
        </div>
      </div>
    </div>
  `;
}

export async function initBillingSuccessView() {
  const loadingCard = document.getElementById("billing-loading-card");
  const verifiedCard = document.getElementById("billing-verified-card");
  const pendingCard = document.getElementById("billing-pending-card");
  const failedCard = document.getElementById("billing-failed-card");

  const urlParams = new URLSearchParams(window.location.search || window.location.hash.split("?")[1] || "");
  const tracker = urlParams.get("tracker") || urlParams.get("beacon") || urlParams.get("order_id");
  const user = getCurrentUser();
  const userId = user?.uid || "";

  try {
    // Poll server verification endpoint
    let attempts = 0;
    let verified = false;

    while (attempts < 6 && !verified) {
      attempts++;
      const res = await fetch(`/api/safepay/verify-tracker?tracker=${encodeURIComponent(tracker || "")}&userId=${encodeURIComponent(userId)}`, {
        headers: { "x-user-id": userId },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.verified || data.status === "active" || data.status === "PAID" || data.status === "COMPLETED") {
          verified = true;
          if (user) user.plan = data.plan || "pro";
          loadingCard?.classList.add("hidden");
          verifiedCard?.classList.remove("hidden");
          showToast("Payment verified! Developer Pro activated.", "success");
          return;
        }
      }
      // Wait 1.5 seconds between polling attempts
      await new Promise((r) => setTimeout(r, 1500));
    }

    // If still not verified after polling, check general server subscription status
    const statusRes = await fetch(`/api/safepay/subscription-status?userId=${encodeURIComponent(userId)}`, {
      headers: { "x-user-id": userId },
    });
    const statusData = await statusRes.json();

    loadingCard?.classList.add("hidden");
    if (statusData.isPaid || statusData.status === "active") {
      if (user) user.plan = statusData.plan;
      verifiedCard?.classList.remove("hidden");
    } else {
      pendingCard?.classList.remove("hidden");
    }
  } catch (err) {
    loadingCard?.classList.add("hidden");
    failedCard?.classList.remove("hidden");
    console.error("Safepay verification check error:", err);
  }
}

export function renderBillingCancelView() {
  return `
    <div class="max-w-xl mx-auto py-12 px-4 animate-fadeIn text-center space-y-6">
      <div class="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
        <div class="space-y-1.5">
          <span class="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
            Checkout Canceled
          </span>
          <h2 class="text-2xl font-black text-white tracking-tight">Payment Canceled</h2>
          <p class="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
            Payment was canceled. Your account has not been upgraded and remains on the Free tier. You can return anytime when you are ready.
          </p>
        </div>
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#/pricing" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-500/20">
            Return to Pricing
          </a>
          <a href="#/dashboard" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition">
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  `;
}

export function initBillingCancelView() {
  // No-op initial handler for clean static render
}
