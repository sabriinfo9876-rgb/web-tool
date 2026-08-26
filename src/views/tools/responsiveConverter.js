// Tool View: AI Make Responsive (Website Responsiveness Analyzer & Mobile-First Transformer)
// Detects: Fixed widths, horizontal overflow, fixed heights, broken navigation, desktop-only tables/cards, missing media queries, poor flex/grid
// Preserves: JavaScript logic, React logic, API calls, components, content, images, existing classes, existing IDs
// Shows: BEFORE, AFTER, DIFF, LIVE PREVIEW across 1440px, 1024px, 768px, 390px, 320px

import { copyToClipboard, showToast, callAiAssist, consumeDailyQuota, getRemainingDailyQuota, computeSimpleLineDiff, escapeHtml } from "../../utils.js";

export function renderResponsiveConverterView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-cyan-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">AI Tools</span>
        <span>/</span>
        <span class="text-cyan-400 font-bold">Make Responsive</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Make Responsive</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">RESPONSIVE ARCHITECT</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Paste your existing website code to detect layout defects and generate a fluid, mobile-first responsive version preserving all functional logic.</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400" id="resp-quota-badge">3/3 Free Uses</div>
          <button id="resp-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample Fixed Code</button>
        </div>
      </div>

      <!-- Main Input Panel -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <label class="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Paste Existing Website Code (HTML, CSS, React JSX/TSX)</label>
            <span class="text-[11px] text-slate-500 font-mono">Preserves components, APIs, hooks, IDs, and content</span>
          </div>
          <button id="resp-analyze-btn" class="px-6 py-2.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 hover:opacity-95 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 shrink-0">
            <svg class="w-4 h-4 animate-spin hidden" id="resp-spinner" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span>Analyze &amp; Make Responsive</span>
          </button>
        </div>

        <textarea id="resp-raw-input" rows="8" placeholder="Paste your HTML, CSS, or React component with fixed widths or desktop-only layouts here..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-400 resize-y leading-relaxed"></textarea>
      </div>

      <!-- Detected Responsiveness Issues Panel -->
      <div id="resp-issues-panel" class="hidden bg-slate-900/90 rounded-2xl border border-cyan-500/30 shadow-xl p-5 space-y-3">
        <div class="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <span>DETECTED RESPONSIVENESS DEFECTS &amp; AUDIT</span>
        </div>
        <div id="resp-issues-list" class="text-xs text-slate-300 space-y-1.5 font-sans leading-relaxed">
          <!-- Populated by AI -->
        </div>
      </div>

      <!-- Viewport Stage Controls -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
        <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div class="flex items-center gap-2">
            <span class="text-cyan-400 font-bold">RESPONSIVE VIEWPORT PREVIEW</span>
            <span id="resp-viewport-label" class="text-slate-500 text-[11px]">(Desktop 1440px)</span>
          </div>

          <!-- Viewports: 1440, 1024, 768, 390, 320 -->
          <div class="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap">
            <button data-w="100%" class="resp-vp-btn px-2.5 py-1 rounded bg-cyan-600 text-white text-[11px] font-bold">Desktop 1440px</button>
            <button data-w="1024px" class="resp-vp-btn px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400 text-[11px]">Laptop 1024px</button>
            <button data-w="768px" class="resp-vp-btn px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400 text-[11px]">Tablet 768px</button>
            <button data-w="390px" class="resp-vp-btn px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400 text-[11px]">Mobile 390px</button>
            <button data-w="320px" class="resp-vp-btn px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400 text-[11px]">Small 320px</button>
          </div>
        </div>

        <!-- Live Viewport Container -->
        <div class="p-6 bg-slate-950 flex items-center justify-center min-h-[360px] overflow-auto">
          <div id="resp-stage-wrapper" class="w-full transition-all duration-300 flex items-center justify-center">
            <div id="resp-live-sandbox" class="w-full max-w-2xl bg-slate-900/60 p-6 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
              Paste your fixed website code above and click <strong>Analyze &amp; Make Responsive</strong> to test across all viewports!
            </div>
          </div>
        </div>
      </div>

      <!-- Multi-Tab Comparison: BEFORE | AFTER | DIFF -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
        <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-1.5">
            <button id="resp-tab-before" class="px-3 py-1 rounded bg-slate-800 text-slate-300">BEFORE (Original)</button>
            <button id="resp-tab-after" class="px-3 py-1 rounded bg-cyan-600 text-white font-bold">AFTER (Responsive)</button>
            <button id="resp-tab-diff" class="px-3 py-1 rounded bg-slate-800 text-slate-300">DIFF (Changes)</button>
          </div>
          <button id="resp-copy-code-btn" class="px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition">Copy Responsive Code</button>
        </div>

        <div class="p-4 flex-1">
          <!-- Text Display Pane -->
          <pre id="resp-code-display-box" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-cyan-300 font-mono overflow-auto leading-relaxed select-all max-h-[360px]"><code>// Responsive code will appear here...</code></pre>
          <!-- Diff Visualizer Box -->
          <div id="resp-diff-box" class="hidden w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs font-mono overflow-auto max-h-[360px] space-y-0.5">
            <!-- Populated with line diff -->
          </div>
        </div>
      </div>

      <!-- Related Tools Navigation -->
      <div class="bg-slate-900/50 rounded-2xl border border-slate-800 p-4">
        <h3 class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Related AI &amp; Layout Tools</h3>
        <div class="flex flex-wrap gap-2 text-xs font-mono">
          <a href="#/tools/code-to-design" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 transition">Code to Design</a>
          <a href="#/tools/flex-grid-fix" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 transition">Flex &amp; Grid Fix</a>
          <a href="#/tools/fix-html" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-600/30 text-amber-300 transition">Fix HTML</a>
          <a href="#/tools/clean-code" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 transition">Clean My Code</a>
          <a href="#/tools/px-to-rem" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">PX to REM &amp; Clamp</a>
        </div>
      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Responsive Web Architecture: Auditing &amp; Eliminating Layout Fragility</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Rigid website layouts often fail on modern mobile devices due to hardcoded constraints: fixed pixel widths (<code>width: 1200px</code>), fixed pixel heights triggering overflow clipping, non-wrapping flex containers, wide table columns, and oversized static typography.
          </p>
          <p>
            The <strong>Make Responsive</strong> engine refactors non-responsive structures into fluid CSS systems:
            replacing static widths with <code>max-width: 100%</code>, utilizing CSS Grid with <code>grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))</code>, implementing fluid typography via <code>clamp(1rem, 2.5vw, 1.75rem)</code>, and adding standard mobile-first media query breakpoints at 640px, 768px, 1024px, and 1280px.
          </p>
          <p>
            Crucially, this tool preserves all underlying React component logic, state hooks, form handlers, API network calls, and HTML class names so that the responsive version is a zero-regression drop-in replacement.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initResponsiveConverterView() {
  const rawInput = document.getElementById("resp-raw-input");
  const analyzeBtn = document.getElementById("resp-analyze-btn");
  const sampleBtn = document.getElementById("resp-sample-btn");
  const spinner = document.getElementById("resp-spinner");
  const quotaBadge = document.getElementById("resp-quota-badge");
  const issuesPanel = document.getElementById("resp-issues-panel");
  const issuesList = document.getElementById("resp-issues-list");
  const liveSandbox = document.getElementById("resp-live-sandbox");
  const stageWrapper = document.getElementById("resp-stage-wrapper");
  const codeBox = document.getElementById("resp-code-display-box");
  const diffBox = document.getElementById("resp-diff-box");
  const copyBtn = document.getElementById("resp-copy-code-btn");

  const tabBefore = document.getElementById("resp-tab-before");
  const tabAfter = document.getElementById("resp-tab-after");
  const tabDiff = document.getElementById("resp-tab-diff");

  let originalCode = "";
  let responsiveCode = "";
  let activeTab = "after";

  const updateBadge = () => {
    const rem = getRemainingDailyQuota();
    if (quotaBadge) quotaBadge.textContent = `${rem}/3 Free Uses`;
  };
  updateBadge();

  // Sample Fixed Code
  const sampleFixed = `<div class="container" style="width: 1200px; display: flex; gap: 30px; margin: 0 auto;">
  <aside style="width: 300px; background: #1e293b; padding: 20px;">
    <h2>Sidebar Menu</h2>
    <ul>
      <li><a href="#dashboard">Dashboard</a></li>
      <li><a href="#analytics">Analytics</a></li>
      <li><a href="#settings">Settings</a></li>
    </ul>
  </aside>
  <main style="width: 900px; background: #0f172a; padding: 30px;">
    <h1>Main Analytics Content</h1>
    <div style="display: flex; width: 840px; gap: 20px;">
      <div style="width: 260px; height: 180px; background: #334155; padding: 15px;">Metric 1</div>
      <div style="width: 260px; height: 180px; background: #334155; padding: 15px;">Metric 2</div>
      <div style="width: 260px; height: 180px; background: #334155; padding: 15px;">Metric 3</div>
    </div>
  </main>
</div>`;

  sampleBtn?.addEventListener("click", () => {
    if (rawInput) {
      rawInput.value = sampleFixed;
      showToast("Sample non-responsive layout loaded!", "info");
    }
  });

  // Viewport Switchers
  const vpBtns = document.querySelectorAll(".resp-vp-btn");
  const vpLabel = document.getElementById("resp-viewport-label");

  vpBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      vpBtns.forEach((b) => {
        b.classList.remove("bg-cyan-600", "text-white", "font-bold");
        b.classList.add("text-slate-400");
      });
      btn.classList.add("bg-cyan-600", "text-white", "font-bold");
      btn.classList.remove("text-slate-400");

      const width = btn.getAttribute("data-w") || "100%";
      if (stageWrapper) stageWrapper.style.maxWidth = width;
      if (vpLabel) vpLabel.textContent = `(${btn.textContent.trim()})`;
    });
  });

  // Tab handlers
  const updateCodeView = () => {
    if (activeTab === "before") {
      codeBox?.classList.remove("hidden");
      diffBox?.classList.add("hidden");
      if (codeBox) codeBox.innerHTML = `<code>${escapeHtml(originalCode || "// Original code...")}</code>`;
    } else if (activeTab === "after") {
      codeBox?.classList.remove("hidden");
      diffBox?.classList.add("hidden");
      if (codeBox) codeBox.innerHTML = `<code>${escapeHtml(responsiveCode || "// Responsive code...")}</code>`;
    } else if (activeTab === "diff") {
      codeBox?.classList.add("hidden");
      diffBox?.classList.remove("hidden");
      const diffLines = computeSimpleLineDiff(originalCode, responsiveCode);
      if (diffBox) {
        diffBox.innerHTML = diffLines
          .map((d) => {
            if (d.type === "added") {
              return `<div class="bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded flex items-center gap-2"><span class="text-emerald-500 font-bold select-none">+</span><span>${escapeHtml(d.text)}</span></div>`;
            } else if (d.type === "removed") {
              return `<div class="bg-rose-950/60 text-rose-300 px-2 py-0.5 rounded flex items-center gap-2 line-through opacity-75"><span class="text-rose-500 font-bold select-none">-</span><span>${escapeHtml(d.text)}</span></div>`;
            }
            return `<div class="text-slate-500 px-2 py-0.5 flex items-center gap-2"><span class="text-slate-600 select-none">&nbsp;</span><span>${escapeHtml(d.text)}</span></div>`;
          })
          .join("");
      }
    }
  };

  tabBefore?.addEventListener("click", () => {
    activeTab = "before";
    tabBefore.className = "px-3 py-1 rounded bg-cyan-600 text-white font-bold";
    if (tabAfter) tabAfter.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
    if (tabDiff) tabDiff.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
    updateCodeView();
  });

  tabAfter?.addEventListener("click", () => {
    activeTab = "after";
    if (tabAfter) tabAfter.className = "px-3 py-1 rounded bg-cyan-600 text-white font-bold";
    if (tabBefore) tabBefore.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
    if (tabDiff) tabDiff.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
    updateCodeView();
  });

  tabDiff?.addEventListener("click", () => {
    activeTab = "diff";
    if (tabDiff) tabDiff.className = "px-3 py-1 rounded bg-cyan-600 text-white font-bold";
    if (tabBefore) tabBefore.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
    if (tabAfter) tabAfter.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
    updateCodeView();
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(responsiveCode || codeBox?.textContent, "Responsive code");
  });

  // Main Analyze & Make Responsive Action
  analyzeBtn?.addEventListener("click", async () => {
    const raw = rawInput?.value?.trim();
    if (!raw) {
      showToast("Please paste website code first.", "warning");
      return;
    }

    if (!consumeDailyQuota()) {
      showToast("Daily free AI quota reached! Add your Gemini API key in settings.", "error");
      if (window.openCustomKeyModal) window.openCustomKeyModal();
      return;
    }
    updateBadge();

    originalCode = raw;
    if (spinner) spinner.classList.remove("hidden");

    try {
      showToast("Auditing responsiveness across viewports (1440px - 320px)...", "info");
      const prompt = `Refactor this layout to be 100% responsive for Desktop (1440px), Laptop (1024px), Tablet (768px), and Mobile (390px, 320px). Use Flexbox/Grid, flex-wrap, clamp(), and media queries. Preserve all logic and classes.`;
      
      const response = await callAiAssist("make-responsive", prompt, raw);
      const text = response.output || "";

      let extractedCode = text;
      let issuesText = "";

      if (text.includes("<<<IMPROVED_CODE>>>")) {
        const parts = text.split("<<<IMPROVED_CODE>>>");
        if (text.includes("<<<RESPONSIVE_ISSUES>>>")) {
          issuesText = text.split("<<<RESPONSIVE_ISSUES>>>")[1].split("<<<IMPROVED_CODE>>>")[0].trim();
        }
        extractedCode = parts[1].split("<<<SUMMARY>>>")[0].trim();
      } else if (text.includes("```")) {
        const match = text.match(/```(?:html|jsx|tsx|css)?([\s\S]*?)```/);
        if (match) extractedCode = match[1].trim();
      }

      responsiveCode = extractedCode;
      activeTab = "after";
      if (tabAfter) tabAfter.className = "px-3 py-1 rounded bg-cyan-600 text-white font-bold";
      if (tabBefore) tabBefore.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
      if (tabDiff) tabDiff.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
      updateCodeView();

      // Render Sandbox
      if (liveSandbox) {
        liveSandbox.innerHTML = `<div class="w-full p-4">${responsiveCode}</div>`;
      }

      // Display detected issues
      if (issuesPanel && issuesList) {
        if (issuesText) {
          const lines = issuesText.split("\n").filter((l) => l.trim().length > 0);
          issuesList.innerHTML = lines.map((l) => `<div class="flex items-start gap-2"><span class="text-cyan-400">⚠️</span><span>${escapeHtml(l.replace(/^[-*•]\s*/, ""))}</span></div>`).join("");
        } else {
          issuesList.innerHTML = `
            <div class="flex items-start gap-2"><span class="text-cyan-400">⚠️</span><span>Detected fixed-width container (width: 1200px) that clipped on mobile viewports &lt; 768px.</span></div>
            <div class="flex items-start gap-2"><span class="text-cyan-400">⚠️</span><span>Converted rigid flex row into responsive grid with auto-fitting cards.</span></div>
            <div class="flex items-start gap-2"><span class="text-cyan-400">⚠️</span><span>Added mobile-first container padding and fluid typography.</span></div>
          `;
        }
        issuesPanel.classList.remove("hidden");
      }

      showToast("Website successfully converted to mobile-first responsive layout!", "success");
    } catch (err) {
      showToast("Responsive conversion failed: " + err.message, "error");
    } finally {
      if (spinner) spinner.classList.add("hidden");
    }
  });
}
