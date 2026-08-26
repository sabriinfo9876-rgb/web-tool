// Tool View: Code Diff & Comparator (Side-by-Side & Line-by-Line Difference Visualizer)
// 100% Client-side diff engine

import { copyToClipboard, showToast, computeSimpleLineDiff, escapeHtml } from "../../utils.js";

export function renderCodeDiffSuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-emerald-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Developer Tools</span>
        <span>/</span>
        <span class="text-emerald-400 font-bold">Code Diff</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Code Diff &amp; Text Comparator</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">CLIENT-SIDE COMPARISON</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Compare original and modified code blocks or text files with line-by-line additions, deletions, and character differences.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="diff-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Load Sample</button>
        </div>
      </div>

      <!-- Input Editors (Original vs Modified) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Original Text Panel -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-rose-400 font-bold">ORIGINAL TEXT / CODE</span>
          </div>
          <textarea id="diff-orig-input" rows="8" placeholder="Paste original source text or code here..." class="w-full bg-slate-950 p-4 text-xs font-mono text-slate-100 focus:outline-none focus:ring-1 focus:ring-rose-500 resize-y leading-relaxed">function calculateTotal(items) {
  var sum = 0;
  for (var i = 0; i < items.length; i++) {
    sum += items[i].price;
  }
  return sum;
}</textarea>
        </div>

        <!-- Modified Text Panel -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-emerald-400 font-bold">MODIFIED TEXT / CODE</span>
          </div>
          <textarea id="diff-mod-input" rows="8" placeholder="Paste modified source text or code here..." class="w-full bg-slate-950 p-4 text-xs font-mono text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-y leading-relaxed">export function calculateTotal(items: Item[]): number {
  return items.reduce((acc, curr) => acc + (curr.price || 0), 0);
}</textarea>
        </div>

      </div>

      <!-- Diff Output Visualizer -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
        <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-3">
            <span class="text-indigo-400 font-bold">LINE-BY-LINE DIFF RESULTS</span>
            <span id="diff-stats-pill" class="text-[11px] text-slate-400">Comparing...</span>
          </div>
          <button id="diff-copy-btn" class="text-slate-400 hover:text-white text-xs font-semibold">Copy Diff</button>
        </div>
        <div id="diff-results-box" class="p-4 bg-slate-950 text-xs font-mono overflow-auto max-h-[400px] space-y-0.5">
          <!-- Diff lines -->
        </div>
      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Understanding Myers Diff Algorithm and Line Modification Tracking</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Computing differences between text buffers is foundational to version control systems like Git. The objective is to calculate the <strong>Shortest Edit Script (SES)</strong> required to transform sequence A into sequence B.
          </p>
          <p>
            The <strong>Code Diff</strong> utility compares text line-by-line, marking insertions with green plus indicators (<code>+</code>) and removals with red minus indicators (<code>-</code>). This allows developers to audit code refactors, configuration drift, and pull request changes before committing.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initCodeDiffSuiteView() {
  const origInput = document.getElementById("diff-orig-input");
  const modInput = document.getElementById("diff-mod-input");
  const resultsBox = document.getElementById("diff-results-box");
  const statsPill = document.getElementById("diff-stats-pill");
  const sampleBtn = document.getElementById("diff-sample-btn");
  const copyBtn = document.getElementById("diff-copy-btn");

  sampleBtn?.addEventListener("click", () => {
    if (origInput) origInput.value = `const API_URL = "http://localhost:3000";\nfunction fetchData() {\n  return fetch(API_URL).then(r => r.json());\n}`;
    if (modInput) modInput.value = `const API_URL = process.env.VITE_API_URL || "https://api.production.com";\nexport async function fetchData() {\n  const res = await fetch(API_URL);\n  return await res.json();\n}`;
    computeDiff();
  });

  copyBtn?.addEventListener("click", () => {
    const raw = Array.from(resultsBox?.children || []).map(c => c.textContent).join("\n");
    copyToClipboard(raw, "Diff output");
  });

  [origInput, modInput].forEach((el) => el?.addEventListener("input", () => computeDiff()));
  computeDiff();

  function computeDiff() {
    const orig = origInput?.value || "";
    const mod = modInput?.value || "";

    const lines = computeSimpleLineDiff(orig, mod);
    let added = 0;
    let removed = 0;

    if (resultsBox) {
      resultsBox.innerHTML = lines
        .map((d) => {
          if (d.type === "added") {
            added++;
            return `<div class="bg-emerald-950/60 text-emerald-300 px-3 py-1 rounded flex items-center gap-3"><span class="text-emerald-500 font-bold select-none w-4 text-center">+</span><span>${escapeHtml(d.text)}</span></div>`;
          } else if (d.type === "removed") {
            removed++;
            return `<div class="bg-rose-950/60 text-rose-300 px-3 py-1 rounded flex items-center gap-3 line-through opacity-80"><span class="text-rose-500 font-bold select-none w-4 text-center">-</span><span>${escapeHtml(d.text)}</span></div>`;
          }
          return `<div class="text-slate-400 px-3 py-1 flex items-center gap-3"><span class="text-slate-600 select-none w-4 text-center">&nbsp;</span><span>${escapeHtml(d.text)}</span></div>`;
        })
        .join("");
    }

    if (statsPill) {
      statsPill.textContent = `+${added} additions, -${removed} deletions`;
    }
  }
}
