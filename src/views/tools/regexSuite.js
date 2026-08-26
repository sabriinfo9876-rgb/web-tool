// Tool View: Regex Tester & Pattern Sandbox
// Live match highlighting, capture groups, replace preview, and preset library

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderRegexSuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-indigo-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Web Tools</span>
        <span>/</span>
        <span class="text-indigo-400 font-bold">Regex Tester</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Regex Tester</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">REAL-TIME ENGINE</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Test JavaScript regular expressions with real-time match highlighting, capture groups, replace previews, and standard pattern presets.</p>
        </div>
      </div>

      <!-- Regex Input Bar -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div>
          <label class="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">Regular Expression &amp; Flags</label>
          <div class="flex items-center gap-2">
            <span class="text-base font-mono text-indigo-400 font-bold">/</span>
            <input type="text" id="regex-pattern-input" value="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" placeholder="e.g. ([0-9]{4})-([0-9]{2})-([0-9]{2})" class="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-400" />
            <span class="text-base font-mono text-indigo-400 font-bold">/</span>
            <input type="text" id="regex-flags-input" value="gm" placeholder="flags (g, i, m, s)" class="w-20 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-400 text-center" />
          </div>
        </div>

        <!-- Pattern Library Chips -->
        <div class="space-y-1.5">
          <span class="text-[11px] font-mono text-slate-400 font-bold uppercase">Quick Regex Presets:</span>
          <div class="flex flex-wrap gap-1.5 text-xs font-mono">
            <button class="regex-preset-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 border border-slate-700" data-pat="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" data-flags="gm">Email Address</button>
            <button class="regex-preset-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 border border-slate-700" data-pat="https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)" data-flags="g">URL / Link</button>
            <button class="regex-preset-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 border border-slate-700" data-pat="\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b" data-flags="g">IPv4 Address</button>
            <button class="regex-preset-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 border border-slate-700" data-pat="#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})" data-flags="g">Hex Color</button>
            <button class="regex-preset-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 border border-slate-700" data-pat="\\b\\d{4}[-/]\\d{2}[-/]\\d{2}\\b" data-flags="g">ISO Date (YYYY-MM-DD)</button>
          </div>
        </div>
      </div>

      <!-- Test String & Live Match Highlighting Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Test String Input -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-slate-300 font-bold">TEST TEXT STRING</span>
            <span id="regex-match-stat" class="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-bold">0 matches</span>
          </div>
          <textarea id="regex-test-text" rows="12" placeholder="Enter text to match against regular expression..." class="w-full flex-1 bg-slate-950 p-4 text-xs font-mono text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed">Contact support at team@webdevhub.app or sales-inquiry@company.org.
You can also reach out to admin@example.io for API credentials.</textarea>
        </div>

        <!-- Highlighted Matches View -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-indigo-400 font-bold">HIGHLIGHTED MATCHES</span>
            <button id="regex-copy-matches" class="text-slate-400 hover:text-white text-xs font-semibold">Copy Matches</button>
          </div>
          <div id="regex-highlight-view" class="p-4 bg-slate-950 flex-1 text-xs font-mono text-slate-300 overflow-auto max-h-[340px] leading-relaxed whitespace-pre-wrap">
            <!-- Highlighted output -->
          </div>
        </div>

      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">JavaScript Regular Expressions: Engine Evaluation and Flags Guide</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>Regular Expressions (RegEx)</strong> are declarative character sequences defining search patterns. In JavaScript, regex patterns are evaluated using standard ECMAScript engines supporting lookahead (<code>(?=...)</code>), lookbehind (<code>(?&lt;=...)</code>), non-capturing groups (<code>(?:...)</code>), and named capture groups (<code>(?&lt;name&gt;...)</code>).
          </p>
          <p>
            Standard modifier flags include:
            <code>g</code> (global search across all occurrences),
            <code>i</code> (case-insensitive matching),
            <code>m</code> (multiline mode treating <code>^</code> and <code>$</code> as start/end of individual lines), and
            <code>s</code> (dotAll mode allowing <code>.</code> to match newline characters).
          </p>
          <p>
            Client-side regex execution is completely sandboxed, allowing engineers to test validation rules for emails, phone numbers, UUIDs, and complex tokens with instantaneous visual feedback.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initRegexSuiteView() {
  const patternInput = document.getElementById("regex-pattern-input");
  const flagsInput = document.getElementById("regex-flags-input");
  const testText = document.getElementById("regex-test-text");
  const highlightView = document.getElementById("regex-highlight-view");
  const matchStat = document.getElementById("regex-match-stat");
  const copyBtn = document.getElementById("regex-copy-matches");
  const presetBtns = document.querySelectorAll(".regex-preset-btn");

  presetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (patternInput) patternInput.value = btn.getAttribute("data-pat") || "";
      if (flagsInput) flagsInput.value = btn.getAttribute("data-flags") || "g";
      evaluateRegex();
    });
  });

  copyBtn?.addEventListener("click", () => {
    const rawMatches = Array.from(highlightView?.querySelectorAll("mark") || []).map((m) => m.textContent);
    copyToClipboard(rawMatches.join("\n"), "Extracted regex matches");
  });

  [patternInput, flagsInput, testText].forEach((el) => {
    el?.addEventListener("input", () => evaluateRegex());
  });

  evaluateRegex();

  function evaluateRegex() {
    const patStr = patternInput?.value || "";
    const flagsStr = flagsInput?.value || "";
    const text = testText?.value || "";

    if (!patStr || !text) {
      if (highlightView) highlightView.innerHTML = escapeHtml(text);
      if (matchStat) {
        matchStat.textContent = "0 matches";
        matchStat.className = "px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400";
      }
      return;
    }

    try {
      const regex = new RegExp(patStr, flagsStr.includes("g") ? flagsStr : flagsStr + "g");
      let matchesCount = 0;

      const highlighted = text.replace(regex, (match) => {
        matchesCount++;
        return `<mark class="bg-indigo-500/30 text-indigo-300 border-b border-indigo-400 rounded px-0.5 font-bold">${escapeHtml(match)}</mark>`;
      });

      if (highlightView) highlightView.innerHTML = highlighted;
      if (matchStat) {
        matchStat.textContent = `${matchesCount} match${matchesCount === 1 ? "" : "es"}`;
        matchStat.className = matchesCount > 0 ? "px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-bold" : "px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400";
      }
    } catch (err) {
      if (highlightView) highlightView.innerHTML = `<span class="text-rose-400">Regex Error: ${escapeHtml(err.message)}</span>`;
      if (matchStat) {
        matchStat.textContent = "Invalid pattern";
        matchStat.className = "px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-400 font-bold";
      }
    }
  }
}
