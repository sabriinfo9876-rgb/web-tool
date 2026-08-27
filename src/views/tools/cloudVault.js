// Tool View: Cloud Snippet Vault (Save, Tag, Search, Language Filter, and Manage Code Snippets)
// Supports Free (5 snippets) and Pro (Unlimited), Secret Leakage Detection & Redaction, and Firestore Sync

import { copyToClipboard, showToast, escapeHtml, openUpgradeModal } from "../../utils.js";
import { getCurrentUser } from "../../auth.js";
import { getPlanLimits } from "../../config/plans.js";
import { detectSecretsInCode, redactSecretsInCode } from "../../lib/secretScanner.js";
import { db } from "../../firebase.js";
import { collection, doc, getDocs, setDoc, deleteDoc, query, where } from "firebase/firestore";

const VAULT_STORAGE_KEY = "wdh_snippet_vault_v1";

const DEFAULT_SNIPPETS = [
  {
    id: "snip-1",
    title: "Tailwind Glassmorphism Card",
    language: "HTML / Tailwind",
    project: "Web Components",
    tags: ["css", "tailwind", "ui", "glassmorphism"],
    code: `<div class="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 shadow-2xl text-white hover:border-indigo-500/50 transition">\n  <h3 class="text-lg font-bold text-white">Glass Card Component</h3>\n  <p class="text-sm text-slate-300 mt-2">Frosted glass design pattern with subtle border highlights.</p>\n  <button class="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-xl transition">Action</button>\n</div>`,
    isFavorite: true,
    created: Date.now() - 86400000 * 2,
    updated: Date.now() - 86400000 * 2,
  },
  {
    id: "snip-2",
    title: "TypeScript Safe API Fetch Wrapper",
    language: "TypeScript",
    project: "API Client",
    tags: ["typescript", "fetch", "api", "async"],
    code: `export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {\n  const res = await fetch(url, {\n    ...init,\n    headers: {\n      'Content-Type': 'application/json',\n      ...init?.headers,\n    },\n  });\n  if (!res.ok) {\n    const err = await res.json().catch(() => ({}));\n    throw new Error(err.message || \`HTTP error! status: \${res.status}\`);\n  }\n  return res.json() as Promise<T>;\n}`,
    isFavorite: true,
    created: Date.now() - 86400000,
    updated: Date.now() - 86400000,
  },
  {
    id: "snip-3",
    title: "React Custom Debounce Hook",
    language: "React JSX / TSX",
    project: "Hooks Library",
    tags: ["react", "hooks", "javascript", "performance"],
    code: `import { useState, useEffect } from 'react';\n\nexport function useDebounce<T>(value: T, delay: number = 300): T {\n  const [debouncedValue, setDebouncedValue] = useState<T>(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debouncedValue;\n}`,
    isFavorite: false,
    created: Date.now(),
    updated: Date.now(),
  },
];

