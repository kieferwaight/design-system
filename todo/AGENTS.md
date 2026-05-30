# AGENTS.md — `todo/`

Agent guide for the `todo/` directory. This folder holds **planning and
backlog documents** — product specs, refactor plans, audits, and parked
analyses — not runtime code. One file per initiative.

Read the parent [web/AGENTS.md](../AGENTS.md) for authoring discipline that
applies to the whole package. This file governs **how a todo document is
structured** so they stay scannable and uniform.

---

## The one rule

**Every todo document opens with an H1 title, then a metadata table, then a
`---` rule, then the body.** No YAML frontmatter — the metadata is a Markdown
table so it renders everywhere (GitHub, Storybook MDX previews, plain editors)
without a frontmatter parser. [EnvironmentEngine.md](EnvironmentEngine.md) is
the reference example; [Typedoc-Documentation-Improvements.md](Typedoc-Documentation-Improvements.md)
follows it.

---

## The metadata table

A two-column borderless table immediately under the H1:

```markdown
# <Initiative> — <subtitle>

| | |
|---|---|
| **Project** | Short name + one-line scope |
| **Owner** | Team or person responsible |
| **Status** | Backlog · Approved for implementation · In progress · Blocked · Done |
| **Priority** | Low · Medium · High (omit if not yet triaged) |
| **Target layer** | Path(s) the work touches, linked |
| **Parent initiative** | Link to the umbrella plan, if any |
| **Progress log** | Link to the changelog/notes file tracking execution |
| **Runtime** | Stack constraints relevant to the work |
| **Note** | Optional — parking rationale, caveats, circle-back conditions |

---

## 1. Executive Summary

...body starts here...
```

### Field rules

- **Required:** `Project`, `Owner`, `Status`. Everything else is optional —
  include a row only when it carries information.
- **Status** is one of: `Backlog`, `Approved for implementation`,
  `In progress`, `Blocked`, `Done`. A parked item is `Backlog` with the reason
  in `Note`.
- **Priority** is `Low` / `Medium` / `High`. Omit the row entirely if the item
  hasn't been triaged rather than guessing.
- **Links use absolute repo paths** (e.g.
  `/Users/kwaight/src/ai-conversations/web/typedoc.json`) the way
  [EnvironmentEngine.md](EnvironmentEngine.md) does, so they resolve regardless
  of where the file is opened from. Relative links inside prose are fine.
- Keep cell values to a single line; push detail into the body.

---

## Body conventions

- After the `---`, lead with a section that orients the reader — an
  **Executive Summary** for specs, or a **Goals** section for audits/analyses.
- Preserve source material verbatim. When a document synthesizes an external
  review or hand-off, keep the original in an **Appendix** fenced block rather
  than paraphrasing it away (see the appendix in
  [Typedoc-Documentation-Improvements.md](Typedoc-Documentation-Improvements.md)).
- Don't restate parent-plan content — link to it via the `Parent initiative`
  row and inline links.

---

## When you create or edit a todo

1. Start from the table above; fill required fields.
2. If the item is parked, set `Status: Backlog`, add `Priority`, and explain the
   parking in `Note`.
3. When status changes, update the table in place — don't append "UPDATE:"
   prose.
4. Record execution detail in the linked `Progress log`, not in the spec body.
