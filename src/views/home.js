// Home View: Complete 74 Developer Utilities & AI Studio Catalog
// Searchable, filterable directory with real-time fuzzy keyword search and direct routing

export function renderHomeView() {
  return `
    <div class="space-y-8 animate-fadeIn">
      
      <!-- Hero Banner -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/90 via-slate-900 to-purple-950/90 border border-indigo-500/20 p-6 sm:p-10 shadow-2xl">
        <div class="relative z-10 max-w-3xl space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <span class="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            <span>AI Developer Tools + Web Developer Toolbox (74 Tools)</span>
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            The Ultimate <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300">Developer Hub</span> for Modern Web Creators.
          </h1>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
            Fast, client-side, zero-telemetry utilities. Format JSON, convert units, debug flexbox, inspect JWTs, test APIs, compress images, and generate responsive UI components with Gemini AI.
          </p>
          
          <!-- Quick Search in Hero -->
          <div class="pt-2 flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <input 
                type="text" 
                id="hero-tool-search" 
                placeholder="Search 74 developer tools (e.g. JSON, Flexbox, Regex, JWT, Clean Code, cURL, Image Compress)..." 
                class="w-full bg-slate-950/90 border border-indigo-500/30 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 shadow-xl"
              />
              <svg class="w-5 h-5 text-indigo-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <a href="#tools/code-to-design" class="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span>Explore AI Studio</span>
            </a>
          </div>
        </div>
        
        <!-- Decorative Glows -->
        <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute right-40 -top-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div class="flex flex-wrap gap-1.5" id="home-category-tabs">
          <button data-cat="all" class="home-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition">All Tools (76)</button>
          <button data-cat="ai" class="home-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition">AI Tools (9)</button>
          <button data-cat="web" class="home-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition">Web Tools (22)</button>
          <button data-cat="css" class="home-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition">CSS Tools (11)</button>
          <button data-cat="image" class="home-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition">Media &amp; Images (7)</button>
          <button data-cat="security" class="home-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition">Security (6)</button>
          <button data-cat="dev" class="home-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition">Developer Essentials (9)</button>
          <button data-cat="seo" class="home-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition">Website &amp; SEO (6)</button>
          <button data-cat="ref" class="home-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition">Cheat Sheets &amp; Vault (7)</button>
        </div>
        <div class="text-xs text-slate-500 font-mono" id="tool-count-label">Showing 76 utilities</div>
      </div>

      <!-- Tools Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" id="tools-grid-container">
        ${getToolCardsHtml()}
      </div>

      <!-- Features Overview -->
      <section class="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4 text-slate-300">
        <h2 class="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          Why Modern Engineers Rely on Web Developer Hub
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs leading-relaxed">
          <div class="space-y-2">
            <h3 class="font-bold text-indigo-300">100% Client-Side Privacy</h3>
            <p class="text-slate-400">All conversion algorithms, image manipulations, token parsing, and formatters execute strictly inside your local browser runtime. No data is stored or logged without your consent.</p>
          </div>
          <div class="space-y-2">
            <h3 class="font-bold text-purple-300">Smart AI Engineering</h3>
            <p class="text-slate-400">Integrated with Gemini 3.7 to analyze HTML/CSS, suggest responsive viewport breakpoints, clean codebase anti-patterns, and inspect ZIP project dependencies.</p>
          </div>
          <div class="space-y-2">
            <h3 class="font-bold text-cyan-300">High-Density Productivity</h3>
            <p class="text-slate-400">Instant keyboard navigation (Ctrl+K), zero-dependency client tools, copyable output snippets, and responsive touch/desktop interfaces.</p>
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

    toolCards.forEach((card) => {
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

  catButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      catButtons.forEach((b) => {
        b.className = "home-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition";
      });
      btn.className = "home-cat-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition";
      filterCards();
    });
  });
}

function getToolCardsHtml() {
  const allTools = [
    // 1-9: AI Tools & Security Gatekeeper
    {
      route: "tools/fix-github-project",
      cat: "ai",
      title: "Fix My GitHub Project",
      desc: "Connect a GitHub repository, scan the entire project, find problems, generate safe fixes, review diffs, approve and sign patch, verify, and create a Pull Request.",
      badge: "GitHub Repair Engine",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "fix my github project repair repository repo scanner audit pull request pr sign approve diff patch branch"
    },
    {
      route: "tools/code-sign-approve",
      cat: "ai",
      title: "Code Sign & Approve",
      desc: "Review and authorize code changes before they are written to your project with SHA-256 fingerprinting and ECDSA digital signatures.",
      badge: "Zero-Trust Gate",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      tags: "code sign approve security audit ai authorization diff gatekeeper fingerprint ecdsa p256"
    },
    {
      route: "tools/code-to-design",
      cat: "ai",
      title: "Code to Design",
      desc: "AI visual layout transformer and modern UX enhancement suggestions for raw HTML/CSS/Tailwind.",
      badge: "AI Studio",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "code to design ai visual suggest enhance ui responsive"
    },
    {
      route: "tools/prompt-to-ui",
      cat: "ai",
      title: "Prompt to UI",
      desc: "Generate production-ready HTML5, Tailwind, or React components from natural language prompts.",
      badge: "AI Studio",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      tags: "prompt to ui generate component react html tailwind ai"
    },
    {
      route: "tools/make-responsive",
      cat: "ai",
      title: "Make Responsive",
      desc: "Transform desktop-locked markup into fluid, mobile-first responsive layouts with Tailwind prefixes.",
      badge: "AI Studio",
      badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
      tags: "make responsive mobile first breakpoint viewport ai"
    },
    {
      route: "tools/flex-grid-fix",
      cat: "ai",
      title: "Flex & Grid Fix",
      desc: "Detect overflow anomalies, collapsing items, and alignment bugs in CSS Flexbox and Grid code.",
      badge: "AI Studio",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      tags: "flex grid fix css layout overflow alignment ai"
    },
    {
      route: "tools/fix-html",
      cat: "ai",
      title: "Fix HTML",
      desc: "Automated semantic structure repairs, tag unnesting, unclosed element fixes, and accessibility audits.",
      badge: "AI Studio",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      tags: "fix html dom unclosed tags semantic accessibility a11y ai"
    },
    {
      route: "tools/clean-my-code",
      cat: "ai",
      title: "Clean My Code",
      desc: "Refactor messy logic, remove dead code, normalize indentation, and improve maintainability.",
      badge: "AI Studio",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      tags: "clean my code refactor tidy format quality lint ai"
    },
    {
      route: "tools/check-zip-project",
      cat: "ai",
      title: "Check ZIP Project",
      desc: "Deep client-side archive scanner for package dependencies, security vulnerabilities, and code health.",
      badge: "AI Studio",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      tags: "check zip project debugger repository architecture security ai"
    },

    // 8-13: JSON Suite
    {
      route: "tools/json-formatter",
      cat: "web",
      title: "JSON Formatter",
      desc: "Beautify, indent, and organize JSON structures with interactive collapsible syntax highlighting.",
      badge: "JSON Suite",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      tags: "json formatter beautify indent format syntax tree"
    },
    {
      route: "tools/json-validator",
      cat: "web",
      title: "JSON Validator",
      desc: "Validate JSON syntax with precise line/column error markers and parse error diagnostics.",
      badge: "JSON Suite",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      tags: "json validator validate schema lint error parse"
    },
    {
      route: "tools/json-minifier",
      cat: "web",
      title: "JSON Minifier",
      desc: "Strip unnecessary whitespace, line breaks, and indentation from JSON payloads for fast network transport.",
      badge: "JSON Suite",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      tags: "json minifier compress compact payload minify"
    },
    {
      route: "tools/json-viewer",
      cat: "web",
      title: "JSON Viewer & Tree",
      desc: "Explore complex nested JSON hierarchies with collapsible nodes, copy paths, and key count metrics.",
      badge: "JSON Suite",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      tags: "json viewer tree view inspect explore collapsible nodes"
    },
    {
      route: "tools/json-to-csv",
      cat: "web",
      title: "JSON to CSV",
      desc: "Convert JSON array structures into tabular CSV data ready for Google Sheets and Excel.",
      badge: "JSON Suite",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      tags: "json to csv convert tabular spreadsheet excel sheets"
    },
    {
      route: "tools/csv-to-json",
      cat: "web",
      title: "CSV to JSON",
      desc: "Parse raw CSV spreadsheet text into structured JSON arrays with automatic column header detection.",
      badge: "JSON Suite",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      tags: "csv to json convert table dataset spreadsheet parse"
    },

    // 14-18: HTML Suite
    {
      route: "tools/html-formatter",
      cat: "web",
      title: "HTML Formatter",
      desc: "Format and indent HTML documents with clean hierarchical tag alignment.",
      badge: "HTML Suite",
      badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
      tags: "html formatter beautify indent tags markup"
    },
    {
      route: "tools/html-minifier",
      cat: "web",
      title: "HTML Minifier",
      desc: "Compress HTML source code by removing comments, redundant spaces, and line breaks.",
      badge: "HTML Suite",
      badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
      tags: "html minifier minify compress production markup"
    },
    {
      route: "tools/html-checker",
      cat: "web",
      title: "HTML Checker",
      desc: "Syntax validation for unclosed tags, void elements, and DOM hierarchy rules.",
      badge: "HTML Suite",
      badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
      tags: "html checker validator unclosed tags dom syntax"
    },
    {
      route: "tools/html-to-markdown",
      cat: "web",
      title: "HTML to Markdown",
      desc: "Convert HTML elements into GitHub Flavored Markdown for documentation.",
      badge: "HTML Suite",
      badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
      tags: "html to markdown gfm convert docs readme"
    },
    {
      route: "tools/html-to-jsx",
      cat: "web",
      title: "HTML to JSX",
      desc: "Convert standard HTML into React JSX with className, htmlFor, and self-closing tags.",
      badge: "HTML Suite",
      badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
      tags: "html to jsx react classname htmlfor component"
    },

    // 19-20: JWT Suite
    {
      route: "tools/jwt-decoder",
      cat: "web",
      title: "JWT Decoder",
      desc: "Safely decode JSON Web Tokens into Header and Payload JSON on the client side.",
      badge: "JWT",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      tags: "jwt decoder token json web token auth claims header"
    },
    {
      route: "tools/jwt-expiry",
      cat: "web",
      title: "JWT Expiry Inspector",
      desc: "Inspect exp timestamps, remaining token lifespan, and expiration status.",
      badge: "JWT",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      tags: "jwt expiry expiration timer inspect token status"
    },

    // 21-26: Regex, URL, Base64
    {
      route: "tools/regex-tester",
      cat: "web",
      title: "Regex Tester",
      desc: "Test regular expressions in real-time with syntax flags, group match extraction, and pattern presets.",
      badge: "Regex",
      badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
      tags: "regex tester regular expression match flags pattern sandbox"
    },
    {
      route: "tools/url-encoder",
      cat: "web",
      title: "URL Encoder",
      desc: "Encode reserved characters into URI percent-encoded strings.",
      badge: "URL",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      tags: "url encoder encode percent encoding uri"
    },
    {
      route: "tools/url-decoder",
      cat: "web",
      title: "URL Decoder",
      desc: "Decode percent-encoded URI strings back into clean, readable text.",
      badge: "URL",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      tags: "url decoder decode query string uri"
    },
    {
      route: "tools/url-parser",
      cat: "web",
      title: "URL Parser",
      desc: "Deconstruct URLs into protocol, hostname, port, pathname, hash, and query parameters.",
      badge: "URL",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      tags: "url parser breakdown host path search params port"
    },
    {
      route: "tools/base64-encoder",
      cat: "web",
      title: "Base64 Encoder",
      desc: "Encode plaintext and binary assets into standard Base64 representation.",
      badge: "Base64",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      tags: "base64 encoder encode text binary data uri"
    },
    {
      route: "tools/base64-decoder",
      cat: "web",
      title: "Base64 Decoder",
      desc: "Decode Base64 strings back to UTF-8 plaintext with error checking.",
      badge: "Base64",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      tags: "base64 decoder decode utf8 text binary"
    },

    // 27-29: cURL, API Tester, Code Diff
    {
      route: "tools/curl-converter",
      cat: "web",
      title: "cURL Converter",
      desc: "Convert cURL commands into JavaScript Fetch, Axios, Python Requests, and Node HTTP.",
      badge: "cURL",
      badgeColor: "bg-green-500/10 text-green-400 border-green-500/30",
      tags: "curl converter fetch axios python requests node http"
    },
    {
      route: "tools/api-tester",
      cat: "web",
      title: "API Tester",
      desc: "Client-side REST HTTP client supporting GET, POST, PUT, PATCH, and DELETE with custom headers.",
      badge: "REST",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      tags: "api tester rest client http postman endpoint request headers"
    },
    {
      route: "tools/code-diff",
      cat: "web",
      title: "Code Diff & Comparator",
      desc: "Side-by-side text and code comparator highlighting line additions, deletions, and modifications.",
      badge: "Diff",
      badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/30",
      tags: "code diff comparator text compare git diff changes"
    },

    // 30-40: CSS Tools
    {
      route: "tools/flexbox-builder",
      cat: "css",
      title: "Flexbox Builder",
      desc: "Interactive visual flexbox playground with direction, wrap, justify, and align controls.",
      badge: "CSS",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "flexbox builder playground css layout flex justify align"
    },
    {
      route: "tools/grid-builder",
      cat: "css",
      title: "CSS Grid Builder",
      desc: "Visual 2D grid matrix generator with template columns, rows, gap controls, and CSS output.",
      badge: "CSS",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "css grid builder columns rows matrix template gap"
    },
    {
      route: "tools/gradient-maker",
      cat: "css",
      title: "Gradient Maker",
      desc: "Generate linear, radial, and conic gradients with angle dials, color stops, and CSS copy.",
      badge: "CSS",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "gradient maker linear radial conic color stops css"
    },
    {
      route: "tools/color-picker",
      cat: "css",
      title: "Color Picker & Palette",
      desc: "RGB, HSL, and HEX color palette inspector with harmony schemes and contrast check.",
      badge: "CSS",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "color picker palette rgb hsl hex harmony"
    },
    {
      route: "tools/color-converter",
      cat: "css",
      title: "Color Converter",
      desc: "Convert color formats between HEX, RGB, RGBA, HSL, and HSLA.",
      badge: "CSS",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "color converter hex rgb hsl hsla convert"
    },
    {
      route: "tools/shadow-maker",
      cat: "css",
      title: "Box Shadow Maker",
      desc: "Custom multi-layer CSS box-shadow generator with blur, spread, offset, and inset toggles.",
      badge: "CSS",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "box shadow maker blur spread inset elevation css"
    },
    {
      route: "tools/border-maker",
      cat: "css",
      title: "Border Radius Maker",
      desc: "Configure 8-point individual corner border-radius curves with interactive preview.",
      badge: "CSS",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "border radius maker corners curves shape css"
    },
    {
      route: "tools/css-clamp",
      cat: "css",
      title: "CSS Clamp Calculator",
      desc: "Generate fluid typography and dynamic viewport scaling snippets with CSS clamp().",
      badge: "CSS",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "css clamp calculator fluid typography rem px scaling"
    },
    {
      route: "tools/px-to-rem",
      cat: "css",
      title: "PX to REM Converter",
      desc: "Instant pixel to scalable REM / EM calculation with custom base font size setting.",
      badge: "CSS",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "px to rem converter pixels rem em font size"
    },
    {
      route: "tools/glass-effect",
      cat: "css",
      title: "Glass Effect Maker",
      desc: "Craft modern backdrop-filter frosted glassmorphism cards with border opacity controls.",
      badge: "CSS",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "glass effect glassmorphism backdrop blur frosted css"
    },
    {
      route: "tools/css-minifier",
      cat: "css",
      title: "CSS Minifier",
      desc: "Minify stylesheets, eliminate comments, and compress rule blocks for fast page loads.",
      badge: "CSS",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "css minifier minify compress styles optimize"
    },

    // 41-47: Image & Media Tools
    {
      route: "tools/image-compress",
      cat: "image",
      title: "Image Compress",
      desc: "Lossless and lossy client-side image compression to shrink file sizes before web publishing.",
      badge: "Media",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      tags: "image compress reduce file size jpeg png webp"
    },
    {
      route: "tools/image-resize",
      cat: "image",
      title: "Image Resize",
      desc: "Scale image dimensions with custom width, height, and aspect ratio locking in the browser.",
      badge: "Media",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      tags: "image resize dimensions width height aspect ratio"
    },
    {
      route: "tools/convert-image",
      cat: "image",
      title: "Image Format Converter",
      desc: "Convert image files between PNG, JPEG, WebP, and Base64 format instantly.",
      badge: "Media",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      tags: "convert image png jpeg webp format converter"
    },
    {
      route: "tools/svg-optimizer",
      cat: "image",
      title: "SVG Optimizer",
      desc: "Strip unnecessary metadata, editor comments, and minify vector SVG XML paths.",
      badge: "Media",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      tags: "svg optimizer clean vector minify path svgo"
    },
    {
      route: "tools/svg-data-uri",
      cat: "image",
      title: "SVG Data URI",
      desc: "Convert raw SVG into CSS background-image Data URIs and Base64 strings.",
      badge: "Media",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      tags: "svg data uri background image css inline"
    },
    {
      route: "tools/favicon-maker",
      cat: "image",
      title: "Favicon Maker",
      desc: "Generate multi-size web favicons (16x16, 32x32, 48x48) with HTML link tags.",
      badge: "Media",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      tags: "favicon maker icon generate web manifest browser"
    },

    // 48-52: Security Tools
    {
      route: "tools/hash-generator",
      cat: "security",
      title: "Hash Generator",
      desc: "Generate cryptographic SHA-256, SHA-512, and MD5 hashes from text input.",
      badge: "Security",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      tags: "hash generator sha256 sha512 md5 crypto checksum"
    },
    {
      route: "tools/sha256-generator",
      cat: "security",
      title: "SHA-256 Checksum",
      desc: "Generate deterministic 256-bit hash digests using Web Crypto API.",
      badge: "Security",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      tags: "sha256 generator checksum digest crypto security"
    },
    {
      route: "tools/sha512-generator",
      cat: "security",
      title: "SHA-512 Generator",
      desc: "Generate high-entropy 512-bit cryptographic hash representations.",
      badge: "Security",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      tags: "sha512 generator crypto secure hash"
    },
    {
      route: "tools/password-generator",
      cat: "security",
      title: "Password Generator",
      desc: "Generate cryptographically secure random passwords with symbols, numbers, and entropy scores.",
      badge: "Security",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      tags: "password generator random secure entropy symbols"
    },
    {
      route: "tools/uuid-generator",
      cat: "security",
      title: "UUID v4 Generator",
      desc: "Generate universally unique identifiers (UUID v4 / GUID) with bulk creation mode.",
      badge: "Security",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      tags: "uuid generator v4 guid random identifier database"
    },

    // 53-61: Developer Essentials
    {
      route: "tools/timestamp-converter",
      cat: "dev",
      title: "Timestamp Converter",
      desc: "Convert POSIX Unix timestamps to human-readable dates (UTC and local) and vice versa.",
      badge: "Essentials",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      tags: "timestamp converter unix epoch posix date time"
    },
    {
      route: "tools/base-converter",
      cat: "dev",
      title: "Base Converter",
      desc: "Translate numbers between Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hex (Base 16).",
      badge: "Essentials",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      tags: "base converter binary hex decimal octal radix"
    },
    {
      route: "tools/text-case",
      cat: "dev",
      title: "Text Case Converter",
      desc: "Transform strings into camelCase, kebab-case, snake_case, PascalCase, UPPERCASE, and lowercase.",
      badge: "Essentials",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      tags: "text case converter camel kebab snake pascal uppercase lowercase"
    },
    {
      route: "tools/word-counter",
      cat: "dev",
      title: "Word & Byte Counter",
      desc: "Real-time count of words, characters, lines, reading time, and byte payload sizes.",
      badge: "Essentials",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      tags: "word counter character byte size lines length"
    },
    {
      route: "tools/lorem-ipsum",
      cat: "dev",
      title: "Lorem Ipsum Generator",
      desc: "Generate dummy placeholder copy paragraphs for mockups, prototypes, and typography tests.",
      badge: "Essentials",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      tags: "lorem ipsum generator placeholder dummy text copy"
    },
    {
      route: "tools/sql-formatter",
      cat: "dev",
      title: "SQL Formatter",
      desc: "Beautify complex SQL queries, capitalize keywords, and indent JOIN/WHERE clauses cleanly.",
      badge: "Essentials",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      tags: "sql formatter format queries database postgres mysql"
    },

    // 62-67: Website & SEO Tools
    {
      route: "tools/meta-tag-generator",
      cat: "seo",
      title: "Meta Tag Generator",
      desc: "Generate canonical tags, viewport definitions, title tags, and meta descriptions for SEO.",
      badge: "SEO",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      tags: "meta tag generator seo head title description canonical"
    },
    {
      route: "tools/open-graph",
      cat: "seo",
      title: "Open Graph Generator",
      desc: "Generate Facebook, LinkedIn, and Discord Open Graph tags with real-time card previews.",
      badge: "SEO",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      tags: "open graph og meta preview tags facebook social"
    },
    {
      route: "tools/twitter-card",
      cat: "seo",
      title: "Twitter Card Maker",
      desc: "Create summary_large_image and standard Twitter Card meta tags for rich tweets.",
      badge: "SEO",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      tags: "twitter card maker summary large image meta"
    },
    {
      route: "tools/robots-txt",
      cat: "seo",
      title: "robots.txt Generator",
      desc: "Build search engine crawler directives, allow/disallow paths, and sitemap references.",
      badge: "SEO",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      tags: "robots txt generator search engine crawler indexing directives"
    },
    {
      route: "tools/sitemap-generator",
      cat: "seo",
      title: "Sitemap.xml Generator",
      desc: "Generate clean XML sitemap documents conforming to sitemaps.org standards.",
      badge: "SEO",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      tags: "sitemap xml generator search engine indexing urls"
    },

    // 68-74: Cheat Sheets & Vault
    {
      route: "tools/git-cheat-sheet",
      cat: "ref",
      title: "Git Cheat Sheet",
      desc: "Quick syntax reference for branch checkouts, cherry-picks, rebases, stashes, and commit resets.",
      badge: "Reference",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      tags: "git cheat sheet version control branch commit rebase stash"
    },
    {
      route: "tools/docker-cheat-sheet",
      cat: "ref",
      title: "Docker Cheat Sheet",
      desc: "Essential Docker build, run, exec, volume, network, and system prune commands.",
      badge: "Reference",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      tags: "docker cheat sheet container build run exec compose prune"
    },
    {
      route: "tools/linux-cheat-sheet",
      cat: "ref",
      title: "Linux Command Cheat Sheet",
      desc: "Top bash commands for process inspection (lsof, ps, kill), permissions (chmod), and archiving.",
      badge: "Reference",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      tags: "linux cheat sheet bash terminal commands lsof grep tar"
    },
    {
      route: "tools/cheat-sheets",
      cat: "ref",
      title: "Developer Cheat Sheets Hub",
      desc: "All-in-one searchable reference for HTTP status codes, SQL queries, Docker, and Git.",
      badge: "Reference",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      tags: "cheat sheets hub http status codes sql queries commands reference"
    },
    {
      route: "tools/cloud-vault",
      cat: "ref",
      title: "Snippet Vault",
      desc: "Locally persisted and Firestore-ready code snippet manager with tags, instant search, and one-click copy.",
      badge: "Vault",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      tags: "snippet vault cloud storage snippets code save tags search"
    }
  ];

  return allTools
    .map(
      (tool) => `
      <a 
        href="#${tool.route}" 
        data-route="${tool.route}"
        data-title="${tool.title}" 
        data-tags="${tool.tags}" 
        data-category="${tool.cat}"
        class="tool-card group relative p-5 rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${tool.badgeColor}">
              ${tool.badge}
            </span>
            <svg class="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 class="text-base font-bold text-white group-hover:text-indigo-300 transition-colors tracking-tight">
            ${tool.title}
          </h3>
          <p class="text-xs text-slate-400 leading-relaxed">
            ${tool.desc}
          </p>
        </div>
        
        <div class="pt-4 mt-2 border-t border-slate-800/50 flex items-center justify-between text-[11px] font-mono text-slate-500 group-hover:text-slate-400">
          <span>Open Utility</span>
          <span class="text-indigo-400 font-bold">&rarr;</span>
        </div>
      </a>
    `
    )
    .join("");
}
