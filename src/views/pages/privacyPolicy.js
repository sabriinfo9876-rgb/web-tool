// Static Page View: Privacy Policy (AdSense & GDPR Compliant)

export function renderPrivacyPolicyView() {
  return `
    <div class="space-y-6 max-w-4xl mx-auto animate-fadeIn text-slate-300">
      <div class="border-b border-slate-800 pb-4">
        <h1 class="text-3xl font-bold text-white tracking-tight">Privacy Policy</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Last Updated: January 2026 — Web Developer Hub</p>
      </div>

      <div class="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">1. Overview &amp; Client-First Architecture</h2>
          <p>
            At <strong>Web Developer Hub</strong> ("we", "our", or "us"), we are deeply committed to protecting developer privacy. Most of our tools (including JSON Formatter, JWT Decoder, Image Base64, Regex Sandbox, Hash Generator, and Code Minifier) operate <strong>100% locally in your browser memory</strong> using client-side JavaScript APIs (FileReader, Web Crypto API, Regex engine).
          </p>
          <p>
            Your sensitive API payloads, confidential JWT tokens, image uploads, and passwords are never transmitted to external logging servers or third-party tracking databases.
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">2. AI-Powered Services (Gemini 3.7 Flash)</h2>
          <p>
            When you explicitly use our generative AI features (such as <strong>AI Code-to-Design Transformer</strong>, <strong>UI Prompt Component Engine</strong>, or <strong>ZIP Architecture Audit</strong>), only the code or prompt text you explicitly submit is sent to our secure backend proxy to communicate with Google's Gemini API.
          </p>
          <p>
            Users may provide their own custom Gemini API Key stored strictly in their local browser <code>localStorage</code> for privacy.
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">3. Cookies &amp; Advertising Disclosures (Google AdSense)</h2>
          <p>
            We may partner with third-party advertising networks like Google AdSense to serve non-intrusive developer-focused advertisements. Google and its advertising partners use cookies to serve ads based on prior visits to this or other websites.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting Google Ads Settings (<code>www.google.com/settings/ads</code>).
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">4. Cloud Storage &amp; Firebase Firestore</h2>
          <p>
            If you use the <strong>Cloud Developer Snippet Vault</strong>, your saved snippets are persisted in a secure Google Cloud Firestore database protected by rigorous security rules.
          </p>
        </section>

        <section class="space-y-2">
          <h2 class="text-base sm:text-lg font-bold text-white">5. Contact Us</h2>
          <p>
            For privacy inquiries, GDPR data requests, or security audits, contact us at <code>privacy@webdeveloperhub.app</code>.
          </p>
        </section>
      </div>
    </div>
  `;
}

export function initPrivacyPolicyView() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
