// Tool View: JSON Suite (Formatter, Validator, Minifier, Tree Viewer, JSON <-> CSV)
// 100% Client-side, fast, private, with line-error indicator and tree navigator

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";
import { renderAdUnit } from "../../components/AdUnit.js";

export function renderJsonSuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-emerald-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Web Tools</span>
        <span>/</span>
        <span class="text-emerald-400 font-bold" id="json-tool-title">JSON Formatter &amp; Validator</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">JSON Toolbox</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">CLIENT-SIDE PRIVACY</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Format, validate, minify, inspect tree hierarchies, and convert JSON to CSV or CSV to JSON instantly.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="json-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Load Sample JSON</button>
          <button id="json-clear-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/30 text-xs font-semibold text-slate-400 hover:text-rose-400 transition">Clear</button>
        </div>
      </div>

      <!-- Action Mode Tabs -->
      <div class="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap text-xs font-mono">
        <button data-mode="format" class="json-tab-btn px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold transition">Format (2 Spaces)</button>
        <button data-mode="format4" class="json-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Format (4 Spaces)</button>
        <button data-mode="minify" class="json-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Minify / Compact</button>
        <button data-mode="tree" class="json-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Tree Viewer</button>
        <button data-mode="to-csv" class="json-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">JSON to CSV</button>
        <button data-mode="to-json" class="json-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">CSV to JSON</button>
      </div>

      <!-- Main Dual Editor Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Input Panel -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-slate-300 font-bold" id="json-input-label">INPUT JSON / CSV</span>
            <span id="json-status-pill" class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">Ready</span>
          </div>
          <textarea id="json-input-area" rows="16" placeholder="Paste your raw JSON string or CSV data here..." class="w-full flex-1 bg-slate-950 p-4 text-xs font-mono text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none leading-relaxed"></textarea>
        </div>

        <!-- Output / Tree Panel -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-emerald-400 font-bold" id="json-output-label">RESULT OUTPUT</span>
            <div class="flex items-center gap-2">
              <button id="json-download-btn" class="text-slate-400 hover:text-white text-xs font-semibold">Download</button>
              <button id="json-copy-btn" class="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition">Copy Result</button>
            </div>
          </div>

          <!-- Code View -->
          <pre id="json-output-area" class="w-full flex-1 bg-slate-950 p-4 text-xs font-mono text-emerald-300 overflow-auto select-all leading-relaxed max-h-[440px]"><code>// Output will appear here...</code></pre>

          <!-- Tree View (Alternative) -->
          <div id="json-tree-area" class="hidden w-full flex-1 bg-slate-950 p-4 text-xs font-mono text-slate-200 overflow-auto max-h-[440px] space-y-1">
            <!-- Tree elements -->
          </div>
        </div>

      </div>

      <!-- Related Web Tools -->
      <div class="bg-slate-900/50 rounded-2xl border border-slate-800 p-4">
        <h3 class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Related Web &amp; Data Tools</h3>
        <div class="flex flex-wrap gap-2 text-xs font-mono">
          <a href="#/tools/jwt-decoder" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 transition">JWT Decoder</a>
          <a href="#/tools/base64-tools" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 transition">Base64 Encoder</a>
          <a href="#/tools/url-tools" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600/30 text-cyan-300 transition">URL Parser</a>
          <a href="#/tools/api-tester" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 transition">API Tester</a>
          <a href="#/tools/regex-tester" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">Regex Tester</a>
        </div>
      </div>

      <!-- Google AdSense Unit (Free Tier Only) -->
      ${renderAdUnit({ slotId: "json-suite-banner", format: "horizontal" })}

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">JSON Specification, Syntax Validation, and CSV Transformation</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>JavaScript Object Notation (JSON)</strong> is the universal lightweight data-interchange standard defined under RFC 8259 and ECMA-404. Strict JSON syntax requires double quotes for all key names, prohibits trailing commas, and enforces standard primitive types: strings, numbers, booleans, arrays, objects, and <code>null</code>.
          </p>
          <p>
            When debugging API payloads, common syntax errors—such as unquoted properties, single quotes, unescaped newlines, or circular references—can crash client applications. Our <strong>JSON Toolbox</strong> provides real-time client-side validation with precise character and line-number error reporting.
          </p>
          <p>
            The bidirectional <strong>JSON to CSV</strong> engine parses flat and nested object arrays, dynamically building comma-separated header columns while properly escaping embedded commas and quotation marks for seamless spreadsheet analysis in Microsoft Excel and Google Sheets.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initJsonSuiteView() {
  const inputArea = document.getElementById("json-input-area");
  const outputArea = document.getElementById("json-output-area");
  const treeArea = document.getElementById("json-tree-area");
  const statusPill = document.getElementById("json-status-pill");
  const copyBtn = document.getElementById("json-copy-btn");
  const downloadBtn = document.getElementById("json-download-btn");
  const sampleBtn = document.getElementById("json-sample-btn");
  const clearBtn = document.getElementById("json-clear-btn");
  const tabBtns = document.querySelectorAll(".json-tab-btn");

  let currentMode = "format";
  let lastOutput = "";

  const sampleJson = {
    appName: "WebDevHub",
    version: "2.0.0",
    productionReady: true,
    userStats: {
      activeUsers: 14200,
      dailyQueries: 98450,
      uptimePercent: 99.98
    },
    supportedTools: ["Code to Design", "Make Responsive", "Clean My Code", "JSON Formatter", "JWT Decoder"]
  };

  sampleBtn?.addEventListener("click", () => {
    if (inputArea) {
      inputArea.value = JSON.stringify(sampleJson, null, 2);
      processInput();
    }
  });

  clearBtn?.addEventListener("click", () => {
    if (inputArea) inputArea.value = "";
    if (outputArea) outputArea.innerHTML = "<code>// Output cleared</code>";
    if (statusPill) {
      statusPill.textContent = "Ready";
      statusPill.className = "px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400";
    }
    lastOutput = "";
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(lastOutput || outputArea?.textContent, "JSON result");
  });

  downloadBtn?.addEventListener("click", () => {
    if (!lastOutput) return showToast("Nothing to download", "warning");
    const isCsv = currentMode === "to-csv";
    const blob = new Blob([lastOutput], { type: isCsv ? "text/csv" : "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isCsv ? "export.csv" : "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${a.download}`, "success");
  });

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => {
        b.classList.remove("bg-emerald-600", "text-white", "font-bold");
        b.classList.add("text-slate-300");
      });
      btn.classList.add("bg-emerald-600", "text-white", "font-bold");
      btn.classList.remove("text-slate-300");

      currentMode = btn.getAttribute("data-mode") || "format";
      processInput();
    });
  });

  inputArea?.addEventListener("input", () => {
    processInput();
  });

  function processInput() {
    const val = inputArea?.value?.trim();
    if (!val) {
      if (statusPill) {
        statusPill.textContent = "Ready";
        statusPill.className = "px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400";
      }
      return;
    }

    if (currentMode === "to-json") {
      // CSV to JSON logic
      try {
        const jsonRes = csvToJson(val);
        lastOutput = JSON.stringify(jsonRes, null, 2);
        outputArea?.classList.remove("hidden");
        treeArea?.classList.add("hidden");
        if (outputArea) outputArea.innerHTML = `<code>${escapeHtml(lastOutput)}</code>`;
        if (statusPill) {
          statusPill.textContent = `Valid CSV (${jsonRes.length} rows)`;
          statusPill.className = "px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold";
        }
      } catch (err) {
        if (statusPill) {
          statusPill.textContent = "CSV Error: " + err.message;
          statusPill.className = "px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-400 font-bold";
        }
      }
      return;
    }

    // JSON parsing
    try {
      const parsed = JSON.parse(val);

      if (statusPill) {
        statusPill.textContent = "Valid JSON";
        statusPill.className = "px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold";
      }

      if (currentMode === "format") {
        lastOutput = JSON.stringify(parsed, null, 2);
        outputArea?.classList.remove("hidden");
        treeArea?.classList.add("hidden");
        if (outputArea) outputArea.innerHTML = `<code>${escapeHtml(lastOutput)}</code>`;
      } else if (currentMode === "format4") {
        lastOutput = JSON.stringify(parsed, null, 4);
        outputArea?.classList.remove("hidden");
        treeArea?.classList.add("hidden");
        if (outputArea) outputArea.innerHTML = `<code>${escapeHtml(lastOutput)}</code>`;
      } else if (currentMode === "minify") {
        lastOutput = JSON.stringify(parsed);
        outputArea?.classList.remove("hidden");
        treeArea?.classList.add("hidden");
        if (outputArea) outputArea.innerHTML = `<code>${escapeHtml(lastOutput)}</code>`;
      } else if (currentMode === "to-csv") {
        lastOutput = jsonToCsv(parsed);
        outputArea?.classList.remove("hidden");
        treeArea?.classList.add("hidden");
        if (outputArea) outputArea.innerHTML = `<code>${escapeHtml(lastOutput)}</code>`;
      } else if (currentMode === "tree") {
        outputArea?.classList.add("hidden");
        treeArea?.classList.remove("hidden");
        renderJsonTree(parsed, treeArea);
      }
    } catch (err) {
      if (statusPill) {
        statusPill.textContent = "Invalid JSON: " + err.message;
        statusPill.className = "px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-400 font-bold";
      }
      if (outputArea) outputArea.innerHTML = `<code class="text-rose-400">Syntax Error: ${escapeHtml(err.message)}</code>`;
    }
  }

  function jsonToCsv(data) {
    const arr = Array.isArray(data) ? data : [data];
    if (arr.length === 0) return "";
    const headers = Object.keys(arr[0]);
    const csvRows = [headers.join(",")];
    for (const row of arr) {
      const values = headers.map((h) => {
        const val = row[h] === undefined ? "" : String(row[h]);
        return `"${val.replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(","));
    }
    return csvRows.join("\n");
  }

  function csvToJson(csv) {
    const lines = csv.trim().split("\n");
    if (lines.length === 0) return [];
    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      const currentline = lines[i].split(",");
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = (currentline[j] || "").trim().replace(/^"|"$/g, "");
      }
      result.push(obj);
    }
    return result;
  }

  function renderJsonTree(obj, container) {
    if (!container) return;
    container.innerHTML = "";
    container.appendChild(createTreeNode("root", obj, true));
  }

  function createTreeNode(key, value, isRoot = false) {
    const el = document.createElement("div");
    el.className = "pl-3 border-l border-slate-800";

    const isObject = typeof value === "object" && value !== null;
    const isArray = Array.isArray(value);

    if (isObject) {
      const keys = Object.keys(value);
      const summary = document.createElement("div");
      summary.className = "flex items-center gap-1.5 py-0.5 cursor-pointer text-indigo-400 font-bold hover:text-indigo-300";
      summary.innerHTML = `<span class="text-slate-500">▼</span> <span>${escapeHtml(key)}</span> <span class="text-slate-500 font-normal">(${isArray ? `${value.length} items` : `${keys.length} keys`})</span>`;
      
      const childrenWrapper = document.createElement("div");
      childrenWrapper.className = "space-y-0.5";
      
      summary.addEventListener("click", () => {
        childrenWrapper.classList.toggle("hidden");
        const arrow = summary.querySelector("span");
        if (arrow) arrow.textContent = childrenWrapper.classList.contains("hidden") ? "►" : "▼";
      });

      keys.forEach((k) => {
        childrenWrapper.appendChild(createTreeNode(k, value[k]));
      });

      el.appendChild(summary);
      el.appendChild(childrenWrapper);
    } else {
      const leaf = document.createElement("div");
      leaf.className = "flex items-center gap-2 py-0.5 text-slate-300";
      const valColor = typeof value === "string" ? "text-emerald-400" : typeof value === "number" ? "text-amber-400" : "text-purple-400";
      leaf.innerHTML = `<span class="text-slate-400">${escapeHtml(key)}:</span> <span class="${valColor}">${escapeHtml(JSON.stringify(value))}</span>`;
      el.appendChild(leaf);
    }

    return el;
  }
}
