// JARVIS AI Brain Router
// Defines and coordinates all 10 AI provider slots with AUTO, MULTI-BRAIN, and ALL-AI modes

export const TEN_AI_PROVIDERS = {
  GEMINI: {
    id: "gemini",
    name: "Gemini 2.5 Flash",
    provider: "Google Cloud",
    slot: 1,
    model: "gemini-2.5-flash",
    specialty: "Full-stack synthesis, multimodal AST parsing & fast layout repair",
    speed: "Fast (~180ms)",
  },
  DEEPSEEK: {
    id: "deepseek",
    name: "DeepSeek Reasoner V3",
    provider: "DeepSeek AI",
    slot: 2,
    model: "deepseek-reasoner",
    specialty: "Deep algorithmic reasoning, complex bug isolation & logic verification",
    speed: "Medium (~320ms)",
  },
  GROQ: {
    id: "groq",
    name: "Groq Llama 3.3 70B",
    provider: "Groq LPU",
    slot: 3,
    model: "llama-3.3-70b-versatile",
    specialty: "Ultra-low latency inference, instant regex & syntax validation",
    speed: "Ultra-Fast (~80ms)",
  },
  CEREBRAS: {
    id: "cerebras",
    name: "Cerebras Llama 3.1 70B",
    provider: "Cerebras CS-3",
    slot: 4,
    model: "llama3.1-70b",
    specialty: "High-throughput code generation & AST reconstruction",
    speed: "Ultra-Fast (~90ms)",
  },
  OPENROUTER: {
    id: "openrouter",
    name: "OpenRouter Unified Gateway",
    provider: "OpenRouter",
    slot: 5,
    model: "anthropic/claude-3.5-sonnet",
    specialty: "Multi-model routing, edge-case analysis & architecture auditing",
    speed: "Fast (~250ms)",
  },
  SAMBANOVA: {
    id: "sambanova",
    name: "SambaNova Qwen 2.5 72B",
    provider: "SambaNova SN40L",
    slot: 6,
    model: "Qwen2.5-72B-Instruct",
    specialty: "Complex multilingual reasoning & full-stack refactoring",
    speed: "Ultra-Fast (~110ms)",
  },
  DEEPINFRA: {
    id: "deepinfra",
    name: "DeepInfra Mixtral 8x22B",
    provider: "DeepInfra",
    slot: 7,
    model: "mistralai/Mixtral-8x22B-Instruct-v0.1",
    specialty: "Distributed code analysis, multi-file diffing & security inspection",
    speed: "Fast (~210ms)",
  },
  COHERE: {
    id: "cohere",
    name: "Cohere Command R+",
    provider: "Cohere",
    slot: 8,
    model: "command-r-plus",
    specialty: "Structured output generation, API schema design & documentation",
    speed: "Medium (~290ms)",
  },
  HUGGINGFACE: {
    id: "huggingface",
    name: "Hugging Face StarCoder2 15B",
    provider: "Hugging Face Inference",
    slot: 9,
    model: "bigcode/starcoder2-15b",
    specialty: "Precise token completion, function signatures & unit test synthesis",
    speed: "Medium (~310ms)",
  },
  OLLAMA: {
    id: "ollama",
    name: "Ollama Local (Qwen 2.5-Coder)",
    provider: "Local AI Gateway",
    slot: 10,
    model: "qwen2.5-coder:7b",
    specialty: "Air-gapped local execution & zero-network developer privacy",
    speed: "Local (~120ms)",
  },
};

// Aliases and list export
export const AI_PROVIDERS = TEN_AI_PROVIDERS;
export const ALL_PROVIDER_IDS = Object.values(TEN_AI_PROVIDERS).map((p) => p.id);

export const JARVIS_MODES = {
  AUTO: "auto",
  MULTI_BRAIN: "multibrain",
  ALL_AI: "all_ai",
};

