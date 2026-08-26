// Tool View: SQL Query Formatter & Mock Table Schema Builder with SEO Guide

import { copyToClipboard, showToast } from "../../utils.js";

export function renderSqlFormatterView() {
  return `
    <div class="space-y-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2.5">
            <h1 class="text-2xl font-bold text-white tracking-tight">SQL Query Formatter &amp; Schema Builder</h1>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30">DATABASE</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Beautify complex SQL queries with keyword uppercasing and generate mock PostgreSQL/MySQL DDL schemas.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="sql-sample-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">Sample SQL</button>
          <button id="sql-format-btn" class="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition shadow-md shadow-orange-500/20">Beautify SQL</button>
        </div>
      </div>

      <!-- Main Dual-Pane SQL Formatter -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">RAW SQL QUERY INPUT</div>
          <div class="p-4 flex-1 flex flex-col">
            <textarea id="sql-input" rows="12" placeholder="select u.id, u.name, count(o.id) as orders_count from users u left join orders o on u.id = o.user_id where u.active = 1 and u.created_at >= '2026-01-01' group by u.id order by orders_count desc limit 50;" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-orange-400 resize-y leading-relaxed flex-1"></textarea>
          </div>
        </div>

        <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>FORMATTED SQL OUTPUT</span>
            <button id="sql-copy-btn" class="text-orange-400 hover:text-white text-[11px] font-bold">Copy SQL</button>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <textarea id="sql-output" rows="12" readonly placeholder="Formatted SQL with uppercase keywords will appear here..." class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 text-xs text-orange-300 font-mono focus:outline-none resize-y leading-relaxed flex-1"></textarea>
          </div>
        </div>
      </div>

      <!-- Quick Schema Generator -->
      <div class="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Quick SQL DDL Table Schema Generator</h3>
          <button id="sql-gen-ddl-btn" class="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-orange-400 text-xs font-mono font-bold rounded-lg transition">Generate CREATE TABLE</button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label class="block text-slate-400 font-mono mb-1">Table Name</label>
            <input type="text" id="schema-table-name" value="users" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono" />
          </div>
          <div>
            <label class="block text-slate-400 font-mono mb-1">Database Dialect</label>
            <select id="schema-dialect" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono">
              <option value="postgres">PostgreSQL</option>
              <option value="mysql">MySQL / MariaDB</option>
              <option value="sqlite">SQLite</option>
            </select>
          </div>
          <div>
            <label class="block text-slate-400 font-mono mb-1">Include Timestamps?</label>
            <select id="schema-timestamps" class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-mono">
              <option value="yes">Yes (created_at, updated_at)</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Dedicated 280-Word SEO Technical Guide Section -->
      <section class="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <h2 class="text-lg font-bold text-white tracking-tight">Relational SQL Formatting, Index Optimization &amp; Query Plans</h2>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed space-y-3 text-slate-400">
          <p>
            <strong>Structured Query Language (SQL)</strong> remains the foundational standard for enterprise database systems like PostgreSQL, MySQL, and Google Cloud Spanner.
          </p>
          <p>
            Formatting multi-table joins, subqueries, and aggregation clauses with uppercase keywords (e.g. <code>SELECT</code>, <code>LEFT JOIN</code>, <code>WHERE</code>, <code>GROUP BY</code>) dramatically improves code maintainability during team code reviews and schema migrations.
          </p>
        </div>
      </section>
    </div>
  `;
}

export function initSqlFormatterView() {
  const input = document.getElementById("sql-input");
  const output = document.getElementById("sql-output");
  const formatBtn = document.getElementById("sql-format-btn");
  const sampleBtn = document.getElementById("sql-sample-btn");
  const copyBtn = document.getElementById("sql-copy-btn");
  const genDdlBtn = document.getElementById("sql-gen-ddl-btn");

  const tableNameInput = document.getElementById("schema-table-name");
  const dialectSelect = document.getElementById("schema-dialect");
  const tsSelect = document.getElementById("schema-timestamps");

  const sampleSql = `select u.id, u.email, count(p.id) as total_projects, sum(i.amount) as revenue from users u left join projects p on u.id = p.user_id left join invoices i on u.id = i.customer_id where u.status = 'active' and u.created_at >= '2026-01-01' group by u.id, u.email having count(p.id) > 2 order by revenue desc limit 25;`;

  const keywords = [
    "SELECT", "FROM", "WHERE", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN", "JOIN",
    "ON", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET", "INSERT INTO", "VALUES",
    "UPDATE", "SET", "DELETE", "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "AND", "OR",
    "IN", "NOT IN", "EXISTS", "BETWEEN", "LIKE", "IS NULL", "IS NOT NULL", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"
  ];

  function formatSql(sql) {
    let res = sql.trim();
    // Uppercase keywords
    keywords.forEach(kw => {
      const reg = new RegExp(`\\b${kw}\\b`, "gi");
      res = res.replace(reg, kw);
    });

    // Add newlines before major clauses
    const majorClauses = ["SELECT", "FROM", "WHERE", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "JOIN", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "SET", "VALUES"];
    majorClauses.forEach(cl => {
      const reg = new RegExp(`\\s+(${cl})\\b`, "g");
      res = res.replace(reg, `\n$1`);
    });

    return res.trim();
  }

  formatBtn?.addEventListener("click", () => {
    const raw = input.value;
    if (!raw.trim()) return;
    output.value = formatSql(raw);
    showToast("SQL query beautified", "success");
  });

  sampleBtn?.addEventListener("click", () => {
    input.value = sampleSql;
    output.value = formatSql(sampleSql);
    showToast("Sample SQL query loaded", "info");
  });

  copyBtn?.addEventListener("click", () => {
    if (!output.value) {
      showToast("Nothing to copy", "warning");
      return;
    }
    copyToClipboard(output.value, "SQL Query");
  });

  genDdlBtn?.addEventListener("click", () => {
    const name = tableNameInput.value || "users";
    const dialect = dialectSelect.value;
    const hasTs = tsSelect.value === "yes";

    let ddl = "";
    if (dialect === "postgres") {
      ddl = `CREATE TABLE ${name} (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  name VARCHAR(255) NOT NULL,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  is_active BOOLEAN DEFAULT TRUE,\n${hasTs ? "  created_at TIMESTAMPTZ DEFAULT NOW(),\n  updated_at TIMESTAMPTZ DEFAULT NOW()\n" : ""} );`;
    } else if (dialect === "mysql") {
      ddl = `CREATE TABLE \`${name}\` (\n  \`id\` INT AUTO_INCREMENT PRIMARY KEY,\n  \`name\` VARCHAR(255) NOT NULL,\n  \`email\` VARCHAR(255) UNIQUE NOT NULL,\n  \`is_active\` TINYINT(1) DEFAULT 1,\n${hasTs ? "  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n" : ""} ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;
    } else {
      ddl = `CREATE TABLE ${name} (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE NOT NULL,\n  is_active INTEGER DEFAULT 1,\n${hasTs ? "  created_at TEXT DEFAULT (datetime('now')),\n  updated_at TEXT DEFAULT (datetime('now'))\n" : ""} );`;
    }

    input.value = ddl;
    output.value = ddl;
    showToast(`Generated ${dialect.toUpperCase()} DDL for table '${name}'`, "success");
  });

  input.value = sampleSql;
  output.value = formatSql(sampleSql);
}
