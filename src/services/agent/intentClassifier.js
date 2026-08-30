// NEXORA AI Intent Classifier
// Analyzes natural language prompts and classifies intent, confidence, scope, and risk level

export const INTENTS = {
  EXPLAIN: "EXPLAIN",
  MATH: "MATH",
  GENERATE: "GENERATE",
  DEBUG: "DEBUG",
  SECURITY: "SECURITY",
  DESIGN: "DESIGN",
  ARCHITECTURE: "ARCHITECTURE",
  CREATIVE: "CREATIVE",
  LONG_CONTEXT: "LONG_CONTEXT",
  MULTI_OPINION: "MULTI_OPINION",
  FIX: "FIX",
  REFACTOR: "REFACTOR",
  ANALYZE: "ANALYZE",
  OPTIMIZE: "OPTIMIZE",
  CONVERT: "CONVERT",
  SEO: "SEO",
  GITHUB: "GITHUB",
  TEST: "TEST",
  DOCUMENTATION: "DOCUMENTATION",
  UTILITY: "UTILITY",
};

export const RISK_LEVELS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

/**
 * Classifies natural language developer prompt
 * @param {string} prompt 
 * @param {object} context 
 * @returns {object} Structured intent classification
 */
export function classifyIntent(prompt, context = {}) {
  if (!prompt || typeof prompt !== "string") {
    return {
      intent: INTENTS.UTILITY,
      confidence: 0.5,
      scope: "general",
      risk: RISK_LEVELS.LOW,
      summary: "General developer utility request",
    };
  }

  const clean = prompt.toLowerCase();
  const promptLen = prompt.length;

  // 1. MULTI-OPINION / TRADEOFF / DEBATE PROMPT
  if (
    clean.includes("multiple ai opinions") ||
    clean.includes("multiple opinions") ||
    clean.includes("tradeoffs") ||
    clean.includes("trade-offs") ||
    clean.includes("pros and cons") ||
    clean.includes("compare approaches") ||
    clean.includes("debate") ||
    clean.includes("differing perspectives") ||
    clean.includes("consensus between")
  ) {
    return {
      intent: INTENTS.MULTI_OPINION,
      confidence: 0.98,
      scope: "multi_perspective",
      risk: RISK_LEVELS.LOW,
      summary: "Multi-perspective synthesis across diverse AI provider viewpoints",
      primaryGoal: "Gather viewpoints from multiple AI providers and synthesize balanced tradeoffs",
    };
  }

  // 2. LONG CONTEXT / EXTENSIVE REPO / MULTI-MODULE PROMPT
  if (
    promptLen > 600 ||
    clean.includes("entire codebase") ||
    clean.includes("long code") ||
    clean.includes("extensive context") ||
    clean.includes("multi-file architecture")
  ) {
    return {
      intent: INTENTS.LONG_CONTEXT,
      confidence: 0.95,
      scope: "deep_context",
      risk: RISK_LEVELS.LOW,
      summary: "High-token context ingestion and multi-file code analysis",
      primaryGoal: "Ingest and process long context tokens with deep AST comprehension",
    };
  }

  // 3. MATHEMATICAL REASONING & ALGORITHMIC PROOFS
  if (
    clean.includes("mathematical") ||
    clean.includes("quadratic formula") ||
    clean.includes("math problem") ||
    clean.includes("calculus") ||
    clean.includes("algebra") ||
    clean.includes("derive") ||
    clean.includes("derivation") ||
    clean.includes("theorem") ||
    clean.includes("proof") ||
    clean.includes("equation")
  ) {
    return {
      intent: INTENTS.MATH,
      confidence: 0.97,
      scope: "algorithmic_math",
      risk: RISK_LEVELS.LOW,
      summary: "Deep step-by-step mathematical reasoning, proofs, and algebraic derivations",
      primaryGoal: "Solve mathematical equation and rigorously explain the underlying mathematical foundation",
    };
  }

  // 4. CREATIVE WRITING & NARRATIVE
  if (
    clean.includes("creative short story") ||
    clean.includes("short story") ||
    clean.includes("creative story") ||
    clean.includes("write a story") ||
    clean.includes("narrative") ||
    clean.includes("fiction") ||
    clean.includes("poem")
  ) {
    return {
      intent: INTENTS.CREATIVE,
      confidence: 0.97,
      scope: "creative_narrative",
      risk: RISK_LEVELS.LOW,
      summary: "Creative narrative composition and expressive storytelling",
      primaryGoal: "Craft engaging, nuanced, and evocative creative prose",
    };
  }

  // 5. SECURITY & CRYPTO AUDITING
  if (
    clean.includes("security") ||
    clean.includes("vulnerabilit") ||
    clean.includes("xss") ||
    clean.includes("sql injection") ||
    clean.includes("csrf") ||
    clean.includes("jwt") ||
    clean.includes("sanitize") ||
    clean.includes("audit code")
  ) {
    return {
      intent: INTENTS.SECURITY,
      confidence: 0.96,
      scope: "security_audit",
      risk: RISK_LEVELS.HIGH,
      summary: "Security vulnerability scanning, penetration resistance, and crypto auditing",
      primaryGoal: "Detect CVEs, OWASP Top 10 vulnerabilities, and provide hardened patches",
    };
  }

  // 6. DEBUGGING & BUG ISOLATION
  if (
    clean.includes("debug") ||
    clean.includes("explain the bug") ||
    clean.includes("why is my") ||
    clean.includes("failing") ||
    clean.includes("fail") ||
    clean.includes("crash") ||
    clean.includes("error") ||
    clean.includes("broken") ||
    clean.includes("syntax error") ||
    clean.includes("bug in")
  ) {
    return {
      intent: INTENTS.DEBUG,
      confidence: 0.96,
      scope: "bug_isolation",
      risk: RISK_LEVELS.MEDIUM,
      summary: "Root-cause bug isolation, stack trace diagnosis, and precision bug fixing",
      primaryGoal: "Isolate defect, explain why it failed, and produce a verified fix",
    };
  }

  // 7. SOFTWARE ARCHITECTURE & SYSTEM DESIGN
  if (
    clean.includes("software architecture") ||
    clean.includes("system architecture") ||
    clean.includes("system design") ||
    clean.includes("microservices") ||
    clean.includes("architecture pattern") ||
    clean.includes("distributed system") ||
    clean.includes("event-driven")
  ) {
    return {
      intent: INTENTS.ARCHITECTURE,
      confidence: 0.95,
      scope: "system_architecture",
      risk: RISK_LEVELS.LOW,
      summary: "High-level software architecture evaluation, topologies, and design patterns",
      primaryGoal: "Deconstruct architectural patterns, scaling mechanics, and component interactions",
    };
  }

  // 8. BACKEND & API ENGINEERING
  if (
    clean.includes("authentication api") ||
    clean.includes("express.js") ||
    clean.includes("backend api") ||
    clean.includes("rest api") ||
    clean.includes("auth api") ||
    clean.includes("express api") ||
    clean.includes("crud api") ||
    clean.includes("api endpoint")
  ) {
    return {
      intent: INTENTS.GENERATE,
      confidence: 0.96,
      scope: "backend_api",
      risk: RISK_LEVELS.MEDIUM,
      summary: "Production-ready backend API implementation, middleware, and authentication",
      primaryGoal: "Synthesize complete, secure Express.js routes, JWT handling, and input validation",
    };
  }

  // 9. UI GENERATION & RESPONSIVE DASHBOARD
  if (
    clean.includes("dashboard") ||
    clean.includes("responsive react") ||
    clean.includes("react dashboard") ||
    clean.includes("responsive") ||
    clean.includes("landing page") ||
    clean.includes("tailwind component") ||
    clean.includes("build a responsive")
  ) {
    return {
      intent: INTENTS.DESIGN,
      confidence: 0.95,
      scope: "responsive_ui",
      risk: RISK_LEVELS.LOW,
      summary: "Modern responsive React dashboard synthesis with Tailwind CSS styling",
      primaryGoal: "Build responsive, interactive React components with clean UX layout",
    };
  }

  // 10. BASIC KNOWLEDGE / EXPLANATION ("What is JavaScript?", "Explain X")
  if (
    clean.startsWith("what is ") ||
    clean.startsWith("what are ") ||
    clean.startsWith("explain ") ||
    clean.startsWith("define ") ||
    clean.includes("what is javascript")
  ) {
    return {
      intent: INTENTS.EXPLAIN,
      confidence: 0.97,
      scope: "conceptual_knowledge",
      risk: RISK_LEVELS.LOW,
      summary: "Foundational conceptual explanation and technology breakdown",
      primaryGoal: "Deliver a crystal-clear, accurate, and structured explanation",
    };
  }

  // 11. GITHUB & REPOSITORY INTENT
  if (
    clean.includes("github") ||
    clean.includes("repo") ||
    clean.includes("pull request") ||
    clean.includes("pr ") ||
    clean.includes("git push") ||
    clean.includes("branch") ||
    clean.includes("clone")
  ) {
    const isWrite = clean.includes("create pr") || clean.includes("push") || clean.includes("commit") || clean.includes("fix repo");
    return {
      intent: INTENTS.GITHUB,
      confidence: 0.96,
      scope: "repository",
      risk: isWrite ? RISK_LEVELS.HIGH : RISK_LEVELS.MEDIUM,
      summary: isWrite ? "Automated GitHub repair & PR generation" : "GitHub repository inspection & audit",
      primaryGoal: "Inspect, repair, or generate pull requests for GitHub projects",
    };
  }

  // 12. SEO & META TAGS
  if (
    clean.includes("seo") ||
    clean.includes("meta tag") ||
    clean.includes("open graph") ||
    clean.includes("sitemap") ||
    clean.includes("robots.txt") ||
    clean.includes("twitter card")
  ) {
    return {
      intent: INTENTS.SEO,
      confidence: 0.95,
      scope: "seo",
      risk: RISK_LEVELS.LOW,
      summary: "Audit and generate SEO tags, Open Graph meta, and sitemaps",
      primaryGoal: "Maximize search engine indexability and social preview cards",
    };
  }

  // Default fallback: General analysis
  return {
    intent: INTENTS.ANALYZE,
    confidence: 0.90,
    scope: "general",
    risk: RISK_LEVELS.LOW,
    summary: "Analyze task and execute optimal autonomous intelligence engine",
    primaryGoal: "Analyze user prompt and orchestrate appropriate AI intelligence",
  };
}

