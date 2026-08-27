// Web Developer Hub — Cookie & AdSense Consent Banner
// Ensures compliance with Google AdSense Policies & ePrivacy/GDPR

export function initCookieConsent() {
  if (typeof window === "undefined") return;

  const CONSENT_KEY = "webdevhub_cookie_consent_v1";
  const existingConsent = localStorage.getItem(CONSENT_KEY);

  if (existingConsent) {
    return; // User has already made their privacy choice
  }

  // Create consent banner container if not already present
  if (document.getElementById("cookie-consent-banner")) return;

  const banner = document.createElement("div");
  banner.id = "cookie-consent-banner";
  banner.className =
    "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md text-xs text-slate-300 animate-fadeIn";

  banner.innerHTML = `
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <span class="p-1 rounded-lg bg-indigo-500/20 text-indigo-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        </span>
        <h4 class="font-bold text-white text-xs">Privacy &amp; Cookie Preferences</h4>
      </div>
      <p class="text-slate-400 text-[11px] leading-relaxed">
        WebDevHub uses cookies and local storage to manage authentication, maintain secure sessions, and support free developer tools through non-intrusive advertisements. Learn more in our <a href="#/privacy-policy" class="text-indigo-400 underline hover:text-indigo-300">Privacy Policy</a>.
      </p>
      <div class="flex items-center justify-end gap-2 pt-1">
        <button id="cookie-consent-essential" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] transition">
          Essential Only
        </button>
        <button id="cookie-consent-accept" class="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition shadow-md shadow-indigo-600/20">
          Accept All
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  const acceptBtn = document.getElementById("cookie-consent-accept");
  const essentialBtn = document.getElementById("cookie-consent-essential");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice: "all", timestamp: new Date().toISOString() }));
      banner.remove();
    });
  }

  if (essentialBtn) {
    essentialBtn.addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice: "essential", timestamp: new Date().toISOString() }));
      banner.remove();
    });
  }
}
