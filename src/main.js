// Web Developer Hub — SPA Router & Complete 74-Tool Hub Registry
// Handles hash routing, dynamic view rendering, modal handlers, auth state & monetization

import { showToast, getRemainingDailyQuota, getCustomGeminiKey, setCustomGeminiKey, updateHeaderQuotaDisplay } from "./utils.js";
import { getCurrentUser, subscribeToAuth, loginWithEmail, registerWithEmail, loginWithGoogle, logoutUser } from "./auth.js";
import { getPlanLimits } from "./config/plans.js";

// Core Views
import { renderHomeView, initHomeView } from "./views/home.js";

// Pages & Monetization
import { renderPricingView, initPricingView } from "./views/pages/pricing.js";
import { renderDashboardView, initDashboardView } from "./views/pages/dashboard.js";
import { renderProfileView, initProfileView } from "./views/pages/profile.js";
import { renderPrivacyPolicyView, initPrivacyPolicyView } from "./views/pages/privacyPolicy.js";
import { renderAboutView, initAboutView } from "./views/pages/about.js";
import { renderContactView, initContactView } from "./views/pages/contact.js";

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
  "": { render: renderHomeView, init: initHomeView, title: "Web Developer Hub - AI Developer Tools & 74 Developer Utilities" },
  "home": { render: renderHomeView, init: initHomeView, title: "Web Developer Hub - AI Developer Tools & 74 Developer Utilities" },
  
  // App Pages & Monetization
  "pricing": { render: renderPricingView, init: initPricingView, title: "Pricing & Developer Plans - WebDevHub" },
  "plans": { render: renderPricingView, init: initPricingView, title: "Pricing & Developer Plans - WebDevHub" },
  "dashboard": { render: renderDashboardView, init: initDashboardView, title: "Developer Dashboard - WebDevHub" },
  "account": { render: renderProfileView, init: initProfileView, title: "Account Settings - WebDevHub" },
  "profile": { render: renderProfileView, init: initProfileView, title: "Profile & Settings - WebDevHub" },

  // 1-9: AI Tools
  "tools/fix-github-project": { render: renderFixGithubProjectView, init: initFixGithubProjectView, title: "Fix My GitHub Project - Automated Project Repair Engine - WebDevHub" },
  "tools/fix-my-github-project": { render: renderFixGithubProjectView, init: initFixGithubProjectView, title: "Fix My GitHub Project - WebDevHub" },
  "tools/github-repair": { render: renderFixGithubProjectView, init: initFixGithubProjectView, title: "Fix My GitHub Project - WebDevHub" },
  "tools/github-project-repair": { render: renderFixGithubProjectView, init: initFixGithubProjectView, title: "Fix My GitHub Project - WebDevHub" },
  "tools/ai-design-suggester": { render: renderAiDesignSuggesterView, init: initAiDesignSuggesterView, title: "Code to Design - AI Design Suggester - WebDevHub" },
  "tools/code-to-design": { render: renderAiDesignSuggesterView, init: initAiDesignSuggesterView, title: "Code to Design - WebDevHub" },
  "tools/ui-prompt-engine": { render: renderUiPromptEngineView, init: initUiPromptEngineView, title: "Prompt to UI - AI UI Generator - WebDevHub" },
  "tools/prompt-to-ui": { render: renderUiPromptEngineView, init: initUiPromptEngineView, title: "Prompt to UI - WebDevHub" },
  "tools/responsive-converter": { render: renderResponsiveConverterView, init: initResponsiveConverterView, title: "Make Responsive - Mobile Transformer - WebDevHub" },
  "tools/make-responsive": { render: renderResponsiveConverterView, init: initResponsiveConverterView, title: "Make Responsive - WebDevHub" },
  "tools/flex-grid-fix": { render: renderFlexGridFixView, init: initFlexGridFixView, title: "Flex & Grid Fix - AI CSS Layout Fixer - WebDevHub" },
  "tools/fix-html": { render: renderFixHtmlView, init: initFixHtmlView, title: "Fix HTML - AI DOM Cleaner - WebDevHub" },
  "tools/clean-code": { render: renderCleanCodeView, init: initCleanCodeView, title: "Clean My Code - Quality & Refactoring - WebDevHub" },
  "tools/clean-my-code": { render: renderCleanCodeView, init: initCleanCodeView, title: "Clean My Code - WebDevHub" },
  "tools/ai-code-refactor": { render: renderCleanCodeView, init: initCleanCodeView, title: "AI Code Refactor - WebDevHub" },
  "tools/zip-debugger": { render: renderZipDebuggerView, init: initZipDebuggerView, title: "Check ZIP Project - Architecture Scanner - WebDevHub" },
  "tools/check-zip-project": { render: renderZipDebuggerView, init: initZipDebuggerView, title: "Check ZIP Project - WebDevHub" },
  "tools/code-sign-approve": { render: renderCodeSignApproveView, init: initCodeSignApproveView, title: "Code Sign & Approve - AI Authorization & Cryptographic Gatekeeper - WebDevHub" },
  "tools/code-approval": { render: renderCodeSignApproveView, init: initCodeSignApproveView, title: "Code Sign & Approve - WebDevHub" },
  "tools/sign-approve": { render: renderCodeSignApproveView, init: initCodeSignApproveView, title: "Code Sign & Approve - WebDevHub" },

  // 8-13: JSON Tools
  "tools/json-formatter": { render: renderJsonSuiteView, init: initJsonSuiteView, title: "JSON Formatter & Tree - WebDevHub" },
  "tools/json-validator": { render: renderJsonSuiteView, init: initJsonSuiteView, title: "JSON Validator - WebDevHub" },
  "tools/json-minifier": { render: renderJsonSuiteView, init: initJsonSuiteView, title: "JSON Minifier - WebDevHub" },
  "tools/json-viewer": { render: renderJsonSuiteView, init: initJsonSuiteView, title: "JSON Viewer - WebDevHub" },
  "tools/json-to-csv": { render: renderJsonSuiteView, init: initJsonSuiteView, title: "JSON to CSV Converter - WebDevHub" },
  "tools/csv-to-json": { render: renderJsonSuiteView, init: initJsonSuiteView, title: "CSV to JSON Converter - WebDevHub" },

  // 14-18: HTML Tools
  "tools/html-formatter": { render: renderHtmlSuiteView, init: initHtmlSuiteView, title: "HTML Formatter - WebDevHub" },
  "tools/html-minifier": { render: renderHtmlSuiteView, init: initHtmlSuiteView, title: "HTML Minifier - WebDevHub" },
  "tools/html-checker": { render: renderHtmlSuiteView, init: initHtmlSuiteView, title: "HTML Checker - WebDevHub" },
  "tools/html-to-markdown": { render: renderHtmlSuiteView, init: initHtmlSuiteView, title: "HTML to Markdown - WebDevHub" },
  "tools/html-to-jsx": { render: renderHtmlSuiteView, init: initHtmlSuiteView, title: "HTML to JSX Converter - WebDevHub" },
  "tools/html-markdown-jsx": { render: renderHtmlSuiteView, init: initHtmlSuiteView, title: "HTML to JSX / Markdown - WebDevHub" },

  // 19-20: JWT Tools
  "tools/jwt-decoder": { render: renderJwtSuiteView, init: initJwtSuiteView, title: "JWT Decoder - WebDevHub" },
  "tools/jwt-expiry": { render: renderJwtSuiteView, init: initJwtSuiteView, title: "JWT Expiry Inspector - WebDevHub" },

  // 21: Regex Tools
  "tools/regex-tester": { render: renderRegexSuiteView, init: initRegexSuiteView, title: "Regex Tester - WebDevHub" },

  // 22-24: URL Tools
  "tools/url-encoder": { render: renderUrlSuiteView, init: initUrlSuiteView, title: "URL Encoder - WebDevHub" },
  "tools/url-decoder": { render: renderUrlSuiteView, init: initUrlSuiteView, title: "URL Decoder - WebDevHub" },
  "tools/url-parser": { render: renderUrlSuiteView, init: initUrlSuiteView, title: "URL Parser - WebDevHub" },

  // 25-26: Base64 Tools
  "tools/base64-encoder": { render: renderBase64SuiteView, init: initBase64SuiteView, title: "Base64 Encoder - WebDevHub" },
  "tools/base64-decoder": { render: renderBase64SuiteView, init: initBase64SuiteView, title: "Base64 Decoder - WebDevHub" },
  "tools/image-base64": { render: renderBase64SuiteView, init: initBase64SuiteView, title: "Image to Base64 - WebDevHub" },

  // 27-29: cURL, API Tester, Code Diff
  "tools/curl-converter": { render: renderCurlSuiteView, init: initCurlSuiteView, title: "cURL Converter - WebDevHub" },
  "tools/api-tester": { render: renderApiTesterSuiteView, init: initApiTesterSuiteView, title: "API Tester - WebDevHub" },
  "tools/code-diff": { render: renderCodeDiffSuiteView, init: initCodeDiffSuiteView, title: "Code Diff & Comparator - WebDevHub" },

  // 30-40: CSS Tools
  "tools/flexbox-builder": { render: renderCssSuiteView, init: initCssSuiteView, title: "Flexbox Builder - WebDevHub" },
  "tools/flexbox-grid": { render: renderCssSuiteView, init: initCssSuiteView, title: "Flexbox & Grid Builder - WebDevHub" },
  "tools/grid-builder": { render: renderCssSuiteView, init: initCssSuiteView, title: "CSS Grid Builder - WebDevHub" },
  "tools/gradient-maker": { render: renderCssSuiteView, init: initCssSuiteView, title: "Gradient Maker - WebDevHub" },
  "tools/gradient-palette": { render: renderCssSuiteView, init: initCssSuiteView, title: "CSS Gradient Maker - WebDevHub" },
  "tools/color-picker": { render: renderCssSuiteView, init: initCssSuiteView, title: "Color Picker - WebDevHub" },
  "tools/color-converter": { render: renderCssSuiteView, init: initCssSuiteView, title: "Color Converter - WebDevHub" },
  "tools/shadow-maker": { render: renderCssSuiteView, init: initCssSuiteView, title: "Box Shadow Maker - WebDevHub" },
  "tools/border-maker": { render: renderCssSuiteView, init: initCssSuiteView, title: "Border Maker - WebDevHub" },
  "tools/css-clamp": { render: renderCssSuiteView, init: initCssSuiteView, title: "CSS Clamp Calculator - WebDevHub" },
  "tools/px-to-rem": { render: renderCssSuiteView, init: initCssSuiteView, title: "PX to REM Converter - WebDevHub" },
  "tools/keyframe-maker": { render: renderCssSuiteView, init: initCssSuiteView, title: "CSS Keyframe Maker - WebDevHub" },
  "tools/glass-effect": { render: renderCssSuiteView, init: initCssSuiteView, title: "Glass Effect Maker - WebDevHub" },
  "tools/glassmorphism-animator": { render: renderCssSuiteView, init: initCssSuiteView, title: "Glassmorphism Generator - WebDevHub" },
  "tools/css-minifier": { render: renderCssSuiteView, init: initCssSuiteView, title: "CSS Minifier - WebDevHub" },
  "tools/code-minifier": { render: renderCssSuiteView, init: initCssSuiteView, title: "CSS Minifier - WebDevHub" },

  // 41-47: Image & Media Tools
  "tools/image-compress": { render: renderImageSuiteView, init: initImageSuiteView, title: "Image Compress - WebDevHub" },
  "tools/image-resize": { render: renderImageSuiteView, init: initImageSuiteView, title: "Image Resize - WebDevHub" },
  "tools/image-crop": { render: renderImageSuiteView, init: initImageSuiteView, title: "Image Crop - WebDevHub" },
  "tools/convert-image": { render: renderImageSuiteView, init: initImageSuiteView, title: "Image Converter - WebDevHub" },
  "tools/svg-optimizer": { render: renderImageSuiteView, init: initImageSuiteView, title: "SVG Optimizer - WebDevHub" },
  "tools/svg-data-uri": { render: renderImageSuiteView, init: initImageSuiteView, title: "SVG Data URI - WebDevHub" },
  "tools/favicon-maker": { render: renderImageSuiteView, init: initImageSuiteView, title: "Favicon Maker - WebDevHub" },

  // 48-52: Security Tools
  "tools/hash-generator": { render: renderSecuritySuiteView, init: initSecuritySuiteView, title: "Hash Generator - WebDevHub" },
  "tools/sha256-generator": { render: renderSecuritySuiteView, init: initSecuritySuiteView, title: "SHA-256 Generator - WebDevHub" },
  "tools/sha512-generator": { render: renderSecuritySuiteView, init: initSecuritySuiteView, title: "SHA-512 Generator - WebDevHub" },
  "tools/password-generator": { render: renderSecuritySuiteView, init: initSecuritySuiteView, title: "Password Generator - WebDevHub" },
  "tools/uuid-generator": { render: renderSecuritySuiteView, init: initSecuritySuiteView, title: "UUID v4 Generator - WebDevHub" },

  // 53-61: Developer Essentials
  "tools/timestamp-converter": { render: renderDevSuiteView, init: initDevSuiteView, title: "Unix Timestamp Converter - WebDevHub" },
  "tools/base-converter": { render: renderDevSuiteView, init: initDevSuiteView, title: "Base Converter - WebDevHub" },
  "tools/text-case": { render: renderDevSuiteView, init: initDevSuiteView, title: "Text Case Converter - WebDevHub" },
  "tools/word-counter": { render: renderDevSuiteView, init: initDevSuiteView, title: "Word Counter - WebDevHub" },
  "tools/lorem-ipsum": { render: renderDevSuiteView, init: initDevSuiteView, title: "Lorem Ipsum Generator - WebDevHub" },
  "tools/sql-formatter": { render: renderDevSuiteView, init: initDevSuiteView, title: "SQL Formatter - WebDevHub" },

  // 62-67: Website & SEO Tools
  "tools/seo-checker": { render: renderWebsiteSuiteView, init: initWebsiteSuiteView, title: "SEO Checker - WebDevHub" },
  "tools/meta-tag-generator": { render: renderWebsiteSuiteView, init: initWebsiteSuiteView, title: "Meta Tag Generator - WebDevHub" },
  "tools/open-graph": { render: renderWebsiteSuiteView, init: initWebsiteSuiteView, title: "Open Graph Generator - WebDevHub" },
  "tools/twitter-card": { render: renderWebsiteSuiteView, init: initWebsiteSuiteView, title: "Twitter Card Maker - WebDevHub" },
  "tools/robots-txt": { render: renderWebsiteSuiteView, init: initWebsiteSuiteView, title: "robots.txt Generator - WebDevHub" },
  "tools/sitemap-generator": { render: renderWebsiteSuiteView, init: initWebsiteSuiteView, title: "Sitemap.xml Generator - WebDevHub" },

  // 68-73: Cheat Sheets
  "tools/cheat-sheets": { render: renderCheatSheetsSuiteView, init: initCheatSheetsSuiteView, title: "Developer Cheat Sheets - WebDevHub" },
  "tools/git-cheat-sheet": { render: renderCheatSheetsSuiteView, init: initCheatSheetsSuiteView, title: "Git Cheat Sheet - WebDevHub" },
  "tools/docker-cheat-sheet": { render: renderCheatSheetsSuiteView, init: initCheatSheetsSuiteView, title: "Docker Cheat Sheet - WebDevHub" },
  "tools/linux-cheat-sheet": { render: renderCheatSheetsSuiteView, init: initCheatSheetsSuiteView, title: "Linux Cheat Sheet - WebDevHub" },

  // 74: Cloud Vault
  "tools/cloud-vault": { render: renderCloudVaultView, init: initCloudVaultView, title: "Cloud Snippet Vault - WebDevHub" },

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

  let isRegisterMode = false;

  const openAuth = () => {
    if (!modal) return;
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
      modal?.classList.add("hidden");
      modal?.classList.remove("flex");
      updateHeaderAuthUI();
    } catch (err) {
      showToast(err.message, "error");
    }
  });

  googleBtn?.addEventListener("click", async () => {
    try {
      await loginWithGoogle();
      modal?.classList.add("hidden");
      modal?.classList.remove("flex");
      updateHeaderAuthUI();
    } catch (err) {
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

// Initialize Single Page Application Engine
function initApp() {
  setupSidebar();
  setupQuotaModal();
  setupProUpgradeModal();
  setupAuthModal();
  setupGlobalSearch();
  updateHeaderQuotaDisplay();
  updateHeaderAuthUI();

  subscribeToAuth((user) => {
    updateHeaderAuthUI();
    updateHeaderQuotaDisplay();
  });

  router();
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", initApp);

if (document.readyState === "complete" || document.readyState === "interactive") {
  initApp();
}
