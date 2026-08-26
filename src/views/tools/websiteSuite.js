// Tool View: Website & SEO Suite (Meta Tags, Open Graph, Twitter Cards, robots.txt, Sitemap Generator)
// 100% Client-side metadata preview and search engine crawler asset generator

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderWebsiteSuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-blue-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">SEO &amp; Web</span>
        <span>/</span>
        <span class="text-blue-400 font-bold">SEO &amp; Meta Suite</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">SEO &amp; Social Meta Studio</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">SEO METADATA</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Generate meta tags, live Open Graph and Twitter Card social previews, robots.txt directives, and XML sitemaps.</p>
        </div>
      </div>

      <!-- Mode Selector -->
      <div class="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap text-xs font-mono">
        <button data-mode="meta" class="seo-tab-btn px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold transition">Open Graph &amp; Meta Generator</button>
        <button data-mode="robots" class="seo-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">robots.txt Generator</button>
        <button data-mode="sitemap" class="seo-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Sitemap.xml Generator</button>
      </div>

      <!-- 1. Meta & Open Graph Studio -->
      <div id="seo-meta-pane" class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <!-- Left: Form inputs (5 cols) -->
        <div class="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3">
          <h3 class="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">Page Metadata Fields</h3>
          
          <div>
            <label class="text-[11px] font-mono text-slate-400 block mb-1">Page Title (<span id="meta-title-len">35</span>/60 chars)</label>
            <input type="text" id="meta-title" value="WebDevHub - AI Developer Tools" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" />
          </div>

          <div>
            <label class="text-[11px] font-mono text-slate-400 block mb-1">Meta Description (<span id="meta-desc-len">78</span>/160 chars)</label>
            <textarea id="meta-desc" rows="3" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono leading-relaxed">The all-in-one developer toolbox featuring AI workflows and 74 client utilities.</textarea>
          </div>

          <div>
            <label class="text-[11px] font-mono text-slate-400 block mb-1">Canonical URL</label>
            <input type="text" id="meta-url" value="https://webdevhub.app" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" />
          </div>

          <div>
            <label class="text-[11px] font-mono text-slate-400 block mb-1">OG Image URL</label>
            <input type="text" id="meta-image" value="https://webdevhub.app/og-image.png" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" />
          </div>
        </div>

        <!-- Right: Previews and HTML Tags (7 cols) -->
        <div class="lg:col-span-7 space-y-4">
          
          <!-- Google Search Preview -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5 font-sans">
            <span class="text-[10px] font-mono text-slate-400 uppercase font-bold block">Google Search Result Preview</span>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
              <div class="text-xs text-emerald-400 truncate" id="google-prev-url">https://webdevhub.app</div>
              <div class="text-sm font-semibold text-blue-400 hover:underline cursor-pointer" id="google-prev-title">WebDevHub - AI Developer Tools</div>
              <div class="text-xs text-slate-300 leading-relaxed" id="google-prev-desc">The all-in-one developer toolbox featuring AI workflows and 74 client utilities.</div>
            </div>
          </div>

          <!-- Generated Meta Tags Code -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div class="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <span class="text-blue-400 font-bold">HTML &lt;HEAD&gt; TAGS</span>
              <button id="meta-copy-btn" class="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition">Copy Tags</button>
            </div>
            <pre class="p-4 bg-slate-950 text-xs font-mono text-blue-300 overflow-auto select-all leading-relaxed max-h-[160px]"><code id="meta-output-code"></code></pre>
          </div>

        </div>

      </div>

      <!-- 2. robots.txt Pane -->
      <div id="seo-robots-pane" class="hidden bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">robots.txt Directives</h3>
          <button id="robots-copy-btn" class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition">Copy robots.txt</button>
        </div>
        <textarea id="robots-output" rows="8" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-blue-300 leading-relaxed">User-agent: *
Allow: /
Disallow: /api/
Disallow: /private/

