// Tool View: Glassmorphism Slider Generator & CSS Keyframe Animator with SEO Guide

import { copyToClipboard, showToast } from "../../utils.js";

export function renderGlassmorphismAnimatorView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Glassmorphism &amp; CSS Keyframe Generator</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-400/10 text-indigo-300 border border-indigo-400/30">CSS FX</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Design frosted glass cards with backdrop-blur sliders and build CSS keyframe animation loops.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="glass-copy-btn" class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-500/20">Copy Glass CSS</button>
        </div>
      </div>

      <!-- Controls & Visual Stage -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        <!-- Controls Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4 text-xs">
          <span class="font-mono font-bold text-slate-300 uppercase tracking-wider block">Glass Effect Sliders</span>

          <!-- Blur Slider -->
          <div class="space-y-1">
            <div class="flex justify-between font-mono text-slate-400">
              <label>backdrop-filter: blur()</label>
              <span id="blur-val" class="text-indigo-400 font-bold">16px</span>
            </div>
            <input type="range" id="glass-blur" min="0" max="40" value="16" class="w-full" />
          </div>

          <!-- Transparency / Alpha Slider -->
          <div class="space-y-1">
            <div class="flex justify-between font-mono text-slate-400">
              <label>Background Opacity</label>
              <span id="opacity-val" class="text-indigo-400 font-bold">0.15</span>
            </div>
            <input type="range" id="glass-opacity" min="0.05" max="0.95" step="0.05" value="0.15" class="w-full" />
          </div>

          <!-- Border Opacity Slider -->
          <div class="space-y-1">
            <div class="flex justify-between font-mono text-slate-400">
              <label>Border Opacity</label>
              <span id="border-opacity-val" class="text-indigo-400 font-bold">0.25</span>
            </div>
            <input type="range" id="glass-border" min="0" max="1" step="0.05" value="0.25" class="w-full" />
          </div>

          <!-- Animation Selector -->
          <div class="pt-3 border-t border-slate-800 space-y-2">
            <label class="block font-mono font-bold text-slate-300 uppercase tracking-wider">Animation Preset</label>
            <select id="anim-preset-select" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono">
              <option value="none">None (Static Glass)</option>
              <option value="float" selected>Gentle Float (Float Y)</option>
              <option value="pulse">Glow Pulse</option>
              <option value="spin">Continuous Rotate</option>
              <option value="shimmer">Subtle Shimmer</option>
            </select>
          </div>
        </div>

        <!-- Visual Stage Area -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Background Scene Canvas -->
          <div class="relative overflow-hidden rounded-2xl border border-slate-800 p-8 min-h-[280px] flex items-center justify-center bg-gradient-to-tr from-slate-950 via-indigo-950 to-purple-950">
            <!-- Decorative Color Orbs -->
            <div class="absolute top-4 left-6 w-32 h-32 rounded-full bg-indigo-500/40 blur-2xl pointer-events-none"></div>
            <div class="absolute bottom-6 right-8 w-36 h-36 rounded-full bg-pink-500/40 blur-2xl pointer-events-none"></div>
            <div class="absolute top-1/2 left-1/3 w-28 h-28 rounded-full bg-cyan-500/30 blur-xl pointer-events-none"></div>

            <!-- Glass Card Preview Target -->
            <div id="glass-card-target" class="relative z-10 p-6 rounded-2xl shadow-2xl max-w-sm w-full space-y-3 transition-all duration-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white">Frosted Glass Card</h4>
                  <span class="text-[11px] text-white/70">Glassmorphism UI Engine</span>
                </div>
              </div>
              <p class="text-xs text-white/80 leading-relaxed">Modern frosted glass container with dynamic backdrop filter blur and specular borders.</p>
            </div>
          </div>

          <!-- Generated CSS Output -->
          <pre class="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-indigo-300 font-mono overflow-auto select-all"><code id="glass-code-output">/* Glassmorphism CSS */</code></pre>
        </div>

      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">The Physics of Glassmorphism (Backdrop-Filter) &amp; Hardware Keyframes</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>Glassmorphism</strong> creates multi-layered visual hierarchy using optical physics: high background blur (<code>backdrop-filter: blur()</code>), translucent alpha channels (<code>rgba(255,255,255,0.15)</code>), and subtle 1px specular lighting borders.
          </p>
          <p>
            When pairing frosted glass with <strong>CSS Keyframes</strong>, always animate composite-only properties (<code>transform</code> and <code>opacity</code>) rather than layout triggers (<code>width</code>, <code>height</code>, <code>top</code>). This forces rendering onto GPU composite layers, guaranteeing 60 FPS silky smooth animations.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initGlassmorphismAnimatorView() {
  const blurSlider = document.getElementById("glass-blur");
  const opacitySlider = document.getElementById("glass-opacity");
  const borderSlider = document.getElementById("glass-border");
  const animSelect = document.getElementById("anim-preset-select");

  const blurVal = document.getElementById("blur-val");
  const opacityVal = document.getElementById("opacity-val");
  const borderOpacityVal = document.getElementById("border-opacity-val");

  const cardTarget = document.getElementById("glass-card-target");
  const codeOutput = document.getElementById("glass-code-output");
  const copyBtn = document.getElementById("glass-copy-btn");

  function updateGlass() {
    const blur = blurSlider.value;
    const opacity = opacitySlider.value;
    const border = borderSlider.value;
    const anim = animSelect.value;

    blurVal.textContent = `${blur}px`;
    opacityVal.textContent = opacity;
    borderOpacityVal.textContent = border;

    const bgVal = `rgba(255, 255, 255, ${opacity})`;
    const borderVal = `1px solid rgba(255, 255, 255, ${border})`;
    const backdropVal = `blur(${blur}px)`;
    const shadowVal = `0 8px 32px 0 rgba(0, 0, 0, 0.37)`;

    cardTarget.style.background = bgVal;
    cardTarget.style.border = borderVal;
    cardTarget.style.backdropFilter = backdropVal;
    cardTarget.style.webkitBackdropFilter = backdropVal;
    cardTarget.style.boxShadow = shadowVal;

    // Handle Animation
    cardTarget.style.animation = "";
    let animCss = "";

    if (anim === "float") {
      cardTarget.style.animation = "glassFloat 3s ease-in-out infinite";
      animCss = `\n@keyframes glassFloat {\n  0%, 100% { transform: translateY(0px); }\n  50% { transform: translateY(-8px); }\n}\n.glass-card {\n  animation: glassFloat 3s ease-in-out infinite;\n}`;
    } else if (anim === "pulse") {
      cardTarget.style.animation = "glassPulse 2s ease-in-out infinite";
      animCss = `\n@keyframes glassPulse {\n  0%, 100% { opacity: 1; transform: scale(1); }\n  50% { opacity: 0.85; transform: scale(0.98); }\n}\n.glass-card {\n  animation: glassPulse 2s ease-in-out infinite;\n}`;
    }

    codeOutput.textContent = `.glass-card {
  background: ${bgVal};
  backdrop-filter: ${backdropVal};
  -webkit-backdrop-filter: ${backdropVal};
  border: ${borderVal};
  box-shadow: ${shadowVal};
  border-radius: 16px;
}${animCss}`;
  }

  [blurSlider, opacitySlider, borderSlider, animSelect].forEach(el => {
    el?.addEventListener("input", updateGlass);
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(codeOutput.textContent, "Glassmorphism CSS");
  });

  updateGlass();
}
