// Tool View: Regex Tester, Visual Matcher & Replace Sandbox with SEO Guide

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderRegexTesterView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Regex Tester, Matcher &amp; Substitution Sandbox</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30">PATTERN LAB</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Real-time regular expression tester with flag selectors, visual token highlighting, capture groups, and replacement preview.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="regex-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Email Sample</button>
          <button id="regex-copy-btn" class="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shadow-md shadow-teal-500/20">Copy Regex</button>
        </div>
      </div>

      <!-- Regex Input Bar with Flags -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <!-- Pattern Box -->
          <div class="flex-1 flex items-center bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-teal-300 font-mono text-sm focus-within:border-teal-400">
            <span class="text-slate-500 font-bold select-none pr-1">/</span>
            <input type="text" id="regex-pattern" value="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" placeholder="Enter regular expression pattern..." class="flex-1 bg-transparent border-none text-teal-300 font-mono focus:outline-none" />
            <span class="text-slate-500 font-bold select-none pl-1">/</span>
          </div>

          <!-- Flags Checkbox Pills -->
          <div class="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-400">
            <label class="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 cursor-pointer">
              <input type="checkbox" id="flag-g" checked class="rounded border-slate-700 text-teal-500" />
              <span>g (global)</span>
            </label>
            <label class="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 cursor-pointer">
              <input type="checkbox" id="flag-i" checked class="rounded border-slate-700 text-teal-500" />
              <span>i (case-insensitive)</span>
            </label>
            <label class="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 cursor-pointer">
              <input type="checkbox" id="flag-m" class="rounded border-slate-700 text-teal-500" />
              <span>m (multiline)</span>
            </label>
            <label class="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 cursor-pointer">
              <input type="checkbox" id="flag-s" class="rounded border-slate-700 text-teal-500" />
              <span>s (dotAll)</span>
            </label>
          </div>
        </div>

        <!-- Preset Patterns Quick Picker -->
        <div class="flex items-center gap-2 flex-wrap text-[11px] font-mono">
          <span class="text-slate-400">Presets:</span>
          <button class="regex-preset-btn px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300" data-pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}">Email Address</button>
          <button class="regex-preset-btn px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300" data-pattern="https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)">URL / Link</button>
          <button class="regex-preset-btn px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300" data-pattern="\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b">IPv4 Address</button>
          <button class="regex-preset-btn px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300" data-pattern="#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})">HEX Color</button>
          <button class="regex-preset-btn px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300" data-pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}">Strong Password</button>
        </div>
      </div>

      <!-- Test String & Visual Match Highlight Area -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Input Test String -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>TEST STRINGS &amp; SAMPLE CORPUS</span>
            <span id="regex-match-count" class="text-teal-400 font-bold">0 matches</span>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <textarea id="regex-test-input" rows="8" placeholder="Paste test text here to run regex evaluations..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-teal-400 resize-y leading-relaxed flex-1">Contact engineering at dev@webdevhub.app or support@example.org.
