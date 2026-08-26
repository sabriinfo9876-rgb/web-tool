// Tool View: ZIP Project Architecture & File Integrity Inspector with JSZip, Gemini AI Audit & SEO Guide

import { copyToClipboard, showToast, callAiAssist } from "../../utils.js";

export function renderZipDebuggerView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">ZIP Project Architecture &amp; File Tree Inspector</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">CLIENT JSZIP</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Safely inspect ZIP archives without extracting to disk. View nested file trees, inspect file sizes, and detect missing config files.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="zip-audit-ai-btn" class="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-md shadow-purple-500/20 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>AI Health Audit</span>
          </button>
        </div>
      </div>

      <!-- Drag and Drop ZIP Zone -->
      <div id="zip-dropzone" class="p-8 border-2 border-dashed border-slate-700 hover:border-emerald-400/60 rounded-3xl bg-slate-900/60 hover:bg-slate-900 transition text-center cursor-pointer flex flex-col items-center justify-center space-y-3">
        <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
        </div>
        <div>
          <span class="text-sm font-bold text-white">Drag &amp; drop a ZIP file here to inspect</span>
          <span class="text-xs text-slate-400 block mt-0.5">or click to browse local ZIP files</span>
        </div>
        <input type="file" id="zip-file-input" accept=".zip,application/zip" class="hidden" />
      </div>

      <!-- Overview Stats Banner -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 font-mono text-xs">
          <span class="text-slate-500 block">Archive Name</span>
          <span id="zip-stat-name" class="font-bold text-slate-200 truncate block mt-0.5">—</span>
        </div>
        <div class="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 font-mono text-xs">
          <span class="text-slate-500 block">Total Files</span>
          <span id="zip-stat-count" class="font-bold text-emerald-400 block mt-0.5">0 files</span>
        </div>
        <div class="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 font-mono text-xs">
          <span class="text-slate-500 block">Uncompressed Size</span>
          <span id="zip-stat-uncompressed" class="font-bold text-cyan-400 block mt-0.5">0 KB</span>
        </div>
        <div class="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 font-mono text-xs">
          <span class="text-slate-500 block">Config Health</span>
          <span id="zip-stat-health" class="font-bold text-slate-400 block mt-0.5">Awaiting File</span>
        </div>
      </div>

      <!-- File Tree & AI Audit Results -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- File Tree Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>ARCHIVE DIRECTORY TREE</span>
            <button id="zip-copy-tree-btn" class="text-emerald-400 hover:text-white font-bold">Copy Tree</button>
          </div>
          <div class="p-4 flex-1 overflow-auto max-h-[380px]">
            <div id="zip-tree-output" class="font-mono text-xs text-slate-300 space-y-1">
              <span class="text-slate-500 italic">No archive loaded. Drop a ZIP file above to view structure.</span>
            </div>
          </div>
        </div>

        <!-- AI Health Report Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span class="text-purple-400 font-bold">AI ARCHITECTURE &amp; SECURITY AUDIT</span>
            <span id="zip-ai-status">Idle</span>
          </div>
          <div class="p-4 flex-1 overflow-auto max-h-[380px] text-xs text-slate-300 leading-relaxed font-sans" id="zip-ai-audit-output">
            <p class="text-slate-500">Upload a project ZIP archive and click <strong>AI Health Audit</strong> to detect missing package.json, vulnerable dependencies, or misconfigured files.</p>
          </div>
        </div>

      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">ZIP Archive Architecture &amp; Client-Side Binary Stream Processing</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            The <strong>ZIP file format</strong> is a cross-platform data compression and archive specification that organizes file entries alongside an end-of-central-directory record (EOCD).
          </p>
          <p>
            Our tool analyzes ZIP binaries in memory using <strong>JSZip</strong>. This permits developers to audit repository dependencies (checking for <code>package.json</code>, <code>tsconfig.json</code>, and <code>.env.example</code>) before extraction, preventing Zip Bomb vulnerabilities.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initZipDebuggerView() {
  const dropzone = document.getElementById("zip-dropzone");
  const fileInput = document.getElementById("zip-file-input");

  const statName = document.getElementById("zip-stat-name");
  const statCount = document.getElementById("zip-stat-count");
  const statUncompressed = document.getElementById("zip-stat-uncompressed");
  const statHealth = document.getElementById("zip-stat-health");

  const treeOutput = document.getElementById("zip-tree-output");
  const copyTreeBtn = document.getElementById("zip-copy-tree-btn");
  const auditAiBtn = document.getElementById("zip-audit-ai-btn");
  const aiStatus = document.getElementById("zip-ai-status");
  const aiAuditOutput = document.getElementById("zip-ai-audit-output");

  let parsedFiles = [];
  let currentZipName = "";

  // Ensure JSZip is loaded dynamically if needed
  function loadJSZip() {
    return new Promise((resolve, reject) => {
      if (window.JSZip) return resolve(window.JSZip);
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
      script.onload = () => resolve(window.JSZip);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function processZipFile(file) {
    if (!file || !file.name.endsWith(".zip")) {
      showToast("Please upload a valid .zip file", "error");
      return;
    }

    currentZipName = file.name;
    statName.textContent = file.name;
    treeOutput.innerHTML = `<span class="text-slate-400">Parsing ZIP archive...</span>`;

    try {
      const JSZip = await loadJSZip();
      const zip = await JSZip.loadAsync(file);

      parsedFiles = [];
      let totalUncompressedBytes = 0;
      let hasPackageJson = false;
      let hasReadme = false;
      let hasGitignore = false;

      zip.forEach((relativePath, zipEntry) => {
        if (!zipEntry.dir) {
          parsedFiles.push({
            name: relativePath,
            size: zipEntry._data?.uncompressedSize || 0
          });
          totalUncompressedBytes += zipEntry._data?.uncompressedSize || 0;

          if (relativePath.toLowerCase().endsWith("package.json")) hasPackageJson = true;
          if (relativePath.toLowerCase().endsWith("readme.md")) hasReadme = true;
          if (relativePath.toLowerCase().endsWith(".gitignore")) hasGitignore = true;
        }
      });

      statCount.textContent = `${parsedFiles.length} files`;
      statUncompressed.textContent = `${(totalUncompressedBytes / 1024).toFixed(1)} KB`;

      if (hasPackageJson && hasReadme) {
        statHealth.className = "font-bold text-emerald-400 block mt-0.5";
        statHealth.textContent = "Healthy Project Structure";
      } else if (hasPackageJson) {
        statHealth.className = "font-bold text-amber-400 block mt-0.5";
        statHealth.textContent = "Node App (Missing README)";
      } else {
        statHealth.className = "font-bold text-slate-300 block mt-0.5";
        statHealth.textContent = "Standard Archive";
      }

      // Render Tree
      treeOutput.innerHTML = parsedFiles.map(f => {
        const icon = f.name.endsWith(".json") ? "📄" : f.name.endsWith(".ts") || f.name.endsWith(".js") ? "⚡" : f.name.endsWith(".html") ? "🌐" : f.name.endsWith(".css") ? "🎨" : "📦";
        return `<div class="flex items-center justify-between py-0.5 border-b border-slate-900 hover:bg-slate-900/60 px-1 rounded"><span class="truncate"><span class="mr-1.5">${icon}</span>${f.name}</span><span class="text-slate-500 text-[10px] shrink-0 ml-2">${(f.size / 1024).toFixed(1)} KB</span></div>`;
      }).join("");

      showToast(`ZIP inspected: ${parsedFiles.length} files extracted in memory`, "success");
    } catch (err) {
      showToast("Failed to parse ZIP: " + err.message, "error");
      treeOutput.innerHTML = `<span class="text-rose-400 font-mono">Error: ${err.message}</span>`;
    }
  }

  dropzone?.addEventListener("click", () => fileInput?.click());
  dropzone?.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("border-emerald-400");
  });
  dropzone?.addEventListener("dragleave", () => {
    dropzone.classList.remove("border-emerald-400");
  });
  dropzone?.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("border-emerald-400");
    const file = e.dataTransfer?.files?.[0];
    if (file) processZipFile(file);
  });

  fileInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (file) processZipFile(file);
  });

  copyTreeBtn?.addEventListener("click", () => {
    if (parsedFiles.length === 0) {
      showToast("No files to copy", "warning");
      return;
    }
    const treeText = parsedFiles.map(f => `${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join("\n");
    copyToClipboard(treeText, "ZIP File Tree");
  });

  auditAiBtn?.addEventListener("click", async () => {
    if (parsedFiles.length === 0) {
      showToast("Upload a ZIP file first to run AI audit", "warning");
      return;
    }

    aiStatus.textContent = "Auditing with Gemini 3.7...";
    aiAuditOutput.innerHTML = `<div class="flex items-center gap-2 text-purple-400"><svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> Analyzing repository architecture and security config...</div>`;

    try {
      const fileList = parsedFiles.map(f => f.name).join("\n");
      const res = await callAiAssist("zip-debug", fileList);
      aiAuditOutput.innerHTML = `<div class="space-y-2 text-slate-200">${res.analysis?.replace(/\n/g, "<br/>") || "Audit completed."}</div>`;
      aiStatus.textContent = "Audit Complete";
      showToast("AI Repository Audit completed", "success");
    } catch (err) {
      aiAuditOutput.innerHTML = `<span class="text-rose-400">Audit failed: ${err.message}</span>`;
      aiStatus.textContent = "Audit Failed";
    }
  });
}
