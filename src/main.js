// NEXORA AI — SPA Router & Complete 74-Tool Hub Registry
// Handles hash routing, dynamic view rendering, modal handlers, auth state & monetization

import { showToast, getRemainingDailyQuota, getCustomGeminiKey, setCustomGeminiKey, updateHeaderQuotaDisplay } from "./utils.js";
import { getCurrentUser, subscribeToAuth, loginWithEmail, registerWithEmail, loginWithGoogle, logoutUser, loginWithSandbox, getFriendlyAuthErrorMessage } from "./auth.js";
import { getPlanLimits } from "./config/plans.js";

// Core Views
import { renderHomeView, initHomeView } from "./views/home.js";
import { renderJarvisAgentView, initJarvisAgentView } from "./views/tools/jarvisAgentView.js";

// Pages & Monetization
import { renderPricingView, initPricingView } from "./views/pages/pricing.js";
import { renderDashboardView, initDashboardView } from "./views/pages/dashboard.js";
import { renderProfileView, initProfileView } from "./views/pages/profile.js";
import { renderPrivacyPolicyView, initPrivacyPolicyView } from "./views/pages/privacyPolicy.js";
import { renderTermsOfServiceView, initTermsOfServiceView } from "./views/pages/termsOfService.js";
import { renderRefundPolicyView, initRefundPolicyView } from "./views/pages/refundPolicy.js";
import { renderAboutView, initAboutView } from "./views/pages/about.js";
import { renderContactView, initContactView } from "./views/pages/contact.js";
import { renderBillingSuccessView, initBillingSuccessView, renderBillingCancelView, initBillingCancelView } from "./views/pages/billingResult.js";
import { initAdUnits } from "./components/AdUnit.js";

// AI Tools Views
import { renderAiDesignSuggesterView, initAiDesignSuggesterView } from "./views/tools/aiDesignSuggester.js";
import { renderUiPromptEngineView, initUiPromptEngineView } from "./views/tools/uiPromptEngine.js";
import { renderResponsiveConverterView, initResponsiveConverterView } from "./views/tools/responsiveConverter.js";
import { renderFlexGridFixView, initFlexGridFixView } from "./views/tools/flexGridFix.js";
import { renderFixHtmlView, initFixHtmlView } from "./views/tools/fixHtml.js";
import { renderCleanCodeView, initCleanCodeView } from "./views/tools/cleanCode.js";
import { renderZipDebuggerView, initZipDebuggerView } from "./views/tools/zipDebugger.js";
import { renderCodeSignApproveView, initCodeSignApproveView } from "./views/tools/codeSignApprove.js";
import { renderFixGithubProjectView, initFixGithubProjectView } from "./views/tools/fixGithubProject.js";

// Web Tools Views
import { renderJsonSuiteView, initJsonSuiteView } from "./views/tools/jsonSuite.js";
import { renderHtmlSuiteView, initHtmlSuiteView } from "./views/tools/htmlSuite.js";
import { renderJwtSuiteView, initJwtSuiteView } from "./views/tools/jwtSuite.js";
import { renderRegexSuiteView, initRegexSuiteView } from "./views/tools/regexSuite.js";
import { renderUrlSuiteView, initUrlSuiteView } from "./views/tools/urlSuite.js";
import { renderBase64SuiteView, initBase64SuiteView } from "./views/tools/base64Suite.js";
import { renderCurlSuiteView, initCurlSuiteView } from "./views/tools/curlSuite.js";
import { renderApiTesterSuiteView, initApiTesterSuiteView } from "./views/tools/apiTesterSuite.js";
import { renderCodeDiffSuiteView, initCodeDiffSuiteView } from "./views/tools/codeDiffSuite.js";

// CSS Tools Suite
import { renderCssSuiteView, initCssSuiteView } from "./views/tools/cssSuite.js";

// Image & Media Tools Suite
import { renderImageSuiteView, initImageSuiteView } from "./views/tools/imageSuite.js";

// Security Tools Suite
import { renderSecuritySuiteView, initSecuritySuiteView } from "./views/tools/securitySuite.js";

