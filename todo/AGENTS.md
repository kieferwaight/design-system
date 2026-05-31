# AGENTS.md — `todo/`

Agent guide for the `todo/` directory: the design system's **planning, hand-off,
and execution-record surface**. No runtime code lives here — only the documents
that define work, hand it to an agent, and record what came back.

Read the parent [web/AGENTS.md](../AGENTS.md) for the package-wide authoring
discipline. This file governs **how the documents in `todo/` are structured** so
each kind stays uniform and scannable.

---

## Directory map

The folder has five surfaces, each with its own schema (below):

```
todo/
├── AGENTS.md            — this guide
├── <Initiative>.md      — specs, refactor plans, audits, parked analyses (one file per initiative)
├── prompts/             — reusable, parameterized prompts that package/hand off work to an agent
├── reports/             — execution artifacts returned by agents after an APPROVED task (append-only)
├── comments/            — in-Storybook feedback captured as one task doc per comment (own AGENTS.md)
└── lab/                 — research track: one file per external dependency under evaluation, + _Index.md
```

### The task lifecycle these folders model

```
prompts/<template>.md      reusable instruction template ({{PLACEHOLDERS}})
        │  applied to
        ▼
<Initiative>.md            the packaged spec a developer agent executes
        │  executed by an approved agent run
        ▼
reports/<task>.md          the artifact the agent leaves behind  ── and ──▶  Progress log (changelog)
```

A `prompts/` template (e.g. [synthesize-project-spec.md](prompts/synthesize-project-spec.md))
turns a rough initiative doc into a build-ready spec. An agent then executes that
spec and drops a record in `reports/`, while running execution notes go to the
initiative's linked **Progress log**. `lab/` is a parallel, lower-stakes track
that feeds dependency decisions back into initiative docs.

**Pick the right surface:** defining work → an initiative `.md`; writing a
reusable hand-off instruction → `prompts/`; recording what an agent *did* →
`reports/`; triaging in-Storybook feedback → `comments/`; evaluating a candidate
dependency → `lab/`.

`comments/` is the small-task inbox: feedback left on the running Storybook is
captured as one task doc per comment (a tweak, bug, or question). It has its own
schema and triage workflow in [comments/AGENTS.md](comments/AGENTS.md); a comment
that grows into multi-step work graduates into an initiative `.md`.

---

## Shared conventions

- **Metadata is a Markdown table, never YAML frontmatter** — so it renders
  everywhere (GitHub, Storybook MDX previews, plain editors) without a parser.
- **Links use absolute repo paths**
  (e.g. `/Users/kwaight/src/ai-conversations/web/typedoc.json`) so they resolve
  regardless of where the file is opened. Relative links inside prose are fine.
- **One H1, then a metadata block, then a `---`, then the body.** (`prompts/`
  uses a purpose callout in place of the table — see its schema.)
- Keep table cells to a single line; push detail into the body.
- When status changes, **edit the table in place** — don't append "UPDATE:"
  prose. (Exception: `reports/` are append-only records, never rewritten.)

---

## 1. Initiative documents — `todo/*.md`

