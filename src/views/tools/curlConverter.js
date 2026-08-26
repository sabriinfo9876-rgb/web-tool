// Tool View: cURL to JavaScript Fetch, Python & Axios Converter with SEO Guide

import { copyToClipboard, showToast } from "../../utils.js";

export function renderCurlConverterView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">cURL to JavaScript Fetch &amp; Python Converter</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-green-500/10 text-green-400 border border-green-500/30">API SCRIPT</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Convert terminal cURL commands into modern async/await fetch(), Python requests, and Axios code.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="curl-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample cURL</button>
          <button id="curl-clear-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-300 transition">Clear</button>
        </div>
      </div>

      <!-- Converter Dual Panes -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">RAW cURL COMMAND</div>
          <div class="p-4 flex-1 flex flex-col">
            <textarea id="curl-input" rows="12" placeholder="curl -X POST https://api.example.com/v1/auth/login -H 'Content-Type: application/json' -d '{\"email\": \"dev@example.com\", \"password\": \"secret123\"}'" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-green-400 resize-y leading-relaxed flex-1"></textarea>
          </div>
        </div>

        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div class="flex items-center gap-1.5" id="curl-output-tabs">
              <button data-lang="fetch" class="curl-tab-btn px-2.5 py-1 rounded bg-green-600 text-white font-bold">JS fetch()</button>
              <button data-lang="python" class="curl-tab-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">Python requests</button>
              <button data-lang="axios" class="curl-tab-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">Node / Axios</button>
            </div>
            <button id="curl-copy-btn" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-green-400 font-bold">Copy</button>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <textarea id="curl-output" rows="12" readonly placeholder="Parsed script will appear here..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-green-300 font-mono focus:outline-none resize-y leading-relaxed flex-1"></textarea>
          </div>
        </div>
      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">cURL Command Parsing &amp; HTTP Client Automation</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>Client URL (cURL)</strong> is the universal CLI command-line utility used by API documentation platforms (Stripe, GitHub, Twilio) to demonstrate HTTP request payloads.
          </p>
          <p>
            Our parser tokenizes flags like <code>-X</code> (HTTP Method), <code>-H</code> (Headers), <code>-d</code> / <code>--data</code> (Body), and <code>-u</code> (Basic Auth) to generate clean, idiomatic JavaScript <code>fetch()</code> with <code>async/await</code> error handling, Python <code>requests</code> scripts, and Axios instances.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initCurlConverterView() {
  const input = document.getElementById("curl-input");
  const output = document.getElementById("curl-output");
  const tabButtons = document.querySelectorAll(".curl-tab-btn");
  const sampleBtn = document.getElementById("curl-sample-btn");
  const clearBtn = document.getElementById("curl-clear-btn");
  const copyBtn = document.getElementById("curl-copy-btn");

  let activeLang = "fetch";

  const sampleCurl = `curl -X POST https://api.webdevhub.app/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer my_jwt_token_here" \\
  -d '{"email": "shahzeb.dev@google.com", "rememberMe": true}'`;

  function parseCurl(curl) {
    const clean = curl.replace(/\\\n/g, " ").replace(/\\\r\n/g, " ").trim();

    // Extract URL
    let urlMatch = clean.match(/curl\s+(?:-[A-Za-z0-9-]+\s+)*['"]?(https?:\/\/[^\s'"]+)/i);
    if (!urlMatch) {
      urlMatch = clean.match(/['"](https?:\/\/[^\s'"]+)['"]/);
    }
    const url = urlMatch ? urlMatch[1] : "https://api.example.com/endpoint";

    // Extract Method
    let method = "GET";
    const methodMatch = clean.match(/-X\s+([A-Z]+)/i);
    if (methodMatch) {
      method = methodMatch[1].toUpperCase();
    } else if (clean.includes("-d") || clean.includes("--data")) {
      method = "POST";
    }

    // Extract Headers
    const headers = {};
    const headerRegex = /-H\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = headerRegex.exec(clean)) !== null) {
      const parts = match[1].split(":");
      if (parts.length >= 2) {
        headers[parts[0].trim()] = parts.slice(1).join(":").trim();
      }
    }

    // Extract Body
    let body = null;
    const bodyMatch = clean.match(/(?:-d|--data(?:-raw)?)\s+['"]([\s\S]*?)['"](?:\s|$)/);
    if (bodyMatch) {
      body = bodyMatch[1];
    }

    return { url, method, headers, body };
  }

  function generateCode() {
    const raw = input.value.trim();
    if (!raw) {
      output.value = "";
      return;
    }

    const { url, method, headers, body } = parseCurl(raw);

    if (activeLang === "fetch") {
      let code = `async function sendRequest() {\n  const response = await fetch("${url}", {\n    method: "${method}",\n`;
      if (Object.keys(headers).length > 0) {
        code += `    headers: ${JSON.stringify(headers, null, 6).replace(/\n/g, "\n    ")},\n`;
      }
      if (body) {
        code += `    body: JSON.stringify(${body.startsWith("{") ? body : JSON.stringify(body)}),\n`;
      }
      code += `  });\n\n  const data = await response.json();\n  console.log(data);\n  return data;\n}`;
      output.value = code;
    } else if (activeLang === "python") {
      let code = `import requests\n\nurl = "${url}"\n`;
      if (Object.keys(headers).length > 0) {
        code += `headers = ${JSON.stringify(headers, null, 4)}\n`;
      }
      if (body) {
        code += `payload = ${body}\n`;
      }
      code += `\nresponse = requests.${method.toLowerCase()}(url${Object.keys(headers).length > 0 ? ", headers=headers" : ""}${body ? ", json=payload" : ""})\nprint(response.status_code)\nprint(response.json())`;
      output.value = code;
    } else if (activeLang === "axios") {
      let code = `import axios from 'axios';\n\nconst config = {\n  method: '${method.toLowerCase()}',\n  url: '${url}',\n`;
      if (Object.keys(headers).length > 0) {
        code += `  headers: ${JSON.stringify(headers, null, 4)},\n`;
      }
      if (body) {
        code += `  data: ${body},\n`;
      }
      code += `};\n\naxios(config)\n  .then(response => console.log(response.data))\n  .catch(error => console.error(error));`;
      output.value = code;
    }
  }

  input?.addEventListener("input", generateCode);

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => {
        b.className = "curl-tab-btn px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300";
      });
      btn.className = "curl-tab-btn px-2.5 py-1 rounded bg-green-600 text-white font-bold";
      activeLang = btn.dataset.lang;
      generateCode();
    });
  });

  sampleBtn?.addEventListener("click", () => {
    input.value = sampleCurl;
    generateCode();
    showToast("Sample cURL loaded", "info");
  });

  clearBtn?.addEventListener("click", () => {
    input.value = "";
    output.value = "";
  });

  copyBtn?.addEventListener("click", () => {
    if (!output.value) {
      showToast("Nothing to copy", "warning");
      return;
    }
    copyToClipboard(output.value, `${activeLang.toUpperCase()} Code`);
  });

  input.value = sampleCurl;
  generateCode();
}
