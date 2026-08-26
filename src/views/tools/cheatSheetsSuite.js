// Tool View: Developer Cheat Sheets (Git, Linux, Docker, CSS, JS, SQL, HTTP Status Codes, npm)
// High-density quick reference cards with search filter and click-to-copy

import { copyToClipboard, showToast, escapeHtml } from "../../utils.js";

const CHEAT_DATA = {
  git: [
    { cmd: "git checkout -b <branch>", desc: "Create and switch to new branch" },
    { cmd: "git stash && git stash pop", desc: "Temporarily shelve dirty changes" },
    { cmd: "git commit --amend --no-edit", desc: "Add staged files to previous commit" },
    { cmd: "git reset --soft HEAD~1", desc: "Undo last commit while preserving changes in staging" },
    { cmd: "git clean -fd", desc: "Remove untracked files and directories" },
    { cmd: "git log --oneline --graph --decorate --all", desc: "Pretty visual branch commit history" },
    { cmd: "git cherry-pick <commit-hash>", desc: "Apply specific commit to current branch" }
  ],
  docker: [
    { cmd: "docker build -t <image-name> .", desc: "Build image from Dockerfile in current dir" },
    { cmd: "docker run -p 3000:3000 -d <image-name>", desc: "Run container in background with port mapping" },
    { cmd: "docker ps -a", desc: "List all running and stopped containers" },
    { cmd: "docker exec -it <container-id> sh", desc: "Open interactive shell inside container" },
    { cmd: "docker system prune -a --volumes", desc: "Remove unused containers, networks, images, and volumes" }
  ],
  linux: [
    { cmd: "lsof -i :3000", desc: "Find process listening on specific port" },
    { cmd: "kill -9 <PID>", desc: "Force kill process by process ID" },
    { cmd: "tar -czvf archive.tar.gz /path/to/folder", desc: "Compress folder into tar.gz" },
    { cmd: "grep -rnw '/path/' -e 'pattern'", desc: "Search string recursively inside directory" },
    { cmd: "chmod -R 755 /path/to/dir", desc: "Grant read/exec permissions recursively" },
    { cmd: "df -h", desc: "Show disk space usage in human-readable format" }
  ],
  http: [
    { cmd: "200 OK", desc: "Standard response for successful HTTP requests" },
    { cmd: "201 Created", desc: "Resource successfully created (POST/PUT)" },
    { cmd: "204 No Content", desc: "Action succeeded with no response body needed" },
    { cmd: "301 Moved Permanently", desc: "Permanent redirection to new canonical URL" },
    { cmd: "400 Bad Request", desc: "Malformed syntax or invalid request payload" },
    { cmd: "401 Unauthorized", desc: "Authentication credentials missing or invalid" },
    { cmd: "403 Forbidden", desc: "Authenticated user lacks permission for resource" },
    { cmd: "404 Not Found", desc: "Target resource does not exist" },
    { cmd: "429 Too Many Requests", desc: "Rate limit exceeded" },
    { cmd: "500 Internal Server Error", desc: "Unhandled server-side crash" },
    { cmd: "502 Bad Gateway / 504 Gateway Timeout", desc: "Proxy upstream communication failure" }
  ],
  sql: [
    { cmd: "SELECT * FROM users WHERE active = true ORDER BY created_at DESC LIMIT 10;", desc: "Basic filtered query with sorting & limit" },
    { cmd: "INSERT INTO users (name, email) VALUES ('John', 'john@example.com');", desc: "Insert single record" },
    { cmd: "UPDATE users SET active = false WHERE last_login < NOW() - INTERVAL '90 days';", desc: "Bulk update records with condition" },
    { cmd: "SELECT u.name, COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.name;", desc: "Left join with aggregation" }
  ]
};

export function renderCheatSheetsSuiteView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <a href="#/" class="hover:text-amber-400">Home</a>
        <span>/</span>
        <span class="text-slate-200 font-bold">Reference</span>
        <span>/</span>
        <span class="text-amber-400 font-bold">Developer Cheat Sheets</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">Developer Cheat Sheets</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">QUICK REFERENCE</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">High-density syntax cheat sheets for Git, Linux commands, Docker containers, HTTP Status Codes, and SQL queries.</p>
        </div>
        <div>
          <input type="text" id="cheat-search-input" placeholder="Search commands..." class="w-full sm:w-60 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400" />
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap text-xs font-mono">
        <button data-cat="all" class="cheat-cat-btn px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold transition">All Sheets</button>
        <button data-cat="git" class="cheat-cat-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Git Version Control</button>
        <button data-cat="docker" class="cheat-cat-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Docker Containers</button>
        <button data-cat="linux" class="cheat-cat-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">Linux Terminal</button>
        <button data-cat="http" class="cheat-cat-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">HTTP Status Codes</button>
        <button data-cat="sql" class="cheat-cat-btn px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition">SQL Queries</button>
      </div>

      <!-- Commands Grid -->
      <div id="cheat-cards-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;
}

export function initCheatSheetsSuiteView() {
  const searchInput = document.getElementById("cheat-search-input");
  const catBtns = document.querySelectorAll(".cheat-cat-btn");
  const cardsGrid = document.getElementById("cheat-cards-grid");

  let activeCat = "all";

  catBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      catBtns.forEach((b) => {
        b.classList.remove("bg-amber-600", "text-white", "font-bold");
        b.classList.add("text-slate-300");
      });
      btn.classList.add("bg-amber-600", "text-white", "font-bold");
      btn.classList.remove("text-slate-300");

      activeCat = btn.getAttribute("data-cat") || "all";
      renderList();
    });
  });

  searchInput?.addEventListener("input", renderList);
  renderList();

  function renderList() {
    if (!cardsGrid) return;
    const query = searchInput?.value?.toLowerCase() || "";

    const items = [];
    Object.keys(CHEAT_DATA).forEach((category) => {
      if (activeCat === "all" || activeCat === category) {
        CHEAT_DATA[category].forEach((entry) => {
          if (!query || entry.cmd.toLowerCase().includes(query) || entry.desc.toLowerCase().includes(query)) {
            items.push({ ...entry, category });
          }
        });
      }
    });

    if (items.length === 0) {
      cardsGrid.innerHTML = `<div class="col-span-full p-8 text-center text-slate-500 font-mono text-xs">No matching commands found.</div>`;
      return;
    }

    cardsGrid.innerHTML = items
      .map(
        (it) => `
        <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition flex flex-col justify-between group space-y-2">
          <div>
            <div class="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase">
              <span class="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-bold">${it.category}</span>
              <button class="copy-cmd-btn text-slate-400 hover:text-white font-semibold text-xs transition" data-cmd="${escapeHtml(it.cmd)}">Copy</button>
            </div>
            <p class="text-xs text-slate-300 mt-2 font-medium">${escapeHtml(it.desc)}</p>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300 select-all overflow-x-auto">
            <code>${escapeHtml(it.cmd)}</code>
          </div>
        </div>
      `
      )
      .join("");

    cardsGrid.querySelectorAll(".copy-cmd-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        copyToClipboard(btn.getAttribute("data-cmd") || "", "Command");
      });
    });
  }
}
