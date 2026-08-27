// Pricing View: Free vs Pro vs Team Plans with Monthly/Annual Toggle and Feature Comparison

import { PLANS } from "../../config/plans.js";
import { getCurrentUser, upgradePlanSimulation } from "../../auth.js";
import { showToast } from "../../utils.js";

export function renderPricingView() {
  const user = getCurrentUser();
  const currentPlan = user?.plan || "free";

  return `
    <div class="space-y-10 animate-fadeIn max-w-6xl mx-auto py-4">
      
      <!-- Pricing Header -->
      <div class="text-center space-y-3 max-w-2xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <span>Flexible Developer Plans</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Supercharge Your Workflow with <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300">WebDevHub Pro</span>
        </h1>
        <p class="text-slate-400 text-sm sm:text-base leading-relaxed">
          Start free with 74+ developer utilities, or upgrade to Pro for higher AI limits, automated GitHub project repair, and unlimited cloud storage.
        </p>

        <!-- Billing Toggle (Monthly / Annual) -->
        <div class="pt-4 flex items-center justify-center gap-3 text-xs font-medium">
          <span id="label-monthly" class="text-white font-bold">Monthly Billing</span>
          <button id="billing-toggle-btn" class="w-12 h-6 bg-slate-800 rounded-full p-1 border border-slate-700 transition relative">
            <div id="toggle-thumb" class="w-4 h-4 rounded-full bg-indigo-500 transition-transform"></div>
          </button>
          <span id="label-annual" class="text-slate-400">Annual Billing <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Save 20%</span></span>
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
            <p class="text-xs text-slate-400">Essential client-side developer toolbox and light AI access.</p>
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
            <button class="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition cursor-default">
              ${currentPlan === "free" ? "Active Plan" : "Downgrade to Free"}
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
            <p class="text-xs text-slate-300">For active developers needing high AI limits and GitHub automation.</p>
            <div class="py-2">
              <span id="price-pro" class="text-4xl font-extrabold text-white font-mono">$19</span>
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
              <span>${currentPlan === "pro" ? "Current Active Plan" : "Upgrade to Pro"}</span>
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
              <span id="price-team" class="text-4xl font-extrabold text-white font-mono">$49</span>
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

      <!-- FAQ Section -->
      <div class="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 text-slate-300">
        <h2 class="text-lg font-bold text-white tracking-tight">Frequently Asked Questions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-400">
          <div>
            <h4 class="font-bold text-slate-200 mb-1">Can I use my own Gemini API Key?</h4>
            <p>Yes! Entering your personal Gemini API key provides unlimited AI usage without requiring a paid subscription.</p>
          </div>
          <div>
            <h4 class="font-bold text-slate-200 mb-1">What payment methods are supported?</h4>
            <p>We support all major credit cards, Apple Pay, Google Pay, and PayPal via secure payment gateways.</p>
          </div>
          <div>
            <h4 class="font-bold text-slate-200 mb-1">How does the GitHub Repair Engine work?</h4>
            <p>The repair engine connects via GitHub OAuth to create a dedicated branch, commit signed fixes, and open a Pull Request for your review.</p>
          </div>
          <div>
            <h4 class="font-bold text-slate-200 mb-1">Can I cancel anytime?</h4>
            <p>Yes, you can cancel your subscription anytime with a single click in your Account settings.</p>
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

      if (pricePro) pricePro.textContent = `$${Math.round(PLANS.PRO.priceAnnual / 12)}`;
      if (periodPro) periodPro.textContent = "/ month (billed annually)";
      if (priceTeam) priceTeam.textContent = `$${Math.round(PLANS.TEAM.priceAnnual / 12)}`;
      if (periodTeam) periodTeam.textContent = "/ month (billed annually)";
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
    }
  });

  upgradeProBtn?.addEventListener("click", async () => {
    const user = getCurrentUser();
    if (!user) {
      showToast("Please sign in first to upgrade.", "warning");
      if (typeof window.openAuthModal === "function") window.openAuthModal();
      return;
    }
    await upgradePlanSimulation("pro");
  });

  upgradeTeamBtn?.addEventListener("click", async () => {
    const user = getCurrentUser();
    if (!user) {
      showToast("Please sign in first to upgrade.", "warning");
      if (typeof window.openAuthModal === "function") window.openAuthModal();
      return;
    }
    await upgradePlanSimulation("team");
  });
}
