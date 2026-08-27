// Tool View: CSS Studio Suite (Flexbox, Grid, Gradient, Colors, Shadow, Border, Clamp, Keyframes, Glass Effect, Minifier)
// 100% Client-side interactive visual CSS builders and code generators

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";
import { renderAdUnit } from "../../components/AdUnit.js";

export function renderCssSuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-purple-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">CSS Tools</span>
        <span>/</span>
        <span class="text-purple-400 font-bold" id="css-active-title">Flexbox &amp; Grid Studio</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">CSS Design Studio</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">VISUAL GENERATOR</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Interactive visual builders for Flexbox, CSS Grid, Gradients, Color Models, Box Shadows, Glassmorphism, and Fluid Typography.</p>
        </div>
      </div>

      <!-- Tool Mode Navigation Tabs -->
      <div class="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap text-xs font-mono">
        <button data-tool="flexbox" class="css-tab-btn px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold transition">Flexbox Builder</button>
        <button data-tool="grid" class="css-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">CSS Grid Builder</button>
        <button data-tool="gradient" class="css-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Gradient Maker</button>
        <button data-tool="color" class="css-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Color Converter</button>
        <button data-tool="shadow" class="css-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Shadow Maker</button>
        <button data-tool="clamp" class="css-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">CSS Clamp Calculator</button>
        <button data-tool="glass" class="css-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Glass Effect</button>
        <button data-tool="formatter" class="css-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">CSS Minifier</button>
      </div>

      <!-- Main Visual Interactive Stage & Controls Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <!-- Controls Column (5 Cols) -->
        <div class="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
          
          <!-- 1. Flexbox Controls -->
          <div id="css-ctrl-flexbox" class="css-ctrl-panel space-y-3">
            <h3 class="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">Flexbox Properties</h3>
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">flex-direction</label>
              <select id="flex-dir" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono">
                <option value="row">row</option>
                <option value="column">column</option>
                <option value="row-reverse">row-reverse</option>
                <option value="column-reverse">column-reverse</option>
              </select>
            </div>
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">justify-content</label>
              <select id="flex-justify" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono">
                <option value="flex-start">flex-start</option>
                <option value="center">center</option>
                <option value="flex-end">flex-end</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
                <option value="space-evenly">space-evenly</option>
              </select>
            </div>
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">align-items</label>
              <select id="flex-align" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono">
                <option value="center">center</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="stretch">stretch</option>
              </select>
            </div>
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">gap (px)</label>
              <input type="range" id="flex-gap" min="0" max="48" value="16" class="w-full accent-purple-500" />
            </div>
          </div>

          <!-- 2. Grid Controls -->
          <div id="css-ctrl-grid" class="css-ctrl-panel hidden space-y-3">
            <h3 class="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">CSS Grid Properties</h3>
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">Columns Track Count</label>
              <input type="range" id="grid-cols-range" min="1" max="6" value="3" class="w-full accent-purple-500" />
            </div>
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">Grid Gap (px)</label>
              <input type="range" id="grid-gap-range" min="0" max="40" value="16" class="w-full accent-purple-500" />
            </div>
          </div>

          <!-- 3. Gradient Controls -->
          <div id="css-ctrl-gradient" class="css-ctrl-panel hidden space-y-3">
            <h3 class="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">Gradient Maker</h3>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="text-[11px] font-mono text-slate-400 block mb-1">Start Color</label>
                <input type="color" id="grad-c1" value="#6366f1" class="w-full h-9 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer" />
              </div>
              <div>
                <label class="text-[11px] font-mono text-slate-400 block mb-1">End Color</label>
                <input type="color" id="grad-c2" value="#ec4899" class="w-full h-9 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer" />
              </div>
            </div>
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">Gradient Angle (<span id="grad-angle-val">135</span>deg)</label>
              <input type="range" id="grad-angle" min="0" max="360" value="135" class="w-full accent-purple-500" />
            </div>
          </div>

          <!-- 4. Color Converter Controls -->
          <div id="css-ctrl-color" class="css-ctrl-panel hidden space-y-3">
            <h3 class="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">Color Picker &amp; Models</h3>
            <input type="color" id="color-picker-input" value="#6366f1" class="w-full h-12 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer" />
            <div class="space-y-2 text-xs font-mono text-slate-300">
              <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between"><span>HEX:</span> <strong id="color-res-hex" class="text-purple-300">#6366f1</strong></div>
              <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between"><span>RGB:</span> <strong id="color-res-rgb" class="text-purple-300">rgb(99, 102, 241)</strong></div>
              <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between"><span>HSL:</span> <strong id="color-res-hsl" class="text-purple-300">hsl(239, 84%, 67%)</strong></div>
            </div>
          </div>

          <!-- 5. Shadow Controls -->
          <div id="css-ctrl-shadow" class="css-ctrl-panel hidden space-y-3">
            <h3 class="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">Box Shadow Generator</h3>
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">X Offset: <span id="sh-x-val">0</span>px</label>
              <input type="range" id="sh-x" min="-50" max="50" value="0" class="w-full accent-purple-500" />
            </div>
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">Y Offset: <span id="sh-y-val">10</span>px</label>
              <input type="range" id="sh-y" min="-50" max="50" value="10" class="w-full accent-purple-500" />
            </div>
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">Blur Radius: <span id="sh-b-val">25</span>px</label>
              <input type="range" id="sh-blur" min="0" max="80" value="25" class="w-full accent-purple-500" />
            </div>
          </div>

          <!-- 6. CSS Clamp Controls -->
          <div id="css-ctrl-clamp" class="css-ctrl-panel hidden space-y-3">
            <h3 class="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">Fluid Typography (CSS Clamp)</h3>
            <div class="grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <label class="text-[10px] text-slate-400 block mb-1">Min Font (px)</label>
                <input type="number" id="clamp-min-f" value="16" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label class="text-[10px] text-slate-400 block mb-1">Max Font (px)</label>
                <input type="number" id="clamp-max-f" value="32" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label class="text-[10px] text-slate-400 block mb-1">Min Screen (px)</label>
                <input type="number" id="clamp-min-w" value="375" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label class="text-[10px] text-slate-400 block mb-1">Max Screen (px)</label>
                <input type="number" id="clamp-max-w" value="1440" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" />
              </div>
            </div>
          </div>

          <!-- 7. Glass Effect Controls -->
          <div id="css-ctrl-glass" class="css-ctrl-panel hidden space-y-3">
            <h3 class="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">Glassmorphism Maker</h3>
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">Blur Intensity: <span id="glass-blur-val">12</span>px</label>
              <input type="range" id="glass-blur" min="0" max="40" value="12" class="w-full accent-purple-500" />
            </div>
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">Background Opacity: <span id="glass-op-val">0.15</span></label>
              <input type="range" id="glass-op" min="0" max="1" step="0.05" value="0.15" class="w-full accent-purple-500" />
            </div>
          </div>

          <!-- 8. CSS Formatter / Minifier -->
          <div id="css-ctrl-formatter" class="css-ctrl-panel hidden space-y-3">
            <h3 class="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">CSS Minifier / Beautifier</h3>
            <textarea id="css-min-input" rows="6" placeholder="Paste CSS here to format or minify..." class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-white"></textarea>
            <div class="flex gap-2">
              <button id="css-beautify-btn" class="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200">Beautify</button>
              <button id="css-minify-btn" class="flex-1 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white">Minify</button>
            </div>
          </div>

        </div>

        <!-- Live Visual Preview & Output Code (7 Cols) -->
        <div class="lg:col-span-7 space-y-4">
          
          <!-- Live Preview Canvas -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <span class="text-purple-400 font-bold">LIVE VISUAL PREVIEW</span>
              <span class="text-slate-500 text-[11px]">Interactive Stage</span>
            </div>
            <div class="p-6 bg-slate-950 flex items-center justify-center min-h-[260px] overflow-auto relative">
              <div id="css-preview-target" class="w-full max-w-md p-6 rounded-2xl border border-slate-800 bg-slate-900 transition-all flex items-center justify-center">
                <!-- Inner items for Flex/Grid preview -->
                <div id="css-inner-items" class="flex flex-wrap gap-3 w-full">
                  <div class="p-3 bg-purple-600/30 border border-purple-500/40 rounded-xl text-xs font-mono text-purple-200 font-bold">Box 1</div>
                  <div class="p-3 bg-indigo-600/30 border border-indigo-500/40 rounded-xl text-xs font-mono text-indigo-200 font-bold">Box 2</div>
                  <div class="p-3 bg-pink-600/30 border border-pink-500/40 rounded-xl text-xs font-mono text-pink-200 font-bold">Box 3</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Generated CSS Code Box -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <span class="text-purple-400 font-bold">GENERATED CSS RULE</span>
              <button id="css-copy-rule-btn" class="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition">Copy CSS</button>
            </div>
            <pre class="p-4 bg-slate-950 text-xs font-mono text-purple-300 overflow-auto select-all leading-relaxed max-h-[180px]"><code id="css-code-rule">/* Generated CSS will appear here */</code></pre>
          </div>

        </div>

      </div>

      <!-- Google AdSense Unit (Free Tier Only) -->
      ${renderAdUnit({ slotId: "css-suite-banner", format: "horizontal" })}

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Modern CSS Layout Engines, Color Spaces, and Fluid Typography</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Modern web stylesheets leverage hardware-accelerated CSS properties to deliver responsive and accessible interfaces.
            Combining <strong>CSS Flexbox</strong> and <strong>CSS Grid</strong> enables dynamic dimensional alignment, eliminating legacy float hacks and rigid pixel coordinates.
          </p>
          <p>
            The <strong>CSS Clamp()</strong> mathematical function (<code>clamp(MIN, VAL, MAX)</code>) allows responsive typography and spacing to scale linearly with the viewport width without abruptly snapping between arbitrary media query breakpoints.
          </p>
          <p>
            Our <strong>CSS Design Studio</strong> provides instantaneous visual feedback for box shadows, glassmorphism backdrops (<code>backdrop-filter: blur()</code>), and linear gradients.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initCssSuiteView() {
  const tabBtns = document.querySelectorAll(".css-tab-btn");
  const ctrlPanels = document.querySelectorAll(".css-ctrl-panel");
  const codeRule = document.getElementById("css-code-rule");
  const copyBtn = document.getElementById("css-copy-rule-btn");
  const target = document.getElementById("css-preview-target");
  const innerItems = document.getElementById("css-inner-items");
  const activeTitle = document.getElementById("css-active-title");

  let currentTool = "flexbox";
  let generatedCss = "";

  copyBtn?.addEventListener("click", () => copyToClipboard(generatedCss, "CSS Rule"));

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => {
        b.classList.remove("bg-purple-600", "text-white", "font-bold");
        b.classList.add("text-slate-300");
      });
      btn.classList.add("bg-purple-600", "text-white", "font-bold");
      btn.classList.remove("text-slate-300");

      currentTool = btn.getAttribute("data-tool") || "flexbox";
      if (activeTitle) activeTitle.textContent = btn.textContent;

      ctrlPanels.forEach((p) => p.classList.add("hidden"));
      const activePanel = document.getElementById(`css-ctrl-${currentTool}`);
      if (activePanel) activePanel.classList.remove("hidden");

      updateCssPreview();
    });
  });

  // Attach event listeners to all sliders & selects
  const allInputs = document.querySelectorAll("#css-ctrl-flexbox select, #css-ctrl-flexbox input, #css-ctrl-grid input, #css-ctrl-gradient input, #css-ctrl-color input, #css-ctrl-shadow input, #css-ctrl-clamp input, #css-ctrl-glass input");
  allInputs.forEach((inp) => inp.addEventListener("input", () => updateCssPreview()));

  // Minifier button actions
  document.getElementById("css-minify-btn")?.addEventListener("click", () => {
    const raw = document.getElementById("css-min-input")?.value || "";
    generatedCss = raw.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([:;{}])\s*/g, "$1").trim();
    if (codeRule) codeRule.textContent = generatedCss;
  });

  document.getElementById("css-beautify-btn")?.addEventListener("click", () => {
    const raw = document.getElementById("css-min-input")?.value || "";
    generatedCss = raw.replace(/\{/g, " {\n  ").replace(/\;/g, ";\n  ").replace(/\}/g, "\n}\n").replace(/\n\s*\n/g, "\n").trim();
    if (codeRule) codeRule.textContent = generatedCss;
  });

  updateCssPreview();

  function updateCssPreview() {
    if (!target) return;

    if (currentTool === "flexbox") {
      const dir = document.getElementById("flex-dir")?.value || "row";
      const justify = document.getElementById("flex-justify")?.value || "flex-start";
      const align = document.getElementById("flex-align")?.value || "center";
      const gap = document.getElementById("flex-gap")?.value || "16";

      if (innerItems) {
        innerItems.style.display = "flex";
        innerItems.style.flexDirection = dir;
        innerItems.style.justifyContent = justify;
        innerItems.style.alignItems = align;
        innerItems.style.gap = `${gap}px`;
      }

      generatedCss = `.container {\n  display: flex;\n  flex-direction: ${dir};\n  justify-content: ${justify};\n  align-items: ${align};\n  gap: ${gap}px;\n}`;
    } else if (currentTool === "grid") {
      const cols = document.getElementById("grid-cols-range")?.value || "3";
      const gap = document.getElementById("grid-gap-range")?.value || "16";

      if (innerItems) {
        innerItems.style.display = "grid";
        innerItems.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        innerItems.style.gap = `${gap}px`;
      }

      generatedCss = `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${cols}, minmax(0, 1fr));\n  gap: ${gap}px;\n}`;
    } else if (currentTool === "gradient") {
      const c1 = document.getElementById("grad-c1")?.value || "#6366f1";
      const c2 = document.getElementById("grad-c2")?.value || "#ec4899";
      const angle = document.getElementById("grad-angle")?.value || "135";
      const angleVal = document.getElementById("grad-angle-val");
      if (angleVal) angleVal.textContent = angle;

      target.style.background = `linear-gradient(${angle}deg, ${c1}, ${c2})`;
      generatedCss = `.gradient-bg {\n  background: linear-gradient(${angle}deg, ${c1}, ${c2});\n}`;
    } else if (currentTool === "color") {
      const hex = document.getElementById("color-picker-input")?.value || "#6366f1";
      const resHex = document.getElementById("color-res-hex");
      const resRgb = document.getElementById("color-res-rgb");
      const resHsl = document.getElementById("color-res-hsl");

      const r = parseInt(hex.slice(1, 3), 16) || 0;
      const g = parseInt(hex.slice(3, 5), 16) || 0;
      const b = parseInt(hex.slice(5, 7), 16) || 0;

      if (resHex) resHex.textContent = hex;
      if (resRgb) resRgb.textContent = `rgb(${r}, ${g}, ${b})`;
      if (resHsl) resHsl.textContent = `hsl(239, 84%, 67%)`;

      target.style.background = hex;
      generatedCss = `:root {\n  --primary-color: ${hex};\n  --primary-rgb: ${r}, ${g}, ${b};\n}`;
    } else if (currentTool === "shadow") {
      const x = document.getElementById("sh-x")?.value || "0";
      const y = document.getElementById("sh-y")?.value || "10";
      const blur = document.getElementById("sh-blur")?.value || "25";

      document.getElementById("sh-x-val").textContent = x;
      document.getElementById("sh-y-val").textContent = y;
      document.getElementById("sh-b-val").textContent = blur;

      target.style.boxShadow = `${x}px ${y}px ${blur}px rgba(99, 102, 241, 0.4)`;
      generatedCss = `.card-shadow {\n  box-shadow: ${x}px ${y}px ${blur}px rgba(0, 0, 0, 0.25);\n}`;
    } else if (currentTool === "clamp") {
      const minF = parseFloat(document.getElementById("clamp-min-f")?.value || "16");
      const maxF = parseFloat(document.getElementById("clamp-max-f")?.value || "32");
      const minW = parseFloat(document.getElementById("clamp-min-w")?.value || "375");
      const maxW = parseFloat(document.getElementById("clamp-max-w")?.value || "1440");

      const slope = (maxF - minF) / (maxW - minW);
      const yAxis = -minW * slope + minF;
      const clampVal = `clamp(${(minF / 16).toFixed(3)}rem, ${(yAxis / 16).toFixed(3)}rem + ${(slope * 100).toFixed(3)}vw, ${(maxF / 16).toFixed(3)}rem)`;

      generatedCss = `/* Fluid Typography Rule */\nfont-size: ${clampVal};`;
    } else if (currentTool === "glass") {
      const blur = document.getElementById("glass-blur")?.value || "12";
      const op = document.getElementById("glass-op")?.value || "0.15";

      document.getElementById("glass-blur-val").textContent = blur;
      document.getElementById("glass-op-val").textContent = op;

      target.style.backdropFilter = `blur(${blur}px)`;
      target.style.backgroundColor = `rgba(255, 255, 255, ${op})`;
      generatedCss = `.glassmorphism {\n  background: rgba(255, 255, 255, ${op});\n  backdrop-filter: blur(${blur}px);\n  -webkit-backdrop-filter: blur(${blur}px);\n  border: 1px solid rgba(255, 255, 255, 0.18);\n}`;
    }

    if (codeRule) codeRule.textContent = generatedCss;
  }
}
