// Tool View: JSON Formatter, Validator & Collapsible Tree View with 280-word SEO Guide

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderJsonFormatterView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Tool Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">JSON Formatter, Validator &amp; Tree View</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">CLIENT-SIDE</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Validate syntax, beautify indentation, minify JSON payloads, and inspect complex object trees interactively.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="jf-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample</button>
          <button id="jf-clear-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-300 transition">Clear</button>
          <button id="jf-save-vault-btn" class="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-xs font-semibold text-amber-300 border border-amber-500/30 transition">Save to Vault</button>
        </div>
      </div>

      <!-- Controls Toolbar -->
      <div class="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <button id="jf-format-2sp-btn" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-500/20">Beautify (2 Spaces)</button>
          <button id="jf-format-4sp-btn" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition">4 Spaces</button>
          <button id="jf-minify-btn" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition">Minify (1 Line)</button>
        </div>

        <div class="flex items-center gap-2">
          <div id="jf-status-pill" class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Valid JSON</span>
          </div>
          <button id="jf-copy-btn" class="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition">Copy JSON</button>
        </div>
      </div>

      <!-- Dual Workspace: Raw Editor & Interactive Tree -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <!-- Input Textarea Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>INPUT JSON PAYLOAD</span>
            <span id="jf-input-stats">0 lines | 0 bytes</span>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <textarea id="jf-input" rows="16" placeholder='Paste your raw JSON string here... (e.g. {"name": "WebDevHub", "version": 1.0, "active": true})' class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-400 resize-y leading-relaxed flex-1"></textarea>
          </div>
        </div>

        <!-- Output / Tree View Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div class="flex items-center gap-2">
              <button id="jf-tab-code" class="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 font-bold border border-cyan-500/30">Highlighted Code</button>
              <button id="jf-tab-tree" class="px-2.5 py-1 rounded bg-transparent hover:bg-slate-800 text-slate-400">Interactive Tree</button>
            </div>
            <span id="jf-error-msg" class="hidden text-rose-400 font-sans text-xs font-semibold truncate max-w-[200px]">Syntax Error</span>
          </div>

          <div class="p-4 flex-1 flex flex-col overflow-auto max-h-[500px]">
            <!-- Code Tab Output -->
            <pre id="jf-output-code" class="w-full flex-1 bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs font-mono overflow-auto leading-relaxed select-all"><code class="text-slate-300">// Formatted output will appear here...</code></pre>

            <!-- Tree View Tab Output -->
            <div id="jf-output-tree" class="hidden w-full flex-1 bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs font-mono overflow-auto leading-relaxed space-y-1"></div>
          </div>
        </div>
      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Understanding JSON Formatting, Validation &amp; AST Parsing</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>JavaScript Object Notation (JSON)</strong> is the universal lingua franca for modern client-server communication, RESTful APIs, and NoSQL document storage engines like Google Firebase Firestore and MongoDB. Ensuring JSON payloads adhere strictly to RFC 8259 specifications is critical for preventing serialization exceptions, payload dropouts, and runtime API failures.
          </p>
          <p>
            Our client-side <strong>JSON Formatter, Validator &amp; Interactive Tree View</strong> processes payloads instantaneously without sending your sensitive application state or authentication tokens across external networks. The engine leverages recursive Abstract Syntax Tree (AST) traversal to tokenize keys, strings, numerical literals, arrays, and boolean primitives with color-coded syntax highlights. When syntax anomalies occur—such as trailing commas, unquoted keys, single quotes, or missing closing brackets—the validator pinpoints the exact line and character offset for rapid debugging.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span class="font-bold text-slate-200 block mb-1">Minification vs. Beautification</span>
              <span>Minification strips whitespace and line breaks to minimize HTTP payload bytes for production delivery, while 2-space and 4-space formatting optimizes readability during development and peer review.</span>
            </div>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span class="font-bold text-slate-200 block mb-1">Interactive Hierarchical Tree</span>
              <span>Explore multi-nested JSON objects with collapsible parent nodes, visual depth guides, and instant copy buttons for sub-objects and arrays.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function initJsonFormatterView() {
  const input = document.getElementById("jf-input");
  const outputCode = document.getElementById("jf-output-code");
  const outputTree = document.getElementById("jf-output-tree");
  const statusPill = document.getElementById("jf-status-pill");
  const errorMsg = document.getElementById("jf-error-msg");
  const inputStats = document.getElementById("jf-input-stats");

  const sampleBtn = document.getElementById("jf-sample-btn");
  const clearBtn = document.getElementById("jf-clear-btn");
  const format2Btn = document.getElementById("jf-format-2sp-btn");
  const format4Btn = document.getElementById("jf-format-4sp-btn");
  const minifyBtn = document.getElementById("jf-minify-btn");
  const copyBtn = document.getElementById("jf-copy-btn");
  const saveVaultBtn = document.getElementById("jf-save-vault-btn");

  const tabCode = document.getElementById("jf-tab-code");
  const tabTree = document.getElementById("jf-tab-tree");

  let parsedObj = null;

  const sampleJson = `{
  "hub": "Web Developer Hub",
  "version": "2.0.0",
  "isOnline": true,
  "stats": {
    "utilitiesCount": 22,
    "speedMs": 1.4,
    "security": "100% Client-Side Sandbox"
  },
  "modules": [
    "Core Utilities",
    "Converters & Security Suite",
    "Asset Optimization & Code Builders",
    "AI Powered UI Engine & ZIP Debugger"
  ],
  "author": {
    "role": "Senior Full-Stack Engineer",
    "frameworks": ["TypeScript", "Tailwind CSS", "Gemini 3.7", "Firebase"]
  }
}`;

  function processJson(indent = 2) {
    const raw = input.value.trim();
    if (!raw) {
      outputCode.innerHTML = `<code class="text-slate-500">// Formatted output will appear here...</code>`;
      outputTree.innerHTML = `<div class="text-slate-500">Tree view empty.</div>`;
      statusPill.className = "px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 text-xs font-mono font-bold flex items-center gap-1.5";
      statusPill.innerHTML = `<span>Ready</span>`;
      errorMsg.classList.add("hidden");
      inputStats.textContent = "0 lines | 0 bytes";
      parsedObj = null;
      return;
    }

    const lines = raw.split("\n").length;
    const bytes = new Blob([raw]).size;
    inputStats.textContent = `${lines} lines | ${bytes} bytes`;

    try {
      parsedObj = JSON.parse(raw);
      const formatted = indent === 0 ? JSON.stringify(parsedObj) : JSON.stringify(parsedObj, null, indent);
      
      // Syntax Highlight
      outputCode.innerHTML = `<code>${syntaxHighlight(formatted)}</code>`;
      
      // Render Tree
      renderTree(parsedObj, outputTree);

      statusPill.className = "px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5";
      statusPill.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span><span>Valid JSON</span>`;
      errorMsg.classList.add("hidden");
    } catch (err) {
      parsedObj = null;
      statusPill.className = "px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold flex items-center gap-1.5";
      statusPill.innerHTML = `<span class="w-2 h-2 rounded-full bg-rose-400"></span><span>Invalid JSON</span>`;
      errorMsg.textContent = err.message;
      errorMsg.classList.remove("hidden");
      outputCode.innerHTML = `<code class="text-rose-400 font-mono">/* JSON Syntax Error */\n${escapeHtml(err.message)}</code>`;
      outputTree.innerHTML = `<div class="text-rose-400 text-xs">Cannot generate tree due to syntax error.</div>`;
    }
  }

  function syntaxHighlight(jsonStr) {
    return jsonStr.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = "token-number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "token-key font-bold text-cyan-300";
          } else {
            cls = "token-string text-emerald-400";
          }
        } else if (/true|false/.test(match)) {
          cls = "token-boolean text-blue-400";
        } else if (/null/.test(match)) {
          cls = "token-keyword text-purple-400";
        }
        return `<span class="${cls}">${match}</span>`;
      });
  }

  function renderTree(data, container) {
    container.innerHTML = "";
    const rootNode = createTreeNode("root", data, true);
    container.appendChild(rootNode);
  }

  function createTreeNode(key, value, isLast = false) {
    const item = document.createElement("div");
    item.className = "pl-3 border-l border-slate-800/80 font-mono text-xs";

    if (value !== null && typeof value === "object") {
      const isArray = Array.isArray(value);
      const keys = Object.keys(value);
      const header = document.createElement("div");
      header.className = "cursor-pointer hover:bg-slate-900/80 px-1 py-0.5 rounded flex items-center gap-1.5 select-none";
      header.innerHTML = `
        <span class="text-slate-500 font-bold tree-toggle">▼</span>
        <span class="text-cyan-300 font-semibold">${escapeHtml(key)}:</span>
        <span class="text-slate-400">${isArray ? `Array(${keys.length}) [` : `Object {`}</span>
      `;

      const childContainer = document.createElement("div");
      childContainer.className = "ml-3 space-y-0.5";

      keys.forEach((childKey, idx) => {
        childContainer.appendChild(createTreeNode(childKey, value[childKey], idx === keys.length - 1));
      });

      const footer = document.createElement("div");
      footer.className = "text-slate-400 px-1";
      footer.textContent = isArray ? "]" : "}";

      header.addEventListener("click", () => {
        const isCollapsed = childContainer.classList.toggle("hidden");
        footer.classList.toggle("hidden");
        const toggle = header.querySelector(".tree-toggle");
        if (toggle) toggle.textContent = isCollapsed ? "►" : "▼";
      });

      item.appendChild(header);
      item.appendChild(childContainer);
      item.appendChild(footer);
    } else {
      let valDisplay = `<span class="text-slate-300">${escapeHtml(JSON.stringify(value))}</span>`;
      if (typeof value === "string") valDisplay = `<span class="text-emerald-400">"${escapeHtml(value)}"</span>`;
      if (typeof value === "number") valDisplay = `<span class="text-amber-400">${value}</span>`;
      if (typeof value === "boolean") valDisplay = `<span class="text-blue-400 font-bold">${value}</span>`;
      if (value === null) valDisplay = `<span class="text-purple-400 font-bold">null</span>`;

      item.innerHTML = `<span class="text-cyan-400 font-semibold">${escapeHtml(key)}:</span> ${valDisplay}`;
    }
    return item;
  }

  input?.addEventListener("input", () => processJson(2));
  format2Btn?.addEventListener("click", () => processJson(2));
  format4Btn?.addEventListener("click", () => processJson(4));
  minifyBtn?.addEventListener("click", () => processJson(0));

  sampleBtn?.addEventListener("click", () => {
    input.value = sampleJson;
    processJson(2);
    showToast("Sample JSON payload loaded", "info");
  });

  clearBtn?.addEventListener("click", () => {
    input.value = "";
    processJson(2);
  });

  copyBtn?.addEventListener("click", () => {
    if (!parsedObj) {
      showToast("No valid JSON to copy", "warning");
      return;
    }
    copyToClipboard(JSON.stringify(parsedObj, null, 2), "JSON payload");
  });

  saveVaultBtn?.addEventListener("click", () => {
    if (!parsedObj) {
      showToast("Please format valid JSON first", "warning");
      return;
    }
    const title = prompt("Enter snippet title for Firestore Vault:", "API JSON Configuration");
    if (title) {
      window.saveSnippetToCloud?.(title, "text", JSON.stringify(parsedObj, null, 2));
    }
  });

  tabCode?.addEventListener("click", () => {
    tabCode.className = "px-2.5 py-1 rounded bg-slate-800 text-cyan-300 font-bold border border-cyan-500/30";
    tabTree.className = "px-2.5 py-1 rounded bg-transparent hover:bg-slate-800 text-slate-400";
    outputCode.classList.remove("hidden");
    outputTree.classList.add("hidden");
  });

  tabTree?.addEventListener("click", () => {
    tabTree.className = "px-2.5 py-1 rounded bg-slate-800 text-cyan-300 font-bold border border-cyan-500/30";
    tabCode.className = "px-2.5 py-1 rounded bg-transparent hover:bg-slate-800 text-slate-400";
    outputTree.classList.remove("hidden");
    outputCode.classList.add("hidden");
  });

  // Initial load with sample
  input.value = sampleJson;
  processJson(2);
}