/**
 * Evaluates requested mode and intent to determine which AI providers should be invoked
 * @param {object} intentResult - Classified intent (e.g. EXPLAIN, MATH, GENERATE, DEBUG, SECURITY, DESIGN, ARCHITECTURE, CREATIVE, LONG_CONTEXT, MULTI_OPINION)
 * @param {string} mode - "auto" | "multibrain" | "all_ai"
 * @param {object} user - User plan information { plan: "free" | "pro" | "team" }
 * @returns {object} Provider dispatch routing strategy
 */
export function routeAiBrain(intentResult, mode = JARVIS_MODES.AUTO, user = { plan: "free" }) {
  const intent = intentResult?.intent || "ANALYZE";

  // MODE 3: ALL-AI (10-AI Parallel Engine)
  if (mode === JARVIS_MODES.ALL_AI) {
    return {
      mode: JARVIS_MODES.ALL_AI,
      strategy: "ten_ai_parallel",
      title: "10-AI Parallel Orchestration Engine",
      selectedProvider: "gemini",
      selectedModel: TEN_AI_PROVIDERS.GEMINI.model,
      selectionRationale: "Dispatched to all 10 AI providers simultaneously for full spectrum consensus and synthesis.",
      targetProviders: ALL_PROVIDER_IDS,
      description: "Concurrent parallel execution across all 10 AI provider slots with consensus synthesis",
      quotaCost: 1, // Atomic reservation: exactly 1 quota per logical user action
      requiresConsensus: true,
      shouldUseMultiAi: true,
      maxConcurrency: 10,
    };
  }

  // MODE 2: MULTI-BRAIN (Selected multi-provider consensus)
  if (mode === JARVIS_MODES.MULTI_BRAIN) {
    const selected = ["gemini", "deepseek", "groq", "cerebras"];
    return {
      mode: JARVIS_MODES.MULTI_BRAIN,
      strategy: "multi_brain_consensus",
      title: "Multi-Brain 4-AI Consensus Engine",
      selectedProvider: "gemini",
      selectedModel: TEN_AI_PROVIDERS.GEMINI.model,
      selectionRationale: "Multi-Brain consensus mode enabled: orchestrates 4 top-tier models with cross-verdict synthesis.",
      targetProviders: selected,
      description: "Parallel multi-provider execution (Gemini, DeepSeek, Groq, Cerebras) with consensus verdict",
      quotaCost: 1,
      requiresConsensus: true,
      shouldUseMultiAi: true,
      maxConcurrency: 4,
    };
  }

  // MODE 1: AUTO (Intelligent Intent-Based Routing)

  // 1. Simple conceptual explanation (e.g., "What is JavaScript?")
  if (intent === "EXPLAIN") {
    return {
      mode: JARVIS_MODES.AUTO,
      strategy: "fast_single_provider",
      title: "NEXORA AI Fast Knowledge Engine",
      selectedProvider: "gemini",
      selectedModel: "gemini-2.5-flash",
      selectionRationale: "Selected Gemini 2.5 Flash for ultra-fast, structured, high-accuracy conceptual explanations with zero overhead.",
      targetProviders: ["gemini"],
      additionalProviders: [],
      description: "Single-provider fast inference for direct conceptual queries",
      quotaCost: 1,
      requiresConsensus: false,
      shouldUseMultiAi: false,
      maxConcurrency: 1,
    };
  }

  // 2. Mathematical reasoning (e.g., "Solve this complex mathematical problem: explain why the quadratic formula works.")
  if (intent === "MATH") {
    return {
      mode: JARVIS_MODES.AUTO,
      strategy: "deep_reasoning_engine",
      title: "NEXORA AI Deep Mathematical Engine",
      selectedProvider: "deepseek",
      selectedModel: "deepseek-reasoner",
      fallbackProvider: "gemini",
      fallbackModel: "gemini-2.5-flash",
      selectionRationale: "Selected DeepSeek Reasoner for deep algorithmic step-by-step mathematical derivation and proofs (with automatic Gemini fallback).",
      targetProviders: ["deepseek", "gemini"],
      additionalProviders: ["gemini"],
      description: "Algorithmic reasoning model with verification fallback",
      quotaCost: 1,
      requiresConsensus: false,
      shouldUseMultiAi: false,
      maxConcurrency: 2,
    };
  }

  // 3. Backend & API Engineering (e.g., "Write a production-quality Express.js authentication API.")
  if (intent === "GENERATE") {
    return {
      mode: JARVIS_MODES.AUTO,
      strategy: "production_code_synthesis",
      title: "NEXORA AI Backend Engineering Engine",
      selectedProvider: "gemini",
      selectedModel: "gemini-2.5-flash",
      selectionRationale: "Selected Gemini 2.5 Flash for complete, robust full-stack code synthesis with strong AST integrity and security best practices.",
      targetProviders: ["gemini"],
      additionalProviders: [],
      description: "Production-grade code synthesis with strict AST verification",
      quotaCost: 1,
      requiresConsensus: false,
      shouldUseMultiAi: false,
      maxConcurrency: 1,
    };
  }

  // 4. Debugging & Bug Isolation (e.g., "Debug this JavaScript code and explain the bug.")
  if (intent === "DEBUG") {
    return {
      mode: JARVIS_MODES.AUTO,
      strategy: "multi_agent_debugger",
      title: "NEXORA AI Autonomous Diagnostic Engine",
      selectedProvider: "gemini",
      selectedModel: "gemini-2.5-flash",
      selectionRationale: "Selected multi-provider validation (Gemini + DeepSeek / Groq) for root cause bug isolation, syntax auditing, and verified patch generation.",
      targetProviders: ["gemini", "deepseek", "groq"],
      additionalProviders: ["deepseek", "groq"],
      description: "Targeted multi-provider debugging with AST syntax verification",
      quotaCost: 1,
      requiresConsensus: true,
      shouldUseMultiAi: true,
      maxConcurrency: 3,
    };
  }

  // 5. Security & Vulnerability Auditing (e.g., "Analyze this code for security vulnerabilities.")
  if (intent === "SECURITY") {
    return {
      mode: JARVIS_MODES.AUTO,
      strategy: "security_audit_triad",
      title: "NEXORA AI Security Gatekeeper Engine",
      selectedProvider: "gemini",
      selectedModel: "gemini-2.5-flash",
      selectionRationale: "Selected security audit pipeline with cryptographic and vulnerability scanning across providers.",
      targetProviders: ["gemini", "deepinfra", "openrouter"],
      additionalProviders: ["deepinfra", "openrouter"],
      description: "Multi-model security vulnerability audit and CVE isolation",
      quotaCost: 1,
      requiresConsensus: true,
      shouldUseMultiAi: true,
      maxConcurrency: 3,
    };
  }

  // 6. UI & Responsive Dashboard Generation (e.g., "Build a responsive React dashboard.")
  if (intent === "DESIGN" || intent === "FIX") {
    return {
      mode: JARVIS_MODES.AUTO,
      strategy: "responsive_ui_engine",
      title: "NEXORA AI UI/UX Design Engine",
      selectedProvider: "gemini",
      selectedModel: "gemini-2.5-flash",
      selectionRationale: "Selected Gemini 2.5 Flash for state-of-the-art Tailwind CSS layout synthesis, responsive grid design, and React component modularity.",
      targetProviders: ["gemini"],
      additionalProviders: [],
      description: "Modern component synthesis with Tailwind CSS viewport optimizations",
      quotaCost: 1,
      requiresConsensus: false,
      shouldUseMultiAi: false,
      maxConcurrency: 1,
    };
  }

  // 7. Software Architecture & System Design (e.g., "Explain this complex software architecture.")
  if (intent === "ARCHITECTURE") {
    return {
      mode: JARVIS_MODES.AUTO,
      strategy: "system_architecture_engine",
      title: "NEXORA AI Architecture Specialist",
      selectedProvider: "openrouter",
      selectedModel: "anthropic/claude-3.5-sonnet",
      fallbackProvider: "gemini",
      fallbackModel: "gemini-2.5-flash",
      selectionRationale: "Selected Architecture Specialist for deep topological analysis, distributed systems design, and component mapping.",
      targetProviders: ["openrouter", "gemini"],
      additionalProviders: ["gemini"],
      description: "System architecture breakdown with design pattern trade-offs",
      quotaCost: 1,
      requiresConsensus: false,
      shouldUseMultiAi: false,
      maxConcurrency: 2,
    };
  }

  // 8. Creative Writing (e.g., "Write a creative short story.")
  if (intent === "CREATIVE") {
    return {
      mode: JARVIS_MODES.AUTO,
      strategy: "creative_narrative_engine",
      title: "NEXORA AI Creative Narrative Engine",
      selectedProvider: "gemini",
      selectedModel: "gemini-2.5-flash",
      selectionRationale: "Selected Gemini 2.5 Flash for evocative prose, rich narrative structure, and dynamic character development.",
      targetProviders: ["gemini"],
      additionalProviders: [],
      description: "Creative storytelling and narrative prose synthesis",
      quotaCost: 1,
      requiresConsensus: false,
      shouldUseMultiAi: false,
      maxConcurrency: 1,
    };
  }

  // 9. Long Context Analysis (e.g., Long code/context prompt)
  if (intent === "LONG_CONTEXT") {
    return {
      mode: JARVIS_MODES.AUTO,
      strategy: "extended_context_engine",
      title: "NEXORA AI High-Token Ingestion Engine",
      selectedProvider: "gemini",
      selectedModel: "gemini-2.5-flash",
      selectionRationale: "Selected Gemini 2.5 Flash for large-context window ingestion (1M+ tokens), multi-file dependency resolution, and deep analysis.",
      targetProviders: ["gemini"],
      additionalProviders: [],
      description: "Extended context window processing with high-density token analysis",
      quotaCost: 1,
      requiresConsensus: false,
      shouldUseMultiAi: false,
      maxConcurrency: 1,
    };
  }

  // 10. Multi-Opinion / Tradeoffs (e.g., Prompt that benefits from multiple AI opinions)
  if (intent === "MULTI_OPINION") {
    return {
      mode: JARVIS_MODES.AUTO,
      strategy: "multi_perspective_consensus",
      title: "NEXORA AI Multi-Perspective Consensus Engine",
      selectedProvider: "gemini",
      selectedModel: "gemini-2.5-flash",
      selectionRationale: "Engaged multi-provider parallel evaluation (Gemini, DeepSeek, Groq, Cerebras) to gather diverse perspectives and synthesize consensus.",
      targetProviders: ["gemini", "deepseek", "groq", "cerebras"],
      additionalProviders: ["deepseek", "groq", "cerebras"],
      description: "Parallel multi-opinion comparison and unified trade-off synthesis",
      quotaCost: 1,
      requiresConsensus: true,
      shouldUseMultiAi: true,
      maxConcurrency: 4,
    };
  }

  // Deterministic utility bypass
  if (intent === "UTILITY" || intentResult.scope === "deterministic") {
    return {
      mode: JARVIS_MODES.AUTO,
      strategy: "deterministic_bypass",
      title: "Deterministic Engine",
      selectedProvider: "deterministic",
      selectedModel: "none",
      selectionRationale: "Task can be executed deterministically without AI tokens.",
      targetProviders: [],
      additionalProviders: [],
      description: "Direct zero-AI deterministic execution",
      quotaCost: 0,
      requiresConsensus: false,
      shouldUseMultiAi: false,
      maxConcurrency: 0,
    };
  }

  // Default Standard Fast Auto
  return {
    mode: JARVIS_MODES.AUTO,
    strategy: "standard_fast",
    title: "NEXORA AI Autonomous Engine",
    selectedProvider: "gemini",
    selectedModel: "gemini-2.5-flash",
    selectionRationale: "Selected Gemini 2.5 Flash for optimal speed and general intelligence.",
    targetProviders: ["gemini"],
    additionalProviders: [],
    description: "General autonomous intelligence routing",
    quotaCost: 1,
    requiresConsensus: false,
    shouldUseMultiAi: false,
    maxConcurrency: 1,
  };
}

