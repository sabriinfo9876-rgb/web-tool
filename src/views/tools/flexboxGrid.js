// Tool View: CSS Flexbox & CSS Grid Visual Playground with Live Code Export & SEO Guide

import { copyToClipboard, showToast } from "../../utils.js";

export function renderFlexboxGridView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">CSS Flexbox &amp; CSS Grid Playground</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">LAYOUT LAB</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Visually design and manipulate Flexbox containers and CSS Grid tracks with real-time CSS &amp; Tailwind code generation.</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex rounded-xl bg-slate-800 p-1 border border-slate-700">
            <button id="layout-mode-flex" class="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold transition">Flexbox</button>
            <button id="layout-mode-grid" class="px-3 py-1 rounded-lg bg-transparent text-slate-400 hover:text-white text-xs font-semibold transition">CSS Grid</button>
          </div>
        </div>
      </div>

      <!-- Controls and Interactive Stage -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        <!-- Controls Panel -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Layout Directives</span>
            <div class="flex gap-1.5">
              <button id="add-item-btn" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-emerald-400 font-mono">+ Item</button>
              <button id="remove-item-btn" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-rose-400 font-mono">- Item</button>
            </div>
          </div>

          <!-- Flexbox Controls -->
          <div id="flex-controls-group" class="space-y-3 text-xs">
            <div>
              <label class="block text-slate-400 font-mono mb-1">flex-direction</label>
              <select id="flex-direction" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono focus:outline-none">
                <option value="row">row</option>
                <option value="row-reverse">row-reverse</option>
                <option value="column">column</option>
                <option value="column-reverse">column-reverse</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-400 font-mono mb-1">justify-content</label>
              <select id="flex-justify" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono focus:outline-none">
                <option value="flex-start">flex-start</option>
                <option value="center" selected>center</option>
                <option value="flex-end">flex-end</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
                <option value="space-evenly">space-evenly</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-400 font-mono mb-1">align-items</label>
              <select id="flex-align" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono focus:outline-none">
                <option value="stretch">stretch</option>
                <option value="center" selected>center</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="baseline">baseline</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-400 font-mono mb-1">flex-wrap</label>
              <select id="flex-wrap" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono focus:outline-none">
                <option value="wrap" selected>wrap</option>
                <option value="nowrap">nowrap</option>
                <option value="wrap-reverse">wrap-reverse</option>
              </select>
            </div>
          </div>

          <!-- Grid Controls (Hidden by default) -->
          <div id="grid-controls-group" class="hidden space-y-3 text-xs">
            <div>
              <label class="block text-slate-400 font-mono mb-1">grid-template-columns</label>
              <select id="grid-cols" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono focus:outline-none">
                <option value="repeat(3, 1fr)" selected>repeat(3, 1fr)</option>
                <option value="repeat(2, 1fr)">repeat(2, 1fr)</option>
                <option value="repeat(4, 1fr)">repeat(4, 1fr)</option>
                <option value="200px 1fr 1fr">200px 1fr 1fr (Sidebar)</option>
                <option value="repeat(auto-fit, minmax(120px, 1fr))">auto-fit minmax(120px, 1fr)</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-400 font-mono mb-1">justify-items</label>
              <select id="grid-justify-items" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono focus:outline-none">
                <option value="stretch" selected>stretch</option>
                <option value="center">center</option>
                <option value="start">start</option>
                <option value="end">end</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-400 font-mono mb-1">align-items</label>
              <select id="grid-align-items" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono focus:outline-none">
                <option value="stretch" selected>stretch</option>
                <option value="center">center</option>
                <option value="start">start</option>
                <option value="end">end</option>
              </select>
            </div>
          </div>

          <!-- Common Gap Control -->
          <div>
            <div class="flex items-center justify-between text-xs font-mono mb-1">
              <label class="text-slate-400">gap: <span id="gap-display" class="text-emerald-400 font-bold">16px</span></label>
            </div>
            <input type="range" id="layout-gap" min="0" max="48" value="16" class="w-full" />
          </div>
        </div>

        <!-- Visual Canvas Stage -->
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl min-h-[300px] flex flex-col justify-between">
            <div class="flex items-center justify-between text-xs text-slate-400 font-mono pb-2 border-b border-slate-800">
              <span id="canvas-status-badge">CONTAINER: flex</span>
              <span id="canvas-items-count">4 items rendered</span>
            </div>

            <!-- Interactive Stage Area -->
            <div id="layout-stage" class="p-4 bg-slate-950 rounded-xl border border-slate-800/80 min-h-[220px] transition-all flex items-center justify-center flex-wrap gap-4">
              <div class="stage-item w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center text-white font-mono font-bold shadow-lg">1</div>
              <div class="stage-item w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center text-white font-mono font-bold shadow-lg">2</div>
              <div class="stage-item w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center text-white font-mono font-bold shadow-lg">3</div>
              <div class="stage-item w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center text-white font-mono font-bold shadow-lg">4</div>
            </div>

            <!-- Code Output Tabs -->
            <div class="pt-3 flex items-center justify-between">
              <div class="flex gap-2">
                <button id="tab-css-btn" class="px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-xs font-mono font-bold">Vanilla CSS</button>
                <button id="tab-tw-btn" class="px-2.5 py-1 rounded bg-transparent hover:bg-slate-800 text-slate-400 text-xs font-mono">Tailwind Classes</button>
              </div>
              <button id="copy-layout-code-btn" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition">Copy Code</button>
            </div>
          </div>

          <!-- Code Box -->
          <pre class="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-emerald-300 font-mono overflow-auto"><code id="layout-code-output">.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}</code></pre>
        </div>

      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">CSS Flexbox (1D) vs. CSS Grid (2D) Layout Mechanics</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Modern web layout architecture relies on two complementary W3C standards: <strong>Flexible Box Layout (Flexbox)</strong> and <strong>CSS Grid Layout Module Level 2</strong>.
          </p>
          <p>
            <strong>Flexbox</strong> is engineered for one-dimensional distribution (along either the primary horizontal axis or cross vertical axis). It excels at navigational bars, button groupings, centered modals, and linear card lists where content size dictates the space allocation.
          </p>
          <p>
            <strong>CSS Grid</strong> is a true two-dimensional layout system that handles rows and columns simultaneously. Grid controls outer track geometry with fractional units (<code>1fr</code>) and dynamic auto-placement algorithms (<code>repeat(auto-fit, minmax(280px, 1fr))</code>), making it ideal for responsive dashboard bento grids, photo galleries, and full-page application skeletons without nested container clutter.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initFlexboxGridView() {
  const modeFlexBtn = document.getElementById("layout-mode-flex");
  const modeGridBtn = document.getElementById("layout-mode-grid");

  const flexGroup = document.getElementById("flex-controls-group");
  const gridGroup = document.getElementById("grid-controls-group");

  const flexDirection = document.getElementById("flex-direction");
  const flexJustify = document.getElementById("flex-justify");
  const flexAlign = document.getElementById("flex-align");
  const flexWrap = document.getElementById("flex-wrap");

  const gridCols = document.getElementById("grid-cols");
  const gridJustifyItems = document.getElementById("grid-justify-items");
  const gridAlignItems = document.getElementById("grid-align-items");

  const gapSlider = document.getElementById("layout-gap");
  const gapDisplay = document.getElementById("gap-display");

  const stage = document.getElementById("layout-stage");
  const badge = document.getElementById("canvas-status-badge");
  const itemsCount = document.getElementById("canvas-items-count");
  const codeOutput = document.getElementById("layout-code-output");

  const addItemBtn = document.getElementById("add-item-btn");
  const removeItemBtn = document.getElementById("remove-item-btn");
  const copyBtn = document.getElementById("copy-layout-code-btn");

  const tabCss = document.getElementById("tab-css-btn");
  const tabTw = document.getElementById("tab-tw-btn");

  let currentMode = "flex";
  let activeCodeTab = "css";
  let itemCount = 4;

  function updateStage() {
    const gap = gapSlider.value;
    gapDisplay.textContent = `${gap}px`;

    if (currentMode === "flex") {
      const dir = flexDirection.value;
      const jc = flexJustify.value;
      const ai = flexAlign.value;
      const wrap = flexWrap.value;

      stage.style.display = "flex";
      stage.style.flexDirection = dir;
      stage.style.justifyContent = jc;
      stage.style.alignItems = ai;
      stage.style.flexWrap = wrap;
      stage.style.gridTemplateColumns = "none";
      stage.style.gap = `${gap}px`;

      badge.textContent = `CONTAINER: flex (${dir})`;

      if (activeCodeTab === "css") {
        codeOutput.textContent = `.container {\n  display: flex;\n  flex-direction: ${dir};\n  justify-content: ${jc};\n  align-items: ${ai};\n  flex-wrap: ${wrap};\n  gap: ${gap}px;\n}`;
      } else {
        codeOutput.textContent = `class="flex flex-${dir === "row" ? "row" : dir === "column" ? "col" : dir} justify-${jc === "flex-start" ? "start" : jc === "flex-end" ? "end" : jc === "space-between" ? "between" : jc} items-${ai === "flex-start" ? "start" : ai === "flex-end" ? "end" : ai} ${wrap === "wrap" ? "flex-wrap" : "flex-nowrap"} gap-[${gap}px]"`;
      }
    } else {
      const cols = gridCols.value;
      const ji = gridJustifyItems.value;
      const ai = gridAlignItems.value;

      stage.style.display = "grid";
      stage.style.gridTemplateColumns = cols;
      stage.style.justifyItems = ji;
      stage.style.alignItems = ai;
      stage.style.flexDirection = "";
      stage.style.gap = `${gap}px`;

      badge.textContent = `CONTAINER: grid (${cols})`;

      if (activeCodeTab === "css") {
        codeOutput.textContent = `.container {\n  display: grid;\n  grid-template-columns: ${cols};\n  justify-items: ${ji};\n  align-items: ${ai};\n  gap: ${gap}px;\n}`;
      } else {
        codeOutput.textContent = `class="grid grid-cols-${cols.includes("2") ? "2" : cols.includes("4") ? "4" : "3"} justify-items-${ji} items-${ai} gap-[${gap}px]"`;
      }
    }

    itemsCount.textContent = `${itemCount} items rendered`;
  }

  modeFlexBtn?.addEventListener("click", () => {
    currentMode = "flex";
    modeFlexBtn.className = "px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold transition";
    modeGridBtn.className = "px-3 py-1 rounded-lg bg-transparent text-slate-400 hover:text-white text-xs font-semibold transition";
    flexGroup.classList.remove("hidden");
    gridGroup.classList.add("hidden");
    updateStage();
  });

  modeGridBtn?.addEventListener("click", () => {
    currentMode = "grid";
    modeGridBtn.className = "px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold transition";
    modeFlexBtn.className = "px-3 py-1 rounded-lg bg-transparent text-slate-400 hover:text-white text-xs font-semibold transition";
    gridGroup.classList.remove("hidden");
    flexGroup.classList.add("hidden");
    updateStage();
  });

  [flexDirection, flexJustify, flexAlign, flexWrap, gridCols, gridJustifyItems, gridAlignItems, gapSlider].forEach(el => {
    el?.addEventListener("input", updateStage);
  });

  addItemBtn?.addEventListener("click", () => {
    if (itemCount >= 12) {
      showToast("Max 12 playground items", "warning");
      return;
    }
    itemCount++;
    const item = document.createElement("div");
    item.className = "stage-item w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center text-white font-mono font-bold shadow-lg";
    item.textContent = itemCount;
    stage.appendChild(item);
    updateStage();
  });

  removeItemBtn?.addEventListener("click", () => {
    if (itemCount <= 1) {
      showToast("Min 1 item required", "warning");
      return;
    }
    stage.lastElementChild?.remove();
    itemCount--;
    updateStage();
  });

  tabCss?.addEventListener("click", () => {
    activeCodeTab = "css";
    tabCss.className = "px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-xs font-mono font-bold";
    tabTw.className = "px-2.5 py-1 rounded bg-transparent hover:bg-slate-800 text-slate-400 text-xs font-mono";
    updateStage();
  });

  tabTw?.addEventListener("click", () => {
    activeCodeTab = "tailwind";
    tabTw.className = "px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-xs font-mono font-bold";
    tabCss.className = "px-2.5 py-1 rounded bg-transparent hover:bg-slate-800 text-slate-400 text-xs font-mono";
    updateStage();
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(codeOutput.textContent, "Layout code");
  });

  updateStage();
}