// Developer Essentials Suite
import { renderDevSuiteView, initDevSuiteView } from "./views/tools/devSuite.js";

// Website & SEO Suite
import { renderWebsiteSuiteView, initWebsiteSuiteView } from "./views/tools/websiteSuite.js";

// Cheat Sheets Suite
import { renderCheatSheetsSuiteView, initCheatSheetsSuiteView } from "./views/tools/cheatSheetsSuite.js";

// Cloud Vault
import { renderCloudVaultView, initCloudVaultView } from "./views/tools/cloudVault.js";

const routes = {
  "": { render: renderHomeView, init: initHomeView, title: "NEXORA AI — Autonomous Intelligence Engine & 74 Developer Utilities" },
  "home": { render: renderHomeView, init: initHomeView, title: "NEXORA AI — Autonomous Intelligence Engine & 74 Developer Utilities" },
  "agent": { render: renderJarvisAgentView, init: initJarvisAgentView, title: "NEXORA AI — Autonomous Developer Agent" },
  "nexora": { render: renderJarvisAgentView, init: initJarvisAgentView, title: "NEXORA AI — Autonomous Developer Agent" },
  "jarvis": { render: renderJarvisAgentView, init: initJarvisAgentView, title: "NEXORA AI — Autonomous Developer Agent" },
  "tools/jarvis-agent": { render: renderJarvisAgentView, init: initJarvisAgentView, title: "NEXORA AI — Autonomous Developer Agent" },
  "tools/nexora-agent": { render: renderJarvisAgentView, init: initJarvisAgentView, title: "NEXORA AI — Autonomous Developer Agent" },
  
  // App Pages & Monetization
  "pricing": { render: renderPricingView, init: initPricingView, title: "Pricing & Plans — NEXORA AI" },
  "plans": { render: renderPricingView, init: initPricingView, title: "Pricing & Plans — NEXORA AI" },
  "dashboard": { render: renderDashboardView, init: initDashboardView, title: "NEXORA Dashboard — NEXORA AI" },
  "account": { render: renderProfileView, init: initProfileView, title: "Account Settings — NEXORA AI" },
  "profile": { render: renderProfileView, init: initProfileView, title: "Profile & Settings — NEXORA AI" },
  "billing/success": { render: renderBillingSuccessView, init: initBillingSuccessView, title: "Payment Successful — NEXORA AI" },
  "billing/cancel": { render: renderBillingCancelView, init: initBillingCancelView, title: "Payment Canceled — NEXORA AI" },
  "payment/success": { render: renderBillingSuccessView, init: initBillingSuccessView, title: "Payment Successful — NEXORA AI" },
  "payment/cancel": { render: renderBillingCancelView, init: initBillingCancelView, title: "Payment Canceled — NEXORA AI" },

  // 1-9: AI Tools
  "tools/fix-github-project": { render: renderFixGithubProjectView, init: initFixGithubProjectView, title: "Fix My GitHub Project — NEXORA AI" },
  "tools/fix-my-github-project": { render: renderFixGithubProjectView, init: initFixGithubProjectView, title: "Fix My GitHub Project — NEXORA AI" },
  "tools/github-repair": { render: renderFixGithubProjectView, init: initFixGithubProjectView, title: "Fix My GitHub Project — NEXORA AI" },
  "tools/github-project-repair": { render: renderFixGithubProjectView, init: initFixGithubProjectView, title: "Fix My GitHub Project — NEXORA AI" },
  "tools/ai-design-suggester": { render: renderAiDesignSuggesterView, init: initAiDesignSuggesterView, title: "Code to Design — NEXORA AI" },
  "tools/code-to-design": { render: renderAiDesignSuggesterView, init: initAiDesignSuggesterView, title: "Code to Design — NEXORA AI" },
  "tools/ui-prompt-engine": { render: renderUiPromptEngineView, init: initUiPromptEngineView, title: "Prompt to UI — NEXORA AI" },
  "tools/prompt-to-ui": { render: renderUiPromptEngineView, init: initUiPromptEngineView, title: "Prompt to UI — NEXORA AI" },
  "tools/responsive-converter": { render: renderResponsiveConverterView, init: initResponsiveConverterView, title: "Make Responsive — NEXORA AI" },
  "tools/make-responsive": { render: renderResponsiveConverterView, init: initResponsiveConverterView, title: "Make Responsive — NEXORA AI" },
  "tools/flex-grid-fix": { render: renderFlexGridFixView, init: initFlexGridFixView, title: "Flex & Grid Fix — NEXORA AI" },
  "tools/fix-html": { render: renderFixHtmlView, init: initFixHtmlView, title: "Fix HTML — NEXORA AI" },
  "tools/clean-code": { render: renderCleanCodeView, init: initCleanCodeView, title: "Clean My Code — NEXORA AI" },
  "tools/clean-my-code": { render: renderCleanCodeView, init: initCleanCodeView, title: "Clean My Code — NEXORA AI" },
  "tools/ai-code-refactor": { render: renderCleanCodeView, init: initCleanCodeView, title: "AI Code Refactor — NEXORA AI" },
  "tools/zip-debugger": { render: renderZipDebuggerView, init: initZipDebuggerView, title: "Check ZIP Project — NEXORA AI" },
  "tools/check-zip-project": { render: renderZipDebuggerView, init: initZipDebuggerView, title: "Check ZIP Project — NEXORA AI" },
  "tools/code-sign-approve": { render: renderCodeSignApproveView, init: initCodeSignApproveView, title: "Code Sign & Approve — NEXORA AI" },
  "tools/code-approval": { render: renderCodeSignApproveView, init: initCodeSignApproveView, title: "Code Sign & Approve — NEXORA AI" },
  "tools/sign-approve": { render: renderCodeSignApproveView, init: initCodeSignApproveView, title: "Code Sign & Approve — NEXORA AI" },

  // 8-13: JSON Tools
  "tools/json-formatter": { render: renderJsonSuiteView, init: initJsonSuiteView, title: "JSON Formatter & Tree — NEXORA AI" },
  "tools/json-validator": { render: renderJsonSuiteView, init: initJsonSuiteView, title: "JSON Validator — NEXORA AI" },
  "tools/json-minifier": { render: renderJsonSuiteView, init: initJsonSuiteView, title: "JSON Minifier — NEXORA AI" },
  "tools/json-viewer": { render: renderJsonSuiteView, init: initJsonSuiteView, title: "JSON Viewer — NEXORA AI" },
  "tools/json-to-csv": { render: renderJsonSuiteView, init: initJsonSuiteView, title: "JSON to CSV Converter — NEXORA AI" },
  "tools/csv-to-json": { render: renderJsonSuiteView, init: initJsonSuiteView, title: "CSV to JSON Converter — NEXORA AI" },

  // 14-18: HTML Tools
  "tools/html-formatter": { render: renderHtmlSuiteView, init: initHtmlSuiteView, title: "HTML Formatter — NEXORA AI" },
  "tools/html-minifier": { render: renderHtmlSuiteView, init: initHtmlSuiteView, title: "HTML Minifier — NEXORA AI" },
  "tools/html-checker": { render: renderHtmlSuiteView, init: initHtmlSuiteView, title: "HTML Checker — NEXORA AI" },
  "tools/html-to-markdown": { render: renderHtmlSuiteView, init: initHtmlSuiteView, title: "HTML to Markdown — NEXORA AI" },
  "tools/html-to-jsx": { render: renderHtmlSuiteView, init: initHtmlSuiteView, title: "HTML to JSX Converter — NEXORA AI" },
  "tools/html-markdown-jsx": { render: renderHtmlSuiteView, init: initHtmlSuiteView, title: "HTML to JSX / Markdown — NEXORA AI" },

  // 19-20: JWT Tools
  "tools/jwt-decoder": { render: renderJwtSuiteView, init: initJwtSuiteView, title: "JWT Decoder — NEXORA AI" },
  "tools/jwt-expiry": { render: renderJwtSuiteView, init: initJwtSuiteView, title: "JWT Expiry Inspector — NEXORA AI" },

  // 21: Regex Tools
  "tools/regex-tester": { render: renderRegexSuiteView, init: initRegexSuiteView, title: "Regex Tester — NEXORA AI" },

  // 22-24: URL Tools
  "tools/url-encoder": { render: renderUrlSuiteView, init: initUrlSuiteView, title: "URL Encoder — NEXORA AI" },
  "tools/url-decoder": { render: renderUrlSuiteView, init: initUrlSuiteView, title: "URL Decoder — NEXORA AI" },
  "tools/url-parser": { render: renderUrlSuiteView, init: initUrlSuiteView, title: "URL Parser — NEXORA AI" },

  // 25-26: Base64 Tools
  "tools/base64-encoder": { render: renderBase64SuiteView, init: initBase64SuiteView, title: "Base64 Encoder — NEXORA AI" },
  "tools/base64-decoder": { render: renderBase64SuiteView, init: initBase64SuiteView, title: "Base64 Decoder — NEXORA AI" },
  "tools/image-base64": { render: renderBase64SuiteView, init: initBase64SuiteView, title: "Image to Base64 — NEXORA AI" },

  // 27-29: cURL, API Tester, Code Diff
  "tools/curl-converter": { render: renderCurlSuiteView, init: initCurlSuiteView, title: "cURL Converter — NEXORA AI" },
  "tools/api-tester": { render: renderApiTesterSuiteView, init: initApiTesterSuiteView, title: "API Tester — NEXORA AI" },
  "tools/code-diff": { render: renderCodeDiffSuiteView, init: initCodeDiffSuiteView, title: "Code Diff & Comparator — NEXORA AI" },

  // 30-40: CSS Tools
  "tools/flexbox-builder": { render: renderCssSuiteView, init: initCssSuiteView, title: "Flexbox Builder — NEXORA AI" },
  "tools/flexbox-grid": { render: renderCssSuiteView, init: initCssSuiteView, title: "Flexbox & Grid Builder — NEXORA AI" },
  "tools/grid-builder": { render: renderCssSuiteView, init: initCssSuiteView, title: "CSS Grid Builder — NEXORA AI" },
  "tools/gradient-maker": { render: renderCssSuiteView, init: initCssSuiteView, title: "Gradient Maker — NEXORA AI" },
  "tools/gradient-palette": { render: renderCssSuiteView, init: initCssSuiteView, title: "CSS Gradient Maker — NEXORA AI" },
  "tools/color-picker": { render: renderCssSuiteView, init: initCssSuiteView, title: "Color Picker — NEXORA AI" },
  "tools/color-converter": { render: renderCssSuiteView, init: initCssSuiteView, title: "Color Converter — NEXORA AI" },
  "tools/shadow-maker": { render: renderCssSuiteView, init: initCssSuiteView, title: "Box Shadow Maker — NEXORA AI" },
  "tools/border-maker": { render: renderCssSuiteView, init: initCssSuiteView, title: "Border Maker — NEXORA AI" },
  "tools/css-clamp": { render: renderCssSuiteView, init: initCssSuiteView, title: "CSS Clamp Calculator — NEXORA AI" },
  "tools/px-to-rem": { render: renderCssSuiteView, init: initCssSuiteView, title: "PX to REM Converter — NEXORA AI" },
  "tools/keyframe-maker": { render: renderCssSuiteView, init: initCssSuiteView, title: "CSS Keyframe Maker — NEXORA AI" },
  "tools/glass-effect": { render: renderCssSuiteView, init: initCssSuiteView, title: "Glass Effect Maker — NEXORA AI" },
  "tools/glassmorphism-animator": { render: renderCssSuiteView, init: initCssSuiteView, title: "Glassmorphism Generator — NEXORA AI" },
  "tools/css-minifier": { render: renderCssSuiteView, init: initCssSuiteView, title: "CSS Minifier — NEXORA AI" },
  "tools/code-minifier": { render: renderCssSuiteView, init: initCssSuiteView, title: "CSS Minifier — NEXORA AI" },

  // 41-47: Image & Media Tools
  "tools/image-compress": { render: renderImageSuiteView, init: initImageSuiteView, title: "Image Compress — NEXORA AI" },
  "tools/image-resize": { render: renderImageSuiteView, init: initImageSuiteView, title: "Image Resize — NEXORA AI" },
  "tools/image-crop": { render: renderImageSuiteView, init: initImageSuiteView, title: "Image Crop — NEXORA AI" },
  "tools/convert-image": { render: renderImageSuiteView, init: initImageSuiteView, title: "Image Converter — NEXORA AI" },
  "tools/svg-optimizer": { render: renderImageSuiteView, init: initImageSuiteView, title: "SVG Optimizer — NEXORA AI" },
  "tools/svg-data-uri": { render: renderImageSuiteView, init: initImageSuiteView, title: "SVG Data URI — NEXORA AI" },
  "tools/favicon-maker": { render: renderImageSuiteView, init: initImageSuiteView, title: "Favicon Maker — NEXORA AI" },

  // 48-52: Security Tools
  "tools/hash-generator": { render: renderSecuritySuiteView, init: initSecuritySuiteView, title: "Hash Generator — NEXORA AI" },
  "tools/sha256-generator": { render: renderSecuritySuiteView, init: initSecuritySuiteView, title: "SHA-256 Generator — NEXORA AI" },
  "tools/sha512-generator": { render: renderSecuritySuiteView, init: initSecuritySuiteView, title: "SHA-512 Generator — NEXORA AI" },
  "tools/password-generator": { render: renderSecuritySuiteView, init: initSecuritySuiteView, title: "Password Generator — NEXORA AI" },
  "tools/uuid-generator": { render: renderSecuritySuiteView, init: initSecuritySuiteView, title: "UUID v4 Generator — NEXORA AI" },

  // 53-61: Developer Essentials
  "tools/timestamp-converter": { render: renderDevSuiteView, init: initDevSuiteView, title: "Unix Timestamp Converter — NEXORA AI" },
  "tools/base-converter": { render: renderDevSuiteView, init: initDevSuiteView, title: "Base Converter — NEXORA AI" },
  "tools/text-case": { render: renderDevSuiteView, init: initDevSuiteView, title: "Text Case Converter — NEXORA AI" },
  "tools/word-counter": { render: renderDevSuiteView, init: initDevSuiteView, title: "Word Counter — NEXORA AI" },
  "tools/lorem-ipsum": { render: renderDevSuiteView, init: initDevSuiteView, title: "Lorem Ipsum Generator — NEXORA AI" },
  "tools/sql-formatter": { render: renderDevSuiteView, init: initDevSuiteView, title: "SQL Formatter — NEXORA AI" },

  // 62-67: Website & SEO Tools
  "tools/seo-checker": { render: renderWebsiteSuiteView, init: initWebsiteSuiteView, title: "SEO Checker — NEXORA AI" },
  "tools/meta-tag-generator": { render: renderWebsiteSuiteView, init: initWebsiteSuiteView, title: "Meta Tag Generator — NEXORA AI" },
  "tools/open-graph": { render: renderWebsiteSuiteView, init: initWebsiteSuiteView, title: "Open Graph Generator — NEXORA AI" },
  "tools/twitter-card": { render: renderWebsiteSuiteView, init: initWebsiteSuiteView, title: "Twitter Card Maker — NEXORA AI" },
  "tools/robots-txt": { render: renderWebsiteSuiteView, init: initWebsiteSuiteView, title: "robots.txt Generator — NEXORA AI" },
  "tools/sitemap-generator": { render: renderWebsiteSuiteView, init: initWebsiteSuiteView, title: "Sitemap.xml Generator — NEXORA AI" },

  // 68-73: Cheat Sheets
  "tools/cheat-sheets": { render: renderCheatSheetsSuiteView, init: initCheatSheetsSuiteView, title: "Developer Cheat Sheets — NEXORA AI" },
  "tools/git-cheat-sheet": { render: renderCheatSheetsSuiteView, init: initCheatSheetsSuiteView, title: "Git Cheat Sheet — NEXORA AI" },
  "tools/docker-cheat-sheet": { render: renderCheatSheetsSuiteView, init: initCheatSheetsSuiteView, title: "Docker Cheat Sheet — NEXORA AI" },
  "tools/linux-cheat-sheet": { render: renderCheatSheetsSuiteView, init: initCheatSheetsSuiteView, title: "Linux Cheat Sheet — NEXORA AI" },

  // 74: Cloud Vault
  "tools/cloud-vault": { render: renderCloudVaultView, init: initCloudVaultView, title: "Cloud Snippet Vault — NEXORA AI" },

  // Pages & Aliases
  "privacy-policy": { render: renderPrivacyPolicyView, init: initPrivacyPolicyView, title: "Privacy Policy — NEXORA AI" },
  "privacy": { render: renderPrivacyPolicyView, init: initPrivacyPolicyView, title: "Privacy Policy — NEXORA AI" },
  "terms": { render: renderTermsOfServiceView, init: initTermsOfServiceView, title: "Terms of Service — NEXORA AI" },
  "terms-of-service": { render: renderTermsOfServiceView, init: initTermsOfServiceView, title: "Terms of Service — NEXORA AI" },
  "refund-policy": { render: renderRefundPolicyView, init: initRefundPolicyView, title: "Refund & Cancellation Policy — NEXORA AI" },
  "cancellation": { render: renderRefundPolicyView, init: initRefundPolicyView, title: "Refund & Cancellation Policy — NEXORA AI" },
  "refunds": { render: renderRefundPolicyView, init: initRefundPolicyView, title: "Refund & Cancellation Policy — NEXORA AI" },
  "about": { render: renderAboutView, init: initAboutView, title: "About Us — NEXORA AI" },
  "about-us": { render: renderAboutView, init: initAboutView, title: "About Us — NEXORA AI" },
  "contact": { render: renderContactView, init: initContactView, title: "Contact Us — NEXORA AI" },
  "contact-us": { render: renderContactView, init: initContactView, title: "Contact Us — NEXORA AI" },
  "security": { render: renderPrivacyPolicyView, init: initPrivacyPolicyView, title: "Security Architecture — NEXORA AI" }
};

