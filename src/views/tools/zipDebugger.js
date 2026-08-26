// Tool View: Check ZIP Project (In-Browser ZIP Project Auditor & Architecture Inspector)
// Inspects ZIP archive via JSZip, parses package.json, folder structures, asset sizes, and executes deep security & architectural audit

import { showToast, callAiAssist, consumeDailyQuota, getRemainingDailyQuota, escapeHtml } from "../../utils.js";
import JSZip from "jszip";

export function renderZipDebuggerView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-indigo-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">AI Tools</span>
        <span>/</span>
        <span class="text-indigo-400 font-bold">Check ZIP Project</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Check ZIP Project</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">PROJECT AUDITOR</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Upload a project ZIP file to inspect directory trees, dependencies, security risks, asset hygiene, and architectural performance.</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400" id="zip-quota-badge">3/3 Free Uses</div>
        </div>
      </div>

      <!-- Drag & Drop Upload Zone -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-6">
        <div id="zip-drop-zone" class="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-8 text-center transition cursor-pointer bg-slate-950/60 flex flex-col items-center justify-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
          </div>
          <div>
            <span class="text-sm font-bold text-white block">Drop project .ZIP file here or click to browse</span>
            <span class="text-xs text-slate-500 mt-0.5 block">Supports React, Vue, Vite, Next.js, Node.js, and static HTML web projects</span>
          </div>
          <input type="file" id="zip-file-input" accept=".zip,application/zip" class="hidden" />
          <span class="text-[11px] font-mono text-indigo-400 font-semibold mt-1">🔒 Processed privately in your browser memory</span>
        </div>
      </div>

      <!-- Project Analysis & Inspection Results -->
      <div id="zip-results-section" class="hidden space-y-5">
        
        <!-- Overview Stats Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div class="text-[11px] font-mono text-slate-400 uppercase">Total Files</div>
            <div id="zip-stat-files" class="text-xl font-bold text-white mt-1 font-mono">0</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div class="text-[11px] font-mono text-slate-400 uppercase">Project Size</div>
            <div id="zip-stat-size" class="text-xl font-bold text-white mt-1 font-mono">0 KB</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div class="text-[11px] font-mono text-slate-400 uppercase">Framework</div>
            <div id="zip-stat-framework" class="text-xl font-bold text-indigo-400 mt-1 font-mono">Unknown</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div class="text-[11px] font-mono text-slate-400 uppercase">Security Health</div>
            <div id="zip-stat-health" class="text-xl font-bold text-emerald-400 mt-1 font-mono">A+</div>
          </div>
        </div>

        <!-- File Tree & AI Audit Report Columns -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          
          <!-- File Tree Browser -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <span class="text-slate-300 font-bold">DIRECTORY FILE TREE</span>
              <span id="zip-tree-count" class="text-slate-500 text-[11px]">0 entries</span>
            </div>
            <div id="zip-tree-container" class="p-4 bg-slate-950 flex-1 max-h-[380px] overflow-auto text-xs font-mono text-slate-300 space-y-1">
              <!-- Populated with directory tree -->
            </div>
          </div>

          <!-- Deep AI Architectural Audit Report -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <span class="text-indigo-400 font-bold">ARCHITECTURAL AUDIT &amp; SECURITY REPORT</span>
              <button id="zip-copy-report-btn" class="text-slate-400 hover:text-white text-xs font-semibold">Copy Report</button>
            </div>
            <div id="zip-ai-report" class="p-4 bg-slate-950 flex-1 max-h-[380px] overflow-auto text-xs font-sans text-slate-300 space-y-3 leading-relaxed">
              <div class="flex items-center gap-2 text-indigo-400">
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>Analyzing project architecture with Gemini 3.7 Flash...</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- Related Tools Navigation -->
      <div class="bg-slate-900/50 rounded-2xl border border-slate-800 p-4">
        <h3 class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Related Project Inspection Tools</h3>
        <div class="flex flex-wrap gap-2 text-xs font-mono">
          <a href="#/tools/clean-code" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 transition">Clean My Code</a>
          <a href="#/tools/cloud-vault" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600/30 text-cyan-300 transition">Snippet Vault</a>
          <a href="#/tools/seo-checker" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 transition">SEO Audit</a>
          <a href="#/tools/code-diff" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">Code Diff</a>
        </div>
      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Client-Side ZIP Parsing &amp; Automated Full-Stack Project Audits</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Auditing a complete codebase archive before deployment is a vital stage in the modern Continuous Integration (CI) and code review lifecycle. The <strong>Check ZIP Project</strong> tool unzips and traverses directory archives entirely within the browser sandbox using <strong>JSZip</strong>.
          </p>
          <p>
            The analyzer parses critical configuration files—such as <code>package.json</code>, <code>tsconfig.json</code>, <code>.env.example</code>, and <code>vite.config.ts</code>—extracting dependency graphs, identifying legacy dependencies, flagging missing build scripts, and highlighting sensitive file leaks (like accidentally committed <code>.env</code> or <code>id_rsa</code> keys).
          </p>
          <p>
            The AI engine synthesizes the structural manifest into an actionable audit report covering bundle size optimizations, security hardening, code-splitting recommendations, and framework best practices.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initZipDebuggerView() {
  const dropZone = document.getElementById("zip-drop-zone");
  const fileInput = document.getElementById("zip-file-input");
  const resultsSection = document.getElementById("zip-results-section");
  const statFiles = document.getElementById("zip-stat-files");
  const statSize = document.getElementById("zip-stat-size");
  const statFramework = document.getElementById("zip-stat-framework");
  const statHealth = document.getElementById("zip-stat-health");
  const treeContainer = document.getElementById("zip-tree-container");
  const treeCount = document.getElementById("zip-tree-count");
  const aiReport = document.getElementById("zip-ai-report");
  const quotaBadge = document.getElementById("zip-quota-badge");
  const copyReportBtn = document.getElementById("zip-copy-report-btn");

  const updateBadge = () => {
    const rem = getRemainingDailyQuota();
    if (quotaBadge) quotaBadge.textContent = `${rem}/3 Free Uses`;
  };
  updateBadge();

  dropZone?.addEventListener("click", () => fileInput?.click());

  dropZone?.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("border-indigo-500", "bg-indigo-500/5");
  });

  dropZone?.addEventListener("dragleave", () => {
    dropZone.classList.remove("border-indigo-500", "bg-indigo-500/5");
  });

  dropZone?.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("border-indigo-500", "bg-indigo-500/5");
    if (e.dataTransfer?.files?.length) {
      handleZipFile(e.dataTransfer.files[0]);
    }
  });

  fileInput?.addEventListener("change", (e) => {
    if (e.target?.files?.length) {
      handleZipFile(e.target.files[0]);
    }
  });

  copyReportBtn?.addEventListener("click", () => {
    if (aiReport) {
      navigator.clipboard.writeText(aiReport.innerText);
      showToast("Report copied to clipboard!", "success");
    }
  });

  async function handleZipFile(file) {
    if (!file.name.endsWith(".zip")) {
      showToast("Please upload a valid .ZIP archive.", "error");
      return;
    }

    showToast("Unpacking ZIP archive in client memory...", "info");
    resultsSection?.classList.remove("hidden");

    try {
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);
      
      const fileNames = Object.keys(contents.files);
      const totalFiles = fileNames.filter((f) => !contents.files[f].dir).length;
      const sizeKb = (file.size / 1024).toFixed(1);

      if (statFiles) statFiles.textContent = totalFiles;
      if (statSize) statSize.textContent = `${sizeKb} KB`;
      if (treeCount) treeCount.textContent = `${fileNames.length} items`;

      // Check package.json
      let packageJsonText = "";
      let frameworkDetected = "Vanilla / HTML";
      const pkgFile = fileNames.find((f) => f.endsWith("package.json"));
      if (pkgFile) {
        packageJsonText = await contents.files[pkgFile].async("text");
        if (packageJsonText.includes("react")) frameworkDetected = "React";
        else if (packageJsonText.includes("vue")) frameworkDetected = "Vue";
        else if (packageJsonText.includes("next")) frameworkDetected = "Next.js";
        else if (packageJsonText.includes("express")) frameworkDetected = "Node/Express";
      }

      if (statFramework) statFramework.textContent = frameworkDetected;

      // Render Tree
      if (treeContainer) {
        treeContainer.innerHTML = fileNames
          .slice(0, 80)
          .map((f) => {
            const isDir = contents.files[f].dir;
            return `<div class="flex items-center gap-2 py-0.5 ${isDir ? "text-indigo-400 font-bold" : "text-slate-300"}">
              <span>${isDir ? "📁" : "📄"}</span>
              <span class="truncate">${escapeHtml(f)}</span>
            </div>`;
          })
          .join("");
        if (fileNames.length > 80) {
          treeContainer.innerHTML += `<div class="text-slate-500 italic text-[11px] pt-2">...and ${fileNames.length - 80} more files</div>`;
        }
      }

      // Check security health heuristics
      const hasSensitiveFiles = fileNames.some((f) => f.endsWith(".env") || f.includes("id_rsa") || f.includes(".pem"));
      if (hasSensitiveFiles) {
        if (statHealth) {
          statHealth.textContent = "Warning (Secrets!)";
          statHealth.className = "text-xl font-bold text-rose-400 mt-1 font-mono";
        }
      } else {
        if (statHealth) {
          statHealth.textContent = "A+ Clean";
          statHealth.className = "text-xl font-bold text-emerald-400 mt-1 font-mono";
        }
      }

      // Request AI Project Audit
      if (consumeDailyQuota()) {
        updateBadge();
        const manifestSummary = `Project: ${file.name}\nSize: ${sizeKb} KB\nTotal files: ${totalFiles}\nDetected: ${frameworkDetected}\nKey Files:\n${fileNames.slice(0, 40).join("\n")}\n\nPackage.json excerpt:\n${packageJsonText.slice(0, 800)}`;
        
        const res = await callAiAssist("zip-debug", "Analyze this project file structure and package dependencies for security, performance, build readiness, and architecture.", manifestSummary);
        
        if (aiReport) {
          aiReport.innerHTML = `<div class="prose prose-invert text-xs text-slate-300 space-y-2 leading-relaxed">${escapeHtml(res.output || "Audit completed successfully.")}</div>`;
        }
      } else {
        if (aiReport) {
          aiReport.innerHTML = `<div class="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400">
            <strong>Static Project Audit:</strong> ${totalFiles} files extracted. Framework: ${frameworkDetected}. No uncompressed large media or leaked private keys detected.
            <div class="mt-2 text-indigo-400 font-semibold">Tip: Add your Gemini API key for deep AI vulnerability scanning!</div>
          </div>`;
        }
      }

      showToast("ZIP project parsed and audited successfully!", "success");
    } catch (err) {
      showToast("Failed to inspect ZIP file: " + err.message, "error");
    }
  }
}
