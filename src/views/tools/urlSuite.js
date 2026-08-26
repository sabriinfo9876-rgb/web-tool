// Tool View: URL Suite (URL Encoder, URL Decoder, URL Parser & Query Inspector)
// 100% Client-side URL parameters and components decomposition

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderUrlSuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-cyan-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Web Tools</span>
        <span>/</span>
        <span class="text-cyan-400 font-bold">URL Tools</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">URL Encoder, Decoder &amp; Parser</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">RFC 3986</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Encode URI components, decode percent-encoded strings, and parse complex query parameters into structured key-value tables.</p>
        </div>
      </div>

      <!-- Mode Selector -->
      <div class="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap text-xs font-mono">
        <button data-mode="parser" class="url-tab-btn px-3 py-1.5 rounded-xl bg-cyan-600 text-white font-bold transition">URL Parser &amp; Query Table</button>
        <button data-mode="encode" class="url-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">URL Encoder</button>
        <button data-mode="decode" class="url-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">URL Decoder</button>
      </div>

      <!-- Main Input Bar -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div>
          <label class="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">Input URL / URI String</label>
          <input type="text" id="url-input-field" value="https://api.example.com:8080/v2/products/search?category=laptops&sort=price_desc&in_stock=true#results" placeholder="https://domain.com/path?param=value..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400" />
        </div>
      </div>

      <!-- Parser View: Components Breakdown Table & Query Params -->
      <div id="url-parser-view" class="space-y-5">
        
        <!-- Component Summary Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div class="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
            <span class="text-[10px] text-slate-400 uppercase">Protocol</span>
            <div id="url-part-protocol" class="text-sm font-bold text-white mt-1 truncate">https:</div>
          </div>
          <div class="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
            <span class="text-[10px] text-slate-400 uppercase">Hostname</span>
            <div id="url-part-host" class="text-sm font-bold text-cyan-400 mt-1 truncate">api.example.com</div>
          </div>
          <div class="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
            <span class="text-[10px] text-slate-400 uppercase">Port</span>
            <div id="url-part-port" class="text-sm font-bold text-amber-400 mt-1 truncate">8080</div>
          </div>
          <div class="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
            <span class="text-[10px] text-slate-400 uppercase">Pathname</span>
            <div id="url-part-path" class="text-sm font-bold text-indigo-400 mt-1 truncate">/v2/products/search</div>
          </div>
        </div>

        <!-- Query Parameters Key-Value Table -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-cyan-400 font-bold">QUERY PARAMETERS (SEARCH PARAMS)</span>
            <span id="url-params-count" class="text-slate-500 text-[11px]">3 parameters</span>
          </div>
          <div class="p-4 overflow-x-auto">
            <table class="w-full text-left text-xs font-mono">
              <thead>
                <tr class="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th class="py-2 px-3">Key (Parameter)</th>
                  <th class="py-2 px-3">Decoded Value</th>
                  <th class="py-2 px-3">Action</th>
                </tr>
              </thead>
              <tbody id="url-params-table-body" class="divide-y divide-slate-800/60 text-slate-200">
                <!-- Populated dynamically -->
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Raw Encode / Decode Textarea View -->
      <div id="url-encode-view" class="hidden bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3">
        <div class="flex items-center justify-between text-xs font-mono">
          <span class="text-cyan-400 font-bold" id="url-encode-label">ENCODED RESULT</span>
          <button id="url-copy-raw-btn" class="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition">Copy Text</button>
        </div>
        <textarea id="url-encode-output" rows="6" readonly class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-cyan-300 font-mono focus:outline-none"></textarea>
      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">URI Component Encoding, Percent-Encoding, and Query Parsing</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Under the Uniform Resource Identifier (URI) generic syntax defined in RFC 3986, characters outside the unreserved set (<code>A-Z</code>, <code>a-z</code>, <code>0-9</code>, <code>-</code>, <code>_</code>, <code>.</code>, <code>~</code>) must be percent-encoded before transmission over HTTP.
          </p>
          <p>
            The difference between JavaScript's <code>encodeURI()</code> and <code>encodeURIComponent()</code> is critical: <code>encodeURI()</code> preserves protocol delimiters and slashes (such as <code>http://</code> and <code>/path</code>), while <code>encodeURIComponent()</code> aggressively escapes delimiters (converting <code>/</code> to <code>%2F</code> and <code>?</code> to <code>%3F</code>), making it suitable for query parameter values.
          </p>
          <p>
            The <strong>URL Parser</strong> breaks complete URIs into their constituent parts—Scheme, Authority, Hostname, Port, Pathname, Search Params, and Hash Fragment—ensuring error-free API payload inspection.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initUrlSuiteView() {
  const inputField = document.getElementById("url-input-field");
  const parserView = document.getElementById("url-parser-view");
  const encodeView = document.getElementById("url-encode-view");
  const encodeOutput = document.getElementById("url-encode-output");
  const encodeLabel = document.getElementById("url-encode-label");
  const copyRawBtn = document.getElementById("url-copy-raw-btn");
  const tabBtns = document.querySelectorAll(".url-tab-btn");

  const partProtocol = document.getElementById("url-part-protocol");
  const partHost = document.getElementById("url-part-host");
  const partPort = document.getElementById("url-part-port");
  const partPath = document.getElementById("url-part-path");
  const paramsCount = document.getElementById("url-params-count");
  const tableBody = document.getElementById("url-params-table-body");

  let currentMode = "parser";

  copyRawBtn?.addEventListener("click", () => {
    copyToClipboard(encodeOutput?.value, "URL Text");
  });

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => {
        b.classList.remove("bg-cyan-600", "text-white", "font-bold");
        b.classList.add("text-slate-300");
      });
      btn.classList.add("bg-cyan-600", "text-white", "font-bold");
      btn.classList.remove("text-slate-300");

      currentMode = btn.getAttribute("data-mode") || "parser";
      processUrl();
    });
  });

  inputField?.addEventListener("input", () => processUrl());
  processUrl();

  function processUrl() {
    const raw = inputField?.value?.trim() || "";

    if (currentMode === "encode") {
      parserView?.classList.add("hidden");
      encodeView?.classList.remove("hidden");
      if (encodeLabel) encodeLabel.textContent = "ENCODED URI COMPONENT";
      if (encodeOutput) encodeOutput.value = encodeURIComponent(raw);
      return;
    }

    if (currentMode === "decode") {
      parserView?.classList.add("hidden");
      encodeView?.classList.remove("hidden");
      if (encodeLabel) encodeLabel.textContent = "DECODED URI STRING";
      try {
        if (encodeOutput) encodeOutput.value = decodeURIComponent(raw);
      } catch {
        if (encodeOutput) encodeOutput.value = raw;
      }
      return;
    }

    // Parser mode
    parserView?.classList.remove("hidden");
    encodeView?.classList.add("hidden");

    try {
      const url = new URL(raw.startsWith("http") ? raw : "https://" + raw);

      if (partProtocol) partProtocol.textContent = url.protocol || "none";
      if (partHost) partHost.textContent = url.hostname || "none";
      if (partPort) partPort.textContent = url.port || "default (80/443)";
      if (partPath) partPath.textContent = url.pathname || "/";

      const params = Array.from(url.searchParams.entries());
      if (paramsCount) paramsCount.textContent = `${params.length} parameter${params.length === 1 ? "" : "s"}`;

      if (tableBody) {
        if (params.length === 0) {
          tableBody.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-slate-500">No query parameters found in URL.</td></tr>`;
        } else {
          tableBody.innerHTML = params
            .map(([k, v]) => `
              <tr class="hover:bg-slate-800/40">
                <td class="py-2.5 px-3 text-cyan-300 font-bold">${escapeHtml(k)}</td>
                <td class="py-2.5 px-3 text-slate-300 break-all">${escapeHtml(v)}</td>
                <td class="py-2.5 px-3">
                  <button class="text-xs text-slate-400 hover:text-white copy-param-btn" data-val="${escapeHtml(v)}">Copy</button>
                </td>
              </tr>
            `)
            .join("");

          tableBody.querySelectorAll(".copy-param-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
              copyToClipboard(btn.getAttribute("data-val") || "", "Parameter Value");
            });
          });
        }
      }
    } catch {
      if (tableBody) {
        tableBody.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-rose-400">Invalid URL format. Please include protocol e.g. https://...</td></tr>`;
      }
    }
  }
}
