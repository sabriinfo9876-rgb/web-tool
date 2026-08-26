// Web Developer Hub — SPA Router & Application Engine
// Handles hash routing, dynamic view rendering, modal handlers, and global search

import { showToast, getRemainingDailyQuota, getCustomGeminiKey, setCustomGeminiKey, updateHeaderQuotaDisplay } from "./utils.js";

// Views & Tools
import { renderHomeView, initHomeView } from "./views/home.js";
import { renderJsonFormatterView, initJsonFormatterView } from "./views/tools/jsonFormatter.js";
import { renderPxToRemView, initPxToRemView } from "./views/tools/pxToRem.js";
import { renderSvgDataUriView, initSvgDataUriView } from "./views/tools/svgDataUri.js";
import { renderOpenGraphView, initOpenGraphView } from "./views/tools/openGraph.js";
import { renderFlexboxGridView, initFlexboxGridView } from "./views/tools/flexboxGrid.js";
import { renderHtmlMarkdownJsxView, initHtmlMarkdownJsxView } from "./views/tools/htmlMarkdownJsx.js";
import { renderGradientPaletteView, initGradientPaletteView } from "./views/tools/gradientPalette.js";
import { renderJwtDecoderView, initJwtDecoderView } from "./views/tools/jwtDecoder.js";
import { renderRegexTesterView, initRegexTesterView } from "./views/tools/regexTester.js";
import { renderCheatSheetsView, initCheatSheetsView } from "./views/tools/cheatSheets.js";
import { renderImageBase64View, initImageBase64View } from "./views/tools/imageBase64.js";
import { renderCodeMinifierView, initCodeMinifierView } from "./views/tools/codeMinifier.js";
import { renderSqlFormatterView, initSqlFormatterView } from "./views/tools/sqlFormatter.js";
import { renderCurlConverterView, initCurlConverterView } from "./views/tools/curlConverter.js";
import { renderHashGeneratorView, initHashGeneratorView } from "./views/tools/hashGenerator.js";
import { renderGlassmorphismAnimatorView, initGlassmorphismAnimatorView } from "./views/tools/glassmorphismAnimator.js";
import { renderUiPromptEngineView, initUiPromptEngineView } from "./views/tools/uiPromptEngine.js";
import { renderZipDebuggerView, initZipDebuggerView } from "./views/tools/zipDebugger.js";
import { renderAiDesignSuggesterView, initAiDesignSuggesterView } from "./views/tools/aiDesignSuggester.js";
import { renderResponsiveConverterView, initResponsiveConverterView } from "./views/tools/responsiveConverter.js";
import { renderCloudVaultView, initCloudVaultView } from "./views/tools/cloudVault.js";
import { renderApiTesterView, initApiTesterView } from "./views/tools/apiTester.js";

// Pages
import { renderPrivacyPolicyView, initPrivacyPolicyView } from "./views/pages/privacyPolicy.js";
import { renderAboutView, initAboutView } from "./views/pages/about.js";
import { renderContactView, initContactView } from "./views/pages/contact.js";

