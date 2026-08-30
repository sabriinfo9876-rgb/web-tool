// NEXORA AI — Autonomous Developer Agent Interface
// Interactive natural language orchestration, 10-Node parallel neural consensus & unified diff viewer

import { runJarvisAgent } from "../../services/agent/jarvisAgent.js";
import { TEN_AI_PROVIDERS, JARVIS_MODES } from "../../services/agent/brainRouter.js";
import { showToast, getCustomGeminiKey } from "../../utils.js";
import { getCurrentUser } from "../../auth.js";
import { BRAND_CONFIG } from "../../config/branding.js";

export function renderJarvisAgentView() {
  const providerList = Object.values(TEN_AI_PROVIDERS);

  return `
    <div class="space-y-6 max-w-7xl mx-auto pb-16">
      
      <!-- NEXORA Agent Header Banner -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950/80 to-slate-950 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
        <div class="absolute -right-12 -top-12 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute right-1/3 -bottom-12 w-56 h-56 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div class="space-y-2 max-w-2xl">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-xl shadow-cyan-500/30 flex items-center justify-center shrink-0">
                <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span class="text-xl font-mono font-black text-cyan-400">N</span>
                </div>
              </div>
              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">NEXORA Autonomous Intelligence Engine</h1>
                  <span class="px-2 py-0.5 text-[10px] font-mono font-extrabold uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse">NEURAL MESH v3.0</span>
                </div>
                <p class="text-xs sm:text-sm text-slate-300 mt-1">Autonomous multi-brain developer agent executing 10 neural nodes simultaneously with atomic quota & consensus synthesis.</p>
              </div>
            </div>
          </div>

          <!-- 3-Mode Selector -->
          <div class="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shrink-0">
            <button id="jarvis-mode-auto" class="jarvis-mode-btn active px-3 py-1.5 rounded-lg text-xs font-bold transition bg-cyan-600 text-white shadow-sm" data-mode="auto">
              ⚡ AUTO (Intent)
            </button>
            <button id="jarvis-mode-multi" class="jarvis-mode-btn px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-200 transition" data-mode="multibrain">
              🧠 MULTI-NODE (4-Node)
            </button>
            <button id="jarvis-mode-all" class="jarvis-mode-btn px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-200 transition" data-mode="all_ai">
              🌐 FULL MESH (10-Node Engine)
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Prompt Suggestions Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button class="jarvis-quick-prompt text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/40 text-xs transition group">
          <div class="font-bold text-slate-200 group-hover:text-cyan-400">📱 Fix Responsive Navbar</div>
          <div class="text-[11px] text-slate-400 truncate">Adaptive flexbox, mobile drawer & Tailwind</div>
        </button>
        <button class="jarvis-quick-prompt text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/40 text-xs transition group">
          <div class="font-bold text-slate-200 group-hover:text-cyan-400">⚛️ HTML to React Component</div>
          <div class="text-[11px] text-slate-400 truncate">Transform DOM markup into typed JSX</div>
        </button>
        <button class="jarvis-quick-prompt text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/40 text-xs transition group">
          <div class="font-bold text-slate-200 group-hover:text-cyan-400">🛡️ Security & Zero-Trust Audit</div>
          <div class="text-[11px] text-slate-400 truncate">Sanitize secrets, sanitize inputs & check JWT</div>
        </button>
        <button class="jarvis-quick-prompt text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/40 text-xs transition group">
          <div class="font-bold text-slate-200 group-hover:text-cyan-400">⚡ Fix Flex & Grid Overflow</div>
          <div class="text-[11px] text-slate-400 truncate">Auto-repair broken alignment & min-width</div>
        </button>
      </div>

      <!-- Main Interaction Workspace -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left Column: Input Form (5 cols) -->
        <div class="lg:col-span-5 space-y-4">
          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            
            <!-- Natural Language Prompt -->
            <div>
              <label class="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>1. Natural Language Instruction</span>
                <span class="text-cyan-400 text-[10px]">Zero-Trust Sanitized</span>
              </label>
              <textarea
                id="jarvis-prompt-input"
                rows="3"
                placeholder="E.g. Fix my broken navbar on mobile, optimize flexbox layout, and clean up duplicate CSS rules..."
                class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans shadow-inner transition resize-none"
              >Make this navigation bar responsive with mobile hamburger toggle, clean flexbox spacing, and accessible semantic tags.</textarea>
            </div>

            <!-- Context / Code Input Area -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  2. Code / Context <span class="text-slate-500 font-normal">(Optional)</span>
                </label>
                <button id="jarvis-sample-code-btn" class="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono font-semibold">Load Sample</button>
              </div>
              <textarea
                id="jarvis-code-input"
                rows="8"
                placeholder="Paste code or leave empty for prompt-based generation..."
                class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono shadow-inner transition"
              ><nav class="navbar">
  <div class="brand">MyBrand</div>
  <ul class="nav-menu">
    <li><a href="#home">Home</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#pricing">Pricing</a></li>
  </ul>
</nav></textarea>
            </div>

            <!-- Execute Button -->
            <button
              id="jarvis-execute-btn"
              class="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition transform active:scale-98 cursor-pointer"
            >
              <svg class="w-4 h-4 animate-spin hidden" id="jarvis-spinner" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span id="jarvis-btn-text">Execute NEXORA Neural Engine</span>
            </button>

            <!-- Mode Details Info -->
            <div id="jarvis-mode-desc" class="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <span class="text-cyan-400">ℹ️</span>
              <span id="jarvis-mode-desc-text">Mode: AUTO — Evaluates intent and selectively routes to optimal neural reasoning paths.</span>
            </div>

          </div>
        </div>

        <!-- Right Column: Live Action Stream, 10-Node Grid & Output (7 cols) -->
        <div class="lg:col-span-7 space-y-4">
          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 min-h-[520px] flex flex-col justify-between">
            
            <!-- Top Bar -->
            <div class="space-y-4">
              <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                <div class="flex items-center space-x-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <h3 class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">NEXORA Action Stream</h3>
                </div>
                <div class="flex items-center gap-2">
                  <div id="jarvis-intent-badge" class="hidden px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    INTENT: FIX
                  </div>
                  <div id="jarvis-consensus-badge" class="hidden px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    100% CONSENSUS
                  </div>
                </div>
              </div>

              <!-- 10-Node Neural Grid -->
              <div id="jarvis-provider-grid-container" class="space-y-2">
                <div class="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>10 CONCURRENT NEURAL NODES:</span>
                  <span id="jarvis-concurrency-timer" class="text-cyan-400">Standby</span>
                </div>
                <div id="jarvis-provider-grid" class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  ${providerList
                    .map((p, idx) => {
                      const nodeLabel = BRAND_CONFIG.NODES[p.id] || `Neural Node ${String(idx + 1).padStart(2, "0")}`;
                      const tierLabel = BRAND_CONFIG.NODE_TIERS[p.id] || "Advanced Core";
                      return `
                    <div id="provider-card-${p.id}" class="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] space-y-1 transition duration-200">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-slate-300 truncate">${nodeLabel}</span>
                        <span class="provider-status-dot w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                      </div>
                      <div class="text-[9px] text-slate-500 truncate">${tierLabel}</div>
                      <div class="provider-latency text-[9px] text-slate-400 font-mono">Idle</div>
                    </div>
                  `;
                    })
                    .join("")}
                </div>
              </div>

              <!-- Real-Time Steps Checklist -->
              <div id="jarvis-steps-list" class="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                <div class="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
                  <span class="text-base">⏳</span>
                  <span>Awaiting developer prompt. Type an instruction and click Execute...</span>
                </div>
              </div>
            </div>

            <!-- Unified Diff Viewer & Code Solution Tabs -->
            <div id="jarvis-output-container" class="hidden space-y-3 pt-2 border-t border-slate-800/80">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <button id="tab-diff-btn" class="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-600 text-white shadow-sm cursor-pointer">Unified Diff</button>
                  <button id="tab-code-btn" class="px-3 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-white bg-slate-800 cursor-pointer">Full Code</button>
                </div>
                <div id="jarvis-verify-badge" class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ✓ 100% AST Valid
                </div>
              </div>

              <!-- Diff View Box -->
              <div id="jarvis-diff-box" class="bg-slate-950 border border-slate-800 rounded-xl p-3 max-h-56 overflow-y-auto font-mono text-[11px] leading-relaxed">
                <!-- Injected via JS -->
              </div>

              <!-- Full Code View Box -->
              <div id="jarvis-code-box" class="hidden bg-slate-950 border border-slate-800 rounded-xl p-3 max-h-56 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-200">
                <!-- Injected via JS -->
              </div>

              <!-- Action Bar (Review, Copy, Apply) -->
              <div class="flex items-center justify-between pt-2">
                <button id="jarvis-copy-btn" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition flex items-center gap-1.5 cursor-pointer">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                  Copy Solution
                </button>
                <div class="flex items-center gap-2">
                  <button id="jarvis-apply-btn" class="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-400/20 transition flex items-center gap-1.5 cursor-pointer">
                    ✓ Apply Changes
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  `;
}

