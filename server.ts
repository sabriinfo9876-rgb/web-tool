import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Body Parsers
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// In-Memory Snippet Database for Developer Hub
interface SavedSnippet {
  id: string;
  title: string;
  category: "css" | "text" | "api" | "regex" | "sql";
  content: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

const snippetStore: SavedSnippet[] = [
  {
    id: "default-1",
    title: "Glassmorphism Card Shadow",
    category: "css",
    content: "box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);\nborder: 1px solid rgba(255, 255, 255, 0.18);\nborder-radius: 16px;",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "default-2",
    title: "Email Validation Regex",
    category: "regex",
    content: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: "default-3",
    title: "Sample Public JSON API",
    category: "api",
    content: "GET https://jsonplaceholder.typicode.com/todos/1",
    createdAt: new Date().toISOString(),
  }
];

// Lazy Gemini AI Client initialization
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// ==========================================
// 1. HEALTH & SYSTEM STATS API & ZIP DOWNLOAD
// ==========================================
app.get("/api/download-flutter-zip", (req, res) => {
  const zipPath = path.join(process.cwd(), "flutter_web_developer_hub.zip");
  res.download(zipPath, "flutter_web_developer_hub.zip");
});

app.get("/api/health", (req, res) => {
  const mem = process.memoryUsage();
  res.json({
    status: "ok",
    appName: "All-in-One Web Developer Hub API",
    version: "1.0.0",
    uptimeSeconds: Math.floor(process.uptime()),
    memoryMb: {
      rss: Math.round(mem.rss / 1024 / 1024),
      heapUsed: Math.round(mem.heapUsed / 1024 / 1024),
      heapTotal: Math.round(mem.heapTotal / 1024 / 1024),
    },
    nodeVersion: process.version,
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// 2. BACKEND HTTP / API REQUEST TESTER (Bypass CORS)
// ==========================================
app.post("/api/http-test", async (req, res) => {
  const { url, method = "GET", headers = {}, body } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "A valid URL string is required." });
  }

  let targetUrl = url.trim();
  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = "https://" + targetUrl;
  }

  const startTime = Date.now();

  try {
    const fetchHeaders: Record<string, string> = {
      "User-Agent": "WebDevHub-ApiTester/1.0",
      ...headers,
    };

    const fetchOptions: RequestInit = {
      method: method.toUpperCase(),
      headers: fetchHeaders,
      redirect: "follow",
    };

    if (["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase()) && body) {
      fetchOptions.body = typeof body === "string" ? body : JSON.stringify(body);
      if (!fetchHeaders["Content-Type"] && typeof body !== "string") {
        fetchHeaders["Content-Type"] = "application/json";
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    fetchOptions.signal = controller.signal;

    const response = await fetch(targetUrl, fetchOptions);
    clearTimeout(timeoutId);

    const timeMs = Date.now() - startTime;
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((val, key) => {
      responseHeaders[key] = val;
    });

    const contentType = response.headers.get("content-type") || "";
    let data: any = null;
    let rawText = "";

    if (contentType.includes("application/json")) {
      try {
        data = await response.json();
        rawText = JSON.stringify(data, null, 2);
      } catch {
        rawText = await response.text();
        data = rawText;
      }
    } else {
      rawText = await response.text();
      data = rawText;
    }

    return res.json({
      success: true,
      url: targetUrl,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      timeMs,
      sizeBytes: Buffer.byteLength(rawText, "utf8"),
      contentType,
      headers: responseHeaders,
      data,
    });
  } catch (err: any) {
    const timeMs = Date.now() - startTime;
    const isTimeout = err.name === "AbortError";
    return res.status(502).json({
      success: false,
      error: isTimeout ? "Request timed out after 12 seconds." : (err.message || "Failed to execute request"),
      timeMs,
    });
  }
});

// ==========================================
// 3. URL & SECURITY INSPECTOR (Inspect X-Frame-Options, Meta, Status)
// ==========================================
app.post("/api/url-inspect", async (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL is required" });
  }

  let targetUrl = url.trim();
  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = "https://" + targetUrl;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const xFrameOptions = response.headers.get("x-frame-options");
    const csp = response.headers.get("content-security-policy");
    const allowsIframe = !xFrameOptions && (!csp || !csp.includes("frame-ancestors"));

    const html = await response.text();

    // Simple regex metadata extraction
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);

    res.json({
      url: targetUrl,
      status: response.status,
      statusText: response.statusText,
      allowsIframe,
      xFrameOptions: xFrameOptions || "None (Allowed)",
      cspFrameAncestors: csp ? (csp.includes("frame-ancestors") ? "Restricted" : "Not restricted") : "None",
      title: titleMatch ? titleMatch[1].trim() : "",
      description: descMatch ? descMatch[1].trim() : "",
      ogImage: ogImageMatch ? ogImageMatch[1].trim() : "",
      server: response.headers.get("server") || "Unknown",
      contentType: response.headers.get("content-type") || "text/html",
    });
  } catch (err: any) {
    res.status(500).json({
      error: "Unable to inspect URL: " + (err.message || "Network error"),
      allowsIframe: false,
    });
  }
});

// ==========================================
// 4. PERSISTENT DEVELOPER SNIPPETS STORAGE API
// ==========================================
app.get("/api/snippets", (req, res) => {
  res.json({ snippets: snippetStore });
});

app.post("/api/snippets", (req, res) => {
  const { title, category, content, metadata } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required." });
  }

  const newSnippet: SavedSnippet = {
    id: "snip-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    title: title.trim(),
    category: category || "css",
    content: content.trim(),
    metadata: metadata || {},
    createdAt: new Date().toISOString(),
  };

  snippetStore.unshift(newSnippet);
  res.status(201).json({ success: true, snippet: newSnippet });
});