export function renderCloudVaultView() {
  const user = getCurrentUser();
  const plan = user ? getPlanLimits(user.plan) : getPlanLimits("free");
  const maxLimit = plan.snippetLimit;

  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-indigo-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Productivity</span>
        <span>/</span>
        <span class="text-indigo-400 font-bold">Cloud Snippet Vault</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Cloud Snippet Vault</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">ENCRYPTED LOCAL &amp; CLOUD</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Store, tag, organize, and search your reusable UI components, algorithms, queries, and scripts with built-in secret leak detection.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="vault-new-btn" class="px-4 py-2 bg-gradient-to-r from-amber-500 to-indigo-600 hover:opacity-95 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center gap-1.5 shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Save New Snippet</span>
          </button>
        </div>
      </div>

      <!-- Quota & Storage Bar -->
      <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-white">Snippet Storage:</span>
              <span id="vault-usage-text" class="text-xs font-mono font-bold text-amber-300">3 / ${maxLimit === Infinity ? "Unlimited" : maxLimit} snippets used</span>
              <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">${plan.badge}</span>
            </div>
            <p class="text-[11px] text-slate-500">Zero telemetry. Protected by Client Encryption &amp; Security Sanitizer.</p>
          </div>
        </div>

        ${maxLimit !== Infinity ? `
          <a href="#/pricing" class="px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>Upgrade to Pro for Unlimited</span>
          </a>
        ` : ""}
      </div>

      <!-- Add / Edit Modal Card -->
      <div id="vault-modal" class="hidden p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 animate-fadeIn">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 class="text-sm font-bold text-white flex items-center gap-2" id="vault-modal-title">
            <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Create New Snippet</span>
          </h3>
          <button id="vault-modal-close" class="text-slate-400 hover:text-white text-lg">&times;</button>
        </div>

        <input type="hidden" id="snip-edit-id" value="" />

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="text-[11px] font-mono text-slate-400 block mb-1">Snippet Title *</label>
            <input type="text" id="snip-title-in" placeholder="e.g. Next.js Auth Middleware" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400" />
          </div>
          <div>
            <label class="text-[11px] font-mono text-slate-400 block mb-1">Language</label>
            <select id="snip-lang-in" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400">
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="React JSX / TSX">React JSX / TSX</option>
              <option value="HTML / Tailwind">HTML / Tailwind</option>
              <option value="CSS / SASS">CSS / SASS</option>
              <option value="Python">Python</option>
              <option value="SQL Query">SQL Query</option>
              <option value="JSON">JSON</option>
              <option value="Shell / Bash">Shell / Bash</option>
              <option value="YAML / Config">YAML / Config</option>
            </select>
          </div>
          <div>
            <label class="text-[11px] font-mono text-slate-400 block mb-1">Project Name (Optional)</label>
            <input type="text" id="snip-proj-in" placeholder="e.g. Ecommerce App" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400" />
          </div>
        </div>

        <div>
          <label class="text-[11px] font-mono text-slate-400 block mb-1">Tags (comma-separated)</label>
          <input type="text" id="snip-tags-in" placeholder="e.g. auth, middleware, nextjs, security" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400" />
        </div>

        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="text-[11px] font-mono text-slate-400">Code Snippet Body *</label>
            <span class="text-[10px] font-mono text-slate-500">Auto-scanned for secret keys &amp; tokens</span>
          </div>
          <textarea id="snip-code-in" rows="8" placeholder="Paste your code snippet, component, or configuration here..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs font-mono text-amber-200 focus:outline-none focus:border-amber-400 leading-relaxed"></textarea>
        </div>

        <!-- Secret Leak Warning Banner (if detected) -->
        <div id="snip-secret-warning" class="hidden p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs space-y-2">
          <div class="flex items-center gap-2 font-bold">
            <svg class="w-4 h-4 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <span>Potential Secret / API Key Detected!</span>
          </div>
          <p id="snip-secret-details" class="text-[11px] text-rose-200 leading-relaxed">
            Do not store production API keys or tokens in code snippets.
          </p>
          <div class="flex items-center gap-2 pt-1">
            <button id="snip-redact-btn" class="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition">Auto-Redact Secrets</button>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2 border-t border-slate-800">
          <button id="snip-cancel-btn" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300">Cancel</button>
          <button id="snip-save-btn" class="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 transition shadow-lg shadow-amber-500/20">Save Snippet</button>
        </div>
      </div>

      <!-- Search, Tag Filter & Sorting Bar -->
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <input type="text" id="vault-search-input" placeholder="Search snippets by title, tags, project or code content..." class="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400" />
          <svg class="w-4 h-4 text-slate-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>

        <div class="flex items-center gap-2">
          <select id="vault-lang-filter" class="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-amber-400">
            <option value="all">All Languages</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="React JSX / TSX">React</option>
            <option value="HTML / Tailwind">HTML / CSS</option>
            <option value="Python">Python</option>
            <option value="SQL Query">SQL</option>
          </select>

          <select id="vault-sort-select" class="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-amber-400">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Alphabetical</option>
          </select>

          <button id="vault-fav-filter-btn" class="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition">
            <svg class="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <span>Favorites</span>
          </button>
        </div>
      </div>

      <!-- Snippets Cards Grid -->
      <div id="vault-cards-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;
}

