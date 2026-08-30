// NEXORA AI 10-AI Real Provider Integration & Adapter Engine
// True server-side connectors for all 10 AI providers with zero mock responses,
// bounded timeouts, secret redaction, safe logging, and normalized output interfaces.

import "dotenv/config";
import { GoogleGenAI } from "@google/genai";


export interface NormalizedProviderResult {
  provider: string;
  model: string;
  success: boolean;
  text: string;
  response?: string; // alias for compatibility
  latencyMs: number;
  startedAt: number;
  completedAt: number;
  error: string | null;
  status: "online" | "offline" | "unconfigured" | "timeout" | "error" | "configured";
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface ProviderConfig {
  id: string;
  name: string;
  envKey: string;
  envModelKey: string;
  defaultModel: string;
  endpoint: string;
  type: "google" | "openai-compatible" | "cohere" | "huggingface" | "ollama";
  specialty: string;
}

export const PROVIDER_REGISTRY: Record<string, ProviderConfig> = {
  gemini: {
    id: "gemini",
    name: "Gemini 3.6 Flash",
    envKey: "GEMINI_API_KEY",
    envModelKey: "GEMINI_MODEL",
    defaultModel: "gemini-3.6-flash",
    endpoint: "https://generativelanguage.googleapis.com",
    type: "google",
    specialty: "Full-stack synthesis, multimodal AST parsing & fast layout repair",
  },
  deepseek: {
    id: "deepseek",
    name: "DeepSeek Reasoner V3",
    envKey: "DEEPSEEK_API_KEY",
    envModelKey: "DEEPSEEK_MODEL",
    defaultModel: "deepseek-chat",
    endpoint: "https://api.deepseek.com/chat/completions",
    type: "openai-compatible",
    specialty: "Deep algorithmic reasoning, complex bug isolation & logic verification",
  },
  groq: {
    id: "groq",
    name: "Groq Llama 3.3 70B",
    envKey: "GROQ_API_KEY",
    envModelKey: "GROQ_MODEL",
    defaultModel: "llama-3.3-70b-versatile",
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    type: "openai-compatible",
    specialty: "Ultra-low latency inference, instant regex & syntax validation",
  },
  cerebras: {
    id: "cerebras",
    name: "Cerebras Llama 3.1 70B",
    envKey: "CEREBRAS_API_KEY",
    envModelKey: "CEREBRAS_MODEL",
    defaultModel: "llama3.1-70b",
    endpoint: "https://api.cerebras.ai/v1/chat/completions",
    type: "openai-compatible",
    specialty: "High-throughput code generation & AST reconstruction",
  },
  openrouter: {
    id: "openrouter",
    name: "OpenRouter Unified Gateway",
    envKey: "OPENROUTER_API_KEY",
    envModelKey: "OPENROUTER_MODEL",
    defaultModel: "anthropic/claude-3.5-sonnet",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    type: "openai-compatible",
    specialty: "Multi-model routing, edge-case analysis & architecture auditing",
  },
  sambanova: {
    id: "sambanova",
    name: "SambaNova Qwen 2.5 72B",
    envKey: "SAMBANOVA_API_KEY",
    envModelKey: "SAMBANOVA_MODEL",
    defaultModel: "Qwen2.5-72B-Instruct",
    endpoint: "https://api.sambanova.ai/v1/chat/completions",
    type: "openai-compatible",
    specialty: "Complex multilingual reasoning & full-stack refactoring",
  },
  deepinfra: {
    id: "deepinfra",
    name: "DeepInfra Mixtral 8x22B",
    envKey: "DEEPINFRA_API_KEY",
    envModelKey: "DEEPINFRA_MODEL",
    defaultModel: "mistralai/Mixtral-8x22B-Instruct-v0.1",
    endpoint: "https://api.deepinfra.com/v1/openai/chat/completions",
    type: "openai-compatible",
    specialty: "Distributed code analysis, multi-file diffing & security inspection",
  },
  cohere: {
    id: "cohere",
    name: "Cohere Command R+",
    envKey: "COHERE_API_KEY",
    envModelKey: "COHERE_MODEL",
    defaultModel: "command-r-plus",
    endpoint: "https://api.cohere.com/v2/chat",
    type: "cohere",
    specialty: "Structured output generation, API schema design & documentation",
  },
  huggingface: {
    id: "huggingface",
    name: "Hugging Face StarCoder2 15B",
    envKey: "HUGGINGFACE_API_KEY",
    envModelKey: "HUGGINGFACE_MODEL",
    defaultModel: "bigcode/starcoder2-15b",
    endpoint: "https://router.huggingface.co/novita/v1/chat/completions",
    type: "huggingface",
    specialty: "Precise token completion, function signatures & unit test synthesis",
  },
  ollama: {
    id: "ollama",
    name: "Ollama Local (Qwen 2.5-Coder)",
    envKey: "OLLAMA_URL",
    envModelKey: "OLLAMA_MODEL",
    defaultModel: "qwen2.5-coder:7b",
    endpoint: process.env.OLLAMA_URL || process.env.OLLAMA_BASE_URL || "http://localhost:11434",
    type: "ollama",
    specialty: "Air-gapped local execution & zero-network developer privacy",
  },
};

export const REQUEST_TIMEOUT_MS = 15000;
export const HEALTH_CHECK_TIMEOUT_MS = 5000;

/**
 * Redacts secrets from text before sending to external AI or logs
 */
export function sanitizeSecrets(text: string): string {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/(postgres|mysql|mongodb|redis|amqp|couchdb):\/\/[^:\s]+:([^@\s]+)@/gi, "$1://[REDACTED_USER]:[REDACTED_SECRET]@")
    .replace(/Bearer\s+[A-Za-z0-9\-\._~\+\/]+=*/gi, "Bearer [REDACTED_SECRET]")
    .replace(/(?:api[_-]?key|secret[_-]?key|client[_-]?secret|password|pwd)\s*[:=]\s*["'][A-Za-z0-9\-_+=!@#$%^&*()]{8,}["']/gi, '$1: "[REDACTED_SECRET]"')
    .replace(/ghp_[A-Za-z0-9]{30,}/g, "[REDACTED_SECRET]")
    .replace(/AIza[0-9A-Za-z-_]{30,}/g, "[REDACTED_SECRET]")
    .replace(/sk-[A-Za-z0-9]{20,}/g, "[REDACTED_SECRET]")
    .replace(/gsk_[A-Za-z0-9]{20,}/g, "[REDACTED_SECRET]")
    .replace(/csk-[A-Za-z0-9]{20,}/g, "[REDACTED_SECRET]")
    .replace(/hf_[A-Za-z0-9]{25,}/g, "[REDACTED_SECRET]")
    .replace(/sec_(?:sandbox_)?[a-zA-Z0-9_-]{15,}/g, "[REDACTED_SECRET]");
}


/**
 * Safe backend logging without leaking secrets or headers
 */
export function logAiOperation(params: {
  provider: string;
  model: string;
  status: string;
  latencyMs: number;
  requestId?: string;
  error?: string | null;
}) {
  const timestamp = new Date().toISOString();
  const safeError = params.error ? ` | error: ${sanitizeSecrets(params.error)}` : "";
  console.log(
    `[NEXORA AI] [${timestamp}] provider=${params.provider} model=${params.model} status=${params.status} latency=${params.latencyMs}ms reqId=${params.requestId || "internal"}${safeError}`
  );
}

/**
 * Resolves active model for a provider: Environment override -> Project default -> Safe fallback
 */
export function getProviderModel(providerId: string): string {
  const config = PROVIDER_REGISTRY[providerId.toLowerCase()];
  if (!config) return "unknown";
  let envModel = process.env[config.envModelKey];
  if (envModel) {
    envModel = envModel.replace(/^[^=]+=\s*/, "").trim();
  }
  if (providerId.toLowerCase() === "gemini") {
    if (!envModel || envModel.includes("gemini-2.5-flash") || envModel.includes("gemini-1.5")) {
      return "gemini-3.6-flash";
    }
  }
  return envModel || config.defaultModel;
}


/**
 * Checks if a provider has configured credentials
 */
export function isProviderConfigured(providerId: string, customApiKey?: string): boolean {
  const pid = providerId.toLowerCase();
  const config = PROVIDER_REGISTRY[pid];
  if (!config) return false;

  if (pid === "gemini") {
    return Boolean(customApiKey || process.env.GEMINI_API_KEY);
  }
  if (pid === "ollama") {
    // Ollama URL defaults to local host if set or reachable
    return Boolean(process.env.OLLAMA_URL || process.env.OLLAMA_BASE_URL);
  }
  return Boolean(process.env[config.envKey]);
}

/**
 * Performs a real health / connectivity check for a single provider
 */
export async function checkSingleProviderHealth(
  providerId: string,
  customApiKey?: string
): Promise<{
  id: string;
  name: string;
  configured: boolean;
  status: "online" | "offline" | "unconfigured" | "error" | "timeout";
  model: string;
  latencyMs?: number;
  error?: string;
}> {
  const pid = providerId.toLowerCase();
  const config = PROVIDER_REGISTRY[pid];
  if (!config) {
    return {
      id: providerId,
      name: providerId,
      configured: false,
      status: "unconfigured",
      model: "unknown",
      error: "Unknown provider ID",
    };
  }

  const model = getProviderModel(pid);
  const isConfigured = isProviderConfigured(pid, customApiKey);

  if (!isConfigured) {
    return {
      id: pid,
      name: config.name,
      configured: false,
      status: "unconfigured",
      model,
    };
  }

  const startTime = Date.now();

  try {
    if (pid === "gemini") {
      const apiKey = customApiKey || process.env.GEMINI_API_KEY || "";
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } },
      });
      // Quick lightweight ping
      const res = await Promise.race([
        ai.models.generateContent({
          model,
          contents: "ping",
          config: { maxOutputTokens: 2, temperature: 0.1 },
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Gemini health check timeout")), HEALTH_CHECK_TIMEOUT_MS)
        ),
      ]);
      const latencyMs = Date.now() - startTime;
      if (res && res.text !== undefined) {
        return { id: pid, name: config.name, configured: true, status: "online", model, latencyMs };
      }
      return { id: pid, name: config.name, configured: true, status: "error", model, latencyMs, error: "Empty response" };
    }

