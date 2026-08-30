// JARVIS Approval Manager
// Gatekeeper for user confirmation on medium/high-risk actions (GitHub PR, writes, deletions)

import { RISK_LEVELS } from "./intentClassifier.js";

/**
 * Validates whether an action requires explicit developer approval
 * @param {object} intentResult - Classified intent
 * @param {object} diffResult - Generated diff details
 * @returns {object} Approval requirement status
 */
export function checkApprovalRequirement(intentResult, diffResult = {}) {
  const risk = intentResult.risk || RISK_LEVELS.LOW;

  if (risk === RISK_LEVELS.HIGH) {
    return {
      required: true,
      riskLevel: "HIGH",
      color: "rose",
      badgeText: "EXPLICIT SIGN-OFF REQUIRED",
      message: "This operation will generate Pull Requests, write code to GitHub, or modify cryptographic assets. Explicit confirmation is mandatory.",
      autoApply: false,
    };
  }

  if (risk === RISK_LEVELS.MEDIUM) {
    return {
      required: true,
      riskLevel: "MEDIUM",
      color: "amber",
      badgeText: "DEVELOPER REVIEW REQUIRED",
      message: "This operation modifies source code or responsive styling rules. Review the unified diff before applying.",
      autoApply: false,
    };
  }

  return {
    required: false,
    riskLevel: "LOW",
    color: "emerald",
    badgeText: "AUTO-APPLY SAFE",
    message: "Formatting, minification, or non-destructive utility transformation.",
    autoApply: true,
  };
}
