// NEXORA AI — React AdUnit Component
import React, { useEffect } from "react";
import { shouldShowAds } from "../config/plans.js";
import { getCurrentUser } from "../auth.js";
import { getAdSenseClientId, pushAdUnit, initAdSense } from "../lib/adsense.js";

export function AdUnit({ slotId = "", format = "horizontal", className = "" }) {
  const user = getCurrentUser();

  useEffect(() => {
    if (shouldShowAds(user)) {
      initAdSense();
      pushAdUnit();
    }
  }, [user]);

  if (!shouldShowAds(user)) {
    return null;
  }

  const clientId = getAdSenseClientId();
  const isConfigured = Boolean(clientId && clientId.trim() !== "");
  const minHeightClass = format === "rectangle" ? "min-h-[250px]" : "min-h-[90px]";

  if (isConfigured) {
    return (
      <div className={`w-full my-6 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 p-2 text-center transition-all ${minHeightClass} ${className}`} data-ad-container="true">
        <div className="mb-1 text-[10px] font-medium tracking-wider text-slate-500 uppercase">Advertisement</div>
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={slotId || "1234567890"}
          data-ad-format={format === "rectangle" ? "rectangle" : "auto"}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div className={`w-full my-5 overflow-hidden rounded-xl border border-dashed border-slate-800/80 bg-slate-900/30 p-3 text-center transition-all ${minHeightClass} flex flex-col items-center justify-center gap-1.5 ${className}`} data-ad-container="true">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Developer Sponsor &bull; Google AdSense Ready</span>
      <p className="text-xs text-slate-400 max-w-md">
        Free tier supported by non-intrusive developer advertising.{" "}
        <a href="#/pricing" className="text-indigo-400 hover:text-indigo-300 font-medium underline">
          Upgrade to Pro
        </a>{" "}
        for 100% ad-free experience.
      </p>
    </div>
  );
}

export default AdUnit;
