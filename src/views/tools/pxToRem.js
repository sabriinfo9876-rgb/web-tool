// Tool View: PX to REM / EM Fluid Converter with clamp() calculator and SEO Guide

import { copyToClipboard, showToast } from "../../utils.js";

export function renderPxToRemView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">PX to REM / EM &amp; Fluid Typography</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">CSS MATH</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Convert static pixel values to relative REM/EM units and generate responsive fluid clamp() formulas.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="pxtorem-reset-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Reset (16px Base)</button>
          <button id="pxtorem-copy-all-btn" class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-500/20">Copy CSS Snippet</button>
        </div>
      </div>

      <!-- Main Interactive Converter Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <!-- Base Font Size Configuration -->
        <div class="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div class="flex items-center justify-between">
            <label for="base-px-input" class="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">1. Root Base Font Size</label>
            <span class="text-xs font-mono text-indigo-400 font-bold" id="base-px-display">16px</span>
          </div>
          <div class="flex items-center gap-3">
            <input type="number" id="base-px-input" value="16" min="8" max="64" class="w-24 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm font-mono text-white text-center focus:outline-none focus:border-indigo-500" />
            <input type="range" id="base-px-slider" min="8" max="32" value="16" step="1" class="flex-1" />
          </div>
          <p class="text-[11px] text-slate-400">Default browser HTML root font size is typically 16px (1rem = 16px).</p>
        </div>

        <!-- Target PX Input & Slider -->
        <div class="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div class="flex items-center justify-between">
            <label for="target-px-input" class="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">2. Target Pixel Value</label>
            <span class="text-xs font-mono text-indigo-400 font-bold" id="target-px-display">24px</span>
          </div>
          <div class="flex items-center gap-3">
            <input type="number" id="target-px-input" value="24" min="1" max="500" class="w-24 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-sm font-mono text-white text-center focus:outline-none focus:border-indigo-500" />
            <input type="range" id="target-px-slider" min="4" max="128" value="24" step="1" class="flex-1" />
          </div>
          <div class="flex items-center gap-1.5 flex-wrap">
            <button class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 quick-px" data-px="12">12px</button>
            <button class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 quick-px" data-px="14">14px</button>
            <button class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 quick-px" data-px="16">16px</button>
            <button class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 quick-px" data-px="20">20px</button>
            <button class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 quick-px" data-px="24">24px</button>
            <button class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 quick-px" data-px="32">32px</button>
            <button class="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 quick-px" data-px="48">48px</button>
          </div>
        </div>

        <!-- Conversion Output Result -->
        <div class="p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-500/30 shadow-xl flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-indigo-300 uppercase tracking-wider font-mono">3. Output Units</span>
            <div class="mt-3 grid grid-cols-2 gap-3">
              <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span class="text-[10px] text-slate-400 uppercase font-mono block">REM Value</span>
                <span id="rem-output" class="text-xl font-mono font-black text-indigo-400">1.5rem</span>
              </div>
              <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span class="text-[10px] text-slate-400 uppercase font-mono block">EM Value</span>
                <span id="em-output" class="text-xl font-mono font-black text-purple-400">1.5em</span>
              </div>
            </div>
          </div>
          <div class="pt-3 flex gap-2">
            <button id="copy-rem-btn" class="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition">Copy REM</button>
            <button id="copy-em-btn" class="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-lg text-xs font-semibold transition">Copy EM</button>
          </div>
        </div>

      </div>

      <!-- Fluid Clamp() Formula Generator & Preview -->
      <div class="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            <h3 class="text-sm font-bold text-white uppercase tracking-wider font-mono">Fluid Typography CSS clamp() Generator</h3>
          </div>
          <button id="copy-clamp-btn" class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-purple-300 font-semibold transition">Copy clamp()</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div class="space-y-1">
            <label class="text-slate-400 font-mono">Min Font (Mobile)</label>
            <input type="number" id="clamp-min-font" value="16" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2 font-mono text-white" />
          </div>
          <div class="space-y-1">
            <label class="text-slate-400 font-mono">Max Font (Desktop)</label>
            <input type="number" id="clamp-max-font" value="32" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2 font-mono text-white" />
          </div>
          <div class="space-y-1">
            <label class="text-slate-400 font-mono">Min Viewport (px)</label>
            <input type="number" id="clamp-min-vp" value="375" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2 font-mono text-white" />
          </div>
          <div class="space-y-1">
            <label class="text-slate-400 font-mono">Max Viewport (px)</label>
            <input type="number" id="clamp-max-vp" value="1280" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2 font-mono text-white" />
          </div>
        </div>

        <!-- Generated Code Preview Box -->
        <pre class="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-indigo-300 font-mono overflow-auto"><code id="clamp-code-output">font-size: clamp(1rem, 0.6685rem + 1.4144vw, 2rem);</code></pre>
      </div>

      <!-- Quick Conversion Matrix Table -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div class="px-4 py-3 bg-slate-900 border-b border-slate-800 font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">
          Standard Pixel to REM Reference Matrix (16px Base)
        </div>
        <div class="p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs font-mono">
          <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center"><span class="text-slate-400">8px</span> = <span class="text-indigo-400 font-bold">0.5rem</span></div>
          <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center"><span class="text-slate-400">10px</span> = <span class="text-indigo-400 font-bold">0.625rem</span></div>
          <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center"><span class="text-slate-400">12px</span> = <span class="text-indigo-400 font-bold">0.75rem</span></div>
          <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center"><span class="text-slate-400">14px</span> = <span class="text-indigo-400 font-bold">0.875rem</span></div>
          <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center"><span class="text-slate-400">16px</span> = <span class="text-indigo-400 font-bold">1rem</span></div>
          <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center"><span class="text-slate-400">18px</span> = <span class="text-indigo-400 font-bold">1.125rem</span></div>
          <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center"><span class="text-slate-400">20px</span> = <span class="text-indigo-400 font-bold">1.25rem</span></div>
          <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center"><span class="text-slate-400">24px</span> = <span class="text-indigo-400 font-bold">1.5rem</span></div>
          <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center"><span class="text-slate-400">28px</span> = <span class="text-indigo-400 font-bold">1.75rem</span></div>
          <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center"><span class="text-slate-400">32px</span> = <span class="text-indigo-400 font-bold">2rem</span></div>
          <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center"><span class="text-slate-400">40px</span> = <span class="text-indigo-400 font-bold">2.5rem</span></div>
          <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 text-center"><span class="text-slate-400">48px</span> = <span class="text-indigo-400 font-bold">3rem</span></div>
        </div>
      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">The Mathematical Science of Fluid Typography &amp; REM Scaling</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            In modern responsive web design, hardcoding static pixel (<code>px</code>) values for font sizes, padding, and layout bounds harms user accessibility. When visually impaired users adjust their browser's default font size (e.g. from 16px to 24px), websites using fixed pixel measurements fail to scale proportionally, violating <strong>WCAG 2.1 Success Criterion 1.4.4 (Resize Text)</strong>.
          </p>
          <p>
            <strong>REM (Root EM)</strong> calculates units relative directly to the root <code>&lt;html&gt;</code> element's computed font-size:
            <code class="text-indigo-300 font-mono">rem = target_px / base_root_px</code>. In contrast, <strong>EM</strong> calculates relative to the immediate parent element, which causes compounding exponential growth in nested DOM trees.
          </p>
          <p>
            Our <strong>CSS clamp() Fluid Typography Generator</strong> eliminates jagged media query breakpoints. By interpolating between a minimum font size, dynamic viewport width (<code>vw</code>), and maximum constraint, your typography smoothly scales across iPhones, tablets, MacBooks, and 4K ultra-wide monitors without sudden jumps or layout shifts.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initPxToRemView() {
  const baseInput = document.getElementById("base-px-input");
  const baseSlider = document.getElementById("base-px-slider");
  const baseDisplay = document.getElementById("base-px-display");

  const targetInput = document.getElementById("target-px-input");
  const targetSlider = document.getElementById("target-px-slider");
  const targetDisplay = document.getElementById("target-px-display");

  const remOutput = document.getElementById("rem-output");
  const emOutput = document.getElementById("em-output");

  const clampMinFont = document.getElementById("clamp-min-font");
  const clampMaxFont = document.getElementById("clamp-max-font");
  const clampMinVp = document.getElementById("clamp-min-vp");
  const clampMaxVp = document.getElementById("clamp-max-vp");
  const clampOutput = document.getElementById("clamp-code-output");

  const resetBtn = document.getElementById("pxtorem-reset-btn");
  const copyAllBtn = document.getElementById("pxtorem-copy-all-btn");
  const copyRemBtn = document.getElementById("copy-rem-btn");
  const copyEmBtn = document.getElementById("copy-em-btn");
  const copyClampBtn = document.getElementById("copy-clamp-btn");
  const quickPxButtons = document.querySelectorAll(".quick-px");

  function updateConversion() {
    const base = parseFloat(baseInput.value) || 16;
    const target = parseFloat(targetInput.value) || 24;

    baseSlider.value = base;
    baseDisplay.textContent = `${base}px`;

    targetSlider.value = target;
    targetDisplay.textContent = `${target}px`;

    const remVal = (target / base).toFixed(4).replace(/\.?0+$/, "");
    remOutput.textContent = `${remVal}rem`;
    emOutput.textContent = `${remVal}em`;

    updateClamp(base);
  }

  function updateClamp(base) {
    const minF = parseFloat(clampMinFont.value) || 16;
    const maxF = parseFloat(clampMaxFont.value) || 32;
    const minV = parseFloat(clampMinVp.value) || 375;
    const maxV = parseFloat(clampMaxVp.value) || 1280;

    const minRem = (minF / base).toFixed(3).replace(/\.?0+$/, "");
    const maxRem = (maxF / base).toFixed(3).replace(/\.?0+$/, "");

    const slope = (maxF - minF) / (maxV - minV);
    const yIntersection = -minV * slope + minF;
    const yIntersectionRem = (yIntersection / base).toFixed(4).replace(/\.?0+$/, "");
    const slopeVw = (slope * 100).toFixed(4).replace(/\.?0+$/, "");

    clampOutput.textContent = `font-size: clamp(${minRem}rem, ${yIntersectionRem}rem + ${slopeVw}vw, ${maxRem}rem);`;
  }

  baseInput?.addEventListener("input", () => {
    baseSlider.value = baseInput.value;
    updateConversion();
  });
  baseSlider?.addEventListener("input", () => {
    baseInput.value = baseSlider.value;
    updateConversion();
  });

  targetInput?.addEventListener("input", () => {
    targetSlider.value = targetInput.value;
    updateConversion();
  });
  targetSlider?.addEventListener("input", () => {
    targetInput.value = targetSlider.value;
    updateConversion();
  });

  quickPxButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      targetInput.value = btn.dataset.px;
      updateConversion();
    });
  });

  [clampMinFont, clampMaxFont, clampMinVp, clampMaxVp].forEach(el => {
    el?.addEventListener("input", () => updateConversion());
  });

  resetBtn?.addEventListener("click", () => {
    baseInput.value = 16;
    targetInput.value = 24;
    updateConversion();
    showToast("Reset to default 16px root font size", "info");
  });

  copyRemBtn?.addEventListener("click", () => copyToClipboard(remOutput.textContent, "REM value"));
  copyEmBtn?.addEventListener("click", () => copyToClipboard(emOutput.textContent, "EM value"));
  copyClampBtn?.addEventListener("click", () => copyToClipboard(clampOutput.textContent, "Fluid clamp() formula"));

  copyAllBtn?.addEventListener("click", () => {
    const base = baseInput.value;
    const target = targetInput.value;
    const rem = remOutput.textContent;
    const clamp = clampOutput.textContent;
    const css = `/* PX to REM Conversion */\n/* Base: ${base}px | Target: ${target}px */\nfont-size: ${rem};\n${clamp}`;
    copyToClipboard(css, "Full CSS typography snippet");
  });

  updateConversion();
}
