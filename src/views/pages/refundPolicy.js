// Static Page View: Refund & Cancellation Policy (Safepay & SaaS Compliance)

export function renderRefundPolicyView() {
  return `
    <div class="space-y-6 max-w-4xl mx-auto animate-fadeIn text-slate-300">
      <div class="border-b border-slate-800 pb-4">
        <h1 class="text-3xl font-bold text-white tracking-tight">Refund &amp; Cancellation Policy</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Effective Date: January 2026 — Web Developer Hub</p>
      </div>

      <div class="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">1. Subscription Cancellation</h2>
          <p>
            You may cancel your <strong>Developer Pro</strong> or <strong>Team Workspace</strong> subscription at any time without fees or penalties directly through your <strong>Developer Dashboard &rarr; Billing</strong> or by contacting our engineering support team.
          </p>
          <p>
            Upon cancellation, your subscription remains fully active with all premium features and ad-free browsing until the end of your current paid billing period. At the conclusion of the billing cycle, your account automatically returns to the Free tier without interruption to your saved data.
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">2. 14-Day Money-Back Guarantee</h2>
          <p>
            We stand by the quality of our developer tools. If you are not satisfied with your Developer Pro subscription within the first <strong>14 days</strong> of your initial upgrade, contact our support team at <code>billing@webdeveloperhub.app</code>, and we will issue a full refund back to your original payment method via Safepay.
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">3. Annual Plan Prorations</h2>
          <p>
            Annual subscriptions benefit from a ~38% discount. If an annual subscription is canceled after the 14-day window, you retain full access for the remaining duration of the 12-month period.
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">4. Chargebacks &amp; Inquiries</h2>
          <p>
            If you notice an unfamiliar charge or have questions about an invoice, please contact our billing team before initiating a chargeback so we can assist and resolve any discrepancies immediately.
          </p>
        </section>
      </div>
    </div>
  `;
}

export function initRefundPolicyView() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
