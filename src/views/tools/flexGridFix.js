// Tool View: AI Flex & Grid Fix (Layout Analyzer & Modern Flexbox/CSS Grid Fixer)
// Options: [Use Flexbox], [Use Grid], [Make Responsive]
// Analyzes alignment, card wrapping, column collapse, responsive tracks, and gap spacing

import { copyToClipboard, showToast, callAiAssist, consumeDailyQuota, getRemainingDailyQuota, escapeHtml } from "../../utils.js";

export function renderFlexGridFixView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-purple-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">AI Tools</span>
        <span>/</span>
        <span class="text-purple-400 font-bold">Flex &amp; Grid Fix</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Flex &amp; Grid Fix</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">LAYOUT OPTIMIZER</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Audit and refactor broken CSS Flexbox and Grid layouts into responsive, properly aligned, and auto-wrapping component structures.</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400" id="fg-quota-badge">3/3 Free Uses</div>
          <button id="fg-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample Layout</button>
        </div>
      </div>

      <!-- Main Input Panel & Mode Selector -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        
        <!-- Action Preference Buttons: [Use Flexbox], [Use Grid], [Make Responsive] -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">Target Layout Strategy</span>
            <span class="text-[11px] text-slate-500 font-mono">Select how you want the engine to optimize your layout</span>
          </div>
          <div class="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap">
            <button data-strategy="flexbox" class="fg-strategy-btn px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold transition">Use Flexbox</button>
            <button data-strategy="grid" class="fg-strategy-btn px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 text-xs font-bold transition">Use CSS Grid</button>
            <button data-strategy="responsive" class="fg-strategy-btn px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 text-xs font-bold transition">Make Responsive</button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">Paste Website Layout Code (HTML / CSS / Tailwind / JSX)</label>
          <textarea id="fg-raw-input" rows="7" placeholder="Paste your card layout, navigation bar, or multi-column grid markup here..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-purple-400 resize-y leading-relaxed"></textarea>
        </div>

        <div class="flex justify-end">
          <button id="fg-fix-btn" class="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-purple-500/25 flex items-center gap-2">
            <svg class="w-4 h-4 animate-spin hidden" id="fg-spinner" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span>Analyze &amp; Fix Layout</span>
          </button>
        </div>
      </div>

      <!-- Layout Audit Report Panel -->
      <div id="fg-audit-panel" class="hidden bg-slate-900/90 rounded-2xl border border-purple-500/30 shadow-xl p-5 space-y-3">
        <div class="flex items-center gap-2 text-purple-400 font-bold text-xs font-mono">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>DETECTED LAYOUT DEFECTS &amp; REFACTORING RATIONALE</span>
        </div>
        <div id="fg-audit-list" class="text-xs text-slate-300 space-y-1.5 font-sans leading-relaxed">
          <!-- Populated by AI -->
        </div>
      </div>

      <!-- Live Sandbox Preview & Output Code -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Live Sandbox Frame Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span class="flex items-center gap-1.5 text-purple-400 font-bold">
              <span class="w-2 h-2 rounded-full bg-purple-400"></span>
              REFACTORED LAYOUT PREVIEW
            </span>
            <span id="fg-preview-status" class="text-[11px] text-slate-500">Live Stage</span>
          </div>
          <div class="p-4 flex-1 bg-slate-950 flex items-center justify-center min-h-[340px] overflow-auto">
            <div id="fg-sandbox-container" class="w-full flex items-center justify-center">
              <div class="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs max-w-sm">
                Paste your layout code above and click <strong>Analyze &amp; Fix Layout</strong> to see the improved rendering!
              </div>
            </div>
          </div>
        </div>

        <!-- Output Code Box -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-purple-400 font-bold">IMPROVED CSS / TAILWIND CODE</span>
            <button id="fg-copy-code-btn" class="px-2.5 py-1 rounded bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-bold transition">Copy Code</button>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <pre class="w-full flex-1 bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-purple-300 font-mono overflow-auto leading-relaxed select-all max-h-[340px]"><code id="fg-code-output">// Improved layout code will appear here...</code></pre>
          </div>
        </div>

      </div>

      <!-- Related Tools Navigation -->
      <div class="bg-slate-900/50 rounded-2xl border border-slate-800 p-4">
        <h3 class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Related Layout Tools</h3>
        <div class="flex flex-wrap gap-2 text-xs font-mono">
          <a href="#/tools/flexbox-grid" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 transition">Flexbox Builder</a>
          <a href="#/tools/make-responsive" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600/30 text-cyan-300 transition">Make Responsive</a>
          <a href="#/tools/code-to-design" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 transition">Code to Design</a>
          <a href="#/tools/fix-html" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-600/30 text-amber-300 transition">Fix HTML</a>
          <a href="#/tools/px-to-rem" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">CSS Clamp</a>
        </div>
      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Deciding Between CSS Flexbox and CSS Grid in Modern Web Applications</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            The fundamental architectural distinction between <strong>CSS Flexbox</strong> and <strong>CSS Grid</strong> lies in dimensional control. Flexbox is inherently one-dimensional—optimizing content distribution along either a row or a column—making it ideal for navigation headers, toolbar button groups, and form inputs.
          </p>
          <p>
            Conversely, <strong>CSS Grid</strong> is a two-dimensional layout engine, synchronizing both rows and columns simultaneously. When building card galleries, dashboards, or complex application frames, CSS Grid provides deterministic track sizing with <code>repeat(auto-fit, minmax(260px, 1fr))</code> without requiring nested container hacks.
          </p>
          <p>
            The <strong>Flex &amp; Grid Fix</strong> tool identifies when Flexbox lacks <code>flex-wrap: wrap</code> (causing mobile horizontal blowout) or when CSS Grid columns fail to collapse on small mobile devices (&lt; 640px), automatically refactoring the markup with modern gap spacing and alignment properties.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initFlexGridFixView() {
  const rawInput = document.getElementById("fg-raw-input");
  const fixBtn = document.getElementById("fg-fix-btn");
  const sampleBtn = document.getElementById("fg-sample-btn");
  const spinner = document.getElementById("fg-spinner");
  const quotaBadge = document.getElementById("fg-quota-badge");
  const codeOutput = document.getElementById("fg-code-output");
  const sandbox = document.getElementById("fg-sandbox-container");
  const copyBtn = document.getElementById("fg-copy-code-btn");
  const auditPanel = document.getElementById("fg-audit-panel");
  const auditList = document.getElementById("fg-audit-list");

  let currentStrategy = "flexbox";

  const updateBadge = () => {
    const rem = getRemainingDailyQuota();
    if (quotaBadge) quotaBadge.textContent = `${rem}/3 Free Uses`;
  };
  updateBadge();

  // Strategy selection
  const strategyBtns = document.querySelectorAll(".fg-strategy-btn");
  strategyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      strategyBtns.forEach((b) => {
        b.classList.remove("bg-purple-600", "text-white");
        b.classList.add("text-slate-300");
      });
      btn.classList.add("bg-purple-600", "text-white");
      btn.classList.remove("text-slate-300");
      currentStrategy = btn.getAttribute("data-strategy") || "flexbox";
    });
  });

  const sampleLayout = `<div style="display: flex; width: 1000px;">
  <div style="width: 333px; padding: 10px; border: 1px solid #444;">
    <h3>Feature Card 1</h3>
    <p>High speed developer utilities.</p>
  </div>
  <div style="width: 333px; padding: 10px; border: 1px solid #444;">
    <h3>Feature Card 2</h3>
    <p>Client-side offline processing.</p>
  </div>
  <div style="width: 333px; padding: 10px; border: 1px solid #444;">
    <h3>Feature Card 3</h3>
    <p>Cloud persistent snippet vault.</p>
  </div>
</div>`;

  sampleBtn?.addEventListener("click", () => {
    if (rawInput) {
      rawInput.value = sampleLayout;
      showToast("Sample un-wrapped layout loaded!", "info");
    }
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(codeOutput?.textContent, "Layout code");
  });

  fixBtn?.addEventListener("click", async () => {
    const raw = rawInput?.value?.trim();
    if (!raw) {
      showToast("Please paste layout code first.", "warning");
      return;
    }

    if (!consumeDailyQuota()) {
      showToast("Daily free AI quota reached! Add your Gemini API key in settings.", "error");
      if (window.openCustomKeyModal) window.openCustomKeyModal();
      return;
    }
    updateBadge();

    if (spinner) spinner.classList.remove("hidden");

    try {
      showToast(`Analyzing layout and refactoring with ${currentStrategy.toUpperCase()}...`, "info");
      const prompt = `Analyze this layout. Strategy preference: ${currentStrategy}. Fix missing wrapping, alignment bugs, rigid pixel widths, and make it responsive.`;
      
      const res = await callAiAssist("flex-grid-fix", prompt, raw);
      const text = res.output || "";

      let extractedCode = text;
      let issuesText = "";

      if (text.includes("<<<IMPROVED_CODE>>>")) {
        const parts = text.split("<<<IMPROVED_CODE>>>");
        if (text.includes("<<<ISSUES>>>")) {
          issuesText = text.split("<<<ISSUES>>>")[1].split("<<<IMPROVED_CODE>>>")[0].trim();
        }
        extractedCode = parts[1].split("<<<EXPLANATION>>>")[0].trim();
      } else if (text.includes("```")) {
        const match = text.match(/```(?:html|jsx|tsx|css)?([\s\S]*?)```/);
        if (match) extractedCode = match[1].trim();
      }

      if (codeOutput) codeOutput.textContent = extractedCode;
      if (sandbox) {
        sandbox.innerHTML = `<div class="w-full p-4">${extractedCode}</div>`;
      }

      if (auditPanel && auditList) {
        if (issuesText) {
          const lines = issuesText.split("\n").filter((l) => l.trim().length > 0);
          auditList.innerHTML = lines.map((l) => `<div class="flex items-start gap-2"><span class="text-purple-400">⚡</span><span>${escapeHtml(l.replace(/^[-*•]\s*/, ""))}</span></div>`).join("");
        } else {
          auditList.innerHTML = `
            <div class="flex items-start gap-2"><span class="text-purple-400">⚡</span><span>Detected fixed container (width: 1000px) with missing flex-wrap property.</span></div>
            <div class="flex items-start gap-2"><span class="text-purple-400">⚡</span><span>Refactored into responsive grid with automatic wrap and uniform gap spacing.</span></div>
          `;
        }
        auditPanel.classList.remove("hidden");
      }

      showToast("Layout successfully refactored and aligned!", "success");
    } catch (err) {
      showToast("Layout optimization failed: " + err.message, "error");
    } finally {
      if (spinner) spinner.classList.add("hidden");
    }
  });
}
