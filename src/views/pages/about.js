// Static Page View: About Us (AdSense Compliant)

import { BRAND_CONFIG } from "../../config/branding.js";

export function renderAboutView() {
  return `
    <div class="space-y-6 max-w-4xl mx-auto animate-fadeIn text-slate-300">
      <div class="border-b border-slate-800 pb-4">
        <h1 class="text-3xl font-bold text-white tracking-tight">About NEXORA AI</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Autonomous intelligence engine and high-performance developer workspace.</p>
      </div>

      <div class="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section class="space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-white">Our Engineering Mission</h2>
          <p>
            <strong>NEXORA AI</strong> was engineered to revolutionize software development by combining 74 deterministic client-side developer utilities with an autonomous 10-node neural consensus engine. Rather than juggling disparate tools and disjointed AI services, NEXORA consolidates code generation, transformation, security auditing, and AST verification into a unified intelligence ecosystem.
          </p>
        </section>

        <section class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div class="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
            <span class="text-cyan-400 font-bold text-sm block">100% Client-Side Privacy</span>
            <p class="text-xs text-slate-400">Tokens, sensitive JSON, and code files are processed locally in your browser memory.</p>
          </div>
          <div class="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
            <span class="text-purple-400 font-bold text-sm block">10-Node Neural Consensus</span>
            <p class="text-xs text-slate-400">Multi-brain parallel analysis with AST cross-verification and unified diff generation.</p>
          </div>
          <div class="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
            <span class="text-indigo-400 font-bold text-sm block">Cloud Synchronized</span>
            <p class="text-xs text-slate-400">Save snippets securely to cloud storage across all your devices.</p>
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
