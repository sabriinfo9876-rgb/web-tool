// Tool View: WebP / Image Base64 Drag & Drop Encoder with FileReader & SEO Guide

import { copyToClipboard, showToast } from "../../utils.js";

export function renderImageBase64View() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">WebP / Image Base64 Data URI Encoder</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">CLIENT FILEREADER</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Convert PNG, JPG, WebP, GIF, and SVG images into Base64 Data URIs, HTML &lt;img&gt; tags, and CSS background rules.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="img-clear-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-300 transition">Clear</button>
          <button id="img-copy-uri-btn" class="px-3 py-1.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-bold transition">Copy Data URI</button>
        </div>
      </div>

      <!-- Drag & Drop Upload Zone -->
      <div id="img-dropzone" class="p-8 border-2 border-dashed border-slate-700 hover:border-yellow-400/60 rounded-3xl bg-slate-900/60 hover:bg-slate-900 transition text-center cursor-pointer flex flex-col items-center justify-center space-y-3">
        <div class="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </div>
        <div>
          <span class="text-sm font-bold text-white">Drag &amp; drop your image file here</span>
          <span class="text-xs text-slate-400 block mt-0.5">or click to browse local files (PNG, JPG, WebP, SVG, GIF)</span>
        </div>
        <input type="file" id="img-file-input" accept="image/*" class="hidden" />
      </div>

      <!-- Visual Preview & Output Tabs -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        <!-- Image Preview Card -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3 flex flex-col justify-between">
          <div class="space-y-2">
            <span class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">Image Asset Preview</span>
            <div class="h-44 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden p-2">
              <img id="img-preview-tag" src="" alt="Preview" class="hidden max-h-full max-w-full object-contain rounded" />
              <span id="img-empty-label" class="text-xs text-slate-500 font-mono">No image loaded</span>
            </div>
          </div>
          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
            <div class="flex justify-between"><span class="text-slate-500">File Name:</span><span id="img-stat-name">—</span></div>
            <div class="flex justify-between"><span class="text-slate-500">MIME Type:</span><span id="img-stat-type">—</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Byte Size:</span><span id="img-stat-size">—</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Resolution:</span><span id="img-stat-dim">—</span></div>
          </div>
        </div>

        <!-- Output Code Box Column -->
        <div class="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div class="flex items-center gap-1.5" id="img-output-tabs">
              <button data-type="datauri" class="img-tab-btn px-2.5 py-1 rounded bg-yellow-500 text-slate-950 font-bold">Data URI</button>
              <button data-type="html" class="img-tab-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">&lt;img&gt; Tag</button>
              <button data-type="css" class="img-tab-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">CSS Background</button>
            </div>
            <button id="img-copy-current-btn" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-yellow-400 font-bold">Copy</button>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <textarea id="img-output-text" rows="12" readonly placeholder="Base64 Data URI string will appear here after image upload..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-yellow-300 font-mono focus:outline-none resize-y leading-relaxed flex-1 break-all"></textarea>
          </div>
        </div>

      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Client-Side Base64 Image Encoding &amp; Inline Asset Strategies</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>Base64 encoding</strong> converts raw binary image octets into a 64-character radix ASCII representation (A-Z, a-z, 0-9, +, /).
          </p>
          <p>
            Embedding small icons, avatars, and placeholder graphics directly as <code>data:image/webp;base64,...</code> eliminates TCP handshakes and HTTP request latency, preventing Cumulative Layout Shift (CLS) on initial page paint.
          </p>
          <p>
            Our tool uses the standard HTML5 <strong>FileReader API</strong> running 100% locally in your browser memory. Your private photos, confidential mockups, and client assets are never uploaded to any remote server.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initImageBase64View() {
  const dropzone = document.getElementById("img-dropzone");
  const fileInput = document.getElementById("img-file-input");
  const previewTag = document.getElementById("img-preview-tag");
  const emptyLabel = document.getElementById("img-empty-label");

  const statName = document.getElementById("img-stat-name");
  const statType = document.getElementById("img-stat-type");
  const statSize = document.getElementById("img-stat-size");
  const statDim = document.getElementById("img-stat-dim");

  const outputText = document.getElementById("img-output-text");
  const tabButtons = document.querySelectorAll(".img-tab-btn");
  const copyUriBtn = document.getElementById("img-copy-uri-btn");
  const copyCurrentBtn = document.getElementById("img-copy-current-btn");
  const clearBtn = document.getElementById("img-clear-btn");

  let base64String = "";
  let activeFormat = "datauri";

  function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      showToast("Please upload a valid image file", "error");
      return;
    }

    statName.textContent = file.name;
    statType.textContent = file.type;
    statSize.textContent = `${(file.size / 1024).toFixed(1)} KB`;

    const reader = new FileReader();
    reader.onload = (e) => {
      base64String = e.target?.result || "";
      previewTag.src = base64String;
      previewTag.classList.remove("hidden");
      emptyLabel.classList.add("hidden");

      const img = new Image();
      img.onload = () => {
        statDim.textContent = `${img.naturalWidth} x ${img.naturalHeight} px`;
      };
      img.src = base64String;

      updateOutput();
      showToast(`Encoded image (${file.name}) to Base64`, "success");
    };
    reader.readAsDataURL(file);
  }

  function updateOutput() {
    if (!base64String) {
      outputText.value = "";
      return;
    }

    if (activeFormat === "datauri") {
      outputText.value = base64String;
    } else if (activeFormat === "html") {
      outputText.value = `<img src="${base64String}" alt="${statName.textContent || "Image"}" />`;
    } else if (activeFormat === "css") {
      outputText.value = `background-image: url("${base64String}");\nbackground-size: cover;\nbackground-repeat: no-repeat;`;
    }
  }

  dropzone?.addEventListener("click", () => fileInput?.click());
  dropzone?.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("border-yellow-400");
  });
  dropzone?.addEventListener("dragleave", () => {
    dropzone.classList.remove("border-yellow-400");
  });
  dropzone?.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("border-yellow-400");
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  });

  fileInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  });

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => {
        b.className = "img-tab-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300";
      });
      btn.className = "img-tab-btn px-2.5 py-1 rounded bg-yellow-500 text-slate-950 font-bold";
      activeFormat = btn.dataset.type;
      updateOutput();
    });
  });

  copyUriBtn?.addEventListener("click", () => {
    if (!base64String) {
      showToast("No image loaded", "warning");
      return;
    }
    copyToClipboard(base64String, "Data URI");
  });

  copyCurrentBtn?.addEventListener("click", () => {
    if (!outputText.value) {
      showToast("Nothing to copy", "warning");
      return;
    }
    copyToClipboard(outputText.value, "Output code");
  });

  clearBtn?.addEventListener("click", () => {
    base64String = "";
    previewTag.src = "";
    previewTag.classList.add("hidden");
    emptyLabel.classList.remove("hidden");
    statName.textContent = "—";
    statType.textContent = "—";
    statSize.textContent = "—";
    statDim.textContent = "—";
    outputText.value = "";
  });
}
