// Pricing View: Free vs Pro vs Team Plans with Safepay Integration & Dynamic Monthly/Annual Toggle

import { PLANS } from "../../config/plans.js";
import { getCurrentUser, initiateCheckout } from "../../auth.js";
import { showToast } from "../../utils.js";

export function renderPricingView() {
  const user = getCurrentUser();
  const currentPlan = user?.plan || "free";

  return `
    <div class="space-y-10 animate-fadeIn max-w-6xl mx-auto py-4">
      
      <!-- Pricing Header -->
      <div class="text-center space-y-3 max-w-2xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <span>Official Safepay Merchant Gateway</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Supercharge Your Workflow with <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300">WebDevHub Pro</span>
        </h1>
        <p class="text-slate-400 text-sm sm:text-base leading-relaxed">
          Start free with all 74 developer utilities and 74 daily AI operations, or upgrade to Pro for 3,000 monthly AI operations, automated GitHub project repair, and unlimited cloud vault storage.
        </p>

        <!-- Billing Toggle (Monthly / Annual) -->
        <div class="pt-4 flex items-center justify-center gap-3 text-xs font-medium">
          <span id="label-monthly" class="text-white font-bold">Monthly Billing</span>
          <button id="billing-toggle-btn" class="w-12 h-6 bg-slate-800 rounded-full p-1 border border-slate-700 transition relative">
            <div id="toggle-thumb" class="w-4 h-4 rounded-full bg-indigo-500 transition-transform"></div>
          </button>
          <span id="label-annual" class="text-slate-400">Annual Billing <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Save ~38%</span></span>
        </div>
      </div>

      <!-- Pricing Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        
        <!-- FREE PLAN -->
        <div class="rounded-3xl bg-slate-900/80 border ${currentPlan === "free" ? "border-indigo-500/40" : "border-slate-800"} p-6 sm:p-8 flex flex-col justify-between shadow-xl relative backdrop-blur-md">
          ${currentPlan === "free" ? '<div class="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white font-mono uppercase tracking-wider">Your Current Plan</div>' : ""}
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold text-white">${PLANS.FREE.name}</h3>
              <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">Free Forever</span>
            </div>
            <p class="text-xs text-slate-400">Essential client-side developer toolbox and generous daily AI access.</p>
            <div class="py-2">
              <span class="text-4xl font-extrabold text-white font-mono">$0</span>
              <span class="text-xs text-slate-400">/ month</span>
            </div>
            <ul class="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              ${PLANS.FREE.features.map(f => `
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  <span>${f}</span>
                </li>
              `).join("")}
            </ul>
          </div>
          <div class="pt-6">
            <button class="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold transition cursor-default">
              ${currentPlan === "free" ? "Current Plan" : "Downgrade to Free"}
            </button>
          </div>
        </div>

        <!-- PRO PLAN -->
        <div class="rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/80 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative backdrop-blur-md transform md:-translate-y-2">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-mono tracking-wider shadow-lg shadow-indigo-500/30 uppercase">
            Most Popular
          </div>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold text-white flex items-center gap-1.5">
                ${PLANS.PRO.name}
                <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">PRO</span>
              </h3>
            </div>
            <p class="text-xs text-slate-300">For active developers needing high AI limits and GitHub repair automation.</p>
            <div class="py-2">
              <span id="price-pro" class="text-4xl font-extrabold text-white font-mono">$7.99</span>
              <span id="period-pro" class="text-xs text-slate-400">/ month</span>
            </div>
            <ul class="space-y-2.5 text-xs text-slate-200 pt-2 border-t border-slate-800/80">
              ${PLANS.PRO.features.map(f => `
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  <span>${f}</span>
                </li>
              `).join("")}
            </ul>
          </div>
          <div class="pt-6">
            <button id="upgrade-pro-btn" class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:opacity-95 text-white text-xs font-bold transition shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
              <span id="btn-text-pro">${currentPlan === "pro" ? "Current Active Plan" : "Upgrade to Pro"}</span>
            </button>
          </div>
        </div>

        <!-- TEAM PLAN -->
        <div class="rounded-3xl bg-slate-900/80 border ${currentPlan === "team" ? "border-purple-500/60" : "border-slate-800"} p-6 sm:p-8 flex flex-col justify-between shadow-xl relative backdrop-blur-md">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold text-white">${PLANS.TEAM.name}</h3>
              <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">Teams</span>
            </div>
            <p class="text-xs text-slate-400">Shared workspace, team snippet libraries, and unified billing.</p>
            <div class="py-2">
              <span id="price-team" class="text-4xl font-extrabold text-white font-mono">$29</span>
              <span id="period-team" class="text-xs text-slate-400">/ month</span>
            </div>
            <ul class="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              ${PLANS.TEAM.features.map(f => `
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-purple-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  <span>${f}</span>
                </li>
              `).join("")}
            </ul>
          </div>
          <div class="pt-6">
            <button id="upgrade-team-btn" class="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-lg shadow-purple-500/20">
              <span>${currentPlan === "team" ? "Current Active Plan" : "Upgrade to Team"}</span>
            </button>
          </div>
        </div>

      </div>

      <!-- Secure Payment Gateways Badge -->
      <div class="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 text-slate-300">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 class="text-sm font-bold text-white flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              Safepay Enterprise Security
            </h4>
            <p class="text-xs text-slate-400 mt-0.5">
              Encrypted end-to-end checkout with Pakistan &amp; International card support, mobile wallets, and instant settlement.
            </p>
          </div>
          <div class="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span class="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">Visa / Mastercard</span>
            <span class="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">PayPak</span>
            <span class="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">Safepay Checkout</span>
          </div>
        </div>
      </div>

    </div>
  `;
}

