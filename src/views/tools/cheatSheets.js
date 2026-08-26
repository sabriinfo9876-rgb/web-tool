// Tool View: Searchable Developer Cheat Sheet Hub for Git, Linux Bash, HTTP Status & CSS with SEO Guide

import { copyToClipboard, showToast } from "../../utils.js";

export function renderCheatSheetsView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Developer Quick Reference &amp; Cheat Sheet Hub</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">HANDBOOK</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Instant searchable cheatsheets for Git workflows, Linux terminal commands, HTTP status codes, and CSS selectors.</p>
        </div>
        <div class="relative w-full sm:w-64">
          <input type="text" id="cheat-search" placeholder="Search commands (e.g. rebase, grep, 404)..." class="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 font-mono" />
          <svg class="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex gap-2 flex-wrap" id="cheat-category-tabs">
        <button data-group="all" class="cheat-tab-btn px-3 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold transition">All Sheets</button>
        <button data-group="git" class="cheat-tab-btn px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-semibold transition">Git Terminal</button>
        <button data-group="linux" class="cheat-tab-btn px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-semibold transition">Linux &amp; Bash</button>
        <button data-group="http" class="cheat-tab-btn px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-semibold transition">HTTP Status Codes</button>
        <button data-group="css" class="cheat-tab-btn px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-semibold transition">CSS Selectors</button>
      </div>

      <!-- Searchable Reference Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="cheat-cards-grid">
        ${getCheatCardsHtml()}
      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Essential Developer Workflows &amp; CLI Command Architecture</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            High-velocity software engineering requires instant recall of version control directives, POSIX Unix utilities, network status conventions, and modern stylesheet specificity rules.
          </p>
          <p>
            <strong>Git Architecture</strong> relies on directed acyclic graph (DAG) commit trees. Commands like <code>git rebase -i</code>, <code>git cherry-pick</code>, and <code>git stash pop</code> allow non-destructive branch manipulation and clean PR squashing.
          </p>
          <p>
            <strong>POSIX Unix Shells</strong> (Bash, Zsh) process text streams via standard I/O pipes (<code>|</code>), allowing developers to chain <code>grep</code>, <code>sed</code>, <code>awk</code>, and <code>curl</code> for automated log triage and container maintenance.
          </p>
        </div>
      </section>
    </div>
  `;
}

function getCheatCardsHtml() {
  const cards = [
    // Git
    { group: "git", title: "Git Undo Last Commit (Keep Files)", cmd: "git reset --soft HEAD~1", desc: "Undoes the last commit while preserving all modified changes staged in your workspace." },
    { group: "git", title: "Git Interactive Rebase", cmd: "git rebase -i HEAD~3", desc: "Opens interactive menu to squash, reword, edit, or drop the last 3 commits." },
    { group: "git", title: "Git Stash with Message", cmd: "git stash push -m 'wip-feature'", desc: "Saves uncommitted working directory changes with a recognizable label." },
    { group: "git", title: "Git Force Pull Overwrite", cmd: "git fetch origin && git reset --hard origin/main", desc: "Discards all local unsaved work and synchronizes strictly with remote main." },
    { group: "git", title: "Git Cherry Pick", cmd: "git cherry-pick <commit-hash>", desc: "Applies the exact diff from a specific commit hash onto your current active branch." },

    // Linux
    { group: "linux", title: "Find & Grep Across Files", cmd: "grep -rnwi './src' -e 'apiKey'", desc: "Recursively searches directories for case-insensitive matching string with line numbers." },
    { group: "linux", title: "Kill Process on Port 3000", cmd: "lsof -i :3000 -t | xargs kill -9", desc: "Finds process ID binding to port 3000 and forcefully terminates the listener." },
    { group: "linux", title: "Monitor Real-Time Logs", cmd: "tail -f -n 100 /var/log/nginx/access.log", desc: "Streams the trailing 100 lines of a server log file continuously." },
    { group: "linux", title: "Disk Usage Summary", cmd: "du -sh ./* | sort -hr", desc: "Calculates disk space consumed per directory in human-readable megabytes and gigabytes." },
    { group: "linux", title: "Recursive File Permissions", cmd: "chmod -R 755 ./public", desc: "Applies read/write/execute permissions to owner and read/execute to group and public." },

    // HTTP
    { group: "http", title: "HTTP 200 OK vs 201 Created", cmd: "200 OK | 201 Created", desc: "200 indicates general successful GET/PUT; 201 signals a new resource was created via POST." },
    { group: "http", title: "HTTP 401 vs 403 Forbidden", cmd: "401 Unauthorized | 403 Forbidden", desc: "401 means missing or invalid authentication token; 403 means authenticated but lacking RBAC role." },
    { group: "http", title: "HTTP 429 Too Many Requests", cmd: "429 Too Many Requests (Rate Limit)", desc: "Client has exceeded rate limit thresholds. Check Retry-After response header." },
    { group: "http", title: "HTTP 502 Bad Gateway", cmd: "502 Bad Gateway", desc: "Reverse proxy (e.g. Nginx, Cloudflare) received an invalid response from upstream Node server." },

    // CSS
    { group: "css", title: "CSS Has Pseudo-Class (Parent)", cmd: "div:has(> img.banner) { ... }", desc: "Selects parent elements based on child conditions without requiring JavaScript DOM queries." },
    { group: "css", title: "CSS Dynamic Viewport Units", cmd: "height: 100dvh; /* dynamic */", desc: "100dvh dynamically accounts for mobile browser address bars collapsing during scrolling." },
    { group: "css", title: "CSS Subgrid Inheritance", cmd: "grid-template-columns: subgrid;", desc: "Permits child grid containers to inherit column tracks directly from outer ancestor grid." }
  ];

  return cards.map(c => `
    <div class="cheat-card p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-2 flex flex-col justify-between" data-group="${c.group}" data-title="${c.title}" data-cmd="${c.cmd}">
      <div class="space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-white">${c.title}</span>
          <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30 uppercase">${c.group}</span>
        </div>
        <p class="text-[11px] text-slate-400 leading-relaxed">${c.desc}</p>
      </div>
      <div class="pt-2">
        <div class="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-xs text-sky-300 group cursor-pointer hover:border-sky-500/40" onclick="window.copyCheatCmd(this)">
          <code class="truncate flex-1">${c.cmd}</code>
          <span class="text-[10px] text-slate-500 group-hover:text-white shrink-0 ml-2">Copy</span>
        </div>
      </div>
    </div>
  `).join("");
}

export function initCheatSheetsView() {
  const searchInput = document.getElementById("cheat-search");
  const tabButtons = document.querySelectorAll(".cheat-tab-btn");
  const cards = document.querySelectorAll(".cheat-card");

  window.copyCheatCmd = function(el) {
    const code = el.querySelector("code")?.textContent || "";
    copyToClipboard(code, "Command");
  };

  function filterCheat() {
    const query = (searchInput?.value || "").toLowerCase().trim();
    const activeTab = document.querySelector(".cheat-tab-btn.bg-sky-600");
    const selectedGroup = activeTab?.dataset.group || "all";

    cards.forEach(card => {
      const title = (card.dataset.title || "").toLowerCase();
      const cmd = (card.dataset.cmd || "").toLowerCase();
      const group = card.dataset.group || "";

      const matchesQuery = !query || title.includes(query) || cmd.includes(query);
      const matchesGroup = selectedGroup === "all" || group === selectedGroup;

      if (matchesQuery && matchesGroup) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  }

  searchInput?.addEventListener("input", filterCheat);

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => {
        b.className = "cheat-tab-btn px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-semibold transition";
      });
      btn.className = "cheat-tab-btn px-3 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold transition";
      filterCheat();
    });
  });
}
