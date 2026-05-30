/**
 * Storybook dev-server middleware (auto-loaded by Storybook from the config dir).
 * Exposes POST /__comments so the in-preview CommentWidget can persist a note from
 * any device (e.g. iPhone) to the filesystem as JSONL, keyed by the page it was left on.
 *
 * Storybook hands us its Express app; we mount one route and parse the body by hand
 * (no body-parser dependency).
 */
const fs = require("node:fs");
const path = require("node:path");

// repo-root/comments  (this file lives at <repo>/web/.storybook/middleware.cjs)
const COMMENTS_DIR = path.resolve(__dirname, "..", "..", "comments");
const COMMENTS_FILE = path.join(COMMENTS_DIR, "comments.jsonl");

function appendComment(entry) {
  fs.mkdirSync(COMMENTS_DIR, { recursive: true });
  fs.appendFileSync(COMMENTS_FILE, `${JSON.stringify(entry)}\n`, "utf8");
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
        const { page, storyId, theme, accent, viewport, text } = JSON.parse(body || "{}");
        const trimmed = typeof text === "string" ? text.trim() : "";
        if (!trimmed) {
          res.statusCode = 400;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ ok: false, error: "empty comment" }));
          return;
        }
        const entry = {
          ts: new Date().toISOString(),
          page: page || storyId || "(unknown)",
          storyId: storyId || null,
          theme: theme || null,
          accent: accent || null,
          viewport: viewport || null,
          text: trimmed,
          resolved: false,
        };
        appendComment(entry);
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ ok: true, savedAt: entry.ts, file: COMMENTS_FILE }));
      } catch (err) {
        res.statusCode = 400;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ ok: false, error: String(err && err.message) }));
      }
    });
  });
};
