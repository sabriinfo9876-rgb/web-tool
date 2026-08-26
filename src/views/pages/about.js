// Static Page View: About Us (AdSense Compliant)

export function renderAboutView() {
  return `
    <div class="space-y-6 max-w-4xl mx-auto animate-fadeIn text-slate-300">
      <div class="border-b border-slate-800 pb-4">
        <h1 class="text-3xl font-bold text-white tracking-tight">About Web Developer Hub</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">High-performance client developer utilities and AI-assisted design tooling.</p>
      </div>

      <div class="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section class="space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-white">Our Engineering Mission</h2>
          <p>
            <strong>Web Developer Hub</strong> was engineered by senior full-stack developers to solve the daily friction of modern web software development. Rather than juggling dozens of ad-cluttered websites for formatting JSON, converting PX to REM, decoding JWTs, or writing regular expressions, WebDevHub consolidates over 20+ privacy-first developer tools into a single lightning-fast single-page application.
          </p>
        </section>

        <section class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div class="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
            <span class="text-indigo-400 font-bold text-sm block">100% Client-Side Privacy</span>
            <p class="text-xs text-slate-400">Tokens, sensitive JSON, and code files are processed locally in your browser memory.</p>
          </div>
          <div class="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
            <span class="text-purple-400 font-bold text-sm block">Gemini 3.7 Flash AI</span>
            <p class="text-xs text-slate-400">Turn raw unstructured code into unique, responsive, modern Tailwind &amp; React designs.</p>
          </div>
          <div class="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
            <span class="text-cyan-400 font-bold text-sm block">Cloud Synchronized</span>
            <p class="text-xs text-slate-400">Save snippets securely to Firebase Firestore across all your devices.</p>
          </div>
        </section>

        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">Built for High Velocity</h2>
          <p>
            Every tool is designed with keyboard shortcuts, dark-mode ergonomics, instant copy-to-clipboard, and live preview rendering to keep developers in a continuous state of flow.
          </p>
        </section>
      </div>
    </div>
  `;
}

export function initAboutView() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