    if (pid === "ollama") {
      const ollamaUrl = process.env.OLLAMA_URL || process.env.OLLAMA_BASE_URL || "http://localhost:11434";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), HEALTH_CHECK_TIMEOUT_MS);

      const res = await fetch(`${ollamaUrl}/api/tags`, {
        signal: controller.signal,
      }).catch((err) => {
        throw new Error(`Ollama unreachable at ${ollamaUrl}: ${err.message}`);
      });
      clearTimeout(timeoutId);

      const latencyMs = Date.now() - startTime;
      if (res.ok) {
        const data = await res.json().catch(() => ({ models: [] }));
        const models = Array.isArray(data.models) ? data.models.map((m: any) => m.name || m.model) : [];
        const hasModel = models.some((m: string) => m.includes(model.split(":")[0]));
        return {
          id: pid,
          name: config.name,
          configured: true,
          status: "online",
          model: hasModel ? model : (models[0] || model),
          latencyMs,
        };
      }
      return {
        id: pid,
        name: config.name,
        configured: true,
        status: "offline",
        model,
        latencyMs,
        error: `Ollama server returned HTTP ${res.status}`,
      };
    }

    // OpenAI-Compatible Providers & Others (DeepSeek, Groq, Cerebras, OpenRouter, SambaNova, DeepInfra)
    const apiKey = process.env[config.envKey] || "";
    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    if (pid === "openrouter") {
      headers["HTTP-Referer"] = "https://ai.studio/build";
      headers["X-Title"] = "NEXORA AI";
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), HEALTH_CHECK_TIMEOUT_MS);

    let bodyPayload: any = {
      model,
      messages: [{ role: "user", content: "ping" }],
      max_tokens: 2,
      temperature: 0.1,
    };

    if (config.type === "cohere") {
      bodyPayload = {
        model,
        messages: [{ role: "user", content: "ping" }],
      };
    }

    const res = await fetch(config.endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyPayload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const latencyMs = Date.now() - startTime;
    if (res.ok) {
      return { id: pid, name: config.name, configured: true, status: "online", model, latencyMs };
    }

    const errBody = await res.text().catch(() => "");
    const safeErr = sanitizeSecrets(errBody.slice(0, 150));
    return {
      id: pid,
      name: config.name,
      configured: true,
      status: res.status === 401 || res.status === 403 ? "error" : "offline",
      model,
      latencyMs,
      error: `HTTP ${res.status}: ${safeErr || res.statusText}`,
    };
  } catch (err: any) {
    const latencyMs = Date.now() - startTime;
    const isTimeout = err.name === "AbortError" || err.message?.includes("timeout");
    return {
      id: pid,
      name: config.name,
      configured: true,
      status: isTimeout ? "timeout" : "offline",
      model,
      latencyMs,
      error: sanitizeSecrets(err.message || "Connection failed"),
    };
  }
}

