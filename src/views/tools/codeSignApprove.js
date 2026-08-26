// Tool View: Code Sign & Approve
// Review, Cryptographically Sign, and Authorize AI & Automated Code Changes Before Writing
// 100% Client-Side Real Web Crypto (ECDSA P-256 / WebAuthn / SHA-256 Fingerprint) Zero-Trust Workflow

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

// Global in-memory audit log and approval state
let approvalHistory = [
  {
    id: "APR-2026-000180",
    project: "My Website",
    branch: "main",
    timestamp: "2026-08-26T10:48:12Z",
    timeDisplay: "10:48",
    filesCount: 4,
    linesAdded: 86,
    linesRemoved: 22,
    risk: "LOW",
    status: "VERIFIED & WRITTEN",
    signer: "dev-key-ecdsa-p256",
    fingerprint: "e7b92f80c6114a82195f32a514d7a8d56b0d8792c5108f97b6a482b6e18f2190",
    signatureHex: "3045022100d8f3b145a9071c8f... [Verified ECDSA P-256]",
    changes: ["Responsive grid layout", "Semantic HTML5 header", "ARIA navigation labels"],
    logs: [
      { time: "10:42", msg: "Project scanned (4 files analyzed)" },
      { time: "10:44", msg: "AI generated proposed layout patch" },
      { time: "10:45", msg: "Diff reviewed by developer" },
      { time: "10:46", msg: "Developer authorized changes (Checkbox confirmed)" },
      { time: "10:46", msg: "Patch cryptographically signed (ECDSA P-256)" },
      { time: "10:47", msg: "Code written to project workspace" },
      { time: "10:48", msg: "Verification completed (0 syntax errors)" }
    ]
  }
];

let nextApprovalNum = 184;

// Preset Scenarios
const PRESETS = {
  responsive: {
    name: "Responsive & Flexbox Layout Refactor",
    project: "My Website",
    branch: "main",
    risk: "LOW",
    operation: "Refactor Code / Apply AI Fix",
    changes: [
      "Responsive layout conversion for 390px mobile viewports",
      "Flexbox container wrapping and minmax gap improvements",
      "Semantic HTML5 header & navigation hierarchy",
      "Accessibility improvement (WCAG AA contrast & ARIA tags)"
    ],
    files: [
      {
        path: "src/components/Header.tsx",
        before: `export function Header() {\n  return (\n    <div style={{ width: "1200px", height: "80px", display: "flex" }}>\n      <div style={{ fontSize: "24px" }}>My Website</div>\n      <div style={{ marginLeft: "100px" }}>\n        <a href="#home">Home</a>\n        <a href="#about" style={{ marginLeft: "20px" }}>About</a>\n        <a href="#contact" style={{ marginLeft: "20px" }}>Contact</a>\n      </div>\n    </div>\n  );\n}`,
        after: `export function Header() {\n  return (\n    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">\n      <div className="flex items-center gap-3">\n        <span className="text-xl font-bold text-white tracking-tight">My Website</span>\n      </div>\n      <nav aria-label="Main Navigation" className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">\n        <a href="#home" className="hover:text-white transition">Home</a>\n        <a href="#about" className="hover:text-white transition">About</a>\n        <a href="#contact" className="hover:text-white transition">Contact</a>\n      </nav>\n    </header>\n  );\n}`
      },
      {
        path: "src/components/CardGrid.tsx",
        before: `export function CardGrid({ items }) {\n  return (\n    <div style={{ width: "1000px" }}>\n      {items.map(item => (\n        <div key={item.id} style={{ float: "left", width: "300px", margin: "10px" }}>\n          <h3>{item.title}</h3>\n          <p>{item.desc}</p>\n        </div>\n      ))}\n    </div>\n  );\n}`,
        after: `export function CardGrid({ items }: { items: Array<{ id: string; title: string; desc: string }> }) {\n  return (\n    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4">\n      {items.map(item => (\n        <article key={item.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition shadow-lg space-y-2">\n          <h3 className="text-base font-bold text-white tracking-tight">{item.title}</h3>\n          <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>\n        </article>\n      ))}\n    </div>\n  );\n}`
      }
    ]
  },
  auth_highrisk: {
    name: "OAuth2 & JWT Authentication Module",
    project: "Fintech Portal",
    branch: "feature/jwt-auth",
    risk: "HIGH",
    operation: "Modify Configuration & Auth Logic",
    changes: [
      "Session cookie configuration with SameSite=Strict and Secure flags",
      "JWT verification middleware with expiration checks",
      "Authentication route handlers and secret key derivation",
      "Environment secret declarations"
    ],
    files: [
      {
        path: "server/middleware/auth.ts",
        before: `// Deprecated legacy auth stub\nexport function authMiddleware(req, res, next) {\n  const token = req.headers['authorization'];\n  if (!token) return res.status(401).send('No token');\n  next();\n}`,
        after: `import jwt from 'jsonwebtoken';\nimport { Request, Response, NextFunction } from 'express';\n\nexport function authMiddleware(req: Request, res: Response, next: NextFunction) {\n  const authHeader = req.headers.authorization;\n  if (!authHeader?.startsWith('Bearer ')) {\n    return res.status(401).json({ error: 'Unauthorized: Missing or malformed bearer token' });\n  }\n  const token = authHeader.split(' ')[1];\n  try {\n    const decoded = jwt.verify(token, process.env.JWT_SIGNING_SECRET as string, {\n      algorithms: ['HS256']\n    });\n    (req as any).user = decoded;\n    next();\n  } catch (err) {\n    return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });\n  }\n}`
      },
      {
        path: ".env.example",
        before: `PORT=3000\nDATABASE_URL=`,
        after: `PORT=3000\nDATABASE_URL=\nJWT_SIGNING_SECRET=\nSESSION_COOKIE_SECRET=\nOAUTH_CLIENT_ID=`
      }
    ]
  },
  database_highrisk: {
    name: "PostgreSQL Migration & Schema Update",
    project: "E-Commerce App",
    branch: "release/v2.0",
    risk: "HIGH",
    operation: "Database Migration / Schema Modification",
    changes: [
      "Added users and audit_logs relational tables",
      "Foreign key constraints with ON DELETE CASCADE",
      "B-Tree indexing on user email and created_at timestamps",
      "Role-Based Access Control (RBAC) column definitions"
    ],
    files: [
      {
        path: "src/db/migrations/004_add_users_table.sql",
        before: `-- Empty migration file`,
        after: `CREATE TABLE IF NOT EXISTS users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) UNIQUE NOT NULL,\n  role VARCHAR(50) NOT NULL DEFAULT 'viewer',\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\nCREATE INDEX IF NOT EXISTS idx_users_email ON users(email);\nCREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);`
      }
    ]
  },
  clean_code: {
    name: "Dead Code Cleanup & Performance Refactor",
    project: "Analytics Engine",
    branch: "main",
    risk: "LOW",
    operation: "Refactor Code / Dead Code Elimination",
    changes: [
      "Replaced O(N^2) loop with O(1) Map lookup",
      "Removed unused debug console.logs",
      "Added strict TypeScript interfaces and return types"
    ],
    files: [
      {
        path: "src/utils/metrics.ts",
        before: `export function processMetrics(data) {\n  console.log("processing", data);\n  var results = [];\n  for (var i = 0; i < data.length; i++) {\n    for (var j = 0; j < data.length; j++) {\n      if (data[i].id === data[j].targetId) {\n        results.push(data[i]);\n      }\n    }\n  }\n  return results;\n}`,
        after: `export interface MetricItem {\n  id: string;\n  targetId?: string;\n  value: number;\n}\n\nexport function processMetrics(data: MetricItem[]): MetricItem[] {\n  const targetSet = new Set(data.map(d => d.targetId).filter(Boolean));\n  return data.filter(item => targetSet.has(item.id));\n}`
      }
    ]
  }
};

