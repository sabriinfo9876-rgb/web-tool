// Static Page View: Privacy Policy (GDPR, CCPA & Google AdSense Compliant)

import { BRAND_CONFIG } from "../../config/branding.js";

export function renderPrivacyPolicyView() {
  return `
    <div class="space-y-8 max-w-4xl mx-auto animate-fadeIn text-slate-300 py-4">
      <div class="border-b border-slate-800 pb-5">
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
          <span>LEGAL &amp; COMPLIANCE</span>
        </div>
        <h1 class="text-3xl font-bold text-white tracking-tight">Privacy Policy</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Effective Date: January 2026 &bull; NEXORA AI</p>
      </div>

      <div class="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section class="space-y-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <h2 class="text-base font-bold text-white flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
            1. Client-Side First Architecture &amp; Data Minimization
          </h2>
          <p>
            At <strong>NEXORA AI</strong>, we prioritize local, memory-only execution. The majority of our 74 developer utilities (including JSON Formatter, JWT Decoder, Regex Tester, Base64 converters, Minifiers, and Hashes) execute <strong>100% locally in your web browser memory</strong> via Web Cryptography, Canvas, and Web Worker APIs.
          </p>
          <p>
            Confidential payload inputs, private keys, passwords, and JSON payloads processed via client-side tools are never sent to external servers or telemetry logs.
          </p>
        </section>

        <section class="space-y-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <h2 class="text-base font-bold text-white flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
            2. Autonomous Neural Engine &amp; Generative Intelligence
          </h2>
          <p>
            When you explicitly invoke NEXORA AI features (e.g., <strong>Autonomous Developer Agent</strong>, <strong>AI Code Refactor</strong>, <strong>Fix My GitHub Project</strong>, <strong>Make Responsive</strong>, or <strong>Clean My Code</strong>), your prompt and target code snippet are transmitted over encrypted HTTPS to our server-side neural orchestration engine to perform AST verification, multi-node synthesis, and unified diff computation.
          </p>
          <p>
            We do not store your private AI prompts in public databases or train public models on your proprietary source code. Server-side quota counters track daily usage anonymously or by authenticated user identifier to enforce fair-use limits.
          </p>
        </section>

        <section class="space-y-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <h2 class="text-base font-bold text-white flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
            3. Advertising &amp; Google AdSense Disclosures
          </h2>
          <p>
            Free tier users may see advertisements served via <strong>Google AdSense</strong>. Google and its third-party advertising partners use cookies and web beacons to serve ads based on visits to NEXORA AI and other sites on the internet.
          </p>
          <p>
            Developer Pro and Team Workspace subscribers receive an <strong>100% ad-free experience</strong> with all advertising scripts and ad units disabled.
          </p>
          <p>
            Users may opt out of personalized advertising at any time by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline hover:text-cyan-300">Google Ads Settings</a> or through the <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline hover:text-cyan-300">Digital Advertising Alliance Consumer Choice page</a>.
          </p>
        </section>

        <section class="space-y-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <h2 class="text-base font-bold text-white flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
            4. Payment Processing (Safepay)
          </h2>
          <p>
            Subscription payments for Developer Pro and Team Workspace are processed securely through <strong>Safepay</strong> (https://getsafepay.com). NEXORA AI never stores, logs, or processes your raw credit card numbers or banking credentials. Safepay handles transactions under PCI-DSS standards.
          </p>
          <p>
            Our servers receive only transactional verification tokens and webhook lifecycle updates (e.g. <code>payment.completed</code>, <code>subscription.cancelled</code>) to grant appropriate tier privileges.
          </p>
        </section>

        <section class="space-y-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <h2 class="text-base font-bold text-white flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
            5. User Accounts &amp; Cloud Storage (Firebase)
          </h2>
          <p>
            User authentication (Email/Password and Google OAuth) and Cloud Snippet Vault storage are hosted securely via cloud storage. You can export or delete your stored code snippets and profile at any time from your Account Settings.
          </p>
        </section>

        <section class="space-y-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <h2 class="text-base font-bold text-white flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
            6. Contact Information &amp; Data Rights
          </h2>
          <p>
            For GDPR data access requests, deletion inquiries, or security inquiries, please contact our privacy officer at <a href="#/contact" class="text-cyan-400 underline">support@nexora.ai</a>.
          </p>
        </section>
      </div>
    </div>
  `;
}

export function initPrivacyPolicyView() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
