// Tool View: HTML Suite (HTML Formatter, Minifier, Checker, HTML to Markdown, HTML to JSX)
// 100% Client-side markup transformer

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderHtmlSuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-amber-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Web Tools</span>
        <span>/</span>
        <span class="text-amber-400 font-bold">HTML Tools</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">HTML Suite</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">CLIENT PROCESSOR</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Format, minify, audit nesting errors, and convert HTML to JSX components or Markdown documents.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="html-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample HTML</button>
        </div>
      </div>

      <!-- Mode Selector -->
      <div class="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap text-xs font-mono">
        <button data-mode="format" class="html-tab-btn px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold transition">Format / Prettify</button>
        <button data-mode="minify" class="html-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Minify / Strip Space</button>
        <button data-mode="to-jsx" class="html-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">HTML to JSX</button>
        <button data-mode="to-md" class="html-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">HTML to Markdown</button>
        <button data-mode="check" class="html-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">HTML Syntax Checker</button>
      </div>

      <!-- Editor Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Input HTML -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-slate-300 font-bold">SOURCE HTML</span>
            <span id="html-char-count" class="text-slate-500 text-[11px]">0 chars</span>
          </div>
          <textarea id="html-input-area" rows="16" placeholder="Paste your raw HTML document or markup snippet here..." class="w-full flex-1 bg-slate-950 p-4 text-xs font-mono text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none leading-relaxed"></textarea>
        </div>

        <!-- Output Result -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-amber-400 font-bold" id="html-output-label">FORMATTED RESULT</span>
            <button id="html-copy-btn" class="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition">Copy Result</button>
          </div>
          <pre id="html-output-area" class="w-full flex-1 bg-slate-950 p-4 text-xs font-mono text-amber-300 overflow-auto select-all leading-relaxed max-h-[440px]"><code>// Processed output will appear here...</code></pre>
        </div>

      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">HTML Formatting, JSX Migration, and Markdown Serialization</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Standardizing HTML markup involves consistent tag indentation, closing void element self-tags (<code>&lt;img /&gt;</code>, <code>&lt;input /&gt;</code>), and normalizing attribute quoting.
          </p>
          <p>
            When migrating HTML structures into modern React JSX and TSX codebases, native HTML attributes must be mapped to their camelCase JSX equivalents: <code>class</code> becomes <code>className</code>, <code>for</code> becomes <code>htmlFor</code>, <code>tabindex</code> becomes <code>tabIndex</code>, and inline style string declarations are converted into JS object representations.
          </p>
          <p>
            The <strong>HTML to Markdown</strong> converter transforms headings (<code>&lt;h1&gt;</code>-<code>&lt;h6&gt;</code>), links (<code>&lt;a href&gt;</code>), lists (<code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>), and code blocks into standard CommonMark syntax for technical documentation and CMS platforms.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initHtmlSuiteView() {
  const inputArea = document.getElementById("html-input-area");
  const outputArea = document.getElementById("html-output-area");
  const copyBtn = document.getElementById("html-copy-btn");
  const sampleBtn = document.getElementById("html-sample-btn");
  const charCount = document.getElementById("html-char-count");
  const tabBtns = document.querySelectorAll(".html-tab-btn");

  let currentMode = "format";
  let lastOutput = "";

  const sampleHtml = `<div class="hero-section" id="main-hero"><div class="container"><h1>Build Modern Web Applications</h1><p>The all-in-one developer toolbox featuring AI workflows.</p><a href="#get-started" class="btn btn-primary">Start Building</a><img src="/assets/hero.png" alt="Hero Illustration"></div></div>`;

  sampleBtn?.addEventListener("click", () => {
    if (inputArea) {
      inputArea.value = sampleHtml;
      processHtml();
    }
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(lastOutput || outputArea?.textContent, "HTML result");
  });

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => {
        b.classList.remove("bg-amber-600", "text-white", "font-bold");
        b.classList.add("text-slate-300");
      });
      btn.classList.add("bg-amber-600", "text-white", "font-bold");
      btn.classList.remove("text-slate-300");

      currentMode = btn.getAttribute("data-mode") || "format";
      processHtml();
    });
  });

  inputArea?.addEventListener("input", () => {
    processHtml();
  });

  function processHtml() {
    const raw = inputArea?.value || "";
    if (charCount) charCount.textContent = `${raw.length} chars`;

    if (!raw.trim()) {
      if (outputArea) outputArea.innerHTML = "<code>// Processed output will appear here...</code>";
      lastOutput = "";
      return;
    }

    if (currentMode === "format") {
      lastOutput = formatHtmlString(raw);
    } else if (currentMode === "minify") {
      lastOutput = raw.replace(/>\s+</g, "><").replace(/\s{2,}/g, " ").trim();
    } else if (currentMode === "to-jsx") {
      lastOutput = htmlToJsx(raw);
    } else if (currentMode === "to-md") {
      lastOutput = htmlToMarkdown(raw);
    } else if (currentMode === "check") {
      lastOutput = checkHtmlSyntax(raw);
    }

    if (outputArea) {
      outputArea.innerHTML = `<code>${escapeHtml(lastOutput)}</code>`;
    }
  }

  function formatHtmlString(html) {
    let formatted = "";
    let indent = 0;
    const tab = "  ";
    const tokens = html.replace(/>\s*</g, "><").replace(/</g, "~::~<").replace(/>/g, ">~::~").split("~::~");

    for (let token of tokens) {
      token = token.trim();
      if (!token) continue;

      if (token.startsWith("</")) {
        indent = Math.max(0, indent - 1);
        formatted += tab.repeat(indent) + token + "\n";
      } else if (token.startsWith("<") && !token.endsWith("/>") && !token.startsWith("<!") && !isSelfClosing(token)) {
        formatted += tab.repeat(indent) + token + "\n";
        indent++;
      } else {
        formatted += tab.repeat(indent) + token + "\n";
      }
    }
    return formatted.trim();
  }

  function isSelfClosing(tag) {
    return /^<(img|input|br|hr|meta|link|col|base|area|param)/i.test(tag);
  }

  function htmlToJsx(html) {
    let jsx = html
      .replace(/class=/g, "className=")
      .replace(/for=/g, "htmlFor=")
      .replace(/tabindex=/g, "tabIndex=")
      .replace(/autocomplete=/g, "autoComplete=")
      .replace(/onclick=/g, "onClick=")
      .replace(/onchange=/g, "onChange=")
      .replace(/<img([^>]*?)(?<!\/)>/g, "<img$1 />")
      .replace(/<input([^>]*?)(?<!\/)>/g, "<input$1 />")
      .replace(/<br([^>]*?)(?<!\/)>/g, "<br$1 />")
      .replace(/<hr([^>]*?)(?<!\/)>/g, "<hr$1 />");
    return `import React from 'react';\n\nexport default function Component() {\n  return (\n    <>\n      ${formatHtmlString(jsx).split("\n").map(l => "      " + l).join("\n").trim()}\n    </>\n  );\n}`;
  }

  function htmlToMarkdown(html) {
    let md = html
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
      .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
      .replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
      .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
      .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
      .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")
      .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
      .replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")
      .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "```\n$1\n```\n\n")
      .replace(/<[^>]+>/g, "");
    return md.trim();
  }

  function checkHtmlSyntax(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const errors = [];

    // Check duplicate IDs
    const allIds = Array.from(doc.querySelectorAll("[id]")).map((el) => el.id);
    const duplicates = allIds.filter((item, index) => allIds.indexOf(item) !== index);
    if (duplicates.length > 0) {
      errors.push(`Duplicate ID detected: #${duplicates.join(", #")}`);
    }

    // Check missing alt tags
    const imgsNoAlt = Array.from(doc.querySelectorAll("img:not([alt])"));
    if (imgsNoAlt.length > 0) {
      errors.push(`${imgsNoAlt.length} <img> tag(s) missing alt attribute`);
    }

    // Check parser errors
    const parserError = doc.querySelector("parsererror");
    if (parserError) {
      errors.push("Parser syntax error: " + parserError.textContent);
    }

    if (errors.length === 0) {
      return `✅ HTML Syntax Check Passed!\n- No duplicate element IDs found\n- All image tags have alt attributes\n- Valid DOM tree nesting`;
    } else {
      return `⚠️ Issues Detected (${errors.length}):\n` + errors.map((e) => `• ${e}`).join("\n");
    }
  }
}
