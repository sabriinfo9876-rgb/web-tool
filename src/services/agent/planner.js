// JARVIS Planner
// Formulates clean, visible step-by-step action plans without leaking chain-of-thought internals

import { RISK_LEVELS } from "./intentClassifier.js";

/**
 * Builds an actionable execution plan for a developer task
 * @param {object} intentResult - Classified intent
 * @param {Array<object>} selectedTools - Selected tools from registry
 * @param {string} prompt - User request
 * @param {object} context - User / project context
 * @returns {object} Structured plan with milestones
 */
export function buildExecutionPlan(intentResult, selectedTools, prompt = "", context = {}) {
  const steps = [];

  // Step 1: Context & Inspection
  steps.push({
    id: "step-context",
    title: "Inspect Project Context & Parse AST",
    description: `Targeting scope [${intentResult.scope}]. Scanning relevant syntax tokens, styles, and configurations.`,
    status: "pending",
    type: "inspection",
  });

  // Step 2: Tool Execution Phase
  if (selectedTools.length > 0) {
    const toolNames = selectedTools.map((t) => t.name).join(", ");
    steps.push({
      id: "step-tools",
      title: `Orchestrate Developer Tools (${selectedTools.length})`,
      description: `Invoking engine tools: ${toolNames}.`,
      status: "pending",
      type: "tools",
      tools: selectedTools.map((t) => ({ id: t.id, name: t.name, isAi: t.isAi })),
    });
  }

  // Step 3: AI Brain Synthesis & Transformation
  steps.push({
    id: "step-synthesis",
    title: "AI Brain Architecture & Solution Synthesis",
    description: `Applying intent [${intentResult.intent}] to optimize code layout, resolve edge cases, and ensure type safety.`,
    status: "pending",
    type: "ai_synthesis",
  });

  // Step 4: Diff Generation & Validation
  steps.push({
    id: "step-diff",
    title: "Generate Unified Diff & Security Scan",
    description: "Computing line-by-line before/after patch and checking for security regressions.",
    status: "pending",
    type: "diff",
  });

  // Step 5: Risk Gate & Approval
  const requiresExplicitApproval = intentResult.risk === RISK_LEVELS.HIGH || intentResult.risk === RISK_LEVELS.MEDIUM;
  steps.push({
    id: "step-approval",
    title: requiresExplicitApproval ? `User Approval Gate [${intentResult.risk.toUpperCase()} RISK]` : "Automated Verification & Apply",
    description: requiresExplicitApproval
      ? "Presenting interactive diff for explicit developer review and cryptographic signoff."
      : "Low-risk transformation ready for instant apply.",
    status: "pending",
    type: "approval",
    risk: intentResult.risk,
    requiresApproval: requiresExplicitApproval,
  });

  return {
    taskId: "jarvis-" + Math.random().toString(36).substring(2, 9),
    prompt,
    intent: intentResult.intent,
    risk: intentResult.risk,
    steps,
    totalSteps: steps.length,
    estimatedTimeMs: selectedTools.some((t) => t.isAi) ? 1200 : 350,
  };
}
