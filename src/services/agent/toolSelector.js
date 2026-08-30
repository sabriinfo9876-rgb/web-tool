// JARVIS Tool Selector
// Maps classified intents and contextual requirements to the 74-tool catalog

import { TOOL_REGISTRY } from "../toolRegistry.js";
import { INTENTS } from "./intentClassifier.js";

/**
 * Selects the optimal tool(s) from the 74-tool catalog for a given intent and input
 * @param {object} intentResult - Classified intent object
 * @param {string} prompt - User request
 * @param {string|object} inputData - Optional code / payload
 * @returns {Array<object>} Ranked list of tools to execute
 */
export function selectToolsForTask(intentResult, prompt = "", inputData = "") {
  const clean = prompt.toLowerCase();
  const selectedToolIds = [];

  switch (intentResult.intent) {
    case INTENTS.GITHUB:
      selectedToolIds.push("fix-github-project");
      if (clean.includes("sign") || clean.includes("gatekeeper") || clean.includes("approve")) {
        selectedToolIds.push("code-sign-approve");
      }
      break;

    case INTENTS.SECURITY:
      if (clean.includes("jwt") || clean.includes("token")) {
        selectedToolIds.push("jwt-decoder", "jwt-expiry");
      } else if (clean.includes("hash") || clean.includes("sha256")) {
        selectedToolIds.push("sha256-generator", "hash-generator");
      } else if (clean.includes("password")) {
        selectedToolIds.push("password-generator");
      } else {
        selectedToolIds.push("code-sign-approve");
      }
      break;

    case INTENTS.FIX:
      if (clean.includes("responsive") || clean.includes("mobile")) {
        selectedToolIds.push("make-responsive", "flex-grid-fix");
      } else if (clean.includes("flex") || clean.includes("grid")) {
        selectedToolIds.push("flex-grid-fix", "flexbox-builder");
      } else if (clean.includes("html") || clean.includes("dom")) {
        selectedToolIds.push("fix-html");
      } else {
        selectedToolIds.push("clean-my-code", "make-responsive");
      }
      break;

    case INTENTS.CONVERT:
      if (clean.includes("to react") || clean.includes("to jsx") || clean.includes("jsx")) {
        selectedToolIds.push("html-to-jsx");
      } else if (clean.includes("markdown") || clean.includes("md")) {
        selectedToolIds.push("html-to-markdown");
      } else if (clean.includes("to csv") || clean.includes("json to csv")) {
        selectedToolIds.push("json-to-csv");
      } else if (clean.includes("csv to json")) {
        selectedToolIds.push("csv-to-json");
      } else if (clean.includes("px to rem") || clean.includes("rem")) {
        selectedToolIds.push("px-to-rem");
      } else if (clean.includes("base64") && clean.includes("image")) {
        selectedToolIds.push("image-base64");
      } else if (clean.includes("base64")) {
        selectedToolIds.push("base64-encoder", "base64-decoder");
      } else if (clean.includes("curl")) {
        selectedToolIds.push("curl-converter");
      } else {
        selectedToolIds.push("html-to-jsx");
      }
      break;

    case INTENTS.DEBUG:
      if (clean.includes("json")) {
        selectedToolIds.push("json-validator", "json-formatter", "json-viewer");
      } else if (clean.includes("zip") || clean.includes("archive")) {
        selectedToolIds.push("check-zip-project");
      } else if (clean.includes("html")) {
        selectedToolIds.push("html-checker", "fix-html");
      } else if (clean.includes("api") || clean.includes("http")) {
        selectedToolIds.push("api-tester", "http-status-codes");
      } else {
        selectedToolIds.push("clean-my-code", "code-diff");
      }
      break;

    case INTENTS.REFACTOR:
      if (clean.includes("json")) {
        selectedToolIds.push("json-formatter", "json-minifier");
      } else if (clean.includes("html")) {
        selectedToolIds.push("html-formatter", "html-minifier");
      } else if (clean.includes("css")) {
        selectedToolIds.push("css-minifier");
      } else if (clean.includes("sql")) {
        selectedToolIds.push("sql-formatter");
      } else {
        selectedToolIds.push("clean-my-code", "code-diff");
      }
      break;

    case INTENTS.GENERATE:
      if (clean.includes("design") || clean.includes("mockup")) {
        selectedToolIds.push("code-to-design", "prompt-to-ui");
      } else if (clean.includes("shadow")) {
        selectedToolIds.push("shadow-maker");
      } else if (clean.includes("gradient")) {
        selectedToolIds.push("gradient-maker");
      } else if (clean.includes("uuid")) {
        selectedToolIds.push("uuid-generator");
      } else if (clean.includes("lorem")) {
        selectedToolIds.push("lorem-ipsum");
      } else {
        selectedToolIds.push("prompt-to-ui", "code-to-design");
      }
      break;

    case INTENTS.SEO:
      selectedToolIds.push("seo-checker", "meta-tag-generator", "open-graph", "robots-txt", "sitemap-generator");
      break;

    case INTENTS.TEST:
      if (clean.includes("regex")) {
        selectedToolIds.push("regex-tester");
      } else if (clean.includes("curl")) {
        selectedToolIds.push("curl-converter");
      } else {
        selectedToolIds.push("api-tester", "http-status-codes");
      }
      break;

    default:
      // General tools
      selectedToolIds.push("clean-my-code", "code-diff");
      break;
  }

  // Deduplicate and resolve actual tool objects from registry
  const uniqueIds = Array.from(new Set(selectedToolIds));
  const resolvedTools = uniqueIds
    .map((id) => TOOL_REGISTRY[id])
    .filter(Boolean);

  return resolvedTools;
}
