// Home View: 20+ Tool Directory, Live Search & Stats Catalog

export function renderHomeView() {
  return `
    <div class="space-y-8 animate-fadeIn">
      
      <!-- Hero Banner -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/20 p-6 sm:p-10 shadow-2xl">
        <div class="relative z-10 max-w-3xl space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <span class="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            <span>20+ All-in-One Developer Utilities &amp; AI Engine</span>
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            The Ultimate <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300">Developer Hub</span> for Modern Web Creators.
          </h1>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
            Fast, client-side, zero-telemetry utilities. Format JSON, convert PX to REM, inspect JWTs, debug ZIP repositories, and generate responsive UI designs with Gemini 3.7 AI.
          </p>
          
          <!-- Quick Search in Hero -->
          <div class="pt-2 flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <input 
                type="text" 
                id="hero-tool-search" 
                placeholder="Search by name, keyword or format (e.g. JWT, JSON, SVG, Regex, AI Design, ZIP)..." 
                class="w-full bg-slate-950/90 border border-indigo-500/30 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 shadow-xl"
              />
              <svg class="w-5 h-5 text-indigo-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <a href="#tools/ai-design-suggester" class="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span>Try AI Design Suggester</span>
            </a>
          </div>
        </div>
        
        <!-- Decorative Glow -->
        <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute right-40 -top-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div class="flex flex-wrap gap-1.5" id="home-category-tabs">
          <button data-cat="all" class="home-cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition">All Tools (22)</button>
          <button data-cat="core" class="home-cat-btn px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition">Core Utilities (5)</button>
          <button data-cat="converters" class="home-cat-btn px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition">Converters &amp; Security (5)</button>
          <button data-cat="builders" class="home-cat-btn px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition">Asset &amp; Code (6)</button>
          <button data-cat="ai" class="home-cat-btn px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition">AI Suite &amp; Debuggers (6)</button>
        </div>
        <div class="text-xs text-slate-500 font-mono" id="tool-count-label">Showing 22 utilities</div>
      </div>

      <!-- Tools Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="tools-grid-container">
        ${getToolCardsHtml()}
      </div>

      <!-- SEO Overview & Schema.org Guide for Web Developer Hub -->
      <section class="mt-12 p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4 text-slate-300">
        <h2 class="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          Why Choose Web Developer Hub?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs leading-relaxed">
          <div class="space-y-2">
            <h3 class="font-bold text-indigo-300">100% Client-Side Privacy</h3>
            <p class="text-slate-400">All sensitive computations—such as JWT parsing, SHA hash generation, Base64 image encoding, and ZIP repository extraction—execute strictly inside your browser sandbox. Your tokens, passwords, and source code are never uploaded or stored on untrusted servers.</p>
          </div>
          <div class="space-y-2">
            <h3 class="font-bold text-purple-300">AI-Assisted Craftsmanship</h3>
            <p class="text-slate-400">Powered by Google Gemini 3.7 Flash, our AI tools analyze your raw HTML/CSS/React code to suggest stunning responsive redesigns, mobile-first breakpoints, fluid clamp typography, and perform deep ZIP repository health scans.</p>
          </div>
          <div class="space-y-2">
            <h3 class="font-bold text-cyan-300">Cloud Persistence via Firestore</h3>
            <p class="text-slate-400">Seamlessly sync your custom CSS snippets, regex patterns, cURL templates, and API endpoints across multiple machines with Google Firebase Firestore integration.</p>
          </div>
        </div>
      </section>

    </div>
  `;
}

export function initHomeView() {
  const searchInput = document.getElementById("hero-tool-search");
  const catButtons = document.querySelectorAll(".home-cat-btn");
  const toolCards = document.querySelectorAll(".tool-card");
  const countLabel = document.getElementById("tool-count-label");

  function filterCards() {
    const query = (searchInput?.value || "").toLowerCase().trim();
    const activeCatBtn = document.querySelector(".home-cat-btn.bg-indigo-600");
    const selectedCat = activeCatBtn?.dataset.cat || "all";

    let visibleCount = 0;

    toolCards.forEach(card => {
      const title = (card.dataset.title || "").toLowerCase();
      const tags = (card.dataset.tags || "").toLowerCase();
      const cat = card.dataset.category || "";

      const matchesQuery = !query || title.includes(query) || tags.includes(query);
      const matchesCat = selectedCat === "all" || cat === selectedCat;

      if (matchesQuery && matchesCat) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    });

    if (countLabel) {
      countLabel.textContent = `Showing ${visibleCount} utilities`;
    }
  }

  searchInput?.addEventListener("input", filterCards);

  catButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      catButtons.forEach(b => {
        b.className = "home-cat-btn px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition";
      });
      btn.className = "home-cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition";
      filterCards();
    });
  });
}

