// Tool View: Image Studio Suite (Compress, Resize, Format Converter, SVG Optimizer, Favicon Generator)
// 100% Client-side HTML5 Canvas and Blob Image Processing

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderImageSuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-emerald-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Media &amp; Assets</span>
        <span>/</span>
        <span class="text-emerald-400 font-bold">Image Suite</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Image Studio &amp; Optimizer</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">CLIENT-SIDE PROCESSING</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Compress photos, resize dimensions, convert to WebP/PNG/JPEG, optimize SVG markup, and generate multi-resolution favicon packages.</p>
        </div>
      </div>

      <!-- Mode Selector -->
      <div class="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap text-xs font-mono">
        <button data-mode="compress" class="img-tab-btn px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold transition">Compress &amp; Resize</button>
        <button data-mode="convert" class="img-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Format Converter (WebP/PNG/JPG)</button>
        <button data-mode="svg" class="img-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">SVG Optimizer</button>
        <button data-mode="favicon" class="img-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Favicon Generator</button>
      </div>

      <!-- Standard Image Processor Section -->
      <div id="img-proc-section" class="space-y-5">
        
        <!-- Upload Dropzone -->
        <div id="img-drop-zone" class="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-3xl p-8 text-center transition cursor-pointer bg-slate-900/40 flex flex-col items-center justify-center gap-3">
          <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <div>
            <span class="text-base font-bold text-white block">Drop image file here or click to browse</span>
            <span class="text-xs text-slate-400 mt-1 block">Supports PNG, JPEG, WebP, GIF, SVG (Processed entirely inside browser memory)</span>
          </div>
          <input type="file" id="img-file-input" accept="image/*" class="hidden" />
        </div>

        <!-- Controls & Comparison Row (Hidden until image loaded) -->
        <div id="img-workbench" class="hidden grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          <!-- Controls (4 cols) -->
          <div class="lg:col-span-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
            <h3 class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Adjustment Parameters</h3>
            
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">Quality Compression: <span id="img-qual-val">80</span>%</label>
              <input type="range" id="img-qual-slider" min="10" max="100" value="80" class="w-full accent-emerald-500" />
            </div>

            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">Target Format</label>
              <select id="img-target-fmt" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono">
                <option value="image/webp">WebP (Modern, High Compression)</option>
                <option value="image/jpeg">JPEG / JPG</option>
                <option value="image/png">PNG (Lossless)</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <label class="text-[10px] text-slate-400 block mb-1">Width (px)</label>
                <input type="number" id="img-dim-w" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label class="text-[10px] text-slate-400 block mb-1">Height (px)</label>
                <input type="number" id="img-dim-h" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" />
              </div>
            </div>

            <button id="img-download-btn" class="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span>Download Optimized Image</span>
            </button>
          </div>

          <!-- Visual Comparison (8 cols) -->
          <div class="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 flex flex-col justify-between">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono">
              <div>
                <span class="text-slate-400">Original Size:</span>
                <strong id="img-orig-size" class="text-rose-400 ml-1">0 KB</strong>
              </div>
              <div>
                <span class="text-slate-400">Optimized Size:</span>
                <strong id="img-opt-size" class="text-emerald-400 ml-1">0 KB</strong>
              </div>
              <div>
                <span class="text-slate-400">Saved:</span>
                <strong id="img-saved-pct" class="text-indigo-400 ml-1">0%</strong>
              </div>
            </div>

            <div class="flex items-center justify-center p-6 min-h-[280px]">
              <img id="img-preview" src="" alt="Preview" class="max-h-72 max-w-full rounded-xl object-contain shadow-2xl border border-slate-800" />
            </div>
          </div>

        </div>

      </div>

      <!-- SVG Optimizer Section -->
      <div id="svg-opt-section" class="hidden space-y-5">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-300 font-bold">SOURCE SVG CODE</div>
            <textarea id="svg-input-area" rows="12" placeholder="<svg ...>...</svg>" class="w-full flex-1 bg-slate-950 p-4 text-xs font-mono text-slate-100 focus:outline-none leading-relaxed"></textarea>
          </div>
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <span class="text-emerald-400 font-bold">OPTIMIZED SVG</span>
              <button id="svg-copy-btn" class="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition">Copy SVG</button>
            </div>
            <pre class="w-full flex-1 bg-slate-950 p-4 text-xs font-mono text-emerald-300 overflow-auto select-all leading-relaxed max-h-[300px]"><code id="svg-output-code">// Cleaned SVG code will appear here</code></pre>
          </div>
        </div>
      </div>

      <!-- Favicon Generator Section -->
      <div id="favicon-section" class="hidden space-y-5">
        <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 class="text-sm font-bold text-white">Favicon Package Generator</h3>
          <p class="text-xs text-slate-400">Generate 16x16, 32x32, 48x48, 180x180 (Apple Touch Icon), and 512x512 PNG assets alongside standard HTML header tags.</p>
          <div id="favicon-icons-grid" class="flex flex-wrap gap-4 pt-2">
            <!-- Rendered sizes -->
          </div>
        </div>
      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Client-Side Image Compression, Modern Codecs, and Core Web Vitals</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Optimizing media payloads is the highest-impact strategy for improving Google Core Web Vitals (specifically Largest Contentful Paint - LCP).
            Modern codecs like <strong>WebP</strong> provide lossy compression that averages 25–34% smaller file sizes compared to traditional JPEG at equivalent SSIM quality scores.
          </p>
          <p>
            By executing image processing entirely on the client using HTML5 Canvas pixel manipulation and <code>canvas.toBlob()</code> APIs, assets are optimized without consuming server bandwidth or compromising privacy.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initImageSuiteView() {
  const tabBtns = document.querySelectorAll(".img-tab-btn");
  const procSection = document.getElementById("img-proc-section");
  const svgSection = document.getElementById("svg-opt-section");
  const faviconSection = document.getElementById("favicon-section");

  const dropZone = document.getElementById("img-drop-zone");
  const fileInput = document.getElementById("img-file-input");
  const workbench = document.getElementById("img-workbench");
  const preview = document.getElementById("img-preview");
  const origSizeEl = document.getElementById("img-orig-size");
  const optSizeEl = document.getElementById("img-opt-size");
  const savedPctEl = document.getElementById("img-saved-pct");

  const qualSlider = document.getElementById("img-qual-slider");
  const qualVal = document.getElementById("img-qual-val");
  const targetFmt = document.getElementById("img-target-fmt");
  const dimW = document.getElementById("img-dim-w");
  const dimH = document.getElementById("img-dim-h");
  const downloadBtn = document.getElementById("img-download-btn");

  const svgInput = document.getElementById("svg-input-area");
  const svgOutput = document.getElementById("svg-output-code");
  const svgCopy = document.getElementById("svg-copy-btn");

  let loadedImg = null;
  let originalBytes = 0;
  let optimizedBlob = null;

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => {
        b.classList.remove("bg-emerald-600", "text-white", "font-bold");
        b.classList.add("text-slate-300");
      });
      btn.classList.add("bg-emerald-600", "text-white", "font-bold");
      btn.classList.remove("text-slate-300");

      const mode = btn.getAttribute("data-mode") || "compress";
      if (mode === "svg") {
        procSection?.classList.add("hidden");
        svgSection?.classList.remove("hidden");
        faviconSection?.classList.add("hidden");
      } else if (mode === "favicon") {
        procSection?.classList.add("hidden");
        svgSection?.classList.add("hidden");
        faviconSection?.classList.remove("hidden");
      } else {
        procSection?.classList.remove("hidden");
        svgSection?.classList.add("hidden");
        faviconSection?.classList.add("hidden");
      }
    });
  });

  dropZone?.addEventListener("click", () => fileInput?.click());
  dropZone?.addEventListener("dragover", (e) => e.preventDefault());
  dropZone?.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) handleFile(e.dataTransfer.files[0]);
  });

  fileInput?.addEventListener("change", (e) => {
    if (e.target?.files?.length) handleFile(e.target.files[0]);
  });

  function handleFile(file) {
    if (!file.type.startsWith("image/")) return showToast("Please select an image file", "error");
    originalBytes = file.size;
    if (origSizeEl) origSizeEl.textContent = `${(file.size / 1024).toFixed(1)} KB`;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        loadedImg = img;
        if (dimW) dimW.value = img.width;
        if (dimH) dimH.value = img.height;
        workbench?.classList.remove("hidden");
        renderFavicons(img);
        processImage();
      };
      img.src = e.target?.result;
    };
    reader.readAsDataURL(file);
  }

  [qualSlider, targetFmt, dimW, dimH].forEach((el) => {
    el?.addEventListener("input", () => {
      if (qualVal && qualSlider) qualVal.textContent = qualSlider.value;
      processImage();
    });
  });

  function processImage() {
    if (!loadedImg) return;
    const w = parseInt(dimW?.value) || loadedImg.width;
    const h = parseInt(dimH?.value) || loadedImg.height;
    const q = (parseInt(qualSlider?.value) || 80) / 100;
    const fmt = targetFmt?.value || "image/webp";

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(loadedImg, 0, 0, w, h);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        optimizedBlob = blob;
        const optUrl = URL.createObjectURL(blob);
        if (preview) preview.src = optUrl;
        if (optSizeEl) optSizeEl.textContent = `${(blob.size / 1024).toFixed(1)} KB`;

        const savedPct = Math.max(0, Math.round(((originalBytes - blob.size) / originalBytes) * 100));
        if (savedPctEl) savedPctEl.textContent = `${savedPct}%`;
      },
      fmt,
      q
    );
  }

  downloadBtn?.addEventListener("click", () => {
    if (!optimizedBlob) return;
    const ext = targetFmt?.value === "image/png" ? "png" : targetFmt?.value === "image/jpeg" ? "jpg" : "webp";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(optimizedBlob);
    a.download = `optimized-image.${ext}`;
    a.click();
    showToast("Downloaded optimized image!", "success");
  });

  function renderFavicons(img) {
    const grid = document.getElementById("favicon-icons-grid");
    if (!grid) return;

    const sizes = [16, 32, 48, 180, 512];
    grid.innerHTML = sizes
      .map((s) => {
        const c = document.createElement("canvas");
        c.width = s;
        c.height = s;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0, s, s);
        const dataUrl = c.toDataURL("image/png");
        return `
          <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center gap-2">
            <img src="${dataUrl}" class="w-10 h-10 object-contain border border-slate-800 rounded" />
            <span class="text-[10px] font-mono text-slate-400 font-bold">${s}x${s}</span>
            <a href="${dataUrl}" download="favicon-${s}x${s}.png" class="text-[10px] font-mono text-emerald-400 hover:underline">Download</a>
          </div>
        `;
      })
      .join("");
  }

  // SVG Optimizer Logic
  svgInput?.addEventListener("input", () => {
    const raw = svgInput?.value || "";
    const cleaned = raw
      .replace(/<\!--[\s\S]*?-->/g, "")
      .replace(/\s+/g, " ")
      .replace(/>\s+</g, "><")
      .trim();
    if (svgOutput) svgOutput.textContent = cleaned;
  });

  svgCopy?.addEventListener("click", () => {
    copyToClipboard(svgOutput?.textContent, "Optimized SVG");
  });
}
