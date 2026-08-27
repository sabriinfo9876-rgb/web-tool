// Web Developer Hub — Google AdSense Reusable Component
// Policy Safe: Shows only for FREE & Anonymous visitors; Completely hidden for PRO and TEAM users.
// Prevents CLS (Cumulative Layout Shift) by reserving container space.

import { shouldShowAds } from "../config/plans.js";
import { getCurrentUser } from "../auth.js";
import { getAdSenseClientId, pushAdUnit, initAdSense } from "../lib/adsense.js";

/**
 * Generates the HTML for an AdSense Ad Unit.
 * Returns empty string if the user has an active PRO or TEAM plan.
 *
 * @param {Object} options
 * @param {string} [options.slotId] - Google AdSense ad slot identifier
 * @param {string} [options.format] - "auto", "horizontal", "rectangle", "responsive"
 * @param {string} [options.customClass] - Additional CSS class names
 * @param {string} [options.placementId] - Unique ID for ad container
 * @returns {string} HTML string
 */
export function renderAdUnit({
  slotId = "",
  format = "horizontal",
  customClass = "",
  placementId = `ad-unit-${Math.random().toString(36).substring(2, 9)}`,
} = {}) {
  const user = getCurrentUser();

  // STAGE 1: Access Control Check — Never render ads for PRO or TEAM users
  if (!shouldShowAds(user)) {
    return "";
  }

  const clientId = getAdSenseClientId();
  const isConfigured = Boolean(clientId && clientId.trim() !== "");

  // Height reservation to avoid Cumulative Layout Shift (CLS)
  const minHeightClass = format === "rectangle" ? "min-h-[250px]" : "min-h-[90px]";

  if (isConfigured) {
    // Production AdSense unit
    return `
      <div id="${placementId}" class="w-full my-6 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 p-2 text-center transition-all ${minHeightClass} ${customClass}" data-ad-container="true">
        <div class="mb-1 text-[10px] font-medium tracking-wider text-slate-500 uppercase">Advertisement</div>
        <ins class="adsbygoogle block w-full"
             style="display:block"
             data-ad-client="${clientId}"
             data-ad-slot="${slotId || "1234567890"}"
             data-ad-format="${format === "rectangle" ? "rectangle" : "auto"}"
             data-full-width-responsive="true"></ins>
      </div>
    `;
  }

  // AdSense-ready placeholder for development & preview (Non-deceptive, developer styled)
  return `
    <div id="${placementId}" class="w-full my-5 overflow-hidden rounded-xl border border-dashed border-slate-800/80 bg-slate-900/30 p-3 text-center transition-all ${minHeightClass} flex flex-col items-center justify-center gap-1.5 ${customClass}" data-ad-container="true">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Developer Sponsor &bull; Google AdSense Ready</span>
      <p class="text-xs text-slate-400 max-w-md">Free tier supported by non-intrusive developer advertising. <a href="#/pricing" class="text-indigo-400 hover:text-indigo-300 font-medium underline">Upgrade to Pro</a> for 100% ad-free experience.</p>
    </div>
  `;
}

/**
 * Initializes Ad Units on page load / view mount
 */
export function initAdUnits() {
  const user = getCurrentUser();
  if (!shouldShowAds(user)) {
    // Remove any lingering ad containers if user upgraded to PRO
    document.querySelectorAll('[data-ad-container="true"]').forEach((el) => el.remove());
    return;
  }

  initAdSense();
  pushAdUnit();
}
