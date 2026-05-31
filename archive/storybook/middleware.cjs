/**
 * Storybook dev-server middleware (auto-loaded by Storybook from the config dir).
 * Exposes POST /__comments so the in-preview CommentWidget can persist a note from
 * any device (e.g. iPhone) to the filesystem, keyed by the page it was left on.
 *
 * Each comment is written as its OWN task document under `todo/comments/<id>-<slug>.md`
 * with a metadata header (Status/Kind/Page/Story/URL/Environment) and a Request /
 * Response body — so a comment is a first-class todo task an agent can pick up,
 * work, and resolve in place (see todo/comments/AGENTS.md). Resolved comments are
 * moved to `todo/comments/resolved/`.
 *
 * Storybook hands us its Express app; we mount one route and parse the body by hand
 * (no body-parser dependency).
 */
const fs = require("node:fs");
const path = require("node:path");

// <repo>/web/todo/comments  (this file lives at <repo>/web/.storybook/middleware.cjs)
const COMMENTS_DIR = path.resolve(__dirname, "..", "todo", "comments");

const KINDS = new Set(["tweak", "bug", "question", "task"]);

/** ISO timestamp → sortable, filename-safe id: 2026-05-30T11:42:27.608Z → 20260530-114227-608 */
function idFromTimestamp(iso) {
  return iso.replace(/[-:]/g, "").replace("T", "-").replace(/\.(\d+)Z$/, "-$1");
}

/** First line of the note → a short kebab slug for the filename. */
function slugify(text, fallback) {
  const slug = text
    .split("\n")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
    .replace(/-+$/g, "");
  return slug || fallback || "comment";
}

/** Escape a value for a Markdown table cell; empty → em dash. */
function cell(value) {
  if (value == null || value === "") return "—";
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

const capitalize = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

function buildMarkdown(entry) {
  const env = [entry.theme, entry.accent, entry.viewport].filter(Boolean).join(" · ");
  const title = entry.text.split("\n")[0].slice(0, 80);
  const story = entry.storyId ? `\`${entry.storyId}\`` : "—";
  const url = entry.url
    ? `[open in Storybook](${entry.url})${entry.scrollY ? ` · scrollY ${entry.scrollY}` : ""}`
    : "—";
  const quoted = entry.text
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");

  return `# Comment — ${cell(title)}

| | |
|---|---|
| **ID** | ${entry.id} |
| **Status** | Open |
| **Kind** | ${cell(capitalize(entry.kind) || "Untriaged")} |
| **Page** | ${cell(entry.page)} |
| **Story** | ${story} |
| **URL** | ${url} |
| **Environment** | ${cell(env)} |
| **Captured** | ${entry.ts} |
| **Resolution** | — |

---

## Request

${quoted}

## Response / Resolution

`;
}

module.exports = function expressMiddleware(app) {
  app.use("/__comments", (req, res) => {
    if (req.method !== "POST") {
      res.statusCode = 405;
      res.end("Method Not Allowed");
      return;
    }
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) req.destroy(); // 1MB guard
    });
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body || "{}");
        const trimmed = typeof parsed.text === "string" ? parsed.text.trim() : "";
        if (!trimmed) {
          res.statusCode = 400;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ ok: false, error: "empty comment" }));
          return;
        }
        const ts = new Date().toISOString();
        const id = idFromTimestamp(ts);
        const kind = KINDS.has(parsed.kind) ? parsed.kind : null;
        const entry = {
          id,
          ts,
          page: parsed.page || parsed.storyId || "(unknown)",
          storyId: parsed.storyId || null,
          kind,
          url: typeof parsed.url === "string" ? parsed.url : null,
          scrollY: Number.isFinite(parsed.scrollY) ? Math.round(parsed.scrollY) : null,
          theme: parsed.theme || null,
          accent: parsed.accent || null,
          viewport: parsed.viewport || null,
          text: trimmed,
        };

        fs.mkdirSync(COMMENTS_DIR, { recursive: true });
        const file = path.join(COMMENTS_DIR, `${id}-${slugify(trimmed, entry.storyId)}.md`);
        fs.writeFileSync(file, buildMarkdown(entry), "utf8");

        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ ok: true, savedAt: ts, file }));
      } catch (err) {
        res.statusCode = 400;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ ok: false, error: String(err && err.message) }));
      }
    });
  });
};
