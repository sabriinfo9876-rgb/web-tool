// Tool View: AI Code to Responsive & Unique Design Suggester (Flagship User Feature)
// "jab koi code paste kerain to ai isko design suggest kerai jo responsive ho or unique ho"

import { copyToClipboard, showToast, callAiAssist, consumeDailyQuota, getRemainingDailyQuota, escapeHtml } from "../../utils.js";

export function renderAiDesignSuggesterView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">AI Code-to-Design &amp; Responsive Transformer</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">GEMINI 3.7 CODER</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Paste your existing messy HTML, React JSX, or CSS code to transform it into a unique, highly polished, fully responsive UI design with instant preview.</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400" id="design-quota-badge">3/3 Free Uses</span>
          <button id="design-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample Code</button>
        </div>
      </div>

      <!-- Main Input & Controls -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <!-- Design Style Archetype -->
          <div>
            <label class="block text-xs font-mono font-bold text-slate-400 mb-1">Aesthetic Archetype</label>
            <select id="design-archetype" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-400">
              <option value="dark-futuristic">Dark Modern / Neo-Glassmorphism</option>
              <option value="minimal-luxury">Minimalist Warm Luxury</option>
              <option value="cyberpunk-neon">High-Tech Cyberpunk Accent</option>
              <option value="clean-corporate">Clean Enterprise Dashboard</option>
            </select>
          </div>

          <!-- Target Framework -->
          <div>
            <label class="block text-xs font-mono font-bold text-slate-400 mb-1">Output Format</label>
            <select id="design-framework" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-400">
              <option value="html-tailwind">HTML5 + Tailwind CSS</option>
              <option value="react-tailwind">React JSX + Tailwind CSS</option>
              <option value="clean-css">Semantic HTML + Raw CSS</option>
            </select>
          </div>

          <!-- Transform Action Button -->
          <div class="flex items-end">
            <button id="design-transform-btn" class="w-full py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span>Transform to Unique Responsive UI</span>
            </button>
          </div>

        </div>

        <!-- Raw Code Input Box -->
        <div>
          <label class="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">Paste Raw Code or Layout</label>
          <textarea id="design-raw-input" rows="6" placeholder="Paste your HTML, React component, or CSS here..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-indigo-400 resize-y leading-relaxed"></textarea>
        </div>
      </div>

      <!-- Live Interactive Viewport Stage & Result Code -->
      <div class="space-y-4">
        
        <!-- Viewport Controls & Frame -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div class="flex items-center gap-2">
              <span class="text-indigo-400 font-bold">RESPONSIVE VIEWPORT PREVIEW</span>
              <span id="design-viewport-size" class="text-slate-500 text-[11px]">(Desktop 100%)</span>
            </div>

            <!-- Viewport Switcher Pills -->
            <div class="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button data-w="100%" class="viewport-btn px-2 py-1 rounded bg-indigo-600 text-white text-[11px] font-bold">Desktop</button>
              <button data-w="768px" class="viewport-btn px-2 py-1 rounded hover:bg-slate-800 text-slate-400 text-[11px]">Tablet (768px)</button>
              <button data-w="390px" class="viewport-btn px-2 py-1 rounded hover:bg-slate-800 text-slate-400 text-[11px]">Mobile (390px)</button>
            </div>
          </div>

          <!-- Viewport Stage Container -->
          <div class="p-6 bg-slate-950 flex items-center justify-center min-h-[380px] overflow-auto">
            <div id="design-stage-wrapper" class="w-full transition-all duration-300 flex items-center justify-center">
              <div id="design-live-sandbox" class="w-full max-w-2xl bg-slate-900/60 p-6 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
                Paste your code above and click <strong>Transform to Unique Responsive UI</strong> to generate a unique, responsive redesign!
              </div>
            </div>
          </div>
        </div>

        <!-- Generated Source Code Box -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-slate-400 font-bold">REDESIGNED SOURCE CODE</span>
            <button id="design-copy-code-btn" class="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition">Copy Generated Code</button>
          </div>
          <div class="p-4">
            <pre class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-indigo-300 font-mono overflow-auto max-h-[300px] leading-relaxed"><code id="design-code-output"><!-- Generated code will be displayed here --></code></pre>
          </div>
        </div>

      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Responsive Fluid Design &amp; AI-Powered Semantic Refactoring</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Modern web development demands responsive layouts that adapt seamlessly from 320px mobile screens to 4K ultra-wide monitors without causing layout shifts or overlapping text elements.
          </p>
          <p>
            Our AI engine analyzes the functional intent of your code and upgrades it with <strong>Tailwind CSS</strong> responsive prefixes (<code>sm:</code>, <code>md:</code>, <code>lg:</code>, <code>xl:</code>), modern CSS Grid tracks, fluid typography (<code>clamp()</code>), and WCAG-compliant color contrasts.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initAiDesignSuggesterView() {
  const rawInput = document.getElementById("design-raw-input");
  const transformBtn = document.getElementById("design-transform-btn");
  const sampleBtn = document.getElementById("design-sample-btn");
  const stageWrapper = document.getElementById("design-stage-wrapper");
  const liveSandbox = document.getElementById("design-live-sandbox");
  const codeOutput = document.getElementById("design-code-output");
  const copyBtn = document.getElementById("design-copy-code-btn");
  const quotaBadge = document.getElementById("design-quota-badge");
  const archetypeSelect = document.getElementById("design-archetype");
  const frameworkSelect = document.getElementById("design-framework");

  const viewportButtons = document.querySelectorAll(".viewport-btn");
  const viewportSizeLabel = document.getElementById("design-viewport-size");

  const sampleRawCode = `<div class="card">
  <h2>User Profile</h2>
  <img src="avatar.jpg" />
  <p>Developer from Karachi</p>
  <button>Contact Me</button>
</div>`;

  function updateQuota() {
    const rem = getRemainingDailyQuota();
    quotaBadge.textContent = `${rem}/3 Free Uses`;
  }

  // Viewport Switcher
  viewportButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      viewportButtons.forEach(b => {
        b.className = "viewport-btn px-2 py-1 rounded hover:bg-slate-800 text-slate-400 text-[11px]";
      });
      btn.className = "viewport-btn px-2 py-1 rounded bg-indigo-600 text-white text-[11px] font-bold";

      const targetWidth = btn.dataset.w;
      stageWrapper.style.maxWidth = targetWidth;
      viewportSizeLabel.textContent = `(${btn.textContent})`;
    });
  });

  sampleBtn?.addEventListener("click", () => {
    rawInput.value = sampleRawCode;
    showToast("Sample raw code loaded", "info");
  });

  transformBtn?.addEventListener("click", async () => {
    const code = rawInput.value.trim();
    if (!code) {
      showToast("Please paste code to transform", "warning");
      return;
    }

    if (!consumeDailyQuota()) {
      showToast("Daily quota reached! Click Custom Key in header for unlimited uses.", "warning");
      window.openCustomKeyModal?.();
      return;
    }
    updateQuota();

    transformBtn.disabled = true;
    transformBtn.innerHTML = `<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> <span>AI Redesigning...</span>`;

    try {
      const prompt = `Style archetype: ${archetypeSelect.value}, Framework: ${frameworkSelect.value}.\nCode:\n${code}`;
      const res = await callAiAssist("design-suggest", prompt);

      if (res.code) {
        liveSandbox.innerHTML = res.code;
        codeOutput.textContent = res.code;
        showToast("Code successfully redesigned into a responsive, unique UI!", "success");
      } else {
        throw new Error("No code returned from AI engine");
      }
    } catch (err) {
      showToast("Transformation error: " + err.message, "error");
    } finally {
      transformBtn.disabled = false;
      transformBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> <span>Transform to Unique Responsive UI</span>`;
    }
  });

  copyBtn?.addEventListener("click", () => {
    if (!codeOutput.textContent) {
      showToast("Nothing to copy", "warning");
      return;
    }
    copyToClipboard(codeOutput.textContent, "Generated UI Code");
  });

  rawInput.value = sampleRawCode;
  updateQuota();
}
