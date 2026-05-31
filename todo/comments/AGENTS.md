# AGENTS.md — `todo/comments/`

In-context feedback captured from the running Storybook. Every page renders a
floating comment FAB ([.storybook/CommentWidget.tsx](/Users/kwaight/src/ai-conversations/web/.storybook/CommentWidget.tsx));
tapping it, picking a **kind**, and sending a note POSTs to `/__comments`, which
the dev-server middleware
([.storybook/middleware.cjs](/Users/kwaight/src/ai-conversations/web/.storybook/middleware.cjs))
writes here as **one task document per comment**.

These are small but real tasks — usually a quick tweak or a bug, sometimes a
question that just needs a reply. Each is a first-class `todo/` task: triage it,
do the work (or answer it), record the outcome, and resolve it. Read the parent
[todo/AGENTS.md](../AGENTS.md) for the shared conventions (Markdown-table
metadata, absolute links, no YAML frontmatter).

---

## Layout

```
todo/comments/
├── AGENTS.md                       — this guide
├── <id>-<slug>.md                  — OPEN comments (active queue)
└── resolved/
    └── <id>-<slug>.md              — resolved / won't-fix (archive)
```

- `<id>` is a sortable capture stamp: `YYYYMMDD-HHMMSS-mmm` (e.g.
  `20260530-114227-608`). `<slug>` is a kebab of the note's first line.
- The middleware **only ever creates files** in the top level with
  `Status: Open` — it never edits or deletes. Triage and resolution are manual
  (you or an agent).

---

## Schema

The middleware emits exactly this shape; keep it when you hand-write or edit one:

```markdown
# Comment — <first line of the note>

| | |
|---|---|
| **ID** | 20260530-114227-608 |
| **Status** | Open · In progress · Resolved · Won't fix |
| **Kind** | Tweak · Bug · Question · Task |
| **Page** | <resolved Storybook page title> |
| **Story** | `<story-or-docs-id>` |
| **URL** | [open in Storybook](<shareable manager url>) · scrollY <n> |
| **Environment** | <theme> · <accent> · <viewport> |
| **Captured** | <ISO timestamp> |
| **Resolution** | — until done, then a one-line outcome + link |

---

## Request

> The note, verbatim (blockquoted — never paraphrase the user's words away).

## Response / Resolution

<!-- filled in when worked: the reply to the user, or the tweak made + how it was verified -->
```

Field notes:

- **Status** starts `Open`. Move to `In progress` while working, then `Resolved`
  or `Won't fix`.
- **Kind** is set from the FAB picker (`tweak` / `bug` / `question` / `task`).
  Re-classify if the picker was wrong — `question` means "a reply is the
  deliverable, no code change."
- **URL** is a shareable manager link plus the canvas `scrollY` at capture, so
  you can jump back to the exact spot.
- **Captured** is absolute and immutable — don't change it.

---

## Workflow

1. **Triage** the open queue: confirm `Kind`, fix it if the picker was off.
2. **Work it** — set `Status: In progress`:
   - `question` → write the answer in **Response / Resolution**.
   - `tweak` / `bug` / `task` → make the change against the page named in
     `Page`/`Story`, following the package authoring rules in
     [web/AGENTS.md](../../AGENTS.md). After any component/story change, run the
     story tests and share preview links (the Storybook MCP workflow).
3. **Resolve** — write a one-line outcome in the **Resolution** row, fill
   **Response / Resolution** with what changed and how it was verified (link the
   commit/PR/report), set `Status: Resolved`, and **move the file to
   `resolved/`** (use `Won't fix` with a reason instead, when that's the call).
4. **Keep the user's words intact** — edit only the metadata and the Response
   section; never rewrite the **Request** blockquote.

A comment large enough to become a multi-step effort should graduate into a full
initiative doc at `todo/<Initiative>.md` (see [todo/AGENTS.md](../AGENTS.md)) — leave
the comment resolved with a link to it rather than tracking big work here.