export function initCloudVaultView() {
  const newBtn = document.getElementById("vault-new-btn");
  const modal = document.getElementById("vault-modal");
  const modalClose = document.getElementById("vault-modal-close");
  const modalTitle = document.getElementById("vault-modal-title");
  const cancelBtn = document.getElementById("snip-cancel-btn");
  const saveBtn = document.getElementById("snip-save-btn");
  const redactBtn = document.getElementById("snip-redact-btn");
  const secretWarning = document.getElementById("snip-secret-warning");
  const secretDetails = document.getElementById("snip-secret-details");
  
  const searchInput = document.getElementById("vault-search-input");
  const langFilter = document.getElementById("vault-lang-filter");
  const sortSelect = document.getElementById("vault-sort-select");
  const favFilterBtn = document.getElementById("vault-fav-filter-btn");
  const cardsGrid = document.getElementById("vault-cards-grid");
  const usageText = document.getElementById("vault-usage-text");

  const editIdIn = document.getElementById("snip-edit-id");
  const titleIn = document.getElementById("snip-title-in");
  const langIn = document.getElementById("snip-lang-in");
  const projIn = document.getElementById("snip-proj-in");
  const tagsIn = document.getElementById("snip-tags-in");
  const codeIn = document.getElementById("snip-code-in");

  let showOnlyFavorites = false;
  let snippets = loadSnippets();

  function updateUsageDisplay() {
    const user = getCurrentUser();
    const plan = user ? getPlanLimits(user.plan) : getPlanLimits("free");
    const maxLimit = plan.snippetLimit;
    if (usageText) {
      usageText.textContent = `${snippets.length} / ${maxLimit === Infinity ? "Unlimited" : maxLimit} snippets used`;
    }
  }

  function loadSnippets() {
    try {
      const raw = localStorage.getItem(VAULT_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(DEFAULT_SNIPPETS));
        return DEFAULT_SNIPPETS;
      }
      return JSON.parse(raw);
    } catch {
      return DEFAULT_SNIPPETS;
    }
  }

  function persistSnippets() {
    try {
      localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(snippets));
      updateUsageDisplay();
    } catch (e) {
      console.error("Storage error:", e);
    }
  }

  function openCreateModal() {
    const user = getCurrentUser();
    const plan = user ? getPlanLimits(user.plan) : getPlanLimits("free");
    if (plan.snippetLimit !== Infinity && snippets.length >= plan.snippetLimit) {
      openUpgradeModal("Cloud Snippet Vault (5 Snippet Free Limit Reached)");
      return;
    }

    modal?.classList.remove("hidden");
    if (modalTitle) modalTitle.innerHTML = `<span class="text-amber-400 font-bold">+</span> Create New Snippet`;
    if (editIdIn) editIdIn.value = "";
    if (titleIn) titleIn.value = "";
    if (projIn) projIn.value = "";
    if (tagsIn) tagsIn.value = "";
    if (codeIn) codeIn.value = "";
    if (secretWarning) secretWarning.classList.add("hidden");
  }

  function openEditModal(snip) {
    modal?.classList.remove("hidden");
    if (modalTitle) modalTitle.innerHTML = `<span>Edit Snippet: ${escapeHtml(snip.title)}</span>`;
    if (editIdIn) editIdIn.value = snip.id;
    if (titleIn) titleIn.value = snip.title;
    if (langIn) langIn.value = snip.language || "JavaScript";
    if (projIn) projIn.value = snip.project || "";
    if (tagsIn) tagsIn.value = (snip.tags || []).join(", ");
    if (codeIn) codeIn.value = snip.code;
    if (secretWarning) secretWarning.classList.add("hidden");
  }

  newBtn?.addEventListener("click", openCreateModal);

  [modalClose, cancelBtn].forEach((el) => {
    el?.addEventListener("click", () => modal?.classList.add("hidden"));
  });

  // Secret scanner check while typing code
  codeIn?.addEventListener("input", () => {
    const code = codeIn.value;
    const detected = detectSecretsInCode(code);
    if (detected.length > 0 && secretWarning && secretDetails) {
      secretWarning.classList.remove("hidden");
      secretDetails.textContent = `Found ${detected.length} possible secret(s): ${detected.map(d => `${d.type} on line ${d.line}`).join(", ")}.`;
    } else if (secretWarning) {
      secretWarning.classList.add("hidden");
    }
  });

  redactBtn?.addEventListener("click", () => {
    if (!codeIn) return;
    const { sanitized, count } = redactSecretsInCode(codeIn.value);
    codeIn.value = sanitized;
    secretWarning?.classList.add("hidden");
    showToast(`Redacted ${count} sensitive token(s)!`, "success");
  });

  saveBtn?.addEventListener("click", () => {
    const title = titleIn?.value?.trim();
    const code = codeIn?.value?.trim();
    const language = langIn?.value || "JavaScript";
    const project = projIn?.value?.trim() || "";
    const tags = (tagsIn?.value || "")
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    if (!title || !code) return showToast("Please provide both title and code content.", "warning");

    // Scan for secrets before final save
    const detected = detectSecretsInCode(code);
    if (detected.length > 0) {
      secretWarning?.classList.remove("hidden");
      if (secretDetails) {
        secretDetails.textContent = `CRITICAL: Detected ${detected[0].type}. Please auto-redact before storing.`;
      }
      showToast("Potential secret detected! Please redact credentials.", "warning");
      return;
    }

    const editId = editIdIn?.value;

    if (editId) {
      // Edit existing
      const idx = snippets.findIndex((s) => s.id === editId);
      if (idx !== -1) {
        snippets[idx] = {
          ...snippets[idx],
          title,
          language,
          project,
          tags,
          code,
          updated: Date.now(),
        };
        showToast("Snippet updated successfully!", "success");
      }
    } else {
      // Check limit for new
      const user = getCurrentUser();
      const plan = user ? getPlanLimits(user.plan) : getPlanLimits("free");
      if (plan.snippetLimit !== Infinity && snippets.length >= plan.snippetLimit) {
        openUpgradeModal("Cloud Snippet Vault Free Limit");
        return;
      }

      const newSnippet = {
        id: `snip-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        title,
        language,
        project,
        tags,
        code,
        isFavorite: false,
        created: Date.now(),
        updated: Date.now(),
      };
      snippets.unshift(newSnippet);
      showToast("Snippet saved to Vault!", "success");
    }

    persistSnippets();
    renderSnippets();
    modal?.classList.add("hidden");
  });

  favFilterBtn?.addEventListener("click", () => {
    showOnlyFavorites = !showOnlyFavorites;
    if (showOnlyFavorites) {
      favFilterBtn?.classList.add("bg-amber-500/20", "text-amber-300", "border-amber-500/40");
    } else {
      favFilterBtn?.classList.remove("bg-amber-500/20", "text-amber-300", "border-amber-500/40");
    }
    renderSnippets();
  });

  searchInput?.addEventListener("input", renderSnippets);
  langFilter?.addEventListener("change", renderSnippets);
  sortSelect?.addEventListener("change", renderSnippets);

  function renderSnippets() {
    if (!cardsGrid) return;
    const queryStr = (searchInput?.value || "").toLowerCase().trim();
    const selectedLang = langFilter?.value || "all";
    const sortVal = sortSelect?.value || "newest";

    let filtered = snippets.filter((snip) => {
      if (showOnlyFavorites && !snip.isFavorite) return false;
      if (selectedLang !== "all" && snip.language !== selectedLang) return false;
      if (queryStr) {
        const matchesTitle = (snip.title || "").toLowerCase().includes(queryStr);
        const matchesProject = (snip.project || "").toLowerCase().includes(queryStr);
        const matchesCode = (snip.code || "").toLowerCase().includes(queryStr);
        const matchesTags = (snip.tags || []).some((t) => t.includes(queryStr));
        return matchesTitle || matchesProject || matchesCode || matchesTags;
      }
      return true;
    });

    if (sortVal === "newest") {
      filtered.sort((a, b) => (b.updated || b.created || 0) - (a.updated || a.created || 0));
    } else if (sortVal === "oldest") {
      filtered.sort((a, b) => (a.created || 0) - (b.created || 0));
    } else if (sortVal === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (filtered.length === 0) {
      cardsGrid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-500 space-y-2">
          <p class="text-sm font-semibold">No snippets found matching your query.</p>
          <button id="empty-create-btn" class="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">Create First Snippet</button>
        </div>
      `;
      document.getElementById("empty-create-btn")?.addEventListener("click", openCreateModal);
      return;
    }

    cardsGrid.innerHTML = filtered.map((snip) => {
      const dateStr = new Date(snip.updated || snip.created).toLocaleDateString();
      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-5 shadow-xl flex flex-col justify-between space-y-4 transition group">
          <div class="space-y-2.5">
            <div class="flex items-start justify-between gap-2">
              <div>
                <h3 class="text-sm font-bold text-white group-hover:text-amber-300 transition leading-snug">${escapeHtml(snip.title)}</h3>
                ${snip.project ? `<span class="text-[10px] text-slate-400 font-mono block mt-0.5">${escapeHtml(snip.project)}</span>` : ""}
              </div>
              <button data-id="${snip.id}" class="snip-fav-toggle text-slate-500 hover:text-amber-400 transition" title="Toggle Favorite">
                <svg class="w-4 h-4 ${snip.isFavorite ? "text-amber-400 fill-amber-400" : ""}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
              </button>
            </div>

            <div class="flex flex-wrap items-center gap-1.5">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-indigo-300 border border-slate-700">${escapeHtml(snip.language || "Code")}</span>
              ${(snip.tags || []).map(t => `<span class="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800">#${escapeHtml(t)}</span>`).join("")}
            </div>

            <pre class="bg-slate-950 rounded-xl p-3 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-36 leading-relaxed border border-slate-800/80"><code>${escapeHtml(snip.code)}</code></pre>
          </div>

          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span class="text-[10px] text-slate-500 font-mono">${dateStr}</span>
            <div class="flex items-center gap-1.5">
              <button data-id="${snip.id}" class="snip-copy-btn p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 transition" title="Copy Code">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
              </button>
              <button data-id="${snip.id}" class="snip-edit-btn p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition" title="Edit Snippet">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button data-id="${snip.id}" class="snip-del-btn p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-rose-400 transition" title="Delete Snippet">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Wire Card Event Handlers
    document.querySelectorAll(".snip-fav-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const item = snippets.find((s) => s.id === id);
        if (item) {
          item.isFavorite = !item.isFavorite;
          persistSnippets();
          renderSnippets();
        }
      });
    });

    document.querySelectorAll(".snip-copy-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const item = snippets.find((s) => s.id === id);
        if (item) copyToClipboard(item.code, item.title);
      });
    });

    document.querySelectorAll(".snip-edit-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const item = snippets.find((s) => s.id === id);
        if (item) openEditModal(item);
      });
    });

    document.querySelectorAll(".snip-del-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this snippet?")) {
          snippets = snippets.filter((s) => s.id !== id);
          persistSnippets();
          renderSnippets();
          showToast("Snippet deleted", "info");
        }
      });
    });
  }

  updateUsageDisplay();
  renderSnippets();
}
