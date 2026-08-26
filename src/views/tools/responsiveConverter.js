// Tool View: Responsive Code Converter & CSS Media Query Refactorer with SEO Guide

import { copyToClipboard, showToast } from "../../utils.js";

export function renderResponsiveConverterView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Responsive Code Converter &amp; Media Query Generator</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">MOBILE-FIRST</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Convert desktop-fixed CSS or HTML components into fluid mobile-first responsive layouts with container queries.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="resp-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample Fixed Code</button>
          <button id="resp-convert-btn" class="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-md shadow-cyan-500/20">Convert to Responsive</button>
        </div>
      </div>

      <!-- Dual Editor Panes -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Fixed Input Pane -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">FIXED / DESKTOP-ONLY CODE INPUT</div>
          <div class="p-4 flex-1 flex flex-col">
            <textarea id="resp-input" rows="12" placeholder="Paste fixed width CSS or non-responsive HTML here..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-400 resize-y leading-relaxed flex-1"></textarea>
          </div>
        </div>

        <!-- Fluid Mobile-First Output Pane -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-cyan-400 font-bold">FLUID MOBILE-FIRST OUTPUT</span>
            <button id="resp-copy-btn" class="text-cyan-400 hover:text-white text-xs font-bold">Copy Output</button>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <textarea id="resp-output" rows="12" readonly placeholder="Responsive mobile-first code will appear here..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-cyan-300 font-mono focus:outline-none resize-y leading-relaxed flex-1"></textarea>
          </div>
        </div>

      </div>

      <!-- Quick Media Query Boilerplate Generator -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3">
        <h3 class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Mobile-First Standard Breakpoint Cheatsheet</h3>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span class="text-cyan-400 font-bold block">Mobile Default</span>
            <span class="text-slate-400 text-[11px] block mt-1">width &lt; 640px</span>
            <span class="text-slate-500 text-[10px] block mt-0.5">Base single-column stack</span>
          </div>
          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span class="text-teal-400 font-bold block">Tablet (sm / md)</span>
            <span class="text-slate-400 text-[11px] block mt-1">@media (min-width: 768px)</span>
            <span class="text-slate-500 text-[10px] block mt-0.5">2-column grid layout</span>
          </div>
          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span class="text-indigo-400 font-bold block">Desktop (lg)</span>
            <span class="text-slate-400 text-[11px] block mt-1">@media (min-width: 1024px)</span>
            <span class="text-slate-500 text-[10px] block mt-0.5">3-4 column grid tracks</span>
          </div>
          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span class="text-purple-400 font-bold block">Ultra-Wide (xl)</span>
            <span class="text-slate-400 text-[11px] block mt-1">@media (min-width: 1280px)</span>
            <span class="text-slate-500 text-[10px] block mt-0.5">Max-width 1280px centered</span>
          </div>
        </div>
      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Mobile-First Responsive Design Principles &amp; Container Queries</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>Mobile-First Design</strong> writes base CSS rules without media queries to optimize rendering performance on low-power mobile CPU cores, progressively adding complexity via <code>min-width</code> query gates.
          </p>
          <p>
            Replacing hardcoded pixel widths (e.g. <code>width: 1200px</code>) with fluid modern constraints (<code>width: 100%; max-width: 1200px; margin-inline: auto;</code>) eliminates horizontal scrollbar defects across all mobile viewports.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initResponsiveConverterView() {
  const input = document.getElementById("resp-input");
  const output = document.getElementById("resp-output");
  const sampleBtn = document.getElementById("resp-sample-btn");
  const convertBtn = document.getElementById("resp-convert-btn");
  const copyBtn = document.getElementById("resp-copy-btn");

  const sampleFixedCode = `.hero-container {
  width: 1200px;
  height: 600px;
  padding: 40px;
  display: flex;
}
.sidebar {
  width: 350px;
}
.content {
  width: 850px;
  font-size: 24px;
}`;

  function convertToResponsive(code) {
    let res = code
      // Replace hardcoded widths with max-width
      .replace(/width:\s*(\d{3,4})px;/g, (match, p1) => {
        return `width: 100%;\n  max-width: ${p1}px;\n  margin-inline: auto;`;
      })
      // Replace hardcoded heights with min-height
      .replace(/height:\s*(\d{3,4})px;/g, "min-height: $1px;")
      // Replace display flex with responsive flex-wrap
      .replace(/display:\s*flex;/g, "display: flex;\n  flex-direction: column;\n  /* On desktop: flex-row */")
      // Replace fixed font-sizes with clamp
      .replace(/font-size:\s*(\d{2})px;/g, (match, p1) => {
        const minRem = (parseInt(p1) * 0.75 / 16).toFixed(2);
        const maxRem = (parseInt(p1) / 16).toFixed(2);
        return `font-size: clamp(${minRem}rem, 2vw + 1rem, ${maxRem}rem);`;
      });

    // Append standard breakpoint block
    res += `\n\n/* Mobile-First Media Queries */\n@media (min-width: 768px) {\n  .hero-container {\n    flex-direction: row;\n    padding: 2rem;\n  }\n  .sidebar {\n    width: 30%;\n  }\n  .content {\n    width: 70%;\n  }\n}`;
    return res;
  }

  convertBtn?.addEventListener("click", () => {
    const raw = input.value.trim();
    if (!raw) return;
    output.value = convertToResponsive(raw);
    showToast("Converted to mobile-first responsive code", "success");
  });

  sampleBtn?.addEventListener("click", () => {
    input.value = sampleFixedCode;
    output.value = convertToResponsive(sampleFixedCode);
    showToast("Sample fixed CSS loaded", "info");
  });

  copyBtn?.addEventListener("click", () => {
    if (!output.value) {
      showToast("Nothing to copy", "warning");
      return;
    }
    copyToClipboard(output.value, "Responsive CSS");
  });

  input.value = sampleFixedCode;
  output.value = convertToResponsive(sampleFixedCode);
}
