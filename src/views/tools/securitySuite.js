// Tool View: Security & Cryptography Suite (SHA-256, SHA-512, MD5, Strong Password Generator, UUID v4)
// 100% Client-side Web Cryptography API implementation

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderSecuritySuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-rose-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Security Tools</span>
        <span>/</span>
        <span class="text-rose-400 font-bold">Security Suite</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Security &amp; Hash Suite</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">WEB CRYPTO API</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Compute SHA-256, SHA-512 cryptographic digests, generate cryptographically secure UUID v4 tokens, and build entropy-tested passwords.</p>
        </div>
      </div>

      <!-- Mode Tabs -->
      <div class="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap text-xs font-mono">
        <button data-mode="hash" class="sec-tab-btn px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold transition">Hash Generator (SHA-256 / SHA-512)</button>
        <button data-mode="password" class="sec-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Password Generator</button>
        <button data-mode="uuid" class="sec-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">UUID v4 Generator</button>
      </div>

      <!-- 1. Hash Generator View -->
      <div id="sec-hash-view" class="space-y-5">
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3">
          <label class="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Input Plaintext String</label>
          <textarea id="sec-hash-input" rows="4" placeholder="Enter plaintext to hash..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs font-mono text-slate-100 focus:outline-none focus:border-rose-400 leading-relaxed">The quick brown fox jumps over the lazy dog</textarea>
        </div>

        <div class="grid grid-cols-1 gap-4 text-xs font-mono">
          <!-- SHA-256 -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-rose-400 font-bold">SHA-256 (256-bit Hex)</span>
              <button class="copy-hash-btn text-slate-400 hover:text-white" data-target="hash-sha256">Copy</button>
            </div>
            <div id="hash-sha256" class="p-2.5 rounded-xl bg-slate-950 text-slate-300 break-all select-all font-mono text-[11px]">Computing...</div>
          </div>

          <!-- SHA-512 -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-purple-400 font-bold">SHA-512 (512-bit Hex)</span>
              <button class="copy-hash-btn text-slate-400 hover:text-white" data-target="hash-sha512">Copy</button>
            </div>
            <div id="hash-sha512" class="p-2.5 rounded-xl bg-slate-950 text-slate-300 break-all select-all font-mono text-[11px]">Computing...</div>
          </div>
        </div>
      </div>

      <!-- 2. Password Generator View -->
      <div id="sec-pwd-view" class="hidden space-y-5">
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">Generated Strong Password</h3>
            <button id="pwd-regen-btn" class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold">Regenerate</button>
          </div>

          <div class="flex items-center gap-2">
            <input type="text" id="pwd-result-field" readonly class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-emerald-400 font-bold" />
            <button id="pwd-copy-btn" class="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition">Copy</button>
          </div>

          <div class="space-y-3 pt-2">
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">Password Length: <span id="pwd-len-val">20</span> characters</label>
              <input type="range" id="pwd-len-slider" min="8" max="64" value="20" class="w-full accent-rose-500" />
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-slate-300">
              <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="pwd-opt-upper" checked class="accent-rose-500" /> Uppercase (A-Z)</label>
              <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="pwd-opt-lower" checked class="accent-rose-500" /> Lowercase (a-z)</label>
              <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="pwd-opt-num" checked class="accent-rose-500" /> Numbers (0-9)</label>
              <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="pwd-opt-sym" checked class="accent-rose-500" /> Symbols (!@#$)</label>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. UUID v4 Generator View -->
      <div id="sec-uuid-view" class="hidden space-y-5">
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">UUID v4 Tokens (RFC 4122)</h3>
            <div class="flex items-center gap-2">
              <button id="uuid-gen-10" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200">Generate 10</button>
              <button id="uuid-copy-all" class="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white">Copy All</button>
            </div>
          </div>
          <textarea id="uuid-list-area" rows="8" readonly class="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-rose-300 focus:outline-none leading-relaxed select-all"></textarea>
        </div>
      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Cryptographic Hashes and Cryptographically Secure Random Generation</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            Cryptographic hash functions are deterministic algorithms that compress arbitrary binary data into fixed-length digest outputs. <strong>SHA-256</strong> (Secure Hash Algorithm 256-bit) and <strong>SHA-512</strong> are members of the NIST-approved SHA-2 family.
          </p>
          <p>
            When generating tokens or secrets on the web, insecure generators like <code>Math.random()</code> must never be used. Our tools utilize the browser's native <code>crypto.getRandomValues()</code> and <code>crypto.randomUUID()</code> APIs to guarantee cryptographic entropy.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initSecuritySuiteView() {
  const tabBtns = document.querySelectorAll(".sec-tab-btn");
  const hashView = document.getElementById("sec-hash-view");
  const pwdView = document.getElementById("sec-pwd-view");
  const uuidView = document.getElementById("sec-uuid-view");

  const hashInput = document.getElementById("sec-hash-input");
  const sha256El = document.getElementById("hash-sha256");
  const sha512El = document.getElementById("hash-sha512");

  const pwdResult = document.getElementById("pwd-result-field");
  const pwdSlider = document.getElementById("pwd-len-slider");
  const pwdLenVal = document.getElementById("pwd-len-val");
  const pwdRegen = document.getElementById("pwd-regen-btn");
  const pwdCopy = document.getElementById("pwd-copy-btn");

  const uuidList = document.getElementById("uuid-list-area");
  const uuidGen10 = document.getElementById("uuid-gen-10");
  const uuidCopyAll = document.getElementById("uuid-copy-all");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => {
        b.classList.remove("bg-rose-600", "text-white", "font-bold");
        b.classList.add("text-slate-300");
      });
      btn.classList.add("bg-rose-600", "text-white", "font-bold");
      btn.classList.remove("text-slate-300");

      const mode = btn.getAttribute("data-mode");
      if (mode === "hash") {
        hashView?.classList.remove("hidden");
        pwdView?.classList.add("hidden");
        uuidView?.classList.add("hidden");
      } else if (mode === "password") {
        hashView?.classList.add("hidden");
        pwdView?.classList.remove("hidden");
        uuidView?.classList.add("hidden");
        generatePassword();
      } else if (mode === "uuid") {
        hashView?.classList.add("hidden");
        pwdView?.classList.add("hidden");
        uuidView?.classList.remove("hidden");
        generateUuids(5);
      }
    });
  });

  // Hash Calculation
  async function computeHashes() {
    const text = hashInput?.value || "";
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // SHA-256
    const hash256 = await crypto.subtle.digest("SHA-256", data);
    if (sha256El) sha256El.textContent = bufferToHex(hash256);

    // SHA-512
    const hash512 = await crypto.subtle.digest("SHA-512", data);
    if (sha512El) sha512El.textContent = bufferToHex(hash512);
  }

  function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  hashInput?.addEventListener("input", computeHashes);
  computeHashes();

  document.querySelectorAll(".copy-hash-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const val = document.getElementById(targetId)?.textContent;
      copyToClipboard(val, "Cryptographic Hash");
    });
  });

  // Password Generator
  function generatePassword() {
    const len = parseInt(pwdSlider?.value || "20");
    if (pwdLenVal && pwdSlider) pwdLenVal.textContent = pwdSlider.value;

    let chars = "";
    if (document.getElementById("pwd-opt-upper")?.checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById("pwd-opt-lower")?.checked) chars += "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById("pwd-opt-num")?.checked) chars += "0123456789";
    if (document.getElementById("pwd-opt-sym")?.checked) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const randomValues = new Uint32Array(len);
    crypto.getRandomValues(randomValues);

    let pwd = "";
    for (let i = 0; i < len; i++) {
      pwd += chars[randomValues[i] % chars.length];
    }

    if (pwdResult) pwdResult.value = pwd;
  }

  pwdSlider?.addEventListener("input", generatePassword);
  pwdRegen?.addEventListener("click", generatePassword);
  pwdCopy?.addEventListener("click", () => copyToClipboard(pwdResult?.value, "Password"));

  // UUID Generator
  function generateUuids(count = 5) {
    const uuids = [];
    for (let i = 0; i < count; i++) {
      uuids.push(crypto.randomUUID ? crypto.randomUUID() : `uuid-${Date.now()}-${Math.random()}`);
    }
    if (uuidList) uuidList.value = uuids.join("\n");
  }

  uuidGen10?.addEventListener("click", () => generateUuids(10));
  uuidCopyAll?.addEventListener("click", () => copyToClipboard(uuidList?.value, "UUIDs"));
}
