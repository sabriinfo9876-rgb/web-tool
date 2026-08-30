// Tool View: Open Graph & Twitter Social Meta Tag Generator with live previews & SEO Guide

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderOpenGraphView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Open Graph &amp; Social Meta Tag Generator</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">SEO / SOCIAL</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Generate complete HTML head tags with interactive Twitter, Facebook, and LinkedIn preview cards.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="og-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample Data</button>
          <button id="og-copy-btn" class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md shadow-blue-500/20">Copy &lt;head&gt; Meta</button>
        </div>
      </div>

      <!-- Main Layout: Form Inputs & Social Previews -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Meta Form Inputs -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
          <h3 class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Page Metadata Fields</h3>
          
          <div class="space-y-3 text-xs">
            <div>
              <label class="block text-slate-400 font-mono mb-1">Site / App Title</label>
              <input type="text" id="og-title" value="NEXORA AI — Autonomous Intelligence Engine" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-blue-400" />
            </div>

            <div>
              <label class="block text-slate-400 font-mono mb-1">Description (Max 160 chars recommended)</label>
              <textarea id="og-desc" rows="3" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-blue-400 leading-relaxed">Autonomous intelligence engine and 74 developer utilities including JSON Formatter, PX to REM converter, JWT decoder, ZIP debugger, and 10-node consensus.</textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-400 font-mono mb-1">Canonical URL</label>
                <input type="url" id="og-url" value="https://nexora.ai/" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label class="block text-slate-400 font-mono mb-1">Site Name</label>
                <input type="text" id="og-sitename" value="NEXORA AI" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-blue-400" />
              </div>
            </div>

            <div>
              <label class="block text-slate-400 font-mono mb-1">Featured Banner Image URL (1200x630px recommended)</label>
              <input type="url" id="og-image" value="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-blue-400" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-400 font-mono mb-1">Twitter @Handle</label>
                <input type="text" id="og-twitter-handle" value="@webdevhub" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label class="block text-slate-400 font-mono mb-1">Card Type</label>
                <select id="og-card-type" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-blue-400">
                  <option value="summary_large_image">summary_large_image (Large Banner)</option>
                  <option value="summary">summary (Small Square)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Social Cards Preview & Generated HTML -->
        <div class="space-y-4">
          <!-- Twitter / X Card Preview -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-2">
            <div class="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span class="flex items-center gap-1.5 text-blue-400 font-bold">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Twitter / X Large Preview
              </span>
              <span>1200 x 630</span>
            </div>
            
            <div class="rounded-xl bg-black border border-slate-800 overflow-hidden shadow-2xl">
              <div class="h-36 bg-slate-800 overflow-hidden relative">
                <img id="card-preview-img" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop" class="w-full h-full object-cover" alt="Open Graph Banner" />
              </div>
              <div class="p-3 space-y-1">
                <div class="text-[10px] text-slate-500 uppercase font-mono" id="card-preview-domain">nexora.ai</div>
                <div class="text-xs font-bold text-white truncate" id="card-preview-title">NEXORA AI</div>
                <div class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed" id="card-preview-desc">Autonomous intelligence engine and 74 developer utilities.</div>
              </div>
            </div>
          </div>

          <!-- HTML Code Output -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-2">
            <div class="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>GENERATED HTML HEAD TAGS</span>
            </div>
            <pre class="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-blue-300 font-mono overflow-auto max-h-48 select-all leading-relaxed"><code id="og-html-output">&lt;!-- Social Meta Tags --&gt;</code></pre>
          </div>
        </div>

      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Open Graph Protocol &amp; Social Crawler Architecture</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            When web pages are shared across social messaging platforms (including Twitter / X, Facebook, LinkedIn, Discord, and Slack), automated crawlers scrape the document's <code>&lt;head&gt;</code> element to parse <strong>Open Graph (OG)</strong> and <strong>Twitter Card</strong> metadata.
          </p>
          <p>
            Without properly formatted meta tags, social networks fall back to displaying generic, truncated page text or empty placeholders, leading to significantly lower click-through rates (CTR). Standard Open Graph tags specify essential attributes: <code>og:title</code>, <code>og:description</code>, <code>og:image</code>, <code>og:url</code>, and <code>og:type</code>.
          </p>
          <p>
            For maximum visual impact, optimize your featured banner image to <strong>1200 x 630 pixels</strong> (an exact 1.91:1 aspect ratio) under 5MB in size. Pair this with Twitter's <code>summary_large_image</code> card directive to trigger full-bleed card rendering across desktop and mobile feeds.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initOpenGraphView() {
  const titleInput = document.getElementById("og-title");
  const descInput = document.getElementById("og-desc");
  const urlInput = document.getElementById("og-url");
  const sitenameInput = document.getElementById("og-sitename");
  const imageInput = document.getElementById("og-image");
  const twitterInput = document.getElementById("og-twitter-handle");
  const cardTypeInput = document.getElementById("og-card-type");

  const cardImg = document.getElementById("card-preview-img");
  const cardDomain = document.getElementById("card-preview-domain");
  const cardTitle = document.getElementById("card-preview-title");
  const cardDesc = document.getElementById("card-preview-desc");
  const htmlOutput = document.getElementById("og-html-output");

  const sampleBtn = document.getElementById("og-sample-btn");
  const copyBtn = document.getElementById("og-copy-btn");

  function updateCard() {
    const title = titleInput.value || "Untitled Page";
    const desc = descInput.value || "Page description...";
    const url = urlInput.value || "https://example.com/";
    const sitename = sitenameInput.value || "My Site";
    const image = imageInput.value || "";
    const twitter = twitterInput.value || "@handle";
    const cardType = cardTypeInput.value || "summary_large_image";

    cardTitle.textContent = title;
    cardDesc.textContent = desc;
    if (image) cardImg.src = image;

    try {
      const u = new URL(url);
      cardDomain.textContent = u.hostname;
    } catch {
      cardDomain.textContent = "example.com";
    }

    const html = `<!-- Standard Meta Tags -->
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(desc)}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${escapeHtml(url)}" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(desc)}" />
<meta property="og:image" content="${escapeHtml(image)}" />
<meta property="og:site_name" content="${escapeHtml(sitename)}" />

<!-- Twitter / X -->
<meta name="twitter:card" content="${escapeHtml(cardType)}" />
<meta name="twitter:site" content="${escapeHtml(twitter)}" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(desc)}" />
<meta name="twitter:image" content="${escapeHtml(image)}" />`;

    htmlOutput.textContent = html;
  }

  [titleInput, descInput, urlInput, sitenameInput, imageInput, twitterInput, cardTypeInput].forEach(el => {
    el?.addEventListener("input", updateCard);
  });

  sampleBtn?.addEventListener("click", () => {
    titleInput.value = "NEXORA AI — Autonomous Intelligence Engine";
    descInput.value = "Fast client-side utilities, converters, JWT inspector, ZIP debugger, and 10-node autonomous agent consensus.";
    urlInput.value = "https://nexora.ai/";
    sitenameInput.value = "NEXORA AI";
    imageInput.value = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop";
    twitterInput.value = "@nexora_ai";
    updateCard();
    showToast("Sample metadata loaded", "info");
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(htmlOutput.textContent, "HTML Meta tags");
  });

  updateCard();
}
