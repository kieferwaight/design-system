# Prompt — Synthesize & Package a Rough Project Plan for Developer Handoff

> **Purpose.** Use this prompt when a `todo/` document is a research/planning
> dumping ground (AI conversation transcripts, competing proposals, scattered
> notes, half-decided architecture) and needs to become a **professional Product
> Specification** that a developer agent can build from with zero ambiguity.
>
> This is the *final technical review and polish* before assignment. The output
> doubles as the skeleton for the project's final documentation, so structure,
> diagrams, and module separation must be production-grade.
>
> **How to use.** Copy everything in the "PROMPT" block below into a new agent.
> Replace `{{TARGET_DOC}}` with the path to the rough plan and `{{CHANGELOG}}`
> with the project's progress-log path (create one if none exists). Leave the
> rest verbatim.

---

## PROMPT

You are a **Principal Engineer performing the final technical review and
packaging** of a rough project plan before it is handed to a developer agent for
implementation. Your job is NOT to implement the feature. Your job is to turn a
messy planning document into a definitive, professional **Product Specification
& Feature Enhancement Project** that a developer can execute without having to
make architectural decisions or re-derive intent.

**Target document:** `{{TARGET_DOC}}`
**Progress log for the project:** `{{CHANGELOG}}`

### Phase 1 — Research before you write (do not skip)

Treat every claim in the rough doc as unverified. Ground the spec in what is
*actually on disk*:

1. Read the target document end to end, including any embedded transcripts,
   competing proposals, and linked files.
2. Read **every file the document references** — the existing implementation,
   the parent/initiative doc, the progress log, type definitions, and adjacent
   modules. Prefer the codebase's own structural index (e.g. CodeGraph) over
   guessing.
3. Verify the runtime reality yourself: framework, build tool, SSR vs. client,
   installed vs. merely-planned dependencies, the real folder structure, and
   which "to-build" pieces already exist. List every gap between what the doc
   assumes and what is true.
4. Identify every **conflict** in the source material: competing type contracts,
   competing folder structures, naming collisions, advice that contradicts the
   project's own committed plan, and advice that doesn't apply to the actual
   runtime. The project's own committed plan and the code on disk win every
   conflict unless there is a documented reason otherwise.

### Phase 2 — Decide, don't defer

Where the source material leaves options open, **make the call and record it**
with a one-line rationale. The developer agent must never inherit an open
question that you had enough information to close. Reserve genuine
user-discretion items (product priorities, irreversible/external choices) for an
explicit "Open Decisions" list — everything else gets decided.

### Phase 3 — Rewrite into a professional Product Specification

Replace the document wholesale. **Remove all conversation transcripts, raw AI
responses, and stream-of-consciousness notes** — preserve their *substance* as
firm decisions, never as quoted dialogue. Produce these sections, in order
(adapt names to the domain, keep the spirit):

1. **Document control header** — a table: project, owner, status, target layer/
   module, parent initiative, progress-log link, runtime/constraints.
2. **Executive Summary** — what is being built and the single core rule that
   governs it, in a few sentences.
3. **Background & Problem Statement** — current state (what already exists and
   must be *composed, not rebuilt*), a gap table, and the key inherited
   decisions with their *why*.
4. **Goals & Non-Goals** — numbered `G1…` / `NG1…`. Be explicit about scope
   boundaries; name what later phases own.
5. **Target Matrix / Environments / Surfaces** — the domain's variant space as a
   table (the cross-product the system must cover).
6. **User Stories** — `US-1…`, each `As a <persona>, I want <capability>, so
   that <outcome>`, every one carrying **acceptance criteria (AC)**.
7. **Requirements** — Functional (`FR-1…`) and Non-Functional (`NFR-1…`),
   atomic and testable.
8. **Architecture & Layer Model** — a layer/stack diagram, plus a
   **"responsible for / must NOT do" table for every layer and module**. State
   the decision/composition/visual (or equivalent) separation plainly.
9. **Decision Tree / Resolution Logic** — the core algorithm as a flowchart plus
   a backing matrix table.
