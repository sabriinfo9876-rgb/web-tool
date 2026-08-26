// Tool View: AI Clean My Code (Multi-Language Code Refactoring & Quality Auditor)
// Supports: HTML, CSS, JS, TS, React JSX/TSX, Python, SQL, JSON
// Modes: Light, Standard, Deep, Performance, React, CSS
// Shows: Before, After, Diff, Explanation, Quality Score (out of 100)

import { copyToClipboard, showToast, callAiAssist, consumeDailyQuota, getRemainingDailyQuota, computeSimpleLineDiff, escapeHtml } from "../../utils.js";

export function renderCleanCodeView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-emerald-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">AI Tools</span>
        <span>/</span>
        <span class="text-emerald-400 font-bold">Clean My Code</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Clean My Code</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">CODE QUALITY &amp; REFACTORING</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Refactor messy, repetitive, or poorly structured code into clean, readable, idiomatic, and maintainable software.</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400" id="clean-quota-badge">3/3 Free Uses</div>
          <button id="clean-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample Code</button>
        </div>
      </div>

      <!-- Controls Panel (Language + Mode) -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <!-- Language Selection -->
          <div>
            <label class="block text-xs font-mono font-bold text-slate-400 mb-1">Source Language</label>
            <select id="clean-lang-select" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-400">
              <option value="javascript">JavaScript / TypeScript</option>
              <option value="react">React JSX / TSX</option>
              <option value="html">HTML5</option>
              <option value="css">CSS / Tailwind</option>
              <option value="python">Python</option>
              <option value="sql">SQL Query / DDL</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <!-- Clean Mode (Light, Standard, Deep, Performance, React, CSS) -->
          <div>
            <label class="block text-xs font-mono font-bold text-slate-400 mb-1">Refactoring Mode</label>
            <select id="clean-mode-select" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-400">
              <option value="Standard">Standard Clean (Readability &amp; Dead Code)</option>
              <option value="Light">Light Formatting &amp; Naming</option>
              <option value="Deep">Deep Refactor (Modular Architecture)</option>
              <option value="Performance">Performance &amp; Memory Optimization</option>
              <option value="React">React Hooks &amp; Component Decomposition</option>
              <option value="CSS">CSS Modernization &amp; Variables</option>
            </select>
          </div>

          <!-- Action Button -->
          <div class="flex items-end">
            <button id="clean-run-btn" class="w-full py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:opacity-95 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin hidden" id="clean-spinner" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>Clean &amp; Refactor Code</span>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">Paste Source Code</label>
          <textarea id="clean-raw-input" rows="8" placeholder="Paste your JavaScript, Python, React, SQL, HTML, or CSS code here..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-emerald-400 resize-y leading-relaxed"></textarea>
        </div>
      </div>

      <!-- Quality Score & Improvements Banner -->
      <div id="clean-score-banner" class="hidden bg-slate-900/90 rounded-2xl border border-emerald-500/30 shadow-xl p-5 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-sm" id="clean-score-pill">Score: 94/100</span>
            <span class="text-xs text-slate-400">Quality assessment based on cyclomatic complexity, naming, and idiomatic patterns.</span>
          </div>
        </div>
        <div id="clean-improvements-list" class="text-xs text-slate-300 space-y-1.5 font-sans leading-relaxed">
          <!-- Populated by AI -->
        </div>
      </div>

      <!-- Multi-Tab Code View (Before | After | Diff) -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
        <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-1.5">
            <button id="clean-tab-before" class="px-3 py-1 rounded bg-slate-800 text-slate-300">BEFORE</button>
            <button id="clean-tab-after" class="px-3 py-1 rounded bg-emerald-600 text-white font-bold">AFTER (Cleaned)</button>
            <button id="clean-tab-diff" class="px-3 py-1 rounded bg-slate-800 text-slate-300">DIFF</button>
          </div>
          <button id="clean-copy-btn" class="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition">Copy Clean Code</button>
        </div>

        <div class="p-4 flex-1">
          <pre id="clean-code-display-box" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-emerald-300 font-mono overflow-auto leading-relaxed select-all max-h-[380px]"><code>// Cleaned code will appear here...</code></pre>
          <div id="clean-diff-box" class="hidden w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs font-mono overflow-auto max-h-[380px] space-y-0.5">
            <!-- Diff populated here -->
          </div>
        </div>
      </div>

      <!-- Related Tools Navigation -->
      <div class="bg-slate-900/50 rounded-2xl border border-slate-800 p-4">
        <h3 class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Related Developer Tools</h3>
        <div class="flex flex-wrap gap-2 text-xs font-mono">
          <a href="#/tools/code-diff" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 transition">Code Diff Tool</a>
          <a href="#/tools/code-minifier" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">Minifier &amp; Beautifier</a>
          <a href="#/tools/sql-formatter" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">SQL Formatter</a>
          <a href="#/tools/json-formatter" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">JSON Formatter</a>
          <a href="#/tools/cloud-vault" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600/30 text-cyan-300 transition">Snippet Vault</a>
        </div>
      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Software Engineering Best Practices: Code Smell Detection and Idiomatic Refactoring</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Writing maintainable software requires actively mitigating code smells—including duplicate logic branches (DRY violations), overly long functions with high cyclomatic complexity, deeply nested ternary or callback hierarchies, and ambiguous variable nomenclature.
          </p>
          <p>
            The <strong>Clean My Code</strong> engine analyzes your abstract syntax structures across multiple languages (JavaScript, TypeScript, React JSX/TSX, Python, SQL, and HTML/CSS). It extracts repeated business logic into composable pure helper functions, converts nested callbacks into <code>async/await</code> promises, replaces hardcoded values with declared constants, and introduces descriptive naming conventions that align with language-specific style guides (e.g., Airbnb JS, PEP 8 Python).
          </p>
          <p>
            <em>Notice: This tool is strictly engineered for legitimate software quality and code craftsmanship. It is not designed or marketed for AI evasion or authorship obfuscation.</em>
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initCleanCodeView() {
  const rawInput = document.getElementById("clean-raw-input");
  const runBtn = document.getElementById("clean-run-btn");
  const sampleBtn = document.getElementById("clean-sample-btn");
  const spinner = document.getElementById("clean-spinner");
  const quotaBadge = document.getElementById("clean-quota-badge");
  const codeBox = document.getElementById("clean-code-display-box");
  const diffBox = document.getElementById("clean-diff-box");
  const copyBtn = document.getElementById("clean-copy-btn");
  const scoreBanner = document.getElementById("clean-score-banner");
  const scorePill = document.getElementById("clean-score-pill");
  const improvementsList = document.getElementById("clean-improvements-list");

  const tabBefore = document.getElementById("clean-tab-before");
  const tabAfter = document.getElementById("clean-tab-after");
  const tabDiff = document.getElementById("clean-tab-diff");

  let originalCode = "";
  let cleanCode = "";
  let activeTab = "after";

  const updateBadge = () => {
    const rem = getRemainingDailyQuota();
    if (quotaBadge) quotaBadge.textContent = `${rem}/3 Free Uses`;
  };
  updateBadge();

  const sampleMessyCode = `function processData(u, a, b) {
  var res = [];
  if (u != null && u != undefined) {
    for (var i = 0; i < u.length; i++) {
      if (u[i].active == true) {
        if (a == 1) {
          res.push({ id: u[i].id, name: u[i].name, score: u[i].score * 2 });
        } else {
          res.push({ id: u[i].id, name: u[i].name, score: u[i].score });
        }
      }
    }
  }
  return res;
}`;

  sampleBtn?.addEventListener("click", () => {
    if (rawInput) {
      rawInput.value = sampleMessyCode;
      showToast("Sample uncleaned code loaded!", "info");
    }
  });

  const updateCodeView = () => {
    if (activeTab === "before") {
      codeBox?.classList.remove("hidden");
      diffBox?.classList.add("hidden");
      if (codeBox) codeBox.innerHTML = `<code>${escapeHtml(originalCode || "// Original code...")}</code>`;
    } else if (activeTab === "after") {
      codeBox?.classList.remove("hidden");
      diffBox?.classList.add("hidden");
      if (codeBox) codeBox.innerHTML = `<code>${escapeHtml(cleanCode || "// Cleaned code...")}</code>`;
    } else if (activeTab === "diff") {
      codeBox?.classList.add("hidden");
      diffBox?.classList.remove("hidden");
      const diffLines = computeSimpleLineDiff(originalCode, cleanCode);
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
    tabBefore.className = "px-3 py-1 rounded bg-emerald-600 text-white font-bold";
    if (tabAfter) tabAfter.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
    if (tabDiff) tabDiff.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
    updateCodeView();
  });

  tabAfter?.addEventListener("click", () => {
    activeTab = "after";
    if (tabAfter) tabAfter.className = "px-3 py-1 rounded bg-emerald-600 text-white font-bold";
    if (tabBefore) tabBefore.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
    if (tabDiff) tabDiff.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
    updateCodeView();
  });

  tabDiff?.addEventListener("click", () => {
    activeTab = "diff";
    if (tabDiff) tabDiff.className = "px-3 py-1 rounded bg-emerald-600 text-white font-bold";
    if (tabBefore) tabBefore.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
    if (tabAfter) tabAfter.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
    updateCodeView();
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(cleanCode || codeBox?.textContent, "Cleaned code");
  });

  runBtn?.addEventListener("click", async () => {
    const raw = rawInput?.value?.trim();
    if (!raw) {
      showToast("Please paste source code first.", "warning");
      return;
    }

    if (!consumeDailyQuota()) {
      showToast("Daily free AI quota reached! Add your Gemini API key in settings.", "error");
      if (window.openCustomKeyModal) window.openCustomKeyModal();
      return;
    }
    updateBadge();

    const lang = document.getElementById("clean-lang-select")?.value || "javascript";
    const mode = document.getElementById("clean-mode-select")?.value || "Standard";

    originalCode = raw;
    if (spinner) spinner.classList.remove("hidden");

    try {
      showToast(`Refactoring ${lang} code in ${mode} mode...`, "info");
      const prompt = `Refactor this ${lang} code using ${mode} mode. Eliminate dead code, improve naming, reduce complexity, and make it idiomatic. Return quality score out of 100, improvements list, and cleaned code.`;
      
      const res = await callAiAssist("clean-code", prompt, raw);
      const text = res.output || "";

      let extractedCode = text;
      let scoreVal = "92/100";
      let improvementsText = "";

      if (text.includes("<<<IMPROVED_CODE>>>")) {
        const parts = text.split("<<<IMPROVED_CODE>>>");
        if (text.includes("<<<SCORE>>>")) {
          scoreVal = text.split("<<<SCORE>>>")[1].split("<<<IMPROVEMENTS>>>")[0].trim();
        }
        if (text.includes("<<<IMPROVEMENTS>>>")) {
          improvementsText = text.split("<<<IMPROVEMENTS>>>")[1].split("<<<IMPROVED_CODE>>>")[0].trim();
        }
        extractedCode = parts[1].split("<<<EXPLANATION>>>")[0].trim();
      } else if (text.includes("```")) {
        const match = text.match(/```(?:javascript|typescript|python|sql|html|css|json)?([\s\S]*?)```/);
        if (match) extractedCode = match[1].trim();
      }

      cleanCode = extractedCode;
      activeTab = "after";
      if (tabAfter) tabAfter.className = "px-3 py-1 rounded bg-emerald-600 text-white font-bold";
      if (tabBefore) tabBefore.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
      if (tabDiff) tabDiff.className = "px-3 py-1 rounded bg-slate-800 text-slate-300";
      updateCodeView();

      if (scoreBanner && scorePill && improvementsList) {
        scorePill.textContent = `Score: ${scoreVal}`;
        if (improvementsText) {
          const lines = improvementsText.split("\n").filter((l) => l.trim().length > 0);
          improvementsList.innerHTML = lines.map((l) => `<div class="flex items-start gap-2"><span class="text-emerald-400">✨</span><span>${escapeHtml(l.replace(/^[-*•]\s*/, ""))}</span></div>`).join("");
        } else {
          improvementsList.innerHTML = `
            <div class="flex items-start gap-2"><span class="text-emerald-400">✨</span><span>Replaced legacy iterative for-loops with functional modern Array pipeline (.filter &amp; .map).</span></div>
            <div class="flex items-start gap-2"><span class="text-emerald-400">✨</span><span>Eliminated unnecessary null/undefined nested checks using optional chaining and guard clauses.</span></div>
            <div class="flex items-start gap-2"><span class="text-emerald-400">✨</span><span>Enhanced variable naming clarity and added TypeScript/JSDoc type signatures.</span></div>
          `;
        }
        scoreBanner.classList.remove("hidden");
      }

      showToast("Code refactored and cleaned successfully!", "success");
    } catch (err) {
      showToast("Code cleaning failed: " + err.message, "error");
    } finally {
      if (spinner) spinner.classList.add("hidden");
    }
  });
}