Specs, refactor plans, audits, parked analyses. One file per initiative.
[EnvironmentEngine.md](EnvironmentEngine.md) is the reference exemplar;
[Typedoc-Documentation-Improvements.md](Typedoc-Documentation-Improvements.md)
follows it.

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
...body...
```

- **Required:** `Project`, `Owner`, `Status`. Include any other row only when it
  carries information.
- **Status** is one of: `Backlog`, `Approved for implementation`, `In progress`,
  `Blocked`, `Done`. A parked item is `Backlog` with the reason in `Note`.
- After the `---`, lead with an orienting section (**Executive Summary** for
  specs, **Goals** for audits).
- Preserve source material verbatim in an **Appendix** fenced block rather than
  paraphrasing away an external review or hand-off.
- Don't restate parent-plan content — link via `Parent initiative`.
- Record execution detail in the linked **Progress log**, not in the spec body.

---

## 2. Prompts — `todo/prompts/*.md`

Reusable, parameterized instruction templates that package work and hand it to a
fresh agent. [synthesize-project-spec.md](prompts/synthesize-project-spec.md) is
the reference exemplar.

```markdown
# Prompt — <what this prompt produces>

> **Purpose.** When to reach for this prompt and what it turns rough input into.
>
> **How to use.** Copy the PROMPT block into a new agent. Replace
> `{{PLACEHOLDER}}` tokens (e.g. `{{TARGET_DOC}}`, `{{CHANGELOG}}`). Leave the
> rest verbatim.

---

## PROMPT

<the copy-paste-ready instruction, in second person, written to the executing
agent — phases, deliverables, diagram/quality bar, and a Definition of Done>

---

## Notes for the operator (not part of the prompt)

<exemplars to point the agent at, fallback guidance, and a reminder to keep the
prompt and its reference exemplar in sync>
```

Rules:

- **Parameterize with `{{DOUBLE_BRACE}}` placeholders** for every per-run input;
  everything outside the placeholders is meant to be copied verbatim.
- The `## PROMPT` block is addressed to the **executing agent** (second person)
  and must end with a concrete **Definition of done**.
- Keep operator notes (exemplar links, assumptions to flag) **outside** the
  PROMPT block so they don't leak into the agent's instructions.
- Name a **reference exemplar** (a finished artifact the prompt was distilled
  from) and keep prompt + exemplar in sync as the format improves.

---

## 3. Reports — `todo/reports/*.md`

The artifact an agent leaves behind after executing an **approved** task:
implementation reports, audits, investigations, post-mortems. Extracting the
report here keeps the initiative spec clean (see the provenance note atop
[phase6-environment-engine-implementation-report.md](reports/phase6-environment-engine-implementation-report.md)).

Reports are **append-only records** — written once on completion, linked from the
spec and Progress log, and never silently rewritten. If later work supersedes
one, set `Status: Superseded` and link the replacement rather than editing it
away.

Open every report with this header:

```markdown
# <Phase / Task> — <what was built>: <Report type>

| | |
|---|---|
| **Report type** | Implementation report · Audit · Investigation · Post-mortem |
| **Task / spec** | Link to the initiative doc this executed |
| **Phase** | Phase N — if part of a phased plan (omit otherwise) |
| **Status** | Complete · Partial · Superseded |
| **Author** | Agent / model that performed the work |
| **Date** | YYYY-MM-DD (absolute — convert any "today") |
| **Branch / PR** | Where the work landed, linked |
| **Progress log** | The changelog the work was also recorded in |
| **Validation** | typecheck / lint / test outcome at completion |

---

## Summary
What was built/found, in a few sentences.

## What changed
File-level changes, tagged `[NEW]` / `[MODIFY]` / `[DELETE]`, each linked.

## Validation & results
The actual commands run and their real output (typecheck, lint, tests). Never
claim a gate passed without the output.

## Follow-ups / deferred
Out-of-scope items captured as explicit deferred tasks, linked back to the
initiative or a new `lab/` entry — not silent omissions.
```

- **Required:** `Report type`, `Task / spec`, `Status`, `Author`, `Date`.
- Report **what actually happened**, faithfully — partial completions, skipped
  steps, and failing gates are stated, not smoothed over. A `Partial` status with
  honest gaps beats a `Complete` that overstates.
- Link **back to the spec** (`Task / spec`) and to the **Progress log** so the
  three views — spec, log, report — stay cross-referenced.

---

## 4. Lab — `todo/lab/*.md`

Low-priority research track. **One file per external dependency** proposed for
Liquid Glass motion / advanced touch, plus [_Index.md](lab/_Index.md) — the
registry that ranks every candidate and states the graduation rule.
[ExpandUseGesture.md](lab/ExpandUseGesture.md) is the reference exemplar.

Each lab item uses the initiative metadata table with lab-specific rows:

```markdown
# <Dependency> — <one-line thesis>

| | |
|---|---|
| **Project** | What adopting this dep would let us do |
| **Status** | Backlog · In progress · Done · Declined |
| **Priority** | Low · Medium · High |
| **Tier** | No new dep · Native/thin · Tiny · Useful · Speculative · Pick-one |
| **External dep** | Package + version, or "none — already in package.json" (linked) |
| **Target** | `src/lab/…` prototype → graduation target under `adapters/…` |
| **Note** | Source of the proposal; ranking rationale |

---

## Why            — what it buys us that the current stack doesn't
## What to prototype (in src/lab)
## Decision criteria   — what would make us adopt vs. decline
## Done when       — the measurable bar (bundle cost, 60fps on the device matrix, reduced-motion)
```

Lab rules:

- **Every lab item prototypes in
  [src/lab/](/Users/kwaight/src/ai-conversations/web/src/lab) tagged `research`**
  — no public export, no other layer imports it (see Overview.mdx status tags).
- **Graduation:** prototype → measure (bundle, 60fps, reduced-motion) → if it
  earns a place, wrap it behind `adapters/<domain>/<lib>/` so the library name
  never leaks past the boundary (a core [web/AGENTS.md](../AGENTS.md) rule), then
  delete the lab copy. If it doesn't, record *why* and set `Status: Declined` —
  never leave a dead dep in `package.json`.
- **Keep [_Index.md](lab/_Index.md) current**: add new candidates to its ranking
  table, and correct the source review against the repo's real state (it already
  carries verified corrections) rather than trusting the proposal.

---

## When you add or change a document here

1. Pick the surface (initiative / prompt / report / lab) and copy its schema.
2. Fill the required fields; omit optional rows that carry no information.
3. Initiative & lab docs: edit status **in place**. Reports: never rewrite —
   append a successor and mark the old one `Superseded`.
4. Keep the three cross-links intact: spec ⇄ progress log ⇄ report.
5. Use absolute repo paths in metadata links; convert relative dates to absolute.
