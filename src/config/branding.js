// NEXORA AI — Centralized Brand & Identity Configuration
// Single source of truth for application branding, positioning, system language, and neural abstraction.

export const BRAND_CONFIG = {
  name: "NEXORA AI",
  shortName: "NEXORA",
  tagline: "Autonomous Intelligence Engine",
  subTagline: "Advanced Autonomous Multi-Brain Developer & Intelligence Engine",
  description: "NEXORA AI is an autonomous intelligence engine designed for advanced reasoning, development, analysis, and multi-brain problem solving.",
  version: "3.5.0",
  author: "NEXORA AI",
  logoText: "NEXORA",
  logoBadge: "AI",
  logoSymbol: "N",
  
  // Status language
  status: {
    coreOnline: "NEXORA CORE ONLINE",
    neuralActive: "NEURAL ENGINE ACTIVE",
    analyzing: "ANALYZING REQUEST",
    multiBrain: "MULTI-BRAIN PROCESSING",
    consensusBuilding: "CONSENSUS BUILDING",
    synthesisInProgress: "SYNTHESIS IN PROGRESS",
    responseVerified: "RESPONSE VERIFIED",
    taskComplete: "TASK COMPLETE",
    ready: "NEXORA READY",
    thinking: "NEXORA is thinking...",
    executing: "NEXORA Neural Engine Active...",
  },

  // Conversational placeholders and labels
  prompts: {
    askNexora: "Ask NEXORA",
    inputPlaceholder: "What can NEXORA help you build? (e.g., 'Make navbar responsive', 'Fix flexbox bugs', 'Refactor API client')",
    heroHeadline: "What can NEXORA help you build today?",
    featureCardTitle: "Don't know which tool to use? Let NEXORA handle it.",
    featureCardDesc: "Type requests in plain natural language — NEXORA analyzes requirements, selects the best neural operations, builds consensus, and generates production solutions automatically.",
  },

  // Neural Node anonymized naming (10 anonymous nodes)
  neuralNodes: [
    { id: "node-01", name: "Neural Node 01", specialty: "Autonomous Logic & Architecture", slot: 1 },
    { id: "node-02", name: "Neural Node 02", specialty: "Deep Algorithmic Optimization", slot: 2 },
    { id: "node-03", name: "Neural Node 03", specialty: "Ultra Low-Latency Code Audit", slot: 3 },
    { id: "node-04", name: "Neural Node 04", specialty: "High-Throughput Synthesis", slot: 4 },
    { id: "node-05", name: "Neural Node 05", specialty: "Multi-Model Safety & Verification", slot: 5 },
    { id: "node-06", name: "Neural Node 06", specialty: "Full-Stack Component Refactoring", slot: 6 },
    { id: "node-07", name: "Neural Node 07", specialty: "Distributed AST Diff Analysis", slot: 7 },
    { id: "node-08", name: "Neural Node 08", specialty: "Structured Schema & Type Safety", slot: 8 },
    { id: "node-09", name: "Neural Node 09", specialty: "Token-Level Signature Verification", slot: 9 },
    { id: "node-10", name: "Neural Node 10", specialty: "Air-Gapped Local Gateway", slot: 10 },
  ],

  // Modes
  modes: {
    AUTO: {
      id: "AUTO",
      title: "NEXORA AUTO",
      badge: "OPTIMAL",
      description: "Intelligent autonomous routing. Deterministic bypass for formatters, targeted single neural node for standard queries.",
    },
    MULTI_BRAIN: {
      id: "MULTI_BRAIN",
      title: "NEXORA MULTI-BRAIN",
      badge: "4-NODE CONSENSUS",
      description: "Parallel 4-node execution with autonomous consensus scoring and automated diff synthesis.",
    },
    ALL_AI: {
      id: "ALL_AI",
      title: "NEXORA ALL-AI",
      badge: "10-NODE PARALLEL",
      description: "Massive 10-node parallel orchestration across all neural workers with full cross-verification matrix.",
    },
  },

  // Safe User Error Messages
  errors: {
    temporaryIssue: "NEXORA encountered a temporary processing issue. Please try again.",
    nodeUnavailable: "NEXORA temporarily cannot access one of its intelligence nodes.",
    quotaExceeded: "Daily free neural operations limit reached. Upgrade to Pro for high-burst quota.",
    invalidRequest: "Please provide a valid code or prompt request.",
  },
};

/**
 * Returns an anonymized neural node display name for any slot or index (0-9)
 */
export function getAnonymizedNodeName(indexOrId) {
  if (typeof indexOrId === "number") {
    const num = String(indexOrId + 1).padStart(2, "0");
    return `Neural Node ${num}`;
  }
  const idStr = String(indexOrId).toLowerCase();
  const mapping = {
    gemini: "Neural Node 01",
    deepseek: "Neural Node 02",
    groq: "Neural Node 03",
    cerebras: "Neural Node 04",
    openrouter: "Neural Node 05",
    sambanova: "Neural Node 06",
    deepinfra: "Neural Node 07",
    cohere: "Neural Node 08",
    huggingface: "Neural Node 09",
    ollama: "Neural Node 10",
  };
  return mapping[idStr] || `Neural Node ${idStr}`;
}

/**
 * Sanitizes backend responses to ensure provider names never leak to the frontend UI
 */
export function sanitizeFrontendResponse(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/Gemini(?:\s*2\.5|\s*3\.7|\s*Flash|\s*Pro)?/gi, "NEXORA Core")
    .replace(/DeepSeek(?:\s*Reasoner|\s*V3|\s*Coder)?/gi, "NEXORA Neural Node 02")
    .replace(/Groq(?:\s*Llama)?/gi, "NEXORA Neural Node 03")
    .replace(/Cerebras(?:\s*CS-3)?/gi, "NEXORA Neural Node 04")
    .replace(/OpenRouter(?:\s*Unified)?/gi, "NEXORA Neural Node 05")
    .replace(/SambaNova(?:\s*Qwen)?/gi, "NEXORA Neural Node 06")
    .replace(/DeepInfra(?:\s*Mixtral)?/gi, "NEXORA Neural Node 07")
    .replace(/Cohere(?:\s*Command)?/gi, "NEXORA Neural Node 08")
    .replace(/Hugging\s*Face(?:\s*StarCoder2)?/gi, "NEXORA Neural Node 09")
    .replace(/Ollama(?:\s*Local)?/gi, "NEXORA Neural Node 10")
    .replace(/JARVIS(?:\s*Autonomous|\s*Agent|\s*Core|\s*Developer)?/gi, "NEXORA AI");
}
