// Tool View: API Tester (Client-side REST API Client & Request Builder)
// Supports GET, POST, PUT, PATCH, DELETE with custom Headers, Query Params, JSON Body, Latency timer & Response Viewer

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderApiTesterSuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-purple-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Web Tools</span>
        <span>/</span>
        <span class="text-purple-400 font-bold">API Tester</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">API Tester</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">REST CLIENT</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Send HTTP requests, customize headers and JSON body payloads, inspect response bodies, and measure round-trip latency.</p>
        </div>
      </div>

      <!-- Request Address Bar -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-4 space-y-3">
        <div class="flex flex-col sm:flex-row gap-2.5">
          <select id="api-method-select" class="w-full sm:w-28 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-purple-300 font-mono font-bold focus:outline-none focus:border-purple-400 shrink-0">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input type="text" id="api-url-input" value="https://jsonplaceholder.typicode.com/posts/1" placeholder="https://api.example.com/v1/resource..." class="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-purple-400" />
          <button id="api-send-btn" class="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 shrink-0">
            <svg class="w-4 h-4 animate-spin hidden" id="api-spinner" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span>Send Request</span>
          </button>
        </div>
      </div>

      <!-- Request Details & Response Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Request Parameters / Body Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center gap-2 text-xs font-mono">
            <button id="api-tab-headers" class="px-3 py-1 rounded bg-purple-600 text-white font-bold">Headers</button>
            <button id="api-tab-body" class="px-3 py-1 rounded hover:bg-slate-800 text-slate-400">JSON Body</button>
          </div>

          <div class="p-4 flex-1 flex flex-col">
            <!-- Headers Editor -->
            <div id="api-headers-pane" class="space-y-2 flex-1 flex flex-col">
              <label class="text-[11px] font-mono text-slate-400">Custom Headers (JSON Object format):</label>
              <textarea id="api-headers-input" rows="10" class="w-full flex-1 bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-purple-300 font-mono focus:outline-none leading-relaxed">{\n  "Accept": "application/json"\n}</textarea>
            </div>

            <!-- Body Editor -->
            <div id="api-body-pane" class="hidden space-y-2 flex-1 flex flex-col">
              <label class="text-[11px] font-mono text-slate-400">JSON Request Body:</label>
              <textarea id="api-body-input" rows="10" class="w-full flex-1 bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-purple-300 font-mono focus:outline-none leading-relaxed">{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}</textarea>
            </div>
          </div>
        </div>

        <!-- Response Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div class="flex items-center gap-2">
              <span class="text-purple-400 font-bold">RESPONSE</span>
              <span id="api-resp-status" class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">Ready</span>
              <span id="api-resp-time" class="text-slate-500 text-[11px]">0 ms</span>
            </div>
            <button id="api-copy-resp" class="text-slate-400 hover:text-white text-xs font-semibold">Copy</button>
          </div>
          <pre id="api-resp-area" class="p-4 bg-slate-950 flex-1 text-xs font-mono text-purple-300 overflow-auto select-all leading-relaxed max-h-[380px]"><code>// Response payload will appear here...</code></pre>
        </div>

      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">REST API Architecture: HTTP Methods, Status Codes, and CORS Policies</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            RESTful web APIs leverage HTTP verbs to perform CRUD (Create, Read, Update, Delete) operations:
            <code>GET</code> retrieves resources without side effects; <code>POST</code> creates new entities; <code>PUT</code> replaces entire resources; <code>PATCH</code> applies partial delta modifications; and <code>DELETE</code> removes entities.
          </p>
          <p>
            When issuing requests directly from a client browser, requests across different origins are subject to the browser's <strong>Cross-Origin Resource Sharing (CORS)</strong> security policy. If the target server does not include the <code>Access-Control-Allow-Origin</code> header in its response, modern web browsers will block access to the response body.
          </p>
          <p>
            Our in-browser <strong>API Tester</strong> provides transparent latency monitoring and formatted JSON viewing for development and staging endpoints.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initApiTesterSuiteView() {
  const methodSelect = document.getElementById("api-method-select");
  const urlInput = document.getElementById("api-url-input");
  const sendBtn = document.getElementById("api-send-btn");
  const spinner = document.getElementById("api-spinner");
  const headersInput = document.getElementById("api-headers-input");
  const bodyInput = document.getElementById("api-body-input");
  const respArea = document.getElementById("api-resp-area");
  const respStatus = document.getElementById("api-resp-status");
  const respTime = document.getElementById("api-resp-time");
  const copyBtn = document.getElementById("api-copy-resp");

  const tabHeaders = document.getElementById("api-tab-headers");
  const tabBody = document.getElementById("api-tab-body");
  const headersPane = document.getElementById("api-headers-pane");
  const bodyPane = document.getElementById("api-body-pane");

  tabHeaders?.addEventListener("click", () => {
    tabHeaders.className = "px-3 py-1 rounded bg-purple-600 text-white font-bold";
    if (tabBody) tabBody.className = "px-3 py-1 rounded hover:bg-slate-800 text-slate-400";
    headersPane?.classList.remove("hidden");
    bodyPane?.classList.add("hidden");
  });

  tabBody?.addEventListener("click", () => {
    tabBody.className = "px-3 py-1 rounded bg-purple-600 text-white font-bold";
    if (tabHeaders) tabHeaders.className = "px-3 py-1 rounded hover:bg-slate-800 text-slate-400";
    bodyPane?.classList.remove("hidden");
    headersPane?.classList.add("hidden");
  });

  copyBtn?.addEventListener("click", () => copyToClipboard(respArea?.textContent, "API Response"));

  sendBtn?.addEventListener("click", async () => {
    const url = urlInput?.value?.trim();
    if (!url) return showToast("Please enter an API URL", "warning");

    const method = methodSelect?.value || "GET";
    let headers = {};
    try {
      headers = JSON.parse(headersInput?.value || "{}");
    } catch {
      return showToast("Invalid JSON format in Headers", "error");
    }

    let body = undefined;
    if (method !== "GET" && method !== "HEAD") {
      const rawBody = bodyInput?.value?.trim();
      if (rawBody) {
        body = rawBody;
        if (!headers["Content-Type"]) headers["Content-Type"] = "application/json";
      }
    }

    if (spinner) spinner.classList.remove("hidden");
    const startTime = performance.now();

    try {
      showToast(`Sending ${method} request...`, "info");
      const res = await fetch(url, { method, headers, body });
      const duration = Math.round(performance.now() - startTime);

      if (respTime) respTime.textContent = `${duration} ms`;
      if (respStatus) {
        respStatus.textContent = `${res.status} ${res.statusText || ""}`;
        respStatus.className = res.ok ? "px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold" : "px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-400 font-bold";
      }

      const text = await res.text();
      try {
        const json = JSON.parse(text);
        if (respArea) respArea.innerHTML = `<code>${escapeHtml(JSON.stringify(json, null, 2))}</code>`;
      } catch {
        if (respArea) respArea.innerHTML = `<code>${escapeHtml(text)}</code>`;
      }

      showToast(`Received response (${res.status}) in ${duration}ms`, res.ok ? "success" : "warning");
    } catch (err) {
      if (respStatus) {
        respStatus.textContent = "Network / CORS Error";
        respStatus.className = "px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-400 font-bold";
      }
      if (respArea) respArea.innerHTML = `<code class="text-rose-400">Failed to fetch: ${escapeHtml(err.message)}\n\nNote: If requesting external APIs from the browser, ensure the remote server has CORS (Access-Control-Allow-Origin) enabled.</code>`;
      showToast("Request failed: " + err.message, "error");
    } finally {
      if (spinner) spinner.classList.add("hidden");
    }
  });
}