/**
 * Returns real verified health information for all 10 providers in parallel
 */
export async function getAllProvidersHealth(customApiKey?: string) {
  const providerIds = Object.keys(PROVIDER_REGISTRY);
  const healthPromises = providerIds.map((id) => checkSingleProviderHealth(id, customApiKey));
  const results = await Promise.all(healthPromises);

  const configuredCount = results.filter((r) => r.configured).length;
  const onlineCount = results.filter((r) => r.status === "online").length;

  return {
    providers: results,
    totalSlots: providerIds.length,
    configuredCount,
    onlineCount,
    timestamp: Date.now(),
  };
}

/**
 * Executes a REAL API request for a single provider with strict timeout and secret redaction
 */
export async function executeRealProvider(
  providerId: string,
  prompt: string,
  contextCode: string = "",
  options: {
    customApiKey?: string;
    timeoutMs?: number;
    requestId?: string;
  } = {}
): Promise<NormalizedProviderResult> {
  const pid = providerId.toLowerCase();
  const config = PROVIDER_REGISTRY[pid];
  const startedAt = Date.now();
  const requestId = options.requestId || "req_" + Math.random().toString(36).substring(2, 9);
  const timeoutMs = options.timeoutMs || REQUEST_TIMEOUT_MS;

  if (!config) {
    const completedAt = Date.now();
    const res: NormalizedProviderResult = {
      provider: pid,
      model: "unknown",
      success: false,
      text: "",
      response: "",
      latencyMs: completedAt - startedAt,
      startedAt,
      completedAt,
      error: `Unknown provider: ${pid}`,
      status: "error",
    };
    logAiOperation({ provider: pid, model: "unknown", status: "error", latencyMs: res.latencyMs, requestId, error: res.error });
    return res;
  }

  const model = getProviderModel(pid);
  const isConfigured = isProviderConfigured(pid, options.customApiKey);

  // CRITICAL RULE: If API key is missing, DO NOT attempt external request or fake response.
  if (!isConfigured) {
    const completedAt = Date.now();
    const res: NormalizedProviderResult = {
      provider: pid,
      model,
      success: false,
      text: "",
      response: "",
      latencyMs: 0,
      startedAt,
      completedAt,
      error: `Provider unconfigured: missing ${config.envKey}`,
      status: "unconfigured",
    };
    logAiOperation({ provider: pid, model, status: "unconfigured", latencyMs: 0, requestId });
    return res;
  }

  const safePrompt = sanitizeSecrets(prompt);
  const safeContext = sanitizeSecrets(contextCode);
  
  const hasContext = safeContext && safeContext !== "No context provided." && safeContext.trim().length > 0;
  const combinedUserMessage = hasContext
    ? `You are NEXORA AI, an autonomous elite multi-model intelligence and software engineering engine.

Task / User Request:
${safePrompt}

Code / Input Context:
${safeContext}

Instructions:
1. Provide a comprehensive, accurate, and high-quality response directly addressing the user request.
2. If code or a patch is required, output clean, production-ready code with valid syntax and best practices.
3. If analysis, mathematical reasoning, explanation, or architecture review is requested, provide clear and structured output.`
    : `You are NEXORA AI, an autonomous elite multi-model intelligence and software engineering engine.

User Request:
${safePrompt}

Instructions:
1. Provide a direct, authoritative, and high-quality response addressing the user request thoroughly.
2. If code is requested, provide clean, production-ready code with explanations.
3. If conceptual explanation, mathematical reasoning, creative storytelling, security analysis, or system architecture is requested, provide a structured, complete, and engaging response.`;

  try {
    if (pid === "gemini") {
      const apiKey = options.customApiKey || process.env.GEMINI_API_KEY || "";
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } },
      });

      let genRes: any;
      let usedModel = model;
      try {
        genRes = await Promise.race([
          ai.models.generateContent({
            model: usedModel,
            contents: combinedUserMessage,
            config: {
              temperature: 0.2,
              maxOutputTokens: 3000,
            },
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Gemini request timeout")), timeoutMs)
          ),
        ]);
      } catch (geminiErr: any) {
        // If the model was not found / deprecated, retry with gemini-3.6-flash or gemini-2.5-flash
        const altModel = usedModel === "gemini-3.6-flash" ? "gemini-2.5-flash" : "gemini-3.6-flash";
        try {
          usedModel = altModel;
          genRes = await Promise.race([
            ai.models.generateContent({
              model: usedModel,
              contents: combinedUserMessage,
              config: {
                temperature: 0.2,
                maxOutputTokens: 3000,
              },
            }),
            new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error("Gemini retry timeout")), timeoutMs)
            ),
          ]);
        } catch (retryErr: any) {
          throw retryErr;
        }
      }

      const completedAt = Date.now();
      const latencyMs = completedAt - startedAt;
      const text = genRes.text || "";

      const res: NormalizedProviderResult = {
        provider: pid,
        model,
        success: Boolean(text.trim()),
        text,
        response: text,
        latencyMs,
        startedAt,
        completedAt,
        error: text.trim() ? null : "Empty response received from Gemini",
        status: text.trim() ? "online" : "error",
        tokenUsage: {
          promptTokens: genRes.usageMetadata?.promptTokenCount || 0,
          completionTokens: genRes.usageMetadata?.candidatesTokenCount || 0,
          totalTokens: genRes.usageMetadata?.totalTokenCount || 0,
        },
      };
      logAiOperation({ provider: pid, model, status: res.status, latencyMs, requestId, error: res.error });
      return res;
    }

    if (pid === "ollama") {
      const ollamaUrl = process.env.OLLAMA_URL || process.env.OLLAMA_BASE_URL || "http://localhost:11434";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const fetchRes = await fetch(`${ollamaUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: combinedUserMessage }],
          stream: false,
          options: { temperature: 0.2 },
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const completedAt = Date.now();
      const latencyMs = completedAt - startedAt;

      if (!fetchRes.ok) {
        const errText = await fetchRes.text().catch(() => "");
        throw new Error(`Ollama HTTP ${fetchRes.status}: ${sanitizeSecrets(errText)}`);
      }

      const data = await fetchRes.json();
      const text = data.message?.content || data.response || "";

      const res: NormalizedProviderResult = {
        provider: pid,
        model,
        success: Boolean(text.trim()),
        text,
        response: text,
        latencyMs,
        startedAt,
        completedAt,
        error: text.trim() ? null : "Empty response from Ollama",
        status: text.trim() ? "online" : "error",
      };
      logAiOperation({ provider: pid, model, status: res.status, latencyMs, requestId });
      return res;
    }

    if (pid === "cohere") {
      const apiKey = process.env.COHERE_API_KEY || "";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const fetchRes = await fetch(config.endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: combinedUserMessage }],
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const completedAt = Date.now();
      const latencyMs = completedAt - startedAt;

      if (!fetchRes.ok) {
        const errText = await fetchRes.text().catch(() => "");
        throw new Error(`Cohere HTTP ${fetchRes.status}: ${sanitizeSecrets(errText)}`);
      }

      const data = await fetchRes.json();
      const text = data.message?.content?.[0]?.text || data.text || "";

      const res: NormalizedProviderResult = {
        provider: pid,
        model,
        success: Boolean(text.trim()),
        text,
        response: text,
        latencyMs,
        startedAt,
        completedAt,
        error: text.trim() ? null : "Empty response from Cohere",
        status: text.trim() ? "online" : "error",
      };
      logAiOperation({ provider: pid, model, status: res.status, latencyMs, requestId });
      return res;
    }

    // Standard OpenAI-Compatible endpoints (DeepSeek, Groq, Cerebras, OpenRouter, SambaNova, DeepInfra, HuggingFace)
    const apiKey = process.env[config.envKey] || "";
    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    if (pid === "openrouter") {
      headers["HTTP-Referer"] = "https://ai.studio/build";
      headers["X-Title"] = "NEXORA AI";
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const fetchRes = await fetch(config.endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are NEXORA AI, an autonomous elite developer agent." },
          { role: "user", content: combinedUserMessage },
        ],
        temperature: 0.2,
        max_tokens: 3000,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const completedAt = Date.now();
    const latencyMs = completedAt - startedAt;

    if (!fetchRes.ok) {
      const errText = await fetchRes.text().catch(() => "");
      throw new Error(`${config.name} HTTP ${fetchRes.status}: ${sanitizeSecrets(errText)}`);
    }

    const data = await fetchRes.json();
    const text = data.choices?.[0]?.message?.content || "";

    const res: NormalizedProviderResult = {
      provider: pid,
      model,
      success: Boolean(text.trim()),
      text,
      response: text,
      latencyMs,
      startedAt,
      completedAt,
      error: text.trim() ? null : `Empty response from ${config.name}`,
      status: text.trim() ? "online" : "error",
      tokenUsage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
      },
    };
    logAiOperation({ provider: pid, model, status: res.status, latencyMs, requestId });
    return res;
  } catch (err: any) {
    const completedAt = Date.now();
    const latencyMs = completedAt - startedAt;
    const isTimeout = err.name === "AbortError" || err.message?.includes("timeout");
    const status = isTimeout ? "timeout" : "error";
    const errorMsg = sanitizeSecrets(err.message || "Execution failed");

    const res: NormalizedProviderResult = {
      provider: pid,
      model,
      success: false,
      text: "",
      response: "",
      latencyMs,
      startedAt,
      completedAt,
      error: isTimeout ? `Request timed out after ${timeoutMs}ms` : errorMsg,
      status,
    };
    logAiOperation({ provider: pid, model, status, latencyMs, requestId, error: res.error });
    return res;
  }
}

/**
 * Executes up to 10 AI providers concurrently in TRUE parallel orchestration
 */
export async function executeRealProvidersParallel(
  providerIds: string[],
  prompt: string,
  contextCode: string = "",
  options: {
    customApiKey?: string;
    timeoutMs?: number;
  } = {}
) {
  const parallelStart = Date.now();
  const requestId = "par_" + Math.random().toString(36).substring(2, 9);

  // Dispatch all provider requests simultaneously via Promise.allSettled
  const executionPromises = providerIds.map((id) =>
    executeRealProvider(id, prompt, contextCode, {
      ...options,
      requestId: `${requestId}_${id}`,
    })
  );

  const settled = await Promise.allSettled(executionPromises);
  const parallelEnd = Date.now();

  const results: NormalizedProviderResult[] = [];
  const successful: NormalizedProviderResult[] = [];
  const unconfigured: NormalizedProviderResult[] = [];
  const failed: NormalizedProviderResult[] = [];
  const timeouts: NormalizedProviderResult[] = [];

  settled.forEach((item, index) => {
    const pid = providerIds[index];
    if (item.status === "fulfilled") {
      const res = item.value;
      results.push(res);
      if (res.success) successful.push(res);
      else if (res.status === "unconfigured") unconfigured.push(res);
      else if (res.status === "timeout") timeouts.push(res);
      else failed.push(res);
    } else {
      const fallbackResult: NormalizedProviderResult = {
        provider: pid,
        model: getProviderModel(pid),
        success: false,
        text: "",
        response: "",
        latencyMs: parallelEnd - parallelStart,
        startedAt: parallelStart,
        completedAt: parallelEnd,
        error: item.reason?.message || "Promise rejected",
        status: "error",
      };
      results.push(fallbackResult);
      failed.push(fallbackResult);
    }
  });

  return {
    requestId,
    totalRequested: providerIds.length,
    startedCount: results.length,
    successCount: successful.length,
    unconfiguredCount: unconfigured.length,
    failedCount: failed.length,
    timeoutCount: timeouts.length,
    parallelDurationMs: parallelEnd - parallelStart,
    results,
    successful,
  };
}

/**
 * Prints startup diagnostics for all 10 providers without exposing secrets
 */
export function printProviderStartupDiagnostics() {
  console.log("\n════════════════════════════════════════════════════════════");
  console.log(" NEXORA AI 10-AI PARALLEL DEVELOPER ENGINE — STARTUP STATUS");
  console.log("════════════════════════════════════════════════════════════");
  Object.values(PROVIDER_REGISTRY).forEach((p) => {
    const configured = isProviderConfigured(p.id);
    const model = getProviderModel(p.id);
    const statusText = configured ? "configured" : "unconfigured";
    const paddedName = p.name.padEnd(32, " ");
    console.log(` ${paddedName} [${statusText.toUpperCase()}] (model: ${model})`);
  });
  console.log("════════════════════════════════════════════════════════════\n");
}
