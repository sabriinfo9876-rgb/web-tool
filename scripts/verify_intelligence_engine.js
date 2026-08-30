// Verification runner for NEXORA AI Multi-AI Intelligence Engine
import http from "http";

const testCases = [
  {
    id: 1,
    name: "General Concept Explanation",
    prompt: "What is JavaScript?",
    code: "",
    mode: "auto",
  },
  {
    id: 2,
    name: "Mathematical Reasoning & Derivation",
    prompt: "Solve this complex mathematical problem: explain why the quadratic formula works.",
    code: "",
    mode: "auto",
  },
  {
    id: 3,
    name: "Production Backend & Auth API",
    prompt: "Write a production-quality Express.js authentication API.",
    code: "",
    mode: "auto",
  },
  {
    id: 4,
    name: "Debugging & Bug Isolation",
    prompt: "Debug this JavaScript code and explain the bug.",
    code: `function calculateAverage(items) {
  let sum = 0;
  for (let i = 0; i <= items.length; i++) {
    sum += items[i].price;
  }
  return sum / items.length;
}`,
    mode: "auto",
  },
  {
    id: 5,
    name: "Security Vulnerability Auditing",
    prompt: "Analyze this code for security vulnerabilities.",
    code: `app.post("/login", (req, res) => {
  const query = "SELECT * FROM users WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "'";
  db.execute(query, (err, rows) => {
    if (rows.length > 0) res.json({ token: jwt.sign(rows[0], "SECRET_KEY_123") });
  });
});`,
    mode: "auto",
  },
  {
    id: 6,
    name: "Responsive React Dashboard",
    prompt: "Build a responsive React dashboard.",
    code: "",
    mode: "auto",
  },
  {
    id: 7,
    name: "Software Architecture & System Design",
    prompt: "Explain this complex software architecture.",
    code: `// System Architecture: Event-driven distributed order processing
// Clients -> API Gateway -> Auth Middleware -> Order Service (gRPC)
// -> Kafka Event Topic (order.created) -> Inventory Service + Payment Service + Notification Service
// -> Outbox Table Pattern + Debezium CDC -> ElasticSearch Read Projections`,
    mode: "auto",
  },
  {
    id: 8,
    name: "Creative Narrative Storytelling",
    prompt: "Write a creative short story.",
    code: "",
    mode: "auto",
  },
  {
    id: 9,
    name: "Long Context Prompt & High-Density Ingestion",
    prompt: "Analyze this extensive codebase context and provide an architectural refactoring plan for performance, memory leakage prevention, and unified telemetry observability across all micro-modules.",
    code: `// Extensive Multi-Module Context Payload (Module A to Module H)
class ConnectionPool {
  constructor(size = 50) {
    this.pool = [];
    this.active = new Map();
    for (let i = 0; i < size; i++) this.pool.push({ id: i, socket: null, busy: false, lastActive: Date.now() });
  }
  acquire(clientId) {
    const conn = this.pool.find(c => !c.busy);
    if (!conn) throw new Error("Pool exhausted");
    conn.busy = true;
    this.active.set(clientId, conn);
    return conn;
  }
  release(clientId) {
    const conn = this.active.get(clientId);
    if (conn) { conn.busy = false; this.active.delete(clientId); }
  }
}
class CacheLayer {
  constructor(ttlMs = 60000) {
    this.store = new Map();
    this.ttl = ttlMs;
  }
  set(k, v) { this.store.set(k, { v, exp: Date.now() + this.ttl }); }
  get(k) {
    const entry = this.store.get(k);
    if (!entry) return null;
    if (Date.now() > entry.exp) { this.store.delete(k); return null; }
    return entry.v;
  }
}
class DispatchRouter {
  constructor() { this.routes = new Map(); }
  register(path, handler) { this.routes.set(path, handler); }
  async dispatch(path, payload) {
    const handler = this.routes.get(path);
    if (!handler) throw new Error("Route not found: " + path);
    return await handler(payload);
  }
}`,
    mode: "auto",
  },
  {
    id: 10,
    name: "Multi-Perspective AI Consensus",
    prompt: "Evaluate the tradeoffs and compare approaches with multiple AI opinions: Microservices architecture vs Modular Monolith for a high-growth fintech startup.",
    code: "",
    mode: "auto",
  },
];

