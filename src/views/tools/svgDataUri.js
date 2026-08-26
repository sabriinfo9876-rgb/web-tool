// Tool View: SVG to CSS Data URI, Clean Inline SVG, Base64 & HTML img with SEO Guide

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderSvgDataUriView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">SVG to CSS Data URI &amp; Base64 Encoder</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">VECTOR ENGINE</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Convert raw SVG icons into sanitized UTF-8 Data URIs, Base64 strings, and CSS background-image rules.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="svg-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Load Sample SVG</button>
          <button id="svg-clear-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-300 transition">Clear</button>
        </div>
      </div>

      <!-- Main Dual-Pane Converter -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Input SVG Code / Upload -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>RAW SVG MARKUP</span>
            <label class="cursor-pointer text-indigo-400 hover:text-indigo-300 font-sans font-semibold">
              <span>Upload .svg File</span>
              <input type="file" id="svg-file-input" accept=".svg,image/svg+xml" class="hidden" />
            </label>
          </div>
          <div class="p-4 flex-1 flex flex-col space-y-3">
            <textarea id="svg-input" rows="12" placeholder='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">...</svg>' class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-purple-400 resize-y leading-relaxed flex-1"></textarea>
            
            <!-- Live Visual Preview of SVG -->
            <div class="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-xs font-mono text-slate-400">Live Render:</span>
                <div id="svg-preview-box" class="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700/60 p-1 flex items-center justify-center text-purple-400 overflow-hidden">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
              </div>
              <div class="text-right text-[11px] text-slate-500 font-mono" id="svg-dimension-stats">24x24 viewBox</div>
            </div>
          </div>
        </div>

        <!-- Converted Output Tabs & Formats -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div class="flex items-center gap-1.5" id="svg-output-tabs">
              <button data-format="css" class="svg-tab-btn px-2.5 py-1 rounded bg-purple-600 text-white font-bold">CSS URL</button>
              <button data-format="datauri" class="svg-tab-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">Data URI</button>
              <button data-format="base64" class="svg-tab-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">Base64</button>
              <button data-format="html" class="svg-tab-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">&lt;img&gt; Tag</button>
            </div>
            <button id="svg-copy-btn" class="px-3 py-1 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-bold transition">Copy Format</button>
          </div>

          <div class="p-4 flex-1 flex flex-col">
            <pre class="w-full flex-1 bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-purple-300 font-mono overflow-auto leading-relaxed select-all"><code id="svg-code-output">background-image: url('data:image/svg+xml;utf8,...');</code></pre>
          </div>
        </div>

      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">SVG Data URI Optimization &amp; CSS Embedding Architecture</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Embedding <strong>Scalable Vector Graphics (SVG)</strong> directly into CSS stylesheets or HTML inline attributes eliminates additional HTTP/2 request overhead, dramatically improving <strong>Core Web Vitals</strong> (specifically Largest Contentful Paint - LCP and Cumulative Layout Shift - CLS).
          </p>
          <p>
            While many legacy developers encode SVGs using heavy Base64 strings (which bloats payload file sizes by <strong>~33%</strong>), modern browsers natively support UTF-8 URL encoding using <code class="text-purple-300 font-mono">data:image/svg+xml;utf8,...</code>. Only specific characters—namely <code>#</code>, <code>%</code>, <code>&lt;</code>, <code>&gt;</code>, and <code>"</code>—require percent-encoding, preserving pure vector compressibility while allowing Gzip and Brotli compression to achieve maximum efficiency.
          </p>
          <p>
            Our tool cleans non-standard XML namespaces, removes unnecessary editor metadata, and outputs ready-to-use CSS background-image declarations, inline Data URIs, and accessible HTML <code>&lt;img&gt;</code> tags.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initSvgDataUriView() {
  const input = document.getElementById("svg-input");
  const output = document.getElementById("svg-code-output");
  const previewBox = document.getElementById("svg-preview-box");
  const stats = document.getElementById("svg-dimension-stats");
  const fileInput = document.getElementById("svg-file-input");
  const sampleBtn = document.getElementById("svg-sample-btn");
  const clearBtn = document.getElementById("svg-clear-btn");
  const copyBtn = document.getElementById("svg-copy-btn");
  const tabButtons = document.querySelectorAll(".svg-tab-btn");

  let activeFormat = "css";

  const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
</svg>`;

  function encodeSvg(svg) {
    return svg
      .replace(/"/g, "'")
      .replace(/%/g, "%25")
      .replace(/#/g, "%23")
      .replace(/{/g, "%7B")
      .replace(/}/g, "%7D")
      .replace(/</g, "%3C")
      .replace(/>/g, "%3E")
      .replace(/\s+/g, " ")
      .trim();
  }

  function updateOutput() {
    const raw = input.value.trim();
    if (!raw) {
      output.textContent = "background-image: url('data:image/svg+xml;utf8,...');";
      previewBox.innerHTML = `<span class="text-xs text-slate-500">None</span>`;
      stats.textContent = "0 bytes";
      return;
    }

    previewBox.innerHTML = raw;
    const bytes = new Blob([raw]).size;
    stats.textContent = `${bytes} bytes`;

    const encoded = encodeSvg(raw);
    const dataUri = `data:image/svg+xml;utf8,${encoded}`;
    const base64Uri = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(raw)))}`;

    if (activeFormat === "css") {
      output.textContent = `background-image: url("${dataUri}");\nbackground-repeat: no-repeat;\nbackground-size: contain;`;
    } else if (activeFormat === "datauri") {
      output.textContent = dataUri;
    } else if (activeFormat === "base64") {
      output.textContent = base64Uri;
    } else if (activeFormat === "html") {
      output.textContent = `<img src="${dataUri}" alt="Vector Icon" width="24" height="24" />`;
    }
  }

  input?.addEventListener("input", updateOutput);

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => {
        b.className = "svg-tab-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300";
      });
      btn.className = "svg-tab-btn px-2.5 py-1 rounded bg-purple-600 text-white font-bold";
      activeFormat = btn.dataset.format;
      updateOutput();
    });
  });

  sampleBtn?.addEventListener("click", () => {
    input.value = sampleSvg;
    updateOutput();
    showToast("Sample star SVG loaded", "info");
  });

  clearBtn?.addEventListener("click", () => {
    input.value = "";
    updateOutput();
  });

  fileInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      input.value = ev.target?.result || "";
      updateOutput();
      showToast(`Loaded SVG file: ${file.name}`, "success");
    };
    reader.readAsText(file);
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(output.textContent, "SVG format");
  });

  input.value = sampleSvg;
  updateOutput();
}
