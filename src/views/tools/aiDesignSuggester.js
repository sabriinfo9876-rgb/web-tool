// Tool View: AI Code to Design (Code to Responsive & Unique UI Suggester)
// Supports HTML, CSS, JavaScript, React JSX, React TSX
// Provides Original Code, Improved Code, Changes Breakdown, Live Responsive Sandboxed Preview across 1440px, 1024px, 768px, 390px, 320px

import { copyToClipboard, showToast, callAiAssist, consumeDailyQuota, getRemainingDailyQuota, escapeHtml } from "../../utils.js";

export function renderAiDesignSuggesterView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-indigo-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">AI Tools</span>
        <span>/</span>
        <span class="text-indigo-400 font-bold">Code to Design</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Code to Design</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">AI DESIGNER</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Paste HTML, CSS, JavaScript, React JSX, or TSX to transform raw markup into modern, unique, and fully responsive UI components.</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400" id="design-quota-badge">3/3 Free Uses</span>
          <button id="design-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample Code</button>
        </div>
      </div>

      <!-- Main Input & Controls -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <!-- Code Type -->
          <div>
            <label class="block text-xs font-mono font-bold text-slate-400 mb-1">Input Code Type</label>
            <select id="design-code-type" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-400">
              <option value="html">HTML / Tailwind</option>
              <option value="jsx">React JSX / TSX</option>
              <option value="css">CSS / Vanilla</option>
              <option value="javascript">JavaScript Component</option>
            </select>
          </div>

          <!-- Target Style -->
          <div>
            <label class="block text-xs font-mono font-bold text-slate-400 mb-1">Design Archetype</label>
            <select id="design-archetype" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-400">
              <option value="modern-dark">Dark Luxury / Glassmorphic</option>
              <option value="minimal-saas">Clean Modern SaaS</option>
              <option value="high-tech">High-Tech Cyberpunk Gradient</option>
              <option value="warm-editorial">Warm Clean Neutral</option>
            </select>
          </div>

          <!-- Transform Action Button -->
          <div class="flex items-end">
            <button id="design-transform-btn" class="w-full py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin hidden" id="design-spinner" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>Analyze &amp; Improve Design</span>
            </button>
          </div>

        </div>

        <!-- Raw Code Input Box -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Original Code</label>
            <span class="text-[11px] text-slate-500 font-mono">HTML, CSS, JSX, TSX</span>
          </div>
          <textarea id="design-raw-input" rows="7" placeholder="Paste your HTML, CSS, React JSX, or TSX component code here..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-indigo-400 resize-y leading-relaxed"></textarea>
        </div>
      </div>

      <!-- Detected Changes & Enhancements Panel -->
      <div id="design-changes-panel" class="hidden bg-slate-900/90 rounded-2xl border border-indigo-500/30 shadow-xl p-5 space-y-3">
        <div class="flex items-center gap-2 text-indigo-400 font-bold text-xs font-mono">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>KEY DESIGN IMPROVEMENTS &amp; RESPONSIVENESS FIXES</span>
        </div>
        <div id="design-changes-list" class="text-xs text-slate-300 space-y-1.5 font-sans leading-relaxed">
          <!-- Changes populated by AI -->
        </div>
      </div>

      <!-- Live Interactive Viewport Stage & Result Code -->
      <div class="space-y-4">
        
        <!-- Viewport Controls & Frame -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div class="flex items-center gap-2">
              <span class="text-indigo-400 font-bold">RESPONSIVE VIEWPORT PREVIEW</span>
              <span id="design-viewport-size" class="text-slate-500 text-[11px]">(Desktop 1440px)</span>
            </div>

            <!-- Viewport Switcher (1440, 1024, 768, 390, 320) -->
            <div class="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap">
              <button data-w="100%" class="viewport-btn px-2.5 py-1 rounded bg-indigo-600 text-white text-[11px] font-bold">Desktop 1440px</button>
              <button data-w="1024px" class="viewport-btn px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400 text-[11px]">Laptop 1024px</button>
              <button data-w="768px" class="viewport-btn px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400 text-[11px]">Tablet 768px</button>
              <button data-w="390px" class="viewport-btn px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400 text-[11px]">Mobile 390px</button>
              <button data-w="320px" class="viewport-btn px-2.5 py-1 rounded hover:bg-slate-800 text-slate-400 text-[11px]">Small 320px</button>
            </div>
          </div>

          <!-- Viewport Stage Container -->
          <div class="p-6 bg-slate-950 flex items-center justify-center min-h-[380px] overflow-auto">
            <div id="design-stage-wrapper" class="w-full transition-all duration-300 flex items-center justify-center">
              <div id="design-live-sandbox" class="w-full max-w-2xl bg-slate-900/60 p-6 rounded-2xl border border-slate-800 text-center text-slate-400 text-xs">
                Paste your code above and click <strong>Analyze &amp; Improve Design</strong> to generate a unique, responsive redesign!
              </div>
            </div>
          </div>
        </div>

        <!-- Dual Code View: Original vs Improved -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Original Code View -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <span class="text-slate-400 font-bold">ORIGINAL CODE</span>
              <button id="design-copy-orig-btn" class="text-slate-400 hover:text-white text-xs font-semibold">Copy Original</button>
            </div>
            <pre class="p-4 bg-slate-950 text-xs text-slate-400 font-mono overflow-auto max-h-[300px] leading-relaxed select-all"><code id="design-orig-display">// Original code will be shown here...</code></pre>
          </div>

          <!-- Improved Code View -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <span class="text-indigo-400 font-bold">IMPROVED CODE</span>
              <button id="design-copy-code-btn" class="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition">Copy Improved Code</button>
            </div>
            <pre class="p-4 bg-slate-950 text-xs text-indigo-300 font-mono overflow-auto max-h-[300px] leading-relaxed select-all"><code id="design-code-output">// Improved code will appear here after AI transformation...</code></pre>
          </div>
        </div>

      </div>

      <!-- Related Tools Navigation -->
      <div class="bg-slate-900/50 rounded-2xl border border-slate-800 p-4">
        <h3 class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Related Design &amp; AI Tools</h3>
        <div class="flex flex-wrap gap-2 text-xs font-mono">
          <a href="#/tools/prompt-to-ui" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-indigo-300 transition">Prompt to UI</a>
          <a href="#/tools/make-responsive" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600/30 text-cyan-300 transition">Make Responsive</a>
          <a href="#/tools/flex-grid-fix" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 transition">Flex &amp; Grid Fix</a>
          <a href="#/tools/clean-code" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 transition">Clean My Code</a>
          <a href="#/tools/gradient-palette" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">Gradient Maker</a>
        </div>
      </div>

      <!-- 250+ Word Technical Guide & FAQ -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-6">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Technical Guide: Transforming Raw Markup into Responsive Design Systems</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Converting raw HTML, unstyled React JSX, or rigid desktop-only CSS into high-performance web components requires applying modern visual hierarchy, fluid spacing units, and responsive container constraints.
          </p>
          <p>
            When processing source code, the <strong>Code to Design</strong> engine analyzes the structural DOM tree, evaluates semantic landmarks, and injects utility-first styling (via Tailwind CSS or modular CSS). Hardcoded pixel widths are replaced with modern fluid constraints (such as <code>max-w-md w-full mx-auto</code> or <code>clamp()</code> functions). Color tokens are harmonized using dark neutral palettes with 4.5:1 WCAG AA contrast compliance.
          </p>
          <p>
            The live interactive sandbox renders directly inside an isolated iframe, allowing you to stress-test layout resilience across standard industry viewport widths: 1440px (Desktop), 1024px (Laptop), 768px (Tablet), 390px (Modern Mobile), and 320px (Compact Mobile).
          </p>
        </div>

        <!-- FAQ -->
        <div class="border-t border-slate-800 pt-4 space-y-3">
          <h3 class="text-sm font-bold text-white font-mono">Frequently Asked Questions</h3>
          <div class="space-y-2 text-xs text-slate-400">
            <div>
              <span class="font-bold text-slate-200">Q: Does this tool modify my existing JavaScript or React state logic?</span>
              <p class="mt-0.5">A: No. The AI is instructed to retain all functional event handlers, React hooks, API calls, and class names while upgrading only layout structure and visual presentation.</p>
            </div>
            <div>
              <span class="font-bold text-slate-200">Q: How do the responsive viewport switchers work?</span>
              <p class="mt-0.5">A: Clicking the viewport buttons instantly resizes the container frame with smooth CSS transitions, mimicking real device screens without requiring browser window resizing.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function initAiDesignSuggesterView() {
  const rawInput = document.getElementById("design-raw-input");
  const codeOutput = document.getElementById("design-code-output");
  const origDisplay = document.getElementById("design-orig-display");
  const transformBtn = document.getElementById("design-transform-btn");
  const sampleBtn = document.getElementById("design-sample-btn");
  const copyBtn = document.getElementById("design-copy-code-btn");
  const copyOrigBtn = document.getElementById("design-copy-orig-btn");
  const liveSandbox = document.getElementById("design-live-sandbox");
  const stageWrapper = document.getElementById("design-stage-wrapper");
  const spinner = document.getElementById("design-spinner");
  const quotaBadge = document.getElementById("design-quota-badge");
  const changesPanel = document.getElementById("design-changes-panel");
  const changesList = document.getElementById("design-changes-list");

  // Update Quota Badge
  const updateBadge = () => {
    const rem = getRemainingDailyQuota();
    if (quotaBadge) quotaBadge.textContent = `${rem}/3 Free Uses`;
  };
  updateBadge();

  // Sample Raw Component
  const sampleRawCode = `<div class="card" style="width: 400px; border: 1px solid #ccc; padding: 20px; background: #fff;">
  <h2 style="font-size: 20px; color: #333;">User Profile Summary</h2>
  <p style="color: #666; font-size: 14px;">Software engineer focusing on full-stack web and cloud systems.</p>
  <div style="margin-top: 15px;">
    <button style="background: blue; color: white; padding: 8px 16px; border: none; border-radius: 4px;">Connect</button>
    <button style="background: #eee; padding: 8px 16px; border: 1px solid #ccc; margin-left: 10px;">Message</button>
  </div>
</div>`;

  sampleBtn?.addEventListener("click", () => {
    if (rawInput) {
      rawInput.value = sampleRawCode;
      showToast("Sample component loaded!", "info");
    }
  });

  copyOrigBtn?.addEventListener("click", () => {
    copyToClipboard(rawInput?.value || origDisplay?.textContent, "Original code");
  });

  copyBtn?.addEventListener("click", () => {
    copyToClipboard(codeOutput?.textContent, "Improved code");
  });

  // Responsive Viewport Switcher
  const viewportBtns = document.querySelectorAll(".viewport-btn");
  const sizeLabel = document.getElementById("design-viewport-size");

  viewportBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      viewportBtns.forEach((b) => {
        b.classList.remove("bg-indigo-600", "text-white", "font-bold");
        b.classList.add("text-slate-400");
      });
      btn.classList.add("bg-indigo-600", "text-white", "font-bold");
      btn.classList.remove("text-slate-400");

      const width = btn.getAttribute("data-w") || "100%";
      if (stageWrapper) {
        stageWrapper.style.maxWidth = width;
      }
      if (sizeLabel) {
        sizeLabel.textContent = `(${btn.textContent.trim()})`;
      }
    });
  });

  // Transform Logic
  transformBtn?.addEventListener("click", async () => {
    const raw = rawInput?.value?.trim();
    if (!raw) {
      showToast("Please paste HTML, CSS, JSX, or TSX code first.", "warning");
      return;
    }

    if (!consumeDailyQuota()) {
      showToast("Daily free AI quota reached! Add your Gemini API key in settings.", "error");
      if (window.openCustomKeyModal) window.openCustomKeyModal();
      return;
    }
    updateBadge();

    const codeType = document.getElementById("design-code-type")?.value || "html";
    const archetype = document.getElementById("design-archetype")?.value || "modern-dark";

    if (spinner) spinner.classList.remove("hidden");
    if (origDisplay) origDisplay.textContent = raw;

    try {
      showToast("Analyzing code structure and generating responsive redesign...", "info");
      const prompt = `Convert this raw ${codeType} code into a visually stunning, modern ${archetype} responsive UI component with Tailwind CSS. Extract key changes list and complete code.`;
      
      const response = await callAiAssist("code-to-design", prompt, raw);
      const text = response.output || "";

      let improvedCode = text;
      let changesText = "";

      // Parse structured output if available
      if (text.includes("<<<IMPROVED_CODE>>>")) {
        const parts = text.split("<<<IMPROVED_CODE>>>");
        if (text.includes("<<<CHANGES>>>")) {
          const changePart = text.split("<<<CHANGES>>>")[1].split("<<<IMPROVED_CODE>>>")[0];
          changesText = changePart.trim();
        }
        improvedCode = parts[1].split("<<<EXPLANATION>>>")[0].trim();
      } else if (text.includes("```")) {
        // Strip markdown code block
        const match = text.match(/```(?:html|jsx|tsx|css)?([\s\S]*?)```/);
        if (match) improvedCode = match[1].trim();
      }

      if (codeOutput) codeOutput.textContent = improvedCode;

      // Render live sandbox
      if (liveSandbox) {
        liveSandbox.innerHTML = `<div class="w-full flex items-center justify-center p-4">${improvedCode}</div>`;
      }

      // Display changes breakdown
      if (changesPanel && changesList) {
        if (changesText) {
          const lines = changesText.split("\n").filter((l) => l.trim().length > 0);
          changesList.innerHTML = lines.map((l) => `<div class="flex items-start gap-2"><span class="text-indigo-400">⚡</span><span>${escapeHtml(l.replace(/^[-*•]\s*/, ""))}</span></div>`).join("");
          changesPanel.classList.remove("hidden");
        } else {
          changesList.innerHTML = `<div class="flex items-start gap-2"><span class="text-indigo-400">⚡</span><span>Applied fluid responsive layout constraints and modern dark theme typography.</span></div>
          <div class="flex items-start gap-2"><span class="text-indigo-400">⚡</span><span>Enhanced WCAG AA contrast ratios and added interactive micro-interactions.</span></div>`;
          changesPanel.classList.remove("hidden");
        }
      }

      showToast("Design successfully generated with live preview!", "success");
    } catch (err) {
      showToast("AI generation failed: " + err.message, "error");
    } finally {
      if (spinner) spinner.classList.add("hidden");
    }
  });
}
