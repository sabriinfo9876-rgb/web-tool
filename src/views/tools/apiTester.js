// Tool View: Quick API Tester & HTTP Endpoint Sandbox with Latency Timing & SEO Guide

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderApiTesterView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Quick REST API Tester &amp; HTTP Inspector</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">CLIENT HTTP</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Send lightweight GET, POST, PUT, DELETE requests directly from browser with header customization, latency metric, and JSON payload viewer.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="api-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample API</button>
        </div>
      </div>

      <!-- Request Bar -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <select id="api-method" class="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-mono font-bold text-blue-400 focus:outline-none shrink-0">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
          <input type="text" id="api-url" value="https://jsonplaceholder.typicode.com/todos/1" placeholder="https://api.example.com/v1/resource" class="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-400" />
          <button id="api-send-btn" class="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            <span>Send Request</span>
          </button>
        </div>

        <!-- Request Headers & Body Collapsible Tabs -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
          <div>
            <label class="block font-mono text-slate-400 mb-1">Custom Headers (JSON)</label>
            <textarea id="api-headers" rows="3" placeholder='{"Content-Type": "application/json"}' class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2.5 text-xs text-slate-300 font-mono focus:outline-none">{"Accept": "application/json"}</textarea>
          </div>
          <div>
            <label class="block font-mono text-slate-400 mb-1">Request Body (JSON for POST/PUT)</label>
            <textarea id="api-body" rows="3" placeholder='{"key": "value"}' class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2.5 text-xs text-slate-300 font-mono focus:outline-none"></textarea>
          </div>
        </div>
      </div>

      <!-- Response Status Banner & Response Viewer -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
        <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div class="flex items-center gap-3">
            <span>RESPONSE: <span id="api-res-status" class="font-bold text-slate-400">Idle</span></span>
            <span>LATENCY: <span id="api-res-time" class="font-bold text-blue-400">0 ms</span></span>
          </div>
          <button id="api-copy-res-btn" class="text-blue-400 hover:text-white font-bold">Copy Response JSON</button>
        </div>
        <div class="p-4">
          <pre class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-blue-300 font-mono overflow-auto max-h-[360px] select-all leading-relaxed"><code id="api-res-output">// Response data will appear here...</code></pre>
        </div>
      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">HTTP Networking, Cross-Origin Resource Sharing (CORS) &amp; Latency</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            When conducting client-side API requests via JavaScript <code>fetch()</code>, browsers enforce the <strong>Same-Origin Policy</strong> unless the target host sends an <code>Access-Control-Allow-Origin: *</code> CORS header.
          </p>
          <p>
            Our tool monitors request round-trip time (RTT) from DNS handshake to full packet consumption, helping engineers benchmark RESTful endpoint latency and status code anomalies (4xx client vs 5xx gateway faults).
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initApiTesterView() {
  const methodSelect = document.getElementById("api-method");
  const urlInput = document.getElementById("api-url");
  const headersInput = document.getElementById("api-headers");
  const bodyInput = document.getElementById("api-body");
  const sendBtn = document.getElementById("api-send-btn");
  const sampleBtn = document.getElementById("api-sample-btn");

  const resStatus = document.getElementById("api-res-status");
  const resTime = document.getElementById("api-res-time");
  const resOutput = document.getElementById("api-res-output");
  const copyResBtn = document.getElementById("api-copy-res-btn");

  async function sendRequest() {
    const method = methodSelect.value;
    const url = urlInput.value.trim();

    if (!url) {
      showToast("Please enter a target URL", "warning");
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";
    resStatus.className = "font-bold text-amber-400";
    resStatus.textContent = "Connecting...";
    resOutput.textContent = "// Request in flight...";

    const startTime = performance.now();

    try {
      let headers = {};
      if (headersInput.value.trim()) {
        try {
          headers = JSON.parse(headersInput.value);
        } catch {
          showToast("Invalid JSON in headers field", "error");
          sendBtn.disabled = false;
          sendBtn.textContent = "Send Request";
          return;
        }
      }

      const options = { method, headers };
      if (["POST", "PUT", "PATCH"].includes(method) && bodyInput.value.trim()) {
        options.body = bodyInput.value.trim();
      }

      const response = await fetch(url, options);
      const elapsed = Math.round(performance.now() - startTime);

      resTime.textContent = `${elapsed} ms`;
      const statusText = `${response.status} ${response.statusText}`;

      if (response.ok) {
        resStatus.className = "font-bold text-emerald-400";
      } else {
        resStatus.className = "font-bold text-rose-400";
      }
      resStatus.textContent = statusText;

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const jsonData = await response.json();
        resOutput.textContent = JSON.stringify(jsonData, null, 2);
      } else {
        const textData = await response.text();
        resOutput.textContent = textData;
      }

      showToast(`Request complete: ${statusText} (${elapsed}ms)`, "success");
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      resTime.textContent = `${elapsed} ms`;
      resStatus.className = "font-bold text-rose-400";
      resStatus.textContent = "Network Error (CORS / Unreachable)";
      resOutput.textContent = `Error: ${err.message}\n\nNote: If requesting a custom external server, make sure the server has CORS enabled ('Access-Control-Allow-Origin: *').`;
      showToast("Network / CORS error occurred", "error");
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send Request";
    }
  }

  sendBtn?.addEventListener("click", sendRequest);

  sampleBtn?.addEventListener("click", () => {
    methodSelect.value = "GET";
    urlInput.value = "https://jsonplaceholder.typicode.com/todos/1";
    headersInput.value = `{"Accept": "application/json"}`;
    bodyInput.value = "";
    sendRequest();
  });

  copyResBtn?.addEventListener("click", () => {
    if (!resOutput.textContent) {
      showToast("Nothing to copy", "warning");
      return;
    }
    copyToClipboard(resOutput.textContent, "API Response");
  });
}
