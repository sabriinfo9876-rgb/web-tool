// Tool View: AI UI Prompt to Design Engine with Preset Component Library, Gemini 3.7 & SEO Guide

import { copyToClipboard, showToast, callAiAssist, consumeDailyQuota, getRemainingDailyQuota } from "../../utils.js";

export function renderUiPromptEngineView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">AI UI Prompt to Component Engine</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">GEMINI 3.7 FLASH</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Generate modern HTML + Tailwind CSS + React JSX components from natural language prompts with interactive preview.</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400" id="ui-quota-badge">3/3 Free Uses</div>
        </div>
      </div>

      <!-- Prompt Input & Preset Chips -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div class="space-y-2">
          <label class="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Describe the UI Component to Generate</label>
          <div class="flex flex-col sm:flex-row gap-3">
            <input type="text" id="ui-prompt-input" value="A modern dark glassmorphic SaaS pricing card with featured tier highlight, badge, feature checklist, and CTA button" placeholder="e.g. A sleek analytics metric card with sparkline chart, trend pill, and dark theme..." class="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-sans focus:outline-none focus:border-purple-400" />
            <button id="ui-generate-btn" class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span>Generate UI</span>
            </button>
          </div>
        </div>

        <!-- Quick Preset Component Chips -->
        <div class="flex items-center gap-1.5 flex-wrap text-xs font-mono">
          <span class="text-slate-500">Presets:</span>
          <button class="ui-preset-chip px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" data-prompt="A dark glassmorphic SaaS pricing card with featured badge and checklist">SaaS Pricing Card</button>
          <button class="ui-preset-chip px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" data-prompt="A modern responsive 4-column Bento Grid for developer portfolio metrics">Bento Grid</button>
          <button class="ui-preset-chip px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" data-prompt="A sleek sticky navigation bar with blurred backdrop, logo, search input, and profile avatar">SaaS Navbar</button>
          <button class="ui-preset-chip px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300" data-prompt="A clean authentication modal with email, password, OAuth buttons, and subtle neon border">Auth Modal</button>
        </div>
      </div>

      <!-- Live Sandbox Preview & Code Tabs -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Live Sandbox Frame Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span class="flex items-center gap-1.5 text-purple-400 font-bold">
              <span class="w-2 h-2 rounded-full bg-purple-400"></span>
              LIVE INTERACTIVE SANDBOX
            </span>
            <span id="ui-render-status">Rendered Ready</span>
          </div>
          <div class="p-4 flex-1 bg-slate-950 flex items-center justify-center min-h-[360px] overflow-auto">
            <div id="ui-sandbox-container" class="w-full flex items-center justify-center">
              <!-- Live Component is injected here -->
            </div>
          </div>
        </div>

        <!-- Code Tabs (HTML+Tailwind, React JSX) -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div class="flex items-center gap-1.5">
              <button id="ui-tab-html" class="px-2.5 py-1 rounded bg-purple-600 text-white font-bold">HTML + Tailwind</button>
              <button id="ui-tab-jsx" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">React JSX</button>
            </div>
            <button id="ui-copy-code-btn" class="px-2.5 py-1 rounded bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-bold transition">Copy Code</button>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <pre class="w-full flex-1 bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-purple-300 font-mono overflow-auto leading-relaxed select-all max-h-[360px]"><code id="ui-code-output"><!-- Generated code will appear here... --></code></pre>
          </div>
        </div>

      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">AI-Driven UI Component Synthesis with Tailwind CSS &amp; React</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Generative AI engines like <strong>Google Gemini 3.7 Flash</strong> allow developers to bridge the gap between creative visual specifications and production-ready atomic CSS design systems.
          </p>
          <p>
            By mapping semantic layout prompts into composable <strong>Tailwind CSS</strong> utilities, our generator guarantees consistent responsive typography, high WCAG contrast ratios, and dark theme elegance without generating bloated stylesheets.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initUiPromptEngineView() {
  const promptInput = document.getElementById("ui-prompt-input");
  const generateBtn = document.getElementById("ui-generate-btn");
  const sandbox = document.getElementById("ui-sandbox-container");
  const codeOutput = document.getElementById("ui-code-output");
  const renderStatus = document.getElementById("ui-render-status");
  const quotaBadge = document.getElementById("ui-quota-badge");

  const tabHtml = document.getElementById("ui-tab-html");
  const tabJsx = document.getElementById("ui-tab-jsx");
  const copyBtn = document.getElementById("ui-copy-code-btn");
  const presetChips = document.querySelectorAll(".ui-preset-chip");

  let activeCodeTab = "html";
  let currentHtmlCode = "";

  const defaultComponent = `<div class="max-w-sm w-full bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl space-y-4 backdrop-blur-md">
  <div class="flex items-center justify-between">
    <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">PRO TIER</span>
    <span class="text-xs text-slate-400 font-mono">$29/mo</span>
  </div>
  <div>
    <h3 class="text-lg font-bold text-white">Full-Stack Dev Hub</h3>
    <p class="text-xs text-slate-400 mt-1">Unlimited access to all 20+ utilities and AI design tools.</p>
  </div>
  <ul class="space-y-2 text-xs text-slate-300">
    <li class="flex items-center gap-2">✓ Unlimited AI Code Redesigns</li>
    <li class="flex items-center gap-2">✓ Deep ZIP Repository Health Audits</li>
    <li class="flex items-center gap-2">✓ Cloud Firestore Database Sync</li>
  </ul>
  <button class="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs shadow-lg transition">Upgrade to Pro</button>
</div>`;

  function renderComponent(html) {
    currentHtmlCode = html;
    sandbox.innerHTML = html;
    updateCodeTab();
    renderStatus.textContent = "Rendered Ready";
  }

  function updateCodeTab() {
    if (activeCodeTab === "html") {
      codeOutput.textContent = currentHtmlCode;
    } else {
      // Simple JSX conversion
      const jsx = currentHtmlCode
        .replace(/class=/g, "className=")
        .replace(/<!--[\s\S]*?-->/g, "");
      codeOutput.textContent = `export default function GeneratedComponent() {\n  return (\n    ${jsx.split("\n").map(l => "    " + l).join("\n").trim()}\n  );\n}`;
    }
  }

  function updateQuota() {
    const rem = getRemainingDailyQuota();
    quotaBadge.textContent = `${rem}/3 Free Uses`;
  }

  async function generateUI() {
    const prompt = promptInput.value.trim();
    if (!prompt) {
      showToast("Please enter a component description", "warning");
      return;
    }

    if (!consumeDailyQuota()) {
      showToast("Daily quota reached! Click Custom Key in header for unlimited uses.", "warning");
      window.openCustomKeyModal?.();
      return;
    }
    updateQuota();

    renderStatus.textContent = "AI Synthesizing...";
    generateBtn.disabled = true;
    generateBtn.innerHTML = `<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> <span>Generating...</span>`;

    try {
      const data = await callAiAssist("ui-prompt", prompt);
      if (data.code) {
        renderComponent(data.code);
        showToast("UI Component synthesized successfully!", "success");
      } else {
        throw new Error("No code returned");
      }
    } catch (err) {
      showToast("Error generating component: " + err.message, "error");
      renderStatus.textContent = "Synthesis failed";
    } finally {
      generateBtn.disabled = false;
      generateBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> <span>Generate UI</span>`;
    }
  }

  generateBtn?.addEventListener("click", generateUI);

  presetChips.forEach(chip => {
    chip.addEventListener("click", () => {
      promptInput.value = chip.dataset.prompt;
      generateUI();
    });
  });

  tabHtml?.addEventListener("click", () => {
    activeCodeTab = "html";
    tabHtml.className = "px-2.5 py-1 rounded bg-purple-600 text-white font-bold";
    tabJsx.className = "px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300";
    updateCodeTab();
  });

  tabJsx?.addEventListener("click", () => {
    activeCodeTab = "jsx";
    tabJsx.className = "px-2.5 py-1 rounded bg-purple-600 text-white font-bold";
    tabHtml.className = "px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300";
    updateCodeTab();
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(codeOutput.textContent, "Component code");
  });

  renderComponent(defaultComponent);
  updateQuota();
}