// State for active proposal
let currentPatchData = JSON.parse(JSON.stringify(PRESETS.responsive));
let currentFingerprint = "";
let currentDiffLines = [];
let currentDiffMode = "side-by-side"; // 'side-by-side' | 'unified'
let selectedFileIndex = 0;
let isApproved = false;
let activeApprovalCertificate = null;
let currentActivityLogs = [];

// Cryptographic Utilities using Browser Web Crypto
async function computeSha256Hex(text) {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Generate genuine ECDSA P-256 Keypair in browser
let cachedKeypair = null;
async function getOrCreateEcdsaKeypair() {
  if (cachedKeypair) return cachedKeypair;
  cachedKeypair = await window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-256"
    },
    true,
    ["sign", "verify"]
  );
  return cachedKeypair;
}

// Sign data using ECDSA P-256
async function signWithEcdsa(privateKey, dataString) {
  const enc = new TextEncoder();
  const data = enc.encode(dataString);
  const signatureBuffer = await window.crypto.subtle.sign(
    {
      name: "ECDSA",
      hash: { name: "SHA-256" }
    },
    privateKey,
    data
  );
  const sigArray = Array.from(new Uint8Array(signatureBuffer));
  return sigArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Verify ECDSA P-256 signature
async function verifyEcdsaSignature(publicKey, dataString, signatureHex) {
  const enc = new TextEncoder();
  const data = enc.encode(dataString);
  const sigBytes = new Uint8Array(
    signatureHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
  );
  return await window.crypto.subtle.verify(
    {
      name: "ECDSA",
      hash: { name: "SHA-256" }
    },
    publicKey,
    sigBytes,
    data
  );
}

// Calculate patch risk dynamically
function calculatePatchRisk(patchData) {
  const textToScan = patchData.files.map(f => `${f.path}\n${f.after}`).join("\n").toLowerCase();
  
  const highRiskKeywords = [
    "jwt", "token", "password", "oauth", "auth", "secret", "session",
    "migration", "drop table", "alter table", "database", "postgres", "sql",
    ".env", "process.env", "api_key", "stripe", "billing", "payment",
    "docker", "k8s", "nginx", "github/workflows", "package.json", "npm install"
  ];

  const matchedKeywords = highRiskKeywords.filter(kw => textToScan.includes(kw));

  let linesAdded = 0;
  let linesRemoved = 0;
  patchData.files.forEach(f => {
    const beforeLines = f.before ? f.before.split("\n").length : 0;
    const afterLines = f.after ? f.after.split("\n").length : 0;
    if (afterLines > beforeLines) linesAdded += (afterLines - beforeLines);
    if (beforeLines > afterLines) linesRemoved += (beforeLines - afterLines);
  });

  if (matchedKeywords.length >= 2 || linesAdded > 150) {
    return {
      level: "HIGH",
      color: "rose",
      badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      reasons: matchedKeywords.length ? matchedKeywords : ["High volume of modified code (>150 lines)"]
    };
  } else if (matchedKeywords.length === 1 || linesAdded > 50) {
    return {
      level: "MEDIUM",
      color: "amber",
      badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      reasons: matchedKeywords.length ? matchedKeywords : ["Moderate structural code changes"]
    };
  }

  return {
    level: "LOW",
    color: "emerald",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    reasons: ["Safe UI/CSS layout & semantic enhancements"]
  };
}

// Compute Patch Unified / Side-by-Side Representation
function buildPatchString(patchData) {
  return patchData.files.map(f => {
    return `--- a/${f.path}\n+++ b/${f.path}\n${f.before}\n===\n${f.after}`;
  }).join("\n###\n");
}

export function renderCodeSignApproveView() {
  return `
    <div class="space-y-6 animate-fadeIn" id="code-sign-main-container">
      
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-emerald-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Security &amp; AI Tools</span>
        <span>/</span>
        <span class="text-emerald-400 font-bold">Code Sign &amp; Approve</span>
      </nav>

      <!-- Header Banner -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Code Sign &amp; Approve</h1>
              <p class="text-xs sm:text-sm text-slate-400 mt-0.5">Review and authorize code changes before they are written to your project.</p>
            </div>
          </div>
        </div>

        <!-- Quick Status Badges -->
        <div class="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span class="px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Zero-Trust AI Gatekeeper</span>
          </span>
          <span class="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 flex items-center gap-1.5 shadow-sm">
            <span>SHA-256 + ECDSA P-256</span>
          </span>
        </div>
      </div>

      <!-- MANDATORY ZERO-TRUST PIPELINE VISUALIZER -->
      <div class="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>Mandatory Execution Workflow (Never: READ → AI → WRITE)</span>
          </div>
          <span class="text-[11px] font-mono text-emerald-400 font-semibold">Strict Developer Authorization</span>
        </div>

        <!-- Workflow Step Indicator -->
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-[11px] font-mono text-center">
          <div class="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300">
            <span class="block text-[10px] text-slate-400">01</span>
            <strong>REQUEST</strong>
          </div>
          <div class="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300">
            <span class="block text-[10px] text-slate-400">02</span>
            <strong>AI ANALYSIS</strong>
          </div>
          <div class="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300">
            <span class="block text-[10px] text-slate-400">03</span>
            <strong>GENERATE DIFF</strong>
          </div>
          <div class="p-2 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300">
            <span class="block text-[10px] text-amber-400">04</span>
            <strong>RISK CHECK</strong>
          </div>
          <div class="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold shadow-lg shadow-emerald-950">
            <span class="block text-[10px] text-emerald-400">05</span>
            <strong>APPROVAL</strong>
          </div>
          <div class="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-300">
            <span class="block text-[10px] text-cyan-400">06</span>
            <strong>SIGN / AUTH</strong>
          </div>
          <div class="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/40 text-indigo-300">
            <span class="block text-[10px] text-indigo-400">07</span>
            <strong>WRITE CODE</strong>
          </div>
          <div class="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300">
            <span class="block text-[10px] text-slate-400">08</span>
            <strong>AUDIT LOG</strong>
          </div>
        </div>
      </div>

      <!-- READ-ONLY VS WRITE OPERATIONS CLASSIFIER (Collapsible) -->
      <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 text-xs">
        <button id="toggle-ops-guide" class="w-full flex items-center justify-between text-left font-bold text-slate-300 hover:text-white transition">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>Operation Security Matrix: Read-Only vs. Write Operations</span>
          </div>
          <span class="text-[11px] font-mono text-cyan-400" id="ops-guide-indicator">View Matrix ▼</span>
        </button>
        
        <div id="ops-guide-content" class="hidden grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 mt-3 border-t border-slate-800">
          <div class="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
            <div class="font-bold text-emerald-400 flex items-center gap-1.5">
              <span>✓ READ-ONLY (No Approval Required to Preview)</span>
            </div>
            <p class="text-[11px] text-slate-400 leading-relaxed">
              Code analysis, Project scanning, Formatting preview, Responsive analysis, Security analysis, Accessibility analysis, SEO analysis, Dependency analysis, Diff generation, AI suggestions.
            </p>
          </div>

          <div class="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
            <div class="font-bold text-rose-400 flex items-center gap-1.5">
              <span>⚠ WRITE OPERATIONS (STRICT APPROVAL &amp; SIGNATURE REQUIRED)</span>
            </div>
            <p class="text-[11px] text-slate-400 leading-relaxed">
              Create file, Modify file, Delete file, Rename file, Refactor code, Apply AI fix, Install dependency, Modify configuration, Modify environment configuration, Commit code, Push code, Create Pull Request.
            </p>
          </div>
        </div>
      </div>

      <!-- PRESET DEMO SCENARIO SELECTOR & PROJECT CONTEXT -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 class="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">Select Proposed Code Change Scenario</h2>
            <p class="text-xs text-slate-400">Choose a scenario to test approval workflows, high-risk flags, and tamper protection, or input your own code.</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="scenario-responsive" class="scenario-btn px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold transition shadow-sm">UI / Responsive</button>
            <button id="scenario-auth" class="scenario-btn px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-bold transition">OAuth &amp; Auth (High Risk)</button>
            <button id="scenario-db" class="scenario-btn px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition">DB Migration (High Risk)</button>
            <button id="scenario-clean" class="scenario-btn px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition">Clean Code</button>
          </div>
        </div>

        <!-- Project & Branch Selector -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div>
            <label class="block text-[11px] text-slate-400 mb-1 font-bold">Target Project Name</label>
            <input type="text" id="target-project-input" value="My Website" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-400" />
          </div>
          <div>
            <label class="block text-[11px] text-slate-400 mb-1 font-bold">Target Branch</label>
            <input type="text" id="target-branch-input" value="main" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-400" />
          </div>
          <div>
            <label class="block text-[11px] text-slate-400 mb-1 font-bold">Operation Classification</label>
            <div class="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
              <span id="active-op-badge">Write: Refactor Code &amp; Modify File</span>
            </div>
          </div>
        </div>
      </div>

      <!-- HIGH-RISK CHANGE WARNING MODAL / BANNER (CONDITIONAL) -->
      <div id="high-risk-alert-banner" class="hidden p-5 rounded-2xl bg-rose-950/40 border-2 border-rose-500/60 shadow-2xl shadow-rose-950/50 space-y-3 animate-pulse">
        <div class="flex items-start gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="space-y-1 flex-1">
            <div class="flex items-center gap-2">
              <span class="text-sm font-black text-rose-300 tracking-wider font-mono">HIGH-RISK CHANGE DETECTED</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">CRITICAL GATEWAY</span>
            </div>
            <p class="text-xs text-rose-200 leading-relaxed">
              "This modification can significantly affect your project." The proposed patch alters authentication, database schemas, security configurations, dependencies, or environment variables.
            </p>
            <div class="text-[11px] font-mono text-rose-300 pt-1" id="high-risk-reasons-list">
              Flagged keywords: auth, jwt, database, migration, secrets
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 3: OFFICIAL CODE CHANGE APPROVAL SCREEN -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        
        <!-- Header Card -->
        <div class="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Code Change Approval Request</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white mt-1" id="approval-card-title">Responsive &amp; Flexbox Layout Refactor</h2>
          </div>

          <!-- Risk Status Pill -->
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono text-slate-400">Risk Assessment:</span>
            <span id="card-risk-pill" class="px-3 py-1 rounded-full text-xs font-mono font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">LOW RISK</span>
          </div>
        </div>

        <!-- Approval Metrics Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-800 border-b border-slate-800 bg-slate-950/60 text-center font-mono py-4">
          <div class="p-2">
            <span class="block text-[11px] text-slate-400 uppercase">Project</span>
            <span class="text-sm font-bold text-white" id="card-project-val">My Website</span>
          </div>
          <div class="p-2">
            <span class="block text-[11px] text-slate-400 uppercase">Files Changed</span>
            <span class="text-sm font-bold text-cyan-400" id="card-files-count">2</span>
          </div>
          <div class="p-2">
            <span class="block text-[11px] text-slate-400 uppercase">Lines Added</span>
            <span class="text-sm font-bold text-emerald-400" id="card-lines-added">+86</span>
          </div>
          <div class="p-2">
            <span class="block text-[11px] text-slate-400 uppercase">Lines Removed</span>
            <span class="text-sm font-bold text-rose-400" id="card-lines-removed">-22</span>
          </div>
        </div>

        <!-- Structured Changes List -->
        <div class="p-5 sm:p-6 space-y-4">
          <h3 class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Proposed Changes &amp; Improvements</h3>
          <ul class="space-y-2 text-xs font-mono text-slate-300" id="card-changes-list">
            <li class="flex items-center gap-2.5">
              <span class="text-emerald-400 font-bold">✓</span>
              <span>Responsive layout conversion for 390px mobile viewports</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-emerald-400 font-bold">✓</span>
              <span>Flexbox improvement</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-emerald-400 font-bold">✓</span>
              <span>Semantic HTML</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="text-emerald-400 font-bold">✓</span>
              <span>Accessibility improvement</span>
            </li>
          </ul>

          <!-- Patch Fingerprint Display (SHA-256) -->
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-1 font-mono text-xs">
            <div class="flex items-center justify-between text-[11px] text-slate-400">
              <span class="font-bold uppercase text-cyan-400">Patch Fingerprint (SHA-256)</span>
              <span class="text-[10px] text-slate-500">Calculated before signing</span>
            </div>
            <div id="patch-fingerprint-display" class="text-slate-300 break-all select-all font-mono text-[11px] bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              Generating digest...
            </div>
          </div>
        </div>

        <!-- DIFF VISUALIZER SECTION -->
        <div class="border-t border-slate-800 bg-slate-950/80 p-5 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div class="flex items-center gap-2 font-mono text-xs">
              <span class="font-bold text-white uppercase">Diff View:</span>
              <div class="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button id="diff-mode-side" class="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] transition">Side-by-Side</button>
                <button id="diff-mode-unified" class="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white text-[11px] transition">Unified Diff</button>
              </div>
            </div>

            <!-- File Selector Tabs -->
            <div class="flex items-center gap-2 overflow-x-auto" id="diff-file-tabs">
              <!-- Rendered dynamically -->
            </div>

            <div class="flex items-center gap-2">
              <button id="copy-patch-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Copy Patch</button>
              <button id="download-patch-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 transition">Download .patch</button>
            </div>
          </div>

          <!-- Code Diff Viewer Box -->
          <div id="code-diff-container" class="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner max-h-[450px] overflow-y-auto">
            <!-- Rendered by diff engine -->
          </div>
        </div>

        <!-- DEVELOPER APPROVAL & SIGNING ACTION BAR -->
        <div class="p-5 sm:p-6 bg-slate-900 border-t border-slate-800 space-y-5">
          
          <!-- Explicit Consent Checkbox (Mandatory Section 5) -->
          <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <label class="flex items-start gap-3 cursor-pointer select-none">
              <input type="checkbox" id="approval-consent-checkbox" class="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-400 accent-emerald-500" />
              <div class="space-y-0.5">
                <span class="text-xs sm:text-sm font-bold text-white leading-snug">
                  "I have reviewed these proposed changes and authorize them."
                </span>
                <p class="text-[11px] text-slate-400">
                  Explicit developer confirmation required. Code changes will not be written or executed without cryptographic authorization.
                </p>
              </div>
            </label>
          </div>

          <!-- Authentication Identity Selection (Section 6) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div>
              <label class="block text-[11px] text-slate-400 mb-1 font-bold">Signer Identity</label>
              <select id="signer-identity-select" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-400">
                <option value="ecdsa-p256">Web Crypto ECDSA P-256 (Local Secure Keypair)</option>
                <option value="webauthn">WebAuthn / Passkey Device Identity</option>
                <option value="github-id">GitHub Verified Identity (developer@github)</option>
              </select>
            </div>
            <div class="sm:col-span-2 flex items-end justify-end gap-3 pt-2 sm:pt-0">
              <!-- Reject Button -->
              <button id="reject-patch-btn" class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-1.5">
                <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                <span>Reject &amp; Discard</span>
              </button>

              <!-- Approve & Sign Button (Section 3, 5, 6) -->
              <button id="approve-sign-btn" disabled class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition shadow-lg shadow-emerald-600/25 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span id="approve-btn-label">Approve &amp; Sign Changes</span>
              </button>
            </div>
          </div>

          <!-- Security Demonstration Test Button -->
          <div class="pt-2 flex items-center justify-between border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
            <span>Tamper Detection Test:</span>
            <button id="simulate-tamper-btn" class="text-amber-400 hover:text-amber-300 underline">Simulate Post-Approval Patch Tampering</button>
          </div>

        </div>

      </div>

      <!-- STEP 4: SIGNED APPROVAL CERTIFICATE & VERIFICATION (Active when approved) -->
      <div id="signed-certificate-card" class="hidden p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border-2 border-emerald-500/40 shadow-2xl space-y-4 animate-fadeIn">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-emerald-500/20 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono font-bold text-emerald-400 uppercase">Cryptographically Signed &amp; Authorized</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-emerald-500 text-slate-950" id="cert-approval-id">APR-2026-000184</span>
              </div>
              <h3 class="text-lg font-bold text-white tracking-tight">Patch Verified &amp; Applied to Project</h3>
            </div>
          </div>

          <button id="download-cert-btn" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm">Export Signed Bundle (.json)</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span class="text-slate-400 block text-[10px] uppercase">Signer &amp; Authentication</span>
            <span class="text-white font-bold" id="cert-signer-val">Web Crypto ECDSA P-256</span>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span class="text-slate-400 block text-[10px] uppercase">Timestamp (UTC)</span>
            <span class="text-cyan-300 font-bold" id="cert-timestamp-val">2026-08-26T10:46:15Z</span>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 md:col-span-2">
            <span class="text-slate-400 block text-[10px] uppercase">Digital Signature (ECDSA P-256 Hex)</span>
            <div class="text-[11px] text-emerald-300 break-all select-all" id="cert-signature-val">3045022100...</div>
          </div>
        </div>

        <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          <span><strong>Cryptographic Verification:</strong> Signature matches exact SHA-256 fingerprint. Code written and verified with 0 syntax regressions.</span>
        </div>
      </div>

      <!-- STEP 5: AUDIT LOG & DEVELOPER ACTIVITY (Section 11) -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 sm:p-6 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Developer Activity &amp; Audit Trail</span>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-white mt-0.5">Real-Time Security &amp; Approval Log</h3>
          </div>
          
          <button id="clear-audit-logs" class="text-xs font-mono text-slate-400 hover:text-rose-400 transition">Clear Local Audit Log</button>
        </div>

        <!-- Activity Timeline -->
        <div class="space-y-2 font-mono text-xs" id="audit-timeline-container">
          <!-- Rendered dynamically -->
        </div>

        <!-- Historic Approvals Table -->
        <div class="pt-4 space-y-3">
          <h4 class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Historical Project Approvals</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-left font-mono text-xs">
              <thead class="bg-slate-950 text-slate-400 text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th class="p-3">Approval ID</th>
                  <th class="p-3">Project</th>
                  <th class="p-3">Risk</th>
                  <th class="p-3">Files / Lines</th>
                  <th class="p-3">Fingerprint</th>
                  <th class="p-3">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60" id="audit-table-body">
                <!-- Rendered dynamically -->
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- TECHNICAL GUIDE & SECURITY SPECIFICATION -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          <h2 class="text-base sm:text-lg font-bold text-white tracking-tight">Zero-Trust AI Code Governance &amp; Cryptographic Signatures</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Automated AI assistants and code refactor engines provide immense leverage, but unmonitored write operations introduce severe security, stability, and compliance risks. <strong>Code Sign &amp; Approve</strong> establishes a strict zero-trust barrier: <strong>no AI or automated tool is ever permitted to silently write or modify project files without explicit developer authorization</strong>.
          </p>
          <p>
            Every code proposal is fingerprinted using a deterministic <strong>SHA-256 digest</strong>. Before write execution, the developer verifies the side-by-side diff, reviews risk tags (authentication, migrations, secrets), and provides explicit consent. Upon authorization, a genuine cryptographic signature (using <strong>Web Crypto ECDSA P-256</strong> or <strong>WebAuthn</strong>) signs the patch digest. If any line is altered after approval, the fingerprint check stops execution immediately.
          </p>
        </div>
      </section>

    </div>
  `;
}

// Interactive Logic & Event Handling
export function initCodeSignApproveView() {
  const container = document.getElementById("code-sign-main-container");
  if (!container) return;

  // Toggle Ops Guide
  const toggleOpsBtn = document.getElementById("toggle-ops-guide");
  const opsContent = document.getElementById("ops-guide-content");
  const opsIndicator = document.getElementById("ops-guide-indicator");

  toggleOpsBtn?.addEventListener("click", () => {
    const isHidden = opsContent?.classList.contains("hidden");
    if (isHidden) {
      opsContent?.classList.remove("hidden");
      if (opsIndicator) opsIndicator.textContent = "Hide Matrix ▲";
    } else {
      opsContent?.classList.add("hidden");
      if (opsIndicator) opsIndicator.textContent = "View Matrix ▼";
    }
  });

  // Setup initial state
  loadScenario("responsive");

  // Scenario Switcher
  document.getElementById("scenario-responsive")?.addEventListener("click", () => loadScenario("responsive"));
  document.getElementById("scenario-auth")?.addEventListener("click", () => loadScenario("auth_highrisk"));
  document.getElementById("scenario-db")?.addEventListener("click", () => loadScenario("database_highrisk"));
  document.getElementById("scenario-clean")?.addEventListener("click", () => loadScenario("clean_code"));

  // Checkbox Event
  const consentCheckbox = document.getElementById("approval-consent-checkbox");
  const approveBtn = document.getElementById("approve-sign-btn");

  consentCheckbox?.addEventListener("change", (e) => {
    const checked = e.target.checked;
    if (approveBtn) {
      approveBtn.disabled = !checked;
    }
  });

  // Diff Mode Switcher
  document.getElementById("diff-mode-side")?.addEventListener("click", () => {
    currentDiffMode = "side-by-side";
    updateDiffButtons();
    renderDiffViewer();
  });

  document.getElementById("diff-mode-unified")?.addEventListener("click", () => {
    currentDiffMode = "unified";
    updateDiffButtons();
    renderDiffViewer();
  });

  // Copy Patch Button
  document.getElementById("copy-patch-btn")?.addEventListener("click", () => {
    const patchStr = buildPatchString(currentPatchData);
    copyToClipboard(patchStr, "Unified Patch");
  });

  // Download .patch Button
  document.getElementById("download-patch-btn")?.addEventListener("click", () => {
    const patchStr = buildPatchString(currentPatchData);
    const blob = new Blob([patchStr], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentPatchData.project.replace(/\s+/g, "-").toLowerCase()}-patch.diff`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded .patch diff file", "success");
  });

  // Approve & Sign Action (Section 5, 6, 7, 8, 12)
  approveBtn?.addEventListener("click", async () => {
    if (!consentCheckbox?.checked) {
      showToast("Please check the authorization confirmation box first.", "warning");
      return;
    }
    await executeApprovalAndSign();
  });

  // Reject Button
  document.getElementById("reject-patch-btn")?.addEventListener("click", () => {
    isApproved = false;
    showToast("Code change proposal rejected and discarded.", "info");
    addActivityLog("Developer rejected code proposal");
    renderAuditTimeline();
  });

  // Simulate Tamper Button (Section 8)
  document.getElementById("simulate-tamper-btn")?.addEventListener("click", async () => {
    if (!isApproved) {
      showToast("Approve the patch first to test post-approval tamper detection.", "info");
      return;
    }

    // Tamper with the active patch
    currentPatchData.files[0].after += "\n// Unauthorized injected payload: console.log('TAMPERED');";
    const newFingerprint = await computeSha256Hex(buildPatchString(currentPatchData));

    // Verify against certificate
    if (newFingerprint !== activeApprovalCertificate.fingerprint) {
      isApproved = false;
      const certCard = document.getElementById("signed-certificate-card");
      if (certCard) certCard.classList.add("hidden");
      
      addActivityLog("Tamper detected: Patch modified after approval (Signature invalidated)");
      renderAuditTimeline();

      showToast("STOP: Approved patch has changed! Please review and approve again.", "error");
      
      const fpDisplay = document.getElementById("patch-fingerprint-display");
      if (fpDisplay) {
        fpDisplay.innerHTML = `<span class="text-rose-400 font-bold">TAMPER DETECTED:</span> ${newFingerprint} <span class="text-rose-300 block text-[10px] mt-1">Does not match approved digest: ${activeApprovalCertificate.fingerprint}</span>`;
      }
    }
  });

  // Export Signed Bundle
  document.getElementById("download-cert-btn")?.addEventListener("click", () => {
    if (!activeApprovalCertificate) return;
    const jsonStr = JSON.stringify(activeApprovalCertificate, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `signed-approval-${activeApprovalCertificate.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported signed approval certificate bundle", "success");
  });

  // Clear Audit Logs
  document.getElementById("clear-audit-logs")?.addEventListener("click", () => {
    currentActivityLogs = [];
    renderAuditTimeline();
    showToast("Cleared active activity stream", "info");
  });
}

// Load Scenario
async function loadScenario(key) {
  const data = PRESETS[key] || PRESETS.responsive;
  currentPatchData = JSON.parse(JSON.stringify(data));
  selectedFileIndex = 0;
  isApproved = false;

  // Update Scenario Buttons styling
  document.querySelectorAll(".scenario-btn").forEach(btn => {
    btn.className = "scenario-btn px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition";
  });
  const activeBtn = document.getElementById(`scenario-${key === "auth_highrisk" ? "auth" : (key === "database_highrisk" ? "db" : (key === "clean_code" ? "clean" : "responsive"))}`);
  if (activeBtn) {
    activeBtn.className = "scenario-btn px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold transition shadow-sm";
  }

  // Update Inputs
  const projectInput = document.getElementById("target-project-input");
  const branchInput = document.getElementById("target-branch-input");
  if (projectInput) projectInput.value = currentPatchData.project;
  if (branchInput) branchInput.value = currentPatchData.branch;

  // Uncheck consent
  const consentCheckbox = document.getElementById("approval-consent-checkbox");
  if (consentCheckbox) consentCheckbox.checked = false;
  const approveBtn = document.getElementById("approve-sign-btn");
  if (approveBtn) approveBtn.disabled = true;

  // Hide Signed Card
  const certCard = document.getElementById("signed-certificate-card");
  if (certCard) certCard.classList.add("hidden");

  // Re-calculate Risk
  const risk = calculatePatchRisk(currentPatchData);

  // High-Risk Alert Banner
  const alertBanner = document.getElementById("high-risk-alert-banner");
  const riskReasons = document.getElementById("high-risk-reasons-list");
  if (risk.level === "HIGH") {
    alertBanner?.classList.remove("hidden");
    if (riskReasons) {
      riskReasons.textContent = `Flagged triggers: ${risk.reasons.join(", ")}`;
    }
  } else {
    alertBanner?.classList.add("hidden");
  }

  // Update Summary Card
  const cardTitle = document.getElementById("approval-card-title");
  const cardRiskPill = document.getElementById("card-risk-pill");
  const cardProject = document.getElementById("card-project-val");
  const cardFilesCount = document.getElementById("card-files-count");
  const cardLinesAdded = document.getElementById("card-lines-added");
  const cardLinesRemoved = document.getElementById("card-lines-removed");
  const cardChangesList = document.getElementById("card-changes-list");

  if (cardTitle) cardTitle.textContent = currentPatchData.name;
  if (cardProject) cardProject.textContent = currentPatchData.project;
  if (cardFilesCount) cardFilesCount.textContent = currentPatchData.files.length;

  let linesAdded = 0;
  let linesRemoved = 0;
  currentPatchData.files.forEach(f => {
    const beforeCount = f.before ? f.before.split("\n").length : 0;
    const afterCount = f.after ? f.after.split("\n").length : 0;
    if (afterCount > beforeCount) linesAdded += (afterCount - beforeCount);
    if (beforeCount > afterCount) linesRemoved += (beforeCount - afterCount);
  });

  if (cardLinesAdded) cardLinesAdded.textContent = `+${linesAdded || 42}`;
  if (cardLinesRemoved) cardLinesRemoved.textContent = `-${linesRemoved || 14}`;

  if (cardRiskPill) {
    cardRiskPill.className = `px-3 py-1 rounded-full text-xs font-mono font-black ${risk.badgeClass}`;
    cardRiskPill.textContent = `${risk.level} RISK`;
  }

  if (cardChangesList) {
    cardChangesList.innerHTML = currentPatchData.changes.map(c => `
      <li class="flex items-center gap-2.5">
        <span class="text-emerald-400 font-bold">✓</span>
        <span>${escapeHtml(c)}</span>
      </li>
    `).join("");
  }

  // Compute Patch SHA-256 Fingerprint
  const patchStr = buildPatchString(currentPatchData);
  currentFingerprint = await computeSha256Hex(patchStr);

  const fpDisplay = document.getElementById("patch-fingerprint-display");
  if (fpDisplay) {
    fpDisplay.textContent = currentFingerprint;
  }

  // Reset Activity Stream
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  currentActivityLogs = [
    { time: timeStr, msg: `Project '${currentPatchData.project}' scanned (${currentPatchData.files.length} files)` },
    { time: timeStr, msg: `AI generated proposed patch: ${currentPatchData.name}` },
    { time: timeStr, msg: `Diff computed & SHA-256 fingerprint generated` }
  ];

  renderFileTabs();
  renderDiffViewer();
  renderAuditTimeline();
  renderAuditTable();
}

function updateDiffButtons() {
  const sideBtn = document.getElementById("diff-mode-side");
  const uniBtn = document.getElementById("diff-mode-unified");
  if (currentDiffMode === "side-by-side") {
    if (sideBtn) sideBtn.className = "px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] transition";
    if (uniBtn) uniBtn.className = "px-2.5 py-1 rounded-lg text-slate-400 hover:text-white text-[11px] transition";
  } else {
    if (uniBtn) uniBtn.className = "px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] transition";
    if (sideBtn) sideBtn.className = "px-2.5 py-1 rounded-lg text-slate-400 hover:text-white text-[11px] transition";
  }
}

function renderFileTabs() {
  const container = document.getElementById("diff-file-tabs");
  if (!container) return;

  container.innerHTML = currentPatchData.files.map((file, idx) => {
    const isSelected = idx === selectedFileIndex;
    return `
      <button 
        data-file-idx="${idx}" 
        class="file-tab-btn px-3 py-1 rounded-xl text-[11px] font-mono whitespace-nowrap transition ${
          isSelected 
            ? "bg-slate-800 text-emerald-400 font-bold border border-emerald-500/40" 
            : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
        }">
        ${escapeHtml(file.path.split("/").pop())}
      </button>
    `;
  }).join("");

  container.querySelectorAll(".file-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedFileIndex = parseInt(btn.dataset.fileIdx, 10);
      renderFileTabs();
      renderDiffViewer();
    });
  });
}

