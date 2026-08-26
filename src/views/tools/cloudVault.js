// Tool View: Snippet Vault & Cloud Storage (Save, Tag, Search, and Duplicate Code Snippets)
// Client-side local storage persistence with real-time tag filtering

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

const VAULT_STORAGE_KEY = "wdh_snippet_vault_v1";

const DEFAULT_SNIPPETS = [
  {
    id: "snip-1",
    title: "Tailwind Glassmorphism Card",
    tags: ["css", "tailwind", "ui"],
    code: `<div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl text-white">\n  <h3 class="text-lg font-bold">Glass Card</h3>\n  <p class="text-sm text-slate-200 mt-2">Frosted glass design pattern.</p>\n</div>`,
    created: Date.now() - 86400000 * 2
  },
  {
    id: "snip-2",
    title: "TypeScript Safe Fetch Wrapper",
    tags: ["typescript", "fetch", "api"],
    code: `export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {\n  const res = await fetch(url, init);\n  if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);\n  return res.json() as Promise<T>;\n}`,
    created: Date.now() - 86400000
  },
  {
    id: "snip-3",
    title: "React Debounce Hook",
    tags: ["react", "hooks", "javascript"],
    code: `import { useState, useEffect } from 'react';\n\nexport function useDebounce<T>(value: T, delay: number): T {\n  const [debouncedValue, setDebouncedValue] = useState<T>(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debouncedValue;\n}`,
    created: Date.now()
  }
];

export function renderCloudVaultView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-indigo-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Productivity</span>
        <span>/</span>
        <span class="text-indigo-400 font-bold">Snippet Vault</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Code Snippet Vault</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">SECURE VAULT</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Store, tag, search, and manage your reusable UI components, algorithms, and boilerplate snippets locally.</p>
        </div>
        <button id="vault-new-btn" class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-indigo-500/25 flex items-center gap-1.5 self-start sm:self-auto">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>Save New Snippet</span>
        </button>
      </div>

      <!-- Add / Edit Modal Card -->
      <div id="vault-modal" class="hidden p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 animate-fadeIn">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-white" id="vault-modal-title">Create New Snippet</h3>
          <button id="vault-modal-close" class="text-slate-400 hover:text-white">&times;</button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="text-[11px] font-mono text-slate-400 block mb-1">Snippet Title</label>
            <input type="text" id="snip-title-in" placeholder="e.g. Next.js Auth Middleware" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" />
          </div>
          <div>
            <label class="text-[11px] font-mono text-slate-400 block mb-1">Tags (comma-separated)</label>
            <input type="text" id="snip-tags-in" placeholder="e.g. auth, middleware, nextjs" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" />
          </div>
        </div>
        <div>
          <label class="text-[11px] font-mono text-slate-400 block mb-1">Code Block Content</label>
          <textarea id="snip-code-in" rows="6" placeholder="Paste your code snippet here..." class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-indigo-300"></textarea>
        </div>
        <div class="flex justify-end gap-2">
          <button id="snip-cancel-btn" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300">Cancel</button>
          <button id="snip-save-btn" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white">Save Snippet</button>
        </div>
      </div>

      <!-- Search & Tag Filter -->
      <div class="flex flex-col sm:flex-row gap-3">
        <input type="text" id="vault-search-input" placeholder="Search by title or code content..." class="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-400" />
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
  const cancelBtn = document.getElementById("snip-cancel-btn");
  const saveBtn = document.getElementById("snip-save-btn");
  const searchInput = document.getElementById("vault-search-input");
  const cardsGrid = document.getElementById("vault-cards-grid");

  const titleIn = document.getElementById("snip-title-in");
  const tagsIn = document.getElementById("snip-tags-in");
  const codeIn = document.getElementById("snip-code-in");

  let snippets = loadSnippets();

  newBtn?.addEventListener("click", () => {
    modal?.classList.remove("hidden");
    if (titleIn) titleIn.value = "";
    if (tagsIn) tagsIn.value = "";
    if (codeIn) codeIn.value = "";
  });

  [modalClose, cancelBtn].forEach((el) => {
    el?.addEventListener("click", () => modal?.classList.add("hidden"));
  });

  saveBtn?.addEventListener("click", () => {
    const title = titleIn?.value?.trim();
    const code = codeIn?.value?.trim();
    const tags = (tagsIn?.value || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (!title || !code) return showToast("Please provide both title and code", "warning");

    const newSnippet = {
      id: `snip-${Date.now()}`,
      title,
      tags,
      code,
      created: Date.now()
    };

    snippets.unshift(newSnippet);
    persistSnippets();
    renderSnippets();
    modal?.classList.add("hidden");
    showToast("Snippet saved to Vault!", "success");
  });

  searchInput?.addEventListener("input", renderSnippets);
  renderSnippets();

  function loadSnippets() {
    try {
      const stored = localStorage.getItem(VAULT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_SNIPPETS;
    } catch {
      return DEFAULT_SNIPPETS;
    }
  }

  function persistSnippets() {
    try {
      localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(snippets));
    } catch (e) {
      console.error(e);
    }
  }

  function renderSnippets() {
    if (!cardsGrid) return;
    const query = searchInput?.value?.toLowerCase() || "";

    const filtered = snippets.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.code.toLowerCase().includes(query) ||
        s.tags.some((t) => t.toLowerCase().includes(query))
    );

    if (filtered.length === 0) {
      cardsGrid.innerHTML = `<div class="col-span-full p-12 text-center text-slate-500 font-mono text-xs">No snippets found in vault.</div>`;
      return;
    }

    cardsGrid.innerHTML = filtered
      .map(
        (snip) => `
        <div class="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition flex flex-col justify-between space-y-4 group">
          <div class="space-y-2">
            <div class="flex items-start justify-between gap-2">
              <h4 class="text-sm font-bold text-white tracking-tight">${escapeHtml(snip.title)}</h4>
              <button class="delete-snip-btn text-slate-500 hover:text-rose-400 text-xs font-bold" data-id="${snip.id}">&times;</button>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${snip.tags.map((t) => `<span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">${escapeHtml(t)}</span>`).join("")}
            </div>
          </div>

          <pre class="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-indigo-200 overflow-auto max-h-36 select-all leading-relaxed"><code>${escapeHtml(snip.code)}</code></pre>

          <div class="flex items-center justify-between pt-1 border-t border-slate-800/60 text-xs font-mono">
            <span class="text-[10px] text-slate-500">${new Date(snip.created).toLocaleDateString()}</span>
            <button class="copy-snip-btn px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition" data-code="${escapeHtml(snip.code)}">Copy Snippet</button>
          </div>
        </div>
      `
      )
      .join("");

    cardsGrid.querySelectorAll(".copy-snip-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        copyToClipboard(btn.getAttribute("data-code") || "", "Snippet");
      });
    });

    cardsGrid.querySelectorAll(".delete-snip-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        snippets = snippets.filter((s) => s.id !== id);
        persistSnippets();
        renderSnippets();
        showToast("Snippet removed", "info");
      });
    });
  }
}
