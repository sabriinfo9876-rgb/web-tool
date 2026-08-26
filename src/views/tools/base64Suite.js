// Tool View: Base64 Suite (Base64 Text & Image Encoder / Decoder)
// 100% Client-side file and string converter

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderBase64SuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-emerald-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Security &amp; Web</span>
        <span>/</span>
        <span class="text-emerald-400 font-bold">Base64 Converter</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Base64 Encoder &amp; Decoder</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">CLIENT PROCESSOR</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Convert text and images to Base64 data URIs and decode Base64 strings back to plain text instantly in your browser.</p>
        </div>
      </div>

      <!-- Mode Selector -->
      <div class="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap text-xs font-mono">
        <button data-mode="text-encode" class="b64-tab-btn px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold transition">Text to Base64</button>
        <button data-mode="text-decode" class="b64-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Base64 to Text</button>
        <button data-mode="image" class="b64-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Image to Base64 Data URI</button>
      </div>

      <!-- Text Encode/Decode Panels -->
      <div id="b64-text-container" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Input Textarea -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-slate-300 font-bold" id="b64-input-label">RAW TEXT INPUT</span>
            <span id="b64-in-count" class="text-slate-500 text-[11px]">0 chars</span>
          </div>
          <textarea id="b64-input-area" rows="12" placeholder="Enter text to encode or Base64 string to decode..." class="w-full flex-1 bg-slate-950 p-4 text-xs font-mono text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none leading-relaxed">Hello, WebDevHub!</textarea>
        </div>

        <!-- Output Textarea -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-emerald-400 font-bold" id="b64-output-label">BASE64 OUTPUT</span>
            <button id="b64-copy-btn" class="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition">Copy Result</button>
          </div>
          <textarea id="b64-output-area" rows="12" readonly class="w-full flex-1 bg-slate-950 p-4 text-xs font-mono text-emerald-300 focus:outline-none resize-none leading-relaxed"></textarea>
        </div>

      </div>

      <!-- Image to Base64 Drag & Drop Zone -->
      <div id="b64-image-container" class="hidden space-y-5">
        <div id="b64-img-drop" class="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-8 text-center transition cursor-pointer bg-slate-950/60 flex flex-col items-center justify-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <div>
            <span class="text-sm font-bold text-white block">Drop an image (PNG, JPG, WebP, SVG) here to convert to Base64</span>
            <span class="text-xs text-slate-500 mt-0.5 block">Generates standard data:image/...;base64, URI</span>
          </div>
          <input type="file" id="b64-img-input" accept="image/*" class="hidden" />
        </div>

        <div id="b64-img-result-card" class="hidden bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold text-emerald-400">BASE64 DATA URI RESULT</span>
            <button id="b64-copy-img-btn" class="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition">Copy Data URI</button>
          </div>
          <textarea id="b64-img-output" rows="6" readonly class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-emerald-300 font-mono focus:outline-none"></textarea>
        </div>
      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Base64 Binary-to-Text Encoding and Inline Data URIs</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>Base64</strong> is a group of binary-to-text encoding schemes representing binary data in an ASCII string format by translating it into a radix-64 representation (defined in RFC 4648). Base64 uses 64 printable characters: <code>A-Z</code>, <code>a-z</code>, <code>0-9</code>, <code>+</code>, and <code>/</code>, with <code>=</code> reserved for padding.
          </p>
          <p>
            In modern web engineering, Base64 is frequently used for embedding small images, icons, or audio clips directly into HTML or CSS stylesheets via <code>data:image/png;base64,...</code> data URIs. This eliminates extra HTTP roundtrip latency during initial page loads.
          </p>
          <p>
            Because Base64 increases raw binary file sizes by approximately 33%, it is recommended primarily for lightweight assets under 10KB (such as favicon logos, placeholders, and inline SVG icons).
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initBase64SuiteView() {
  const inputArea = document.getElementById("b64-input-area");
  const outputArea = document.getElementById("b64-output-area");
  const inCount = document.getElementById("b64-in-count");
  const copyBtn = document.getElementById("b64-copy-btn");
  const tabBtns = document.querySelectorAll(".b64-tab-btn");

  const textContainer = document.getElementById("b64-text-container");
  const imageContainer = document.getElementById("b64-image-container");
  const imgDrop = document.getElementById("b64-img-drop");
  const imgInput = document.getElementById("b64-img-input");
  const imgResultCard = document.getElementById("b64-img-result-card");
  const imgOutput = document.getElementById("b64-img-output");
  const copyImgBtn = document.getElementById("b64-copy-img-btn");

  let currentMode = "text-encode";

  copyBtn?.addEventListener("click", () => copyToClipboard(outputArea?.value, "Base64 Text"));
  copyImgBtn?.addEventListener("click", () => copyToClipboard(imgOutput?.value, "Base64 Image Data URI"));

  imgDrop?.addEventListener("click", () => imgInput?.click());
  imgDrop?.addEventListener("dragover", (e) => e.preventDefault());
  imgDrop?.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) handleImageFile(e.dataTransfer.files[0]);
  });

  imgInput?.addEventListener("change", (e) => {
    if (e.target?.files?.length) handleImageFile(e.target.files[0]);
  });

  function handleImageFile(file) {
    if (!file.type.startsWith("image/")) return showToast("Please select an image file", "error");
    const reader = new FileReader();
    reader.onload = () => {
      if (imgOutput) imgOutput.value = reader.result;
      imgResultCard?.classList.remove("hidden");
      showToast("Image converted to Base64 Data URI!", "success");
    };
    reader.readAsDataURL(file);
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => {
        b.classList.remove("bg-emerald-600", "text-white", "font-bold");
        b.classList.add("text-slate-300");
      });
      btn.classList.add("bg-emerald-600", "text-white", "font-bold");
      btn.classList.remove("text-slate-300");

      currentMode = btn.getAttribute("data-mode") || "text-encode";
      if (currentMode === "image") {
        textContainer?.classList.add("hidden");
        imageContainer?.classList.remove("hidden");
      } else {
        textContainer?.classList.remove("hidden");
        imageContainer?.classList.add("hidden");
        processText();
      }
    });
  });

  inputArea?.addEventListener("input", () => processText());
  processText();

  function processText() {
    const raw = inputArea?.value || "";
    if (inCount) inCount.textContent = `${raw.length} chars`;

    if (!raw) {
      if (outputArea) outputArea.value = "";
      return;
    }

    try {
      if (currentMode === "text-encode") {
        const encoded = btoa(unescape(encodeURIComponent(raw)));
        if (outputArea) outputArea.value = encoded;
      } else if (currentMode === "text-decode") {
        const decoded = decodeURIComponent(escape(atob(raw.trim())));
        if (outputArea) outputArea.value = decoded;
      }
    } catch (err) {
      if (outputArea) outputArea.value = "Error decoding Base64 string: " + err.message;
    }
  }
}
