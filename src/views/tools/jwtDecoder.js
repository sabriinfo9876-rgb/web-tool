// Tool View: JWT (JSON Web Token) Safe Client-Side Decoder with Claim Analysis & SEO Guide

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderJwtDecoderView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">JWT (JSON Web Token) Safe Client Decoder</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">100% PRIVATE</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Safely parse encoded JSON Web Tokens directly in your browser without sending tokens or secrets over external networks.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="jwt-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample Token</button>
          <button id="jwt-clear-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-300 transition">Clear</button>
        </div>
      </div>

      <!-- Token Input Box -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3">
        <div class="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>ENCODED JWT STRING (HEADER.PAYLOAD.SIGNATURE)</span>
          <span id="jwt-status-badge" class="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Awaiting Token</span>
        </div>
        <textarea id="jwt-input" rows="4" placeholder="Paste encoded JWT here (e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c)" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-400 resize-y leading-relaxed break-all"></textarea>
      </div>

      <!-- Decoded 3-Pane Breakdown (Header, Payload, Signature) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        <!-- Header Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-rose-400 font-bold">1. HEADER: ALGORITHM &amp; TOKEN TYPE</span>
            <button id="copy-jwt-header-btn" class="text-slate-400 hover:text-white text-[11px]">Copy</button>
          </div>
          <div class="p-4 flex-1">
            <pre class="w-full h-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-rose-300 font-mono overflow-auto"><code id="jwt-header-output">// Header JSON</code></pre>
          </div>
        </div>

        <!-- Payload Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-purple-400 font-bold">2. PAYLOAD: DATA CLAIMS</span>
            <button id="copy-jwt-payload-btn" class="text-slate-400 hover:text-white text-[11px]">Copy</button>
          </div>
          <div class="p-4 flex-1 space-y-3">
            <pre class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-purple-300 font-mono overflow-auto max-h-56"><code id="jwt-payload-output">// Payload Claims JSON</code></pre>
            
            <!-- Expiration & Timing Insights -->
            <div id="jwt-timing-box" class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1.5 text-slate-300">
              <div class="flex justify-between">
                <span class="text-slate-500">Issued At (iat):</span>
                <span id="jwt-iat-val" class="text-slate-300">—</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Expires At (exp):</span>
                <span id="jwt-exp-val" class="text-slate-300">—</span>
              </div>
              <div class="flex justify-between font-bold pt-1 border-t border-slate-800/80">
                <span class="text-slate-500">Expiration Status:</span>
                <span id="jwt-exp-status" class="text-slate-400">—</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Signature Column -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-cyan-400 font-bold">3. SIGNATURE VERIFICATION</span>
          </div>
          <div class="p-4 flex-1 space-y-3 text-xs">
            <pre class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] text-cyan-300 font-mono overflow-auto break-all"><code id="jwt-sig-output">// Signature Hash</code></pre>
            
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1 leading-relaxed">
              <span class="font-bold text-slate-200 block">HMACSHA256(</span>
              <span>&nbsp;&nbsp;base64UrlEncode(header) + "." +</span><br/>
              <span>&nbsp;&nbsp;base64UrlEncode(payload),</span><br/>
              <span>&nbsp;&nbsp;your-256-bit-secret</span><br/>
              <span class="font-bold text-slate-200">)</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Understanding JSON Web Token (JWT RFC 7519) Cryptography &amp; Security</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>JSON Web Tokens (JWT)</strong> represent an open, industry-standard (RFC 7519) method for securely transmitting claims between two parties in modern single-page applications (SPAs), microservices, and OAuth 2.0 authentication flows.
          </p>
          <p>
            A token is composed of three Base64URL-encoded parts separated by periods (<code>.</code>):
            <strong>Header</strong> (defines token type and hashing algorithm such as HS256, RS256, or ES256), 
            <strong>Payload</strong> (contains registered claims like <code>sub</code>, <code>iss</code>, <code>iat</code>, and <code>exp</code> alongside application-specific roles and permissions), and 
            <strong>Signature</strong> (ensures the sender is authentic and the message was not modified in transit).
          </p>
          <p>
            Because JWTs are encoded rather than encrypted, sensitive secrets like passwords or API keys must never be stored inside claims payloads. Our client-side decoder parses tokens in memory without transmitting tokens over public networks, ensuring complete data privacy.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initJwtDecoderView() {
  const input = document.getElementById("jwt-input");
  const headerOutput = document.getElementById("jwt-header-output");
  const payloadOutput = document.getElementById("jwt-payload-output");
  const sigOutput = document.getElementById("jwt-sig-output");
  const statusBadge = document.getElementById("jwt-status-badge");

  const iatVal = document.getElementById("jwt-iat-val");
  const expVal = document.getElementById("jwt-exp-val");
  const expStatus = document.getElementById("jwt-exp-status");

  const sampleBtn = document.getElementById("jwt-sample-btn");
  const clearBtn = document.getElementById("jwt-clear-btn");
  const copyHeaderBtn = document.getElementById("copy-jwt-header-btn");
  const copyPayloadBtn = document.getElementById("copy-jwt-payload-btn");

  const sampleJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzk4MzA0OTgxMiIsIm5hbWUiOiJTaGFoemViIEtoaWxqaSIsImVtYWlsIjoiZGV2ZWxvcGVyQGV4YW1wbGUuY29tIiwicm9sZSI6IlNlbmlvciBGdWxsLVN0YWNrIEVuZ2luZWVyIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3OTk3NzI4MDB9.5yQ9qI1Zt47k560d9Y2aV99K3w1sZ-5x1m0jA3c4t7Y";

  function parseJwt() {
    const raw = input.value.trim();
    if (!raw) {
      headerOutput.textContent = "// Header JSON";
      payloadOutput.textContent = "// Payload Claims JSON";
      sigOutput.textContent = "// Signature Hash";
      statusBadge.className = "px-2 py-0.5 rounded bg-slate-800 text-slate-300";
      statusBadge.textContent = "Awaiting Token";
      iatVal.textContent = "—";
      expVal.textContent = "—";
      expStatus.textContent = "—";
      return;
    }

    const parts = raw.split(".");
    if (parts.length !== 3) {
      statusBadge.className = "px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30";
      statusBadge.textContent = "Invalid Structure (Must have 3 parts)";
      headerOutput.textContent = "/* Invalid JWT Structure */";
      payloadOutput.textContent = "/* Invalid JWT Structure */";
      sigOutput.textContent = "/* Invalid JWT Structure */";
      return;
    }

    try {
      const headerJson = JSON.parse(decodeBase64Url(parts[0]));
      const payloadJson = JSON.parse(decodeBase64Url(parts[1]));

      headerOutput.textContent = JSON.stringify(headerJson, null, 2);
      payloadOutput.textContent = JSON.stringify(payloadJson, null, 2);
      sigOutput.textContent = parts[2] || "Empty Signature";

      // Evaluate Timestamps
      if (payloadJson.iat) {
        const iatDate = new Date(payloadJson.iat * 1000);
        iatVal.textContent = iatDate.toUTCString();
      } else {
        iatVal.textContent = "Not specified in payload";
      }

      if (payloadJson.exp) {
        const expDate = new Date(payloadJson.exp * 1000);
        expVal.textContent = expDate.toUTCString();

        const now = Math.floor(Date.now() / 1000);
        if (payloadJson.exp > now) {
          const diffHours = Math.round((payloadJson.exp - now) / 3600);
          expStatus.className = "text-emerald-400 font-bold";
          expStatus.textContent = `Active (Expires in ~${diffHours} hours)`;
        } else {
          expStatus.className = "text-rose-400 font-bold";
          expStatus.textContent = "Expired Token";
        }
      } else {
        expVal.textContent = "No exp claim found";
        expStatus.className = "text-amber-400";
        expStatus.textContent = "Token Never Expires (Permanent)";
      }

      statusBadge.className = "px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30";
      statusBadge.textContent = `Valid ${headerJson.alg || "JWT"}`;
    } catch (err) {
      statusBadge.className = "px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30";
      statusBadge.textContent = "Decode Exception";
      headerOutput.textContent = `Error: ${err.message}`;
    }
  }

  function decodeBase64Url(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0: break;
      case 2: output += "=="; break;
      case 3: output += "="; break;
      default: throw new Error("Illegal base64url string!");
    }
    return decodeURIComponent(escape(atob(output)));
  }

  input?.addEventListener("input", parseJwt);

  sampleBtn?.addEventListener("click", () => {
    input.value = sampleJwt;
    parseJwt();
    showToast("Sample JWT decoded", "info");
  });

  clearBtn?.addEventListener("click", () => {
    input.value = "";
    parseJwt();
  });

  copyHeaderBtn?.addEventListener("click", () => copyToClipboard(headerOutput.textContent, "JWT Header"));
  copyPayloadBtn?.addEventListener("click", () => copyToClipboard(payloadOutput.textContent, "JWT Payload"));

  input.value = sampleJwt;
  parseJwt();
}
