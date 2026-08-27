// Web Developer Hub — Google AdSense Centralized Script Loader & Service
// Compliant with Google AdSense Policies: Single injection, lazy loading, failsafe when no client ID is present.

let isScriptInjected = false;
let isAdSenseReady = false;

export function getAdSenseClientId() {
  return (
    import.meta.env?.VITE_ADSENSE_CLIENT_ID ||
    (typeof window !== "undefined" && window.__ADSENSE_CLIENT_ID__) ||
    ""
  );
}

/**
 * Initializes and lazily injects the Google AdSense library script.
 * Guarantees idempotency — will never inject duplicate script tags.
 */
export function initAdSense() {
  if (typeof window === "undefined") return;
  if (isScriptInjected) return;

  const clientId = getAdSenseClientId();
  if (!clientId || clientId.trim() === "") {
    // Development / unconfigured state: Do not inject external script
    return;
  }

  // Check if script already exists in document
  const existing = document.querySelector(`script[src*="pagead2.googlesyndication.com"]`);
  if (existing) {
    isScriptInjected = true;
    isAdSenseReady = true;
    return;
  }

  try {
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId.trim())}`;
    script.onload = () => {
      isAdSenseReady = true;
    };
    script.onerror = (err) => {
      console.warn("Google AdSense script load note (safe fallback):", err);
    };
    document.head.appendChild(script);
    isScriptInjected = true;
  } catch (err) {
    console.warn("Could not inject AdSense script:", err);
  }
}

/**
 * Safely triggers adsbygoogle.push({}) after an ad element renders
 */
export function pushAdUnit() {
  if (typeof window === "undefined") return;
  try {
    const clientId = getAdSenseClientId();
    if (clientId && window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  } catch (e) {
    // Ignore AdSense push warnings when ad blockers or preview environments are active
  }
}