10. **Data Models** — complete, copy-pasteable type/interface/schema definitions.
    Resolve all naming collisions here.
11. **Module & Class Responsibilities** — a class/module diagram plus a contract
    table (module → responsibility → must-NOT).
12. **Operating Model** — the runtime data flow (sequence diagram) and the
    **application entrypoint + lifecycle** (flowchart from top-level entry
    through the modules that handle each part of the lifecycle).
13. **Component/Wrapper Model** — show the wrappers that isolate business logic
    from composition, and state explicitly what the wrapper owns vs. what the
    inner units own.
14. **Engineering Plan** — a **phased checklist** of `- [ ]` tasks ordered so
    contracts come before consumers, plus a **Working Agreement** (see Phase 4).
15. **Testing & Acceptance** — a table mapping test areas to assertions tied
    back to the requirements/stories.
16. **Risks & Mitigations** — table.
17. **Reference Files** — grouped links (tracking docs; existing code to compose;
    related specs).

### Phase 4 — Bake in the handoff discipline

Inside the Engineering Plan, include a **Working Agreement** block instructing
the developer agent to:

- Branch off the default branch; never commit to it directly.
- Each turn, record findings/decisions/deviations in `{{CHANGELOG}}` under a new
  clearly-named phase heading, matching the existing log's style.
- Flip `- [ ]` → `- [x]` in the spec as tasks complete, every turn, keeping the
  checklist and the changelog in sync.
- Run the project's typecheck + lint + test gates after every change and never
  report a task done while any gate fails (discover the real commands; do not
  invent them).
- Reuse existing implementation — wrap, never reinvent — and cite the specific
  files to compose.
- Mark explicitly out-of-scope items as deferred tasks, not silent omissions.

### Diagram requirements (Mermaid — this is mandatory, not optional)

Model the system visually. Include **at least these five Mermaid diagrams**,
each fenced as ```` ```mermaid ````:

1. **Layer hierarchy** (`flowchart`) — where this module sits in the wider
   architecture, with the new module highlighted.
2. **Decision tree** (`flowchart`) — the core resolution/branching logic.
3. **Class/module diagram** (`classDiagram`) — modules, their key members, and
   relationships.
4. **Sequence diagram** (`sequenceDiagram`) — the runtime data/control flow,
   including the reactive/update loop.
5. **Application entrypoint & lifecycle** (`flowchart`) — from the top-level
   entrypoint through the modules handling each lifecycle stage.

Add a **component/wrapper diagram** when business logic is wrapped by
composition containers. Visually separate each module and the application flow —
the goal is that a reader understands the operating model from the diagrams
alone. Use consistent highlight styling for the focal module/output node.

**Diagram quality bar:** every diagram must be valid Mermaid that renders.
Avoid empty node/method names, balance brackets and `subgraph/end`, and prefer
`<br/>` for line breaks inside labels. After writing, re-read each diagram block
for syntax before finishing.

### Definition of done

- No transcripts or raw notes remain; every decision is stated as a decision.
- Every conflict from the source material is resolved and the resolution is
  visible in the spec.
- Data models are complete and collision-free; a developer could type them in
  verbatim.
- Every layer and module has an explicit responsible-for / must-NOT contract.
- All five+ required Mermaid diagrams are present and render cleanly.
- The Engineering Plan is a phased, checkbox task list with the Working
  Agreement, and out-of-scope work is captured as deferred tasks.
- The document reads as something that could ship as the project's final
  documentation once implementation is complete.

Do not begin implementing the feature. Produce only the packaged specification.

---

## Notes for the operator (not part of the prompt)

- This prompt was distilled from the Environment Engine packaging pass; that
  finished spec (`todo/EnvironmentEngine.md`) is the **reference exemplar** for
  the depth, section set, and diagram style expected here.
- If the rough plan is thin on a given section (e.g. no clear personas), the
  agent should infer reasonable ones from the domain and flag assumptions in an
  "Open Decisions" list rather than leaving the section empty.
- Keep the exemplar and this prompt in sync: when the spec format improves on a
  future project, fold the improvement back into both.
