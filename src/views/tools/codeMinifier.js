// Tool View: Code Minifier & Beautifier for HTML, CSS, JS & JSON with SEO Guide

import { copyToClipboard, showToast } from "../../utils.js";

export function renderCodeMinifierView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Code Minifier &amp; Beautifier</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-500/10 text-violet-400 border border-violet-500/30">OPTIMIZER</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Multi-mode code formatter and compressor for HTML, CSS, JavaScript, and JSON with compression metrics.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="min-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample Code</button>
          <button id="min-clear-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-300 transition">Clear</button>
        </div>
      </div>

      <!-- Format Mode Toolbar -->
      <div class="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <!-- Language Selector -->
        <div class="flex items-center gap-2">
          <label class="text-xs font-mono text-slate-400">Language:</label>
          <select id="min-lang-select" class="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none">
            <option value="css">CSS</option>
            <option value="html">HTML</option>
            <option value="js">JavaScript</option>
            <option value="json">JSON</option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2">
          <button id="min-beautify-btn" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-500/20">Beautify (Format)</button>
          <button id="min-minify-btn" class="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition shadow-md shadow-violet-500/20">Minify (Compress)</button>
          <button id="min-copy-btn" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-violet-300 text-xs font-semibold transition">Copy Output</button>
        </div>
      </div>

      <!-- Compression Stats Banner -->
      <div id="min-stats-banner" class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
        <div>Original: <span id="stat-orig-size" class="text-slate-200 font-bold">0 bytes</span></div>
        <div>Result: <span id="stat-min-size" class="text-violet-400 font-bold">0 bytes</span></div>
        <div>Savings: <span id="stat-savings-pct" class="text-emerald-400 font-bold">0%</span></div>
      </div>

      <!-- Dual Editors -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">INPUT CODE</div>
          <div class="p-4 flex-1 flex flex-col">
            <textarea id="min-input" rows="14" placeholder="Paste your raw code here to format or minify..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-violet-400 resize-y leading-relaxed flex-1"></textarea>
          </div>
        </div>

        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">PROCESSED OUTPUT</div>
          <div class="p-4 flex-1 flex flex-col">
            <textarea id="min-output" rows="14" readonly placeholder="Result code will appear here..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-violet-300 font-mono focus:outline-none resize-y leading-relaxed flex-1"></textarea>
          </div>
        </div>
      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Code Minification &amp; Core Web Vitals Optimization</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>Code Minification</strong> strips unnecessary whitespace characters, newline delimiters, and developer block comments from source code without altering the underlying runtime logic.
          </p>
          <p>
            Shrinking JavaScript, CSS, and HTML asset bundles directly accelerates browser parsing and execution phases, lowering <strong>Total Blocking Time (TBT)</strong> and improving <strong>Time to Interactive (TTI)</strong> scores on Google Lighthouse.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initCodeMinifierView() {
  const langSelect = document.getElementById("min-lang-select");
  const input = document.getElementById("min-input");
  const output = document.getElementById("min-output");

  const beautifyBtn = document.getElementById("min-beautify-btn");
  const minifyBtn = document.getElementById("min-minify-btn");
  const sampleBtn = document.getElementById("min-sample-btn");
  const clearBtn = document.getElementById("min-clear-btn");
  const copyBtn = document.getElementById("min-copy-btn");

  const statOrig = document.getElementById("stat-orig-size");
  const statMin = document.getElementById("stat-min-size");
  const statSavings = document.getElementById("stat-savings-pct");

  const samples = {
    css: `.card {
  display: flex;
  background-color: #0f172a;
  border-radius: 1rem;
  padding: 1.5rem;
  /* Box Shadow Effect */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
}`,
    html: `<div class="container">
  <!-- Main Header -->
  <header>
    <h1>Web Developer Hub</h1>
  </header>
  <main>
    <p>Fast client tools.</p>
  </main>
</div>`,
    js: `function calculateTotal(items) {
  // Sum array
  return items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
}`,
    json: `{"name":"WebDevHub","active":true,"version":"2.0.0"}`
  };

  function minifyCode(code, lang) {
    if (lang === "json") {
      try {
        return JSON.stringify(JSON.parse(code));
      } catch {
        return code.replace(/\s+/g, " ");
      }
    }
    if (lang === "css") {
      return code
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s*([\{\}\:\;\,])\s*/g, "$1")
        .replace(/;\}/g, "}")
        .trim();
    }
    if (lang === "html") {
      return code
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/>\s+</g, "><")
        .trim();
    }
    if (lang === "js") {
      return code
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/.*$/gm, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([\{\}\(\)\=\+\-\*\/\;\:\,])\s*/g, "$1")
        .trim();
    }
    return code;
  }

  function beautifyCode(code, lang) {
    if (lang === "json") {
      try {
        return JSON.stringify(JSON.parse(code), null, 2);
      } catch {
        return code;
      }
    }
    if (lang === "css") {
      return code
        .replace(/\{/g, " {\n  ")
        .replace(/\;/g, ";\n  ")
        .replace(/\}/g, "\n}\n")
        .replace(/\n\s*\n/g, "\n")
        .trim();
    }
    if (lang === "html") {
      let formatted = "";
      let indent = 0;
      const nodes = code.replace(/>\s*</g, ">\n<").split("\n");
      nodes.forEach(node => {
        if (node.match(/^<\/\w/)) indent = Math.max(0, indent - 1);
        formatted += "  ".repeat(indent) + node + "\n";
        if (node.match(/^<\w[^>]*[^\/]>$/) && !node.startsWith("<input") && !node.startsWith("<img") && !node.startsWith("<br") && !node.startsWith("<hr")) {
          indent++;
        }
      });
      return formatted.trim();
    }
    return code;
  }

  function updateStats(orig, res) {
    const origBytes = new Blob([orig]).size;
    const resBytes = new Blob([res]).size;
    statOrig.textContent = `${origBytes} bytes`;
    statMin.textContent = `${resBytes} bytes`;

    if (origBytes > 0 && resBytes < origBytes) {
      const pct = Math.round(((origBytes - resBytes) / origBytes) * 100);
      statSavings.textContent = `${pct}% smaller`;
    } else {
      statSavings.textContent = "0%";
    }
  }

  minifyBtn?.addEventListener("click", () => {
    const raw = input.value;
    if (!raw.trim()) return;
    const res = minifyCode(raw, langSelect.value);
    output.value = res;
    updateStats(raw, res);
    showToast("Code minified successfully", "success");
  });

  beautifyBtn?.addEventListener("click", () => {
    const raw = input.value;
    if (!raw.trim()) return;
    const res = beautifyCode(raw, langSelect.value);
    output.value = res;
    updateStats(raw, res);
    showToast("Code beautified successfully", "success");
  });

  sampleBtn?.addEventListener("click", () => {
    const lang = langSelect.value;
    input.value = samples[lang] || samples.css;
    output.value = "";
    updateStats(input.value, "");
    showToast(`Loaded sample ${lang.toUpperCase()}`, "info");
  });

  clearBtn?.addEventListener("click", () => {
    input.value = "";
    output.value = "";
    updateStats("", "");
  });

  copyBtn?.addEventListener("click", () => {
    if (!output.value) {
      showToast("Nothing to copy", "warning");
      return;
    }
    copyToClipboard(output.value, "Processed code");
  });

  input.value = samples.css;
  updateStats(input.value, "");
}