function getToolCardsHtml() {
  const tools = [
    // Core Utilities
    {
      route: "tools/json-formatter",
      cat: "core",
      title: "JSON Formatter & Tree",
      desc: "Validate, format, minify, and inspect JSON with an interactive collapsible tree view and error markers.",
      badge: "Core",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      iconColor: "text-cyan-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>`,
      tags: "json validator formatter minify beautify tree view format syntax"
    },
    {
      route: "tools/px-to-rem",
      cat: "core",
      title: "PX to REM / EM Converter",
      desc: "Convert pixels to scalable REM/EM units with editable base font size, interactive dual sliders, and clamp() snippets.",
      badge: "Typography",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      iconColor: "text-indigo-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"/>`,
      tags: "px rem em pixel converter typography clamp base font fluid"
    },
    {
      route: "tools/svg-data-uri",
      cat: "core",
      title: "SVG to CSS Data URI",
      desc: "Transform raw SVG graphics into cleaned inline SVG, CSS background-image Data URIs, and Base64 strings.",
      badge: "Vector",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      iconColor: "text-purple-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>`,
      tags: "svg data uri base64 background-image css vector optimize"
    },
    {
      route: "tools/open-graph",
      cat: "core",
      title: "Open Graph & Meta Tags",
      desc: "Generate complete HTML social head tags with real-time interactive preview cards for Twitter and Facebook.",
      badge: "SEO / Social",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      iconColor: "text-blue-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>`,
      tags: "open graph meta tags twitter card facebook seo social preview head"
    },
    {
      route: "tools/flexbox-grid",
      cat: "core",
      title: "Flexbox & Grid Playground",
      desc: "Visual interactive playground with directional, alignment, and gap controls with real-time CSS & Tailwind export.",
      badge: "CSS Layout",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      iconColor: "text-emerald-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>`,
      tags: "flexbox grid css layout playground align justify tailwind"
    },

    // Converters & Security
    {
      route: "tools/html-markdown-jsx",
      cat: "converters",
      title: "HTML to Markdown / JSX",
      desc: "Dual-pane converter transforming raw HTML markup into GitHub Flavored Markdown and valid React JSX code.",
      badge: "Syntax",
      badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
      iconColor: "text-pink-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>`,
      tags: "html markdown jsx react converter className htmlFor"
    },
    {
      route: "tools/gradient-palette",
      cat: "converters",
      title: "CSS Gradient & Palette",
      desc: "Create linear, radial, and conic gradients with angle dials, color stops, and automatic harmony color palettes.",
      badge: "Design",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      iconColor: "text-rose-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4 5 5 0 015-5 4 4 0 014 4 5 5 0 01-5 5zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>`,
      tags: "css gradient linear radial conic color palette harmony hex rgb hsl"
    },
    {
      route: "tools/jwt-decoder",
      cat: "converters",
      title: "JWT Safe Client Decoder",
      desc: "Safely parse JSON Web Tokens on the client without exposing keys. Inspect Header, Claims, and live expiration timer.",
      badge: "Security",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      iconColor: "text-amber-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>`,
      tags: "jwt token decoder json web token claims auth security expiration"
    },
    {
      route: "tools/regex-tester",
      cat: "converters",
      title: "Regex Tester & Matcher",
      desc: "Interactive regex matcher with flags (g, i, m, s, u), visual token highlight, capture group table, and preset patterns.",
      badge: "Pattern",
      badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
      iconColor: "text-teal-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>`,
      tags: "regex regular expression tester matcher pattern flags test cases"
    },
    {
      route: "tools/cheat-sheets",
      cat: "converters",
      title: "Developer Cheat Sheets",
      desc: "Searchable reference cards for Git commands, Linux bash shortcuts, HTTP status codes, and fluid CSS clamp().",
      badge: "Reference",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      iconColor: "text-sky-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>`,
      tags: "cheat sheet git linux bash http status clamp calculator reference"
    },

    // Asset & Code Builders
    {
      route: "tools/image-base64",
      cat: "builders",
      title: "WebP / Image Base64",
      desc: "Drag-and-drop client-side FileReader encoding PNG, JPG, WebP, and SVG images into raw Data URIs and <img> tags.",
      badge: "Assets",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      iconColor: "text-yellow-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>`,
      tags: "image base64 encoder data uri webp png jpg filereader drag drop"
    },
    {
      route: "tools/code-minifier",
      cat: "builders",
      title: "Code Minifier & Beautifier",
      desc: "Compact or format HTML, CSS, JavaScript, and JSON with indentation customizer and byte savings counter.",
      badge: "Optimizer",
      badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/30",
      iconColor: "text-violet-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>`,
      tags: "code minifier beautifier html css js javascript json compress format"
    },
    {
      route: "tools/sql-formatter",
      cat: "builders",
      title: "SQL Formatter & Schema",
      desc: "Beautify SQL queries with keyword uppercasing and build mock database table schemas with SQL DDL export.",
      badge: "Database",
      badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      iconColor: "text-orange-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>`,
      tags: "sql formatter schema builder database query beautify ddl postgres mysql"
    },
    {
      route: "tools/curl-converter",
      cat: "builders",
      title: "cURL to Fetch / Python",
      desc: "Parse raw cURL commands and convert them instantly into modern JavaScript fetch(), Python requests, and Axios.",
      badge: "API Script",
      badgeColor: "bg-green-500/10 text-green-400 border-green-500/30",
      iconColor: "text-green-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>`,
      tags: "curl fetch python requests axios api converter script parse"
    },
    {
      route: "tools/hash-generator",
      cat: "builders",
      title: "SHA & MD5 Hash Generator",
      desc: "Compute SHA-256, SHA-512, SHA-384, and MD5 cryptographic hashes using the Web Crypto API with live match verifier.",
      badge: "Crypto",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      iconColor: "text-red-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/>`,
      tags: "sha256 sha512 md5 hash crypto generator web crypto verify checksum"
    },
    {
      route: "tools/glassmorphism-animator",
      cat: "builders",
      title: "Glassmorphism & Keyframes",
      desc: "Slider-driven CSS glass blur, opacity, shadow generator and visual keyframe animation builder with CSS export.",
      badge: "CSS FX",
      badgeColor: "bg-indigo-400/10 text-indigo-300 border-indigo-400/30",
      iconColor: "text-indigo-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
      tags: "glassmorphism keyframes animation css blur shadow generator effects"
    },

    // AI Suite & Debuggers
    {
      route: "tools/ai-design-suggester",
      cat: "ai",
      title: "AI Code Design Suggester",
      desc: "Paste ANY HTML/CSS/React snippet. Gemini 3.7 AI suggests 3 unique, modern, and 100% responsive redesigns with live sandbox.",
      badge: "AI Powered",
      badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
      iconColor: "text-indigo-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>`,
      tags: "ai design suggester responsive redesign code unique modern mobile first"
    },
    {
      route: "tools/ui-prompt-engine",
      cat: "ai",
      title: "AI UI Prompt to Design",
      desc: "Generate complete HTML + Tailwind CSS + React JSX components from natural language prompts with interactive preview.",
      badge: "AI Generator",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      iconColor: "text-purple-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4 5 5 0 015-5 4 4 0 014 4 5 5 0 01-5 5zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>`,
      tags: "ai ui prompt design component tailwind react jsx generator cards"
    },
    {
      route: "tools/zip-debugger",
      cat: "ai",
      title: "ZIP Project Debugger",
      desc: "Client-side ZIP extraction using JSZip to parse text files, browse directory tree, and run 1-click AI codebase audits.",
      badge: "AI Code Audit",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      iconColor: "text-cyan-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>`,
      tags: "zip debugger jszip project audit code review bug scanner security inspect"
    },
    {
      route: "tools/responsive-converter",
      cat: "ai",
      title: "Responsive Converter",
      desc: "Refactor fixed-width code into mobile-first responsive layouts with interactive Mobile/Tablet/Desktop sandbox.",
      badge: "Mobile-First",
      badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
      iconColor: "text-teal-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>`,
      tags: "responsive converter mobile first media queries fluid layout refactor"
    },
    {
      route: "tools/api-tester",
      cat: "ai",
      title: "REST API HTTP Client",
      desc: "Test REST API endpoints with custom headers, JSON body, CORS-bypass proxy, and detailed execution timing metrics.",
      badge: "HTTP Client",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      iconColor: "text-emerald-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>`,
      tags: "api tester rest http client proxy postman curl request json"
    },
    {
      route: "tools/cloud-vault",
      cat: "ai",
      title: "Firestore Cloud Vault",
      desc: "Store and manage your custom CSS rules, regex patterns, notes, and API configurations securely with Firebase sync.",
      badge: "Cloud DB",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      iconColor: "text-amber-400",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>`,
      tags: "cloud vault firestore database sync snippets storage notes css regex"
    }
  ];

  return tools.map(t => `
    <a href="#${t.route}" data-route="${t.route}" data-category="${t.cat}" data-title="${t.title}" data-tags="${t.tags}" class="tool-card group p-5 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between">
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center ${t.iconColor} group-hover:scale-105 transition-transform">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              ${t.icon}
            </svg>
          </div>
          <span class="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${t.badgeColor}">${t.badge}</span>
        </div>
        <div>
          <h3 class="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">${t.title}</h3>
          <p class="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">${t.desc}</p>
        </div>
      </div>
      <div class="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
        <span>Launch Engine</span>
        <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </div>
    </a>
  `).join("");
}
