// Dashboard View: Developer Workspace, AI Usage Quota, Snippet Analytics, GitHub Status & Recent Tools

import { getCurrentUser } from "../../auth.js";
import { getDailyQuotaDetails } from "../../utils.js";
import { getPlanLimits } from "../../config/plans.js";

export function renderDashboardView() {
  const user = getCurrentUser();
  const quota = getDailyQuotaDetails();
  const plan = user ? getPlanLimits(user.plan) : quota.plan;

  return `
    <div class="space-y-8 animate-fadeIn max-w-6xl mx-auto py-2">
      
      <!-- Welcome Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 border border-slate-800 shadow-xl">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20 flex-shrink-0">
            <div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-bold text-lg text-white font-mono">
              ${user?.displayName?.charAt(0).toUpperCase() || "D"}
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl sm:text-2xl font-black text-white tracking-tight">
                Welcome back, <span class="text-indigo-400">${user?.displayName || "Developer"}</span>!
              </h1>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${plan.id === "pro" ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40" : "bg-slate-800 text-slate-400 border border-slate-700"}">
                ${plan.badge} PLAN
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">${user?.email || "Local Developer Session (Guest Mode)"}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          ${plan.id === "free" ? `
            <a href="#/pricing" class="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 text-white text-xs font-bold transition shadow-lg shadow-indigo-500/20 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span>Upgrade to Pro</span>
            </a>
          ` : `
            <a href="#/account" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition">Manage Plan</a>
          `}
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Metric 1: AI Daily Quota -->
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span>AI Daily Usage</span>
            <span class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-extrabold text-white font-mono">${quota.isUnlimited ? "Unlimited" : quota.used}</span>
            <span class="text-xs text-slate-500 font-mono">${quota.isUnlimited ? "(Personal Key)" : `/ ${quota.maxDaily}`}</span>
          </div>
          <div class="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div class="bg-indigo-500 h-full rounded-full" style="width: ${quota.isUnlimited ? "100" : Math.min(100, (quota.used / quota.maxDaily) * 100)}%"></div>
          </div>
          <p class="text-[11px] text-slate-500">Resets in ~${quota.resetInHours} hours</p>
        </div>

        <!-- Metric 2: Cloud Snippets Stored -->
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span>Saved Snippets</span>
            <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-extrabold text-white font-mono" id="dash-snippet-count">3</span>
            <span class="text-xs text-slate-500 font-mono">/ ${plan.snippetLimit === Infinity ? "Unlimited" : plan.snippetLimit}</span>
          </div>
          <a href="#/tools/cloud-vault" class="text-[11px] text-amber-400 hover:underline block">Open Cloud Snippet Vault &rarr;</a>
        </div>

        <!-- Metric 3: GitHub Integration -->
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span>GitHub Engine</span>
            <svg class="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </div>
          <div class="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Live API Ready</span>
          </div>
          <a href="#/tools/fix-github-project" class="text-[11px] text-slate-400 hover:text-white block">Automate PR repairs &rarr;</a>
        </div>

        <!-- Metric 4: Code Sign & Verify -->
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span>Cryptographic Gatekeeper</span>
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <div class="text-sm font-bold text-white font-mono">ECDSA P-256</div>
          <a href="#/tools/code-sign-approve" class="text-[11px] text-emerald-400 hover:underline block">View Audit Trail &rarr;</a>
        </div>

      </div>

      <!-- Quick Launchpad -->
      <div class="space-y-4">
        <h2 class="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          Recommended Pro Workflows
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <a href="#/tools/fix-github-project" class="p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition group flex flex-col justify-between space-y-3">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">PRO ENGINE</span>
                <span class="text-xs text-slate-500">&rarr;</span>
              </div>
              <h3 class="text-sm font-bold text-white group-hover:text-indigo-400 transition">Fix My GitHub Project</h3>
              <p class="text-xs text-slate-400 leading-relaxed">Scan repositories, find architectural flaws, sign patches, and open verified PRs.</p>
            </div>
            <span class="text-[11px] text-indigo-400 font-semibold">Launch Repair Engine &rarr;</span>
          </a>

          <a href="#/tools/make-responsive" class="p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition group flex flex-col justify-between space-y-3">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">AI RESPONSIVE</span>
                <span class="text-xs text-slate-500">&rarr;</span>
              </div>
              <h3 class="text-sm font-bold text-white group-hover:text-cyan-400 transition">Make Responsive Transformer</h3>
              <p class="text-xs text-slate-400 leading-relaxed">Turn rigid desktop layouts into fluid, mobile-first responsive code with 5-viewport testing.</p>
            </div>
            <span class="text-[11px] text-cyan-400 font-semibold">Test Responsive Code &rarr;</span>
          </a>

          <a href="#/tools/clean-code" class="p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition group flex flex-col justify-between space-y-3">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">AI REFACTOR</span>
                <span class="text-xs text-slate-500">&rarr;</span>
              </div>
              <h3 class="text-sm font-bold text-white group-hover:text-emerald-400 transition">AI Code Refactor</h3>
              <p class="text-xs text-slate-400 leading-relaxed">Clean code, eliminate anti-patterns, optimize performance, and calculate quality scores.</p>
            </div>
            <span class="text-[11px] text-emerald-400 font-semibold">Clean Codebase &rarr;</span>
          </a>

        </div>
      </div>

    </div>
  `;
}

export function initDashboardView() {
  const countEl = document.getElementById("dash-snippet-count");
  try {
    const raw = localStorage.getItem("wdh_snippet_vault_v1");
    if (raw && countEl) {
      const items = JSON.parse(raw);
      countEl.textContent = String(items.length || 0);
    }
  } catch {}
}