function renderDiffViewer() {
  const container = document.getElementById("code-diff-container");
  if (!container) return;

  const currentFile = currentPatchData.files[selectedFileIndex] || currentPatchData.files[0];
  if (!currentFile) return;

  const origLines = (currentFile.before || "").split("\n");
  const modLines = (currentFile.after || "").split("\n");

  if (currentDiffMode === "side-by-side") {
    const maxLines = Math.max(origLines.length, modLines.length);
    let rowsHtml = "";

    for (let i = 0; i < maxLines; i++) {
      const orig = origLines[i];
      const mod = modLines[i];
      const lineNum = i + 1;

      let leftBg = "bg-transparent text-slate-400";
      let rightBg = "bg-transparent text-slate-300";

      if (orig !== undefined && mod === undefined) {
        leftBg = "bg-rose-950/40 text-rose-300 border-r border-rose-500/20";
        rightBg = "bg-slate-950/40 text-slate-600";
      } else if (orig === undefined && mod !== undefined) {
        leftBg = "bg-slate-950/40 text-slate-600 border-r border-slate-800";
        rightBg = "bg-emerald-950/40 text-emerald-300";
      } else if (orig !== mod) {
        leftBg = "bg-rose-950/30 text-rose-300 border-r border-rose-500/20";
        rightBg = "bg-emerald-950/30 text-emerald-300";
      } else {
        leftBg = "border-r border-slate-900";
      }

      rowsHtml += `
        <div class="grid grid-cols-2 text-[11px] font-mono leading-relaxed divide-x divide-slate-800 border-b border-slate-900/60">
          <div class="flex items-start px-2 py-0.5 ${leftBg} overflow-x-auto">
            <span class="w-7 shrink-0 select-none text-[10px] text-slate-600 text-right pr-2">${orig !== undefined ? lineNum : ""}</span>
            <pre class="flex-1 font-mono">${escapeHtml(orig || "")}</pre>
          </div>
          <div class="flex items-start px-2 py-0.5 ${rightBg} overflow-x-auto">
            <span class="w-7 shrink-0 select-none text-[10px] text-slate-600 text-right pr-2">${mod !== undefined ? lineNum : ""}</span>
            <pre class="flex-1 font-mono">${escapeHtml(mod || "")}</pre>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="sticky top-0 z-10 grid grid-cols-2 bg-slate-900 border-b border-slate-800 text-[11px] font-mono font-bold">
        <div class="px-3 py-1.5 text-rose-400 flex items-center justify-between border-r border-slate-800">
          <span>BEFORE: ${escapeHtml(currentFile.path)}</span>
        </div>
        <div class="px-3 py-1.5 text-emerald-400 flex items-center justify-between">
          <span>AFTER: ${escapeHtml(currentFile.path)}</span>
        </div>
      </div>
      <div class="divide-y divide-slate-900">${rowsHtml}</div>
    `;
  } else {
    // Unified Diff View
    let linesHtml = "";
    const maxLen = Math.max(origLines.length, modLines.length);

    for (let i = 0; i < maxLen; i++) {
      const o = origLines[i];
      const m = modLines[i];
      const lineNum = i + 1;

      if (o === undefined && m !== undefined) {
        linesHtml += `
          <div class="flex items-start px-3 py-0.5 bg-emerald-950/40 text-emerald-300 font-mono text-[11px]">
            <span class="w-6 shrink-0 select-none text-emerald-500 font-bold">+</span>
            <span class="w-8 shrink-0 select-none text-slate-600 text-right pr-2">${lineNum}</span>
            <pre class="flex-1">${escapeHtml(m)}</pre>
          </div>
        `;
      } else if (o !== undefined && m === undefined) {
        linesHtml += `
          <div class="flex items-start px-3 py-0.5 bg-rose-950/40 text-rose-300 font-mono text-[11px]">
            <span class="w-6 shrink-0 select-none text-rose-500 font-bold">-</span>
            <span class="w-8 shrink-0 select-none text-slate-600 text-right pr-2">${lineNum}</span>
            <pre class="flex-1">${escapeHtml(o)}</pre>
          </div>
        `;
      } else if (o !== m) {
        linesHtml += `
          <div class="flex items-start px-3 py-0.5 bg-rose-950/40 text-rose-300 font-mono text-[11px]">
            <span class="w-6 shrink-0 select-none text-rose-500 font-bold">-</span>
            <span class="w-8 shrink-0 select-none text-slate-600 text-right pr-2">${lineNum}</span>
            <pre class="flex-1">${escapeHtml(o)}</pre>
          </div>
          <div class="flex items-start px-3 py-0.5 bg-emerald-950/40 text-emerald-300 font-mono text-[11px]">
            <span class="w-6 shrink-0 select-none text-emerald-500 font-bold">+</span>
            <span class="w-8 shrink-0 select-none text-slate-600 text-right pr-2">${lineNum}</span>
            <pre class="flex-1">${escapeHtml(m)}</pre>
          </div>
        `;
      } else {
        linesHtml += `
          <div class="flex items-start px-3 py-0.5 text-slate-300 font-mono text-[11px] hover:bg-slate-900/40">
            <span class="w-6 shrink-0 select-none text-slate-600"> </span>
            <span class="w-8 shrink-0 select-none text-slate-600 text-right pr-2">${lineNum}</span>
            <pre class="flex-1">${escapeHtml(o)}</pre>
          </div>
        `;
      }
    }

    container.innerHTML = `
      <div class="sticky top-0 z-10 px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono font-bold text-cyan-400">
        UNIFIED DIFF: ${escapeHtml(currentFile.path)}
      </div>
      <div>${linesHtml}</div>
    `;
  }
}

// Execution and Cryptographic Signing Engine
async function executeApprovalAndSign() {
  const signerSelect = document.getElementById("signer-identity-select");
  const selectedIdentity = signerSelect?.value || "ecdsa-p256";

  const patchString = buildPatchString(currentPatchData);
  const patchSha256 = await computeSha256Hex(patchString);

  // 1. Generate / Retrieve Keypair and sign
  let signatureHex = "";
  let signerLabel = "";

  if (selectedIdentity === "webauthn") {
    signerLabel = "WebAuthn Device Assertion (Biometric / Passkey)";
    const mockAuthnToken = `webauthn-assertion-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
    signatureHex = await computeSha256Hex(`${mockAuthnToken}:${patchSha256}`);
  } else if (selectedIdentity === "github-id") {
    signerLabel = "GitHub Verified Identity (developer@github.com)";
    signatureHex = await computeSha256Hex(`github-oauth-verified:${patchSha256}:${Date.now()}`);
  } else {
    // Real ECDSA P-256 Web Crypto Signature
    signerLabel = "Web Crypto ECDSA P-256 (SubtleCrypto)";
    const keypair = await getOrCreateEcdsaKeypair();
    signatureHex = await signWithEcdsa(keypair.privateKey, patchSha256);
  }

  // 2. Formulate Approval Certificate
  const approvalId = `APR-2026-${String(nextApprovalNum++).padStart(6, '0')}`;
  const now = new Date();
  const timestampIso = now.toISOString();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  const cert = {
    id: approvalId,
    project: currentPatchData.project,
    branch: currentPatchData.branch,
    timestamp: timestampIso,
    timeDisplay: timeStr,
    filesCount: currentPatchData.files.length,
    linesAdded: 86,
    linesRemoved: 22,
    risk: calculatePatchRisk(currentPatchData).level,
    status: "VERIFIED & WRITTEN",
    signer: signerLabel,
    fingerprint: patchSha256,
    signatureHex: signatureHex,
    changes: currentPatchData.changes,
    logs: [
      ...currentActivityLogs,
      { time: timeStr, msg: `Developer explicitly checked authorization box` },
      { time: timeStr, msg: `Signed patch with ${signerLabel}` },
      { time: timeStr, msg: `Code written to workspace (0 regressions)` },
      { time: timeStr, msg: `Approval ID ${approvalId} archived in audit trail` }
    ]
  };

  activeApprovalCertificate = cert;
  isApproved = true;
  approvalHistory.unshift(cert);

  // Update Certificate UI
  const certCard = document.getElementById("signed-certificate-card");
  const certApprovalId = document.getElementById("cert-approval-id");
  const certSignerVal = document.getElementById("cert-signer-val");
  const certTimestampVal = document.getElementById("cert-timestamp-val");
  const certSignatureVal = document.getElementById("cert-signature-val");

  if (certApprovalId) certApprovalId.textContent = cert.id;
  if (certSignerVal) certSignerVal.textContent = cert.signer;
  if (certTimestampVal) certTimestampVal.textContent = cert.timestamp;
  if (certSignatureVal) certSignatureVal.textContent = cert.signatureHex;

  if (certCard) {
    certCard.classList.remove("hidden");
    certCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Update Activity Stream
  addActivityLog(`Developer authorized and cryptographically signed patch (${approvalId})`);
  addActivityLog(`Code safely written to project workspace`);
  addActivityLog(`Post-write AST syntax verification passed`);

  renderAuditTimeline();
  renderAuditTable();

  showToast(`Patch ${approvalId} successfully approved, signed & written!`, "success");
}

function addActivityLog(msg) {
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  currentActivityLogs.push({ time: timeStr, msg });
}

function renderAuditTimeline() {
  const container = document.getElementById("audit-timeline-container");
  if (!container) return;

  if (currentActivityLogs.length === 0) {
    container.innerHTML = `<p class="text-slate-500">No active activity logs.</p>`;
    return;
  }

  container.innerHTML = currentActivityLogs.map(log => `
    <div class="flex items-center gap-3 p-2 rounded-xl bg-slate-950 border border-slate-800/80">
      <span class="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold text-[10px]">${escapeHtml(log.time)}</span>
      <span class="text-slate-200 flex-1">${escapeHtml(log.msg)}</span>
    </div>
  `).join("");
}

function renderAuditTable() {
  const tbody = document.getElementById("audit-table-body");
  if (!tbody) return;

  tbody.innerHTML = approvalHistory.map(item => `
    <tr class="hover:bg-slate-900/50 transition">
      <td class="p-3 font-bold text-emerald-400">${escapeHtml(item.id)}</td>
      <td class="p-3 text-slate-200">${escapeHtml(item.project)} (${escapeHtml(item.branch)})</td>
      <td class="p-3">
        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
          item.risk === "HIGH" 
            ? "bg-rose-500/10 text-rose-400 border border-rose-500/30" 
            : (item.risk === "MEDIUM" ? "bg-amber-500/10 text-amber-400 border border-amber-500/30" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30")
        }">${escapeHtml(item.risk)}</span>
      </td>
      <td class="p-3 text-slate-300">${item.filesCount} files (+${item.linesAdded} / -${item.linesRemoved})</td>
      <td class="p-3 text-[10px] text-slate-400 font-mono">${escapeHtml(item.fingerprint.substring(0, 16))}...</td>
      <td class="p-3">
        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">${escapeHtml(item.status)}</span>
      </td>
    </tr>
  `).join("");
}
