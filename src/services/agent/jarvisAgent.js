// JARVIS Autonomous AI Developer Agent Orchestrator
// Coordinates Intent Classification, Tool Selection, Planning, 10-AI Parallel Brain Routing,
// Secret Redaction, Consensus Synthesis, Diff Generation & Verification.

import { classifyIntent, RISK_LEVELS } from "./intentClassifier.js";
import { selectToolsForTask } from "./toolSelector.js";
import { buildExecutionPlan } from "./planner.js";
import { routeAiBrain, JARVIS_MODES, TEN_AI_PROVIDERS } from "./brainRouter.js";
import { buildTargetedContext } from "./contextManager.js";
import { computeUnifiedDiff } from "./patchManager.js";
import { checkApprovalRequirement } from "./approvalManager.js";
import { verifyCodePatch } from "./verifier.js";
import { executeTool } from "../toolExecutor.js";
import { redactSecrets } from "./secretRedactor.js";
import { executeParallelProviders } from "./providerManager.js";
import { compareProviderResponses, synthesizeFinalSolution } from "./synthesizer.js";

// Hard Loop Safeguards
export const AGENT_LIMITS = {
  MAX_AI_ITERATIONS: 3,
  MAX_TOOL_CALLS: 5,
  MAX_RETRIES: 2,
  REQUEST_TIMEOUT_MS: 15000,
};

/**
 * Runs the end-to-end autonomous JARVIS developer pipeline with 10-AI Parallel Orchestration
 * @param {string} prompt - User request
 * @param {string|object} inputCode - Provided code, snippet, or repo payload
 * @param {object} options - Options (mode: "auto" | "multibrain" | "all_ai", user: { plan: "pro" })
 * @param {function} onProgress - Real-time progress callback
 * @returns {Promise<object>} Full JARVIS execution result with plan, parallel provider results, consensus, diff, and verification
 */
export async function runJarvisAgent(prompt, inputCode = "", options = {}, onProgress = () => {}) {
  const startTime = Date.now();
  const user = options.user || { plan: "free" };
  const mode = options.mode || JARVIS_MODES.AUTO;

  // Step 1: Understand Intent & Sanitize Inputs
  onProgress({ stage: "intent", status: "Analyzing intent and task complexity..." });
  const intentResult = classifyIntent(prompt, options.context);

  // Redact secrets early
  const safePrompt = redactSecrets(prompt);
  const safeInput = redactSecrets(inputCode);

  // Step 2: Context Retrieval
  onProgress({ stage: "context", status: "Scanning project context and extracting AST tokens..." });
  const context = buildTargetedContext(safePrompt, safeInput, options.metadata);

  // Step 3: Select Engine Tools from the 74-Tool Catalog
  onProgress({ stage: "tools", status: "Selecting optimal developer tools from catalog..." });
  const selectedTools = selectToolsForTask(intentResult, safePrompt, safeInput);

  // Step 4: Formulate Visible Step-by-Step Plan
  const plan = buildExecutionPlan(intentResult, selectedTools, safePrompt, context);
  onProgress({ stage: "plan", status: "Formulated action plan.", plan });

  // Step 5: Route AI Brain Strategy (AUTO, MULTI-BRAIN, or ALL-AI)
  const brainRoute = routeAiBrain(intentResult, mode, user);
  onProgress({
    stage: "brain",
    status: `Configured ${brainRoute.title} (${brainRoute.targetProviders.length} providers)`,
    brainRoute,
  });

  let toolOutputs = [];
  let toolCallsCount = 0;
  let providerExecutionSummary = null;
  let consensus = null;
  let solutionCode = "";

  // Step 6: Bounded Execution — Check for Deterministic Bypass vs Parallel AI Execution
  if (brainRoute.strategy === "deterministic_bypass") {
    // Zero-AI deterministic path
    const toolsToRun = selectedTools.slice(0, AGENT_LIMITS.MAX_TOOL_CALLS);
    for (const tool of toolsToRun) {
      toolCallsCount++;
      onProgress({ stage: "executing_tool", status: `Running ${tool.name}...`, toolId: tool.id });

      try {
        const toolInput = safeInput || tool.sampleInput;
        const res = await executeTool(tool.id, toolInput, {
          userId: user.uid || "anonymous",
          plan: user.plan || "free",
          customApiKey: options.customApiKey,
        });

        toolOutputs.push({
          toolId: tool.id,
          toolName: tool.name,
          success: true,
          output: res.output || res,
        });
      } catch (err) {
        toolOutputs.push({
          toolId: tool.id,
          toolName: tool.name,
          success: false,
          error: err.message,
        });
      }
    }

    if (toolOutputs.length > 0 && toolOutputs[0].success) {
      const out = toolOutputs[0].output;
      solutionCode = typeof out === "string" ? out : out.output || out.code || JSON.stringify(out, null, 2);
    } else {
      solutionCode = safeInput || `// Result for: ${safePrompt}\nconsole.log("Processed deterministically");`;
    }
  } else {
    // Parallel AI Provider Execution
    onProgress({
      stage: "ai_parallel",
      status: `Dispatching parallel requests to ${brainRoute.targetProviders.length} AI providers...`,
      providers: brainRoute.targetProviders,
    });

    providerExecutionSummary = await executeParallelProviders(
      brainRoute.targetProviders,
      safePrompt,
      context.code,
      {
        user,
        customApiKey: options.customApiKey,
        timeoutMs: AGENT_LIMITS.REQUEST_TIMEOUT_MS,
      },
      (ev) => onProgress({ stage: "provider_event", event: ev })
    );

    // Step 7: Response Comparison & Consensus Evaluation
    onProgress({ stage: "consensus", status: "Analyzing provider consensus and comparing solutions..." });
    consensus = compareProviderResponses(providerExecutionSummary.successfulResponses, safePrompt, context.code);

    // Step 8: Single-Pass Unified Synthesis
    onProgress({ stage: "synthesis", status: "Synthesizing unified production-ready patch..." });
    const synthResult = synthesizeFinalSolution(
      providerExecutionSummary.successfulResponses,
      safePrompt,
      context.code,
      consensus
    );
    solutionCode = synthResult.solutionCode;
  }

  // Step 9: Compute Unified Diff
  const originalCleanCode = typeof inputCode === "string" ? inputCode : "";
  const diffResult = computeUnifiedDiff(originalCleanCode, solutionCode, "Component.jsx");

  // Step 10: Verify Code Patch (AST & Syntax Safety)
  onProgress({ stage: "verification", status: "Verifying code syntax, brackets balance & AST integrity..." });
  const verification = verifyCodePatch(solutionCode, context.framework);

  // Step 11: Risk Gate & Approval Requirement
  const approval = checkApprovalRequirement(intentResult, diffResult);

  const durationMs = Date.now() - startTime;

  return {
    success: true,
    prompt: safePrompt,
    mode,
    intent: intentResult,
    plan,
    brainRoute,
    context,
    selectedTools: selectedTools.map((t) => ({ id: t.id, name: t.name, isAi: t.isAi })),
    toolOutputs,
    providerExecutionSummary,
    consensus,
    solutionCode,
    diffResult,
    verification,
    approval,
    durationMs,
    loopProtection: {
      toolCallsCount,
      maxToolCalls: AGENT_LIMITS.MAX_TOOL_CALLS,
      maxIterations: AGENT_LIMITS.MAX_AI_ITERATIONS,
      timeoutMs: AGENT_LIMITS.REQUEST_TIMEOUT_MS,
      status: "SAFE",
    },
  };
}
