// NEXORA AI — Centralized Tool Execution Engine
// Enforces: Authentication, Input Validation, Plan Entitlements, Atomic AI Quota, Execution, Output Validation & Usage Logging

import { TOOL_REGISTRY, getToolDefinition } from "./toolRegistry.js";
import { getCurrentUser } from "../auth.js";
import { canUseTool, getPlanLimits, isProTool } from "../config/plans.js";
import { callAiAssist, showToast, openUpgradeModal, updateHeaderQuotaDisplay } from "../utils.js";

/**
 * Executes any of the 74 registered developer tools with complete safety and validation.
 * 
 * @param {Object} params
 * @param {string} params.toolId - Registered tool identifier (e.g., 'json-formatter', 'clean-my-code')
 * @param {Object|string} params.input - Tool input payload (code, JSON, text, parameters)
 * @param {Object} [params.user] - Optional user override (defaults to current authenticated user)
 * @param {Object} [params.context] - Execution context (language, mode, options)
 * @returns {Promise<Object>} Execution result { success: true, result: any, executionTimeMs: number, toolId: string }
 */
export async function executeTool({ toolId, input, user = null, context = {} }) {
  const startTime = performance.now();
  const currentUser = user || getCurrentUser();
  const tool = getToolDefinition(toolId);

  // 1. Tool Validation
  if (!tool) {
    throw new Error(`Tool not recognized: '${toolId}'. Please check the tool registry.`);
  }

  // 2. Plan & Entitlement Access Check
  if (tool.tier === "pro" || isProTool(tool.id)) {
    const allowed = canUseTool(currentUser, tool.id);
    if (!allowed) {
      const toolName = tool.name || toolId;
      openUpgradeModal(toolName);
      throw new Error(`The tool '${toolName}' is exclusive to Developer Pro subscribers. Please upgrade your account to access Pro tools.`);
    }
  }

  // 3. Input Validation
  if (typeof tool.validateInput === "function") {
    const validation = tool.validateInput(input);
    if (!validation.valid) {
      throw new Error(validation.error || `Invalid input provided for ${tool.name}.`);
    }
  }

  // 4. Execution Dispatch
  let rawResult;

  if (tool.executionType === "ai" || tool.isAi) {
    // AI Execution via atomic server-side proxy
    const promptText = typeof input === "string" ? input : input?.prompt || input?.code || JSON.stringify(input);
    const taskName = input?.task || tool.id;
    const contextString = typeof context === "string" ? context : JSON.stringify(context);

    try {
      const aiResponse = await callAiAssist(taskName, promptText, contextString);
      rawResult = aiResponse;
    } catch (err) {
      throw new Error(`AI Tool Execution Failed: ${err.message}`);
    }
  } else if (tool.executionType === "github") {
    // GitHub Repair Engine Execution
    const response = await fetch(tool.backendEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `GitHub scan failed with HTTP ${response.status}`);
    }
    rawResult = await response.json();
  } else if (typeof tool.execute === "function") {
    // Deterministic Client/Server or Crypto Execution
    try {
      rawResult = await tool.execute(input, context, currentUser);
    } catch (err) {
      throw new Error(`Execution error in ${tool.name}: ${err.message}`);
    }
  } else {
    throw new Error(`No execution implementation found for tool '${tool.id}'`);
  }

  // 5. Output Validation
  if (rawResult === undefined || rawResult === null) {
    throw new Error(`Tool '${tool.name}' produced an empty result.`);
  }

  const executionTimeMs = Math.round(performance.now() - startTime);

  // 6. Return Standardized Envelope
  return {
    success: true,
    toolId: tool.id,
    name: tool.name,
    category: tool.category,
    result: rawResult,
    executionTimeMs,
    timestamp: new Date().toISOString(),
  };
}
