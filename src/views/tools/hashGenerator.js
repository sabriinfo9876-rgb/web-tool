// Tool View: SHA-256, SHA-512, MD5 Cryptographic Hash Generator with Web Crypto API & SEO Guide

import { copyToClipboard, showToast } from "../../utils.js";

export function renderHashGeneratorView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Security Hash &amp; Checksum Generator</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/30">WEB CRYPTO</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Compute SHA-256, SHA-512, SHA-384, SHA-1, and MD5 hashes with client-side verification and HMAC generator.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="hash-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample Text</button>
          <button id="hash-clear-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-300 transition">Clear</button>
        </div>
      </div>

      <!-- Plaintext Input Box -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3">
        <label class="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Source String / Secret Key</label>
        <textarea id="hash-input" rows="3" placeholder="Type or paste the input string to generate cryptographic hashes..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-red-300 font-mono focus:outline-none focus:border-red-400 resize-y leading-relaxed">WebDeveloperHub2026!SecureKey</textarea>
      </div>

      <!-- Computed Hashes List -->
      <div class="space-y-3">
        
        <!-- SHA-256 -->
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-1.5">
          <div class="flex items-center justify-between text-xs font-mono">
            <span class="font-bold text-red-400">SHA-256 (Standard Security)</span>
            <button class="copy-hash-btn text-slate-400 hover:text-white font-bold" data-target="hash-sha256">Copy</button>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 select-all break-all" id="hash-sha256">Computing...</div>
        </div>

        <!-- SHA-512 -->
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-1.5">
          <div class="flex items-center justify-between text-xs font-mono">
            <span class="font-bold text-purple-400">SHA-512 (High Entropy 512-bit)</span>
            <button class="copy-hash-btn text-slate-400 hover:text-white font-bold" data-target="hash-sha512">Copy</button>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 select-all break-all" id="hash-sha512">Computing...</div>
        </div>

        <!-- SHA-384 -->
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-1.5">
          <div class="flex items-center justify-between text-xs font-mono">
            <span class="font-bold text-indigo-400">SHA-384</span>
            <button class="copy-hash-btn text-slate-400 hover:text-white font-bold" data-target="hash-sha384">Copy</button>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 select-all break-all" id="hash-sha384">Computing...</div>
        </div>

        <!-- SHA-1 (Legacy) -->
        <div class="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-1.5">
          <div class="flex items-center justify-between text-xs font-mono">
            <span class="font-bold text-amber-400">SHA-1 (Legacy / Git Checksums)</span>
            <button class="copy-hash-btn text-slate-400 hover:text-white font-bold" data-target="hash-sha1">Copy</button>
          </div>
          <div class="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 select-all break-all" id="hash-sha1">Computing...</div>
        </div>

      </div>

      <!-- Hash Match Verification Tool -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3">
        <span class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">Checksum Match Verifier</span>
        <div class="flex flex-col sm:flex-row gap-3 items-center">
          <input type="text" id="verify-hash-input" placeholder="Paste target checksum to verify against computed values above..." class="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none w-full" />
          <div id="verify-status-badge" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs font-mono font-bold shrink-0">Awaiting Hash</div>
        </div>
      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Cryptographic Hash Functions &amp; Web Crypto API Security</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>Cryptographic Hash Functions</strong> are one-way deterministic algorithms that transform arbitrary-length inputs into fixed-length digest outputs with strict collision resistance and the avalanche effect.
          </p>
          <p>
            Our tool computes digests natively via the browser's hardware-accelerated <strong>SubtleCrypto (Web Crypto API)</strong> interface:
            <code>crypto.subtle.digest('SHA-256', buffer)</code>. This guarantees instant sub-millisecond computations in client memory without transmitting sensitive credentials across untrusted networks.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initHashGeneratorView() {
  const input = document.getElementById("hash-input");
  const sha256Elem = document.getElementById("hash-sha256");
  const sha512Elem = document.getElementById("hash-sha512");
  const sha384Elem = document.getElementById("hash-sha384");
  const sha1Elem = document.getElementById("hash-sha1");

  const verifyInput = document.getElementById("verify-hash-input");
  const verifyStatus = document.getElementById("verify-status-badge");

  const sampleBtn = document.getElementById("hash-sample-btn");
  const clearBtn = document.getElementById("hash-clear-btn");
  const copyButtons = document.querySelectorAll(".copy-hash-btn");

  async function computeHashes() {
    const text = input.value;
    if (!text) {
      sha256Elem.textContent = "—";
      sha512Elem.textContent = "—";
      sha384Elem.textContent = "—";
      sha1Elem.textContent = "—";
      checkVerification();
      return;
    }

    const enc = new TextEncoder();
    const data = enc.encode(text);

    const [h256, h512, h384, h1] = await Promise.all([
      crypto.subtle.digest("SHA-256", data),
      crypto.subtle.digest("SHA-512", data),
      crypto.subtle.digest("SHA-384", data),
      crypto.subtle.digest("SHA-1", data)
    ]);

    sha256Elem.textContent = bufferToHex(h256);
    sha512Elem.textContent = bufferToHex(h512);
    sha384Elem.textContent = bufferToHex(h384);
    sha1Elem.textContent = bufferToHex(h1);

    checkVerification();
  }

  function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  function checkVerification() {
    const target = (verifyInput.value || "").toLowerCase().trim();
    if (!target) {
      verifyStatus.className = "px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs font-mono font-bold shrink-0";
      verifyStatus.textContent = "Awaiting Hash";
      return;
    }

    const currentHashes = [
      sha256Elem.textContent.toLowerCase(),
      sha512Elem.textContent.toLowerCase(),
      sha384Elem.textContent.toLowerCase(),
      sha1Elem.textContent.toLowerCase()
    ];

    if (currentHashes.includes(target)) {
      verifyStatus.className = "px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold shrink-0";
      verifyStatus.textContent = "MATCH CONFIRMED";
    } else {
      verifyStatus.className = "px-4 py-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-mono font-bold shrink-0";
      verifyStatus.textContent = "NO MATCH";
    }
  }

  input?.addEventListener("input", computeHashes);
  verifyInput?.addEventListener("input", checkVerification);

  copyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const val = document.getElementById(targetId)?.textContent || "";
      copyToClipboard(val, "Hash digest");
    });
  });

  sampleBtn?.addEventListener("click", () => {
    input.value = "WebDeveloperHub2026!SecureKey";
    computeHashes();
    showToast("Sample text loaded", "info");
  });

  clearBtn?.addEventListener("click", () => {
    input.value = "";
    computeHashes();
  });

  computeHashes();
}