You can also reach our CTO directly at shahzeb.dev@google.com!
Legacy email: admin@localhost</textarea>
          </div>
        </div>

        <!-- Highlighted Visual Output -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>VISUAL MATCH HIGHLIGHTS</span>
            <span id="regex-error-label" class="hidden text-rose-400 font-bold">Invalid Pattern</span>
          </div>
          <div class="p-4 flex-1 overflow-auto max-h-56">
            <div id="regex-highlight-view" class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap"></div>
          </div>
        </div>

      </div>

      <!-- Substitution / String Replace Sandbox -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3">
        <div class="flex items-center justify-between text-xs font-mono">
          <span class="font-bold text-slate-300 uppercase tracking-wider">Substitution / Replace Sandbox</span>
          <button id="regex-copy-replaced-btn" class="text-teal-400 hover:text-teal-300 font-semibold">Copy Replaced Output</button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="sm:col-span-1">
            <label class="block text-slate-400 text-xs font-mono mb-1">Replace With (supports $1, $2, etc.)</label>
            <input type="text" id="regex-replace-val" value="[PROTECTED_EMAIL]" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-mono text-teal-300 focus:outline-none" />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-slate-400 text-xs font-mono mb-1">Replaced Output</label>
            <div id="regex-replace-output" class="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-auto whitespace-pre-wrap"></div>
          </div>
        </div>
      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Mastering Regular Expressions (RegEx), Finite Automata &amp; Regex Flags</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>Regular Expressions (RegEx)</strong> define formal algebraic search patterns processed through Non-deterministic and Deterministic Finite Automata (NFA / DFA) engines built into modern V8, SpiderMonkey, and JavaScript runtimes.
          </p>
          <p>
            Mastering regex flag combinations is critical for precise data validation and string transformation:
            <strong><code>g</code> (global)</strong> prevents early termination after the first match; 
            <strong><code>i</code> (ignoreCase)</strong> disables case sensitivity; 
            <strong><code>m</code> (multiline)</strong> treats caret (<code>^</code>) and dollar (<code>$</code>) as line start/end anchors instead of whole-string boundaries; and 
            <strong><code>s</code> (dotAll)</strong> permits the dot operator to match newline characters (<code>\n</code>).
          </p>
          <p>
            Our tool delivers client-side evaluation with capture groups, token indexing, and substitution token replacement (such as backreferences <code>$1</code>, <code>$2</code>) for data scrubbing, sanitization, and parsing pipelines.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initRegexTesterView() {
  const patternInput = document.getElementById("regex-pattern");
  const testInput = document.getElementById("regex-test-input");
  const replaceInput = document.getElementById("regex-replace-val");
  const highlightView = document.getElementById("regex-highlight-view");
  const replaceOutput = document.getElementById("regex-replace-output");
  const matchCount = document.getElementById("regex-match-count");
  const errorLabel = document.getElementById("regex-error-label");

  const flagG = document.getElementById("flag-g");
  const flagI = document.getElementById("flag-i");
  const flagM = document.getElementById("flag-m");
  const flagS = document.getElementById("flag-s");

  const sampleBtn = document.getElementById("regex-sample-btn");
  const copyBtn = document.getElementById("regex-copy-btn");
  const copyReplacedBtn = document.getElementById("regex-copy-replaced-btn");
  const presetButtons = document.querySelectorAll(".regex-preset-btn");

  function evaluateRegex() {
    const rawPattern = patternInput.value;
    const testStr = testInput.value;
    const replaceVal = replaceInput.value;

    let flags = "";
    if (flagG.checked) flags += "g";
    if (flagI.checked) flags += "i";
    if (flagM.checked) flags += "m";
    if (flagS.checked) flags += "s";

    if (!rawPattern) {
      highlightView.textContent = testStr;
      replaceOutput.textContent = testStr;
      matchCount.textContent = "0 matches";
      errorLabel.classList.add("hidden");
      return;
    }

    try {
      const regex = new RegExp(rawPattern, flags);
      errorLabel.classList.add("hidden");

      let count = 0;
      let highlighted = "";

      if (flags.includes("g")) {
        const matches = [...testStr.matchAll(regex)];
        count = matches.length;

        let lastIndex = 0;
        matches.forEach(m => {
          const matchText = m[0];
          const matchIdx = m.index;
          highlighted += escapeHtml(testStr.slice(lastIndex, matchIdx));
          highlighted += `<mark class="bg-teal-500/30 text-teal-200 border border-teal-500/50 px-1 rounded">${escapeHtml(matchText)}</mark>`;
          lastIndex = matchIdx + matchText.length;
        });
        highlighted += escapeHtml(testStr.slice(lastIndex));
      } else {
        const m = testStr.match(regex);
        if (m) {
          count = 1;
          const matchIdx = m.index;
          highlighted = escapeHtml(testStr.slice(0, matchIdx)) +
            `<mark class="bg-teal-500/30 text-teal-200 border border-teal-500/50 px-1 rounded">${escapeHtml(m[0])}</mark>` +
            escapeHtml(testStr.slice(matchIdx + m[0].length));
        } else {
          highlighted = escapeHtml(testStr);
        }
      }

      highlightView.innerHTML = highlighted || "<span class='text-slate-500'>No text to match.</span>";
      matchCount.textContent = `${count} ${count === 1 ? "match" : "matches"}`;

      // Substitution
      const replaced = testStr.replace(regex, replaceVal);
      replaceOutput.textContent = replaced;
    } catch (err) {
      errorLabel.textContent = `Syntax Error: ${err.message}`;
      errorLabel.classList.remove("hidden");
      highlightView.innerHTML = `<span class="text-rose-400">${escapeHtml(err.message)}</span>`;
      matchCount.textContent = "Error";
    }
  }

  [patternInput, testInput, replaceInput, flagG, flagI, flagM, flagS].forEach(el => {
    el?.addEventListener("input", evaluateRegex);
  });

  presetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      patternInput.value = btn.dataset.pattern;
      evaluateRegex();
      showToast("Preset pattern loaded", "info");
    });
  });

  sampleBtn?.addEventListener("click", () => {
    patternInput.value = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
    flagG.checked = true;
    flagI.checked = true;
    evaluateRegex();
    showToast("Email regex pattern loaded", "info");
  });

  copyBtn?.addEventListener("click", () => {
    let flags = "";
    if (flagG.checked) flags += "g";
    if (flagI.checked) flags += "i";
    if (flagM.checked) flags += "m";
    if (flagS.checked) flags += "s";
    copyToClipboard(`/${patternInput.value}/${flags}`, "Regex pattern");
  });

  copyReplacedBtn?.addEventListener("click", () => {
    copyToClipboard(replaceOutput.textContent, "Replaced text");
  });

  evaluateRegex();
}