function normalizeRouteKey(hash) {
  if (!hash) return "";
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
  document.title = route.title || "NEXORA AI — Autonomous Intelligence Engine";

  // Update Active Link State in Sidebar and Header
  document.querySelectorAll("aside a, nav a").forEach((link) => {
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

  // Initialize Google AdSense units for Free visitors (or suppress for Pro/Team)
  try {
    initAdUnits();
  } catch (adErr) {
    console.warn("AdUnit initialization notice:", adErr);
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

// Pro Upgrade Modal Handler
function setupProUpgradeModal() {
  const modal = document.getElementById("pro-upgrade-modal");
  const closeBtn = document.getElementById("pro-modal-close");
  const featureLabel = document.getElementById("pro-modal-feature-name");

  window.openProUpgradeModal = (featureName = "Developer Pro Feature") => {
    if (!modal) {
      window.location.hash = "#/pricing";
      return;
    }
    if (featureLabel) featureLabel.textContent = featureName;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  };

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
}

// Auth Modal Handler
function setupAuthModal() {
  const modal = document.getElementById("auth-modal");
  const closeBtn = document.getElementById("auth-modal-close");
  const tabLogin = document.getElementById("auth-tab-login");
  const tabRegister = document.getElementById("auth-tab-register");
  const submitBtn = document.getElementById("auth-submit-btn");
  const googleBtn = document.getElementById("auth-google-btn");
  const emailInput = document.getElementById("auth-email-input");
  const passInput = document.getElementById("auth-pass-input");
  const nameInput = document.getElementById("auth-name-input");
  const nameGroup = document.getElementById("auth-name-group");
  const alertBox = document.getElementById("auth-alert-box");
  const alertTitle = document.getElementById("auth-alert-title");
  const alertDesc = document.getElementById("auth-alert-desc");
  const currentDomainEl = document.getElementById("auth-current-domain");
  const copyDomainBtn = document.getElementById("auth-copy-domain-btn");
  const demoFreeBtn = document.getElementById("auth-demo-free-btn");
  const demoProBtn = document.getElementById("auth-demo-pro-btn");

  let isRegisterMode = false;

  if (currentDomainEl) {
    currentDomainEl.textContent = window.location.hostname || "localhost";
  }

  copyDomainBtn?.addEventListener("click", () => {
    const domain = window.location.hostname || "localhost";
    navigator.clipboard.writeText(domain).then(() => {
      showToast(`Copied '${domain}'! Add it to Firebase Console -> Authentication -> Settings -> Authorized domains`, "success");
    }).catch(() => {
      showToast(`Domain: ${domain}`, "info");
    });
  });

  demoFreeBtn?.addEventListener("click", () => {
    loginWithSandbox("free", {
      displayName: "Ada Lovelace",
      email: "developer@example.com",
    });
    modal?.classList.add("hidden");
    modal?.classList.remove("flex");
    updateHeaderAuthUI();
  });

  demoProBtn?.addEventListener("click", () => {
    loginWithSandbox("pro", {
      displayName: "Alan Turing",
      email: "pro-developer@example.com",
    });
    modal?.classList.add("hidden");
    modal?.classList.remove("flex");
    updateHeaderAuthUI();
  });

  const openAuth = () => {
    if (!modal) return;
    if (currentDomainEl) {
      currentDomainEl.textContent = window.location.hostname || "localhost";
    }
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  };

  window.openAuthModal = openAuth;

  document.getElementById("header-auth-btn")?.addEventListener("click", () => {
    const user = getCurrentUser();
    if (user) {
      window.location.hash = "#/dashboard";
    } else {
      openAuth();
    }
  });

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

  tabLogin?.addEventListener("click", () => {
    isRegisterMode = false;
    tabLogin.classList.add("bg-indigo-600", "text-white");
    tabLogin.classList.remove("bg-slate-800", "text-slate-400");
    tabRegister?.classList.remove("bg-indigo-600", "text-white");
    tabRegister?.classList.add("bg-slate-800", "text-slate-400");
    nameGroup?.classList.add("hidden");
    if (submitBtn) submitBtn.textContent = "Sign In";
  });

  tabRegister?.addEventListener("click", () => {
    isRegisterMode = true;
    tabRegister.classList.add("bg-indigo-600", "text-white");
    tabRegister.classList.remove("bg-slate-800", "text-slate-400");
    tabLogin?.classList.remove("bg-indigo-600", "text-white");
    tabLogin?.classList.add("bg-slate-800", "text-slate-400");
    nameGroup?.classList.remove("hidden");
    if (submitBtn) submitBtn.textContent = "Create Account";
  });

  submitBtn?.addEventListener("click", async () => {
    const email = emailInput?.value?.trim() || "";
    const pass = passInput?.value?.trim() || "";
    const name = nameInput?.value?.trim() || "";

    if (!email || !pass) return showToast("Please enter email and password.", "warning");

    try {
      if (isRegisterMode) {
        await registerWithEmail(email, pass, name);
      } else {
        await loginWithEmail(email, pass);
      }
      alertBox?.classList.add("hidden");
      modal?.classList.add("hidden");
      modal?.classList.remove("flex");
      updateHeaderAuthUI();
    } catch (err) {
      const isDomainOrMethodIssue = err.message?.includes("Domain Unauthorized") || 
                                    err.message?.includes("Sign-In Method Disabled") ||
                                    err.message?.includes("unauthorized-domain") ||
                                    err.message?.includes("operation-not-allowed");

      if (isDomainOrMethodIssue) {
        if (alertBox) {
          alertBox.classList.remove("hidden");
          if (alertTitle) alertTitle.textContent = "Firebase Configuration / Domain Notice";
          if (alertDesc) alertDesc.textContent = `${err.message} You can also click '⚡ Free Developer' below to sign in instantly in sandbox mode.`;
        }
        // Graceful sandbox fallback for developer testing
        showToast(err.message, "warning");
      } else {
        showToast(err.message, "error");
      }
    }
  });

  googleBtn?.addEventListener("click", async () => {
    try {
      await loginWithGoogle();
      alertBox?.classList.add("hidden");
      modal?.classList.add("hidden");
      modal?.classList.remove("flex");
      updateHeaderAuthUI();
    } catch (err) {
      const isDomainOrPopupIssue = err.message?.includes("Domain Unauthorized") || 
                                   err.message?.includes("Popup Blocked") ||
                                   err.message?.includes("unauthorized-domain") ||
                                   err.message?.includes("popup-blocked");

      if (isDomainOrPopupIssue && alertBox) {
        alertBox.classList.remove("hidden");
        if (alertTitle) alertTitle.textContent = "Firebase Domain Authorization Required";
        if (alertDesc) alertDesc.textContent = `${err.message} Copy this domain into Firebase Console > Authentication > Settings > Authorized domains, or use the 1-click Instant Demo Sign-In below.`;
      }
      showToast(err.message, "error");
    }
  });
}

function updateHeaderAuthUI() {
  const user = getCurrentUser();
  const authBtn = document.getElementById("header-auth-btn");
  const authText = document.getElementById("header-auth-text");
  const userAvatar = document.getElementById("header-user-avatar");

  if (!authBtn) return;

  if (user) {
    if (authText) authText.textContent = user.displayName || user.email?.split("@")[0] || "Account";
    if (userAvatar) {
      userAvatar.textContent = (user.displayName || user.email || "D").charAt(0).toUpperCase();
      userAvatar.classList.remove("hidden");
    }
    authBtn.classList.add("border-indigo-500/40");
  } else {
    if (authText) authText.textContent = "Sign In";
    if (userAvatar) userAvatar.classList.add("hidden");
    authBtn.classList.remove("border-indigo-500/40");
  }
}

// Global Keyboard Shortcut (Cmd+K / Ctrl+K)
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

// Cookie & Privacy Compliance Banner
function setupCookieConsent() {
  const CONSENT_KEY = "webdevhub_cookie_consent_v1";
  if (localStorage.getItem(CONSENT_KEY)) return;

  const banner = document.createElement("div");
  banner.id = "cookie-consent-banner";
  banner.className = "fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl animate-fadeIn flex flex-col gap-3 text-xs text-slate-300";
  banner.innerHTML = `
    <div class="flex items-start justify-between gap-2">
      <div class="flex items-center gap-2">
        <span class="text-base">🍪</span>
        <span class="font-bold text-white tracking-tight">Privacy &amp; Cookie Preferences</span>
      </div>
      <button id="cookie-close-btn" class="text-slate-500 hover:text-white">&times;</button>
    </div>
    <p class="text-[11px] text-slate-400 leading-relaxed">
      We use strictly necessary cookies for authentication and performance. Free tier is supported by privacy-respecting developer advertising. Read our <a href="#/privacy" class="text-indigo-400 hover:underline">Privacy Policy</a> and <a href="#/terms" class="text-indigo-400 hover:underline">Terms</a>.
    </p>
    <div class="flex items-center justify-end gap-2 pt-1 border-t border-slate-800">
      <a href="#/privacy" class="px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-400 hover:text-white">Learn More</a>
      <button id="cookie-accept-btn" class="px-4 py-1.5 rounded-xl text-[11px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm">Got It</button>
    </div>
  `;

  document.body.appendChild(banner);

  const dismiss = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    banner.remove();
  };

  document.getElementById("cookie-accept-btn")?.addEventListener("click", dismiss);
  document.getElementById("cookie-close-btn")?.addEventListener("click", dismiss);
}

// Initialize Single Page Application Engine
function initApp() {
  setupSidebar();
  setupQuotaModal();
  setupProUpgradeModal();
  setupAuthModal();
  setupGlobalSearch();
  setupCookieConsent();
  updateHeaderQuotaDisplay();
  updateHeaderAuthUI();

  subscribeToAuth((user) => {
    updateHeaderAuthUI();
    updateHeaderQuotaDisplay();
    try {
      initAdUnits();
    } catch (e) {}
  });

  router();
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", initApp);

if (document.readyState === "complete" || document.readyState === "interactive") {
  initApp();
}
