// Web Developer Hub — Monetization, Plans & Limits Configuration
// Single source of truth for Quotas, Pricing, and Plan tiers (Powered by Safepay)

export const PLANS = {
  FREE: {
    id: "free",
    name: "Free Developer",
    badge: "FREE",
    currency: "USD",
    currencySymbol: "$",
    priceMonthly: 0,
    priceAnnual: 0,
    aiDailyLimit: 74,
    aiMonthlyLimit: 2220,
    basicTools: "unlimited",
    snippetLimit: 5,
    features: [
      "Unlimited access to all 74+ core developer utilities & formatters",
      "74 AI operations per day (Gemini 3.7 Flash)",
      "JSON Formatter, HTML, CSS, Regex, JWT & API suites",
      "Up to 5 Cloud Snippet Vault entries",
      "Client-side Secret Scanner & Redactor",
      "Automatic daily quota reset at 00:00 UTC",
      "Community support",
    ],
    proBadge: false,
  },
  PRO: {
    id: "pro",
    name: "Developer Pro",
    badge: "PRO",
    currency: "USD",
    currencySymbol: "$",
    priceMonthly: 7.99,
    priceAnnual: 59, // ~$4.92/mo billed annually ($7.99 * 12 = $95.88 -> $59 save ~38%)
    annualSavingsPercent: 38,
    aiDailyLimit: 200,
    aiMonthlyLimit: 3000,
    basicTools: "unlimited",
    snippetLimit: Infinity,
    features: [
      "Everything in Free Developer plan",
      "3,000 AI operations per month (High-speed priority queue)",
      "Unlimited Cloud Snippet Vault storage",
      "Fix My GitHub Project Automated PR Generator",
      "Code Sign & Cryptographic Gatekeeper (ECDSA P-256)",
      "AI Code Refactor with Deep & Performance modes",
      "AI Make Responsive 5-Viewport Transformer Suite",
      "Advanced ZIP Architecture & Security Scanner",
      "Direct GitHub OAuth sync & branch rollback",
      "Zero wait times & priority SLA",
    ],
    proBadge: true,
  },
  TEAM: {
    id: "team",
    name: "Team Workspace",
    badge: "TEAM",
    currency: "USD",
    currencySymbol: "$",
    priceMonthly: 29,
    priceAnnual: 290, // $24.17/mo billed annually
    annualSavingsPercent: 17,
    aiDailyLimit: 1000,
    aiMonthlyLimit: 10000,
    basicTools: "unlimited",
    snippetLimit: Infinity,
    features: [
      "Everything in Developer Pro plan",
      "Up to 10 team member seats",
      "Shared Team Cloud Snippet Library",
      "Team-wide Code Sign approval audit trail",
      "Centralized Safepay billing & invoice management",
      "Priority SLA & Dedicated engineering support",
    ],
    proBadge: true,
  },
};

export const QUOTA_CONFIG = {
  FREE_AI_DAILY_LIMIT: 74,
  PRO_AI_DAILY_LIMIT: 200,
  PRO_AI_MONTHLY_LIMIT: 3000,
  TEAM_AI_DAILY_LIMIT: 1000,
  TEAM_AI_MONTHLY_LIMIT: 10000,
  FREE_SNIPPET_LIMIT: 5,
  PRO_SNIPPET_LIMIT: Infinity,
};

// Dedicated Pro tools requiring active PRO or TEAM subscription (or personal Gemini key)
export const PRO_TOOL_IDS = [
  "fix-github-project",
  "fix-my-github-project",
  "github-repair",
  "github-project-repair",
  "code-sign-approve",
  "code-approval",
  "sign-approve",
  "clean-code",
  "clean-my-code",
  "ai-code-refactor",
  "responsive-converter",
  "make-responsive",
  "cloud-vault",
];

export function isProTool(toolId = "") {
  const cleanId = (toolId || "").replace(/^tools\//, "").toLowerCase();
  return PRO_TOOL_IDS.includes(cleanId);
}

export function getPlanLimits(planId = "free") {
  const normalized = (planId || "free").toLowerCase();
  if (normalized.includes("team")) return PLANS.TEAM;
  if (normalized.includes("pro")) return PLANS.PRO;
  return PLANS.FREE;
}