export function initPricingView() {
  const toggleBtn = document.getElementById("billing-toggle-btn");
  const toggleThumb = document.getElementById("toggle-thumb");
  const labelMonthly = document.getElementById("label-monthly");
  const labelAnnual = document.getElementById("label-annual");
  const pricePro = document.getElementById("price-pro");
  const priceTeam = document.getElementById("price-team");
  const periodPro = document.getElementById("period-pro");
  const periodTeam = document.getElementById("period-team");
  const upgradeProBtn = document.getElementById("upgrade-pro-btn");
  const upgradeTeamBtn = document.getElementById("upgrade-team-btn");
  const btnTextPro = document.getElementById("btn-text-pro");

  let isAnnual = false;

  toggleBtn?.addEventListener("click", () => {
    isAnnual = !isAnnual;
    if (isAnnual) {
      toggleThumb?.classList.add("translate-x-6");
      toggleBtn?.classList.add("bg-indigo-600");
      toggleBtn?.classList.remove("bg-slate-800");
      labelMonthly?.classList.replace("text-white", "text-slate-400");
      labelMonthly?.classList.remove("font-bold");
      labelAnnual?.classList.replace("text-slate-400", "text-white");
      labelAnnual?.classList.add("font-bold");

      if (pricePro) pricePro.textContent = `$${PLANS.PRO.priceAnnual}`;
      if (periodPro) periodPro.textContent = "/ year ($4.92/mo billed annually)";
      if (priceTeam) priceTeam.textContent = `$${PLANS.TEAM.priceAnnual}`;
      if (periodTeam) periodTeam.textContent = "/ year ($24.16/mo billed annually)";
      if (btnTextPro) btnTextPro.textContent = "Get Pro Annual ($59/yr)";
    } else {
      toggleThumb?.classList.remove("translate-x-6");
      toggleBtn?.classList.remove("bg-indigo-600");
      toggleBtn?.classList.add("bg-slate-800");
      labelMonthly?.classList.replace("text-slate-400", "text-white");
      labelMonthly?.classList.add("font-bold");
      labelAnnual?.classList.replace("text-white", "text-slate-400");
      labelAnnual?.classList.remove("font-bold");

      if (pricePro) pricePro.textContent = `$${PLANS.PRO.priceMonthly}`;
      if (periodPro) periodPro.textContent = "/ month";
      if (priceTeam) priceTeam.textContent = `$${PLANS.TEAM.priceMonthly}`;
      if (periodTeam) periodTeam.textContent = "/ month";
      if (btnTextPro) btnTextPro.textContent = "Upgrade to Pro";
    }
  });

  upgradeProBtn?.addEventListener("click", async () => {
    const user = getCurrentUser();
    if (!user) {
      showToast("Please sign in first to upgrade.", "warning");
      if (typeof window.openAuthModal === "function") window.openAuthModal();
      return;
    }
    await initiateCheckout("pro", isAnnual ? "year" : "month");
  });

  upgradeTeamBtn?.addEventListener("click", async () => {
    const user = getCurrentUser();
    if (!user) {
      showToast("Please sign in first to upgrade.", "warning");
      if (typeof window.openAuthModal === "function") window.openAuthModal();
      return;
    }
    await initiateCheckout("team", isAnnual ? "year" : "month");
  });
}
