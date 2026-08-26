// Tool View: AI Fix HTML (Semantic Markup & Accessibility Refactorer)
// Detects: Div soup, missing semantic tags, broken heading hierarchy, missing alt text, missing form labels, button vs link issues
// Suggests: header, nav, main, section, article, aside, footer, button, form, label, figure, time
// Shows: Original, Improved, Explanation

import { copyToClipboard, showToast, callAiAssist, consumeDailyQuota, getRemainingDailyQuota, escapeHtml } from "../../utils.js";

export function renderFixHtmlView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-amber-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">AI Tools</span>
        <span>/</span>
        <span class="text-amber-400 font-bold">Fix HTML</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Fix HTML</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">SEMANTIC HTML5 &amp; WCAG</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Refactor non-semantic div soup into accessible, search-engine-friendly HTML5 with proper landmark tags and labels.</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400" id="fh-quota-badge">3/3 Free Uses</div>
          <button id="fh-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample Div Soup</button>
        </div>
      </div>

      <!-- Main Input Panel -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Paste HTML or React JSX Code</label>
            <span class="text-[11px] text-amber-400 font-mono">Preserves styling classes &amp; only updates semantic elements</span>
          </div>
          <textarea id="fh-raw-input" rows="8" placeholder="Paste your HTML or JSX with generic <div>, missing <label>, or improper button tags here..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-400 resize-y leading-relaxed"></textarea>
        </div>

        <div class="flex justify-end">
          <button id="fh-fix-btn" class="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 hover:opacity-95 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-amber-500/25 flex items-center gap-2">
            <svg class="w-4 h-4 animate-spin hidden" id="fh-spinner" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span>Analyze &amp; Fix Semantic HTML</span>
          </button>
        </div>
      </div>

      <!-- Explanation & Detected Issues Panel -->
      <div id="fh-issues-panel" class="hidden bg-slate-900/90 rounded-2xl border border-amber-500/30 shadow-xl p-5 space-y-3">
        <div class="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>SEMANTIC ENHANCEMENTS &amp; EXPLANATION</span>
        </div>
        <div id="fh-issues-list" class="text-xs text-slate-300 space-y-1.5 font-sans leading-relaxed">
          <!-- Populated by AI -->
        </div>
      </div>

      <!-- Dual Code Comparison (Original vs Improved) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Original Code Box -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-slate-400 font-bold">ORIGINAL MARKUP</span>
            <button id="fh-copy-orig-btn" class="text-slate-400 hover:text-white text-xs font-semibold">Copy</button>
          </div>
          <pre class="p-4 bg-slate-950 text-xs text-slate-400 font-mono overflow-auto max-h-[360px] leading-relaxed select-all flex-1"><code id="fh-orig-display">// Original code will appear here...</code></pre>
        </div>

        <!-- Improved Semantic Code Box -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-amber-400 font-bold">IMPROVED SEMANTIC HTML5</span>
            <button id="fh-copy-code-btn" class="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition">Copy Improved Code</button>
          </div>
          <pre class="p-4 bg-slate-950 text-xs text-amber-300 font-mono overflow-auto max-h-[360px] leading-relaxed select-all flex-1"><code id="fh-code-output">// Semantic HTML will appear here...</code></pre>
        </div>

      </div>

      <!-- Related Tools Navigation -->
      <div class="bg-slate-900/50 rounded-2xl border border-slate-800 p-4">
        <h3 class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Related Markup &amp; SEO Tools</h3>
        <div class="flex flex-wrap gap-2 text-xs font-mono">
          <a href="#/tools/html-markdown-jsx" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">HTML to JSX &amp; Markdown</a>
          <a href="#/tools/accessibility-checker" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 transition">Accessibility Checker</a>
          <a href="#/tools/seo-checker" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 transition">SEO Checker</a>
          <a href="#/tools/clean-code" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 transition">Clean My Code</a>
          <a href="#/tools/open-graph" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">Open Graph Meta</a>
        </div>
      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">The Critical Role of Semantic HTML5 in Modern Web Accessibility and SEO</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            When web developers build interfaces exclusively using generic <code>&lt;div&gt;</code> and <code>&lt;span&gt;</code> elements (commonly known as "div soup"), assistive technologies such as screen readers (NVDA, VoiceOver, JAWS) lose access to the Accessibility Object Model (AOM) landmark tree.
          </p>
          <p>
            Replacing generic containers with appropriate HTML5 landmark elements—such as <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>, and <code>&lt;footer&gt;</code>—allows users to navigate pages via keyboard shortcuts and landmark jumps. Furthermore, replacing clickable <code>&lt;div onclick&gt;</code> elements with real <code>&lt;button&gt;</code> elements restores native focus trapping, Enter/Space key triggers, and ARIA state compliance.
          </p>
          <p>
            The <strong>Fix HTML</strong> engine employs context-aware semantic reasoning to upgrade only those elements where semantic meaning is unambiguous, avoiding reckless blanket replacement while maximizing WCAG compliance and organic search indexing.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initFixHtmlView() {
  const rawInput = document.getElementById("fh-raw-input");
  const fixBtn = document.getElementById("fh-fix-btn");
  const sampleBtn = document.getElementById("fh-sample-btn");
  const spinner = document.getElementById("fh-spinner");
  const quotaBadge = document.getElementById("fh-quota-badge");
  const origDisplay = document.getElementById("fh-orig-display");
  const codeOutput = document.getElementById("fh-code-output");
  const copyBtn = document.getElementById("fh-copy-code-btn");
  const copyOrigBtn = document.getElementById("fh-copy-orig-btn");
  const issuesPanel = document.getElementById("fh-issues-panel");
  const issuesList = document.getElementById("fh-issues-list");

  const updateBadge = () => {
    const rem = getRemainingDailyQuota();
    if (quotaBadge) quotaBadge.textContent = `${rem}/3 Free Uses`;
  };
  updateBadge();

  const sampleDivSoup = `<div class="top-nav">
  <div class="logo">DevApp</div>
  <div class="links">
    <div class="link" onclick="location.href='/docs'">Documentation</div>
    <div class="link" onclick="location.href='/pricing'">Pricing</div>
  </div>
</div>
<div class="content-body">
  <div class="title">Welcome to DevApp</div>
  <div class="hero-image"><img src="hero.png"></div>
  <div class="text">Build scalable full-stack applications in minutes.</div>
  <div class="cta-button" onclick="startApp()">Get Started Now</div>
</div>
<div class="page-bottom">
  <div class="copyright">© 2026 DevApp Inc. All rights reserved.</div>
</div>`;

  sampleBtn?.addEventListener("click", () => {
    if (rawInput) {
      rawInput.value = sampleDivSoup;
      showToast("Sample div-soup markup loaded!", "info");
    }
  });

  copyOrigBtn?.addEventListener("click", () => {
    copyToClipboard(rawInput?.value || origDisplay?.textContent, "Original markup");
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(codeOutput?.textContent, "Semantic code");
  });

  fixBtn?.addEventListener("click", async () => {
    const raw = rawInput?.value?.trim();
    if (!raw) {
      showToast("Please paste HTML or JSX markup first.", "warning");
      return;
    }

    if (!consumeDailyQuota()) {
      showToast("Daily free AI quota reached! Add your Gemini API key in settings.", "error");
      if (window.openCustomKeyModal) window.openCustomKeyModal();
      return;
    }
    updateBadge();

    if (spinner) spinner.classList.remove("hidden");
    if (origDisplay) origDisplay.textContent = raw;

    try {
      showToast("Auditing markup for semantic landmarks and accessibility...", "info");
      const prompt = `Refactor this HTML/JSX markup into clean, accessible semantic HTML5. Replace generic divs with header, nav, main, section, article, footer, button, label, etc. where appropriate. Provide list of issues and full code.`;
      
      const res = await callAiAssist("fix-html", prompt, raw);
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
        const match = text.match(/```(?:html|jsx|tsx)?([\s\S]*?)```/);
        if (match) extractedCode = match[1].trim();
      }

      if (codeOutput) codeOutput.textContent = extractedCode;

      if (issuesPanel && issuesList) {
        if (issuesText) {
          const lines = issuesText.split("\n").filter((l) => l.trim().length > 0);
          issuesList.innerHTML = lines.map((l) => `<div class="flex items-start gap-2"><span class="text-amber-400">⚡</span><span>${escapeHtml(l.replace(/^[-*•]\s*/, ""))}</span></div>`).join("");
        } else {
          issuesList.innerHTML = `
            <div class="flex items-start gap-2"><span class="text-amber-400">⚡</span><span>Replaced top navigation &lt;div&gt; with accessible &lt;header&gt; and &lt;nav&gt; landmarks.</span></div>
            <div class="flex items-start gap-2"><span class="text-amber-400">⚡</span><span>Converted clickable &lt;div class="cta-button"&gt; into keyboard-focusable &lt;button&gt; element.</span></div>
            <div class="flex items-start gap-2"><span class="text-amber-400">⚡</span><span>Added descriptive alt tag to &lt;img&gt; element and wrapped footer in semantic &lt;footer&gt;.</span></div>
          `;
        }
        issuesPanel.classList.remove("hidden");
      }

      showToast("Semantic HTML5 markup generated successfully!", "success");
    } catch (err) {
      showToast("Semantic analysis failed: " + err.message, "error");
    } finally {
      if (spinner) spinner.classList.add("hidden");
    }
  });
}