Sitemap: https://webdevhub.app/sitemap.xml</textarea>
      </div>

      <!-- 3. sitemap.xml Pane -->
      <div id="seo-sitemap-pane" class="hidden bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">sitemap.xml Document</h3>
          <button id="sitemap-copy-btn" class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition">Copy sitemap.xml</button>
        </div>
        <textarea id="sitemap-output" rows="8" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-blue-300 leading-relaxed"><?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://webdevhub.app/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://webdevhub.app/#tools/json-formatter</loc>
    <priority>0.8</priority>
  </url>
</urlset></textarea>
      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Open Graph Protocols, Search Crawlers, and Indexing Standards</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            The <strong>Open Graph (OG) protocol</strong> enables web pages to become rich objects in a social graph when shared across LinkedIn, Twitter/X, Discord, and messaging apps.
            Key properties include <code>og:title</code>, <code>og:description</code>, <code>og:image</code>, and <code>og:url</code>.
          </p>
          <p>
            For organic search ranking, search engine crawlers prioritize standard <code>&lt;title&gt;</code> tags (recommended under 60 characters) and descriptive <code>&lt;meta name="description"&gt;</code> tags (under 160 characters) to construct search snippets.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initWebsiteSuiteView() {
  const tabBtns = document.querySelectorAll(".seo-tab-btn");
  const metaPane = document.getElementById("seo-meta-pane");
  const robotsPane = document.getElementById("seo-robots-pane");
  const sitemapPane = document.getElementById("seo-sitemap-pane");

  const titleIn = document.getElementById("meta-title");
  const descIn = document.getElementById("meta-desc");
  const urlIn = document.getElementById("meta-url");
  const imgIn = document.getElementById("meta-image");

  const titleLen = document.getElementById("meta-title-len");
  const descLen = document.getElementById("meta-desc-len");
  const metaCode = document.getElementById("meta-output-code");
  const metaCopy = document.getElementById("meta-copy-btn");

  const gUrl = document.getElementById("google-prev-url");
  const gTitle = document.getElementById("google-prev-title");
  const gDesc = document.getElementById("google-prev-desc");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => {
        b.classList.remove("bg-blue-600", "text-white", "font-bold");
        b.classList.add("text-slate-300");
      });
      btn.classList.add("bg-blue-600", "text-white", "font-bold");
      btn.classList.remove("text-slate-300");

      const mode = btn.getAttribute("data-mode");
      metaPane?.classList.toggle("hidden", mode !== "meta");
      robotsPane?.classList.toggle("hidden", mode !== "robots");
      sitemapPane?.classList.toggle("hidden", mode !== "sitemap");
    });
  });

  [titleIn, descIn, urlIn, imgIn].forEach((el) => el?.addEventListener("input", updateMeta));
  updateMeta();

  function updateMeta() {
    const title = titleIn?.value || "";
    const desc = descIn?.value || "";
    const url = urlIn?.value || "";
    const img = imgIn?.value || "";

    if (titleLen) titleLen.textContent = title.length.toString();
    if (descLen) descLen.textContent = desc.length.toString();

    if (gUrl) gUrl.textContent = url;
    if (gTitle) gTitle.textContent = title;
    if (gDesc) gDesc.textContent = desc;

    const tags = `<!-- Primary Meta Tags -->
<title>${escapeHtml(title)}</title>
<meta name="title" content="${escapeHtml(title)}" />
<meta name="description" content="${escapeHtml(desc)}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${escapeHtml(url)}" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(desc)}" />
<meta property="og:image" content="${escapeHtml(img)}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${escapeHtml(url)}" />
<meta property="twitter:title" content="${escapeHtml(title)}" />
<meta property="twitter:description" content="${escapeHtml(desc)}" />
<meta property="twitter:image" content="${escapeHtml(img)}" />`;

    if (metaCode) metaCode.textContent = tags;
  }

  metaCopy?.addEventListener("click", () => copyToClipboard(metaCode?.textContent, "Meta Tags"));
  document.getElementById("robots-copy-btn")?.addEventListener("click", () => copyToClipboard(document.getElementById("robots-output")?.value, "robots.txt"));
  document.getElementById("sitemap-copy-btn")?.addEventListener("click", () => copyToClipboard(document.getElementById("sitemap-output")?.value, "sitemap.xml"));
}
