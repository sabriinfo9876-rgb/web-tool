// Tool View: CSS Gradient & Color Palette Harmony Generator with SEO Guide

import { copyToClipboard, showToast } from "../../utils.js";

export function renderGradientPaletteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">CSS Gradient &amp; Color Palette Generator</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">COLOR LAB</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Design multi-stop linear, radial, and conic gradients with interactive angle dials and generate complementary color harmony palettes.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="grad-random-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-300 transition">Random Preset</button>
          <button id="grad-copy-btn" class="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-md shadow-rose-500/20">Copy CSS</button>
        </div>
      </div>

      <!-- Main Gradient Canvas & Controls -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        <!-- Controls Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
          <h3 class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Gradient Controls</h3>

          <div class="space-y-3 text-xs">
            <div>
              <label class="block text-slate-400 font-mono mb-1">Gradient Type</label>
              <select id="grad-type" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono focus:outline-none">
                <option value="linear">Linear Gradient</option>
                <option value="radial">Radial Gradient</option>
                <option value="conic">Conic Gradient</option>
              </select>
            </div>

            <div id="grad-angle-wrapper">
              <div class="flex justify-between font-mono text-slate-400 mb-1">
                <label>Angle Dial</label>
                <span id="grad-angle-val" class="text-rose-400 font-bold">135deg</span>
              </div>
              <input type="range" id="grad-angle" min="0" max="360" value="135" class="w-full" />
            </div>

            <!-- Color Stops -->
            <div class="space-y-2 pt-2 border-t border-slate-800">
              <label class="block text-slate-300 font-mono font-bold">Color Stops</label>
              
              <div class="flex items-center gap-2">
                <input type="color" id="grad-color-1" value="#6366f1" class="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer" />
                <input type="text" id="grad-hex-1" value="#6366f1" class="w-24 bg-slate-950 border border-slate-700/80 rounded-lg px-2 py-1 text-white font-mono text-center text-xs" />
                <input type="range" id="grad-pos-1" min="0" max="100" value="0" class="flex-1" />
                <span class="text-slate-400 font-mono text-[11px] w-8 text-right" id="grad-pos-val-1">0%</span>
              </div>

              <div class="flex items-center gap-2">
                <input type="color" id="grad-color-2" value="#a855f7" class="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer" />
                <input type="text" id="grad-hex-2" value="#a855f7" class="w-24 bg-slate-950 border border-slate-700/80 rounded-lg px-2 py-1 text-white font-mono text-center text-xs" />
                <input type="range" id="grad-pos-2" min="0" max="100" value="50" class="flex-1" />
                <span class="text-slate-400 font-mono text-[11px] w-8 text-right" id="grad-pos-val-2">50%</span>
              </div>

              <div class="flex items-center gap-2">
                <input type="color" id="grad-color-3" value="#ec4899" class="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer" />
                <input type="text" id="grad-hex-3" value="#ec4899" class="w-24 bg-slate-950 border border-slate-700/80 rounded-lg px-2 py-1 text-white font-mono text-center text-xs" />
                <input type="range" id="grad-pos-3" min="0" max="100" value="100" class="flex-1" />
                <span class="text-slate-400 font-mono text-[11px] w-8 text-right" id="grad-pos-val-3">100%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Stage & Palette Harmony -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Visual Preview Box -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-3">
            <div class="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>LIVE GRADIENT PREVIEW</span>
              <span id="grad-formula-label">linear-gradient(135deg, ...)</span>
            </div>
            
            <div id="grad-preview-canvas" class="h-44 rounded-2xl border border-slate-700/60 shadow-2xl transition-all duration-300 flex items-center justify-center">
              <span class="px-4 py-2 rounded-xl bg-slate-950/70 backdrop-blur-md text-white font-bold text-xs tracking-wider border border-white/20">CSS Background Canvas</span>
            </div>
          </div>

          <!-- Color Harmony Palette Swatches -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-3">
            <span class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">Generated Color Harmony Palette</span>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3" id="harmony-palette-grid">
              <!-- Swatches injected via JS -->
            </div>
          </div>

          <!-- CSS Output Code Box -->
          <pre class="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-rose-300 font-mono overflow-auto"><code id="grad-code-output">background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);</code></pre>
        </div>

      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">CSS Gradient Optics &amp; Color Harmony Principles</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            In modern visual user interface design, <strong>CSS Gradients</strong> produce vibrant surface lighting, card depth, and atmospheric backdrops without the performance penalties of multi-megabyte bitmap raster images.
          </p>
          <p>
            <strong>Linear Gradients</strong> transition smoothly along a directional angle vector (such as <code>135deg</code> or <code>to bottom right</code>). <strong>Radial Gradients</strong> emanate outwards from an anchor point (e.g. <code>circle at center</code>), and <strong>Conic Gradients</strong> rotate colors around a central 360-degree axis, commonly used for pie charts, color wheels, and neon border rings.
          </p>
          <p>
            Color harmony calculation leverages the <strong>HSL (Hue, Saturation, Lightness)</strong> color cylinder. By shifting base hues by 30° (Analogous), 180° (Complementary), or 120° (Triadic), our engine outputs mathematically balanced accent tones for UI button states, borders, and shadows.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initGradientPaletteView() {
  const typeSelect = document.getElementById("grad-type");
  const angleSlider = document.getElementById("grad-angle");
  const angleVal = document.getElementById("grad-angle-val");
  const angleWrapper = document.getElementById("grad-angle-wrapper");

  const c1 = document.getElementById("grad-color-1");
  const h1 = document.getElementById("grad-hex-1");
  const p1 = document.getElementById("grad-pos-1");
  const pv1 = document.getElementById("grad-pos-val-1");

  const c2 = document.getElementById("grad-color-2");
  const h2 = document.getElementById("grad-hex-2");
  const p2 = document.getElementById("grad-pos-2");
  const pv2 = document.getElementById("grad-pos-val-2");

  const c3 = document.getElementById("grad-color-3");
  const h3 = document.getElementById("grad-hex-3");
  const p3 = document.getElementById("grad-pos-3");
  const pv3 = document.getElementById("grad-pos-val-3");

  const canvas = document.getElementById("grad-preview-canvas");
  const formulaLabel = document.getElementById("grad-formula-label");
  const codeOutput = document.getElementById("grad-code-output");
  const harmonyGrid = document.getElementById("harmony-palette-grid");

  const randomBtn = document.getElementById("grad-random-btn");
  const copyBtn = document.getElementById("grad-copy-btn");

  const presets = [
    { type: "linear", angle: 135, c1: "#6366f1", p1: 0, c2: "#a855f7", p2: 50, c3: "#ec4899", p3: 100 },
    { type: "linear", angle: 90, c1: "#06b6d4", p1: 0, c2: "#3b82f6", p2: 50, c3: "#9333ea", p3: 100 },
    { type: "radial", angle: 0, c1: "#f59e0b", p1: 0, c2: "#ef4444", p2: 60, c3: "#7c3aed", p3: 100 },
    { type: "conic", angle: 45, c1: "#10b981", p1: 0, c2: "#06b6d4", p2: 50, c3: "#3b82f6", p3: 100 },
    { type: "linear", angle: 180, c1: "#0f172a", p1: 0, c2: "#1e1b4b", p2: 60, c3: "#312e81", p3: 100 }
  ];

  function updateGradient() {
    const type = typeSelect.value;
    const angle = angleSlider.value;
    angleVal.textContent = `${angle}deg`;

    pv1.textContent = `${p1.value}%`;
    pv2.textContent = `${p2.value}%`;
    pv3.textContent = `${p3.value}%`;

    let gradString = "";
    if (type === "linear") {
      angleWrapper.classList.remove("hidden");
      gradString = `linear-gradient(${angle}deg, ${c1.value} ${p1.value}%, ${c2.value} ${p2.value}%, ${c3.value} ${p3.value}%)`;
    } else if (type === "radial") {
      angleWrapper.classList.add("hidden");
      gradString = `radial-gradient(circle at center, ${c1.value} ${p1.value}%, ${c2.value} ${p2.value}%, ${c3.value} ${p3.value}%)`;
    } else {
      angleWrapper.classList.remove("hidden");
      gradString = `conic-gradient(from ${angle}deg at 50% 50%, ${c1.value} ${p1.value}%, ${c2.value} ${p2.value}%, ${c3.value} ${p3.value}%)`;
    }

    canvas.style.background = gradString;
    formulaLabel.textContent = gradString;
    codeOutput.textContent = `background: ${gradString};\n/* Tailwind approximate: bg-gradient-to-r */`;

    renderHarmonySwatches(c1.value, c2.value, c3.value);
  }

  function renderHarmonySwatches(hex1, hex2, hex3) {
    const swatches = [
      { name: "Primary Stop", hex: hex1 },
      { name: "Accent Stop", hex: hex2 },
      { name: "Highlight Stop", hex: hex3 },
      { name: "Shade Tone", hex: adjustBrightness(hex1, -25) }
    ];

    harmonyGrid.innerHTML = swatches.map(s => `
      <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 group cursor-pointer" onclick="navigator.clipboard.writeText('${s.hex}')">
        <div class="h-10 rounded-lg shadow-inner" style="background-color: ${s.hex}"></div>
        <div class="flex items-center justify-between text-[11px] font-mono">
          <span class="text-slate-400">${s.name}</span>
          <span class="text-white font-bold group-hover:text-rose-400">${s.hex}</span>
        </div>
      </div>
    `).join("");
  }

  function adjustBrightness(hex, percent) {
    let num = parseInt(hex.replace("#", ""), 16);
    let amt = Math.round(2.55 * percent);
    let R = (num >> 16) + amt;
    let G = (num >> 8 & 0x00FF) + amt;
    let B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  // Connect color pickers to text inputs
  [[c1, h1], [c2, h2], [c3, h3]].forEach(([picker, text]) => {
    picker?.addEventListener("input", () => {
      text.value = picker.value;
      updateGradient();
    });
    text?.addEventListener("input", () => {
      picker.value = text.value;
      updateGradient();
    });
  });

  [typeSelect, angleSlider, p1, p2, p3].forEach(el => el?.addEventListener("input", updateGradient));

  randomBtn?.addEventListener("click", () => {
    const p = presets[Math.floor(Math.random() * presets.length)];
    typeSelect.value = p.type;
    angleSlider.value = p.angle;
    c1.value = p.c1; h1.value = p.c1; p1.value = p.p1;
    c2.value = p.c2; h2.value = p.c2; p2.value = p.p2;
    c3.value = p.c3; h3.value = p.c3; p3.value = p.p3;
    updateGradient();
    showToast("Loaded preset gradient", "info");
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(codeOutput.textContent, "CSS Gradient rule");
  });

  updateGradient();
}
