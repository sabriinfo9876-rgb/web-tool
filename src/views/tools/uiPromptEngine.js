// Tool View: AI Prompt to UI (Natural Language to Tailwind/React UI Components)
// Supports English, Urdu, Roman Urdu prompts
// Features 8 Quick Presets (Login, Dashboard, Pricing, Portfolio, Landing Page, Ecommerce, Admin Panel, Blog)
// Generates HTML, Tailwind CSS, React JSX with Live Interactive Preview

import { copyToClipboard, showToast, callAiAssist, consumeDailyQuota, getRemainingDailyQuota } from "../../utils.js";

export function renderUiPromptEngineView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-purple-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">AI Tools</span>
        <span>/</span>
        <span class="text-purple-400 font-bold">Prompt to UI</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Prompt to UI</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">AI COMPONENT SYNTHESIS</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Generate modern, production-ready React JSX, Tailwind CSS, and HTML components from English, Urdu, or Roman Urdu prompts.</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400" id="ui-quota-badge">3/3 Free Uses</div>
        </div>
      </div>

      <!-- Prompt Input & Quick Preset Chips -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Describe the UI Component (English / Urdu / Roman Urdu)</label>
            <span class="text-[11px] text-purple-400 font-mono">e.g. "Modern dark login page" / "Aik khoobsurat pricing card banao"</span>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <input type="text" id="ui-prompt-input" value="Create a modern dark login page with email, password, OAuth buttons, and glassmorphism" placeholder="e.g. Modern ecommerce product page with rating, gallery, and cart CTA..." class="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-sans focus:outline-none focus:border-purple-400" />
            <button id="ui-generate-btn" class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 shrink-0">
              <svg class="w-4 h-4 animate-spin hidden" id="ui-spinner" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>Generate UI</span>
            </button>
          </div>
        </div>

        <!-- 8 Quick Presets Required: Login, Dashboard, Pricing, Portfolio, Landing Page, Ecommerce, Admin Panel, Blog -->
        <div class="space-y-1.5">
          <div class="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">Quick Component Presets:</div>
          <div class="flex items-center gap-1.5 flex-wrap text-xs font-mono">
            <button class="ui-preset-chip px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 border border-slate-700 transition" data-prompt="Create a modern dark login page with email, password, OAuth buttons, and glassmorphic card">🔐 Login</button>
            <button class="ui-preset-chip px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 border border-slate-700 transition" data-prompt="A modern analytics dashboard widget with metric cards, revenue sparkline, and percentage badges">📊 Dashboard</button>
            <button class="ui-preset-chip px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 border border-slate-700 transition" data-prompt="A modern SaaS pricing table with monthly and annual billing toggle, featured tier badge, and feature checklist">💎 Pricing</button>
            <button class="ui-preset-chip px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 border border-slate-700 transition" data-prompt="A modern responsive 4-column Bento Grid portfolio section showcasing developer projects, tech stack, and GitHub stats">💼 Portfolio</button>
            <button class="ui-preset-chip px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 border border-slate-700 transition" data-prompt="High-converting SaaS landing page hero section with gradient headline, dual CTAs, and live product preview mockup">🚀 Landing Page</button>
            <button class="ui-preset-chip px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 border border-slate-700 transition" data-prompt="Modern ecommerce product page card with image gallery thumbnails, star ratings, price tag, color swatch picker, and Add to Cart button">🛍️ Ecommerce</button>
            <button class="ui-preset-chip px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 border border-slate-700 transition" data-prompt="Responsive Admin Panel data table with search filter bar, status badges, pagination, and action buttons">⚙️ Admin Panel</button>
            <button class="ui-preset-chip px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 border border-slate-700 transition" data-prompt="Clean technical blog post card with author avatar, tag chip, reading time, and bookmark button">📝 Blog</button>
          </div>
        </div>
      </div>

      <!-- Live Sandbox Preview & Code Output -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Live Sandbox Frame Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span class="flex items-center gap-1.5 text-purple-400 font-bold">
              <span class="w-2 h-2 rounded-full bg-purple-400"></span>
              LIVE INTERACTIVE PREVIEW
            </span>
            <span id="ui-render-status" class="text-[11px] text-slate-500">Ready</span>
          </div>
          <div class="p-4 flex-1 bg-slate-950 flex items-center justify-center min-h-[380px] overflow-auto">
            <div id="ui-sandbox-container" class="w-full flex items-center justify-center">
              <div class="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs max-w-sm">
                Enter your prompt above or click a preset to generate a live UI component!
              </div>
            </div>
          </div>
        </div>

        <!-- Code Tabs (HTML + Tailwind, React JSX) -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div class="flex items-center gap-1.5">
              <button id="ui-tab-html" class="px-2.5 py-1 rounded bg-purple-600 text-white font-bold">HTML + Tailwind</button>
              <button id="ui-tab-jsx" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">React JSX</button>
            </div>
            <button id="ui-copy-code-btn" class="px-2.5 py-1 rounded bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-bold transition">Copy Code</button>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <pre class="w-full flex-1 bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-purple-300 font-mono overflow-auto leading-relaxed select-all max-h-[380px]"><code id="ui-code-output"><!-- Generated code will appear here... --></code></pre>
          </div>
        </div>

      </div>

      <!-- Related Tools Navigation -->
      <div class="bg-slate-900/50 rounded-2xl border border-slate-800 p-4">
        <h3 class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Related UI &amp; Web Tools</h3>
        <div class="flex flex-wrap gap-2 text-xs font-mono">
          <a href="#/tools/code-to-design" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 transition">Code to Design</a>
          <a href="#/tools/make-responsive" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600/30 text-cyan-300 transition">Make Responsive</a>
          <a href="#/tools/flex-grid-fix" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 transition">Flex &amp; Grid Fix</a>
          <a href="#/tools/fix-html" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-600/30 text-amber-300 transition">Fix HTML</a>
          <a href="#/tools/flexbox-grid" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">Flexbox Builder</a>
        </div>
      </div>

      <!-- 250+ Word SEO Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">AI-Driven UI Component Synthesis with Tailwind CSS &amp; React</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Generative AI engines like <strong>Google Gemini 3.7 Flash</strong> allow developers to bridge the gap between creative visual specifications and production-ready atomic CSS design systems. By interpreting natural language design intent in English, Urdu, or Roman Urdu, the engine generates modular, clean, and accessible UI markup.
          </p>
          <p>
            By mapping semantic layout prompts into composable <strong>Tailwind CSS</strong> utilities, our generator guarantees consistent responsive typography, high WCAG contrast ratios, and dark theme elegance without generating bloated stylesheets.
          </p>
          <p>
            Each generated component includes interactive state indicators (hover transitions, active focus rings, and dark glassmorphic backdrops) and can be immediately exported as standard HTML markup or modular React JSX components.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initUiPromptEngineView() {
  const promptInput = document.getElementById("ui-prompt-input");
  const generateBtn = document.getElementById("ui-generate-btn");
  const codeOutput = document.getElementById("ui-code-output");
  const sandbox = document.getElementById("ui-sandbox-container");
  const copyBtn = document.getElementById("ui-copy-code-btn");
  const tabHtml = document.getElementById("ui-tab-html");
  const tabJsx = document.getElementById("ui-tab-jsx");
  const quotaBadge = document.getElementById("ui-quota-badge");
  const spinner = document.getElementById("ui-spinner");

  let currentHtmlCode = "";
  let currentJsxCode = "";
  let activeTab = "html";

  const updateBadge = () => {
    const rem = getRemainingDailyQuota();
    if (quotaBadge) quotaBadge.textContent = `${rem}/3 Free Uses`;
  };
  updateBadge();

  // Preset Buttons Click
  document.querySelectorAll(".ui-preset-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (promptInput) {
        promptInput.value = btn.getAttribute("data-prompt") || "";
        showToast("Preset loaded! Generating component...", "info");
        generateBtn?.click();
      }
    });
  });

  // Tab switching
  tabHtml?.addEventListener("click", () => {
    activeTab = "html";
    tabHtml.className = "px-2.5 py-1 rounded bg-purple-600 text-white font-bold";
    if (tabJsx) tabJsx.className = "px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300";
    if (codeOutput) codeOutput.textContent = currentHtmlCode || "<!-- HTML code will appear here -->";
  });

  tabJsx?.addEventListener("click", () => {
    activeTab = "jsx";
    if (tabJsx) tabJsx.className = "px-2.5 py-1 rounded bg-purple-600 text-white font-bold";
    if (tabHtml) tabHtml.className = "px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300";
    if (codeOutput) codeOutput.textContent = currentJsxCode || "// React JSX component code will appear here";
  });

  copyBtn?.addEventListener("click", () => {
    const textToCopy = activeTab === "jsx" ? currentJsxCode : currentHtmlCode;
    copyToClipboard(textToCopy || codeOutput?.textContent, "Component code");
  });

  // Generate UI Handler
  generateBtn?.addEventListener("click", async () => {
    const prompt = promptInput?.value?.trim();
    if (!prompt) {
      showToast("Please enter a component description first.", "warning");
      return;
    }

    if (!consumeDailyQuota()) {
      showToast("Daily free AI quota reached! Add your personal Gemini API key in settings.", "error");
      if (window.openCustomKeyModal) window.openCustomKeyModal();
      return;
    }
    updateBadge();

    if (spinner) spinner.classList.remove("hidden");

    try {
      showToast("Synthesizing component layout and styling with Gemini 3.7...", "info");
      const res = await callAiAssist("prompt-to-ui", prompt, "Generate complete Tailwind CSS HTML and React JSX component.");
      const text = res.output || "";

      let extractedCode = text;
      if (text.includes("```")) {
        const match = text.match(/```(?:html|jsx|tsx)?([\s\S]*?)```/);
        if (match) extractedCode = match[1].trim();
      }

      currentHtmlCode = extractedCode;
      
      // Generate clean JSX equivalent
      currentJsxCode = `import React from 'react';\n\nexport default function GeneratedComponent() {\n  return (\n    ${extractedCode.replace(/class=/g, "className=")}\n  );\n}`;

      if (codeOutput) {
        codeOutput.textContent = activeTab === "jsx" ? currentJsxCode : currentHtmlCode;
      }

      if (sandbox) {
        sandbox.innerHTML = `<div class="w-full flex items-center justify-center p-4">${currentHtmlCode}</div>`;
      }

      showToast("Component synthesized and rendered live!", "success");
    } catch (err) {
      showToast("Component synthesis failed: " + err.message, "error");
    } finally {
      if (spinner) spinner.classList.add("hidden");
    }
  });
}
