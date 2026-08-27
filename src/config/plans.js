// Web Developer Hub — Monetization, Plans & Limits Configuration
// Single source of truth for Quotas, Pricing, and Plan tiers

export const PLANS = {
  FREE: {
    id: "free",
    name: "Free Developer",
    badge: "FREE",
    priceMonthly: 0,
    priceAnnual: 0,
    aiDailyLimit: 3,
    snippetLimit: 5,
    features: [
      "Access to all 74+ core developer utilities",
      "JSON Formatter, HTML, CSS & Regex suites",
      "JWT Safe Client Decoder & Base64 tools",
      "3 AI Requests per day",
      "Up to 5 Cloud Vault Snippets",
      "Standard client-side processing",
      "Community support",
    ],
    proBadge: false,
  },
  PRO: {
    id: "pro",
    name: "Developer Pro",
    badge: "PRO",
    priceMonthly: 19,
    priceAnnual: 190, // $15.83/mo billed annually
    aiDailyLimit: 100,
    snippetLimit: Infinity,
    features: [
      "Everything in Free Developer plan",
      "100 AI Requests per day (Gemini 3.7 Flash)",
      "Unlimited Cloud Snippet Vault storage",
      "Fix My GitHub Project Automated PR Generator",
      "Code Sign & Cryptographic Gatekeeper",
      "AI Code Refactor with Deep / Performance modes",
      "AI Make Responsive full viewport suite",
      "Advanced ZIP Architecture & Security Scanner",
      "Priority processing & zero wait times",
      "Direct GitHub OAuth sync & branch rollback",
    ],
    proBadge: true,
  },
  TEAM: {
    id: "team",
    name: "Team & Enterprise",
    badge: "TEAM",
    priceMonthly: 49,
    priceAnnual: 490,
    aiDailyLimit: 500,
    snippetLimit: Infinity,
    features: [
      "Everything in Developer Pro plan",
      "Up to 10 team member seats",
      "Shared Team Cloud Snippet Library",
      "Team-wide Code Sign approval logs",
      "Centralized billing & seat allocation",
      "Priority SLA & Dedicated engineering support",
    ],
    proBadge: true,
  },
};

export const QUOTA_CONFIG = {
  FREE_AI_DAILY_LIMIT: 3,
  PRO_AI_DAILY_LIMIT: 100,
  TEAM_AI_DAILY_LIMIT: 500,
  FREE_SNIPPET_LIMIT: 5,
  PRO_SNIPPET_LIMIT: Infinity,
};

export function getPlanLimits(planId = "free") {
  const normalized = (planId || "free").toLowerCase();
  if (normalized === "pro") return PLANS.PRO;
  if (normalized === "team") return PLANS.TEAM;
  return PLANS.FREE;
}
