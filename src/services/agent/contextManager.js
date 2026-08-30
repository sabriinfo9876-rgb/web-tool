// JARVIS Context Manager
// Targeted retrieval of relevant code files, configs, and dependencies

/**
 * Filters and prepares focused context for the AI developer agent
 * @param {string} prompt - User request
 * @param {string|object} inputCode - Raw code or repository payload
 * @param {object} metadata - Optional repo or file metadata
 * @returns {object} Clean targeted context
 */
export function buildTargetedContext(prompt = "", inputCode = "", metadata = {}) {
  const cleanPrompt = prompt.toLowerCase();
  let codeStr = typeof inputCode === "string" ? inputCode : JSON.stringify(inputCode, null, 2);

  // Extract detected language / framework
  let framework = "Generic Web";
  if (codeStr.includes("import React") || codeStr.includes("useState") || cleanPrompt.includes("react")) {
    framework = "React / JSX";
  } else if (codeStr.includes("vue") || cleanPrompt.includes("vue")) {
    framework = "Vue.js";
  } else if (codeStr.includes("tailwind") || cleanPrompt.includes("tailwind")) {
    framework = "Tailwind CSS";
  } else if (codeStr.includes("<!DOCTYPE html>") || cleanPrompt.includes("html")) {
    framework = "HTML5 / DOM";
  }

  // Token truncation safety (cap at ~25k characters to keep latency low & accurate)
  const isTruncated = codeStr.length > 25000;
  if (isTruncated) {
    codeStr = codeStr.substring(0, 25000) + "\n\n/* ... [NEXORA Context Manager: Large input capped for targeted analysis] ... */";
  }

  return {
    framework,
    charLength: codeStr.length,
    isTruncated,
    repoName: metadata.repoName || "local-project",
    branch: metadata.branch || "main",
    code: codeStr,
    timestamp: new Date().toISOString(),
  };
}
