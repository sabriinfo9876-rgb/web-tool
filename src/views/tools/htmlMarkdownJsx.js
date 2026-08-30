// Tool View: HTML to Markdown & React JSX Converter with SEO Guide

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderHtmlMarkdownJsxView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">HTML to Markdown &amp; React JSX Converter</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-pink-500/10 text-pink-400 border border-pink-500/30">PARSER</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Convert raw HTML markup into GitHub-flavored Markdown or valid React JSX with self-closing tags and camelCase attributes.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="hmj-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample HTML</button>
          <button id="hmj-clear-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-300 transition">Clear</button>
        </div>
      </div>

      <!-- Converter Workspace -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Input HTML Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>INPUT HTML MARKUP</span>
            <span id="hmj-input-stats">0 lines</span>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <textarea id="hmj-input" rows="14" placeholder='<div class="card" onclick="handleClick()">\n  <h1>Title</h1>\n  <p>Hello <a href="#">World</a></p>\n</div>' class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-pink-400 resize-y leading-relaxed flex-1"></textarea>
          </div>
        </div>

        <!-- Output Column (Tabs for Markdown and React JSX) -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div class="flex items-center gap-1.5">
              <button id="hmj-tab-md" class="px-2.5 py-1 rounded bg-pink-600 text-white font-bold">Markdown (.md)</button>
              <button id="hmj-tab-jsx" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">React JSX (.tsx)</button>
            </div>
            <button id="hmj-copy-btn" class="px-3 py-1 rounded-lg bg-pink-500 hover:bg-pink-400 text-slate-950 text-xs font-bold transition">Copy Converted</button>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <pre class="w-full flex-1 bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-pink-300 font-mono overflow-auto leading-relaxed select-all"><code id="hmj-output-code"># Converted output will appear here...</code></pre>
          </div>
        </div>

      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">HTML to Markdown &amp; React JSX Transformation Mechanics</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Modern web development frequently involves migrating legacy static HTML documents into modern headless CMS architectures, static site generators (like Next.js, Astro, and Gatsby), and React component design systems.
          </p>
          <p>
            When converting to <strong>GitHub Flavored Markdown (GFM)</strong>, heading hierarchies (<code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>) map to hash prefixes (<code>#</code> to <code>######</code>), list items map to bullet characters, links transform to <code>[Anchor](URL)</code> syntax, and code blocks receive fenced backtick notation.
          </p>
          <p>
            When converting to <strong>React JSX</strong>, standard HTML attribute names must be transformed into their camelCase JavaScript DOM equivalents: <code>class</code> becomes <code>className</code>, <code>for</code> becomes <code>htmlFor</code>, <code>tabindex</code> becomes <code>tabIndex</code>, and void tags (<code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code>) are automatically closed with XML-compliant self-closing slashes (<code>/&gt;</code>).
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initHtmlMarkdownJsxView() {
  const input = document.getElementById("hmj-input");
  const output = document.getElementById("hmj-output-code");
  const stats = document.getElementById("hmj-input-stats");
  const sampleBtn = document.getElementById("hmj-sample-btn");
  const clearBtn = document.getElementById("hmj-clear-btn");
  const copyBtn = document.getElementById("hmj-copy-btn");
  const tabMd = document.getElementById("hmj-tab-md");
  const tabJsx = document.getElementById("hmj-tab-jsx");

  let activeTab = "md";

  const sampleHtml = `<div class="hero-section" id="hero">
  <h1>Welcome to NEXORA AI</h1>
  <p>The <strong>ultimate</strong> suite of developer tools and <em>autonomous neural agents</em>.</p>
  <ul>
    <li>Fast client-side execution</li>
    <li>Zero network tracking</li>
    <li>10-Node Neural Consensus</li>
  </ul>
  <img src="https://example.com/logo.png" alt="Logo" class="logo-img">
  <input type="text" placeholder="Search tools..." class="search-box">
  <br>
  <a href="https://nexora.ai">Learn more</a>
</div>`;

  function htmlToMarkdown(html) {
    let md = html;
    // Headings
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n");
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n");
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n");
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n");
    // Bold & Italics
    md = md.replace(/<(strong|b)[^>]*>(.*?)<\/\1>/gi, "**$2**");
    md = md.replace(/<(em|i)[^>]*>(.*?)<\/\1>/gi, "*$2*");
    // Links & Images
    md = md.replace(/<a[^>]*href=["'](.*?)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)");
    md = md.replace(/<img[^>]*src=["'](.*?)["'][^>]*alt=["'](.*?)["'][^>]*\/?>/gi, "![$2]($1)");
    md = md.replace(/<img[^>]*src=["'](.*?)["'][^>]*\/?>/gi, "![]($1)");
    // Lists
    md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n");
    md = md.replace(/<\/?(ul|ol)>/gi, "\n");
    // Paragraphs & Breaks
    md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n");
    md = md.replace(/<br\s*\/?>/gi, "\n");
    md = md.replace(/<hr\s*\/?>/gi, "\n---\n");
    // Strip remaining tags
    md = md.replace(/<[^>]+>/g, "");
    // Clean up empty lines
    md = md.replace(/\n{3,}/g, "\n\n").trim();
    return md;
  }

  function htmlToJsx(html) {
    let jsx = html;
    // class -> className
    jsx = jsx.replace(/\bclass=/g, "className=");
    // for -> htmlFor
    jsx = jsx.replace(/\bfor=/g, "htmlFor=");
    // onclick -> onClick, etc
    jsx = jsx.replace(/\bon([a-z]+)=/g, (match, p1) => `on${p1.charAt(0).toUpperCase() + p1.slice(1)}=`);
    // tabindex -> tabIndex
    jsx = jsx.replace(/\btabindex=/g, "tabIndex=");
    // autocomplete -> autoComplete
    jsx = jsx.replace(/\bautocomplete=/g, "autoComplete=");
    // autofocus -> autoFocus
    jsx = jsx.replace(/\bautofocus=/g, "autoFocus=");
    // self-closing void elements: img, input, br, hr, meta, link
    jsx = jsx.replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/gi, "<$1$2 />");
    return jsx;
  }

  function convert() {
    const raw = input.value.trim();
    if (!raw) {
      output.textContent = "# Converted output will appear here...";
      stats.textContent = "0 lines";
      return;
    }

    const lines = raw.split("\n").length;
    stats.textContent = `${lines} lines`;

    if (activeTab === "md") {
      output.textContent = htmlToMarkdown(raw);
    } else {
      output.textContent = htmlToJsx(raw);
    }
  }

  input?.addEventListener("input", convert);

  tabMd?.addEventListener("click", () => {
    activeTab = "md";
    tabMd.className = "px-2.5 py-1 rounded bg-pink-600 text-white font-bold";
    tabJsx.className = "px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300";
    convert();
  });

  tabJsx?.addEventListener("click", () => {
    activeTab = "jsx";
    tabJsx.className = "px-2.5 py-1 rounded bg-pink-600 text-white font-bold";
    tabMd.className = "px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300";
    convert();
  });

  sampleBtn?.addEventListener("click", () => {
    input.value = sampleHtml;
    convert();
    showToast("Sample HTML loaded", "info");
  });

  clearBtn?.addEventListener("click", () => {
    input.value = "";
    convert();
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(output.textContent, activeTab === "md" ? "Markdown" : "React JSX");
  });

  input.value = sampleHtml;
  convert();
}
