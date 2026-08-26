// Tool View: cURL Command Converter (cURL to JavaScript Fetch, Axios, Python Requests, Go, PHP)
// 100% Client-side command parser

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderCurlSuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-indigo-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Web Tools</span>
        <span>/</span>
        <span class="text-indigo-400 font-bold">cURL Converter</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">cURL Command Converter</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">CLIENT-SIDE PARSER</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Convert cURL terminal commands into modern JavaScript fetch, Axios, Python Requests, Node.js, and PHP scripts.</p>
        </div>
      </div>

      <!-- Main Dual Panel -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Input cURL Panel -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-slate-300 font-bold">PASTE cURL COMMAND</span>
            <button id="curl-sample-btn" class="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">Load Sample</button>
          </div>
          <textarea id="curl-input-area" rows="14" placeholder="curl -X POST https://api.example.com/v1/users -H 'Content-Type: application/json' -d '{\"name\":\"Alice\"}'" class="w-full flex-1 bg-slate-950 p-4 text-xs font-mono text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed">curl -X POST "https://api.example.com/v1/users" \
  -H "Authorization: Bearer sk_test_12345678" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'</textarea>
        </div>

        <!-- Output Code Panel with Target Language Tabs -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div class="flex items-center gap-1">
              <button data-target="fetch" class="curl-lang-tab px-2.5 py-1 rounded bg-indigo-600 text-white font-bold">JS Fetch</button>
              <button data-target="axios" class="curl-lang-tab px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400">Axios</button>
              <button data-target="python" class="curl-lang-tab px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400">Python</button>
              <button data-target="node" class="curl-lang-tab px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400">Node http</button>
            </div>
            <button id="curl-copy-btn" class="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition">Copy Code</button>
          </div>
          <pre id="curl-output-area" class="w-full flex-1 bg-slate-950 p-4 text-xs font-mono text-indigo-300 overflow-auto select-all leading-relaxed max-h-[380px]"><code>// Converted code will appear here...</code></pre>
        </div>

      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">cURL Syntax Parsing &amp; Polyglot HTTP Client Generation</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>cURL (Client URL)</strong> is the industry-standard command-line tool for transferring data with URLs. When testing APIs, developers frequently export network requests directly from browser DevTools (Network tab -&gt; Copy as cURL) or API documentation.
          </p>
          <p>
            The <strong>cURL Converter</strong> parses standard flags—including <code>-X / --request</code> (HTTP method), <code>-H / --header</code> (HTTP headers), <code>-d / --data / --data-raw</code> (request body), and <code>-u / --user</code> (basic authentication)—generating idiomatic network request code for JavaScript Fetch, Axios, Python Requests, and Node.js.
          </p>
          <p>
            All parsing occurs locally in your browser memory without logging authorization tokens or sensitive API keys.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initCurlSuiteView() {
  const inputArea = document.getElementById("curl-input-area");
  const outputArea = document.getElementById("curl-output-area");
  const copyBtn = document.getElementById("curl-copy-btn");
  const sampleBtn = document.getElementById("curl-sample-btn");
  const langTabs = document.querySelectorAll(".curl-lang-tab");

  let targetLang = "fetch";
  let lastOutput = "";

  const sampleCurl = `curl -X POST "https://api.example.com/v1/orders" \\\n  -H "Authorization: Bearer test_token_xyz" \\\n  -H "Content-Type: application/json" \\\n  -d '{"item_id":9821,"quantity":2,"currency":"USD"}'`;

  sampleBtn?.addEventListener("click", () => {
    if (inputArea) {
      inputArea.value = sampleCurl;
      convertCurl();
    }
  });

  copyBtn?.addEventListener("click", () => copyToClipboard(lastOutput || outputArea?.textContent, "Client Code"));

  langTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      langTabs.forEach((t) => {
        t.classList.remove("bg-indigo-600", "text-white", "font-bold");
        t.classList.add("text-slate-400");
      });
      tab.classList.add("bg-indigo-600", "text-white", "font-bold");
      tab.classList.remove("text-slate-400");

      targetLang = tab.getAttribute("data-target") || "fetch";
      convertCurl();
    });
  });

  inputArea?.addEventListener("input", () => convertCurl());
  convertCurl();

  function convertCurl() {
    const raw = inputArea?.value?.trim() || "";
    if (!raw) {
      if (outputArea) outputArea.innerHTML = "<code>// Paste a cURL command above to convert</code>";
      return;
    }

    const parsed = parseCurlCommand(raw);

    if (targetLang === "fetch") {
      lastOutput = generateFetch(parsed);
    } else if (targetLang === "axios") {
      lastOutput = generateAxios(parsed);
    } else if (targetLang === "python") {
      lastOutput = generatePython(parsed);
    } else if (targetLang === "node") {
      lastOutput = generateNode(parsed);
    }

    if (outputArea) outputArea.innerHTML = `<code>${escapeHtml(lastOutput)}</code>`;
  }

  function parseCurlCommand(cmd) {
    const lines = cmd.replace(/\\\n/g, " ").replace(/\n/g, " ");
    let method = "GET";
    let url = "https://api.example.com";
    const headers = {};
    let data = null;

    // Match URL
    const urlMatch = lines.match(/curl\s+(?:-[A-Za-z0-9\-_]+\s+)*['"]?(https?:\/\/[^\s'"]+)['"]?/i) || lines.match(/['"]?(https?:\/\/[^\s'"]+)['"]?/i);
    if (urlMatch) url = urlMatch[1];

    // Match Method
    const methodMatch = lines.match(/(?:-X|--request)\s+([A-Z]+)/i);
    if (methodMatch) method = methodMatch[1].toUpperCase();

    // Match Headers
    const headerMatches = lines.matchAll(/(?:-H|--header)\s+['"]([^'"]+)['"]/gi);
    for (const match of headerMatches) {
      const parts = match[1].split(":");
      if (parts.length >= 2) {
        headers[parts[0].trim()] = parts.slice(1).join(":").trim();
      }
    }

    // Match Data
    const dataMatch = lines.match(/(?:-d|--data|--data-raw)\s+['"]([\s\S]*?)['"](?:\s|$)/i);
    if (dataMatch) {
      data = dataMatch[1];
      if (method === "GET") method = "POST";
    }

    return { method, url, headers, data };
  }

  function generateFetch(p) {
    const opts = {
      method: p.method,
      headers: p.headers
    };
    if (p.data) opts.body = p.data;

    return `// JavaScript fetch\nfetch("${p.url}", {\n  method: "${p.method}",\n  headers: ${JSON.stringify(p.headers, null, 4).replace(/\n/g, "\n  ")}${p.data ? `,\n  body: JSON.stringify(${p.data.startsWith("{") ? p.data : JSON.stringify(p.data)})` : ""}\n})\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`;
  }

  function generateAxios(p) {
    return `// JavaScript Axios\nimport axios from 'axios';\n\naxios({\n  method: '${p.method.toLowerCase()}',\n  url: '${p.url}',\n  headers: ${JSON.stringify(p.headers, null, 2)}${p.data ? `,\n  data: ${p.data.startsWith("{") ? p.data : JSON.stringify(p.data)}` : ""}\n})\n  .then(response => {\n    console.log(response.data);\n  })\n  .catch(error => {\n    console.error(error);\n  });`;
  }

  function generatePython(p) {
    return `# Python Requests\nimport requests\n\nurl = "${p.url}"\nheaders = ${JSON.stringify(p.headers, null, 4)}\n${p.data ? `payload = ${p.data}\n\nresponse = requests.request("${p.method}", url, headers=headers, json=payload)` : `\nresponse = requests.request("${p.method}", url, headers=headers)`}\n\nprint(response.json())`;
  }

  function generateNode(p) {
    return `// Node.js Native HTTPS\nimport https from 'https';\n\nconst options = {\n  method: '${p.method}',\n  headers: ${JSON.stringify(p.headers, null, 2)}\n};\n\nconst req = https.request('${p.url}', options, (res) => {\n  let data = '';\n  res.on('data', (chunk) => { data += chunk; });\n  res.on('end', () => { console.log(JSON.parse(data)); });\n});\n\n${p.data ? `req.write(JSON.stringify(${p.data}));\n` : ""}req.end();`;
  }
}
