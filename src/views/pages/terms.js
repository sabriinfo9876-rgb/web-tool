// Static Page View: Terms of Service

export function renderTermsView() {
  return `
    <div class="space-y-8 max-w-4xl mx-auto animate-fadeIn text-slate-300 py-4">
      <div class="border-b border-slate-800 pb-5">
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
          <span>LEGAL &amp; COMPLIANCE</span>
        </div>
        <h1 class="text-3xl font-bold text-white tracking-tight">Terms of Service</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Effective Date: January 2026 &bull; Web Developer Hub</p>
      </div>

      <div class="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section class="space-y-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <h2 class="text-base font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using WebDevHub (https://web-tool-eta-orcin.vercel.app/), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of the platform.
          </p>
        </section>

        <section class="space-y-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <h2 class="text-base font-bold text-white">2. Free and Paid Services</h2>
          <p>
            WebDevHub provides 68 core developer utilities free of charge with an allowance of 74 AI operations per day. Paid plans (Developer Pro at $7.99/month or $59/year, and Team Workspace at $29/month) grant access to all 6 premium tools, higher AI allowances (3,000/mo and 10,000/mo respectively), and an ad-free experience.
          </p>
        </section>

        <section class="space-y-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <h2 class="text-base font-bold text-white">3. Fair Use &amp; Acceptable Behavior</h2>
          <p>
            You agree not to use WebDevHub for malicious activities, including generating malware, launching automated denial-of-service attacks, attempting to circumvent AI quota limits, or conducting fraudulent billing activities.
          </p>
        </section>

        <section class="space-y-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <h2 class="text-base font-bold text-white">4. Subscriptions &amp; Billing via Safepay</h2>
          <p>
            Paid subscriptions recur automatically on a monthly or annual basis until canceled. Subscriptions are billed through Safepay. You can cancel your subscription at any time through your Developer Dashboard, and your access will remain active until the conclusion of the paid billing period.
          </p>
        </section>

        <section class="space-y-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <h2 class="text-base font-bold text-white">5. Disclaimer of Warranties</h2>
          <p>
            WebDevHub tools and AI suggestions are provided "AS IS" without warranty of any kind. Developers are encouraged to review generated code and automated PRs prior to deployment into production environments.
          </p>
        </section>
      </div>
    </div>
  `;
}

export function initTermsView() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