const routes = {
  "": { render: renderHomeView, init: initHomeView, title: "Web Developer Hub - Ultimate Developer Toolkit" },
  "home": { render: renderHomeView, init: initHomeView, title: "Web Developer Hub - Ultimate Developer Toolkit" },
  
  // Tools
  "tools/json-formatter": { render: renderJsonFormatterView, init: initJsonFormatterView, title: "JSON Formatter & Validator - WebDevHub" },
  "tools/px-to-rem": { render: renderPxToRemView, init: initPxToRemView, title: "PX to REM / EM Converter - WebDevHub" },
  "tools/svg-data-uri": { render: renderSvgDataUriView, init: initSvgDataUriView, title: "SVG to CSS Data URI Converter - WebDevHub" },
  "tools/open-graph": { render: renderOpenGraphView, init: initOpenGraphView, title: "Open Graph Meta Generator - WebDevHub" },
  "tools/flexbox-grid": { render: renderFlexboxGridView, init: initFlexboxGridView, title: "CSS Flexbox & Grid Builder - WebDevHub" },
  "tools/html-markdown-jsx": { render: renderHtmlMarkdownJsxView, init: initHtmlMarkdownJsxView, title: "HTML to Markdown & React JSX Converter - WebDevHub" },
  "tools/gradient-palette": { render: renderGradientPaletteView, init: initGradientPaletteView, title: "CSS Gradient & Color Palette Generator - WebDevHub" },
  "tools/jwt-decoder": { render: renderJwtDecoderView, init: initJwtDecoderView, title: "JWT Safe Client Decoder - WebDevHub" },
  "tools/regex-tester": { render: renderRegexTesterView, init: initRegexTesterView, title: "RegEx Pattern Tester & Sandbox - WebDevHub" },
  "tools/cheat-sheets": { render: renderCheatSheetsView, init: initCheatSheetsView, title: "Developer Cheat Sheets Hub - WebDevHub" },
  "tools/image-base64": { render: renderImageBase64View, init: initImageBase64View, title: "Image to Base64 URI Converter - WebDevHub" },
  "tools/code-minifier": { render: renderCodeMinifierView, init: initCodeMinifierView, title: "Code Minifier & Beautifier - WebDevHub" },
  "tools/sql-formatter": { render: renderSqlFormatterView, init: initSqlFormatterView, title: "SQL Formatter & Schema Builder - WebDevHub" },
  "tools/curl-converter": { render: renderCurlConverterView, init: initCurlConverterView, title: "cURL to JS Fetch & Python Converter - WebDevHub" },
  "tools/hash-generator": { render: renderHashGeneratorView, init: initHashGeneratorView, title: "SHA-256 Hash & Checksum Generator - WebDevHub" },
  "tools/glassmorphism-animator": { render: renderGlassmorphismAnimatorView, init: initGlassmorphismAnimatorView, title: "Glassmorphism & Keyframe Generator - WebDevHub" },
  "tools/ui-prompt-engine": { render: renderUiPromptEngineView, init: initUiPromptEngineView, title: "AI UI Prompt to Component Engine - WebDevHub" },
  "tools/zip-debugger": { render: renderZipDebuggerView, init: initZipDebuggerView, title: "ZIP Project Architecture Inspector - WebDevHub" },
  "tools/ai-design-suggester": { render: renderAiDesignSuggesterView, init: initAiDesignSuggesterView, title: "AI Code to Responsive & Unique Design Suggester - WebDevHub" },
  "tools/responsive-converter": { render: renderResponsiveConverterView, init: initResponsiveConverterView, title: "Responsive Code Converter & Mobile Transformer - WebDevHub" },
  "tools/cloud-vault": { render: renderCloudVaultView, init: initCloudVaultView, title: "Cloud Developer Snippet Vault - WebDevHub" },
  "tools/api-tester": { render: renderApiTesterView, init: initApiTesterView, title: "REST API Endpoint Tester - WebDevHub" },

  // Pages & Aliases
  "privacy-policy": { render: renderPrivacyPolicyView, init: initPrivacyPolicyView, title: "Privacy Policy - WebDevHub" },
  "privacy": { render: renderPrivacyPolicyView, init: initPrivacyPolicyView, title: "Privacy Policy - WebDevHub" },
  "about": { render: renderAboutView, init: initAboutView, title: "About Us - WebDevHub" },
  "about-us": { render: renderAboutView, init: initAboutView, title: "About Us - WebDevHub" },
  "contact": { render: renderContactView, init: initContactView, title: "Contact Us - WebDevHub" },
  "contact-us": { render: renderContactView, init: initContactView, title: "Contact Us - WebDevHub" },
  "terms": { render: renderPrivacyPolicyView, init: initPrivacyPolicyView, title: "Terms of Service - WebDevHub" },
  "security": { render: renderPrivacyPolicyView, init: initPrivacyPolicyView, title: "Security Architecture - WebDevHub" }
};

