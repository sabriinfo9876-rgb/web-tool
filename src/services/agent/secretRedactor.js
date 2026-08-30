// JARVIS Secret Redactor
// High-efficiency zero-trust redactor for sanitizing context, code, and prompts before sending to AI providers

const SECRET_PATTERNS = [
  // 1. Bearer tokens & Authorization headers
  /Bearer\s+[A-Za-z0-9\-\._~\+\/]+=*/gi,
  /authorization:\s*["']?[A-Za-z0-9\-\._~\+\/]+=*["']?/gi,
  
  // 2. Generic API keys & Secret variables (e.g. api_key="...", secret_key='...')
  /(?:api[_-]?key|secret[_-]?key|client[_-]?secret|access[_-]?token|auth[_-]?token|private[_-]?key|password|passwd|pwd)\s*[:=]\s*["'][A-Za-z0-9\-_+=!@#$%^&*()]{8,}["']/gi,
  
  // 3. Known Provider Keys & Tokens
  /ghp_[A-Za-z0-9]{36,}/g, // GitHub Personal Access Token
  /gho_[A-Za-z0-9]{36,}/g, // GitHub OAuth Token
  /github_pat_[A-Za-z0-9_]{60,}/g, // GitHub Fine-Grained PAT
  /AIza[0-9A-Za-z-_]{35}/g, // Google / Firebase API Key
  /sk-[A-Za-z0-9]{20,}/g, // OpenAI / DeepSeek / Anthropic style keys
  /gsk_[A-Za-z0-9]{20,}/g, // Groq API key
  /csk-[A-Za-z0-9]{20,}/g, // Cerebras API key
  /hf_[A-Za-z0-9]{30,}/g, // Hugging Face token
  /sec_(?:sandbox_)?[a-zA-Z0-9_-]{20,}/g, // Safepay Secret Key
  
  // 4. JWT Token Strings (3 base64 chunks separated by dots)
  /eyJ[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]+/g,
  
  // 5. RSA / Private Keys
  /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g,
  
  // 6. DB Connection URIs (e.g. postgres://user:pass@host:5432/db)
  /(?:mongodb(?:\+srv)?|postgres(?:ql)?|mysql|redis):\/\/[^:\s]+:[^@\s]+@[^\s/]+/gi,
];

/**
 * Sanitizes input string by replacing all identified secrets with [REDACTED_SECRET]
 * @param {string|object} input 
 * @returns {string} Sanitized string safe for external AI dispatch
 */
export function redactSecrets(input) {
  if (input === null || input === undefined) return "";
  let text = typeof input === "string" ? input : JSON.stringify(input, null, 2);

  for (const pattern of SECRET_PATTERNS) {
    text = text.replace(pattern, (match) => {
      // If matching key-value pair like apiKey = "xyz", preserve the key name
      if (match.includes("=") || match.includes(":")) {
        const parts = match.split(/[:=]/);
        const prefix = parts[0];
        return `${prefix}: "[REDACTED_SECRET]"`;
      }
      return "[REDACTED_SECRET]";
    });
  }

  return text;
}
