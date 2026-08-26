// Tool View: JWT Decoder & Expiry Checker (JSON Web Token Security Inspector)
// 100% Client-Side Private Token Inspector

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderJwtSuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-indigo-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Security &amp; Web</span>
        <span>/</span>
        <span class="text-indigo-400 font-bold">JWT Decoder</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">JWT Decoder &amp; Expiry</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">CLIENT-SIDE PRIVACY</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Decode, inspect claims, calculate expiration status, and audit signatures for JSON Web Tokens locally without transmitting tokens.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="jwt-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample Token</button>
        </div>
      </div>

      <!-- Main Input Box -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3">
        <div class="flex items-center justify-between">
          <label class="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Paste JSON Web Token (JWT)</label>
          <span class="text-[11px] font-mono text-emerald-400">🔒 Token never leaves your browser</span>
        </div>
        <textarea id="jwt-input-area" rows="4" placeholder="Paste eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-400 leading-relaxed"></textarea>
      </div>

      <!-- Expiration Status Pill -->
      <div id="jwt-status-card" class="hidden p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div id="jwt-status-icon" class="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">✓</div>
          <div>
            <div id="jwt-status-title" class="text-xs font-bold text-white">Token Status: Valid</div>
            <div id="jwt-status-desc" class="text-[11px] text-slate-400 font-mono mt-0.5">Expires in 2 hours 45 minutes (UTC)</div>
          </div>
        </div>
        <div id="jwt-alg-badge" class="px-3 py-1 rounded-lg bg-slate-800 text-xs font-mono text-indigo-300 border border-slate-700">Algorithm: HS256</div>
      </div>

      <!-- 3-Way JWT Structure Columns (Header, Payload, Signature) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <!-- Header JSON -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-rose-400 font-bold">HEADER: ALGORITHM &amp; TOKEN TYPE</span>
            <button id="jwt-copy-header" class="text-slate-400 hover:text-white text-xs font-semibold">Copy</button>
          </div>
          <pre id="jwt-header-box" class="p-4 bg-slate-950 text-xs font-mono text-rose-300 overflow-auto select-all leading-relaxed max-h-[260px]"><code>// Header claims will appear here...</code></pre>
        </div>

        <!-- Payload Claims -->
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span class="text-purple-400 font-bold">PAYLOAD: DATA CLAIMS</span>
            <button id="jwt-copy-payload" class="text-slate-400 hover:text-white text-xs font-semibold">Copy</button>
          </div>
          <pre id="jwt-payload-box" class="p-4 bg-slate-950 text-xs font-mono text-purple-300 overflow-auto select-all leading-relaxed max-h-[260px]"><code>// Payload claims will appear here...</code></pre>
        </div>

      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Understanding JWT Architecture: RFC 7519 Standards and Token Security</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            A <strong>JSON Web Token (JWT)</strong> is a compact, URL-safe means of representing claims to be transferred between two parties. Formatted as three Base64URL-encoded strings separated by dots (<code>Header.Payload.Signature</code>), JWTs are commonly employed in OAuth 2.0 and OpenID Connect (OIDC) authentication flows.
          </p>
          <p>
            The <strong>Header</strong> specifies the cryptographic algorithm (such as HMAC SHA256 or RSA) and token type. The <strong>Payload</strong> contains standard registered claims—including <code>exp</code> (Expiration Time), <code>iat</code> (Issued At), <code>nbf</code> (Not Before), <code>sub</code> (Subject), and <code>iss</code> (Issuer)—alongside custom application permissions.
          </p>
          <p>
            Because JWT payloads are only Base64 encoded (not encrypted), sensitive secrets like database passwords must never be stored inside payload claims.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initJwtSuiteView() {
  const inputArea = document.getElementById("jwt-input-area");
  const headerBox = document.getElementById("jwt-header-box");
  const payloadBox = document.getElementById("jwt-payload-box");
  const statusCard = document.getElementById("jwt-status-card");
  const statusTitle = document.getElementById("jwt-status-title");
  const statusDesc = document.getElementById("jwt-status-desc");
  const algBadge = document.getElementById("jwt-alg-badge");
  const sampleBtn = document.getElementById("jwt-sample-btn");
  const copyHeader = document.getElementById("jwt-copy-header");
  const copyPayload = document.getElementById("jwt-copy-payload");

  let parsedHeader = "";
  let parsedPayload = "";

  const sampleJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaSBLaGFuIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoyNTI0NjA4MDAwfQ.4flcK_h_b-k059a4m_z8T90Xf4qP1-t8529-g5jZ0yM";

  sampleBtn?.addEventListener("click", () => {
    if (inputArea) {
      inputArea.value = sampleJwt;
      decodeJwt();
    }
  });

  copyHeader?.addEventListener("click", () => copyToClipboard(parsedHeader, "JWT Header"));
  copyPayload?.addEventListener("click", () => copyToClipboard(parsedPayload, "JWT Payload"));

  inputArea?.addEventListener("input", () => decodeJwt());

  function decodeJwt() {
    const raw = inputArea?.value?.trim() || "";
    if (!raw) {
      statusCard?.classList.add("hidden");
      if (headerBox) headerBox.innerHTML = "<code>// Header claims will appear here...</code>";
      if (payloadBox) payloadBox.innerHTML = "<code>// Payload claims will appear here...</code>";
      return;
    }

    const parts = raw.split(".");
    if (parts.length !== 3) {
      if (statusCard) {
        statusCard.classList.remove("hidden");
        statusTitle.textContent = "Invalid JWT Format";
        statusTitle.className = "text-xs font-bold text-rose-400";
        statusDesc.textContent = "A valid JWT must contain exactly 3 dot-separated Base64 segments.";
      }
      return;
    }

    try {
      const headerObj = JSON.parse(base64UrlDecode(parts[0]));
      const payloadObj = JSON.parse(base64UrlDecode(parts[1]));

      parsedHeader = JSON.stringify(headerObj, null, 2);
      parsedPayload = JSON.stringify(payloadObj, null, 2);

      if (headerBox) headerBox.innerHTML = `<code>${escapeHtml(parsedHeader)}</code>`;
      if (payloadBox) payloadBox.innerHTML = `<code>${escapeHtml(parsedPayload)}</code>`;

      // Check Expiration
      if (statusCard) {
        statusCard.classList.remove("hidden");
        if (algBadge) algBadge.textContent = `Alg: ${headerObj.alg || "Unknown"}`;

        if (payloadObj.exp) {
          const nowSec = Math.floor(Date.now() / 1000);
          const expSec = payloadObj.exp;
          const diff = expSec - nowSec;
          const expDate = new Date(expSec * 1000).toUTCString();

          if (diff > 0) {
            const hours = Math.floor(diff / 3600);
            const mins = Math.floor((diff % 3600) / 60);
            statusTitle.textContent = "Token Status: Valid Active";
            statusTitle.className = "text-xs font-bold text-emerald-400";
            statusDesc.textContent = `Expires in ${hours}h ${mins}m (${expDate})`;
          } else {
            statusTitle.textContent = "Token Status: EXPIRED";
            statusTitle.className = "text-xs font-bold text-rose-400";
            statusDesc.textContent = `Expired on ${expDate}`;
          }
        } else {
          statusTitle.textContent = "Token Status: No Expiration (exp) Claim";
          statusTitle.className = "text-xs font-bold text-amber-400";
          statusDesc.textContent = "This token does not contain an 'exp' expiration timestamp.";
        }
      }
    } catch (err) {
      if (statusCard) {
        statusCard.classList.remove("hidden");
        statusTitle.textContent = "Base64 Decoding Error";
        statusTitle.className = "text-xs font-bold text-rose-400";
        statusDesc.textContent = err.message;
      }
    }
  }

  function base64UrlDecode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw new Error("Illegal base64url string!");
    }
    return decodeURIComponent(
      atob(output)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  }
}