app.delete("/api/snippets/:id", (req, res) => {
  const index = snippetStore.findIndex((s) => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Snippet not found" });
  }
  const removed = snippetStore.splice(index, 1);
  res.json({ success: true, removed: removed[0] });
});

// ==========================================
// 5. SERVER-SIDE GEMINI AI DEVELOPER ASSISTANT
// ==========================================
app.post("/api/ai/assist", async (req, res) => {
  const { task, prompt, context, customApiKey } = req.body;
  const headerApiKey = req.headers["x-gemini-api-key"] as string | undefined;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required." });
  }

  const effectiveKey = customApiKey || headerApiKey || process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (effectiveKey) {
    ai = new GoogleGenAI({
      apiKey: effectiveKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  if (!ai) {
    // Intelligent offline fallback responses if no API key is set
    let offlineFallback = "";
    if (task === "design-suggest") {
      offlineFallback = `/* 🎨 Gemini AI Design Suggestion (Offline Mode) */
/* Modern Glassmorphic Responsive Card Concept */
<div class="w-full max-w-md mx-auto p-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl transition hover:border-indigo-500/50">
  <div class="flex items-center space-x-3 mb-4">
    <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">✨</div>
    <div>
      <h3 class="text-lg font-bold text-white tracking-tight">Responsive Modern Card</h3>
      <p class="text-xs text-slate-400">Mobile-First Fluid Component</p>
    </div>
  </div>
  <p class="text-sm text-slate-300 leading-relaxed mb-4">Crafted with flexible container wrapping, responsive typography clamp, and smooth micro-interactions.</p>
  <button class="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-indigo-500/20 active:scale-95">Get Started</button>
</div>`;
    } else if (task === "responsive") {
      offlineFallback = `/* 📱 Mobile-First Responsive CSS Transformation (Offline Mode) */
/* Converted to fluid flex/grid layout with media query breakpoints */
@media (max-width: 768px) {
  .responsive-container {
    width: 100% !important;
    max-width: 100% !important;
    padding: 1rem !important;
    flex-direction: column !important;
  }
  .responsive-card {
    width: 100% !important;
    margin-bottom: 1rem;
  }
}
@media (min-width: 769px) {
  .responsive-container {
    display: flex;
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}`;
    } else {
      offlineFallback = `/* Generated Template for: "${prompt}" */\n.developer-solution {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: clamp(1rem, 4vw, 2.5rem);\n  box-shadow: 0 10px 30px -5px rgba(99, 102, 241, 0.25);\n  border: 1px solid rgba(99, 102, 241, 0.4);\n  border-radius: 16px;\n  background: #0f172a;\n  color: #f8fafc;\n  transition: all 0.25s ease;\n}`;
    }
    return res.json({
      output: offlineFallback,
      isFallback: true,
    });
  }

  try {
    let systemInstruction = "You are an elite Senior Full-Stack Engineer and UI/UX Designer. Provide clean, concise, production-ready code and explanations with modern dark styling (#0f172a background, indigo/purple/cyan accents) and mobile-first responsiveness. Avoid fluff.";
    
    if (task === "design-suggest") {
      systemInstruction = `You are a World-Class Principal UI/UX Designer and Frontend Architect.
The user will provide HTML/CSS/Tailwind/React code.
Your goal:
1. Analyze the original code structure.
2. Suggest and generate 2-3 UNIQUE, modern, and 100% RESPONSIVE design redesigns (e.g. Modern Glassmorphic, High-Tech Dark Cyber, Clean Minimalist SaaS).
3. Provide the COMPLETE ready-to-render converted HTML/Tailwind/CSS code for the best redesign.
4. Include a brief design explanation explaining the typography hierarchy, color palette, responsive breakpoints, and visual polish applied.`;
    } else if (task === "ui-prompt") {
      systemInstruction = `You are a Senior UI Component Engineer specializing in Tailwind CSS, React JSX, and modern Web Design.
The user will give a natural language prompt describing a component (e.g. 'SaaS pricing card with toggle', 'Modern Bento Grid hero', 'Glassmorphism Auth Modal', 'Developer Analytics Dashboard Widget').
Your goal:
1. Generate the complete, clean, self-contained HTML + Tailwind CSS code (and React JSX version).
2. Ensure it uses modern dark palette (bg-slate-900/slate-950, text-slate-100, border-slate-800, indigo/cyan/purple accents), flex/grid responsiveness, accessible markup, and smooth hover micro-interactions.`;
    } else if (task === "zip-debug") {
      systemInstruction = `You are an elite Code Reviewer, Security Auditor, and Full-Stack Debugger.
The user will provide extracted source files from a ZIP project repository.
Your goal:
1. Perform a deep codebase health check: identify syntax bugs, logic errors, missing dependencies, deprecated APIs, performance bottlenecks, and security vulnerabilities (e.g. XSS, unsafe inputs).
2. Provide a structured audit report with:
   - 🚨 Critical Issues & Bugs
   - ⚡ Performance & Optimization Suggestions
   - 🛡️ Security Audit
   - 🛠️ Fixed Code Snippets for immediate copy-pasting.`;
    } else if (task === "responsive") {
      systemInstruction = `You are a World-Class Responsive Web Design Engineer. 
The user will provide HTML/CSS/Tailwind/React/Flutter code that might be fixed-width or non-responsive.
Your goal:
1. Transform and refactor the code into fully responsive, mobile-first, tablet, and desktop-friendly code.
2. Add media queries, flexible fluid grid/flexbox layouts, responsive typography (clamp/rem), max-width constraints, responsive padding/margins, and adaptive UI components.
3. Provide the full converted clean code.
4. Add a brief 2-3 bullet point summary of key responsiveness changes made (e.g., Mobile breakpoints @media, Flex wrap, fluid scaling).`;
    } else if (task === "css") {
      systemInstruction = "You are a CSS and UI styling expert. Generate modern, beautiful, cross-browser CSS rules or keyframe animations tailored to the user's prompt. Provide pure CSS and brief explanation.";
    } else if (task === "regex") {
      systemInstruction = "You are a Regular Expressions expert. Provide the exact regex pattern with flags, explain each token concisely, and provide 3 positive and 3 negative test cases.";
    } else if (task === "debug") {
      systemInstruction = "You are a code debugger. Identify bugs, security vulnerabilities, or performance bottlenecks in the provided code, and provide the fixed solution.";
    } else if (task === "sql") {
      systemInstruction = "You are an SQL and database schema expert. Generate clean, indexed, and optimized SQL queries or schema definitions.";
    }

    const fullPrompt = context 
      ? `Task: ${task || "General Developer Query"}\nContext/Code:\n${context}\n\nUser Request: ${prompt}`
      : `Task: ${task || "General Developer Query"}\nUser Request: ${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    const outputText = response.text || "No output generated.";
    return res.json({ output: outputText, isFallback: false });
  } catch (err: any) {
    const isHighDemand = err?.message?.includes("503") || err?.message?.includes("high demand") || err?.status === 503;
    let fallbackOutput = "";
    if (task === "css") {
      fallbackOutput = `/* Fallback generated CSS for: "${prompt}" */\n.custom-effect {\n  box-shadow: 0 0 20px rgba(6, 182, 212, 0.6), 0 0 40px rgba(168, 85, 247, 0.4);\n  border: 1px solid rgba(6, 182, 212, 0.8);\n  border-radius: 12px;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.custom-effect:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 0 30px rgba(6, 182, 212, 0.9), 0 0 60px rgba(168, 85, 247, 0.6);\n}`;
    } else if (task === "regex") {
      fallbackOutput = `// Regex Pattern for: "${prompt}"\nconst pattern = /^[a-zA-Z0-9_.-]+$/;\n\n// Explanation:\n// ^          : Start of string\n// [a-zA-Z0-9_.-]+ : One or more alphanumeric, underscore, dot, or hyphen characters\n// $          : End of string`;
    } else {
      fallbackOutput = `/* Smart developer template for: "${prompt}" */\n// System is currently using offline fallback generation.\nfunction processDeveloperTask() {\n  console.log("Ready");\n}`;
    }

    return res.json({
      output: fallbackOutput,
      isFallback: true,
      note: isHighDemand ? "AI service temporarily busy; generated offline template." : undefined,
    });
  }
});

// ==========================================
// 6. VITE & STATIC FILE MIDDLEWARE
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Web Developer Hub Backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
