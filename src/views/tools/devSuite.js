// Tool View: Developer Daily Suite (Unix Timestamp, Base Converter, Text Case, Word/Line Counter, Lorem Ipsum)
// 100% Client-side utility transformers

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

export function renderDevSuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-amber-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Utility Tools</span>
        <span>/</span>
        <span class="text-amber-400 font-bold">Developer Essentials</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Developer Essentials</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">CLIENT UTILITIES</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Unix timestamp converter, binary/hex/decimal base converter, text case transformer, word and byte counter, and placeholder text generator.</p>
        </div>
      </div>

      <!-- Mode Tabs -->
      <div class="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap text-xs font-mono">
        <button data-mode="timestamp" class="dev-tab-btn px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold transition">Unix Timestamp</button>
        <button data-mode="base" class="dev-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Base Converter</button>
        <button data-mode="case" class="dev-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Text Case Converter</button>
        <button data-mode="counter" class="dev-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Word &amp; Byte Counter</button>
        <button data-mode="lorem" class="dev-tab-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Lorem Ipsum</button>
      </div>

      <!-- 1. Timestamp View -->
      <div id="dev-time-view" class="space-y-4">
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Current Epoch Time</h3>
            <span id="dev-live-epoch" class="text-sm font-mono font-bold text-white bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">1700000000</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">Unix Timestamp (Seconds or Milliseconds)</label>
              <input type="text" id="time-input-ts" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono" />
            </div>
            <div>
              <label class="text-[11px] font-mono text-slate-400 block mb-1">Human Date &amp; Time (UTC &amp; Local)</label>
              <input type="text" id="time-res-human" readonly class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" />
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Base Converter View -->
      <div id="dev-base-view" class="hidden space-y-4">
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-3">
          <h3 class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Number Base Conversions</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <label class="text-[10px] text-slate-400 block mb-1">Decimal (Base 10)</label>
              <input type="number" id="base-dec" value="255" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-300 font-bold" />
            </div>
            <div>
              <label class="text-[10px] text-slate-400 block mb-1">Hexadecimal (Base 16)</label>
              <input type="text" id="base-hex" value="FF" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white uppercase font-bold" />
            </div>
            <div>
              <label class="text-[10px] text-slate-400 block mb-1">Binary (Base 2)</label>
              <input type="text" id="base-bin" value="11111111" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold" />
            </div>
            <div>
              <label class="text-[10px] text-slate-400 block mb-1">Octal (Base 8)</label>
              <input type="text" id="base-oct" value="377" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold" />
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Text Case Converter View -->
      <div id="dev-case-view" class="hidden space-y-4">
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
          <h3 class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Text Case Conversions</h3>
          <input type="text" id="case-input" value="hello world web developer hub" placeholder="Type text here..." class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-white" />
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center"><span class="text-slate-400">camelCase:</span> <strong id="case-camel" class="text-amber-300">helloWorldWeb...</strong></div>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center"><span class="text-slate-400">kebab-case:</span> <strong id="case-kebab" class="text-amber-300">hello-world-...</strong></div>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center"><span class="text-slate-400">snake_case:</span> <strong id="case-snake" class="text-amber-300">hello_world_...</strong></div>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center"><span class="text-slate-400">PascalCase:</span> <strong id="case-pascal" class="text-amber-300">HelloWorld...</strong></div>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center"><span class="text-slate-400">UPPERCASE:</span> <strong id="case-upper" class="text-amber-300">HELLO WORLD...</strong></div>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center"><span class="text-slate-400">lowercase:</span> <strong id="case-lower" class="text-amber-300">hello world...</strong></div>
          </div>
        </div>
      </div>

      <!-- 4. Word Counter View -->
      <div id="dev-count-view" class="hidden space-y-4">
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800"><span class="text-[10px] text-slate-400 uppercase">Words</span><div id="cnt-words" class="text-lg font-bold text-amber-400 mt-1">0</div></div>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800"><span class="text-[10px] text-slate-400 uppercase">Characters</span><div id="cnt-chars" class="text-lg font-bold text-white mt-1">0</div></div>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800"><span class="text-[10px] text-slate-400 uppercase">Lines</span><div id="cnt-lines" class="text-lg font-bold text-indigo-400 mt-1">0</div></div>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800"><span class="text-[10px] text-slate-400 uppercase">Byte Size</span><div id="cnt-bytes" class="text-lg font-bold text-emerald-400 mt-1">0 B</div></div>
          </div>
          <textarea id="cnt-textarea" rows="8" placeholder="Paste your copy or documentation here to analyze counts..." class="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-100 focus:outline-none"></textarea>
        </div>
      </div>

      <!-- 5. Lorem Ipsum View -->
      <div id="dev-lorem-view" class="hidden space-y-4">
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Lorem Ipsum Generator</h3>
            <button id="lorem-copy-btn" class="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white">Copy Text</button>
          </div>
          <div class="flex items-center gap-3 text-xs font-mono text-slate-300">
            <label>Paragraphs:</label>
            <input type="number" id="lorem-count" min="1" max="10" value="3" class="w-16 bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-center text-white" />
            <button id="lorem-gen-btn" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold">Generate</button>
          </div>
          <textarea id="lorem-output" rows="8" readonly class="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 leading-relaxed"></textarea>
        </div>
      </div>

      <!-- 250+ Word Technical Guide Section -->
      <section class="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">POSIX Unix Epochs, Radix Representation, and String Formatting</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>Unix Time</strong> (POSIX epoch time) represents the number of seconds elapsed since midnight UTC on January 1, 1970 (not counting leap seconds).
            Converting timestamps reliably requires considering timezone offsets and millisecond precision representations used across modern database engines.
          </p>
          <p>
            The <strong>Radix Base Converter</strong> translates numerical constants between Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hexadecimal (Base 16), which are essential for bitwise bitmasking and memory offset calculations.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initDevSuiteView() {
  const tabBtns = document.querySelectorAll(".dev-tab-btn");
  const timeView = document.getElementById("dev-time-view");
  const baseView = document.getElementById("dev-base-view");
  const caseView = document.getElementById("dev-case-view");
  const countView = document.getElementById("dev-count-view");
  const loremView = document.getElementById("dev-lorem-view");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => {
        b.classList.remove("bg-amber-600", "text-white", "font-bold");
        b.classList.add("text-slate-300");
      });
      btn.classList.add("bg-amber-600", "text-white", "font-bold");
      btn.classList.remove("text-slate-300");

      const mode = btn.getAttribute("data-mode");
      timeView?.classList.toggle("hidden", mode !== "timestamp");
      baseView?.classList.toggle("hidden", mode !== "base");
      caseView?.classList.toggle("hidden", mode !== "case");
      countView?.classList.toggle("hidden", mode !== "counter");
      loremView?.classList.toggle("hidden", mode !== "lorem");
    });
  });

  // Timestamp logic
  const liveEpoch = document.getElementById("dev-live-epoch");
  const timeIn = document.getElementById("time-input-ts");
  const timeRes = document.getElementById("time-res-human");

  setInterval(() => {
    const now = Math.floor(Date.now() / 1000);
    if (liveEpoch) liveEpoch.textContent = now.toString();
  }, 1000);

  if (timeIn) {
    timeIn.value = Math.floor(Date.now() / 1000).toString();
    updateHumanTime();
    timeIn.addEventListener("input", updateHumanTime);
  }

  function updateHumanTime() {
    let val = parseInt(timeIn?.value || "0");
    if (val < 10000000000) val *= 1000; // convert sec to ms
    const d = new Date(val);
    if (timeRes) timeRes.value = isNaN(d.getTime()) ? "Invalid Timestamp" : `${d.toUTCString()} / Local: ${d.toLocaleString()}`;
  }

  // Base Converter logic
  const bDec = document.getElementById("base-dec");
  const bHex = document.getElementById("base-hex");
  const bBin = document.getElementById("base-bin");
  const bOct = document.getElementById("base-oct");

  bDec?.addEventListener("input", () => {
    const num = parseInt(bDec.value) || 0;
    if (bHex) bHex.value = num.toString(16).toUpperCase();
    if (bBin) bBin.value = num.toString(2);
    if (bOct) bOct.value = num.toString(8);
  });

  // Case Converter logic
  const caseIn = document.getElementById("case-input");
  caseIn?.addEventListener("input", () => {
    const str = caseIn.value || "";
    const words = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [];

    const camel = words.map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join("");
    const kebab = words.map((w) => w.toLowerCase()).join("-");
    const snake = words.map((w) => w.toLowerCase()).join("_");
    const pascal = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");

    document.getElementById("case-camel").textContent = camel;
    document.getElementById("case-kebab").textContent = kebab;
    document.getElementById("case-snake").textContent = snake;
    document.getElementById("case-pascal").textContent = pascal;
    document.getElementById("case-upper").textContent = str.toUpperCase();
    document.getElementById("case-lower").textContent = str.toLowerCase();
  });

  // Word Counter logic
  const cntText = document.getElementById("cnt-textarea");
  cntText?.addEventListener("input", () => {
    const txt = cntText.value || "";
    const words = txt.trim() ? txt.trim().split(/\s+/).length : 0;
    const chars = txt.length;
    const lines = txt ? txt.split("\n").length : 0;
    const bytes = new Blob([txt]).size;

    document.getElementById("cnt-words").textContent = words.toString();
    document.getElementById("cnt-chars").textContent = chars.toString();
    document.getElementById("cnt-lines").textContent = lines.toString();
    document.getElementById("cnt-bytes").textContent = `${bytes} B`;
  });

  // Lorem Ipsum logic
  const loremBtn = document.getElementById("lorem-gen-btn");
  const loremOut = document.getElementById("lorem-output");
  const loremCopy = document.getElementById("lorem-copy-btn");

  const sampleParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  function generateLorem() {
    const count = parseInt(document.getElementById("lorem-count")?.value || "3");
    const result = Array(count).fill(sampleParagraph).join("\n\n");
    if (loremOut) loremOut.value = result;
  }

  loremBtn?.addEventListener("click", generateLorem);
  loremCopy?.addEventListener("click", () => copyToClipboard(loremOut?.value, "Lorem Ipsum"));
  generateLorem();
}
