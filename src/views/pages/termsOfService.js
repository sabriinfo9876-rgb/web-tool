// Static Page View: Terms of Service (SaaS Monetization & Compliance)

export function renderTermsOfServiceView() {
  return `
    <div class="space-y-6 max-w-4xl mx-auto animate-fadeIn text-slate-300">
      <div class="border-b border-slate-800 pb-4">
        <h1 class="text-3xl font-bold text-white tracking-tight">Terms of Service</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Effective Date: January 2026 — Web Developer Hub</p>
      </div>

      <div class="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or using <strong>Web Developer Hub</strong> ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">2. Description of Service &amp; Plans</h2>
          <p>
            Web Developer Hub provides client-side developer utilities, security formatters, and AI-assisted software engineering tools.
          </p>
          <ul class="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong>Free Plan:</strong> Includes unlimited access to 68 core developer tools, 74 daily AI operations, and non-intrusive advertising.</li>
            <li><strong>Developer Pro Plan ($7.99/mo or $59/yr):</strong> Unlocks all 6 premium tools (including Automated GitHub PR Repair, ECDSA Code Sign &amp; Approve, Deep AI Refactor, Clean Code, Make Responsive), 3,000 monthly AI operations, unlimited Cloud Vault storage, and an entirely ad-free experience.</li>
            <li><strong>Team Workspace Plan ($29/mo):</strong> Includes all Pro features, up to 10 team seats, shared team snippet libraries, and 10,000 pooled monthly AI operations.</li>
          </ul>
        </section>

        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">3. Billing &amp; Payment Processing (Safepay)</h2>
          <p>
            Paid subscriptions are securely processed by <strong>Safepay</strong>. All fees are clearly displayed before checkout. Subscriptions automatically renew at the selected cadence (monthly or annually) unless canceled prior to the renewal date. You may cancel your subscription at any time from your Developer Dashboard.
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">4. Acceptable Use &amp; Abuse Prevention</h2>
          <p>
            You agree not to misuse the Service, reverse engineer internal APIs, launch denial-of-service attacks, or submit malicious payloads designed to bypass rate limits or compromise server infrastructure. Automated scraping of AI endpoints is strictly prohibited.
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">5. Intellectual Property &amp; User Code</h2>
          <p>
            You retain 100% ownership and copyright of any source code, snippets, and project files you process, format, or refactor through Web Developer Hub. We do not claim any proprietary rights over user-generated code.
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">6. Limitation of Liability</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. While we maintain 99.9% uptime and rigorous cryptographic security, Web Developer Hub shall not be liable for indirect, incidental, or consequential damages resulting from your use of the Service.
          </p>
        </section>
      </div>
    </div>
  `;
}

export function initTermsOfServiceView() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