function sendPostRequest(payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: 3000,
        path: "/api/ai/intelligence-engine",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
          "x-user-id": "test_verifier",
          "x-user-plan": "pro",
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(body);
            resolve({ statusCode: res.statusCode, data: parsed });
          } catch (e) {
            resolve({ statusCode: res.statusCode, error: body });
          }
        });
      }
    );

    req.on("error", (err) => reject(err));
    req.write(data);
    req.end();
  });
}

async function runAllTests() {
  console.log("=================================================================");
  console.log("NEXORA AI — 10-TEST RUNTIME VERIFICATION EXECUTION");
  console.log("=================================================================\n");

  const results = [];

  for (const tc of testCases) {
    console.log(`\n-------------------------------------------------------------`);
    console.log(`[TEST ${tc.id}/10]: ${tc.name}`);
    console.log(`Prompt: "${tc.prompt}"`);
    if (tc.code) console.log(`Input Context: [${tc.code.length} chars]`);

    const startTime = Date.now();
    try {
      const resp = await sendPostRequest({
        prompt: tc.prompt,
        code: tc.code,
        mode: tc.mode,
      });

      const totalTimeMs = Date.now() - startTime;
      const resData = resp.data;

      if (!resData || !resData.success) {
        console.error(`❌ FAILED (Status ${resp.statusCode}):`, resData?.error || resp.error);
        results.push({
          id: tc.id,
          name: tc.name,
          prompt: tc.prompt,
          success: false,
          error: resData?.error || resp.error,
        });
        continue;
      }

      console.log(`✅ SUCCESS (HTTP ${resp.statusCode}, Total: ${totalTimeMs}ms)`);
      console.log(`- Task Type: ${resData.taskType} (${resData.taskScope})`);
      console.log(`- Selected Provider: ${resData.selectedProvider}`);
      console.log(`- Selected Model: ${resData.selectedModel}`);
      console.log(`- Selection Rationale: ${resData.selectionRationale}`);
      console.log(`- Multi-AI Engaged: ${resData.multiAiEngaged ? "YES (" + resData.additionalProvidersUsed.join(", ") + ")" : "NO (Single Fast Provider)"}`);
      console.log(`- Fallback Used: ${resData.fallbackUsed ? "YES -> " + resData.fallbackDetails : "NO"}`);
      console.log(`- Real Inference: ${resData.realInference ? "VERIFIED REAL SDK INFERENCE" : "MOCK/STATIC"}`);
      console.log(`- Provider Latency: ${resData.latencyMs}ms`);
      console.log(`- Quota Charged: ${resData.quotaUsed} atomic unit`);
      console.log(`- Synthesis Summary: ${resData.synthesisSummary}`);
      console.log(`- Output Preview: ${String(resData.finalAnswer).slice(0, 180).replace(/\n/g, " ")}...`);

      results.push({
        id: tc.id,
        name: tc.name,
        prompt: tc.prompt,
        taskType: resData.taskType,
        selectedProvider: resData.selectedProvider,
        selectedModel: resData.selectedModel,
        selectionRationale: resData.selectionRationale,
        additionalProviders: resData.additionalProvidersUsed,
        multiAiEngaged: resData.multiAiEngaged,
        fallbackUsed: resData.fallbackUsed,
        fallbackDetails: resData.fallbackDetails,
        latencyMs: resData.latencyMs,
        realInference: resData.realInference,
        quotaUsed: resData.quotaUsed,
        synthesisSummary: resData.synthesisSummary,
        finalAnswerPreview: String(resData.finalAnswer).slice(0, 200),
        finalAnswer: resData.finalAnswer,
        success: true,
      });
    } catch (err) {
      console.error(`❌ EXECUTION EXCEPTION:`, err.message);
      results.push({
        id: tc.id,
        name: tc.name,
        prompt: tc.prompt,
        success: false,
        error: err.message,
      });
    }
  }

  console.log("\n=================================================================");
  console.log("FINAL VERIFICATION SUMMARY TABLE");
  console.log("=================================================================");
  console.table(
    results.map((r) => ({
      Test: `#${r.id}: ${r.name}`,
      "Task Type": r.taskType || "ERROR",
      "Selected AI": r.selectedProvider || "None",
      Model: r.selectedModel || "None",
      "Multi-AI": r.multiAiEngaged ? "Yes" : "No",
      Fallback: r.fallbackUsed ? "Engaged" : "Direct",
      "Real Inference": r.realInference ? "Verified" : "Failed",
      Latency: `${r.latencyMs || 0}ms`,
      Result: r.success ? "PASSED" : "FAILED",
    }))
  );
}

runAllTests();
