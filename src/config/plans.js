// Web Developer Hub — Monetization, Plans & Limits Configuration
// Single source of truth for Quotas, Pricing, Tiers & Centralized Access Control (Powered by Safepay)

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
    ads: true,
    features: [
      "68 core developer utilities & formatters (unlimited usage)",
      "74 AI operations per day (Gemini 2.5/3.7 Flash)",
      "JSON Formatter, HTML, CSS, Regex, JWT & API testing suites",
      "Up to 5 Cloud Snippet Vault entries",
      "Client-side Secret Scanner & Redactor",
      "Automatic daily quota reset at 00:00 UTC",
      "Developer community support",
      "Non-intrusive developer advertisements",
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
    priceAnnual: 59, // $7.99 * 12 = $95.88 -> $59 save ~38%
    annualSavingsPercent: 38,
    aiDailyLimit: 200,
    aiMonthlyLimit: 3000,
    basicTools: "unlimited",
    snippetLimit: Infinity,
    ads: false,
    features: [
      "Everything in Free Developer plan",
      "All 6 Premium Tools included",
      "3,000 AI operations per month (High-speed priority queue)",
      "Unlimited Cloud Snippet Vault storage",
      "Fix My GitHub Project Automated PR Generator",
      "Code Sign & Approve Cryptographic Gatekeeper (ECDSA P-256)",
      "AI Code Refactor with Deep & Performance modes",
      "Clean My Code Automated Code Sanity & Linter",
      "Make Responsive 5-Viewport Transformer Suite",
      "Direct GitHub OAuth sync & branch rollback",
      "Zero advertisements (Ad-free experience)",
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
    ads: false,
    features: [
      "Everything in Developer Pro plan",
      "Up to 10 team member seats",
      "Shared Team Cloud Snippet Library & collaboration",
      "Team-wide Code Sign approval audit trail",
      "10,000 pooled AI operations per month",
      "Centralized Safepay billing & invoice management",
      "Priority SLA & dedicated engineering support",
      "Zero advertisements (Ad-free experience)",
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

// The 6 Premium Tools restricted to Pro and Team users
export const PREMIUM_TOOLS = [
  { id: "fix-github-project", name: "Fix My GitHub Project", path: "tools/fix-github-project" },
  { id: "code-sign-approve", name: "Code Sign & Approve Gatekeeper", path: "tools/code-sign-approve" },
  { id: "ai-code-refactor", name: "AI Code Refactor Engine", path: "tools/ai-code-refactor" },
  { id: "clean-code", name: "Clean My Code Analyzer", path: "tools/clean-code" },
  { id: "make-responsive", name: "Make Responsive Transformer", path: "tools/make-responsive" },
  { id: "cloud-vault", name: "Cloud Snippet Vault (Unlimited)", path: "tools/cloud-vault" },
];

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

// Normalize tool ID and check if premium
export function isProTool(toolId = "") {
  const cleanId = (toolId || "").replace(/^tools\//, "").replace(/^\//, "").toLowerCase();
  return PRO_TOOL_IDS.includes(cleanId);
}

// Get effective normalized plan ID from user object ("free" | "pro" | "team")
export function getEffectivePlan(user) {
  if (!user) return "free";
  const plan = (user.plan || "").toLowerCase();
  if (plan.includes("team")) return "team";
  if (plan.includes("pro") || plan.includes("annual")) return "pro";
  if (user.isPaid === true) return "pro";
  return "free";
}

// Determine if ads should be rendered for the user (Free & Anonymous: true, Pro/Team: false)
export function shouldShowAds(user) {
  if (!user) return true;
  const effectivePlan = getEffectivePlan(user);
  if (effectivePlan === "pro" || effectivePlan === "team" || user.isPaid) {
    return false;
  }
  return true;
}

// Access Control: Check if user can access a specific tool
export function canUseTool(user, toolId = "") {
  if (!isProTool(toolId)) return true; // 68 core tools are free & unlimited
  const effectivePlan = getEffectivePlan(user);
  return effectivePlan === "pro" || effectivePlan === "team" || Boolean(user?.isPaid);
}

// Access Control: Check if user can use a premium feature
export function canUsePremiumFeature(user) {
  const effectivePlan = getEffectivePlan(user);
  return effectivePlan === "pro" || effectivePlan === "team" || Boolean(user?.isPaid);
}

// Access Control: Check if user can use AI
export function canUseAI(user, currentUsage = 0) {
  const effectivePlan = getEffectivePlan(user);
  if (effectivePlan === "team") return currentUsage < QUOTA_CONFIG.TEAM_AI_DAILY_LIMIT;
  if (effectivePlan === "pro") return currentUsage < QUOTA_CONFIG.PRO_AI_DAILY_LIMIT;
  return currentUsage < QUOTA_CONFIG.FREE_AI_DAILY_LIMIT;
}

export function getPlanLimits(planId = "free") {
  const normalized = (planId || "free").toLowerCase();
  if (normalized.includes("team")) return PLANS.TEAM;
  if (normalized.includes("pro")) return PLANS.PRO;
  return PLANS.FREE;
}