function normalizeRouteKey(hash) {
  if (!hash) return "";
  // Strip leading #, then leading / and trailing /
  let cleaned = hash.replace(/^#\/?/, "").replace(/\/+$/, "");
  return cleaned;
}

function router() {
  const rawHash = window.location.hash || "#/";
  const routeKey = normalizeRouteKey(rawHash);
  const container = document.getElementById("router-view-container");
  if (!container) return;

  const route = routes[routeKey] || routes[""];

  // Update Page Title
  document.title = route.title || "Web Developer Hub";

  // Update Active Link State in Sidebar and Header
  document.querySelectorAll("aside a, nav a").forEach(link => {
    const linkHref = link.getAttribute("href");
    const linkKey = normalizeRouteKey(linkHref);
    if (linkKey === routeKey || (routeKey === "" && linkKey === "home")) {
      link.classList.add("bg-indigo-600/20", "text-indigo-400", "font-bold");
      link.classList.remove("text-slate-300", "text-slate-400");
    } else {
      link.classList.remove("bg-indigo-600/20", "text-indigo-400", "font-bold");
      link.classList.add("text-slate-300");
    }
  });

  // Inject Template HTML
  container.innerHTML = route.render();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "instant" });

  // Initialize View Specific Event Handlers
  if (typeof route.init === "function") {
    try {
      route.init();
    } catch (err) {
      console.error("View initialization error:", err);
    }
  }

  // Close mobile sidebar if open
  const sidebar = document.getElementById("app-sidebar") || document.getElementById("main-sidebar");
  if (sidebar && !sidebar.classList.contains("hidden") && window.innerWidth < 1024) {
    sidebar.classList.add("hidden");
  }
}

// Mobile Sidebar Toggle Handlers
function setupSidebar() {
  const toggleBtn = document.getElementById("mobile-sidebar-toggle");
  const sidebar = document.getElementById("app-sidebar") || document.getElementById("main-sidebar");
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });
  }
}

// Global Custom Key / Quota Modal
function setupQuotaModal() {
  const modal = document.getElementById("quota-modal");
  const closeBtn = document.getElementById("quota-modal-close");
  const saveKeyBtn = document.getElementById("save-gemini-key-btn");
  const customKeyInput = document.getElementById("custom-gemini-key");
  const quotaStat = document.getElementById("modal-quota-stat");

  const openModal = () => {
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    if (quotaStat) quotaStat.textContent = `${getRemainingDailyQuota()} / 3 remaining today`;
    if (customKeyInput) customKeyInput.value = getCustomGeminiKey();
  };

  window.openCustomKeyModal = openModal;

  // Bind to all possible trigger buttons
  document.getElementById("quota-modal-btn")?.addEventListener("click", openModal);
  document.getElementById("header-quota-btn")?.addEventListener("click", openModal);
  document.getElementById("settings-key-btn")?.addEventListener("click", openModal);

  closeBtn?.addEventListener("click", () => {
    modal?.classList.add("hidden");
    modal?.classList.remove("flex");
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  });

  saveKeyBtn?.addEventListener("click", () => {
    const val = customKeyInput?.value?.trim() || "";
    setCustomGeminiKey(val);
    modal?.classList.add("hidden");
    modal?.classList.remove("flex");
    if (val) {
      showToast("Custom Gemini API Key saved locally!", "success");
    } else {
      showToast("Cleared custom API key (using default quota)", "info");
    }
  });
}

// Global Keyboard Shortcut (Cmd+K / Ctrl+K to jump to tool search)
function setupGlobalSearch() {
  const searchInput = document.getElementById("global-tool-search");
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (window.location.hash !== "#/" && window.location.hash !== "" && window.location.hash !== "#home") {
        window.location.hash = "#/";
      }
      setTimeout(() => {
        searchInput?.focus();
        searchInput?.select();
      }, 50);
    }
  });

  searchInput?.addEventListener("input", (e) => {
    if (window.location.hash !== "#/" && window.location.hash !== "" && window.location.hash !== "#home") {
      window.location.hash = "#/";
    }
    const homeSearch = document.getElementById("hero-tool-search") || document.getElementById("home-tool-search");
    if (homeSearch) {
      homeSearch.value = e.target.value;
      homeSearch.dispatchEvent(new Event("input"));
    }
  });
}

// Initialize Single Page Application Engine
window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", () => {
  setupSidebar();
  setupQuotaModal();
  setupGlobalSearch();
  updateHeaderQuotaDisplay();
  router();
});

// Run router immediately if DOM already loaded
if (document.readyState === "complete" || document.readyState === "interactive") {
  setupSidebar();
  setupQuotaModal();
  setupGlobalSearch();
  updateHeaderQuotaDisplay();
  router();
}