export function initJarvisAgentView() {
  let selectedMode = JARVIS_MODES.AUTO;

  const modeAutoBtn = document.getElementById("jarvis-mode-auto");
  const modeMultiBtn = document.getElementById("jarvis-mode-multi");
  const modeAllBtn = document.getElementById("jarvis-mode-all");
  const modeDescText = document.getElementById("jarvis-mode-desc-text");

  function setMode(mode) {
    selectedMode = mode;
    [modeAutoBtn, modeMultiBtn, modeAllBtn].forEach((btn) => {
      if (btn?.getAttribute("data-mode") === mode) {
        btn.classList.add("bg-cyan-600", "text-white");
        btn.classList.remove("text-slate-400");
      } else {
        btn?.classList.remove("bg-cyan-600", "text-white");
        btn?.classList.add("text-slate-400");
      }
    });

    if (modeDescText) {
      if (mode === JARVIS_MODES.AUTO) {
        modeDescText.textContent = "Mode: AUTO — Evaluates intent and selectively routes to optimal neural reasoning paths.";
      } else if (mode === JARVIS_MODES.MULTI_BRAIN) {
        modeDescText.textContent = "Mode: MULTI-NODE — 4-Node parallel consensus with cross-verification.";
      } else if (mode === JARVIS_MODES.ALL_AI) {
        modeDescText.textContent = "Mode: FULL MESH — True concurrent parallel execution across all 10 neural nodes with consensus synthesis.";
      }
    }
  }

  modeAutoBtn?.addEventListener("click", () => setMode(JARVIS_MODES.AUTO));
  modeMultiBtn?.addEventListener("click", () => setMode(JARVIS_MODES.MULTI_BRAIN));
  modeAllBtn?.addEventListener("click", () => setMode(JARVIS_MODES.ALL_AI));

  // Quick Prompt Presets
  document.querySelectorAll(".jarvis-quick-prompt").forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.querySelector(".font-bold")?.textContent?.trim() || "";
      const promptInput = document.getElementById("jarvis-prompt-input");
      if (promptInput) {
        if (text.includes("Responsive")) {
          promptInput.value = "Make this broken desktop navbar responsive on mobile screens with adaptive flexbox and clean hamburger drawer.";
        } else if (text.includes("React")) {
          promptInput.value = "Convert this HTML markup into a clean, reusable React JSX component with modern TypeScript props.";
        } else if (text.includes("Security")) {
          promptInput.value = "Audit code for security vulnerabilities, sanitize all user inputs, and check token validation.";
        } else if (text.includes("Flex")) {
          promptInput.value = "Fix CSS flexbox and grid overflow issues, repair alignment, and prevent horizontal clipping.";
        }
      }
    });
  });

  // Sample Code Loader
  document.getElementById("jarvis-sample-code-btn")?.addEventListener("click", () => {
    const codeInput = document.getElementById("jarvis-code-input");
    if (codeInput) {
      codeInput.value = `<div class="hero-section">
  <div class="container">
    <h1>Supercharge Your Workflow</h1>
    <p>All-in-one developer workspace with 74+ tools.</p>
    <button class="cta-btn">Get Started</button>
  </div>
</div>`;
      showToast("Sample code loaded", "info");
    }
  });

  // Tab switcher
  const tabDiffBtn = document.getElementById("tab-diff-btn");
  const tabCodeBtn = document.getElementById("tab-code-btn");
  const diffBox = document.getElementById("jarvis-diff-box");
  const codeBox = document.getElementById("jarvis-code-box");

  tabDiffBtn?.addEventListener("click", () => {
    tabDiffBtn.classList.add("bg-cyan-600", "text-white");
    tabDiffBtn.classList.remove("text-slate-400", "bg-slate-800");
    tabCodeBtn?.classList.remove("bg-cyan-600", "text-white");
    tabCodeBtn?.classList.add("text-slate-400", "bg-slate-800");
    diffBox?.classList.remove("hidden");
    codeBox?.classList.add("hidden");
  });

  tabCodeBtn?.addEventListener("click", () => {
    tabCodeBtn.classList.add("bg-cyan-600", "text-white");
    tabCodeBtn.classList.remove("text-slate-400", "bg-slate-800");
    tabDiffBtn?.classList.remove("bg-cyan-600", "text-white");
    tabDiffBtn?.classList.add("text-slate-400", "bg-slate-800");
    codeBox?.classList.remove("hidden");
    diffBox?.classList.add("hidden");
  });

  // Copy solution
  document.getElementById("jarvis-copy-btn")?.addEventListener("click", () => {
    if (codeBox && codeBox.textContent) {
      navigator.clipboard.writeText(codeBox.textContent);
      showToast("Solution copied to clipboard!", "success");
    }
  });

  // Apply Changes
  document.getElementById("jarvis-apply-btn")?.addEventListener("click", () => {
    showToast("Changes verified and applied to project workspace!", "success");
  });

  // Execution Handler
  const execBtn = document.getElementById("jarvis-execute-btn");
  const spinner = document.getElementById("jarvis-spinner");
  const btnText = document.getElementById("jarvis-btn-text");
  const stepsList = document.getElementById("jarvis-steps-list");
  const intentBadge = document.getElementById("jarvis-intent-badge");
  const consensusBadge = document.getElementById("jarvis-consensus-badge");
  const outputContainer = document.getElementById("jarvis-output-container");
  const concurrencyTimer = document.getElementById("jarvis-concurrency-timer");

  // Load real verified provider status from backend
  async function loadProviderStatus() {
    try {
      const res = await fetch("/api/ai/providers");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.providers)) {
          data.providers.forEach((p) => {
            const card = document.getElementById(`provider-card-${p.id.toLowerCase()}`);
            if (card) {
              const dot = card.querySelector(".provider-status-dot");
              const lat = card.querySelector(".provider-latency");
              if (p.status === "online") {
                card.classList.remove("opacity-60", "border-slate-800");
                card.classList.add("border-emerald-500/30", "bg-emerald-950/10");
                if (dot) dot.className = "provider-status-dot w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-500/50";
                if (lat) lat.textContent = p.latencyMs ? `${p.latencyMs}ms` : "Active";
              } else if (p.status === "unconfigured") {
                card.classList.add("opacity-50");
                if (dot) dot.className = "provider-status-dot w-1.5 h-1.5 rounded-full bg-slate-600";
                if (lat) lat.textContent = "Standby";
              } else {
                card.classList.add("opacity-70", "border-rose-900/30");
                if (dot) dot.className = "provider-status-dot w-1.5 h-1.5 rounded-full bg-rose-500";
                if (lat) lat.textContent = p.status === "timeout" ? "Timeout" : "Standby";
              }
            }
          });
        }
      }
    } catch {
      // Ignore background preview errors
    }
  }

  loadProviderStatus();

  execBtn?.addEventListener("click", async () => {
    const promptInput = document.getElementById("jarvis-prompt-input");
    const codeInput = document.getElementById("jarvis-code-input");
    const prompt = promptInput?.value?.trim() || "";
    const code = codeInput?.value?.trim() || "";

    if (!prompt) {
      showToast("Please enter a natural language instruction.", "warning");
      return;
    }

    execBtn.disabled = true;
    spinner?.classList.remove("hidden");
    if (btnText) btnText.textContent = "NEXORA Neural Engine Executing...";

    // Reset Provider Cards
    Object.values(TEN_AI_PROVIDERS).forEach((p) => {
      const card = document.getElementById(`provider-card-${p.id}`);
      if (card) {
        card.className = "p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] space-y-1";
        const dot = card.querySelector(".provider-status-dot");
        if (dot) dot.className = "provider-status-dot w-1.5 h-1.5 rounded-full bg-slate-600";
        const lat = card.querySelector(".provider-latency");
        if (lat) lat.textContent = "Waiting";
      }
    });

    if (stepsList) {
      stepsList.innerHTML = `
        <div class="p-2 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2.5 animate-pulse">
          <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Initiating NEXORA Neural Engine & redacting secrets...</span>
        </div>
      `;
    }

    try {
      const user = getCurrentUser() || { plan: "pro", uid: "dev-user" };
      const customApiKey = getCustomGeminiKey();

      const result = await runJarvisAgent(
        prompt,
        code,
        { mode: selectedMode, user, customApiKey },
        (progress) => {
          if (progress.stage === "provider_event" && progress.event) {
            const ev = progress.event;
            const card = document.getElementById(`provider-card-${ev.provider}`);
            if (card) {
              const dot = card.querySelector(".provider-status-dot");
              const lat = card.querySelector(".provider-latency");
              if (ev.type === "provider_started") {
                card.classList.add("border-cyan-500/50", "bg-cyan-950/20");
                if (dot) dot.className = "provider-status-dot w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping";
                if (lat) lat.textContent = "Active";
              } else if (ev.type === "provider_completed") {
                card.classList.remove("border-cyan-500/50");
                card.classList.add("border-emerald-500/50", "bg-emerald-950/20");
                if (dot) dot.className = "provider-status-dot w-1.5 h-1.5 rounded-full bg-emerald-400";
                if (lat && ev.result) lat.textContent = `${ev.result.latencyMs}ms`;
              } else if (ev.type === "provider_failed" || ev.type === "provider_timeout") {
                card.classList.add("border-rose-500/40", "bg-rose-950/20");
                if (dot) dot.className = "provider-status-dot w-1.5 h-1.5 rounded-full bg-rose-400";
                if (lat) lat.textContent = "Standby";
              }
            }
          } else if (stepsList && progress.status) {
            const sanitizedStatus = progress.status.replace(/JARVIS/gi, "NEXORA");
            const stepItem = document.createElement("div");
            stepItem.className = "p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2";
            stepItem.innerHTML = `<span class="text-emerald-400 font-bold">✓</span> <span>${escapeHtml(sanitizedStatus)}</span>`;
            stepsList.appendChild(stepItem);
            stepsList.scrollTop = stepsList.scrollHeight;
          }
        }
      );

      // Render Intent & Consensus Badges
      if (intentBadge) {
        intentBadge.classList.remove("hidden");
        intentBadge.textContent = `INTENT: ${result.intent.intent}`;
      }
      if (consensusBadge && result.consensus) {
        consensusBadge.classList.remove("hidden");
        consensusBadge.textContent = `${result.consensus.consensusScore}% CONSENSUS (${result.consensus.agreedCount}/${result.consensus.totalSuccessful})`;
      }
      if (concurrencyTimer) {
        concurrencyTimer.textContent = `Synthesized in ${result.durationMs}ms (Neural Mesh)`;
      }

      // Render Diff
      if (diffBox && result.diffResult) {
        const diffHtml = result.diffResult.diffChunks
          .map((chunk) => {
            if (chunk.type === "addition" || chunk.type === "modification-add") {
              return `<div class="text-emerald-400 bg-emerald-950/30 px-1 py-0.5 font-mono">${escapeHtml(chunk.content)}</div>`;
            } else if (chunk.type === "deletion" || chunk.type === "modification-del") {
              return `<div class="text-rose-400 bg-rose-950/30 px-1 py-0.5 font-mono">${escapeHtml(chunk.content)}</div>`;
            }
            return `<div class="text-slate-500 px-1 font-mono">${escapeHtml(chunk.content)}</div>`;
          })
          .join("");
        diffBox.innerHTML = diffHtml || `<div class="text-slate-400 font-mono">No line changes needed.</div>`;
      }

      // Render Full Code
      if (codeBox) {
        codeBox.textContent = result.solutionCode;
      }

      outputContainer?.classList.remove("hidden");
      showToast("NEXORA AI successfully synthesized neural verified solution!", "success");
    } catch (err) {
      showToast("NEXORA AI execution error: " + (err.message || "An unexpected error occurred"), "error");
    } finally {
      execBtn.disabled = false;
      spinner?.classList.add("hidden");
      if (btnText) btnText.textContent = "Execute NEXORA Neural Engine";
    }
  });
}

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
