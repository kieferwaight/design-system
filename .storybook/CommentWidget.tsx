import { type CSSProperties, useEffect, useState } from "react";

interface CommentWidgetProps {
  /** Stable Storybook entry id (story or docs). The human title is resolved from it. */
  storyId: string;
  /** Used until the title resolves from /index.json (or if that lookup fails). */
  fallbackPage: string;
}

type Status = "idle" | "sending" | "saved" | "error";

/** Quick triage so comments arrive classified — middleware records this as the task Kind. */
const KINDS = ["tweak", "bug", "question", "task"] as const;
type Kind = (typeof KINDS)[number];

interface IndexEntry {
  title?: string;
  name?: string;
}

/** Compose a readable "Title / Name" page label, hiding the redundant "Docs" name. */
function composePage(entry: IndexEntry | undefined, fallback: string): string {
  if (!entry?.title) return fallback;
  return entry.name && entry.name !== "Docs" ? `${entry.title} / ${entry.name}` : entry.title;
}

/** Snapshot the rendered environment so visual feedback is reproducible. */
function readEnv() {
  const root = document.documentElement;
  return {
    theme: root.dataset.theme || "system",
    accent: root.dataset.accent || "blue",
    viewport: `${window.innerWidth}×${window.innerHeight}`,
  };
}

/**
 * A small floating "leave a comment" control rendered on every story and docs page.
 * Tap the bubble → pick a kind → type a note → Send. The note is POSTed to the dev
 * server's /__comments endpoint (see .storybook/middleware.cjs), which writes it as
 * its own task document under `todo/comments/<id>-<slug>.md` (see
 * todo/comments/AGENTS.md), tagged with the resolved page title, a shareable story
 * URL + scroll anchor, and the active theme/accent/viewport. Usable one-handed on
 * an iPhone.
 */
export function CommentWidget({ storyId, fallbackPage }: CommentWidgetProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [kind, setKind] = useState<Kind>("tweak");
  const [status, setStatus] = useState<Status>("idle");
  const [page, setPage] = useState(fallbackPage);

  // Resolve the human title from Storybook's index (authoritative for both
  // stories and standalone MDX docs, where the URL only carries the kebab id).
  useEffect(() => {
    let alive = true;
    fetch("/index.json")
      .then((r) => r.json())
      .then((idx) => {
        if (alive) setPage(composePage(idx?.entries?.[storyId], fallbackPage));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [storyId, fallbackPage]);

  async function send() {
    if (!text.trim()) return;
    setStatus("sending");
    try {
      // Build a shareable manager URL from the id (the widget runs inside the
      // preview iframe; window.scrollY here is the canvas scroll — the anchor).
      const viewMode = storyId.endsWith("--docs") ? "docs" : "story";
      const url = `${location.origin}/?path=/${viewMode}/${storyId}`;
      const res = await fetch("/__comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          page,
          storyId,
          kind,
          url,
          scrollY: Math.round(window.scrollY),
          ...readEnv(),
          text,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("saved");
      setText("");
      setTimeout(() => {
        setStatus("idle");
        setOpen(false);
      }, 900);
    } catch {
      setStatus("error");
    }
  }

  const fab: CSSProperties = {
    position: "fixed",
    right: "max(16px, env(safe-area-inset-right))",
    bottom: "max(16px, env(safe-area-inset-bottom))",
    zIndex: 2147483000,
    width: 48,
    height: 48,
    borderRadius: 9999,
    border: "1px solid var(--surface-glass-border, rgba(255,255,255,0.18))",
    background: "var(--color-accent, #0a84ff)",
    color: "var(--color-fg-on-accent, #fff)",
    boxShadow: "var(--shadow-lg, 0 12px 32px rgba(0,0,0,0.3))",
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
  };

  if (!open) {
    return (
      <button type="button" aria-label="Add a comment" style={fab} onClick={() => setOpen(true)}>
        💬
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        right: "max(12px, env(safe-area-inset-right))",
        bottom: "max(12px, env(safe-area-inset-bottom))",
        left: "max(12px, env(safe-area-inset-left))",
        maxWidth: 420,
        marginLeft: "auto",
        zIndex: 2147483000,
        background: "var(--color-bg-elevated, #1c1c1e)",
        color: "var(--color-fg, #fff)",
        border: "1px solid var(--color-border, rgba(255,255,255,0.12))",
        borderRadius: 16,
        boxShadow: "var(--shadow-lg, 0 12px 32px rgba(0,0,0,0.4))",
        padding: 12,
        font: "var(--text-subhead, 15px)/1.3 var(--font-sans, -apple-system, system-ui, sans-serif)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "var(--color-fg-tertiary, #999)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={page}
        >
          {page}
        </span>
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          style={{
            border: "none",
            background: "transparent",
            color: "var(--color-fg-tertiary, #999)",
            fontSize: 18,
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
        {KINDS.map((k) => {
          const selected = k === kind;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={selected}
              onClick={() => setKind(k)}
              style={{
                border: "1px solid var(--color-border, rgba(255,255,255,0.12))",
                borderRadius: 9999,
                padding: "4px 12px",
                fontSize: 13,
                textTransform: "capitalize",
                cursor: "pointer",
                background: selected ? "var(--color-accent, #0a84ff)" : "transparent",
                color: selected
                  ? "var(--color-fg-on-accent, #fff)"
                  : "var(--color-fg-secondary, #aaa)",
                fontWeight: selected ? 600 : 400,
              }}
            >
              {k}
            </button>
          );
        })}
      </div>

      <textarea
        // biome-ignore lint/a11y/noAutofocus: opening the box is an explicit user action
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Leave a comment on this page…"
        rows={3}
        style={{
          width: "100%",
          boxSizing: "border-box",
          resize: "vertical",
          background: "var(--color-bg-sunken, #000)",
          color: "var(--color-fg, #fff)",
          border: "1px solid var(--color-border, rgba(255,255,255,0.12))",
          borderRadius: 10,
          padding: "8px 10px",
          font: "inherit",
          outline: "none",
        }}
      />

      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}
      >
        <span style={{ fontSize: 12, color: "var(--color-fg-tertiary, #999)" }}>
          {status === "saved" ? "Saved ✓" : status === "error" ? "Failed — retry" : ""}
        </span>
        <button
          type="button"
          onClick={send}
          disabled={status === "sending" || !text.trim()}
          style={{
            border: "none",
            borderRadius: 9999,
            padding: "8px 18px",
            background: "var(--color-accent, #0a84ff)",
            color: "var(--color-fg-on-accent, #fff)",
            fontWeight: 600,
            fontSize: 15,
            cursor: text.trim() ? "pointer" : "default",
            opacity: status === "sending" || !text.trim() ? 0.5 : 1,
          }}
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}
