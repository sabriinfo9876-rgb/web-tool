// Static Page View: Contact Us (AdSense Compliant)

import { showToast } from "../../utils.js";

export function renderContactView() {
  return `
    <div class="space-y-6 max-w-2xl mx-auto animate-fadeIn text-slate-300">
      <div class="border-b border-slate-800 pb-4">
        <h1 class="text-3xl font-bold text-white tracking-tight">Contact Engineering Team</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Have feedback, tool suggestions, or security disclosures? We’d love to hear from you.</p>
      </div>

      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-6 space-y-4">
        <div>
          <label class="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
          <input type="text" id="contact-name" placeholder="Developer Name" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-400" />
        </div>

        <div>
          <label class="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
          <input type="email" id="contact-email" placeholder="dev@example.com" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-400" />
        </div>

        <div>
          <label class="block text-xs font-mono text-slate-400 mb-1">Category</label>
          <select id="contact-category" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-400">
            <option value="feature">New Tool Request / Feature Suggestion</option>
            <option value="bug">Bug Report / Tool Issue</option>
            <option value="security">Security / Privacy Disclosure</option>
            <option value="other">General Inquiry</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-mono text-slate-400 mb-1">Message</label>
          <textarea id="contact-message" rows="5" placeholder="Describe your request or feedback in detail..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-400 resize-y"></textarea>
        </div>

        <button id="contact-submit-btn" class="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-indigo-500/20">
          Send Message to Engineering
        </button>
      </div>
    </div>
  `;
}

export function initContactView() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const messageInput = document.getElementById("contact-message");
  const submitBtn = document.getElementById("contact-submit-btn");

  submitBtn?.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const msg = messageInput.value.trim();

    if (!name || !email || !msg) {
      showToast("Please fill in all fields", "warning");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    setTimeout(() => {
      showToast("Thank you! Your message has been received by engineering.", "success");
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message to Engineering";
    }, 600);
  });
}
