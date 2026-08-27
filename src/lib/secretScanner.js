// Secret Scanner & Redaction Utility
// Scans code strings for API keys, tokens, private keys, and passwords
// Prevents accidental leakage into Cloud Snippet Vault or prompts

export function detectSecretsInCode(code) {
  if (!code || typeof code !== "string") return [];

  const detections = [];
  const lines = code.split("\n");

  const rules = [
    { type: "GitHub Token (ghp / gho / pat)", pattern: /(ghp_[a-zA-Z0-9]{36}|gho_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9_]{40,})/ },
    { type: "Google / Gemini API Key (AIza...)", pattern: /AIza[0-9A-Za-z-_]{35}/ },
    { type: "OpenAI Secret Key (sk-...)", pattern: /sk-[a-zA-Z0-9]{20,}/ },
    { type: "Stripe Secret Key (sk_live / rk_live)", pattern: /(sk_live_[0-9a-zA-Z]{24,}|rk_live_[0-9a-zA-Z]{24,})/ },
    { type: "Private Key Header", pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
    { type: "Bearer Authorization Token", pattern: /Bearer\s+[a-zA-Z0-9_\-\.]{25,}/i },
    { type: "Database Connection String with Password", pattern: /(postgres(?:ql)?|mongodb(?:\+srv)?|mysql):\/\/[^:]+:[^@\s]+@[^\/\s]+/i },
    { type: "Hardcoded API Key / Secret Assignment", pattern: /\b(API_KEY|SECRET_KEY|AUTH_TOKEN|PRIVATE_KEY|DB_PASSWORD|PASSWORD)\s*=\s*['"][a-zA-Z0-9_\-]{8,}['"]/i },
  ];

  lines.forEach((lineText, index) => {
    rules.forEach((rule) => {
      const match = lineText.match(rule.pattern);
      if (match) {
        detections.push({
          type: rule.type,
          matched: match[0].length > 30 ? match[0].substring(0, 15) + "..." + match[0].slice(-6) : match[0],
          line: index + 1,
        });
      }
    });
  });

  return detections;
}

export function redactSecretsInCode(code) {
  if (!code || typeof code !== "string") return { sanitized: "", count: 0 };
  let count = 0;
  let sanitized = code;

  const patterns = [
    /(ghp_[a-zA-Z0-9]{36}|gho_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9_]{40,})/g,
    /AIza[0-9A-Za-z-_]{35}/g,
    /sk-[a-zA-Z0-9]{20,}/g,
    /(sk_live_[0-9a-zA-Z]{24,}|rk_live_[0-9a-zA-Z]{24,})/g,
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
    /(postgres(?:ql)?:\/\/[^:]+:)([^@\s]+)(@[^\/\s]+)/gi,
    /(mongodb(?:\+srv)?:\/\/[^:]+:)([^@\s]+)(@[^\/\s]+)/gi,
    /(Bearer\s+)[a-zA-Z0-9_\-\.]{25,}/gi,
  ];

  patterns.forEach((pat) => {
    sanitized = sanitized.replace(pat, (match) => {
      count++;
      if (match.startsWith("-----BEGIN")) {
        return "-----BEGIN PRIVATE KEY-----\n[REDACTED_PRIVATE_KEY]\n-----END PRIVATE KEY-----";
      }
      return "[REDACTED_SECRET]";
    });
  });

  return { sanitized, count };
}
