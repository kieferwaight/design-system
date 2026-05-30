# TypeDoc + Storybook Documentation — Audit Synthesis & Improvement Plan

| | |
|---|---|
| **Project** | TypeDoc + Storybook documentation alignment |
| **Owner** | Design System / Platform |
| **Status** | Backlog |
| **Priority** | Low |
| **Target layer** | [typedoc.json](/Users/kwaight/src/ai-conversations/web/typedoc.json) · `src/**` doc comments · `.storybook/` |
| **Parent initiative** | [Design System Folder Refactor](/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md) |
| **Progress log** | [refactor-changelog-notes.md](/Users/kwaight/src/ai-conversations/web/refactor-changelog-notes.md) |
| **Runtime** | Vite + React 19 + Storybook · Safari / Apple ecosystem only · PWA-first |
| **Note** | Parked behind higher-priority pipeline work. Analysis is complete and retained here verbatim — circle back after the current todo pipeline clears. |

---

## Goals driving this work

> **Synthesis** of an external agent's TypeDoc audit (preserved in full at the
> end of this file) cross-referenced against the actual repo: the Storybook
> teaching layer, the `package.json` publish state, and the
> [AGENTS.md](../AGENTS.md) "source code is the single source of truth" rule.

1. An agent can quickly analyze symbols across the codebase.
2. Storybook can expose public API information leveraged by consumers of the
   React component NPM package.
3. Full coverage of components and TypeScript information.

---

## What the original review didn't know

The external agent reviewed the generated [docs/](../docs/) HTML in isolation.
Three pieces of repo context reframe its conclusions:

1. **Storybook is already the mature, intent-organized teaching layer** — 29
   stories + 31 MDX pages, autodocs, a curated `storySort`, the Storybook MCP
   addon (`@storybook/addon-mcp`), and a written authoring doctrine in
   [AGENTS.md](../AGENTS.md). The review's "make Storybook the teaching layer"
   is already true; the real question is how to **bind** it to TypeDoc.

2. **This is not yet a publishable package.** [package.json](../package.json) is
   `"private": true` with **no `main` / `module` / `types` / `exports` /
   `files`**, and there is **no public API barrel** — [src/main.tsx](../src/main.tsx)
   is a PWA placeholder, not a library entry. Goal #2 ("consumers of the NPM
   package") is currently aspirational, and the missing barrel is *also the root
   cause* of the TypeDoc mess.

3. **Agents already have two structural indexes** the review didn't account for:
   **CodeGraph** (call graph / symbols) and the **Storybook MCP**. So goal #1 is
   partly solved — TypeDoc's job for agents is the *type + doc-comment* layer
   those don't fully provide.

A governing principle is already written down in
[AGENTS.md](../AGENTS.md): **"Source code is the single source of truth.
Documentation is generated from that code."** Everything below hangs off that
rule, extended from token values to types.

---

## The original conclusions, triaged

| Conclusion | Verdict | Grounding |
|---|---|---|
| Docs organized by module *topology*, not intent | ✅ **Valid** | [typedoc.json](../typedoc.json) uses `entryPoints: ["src"]` + `entryPointStrategy: "expand"` → globs every file, hence `primitives/box`, `primitives/box/Box`, `primitives/box/box.types` |
| Noisy modules pollute top level (`vite-env`, `testing`, `lib`, `*.types`) | ✅ **Valid** | Confirmed: `docs/modules/vite-env.html`, `testing.html`, `lib_cn.html`, `*.types.html` all top-level |
| Add package-level `@group` grouping | ✅ **Valid** | **0** occurrences of `@group`/`@category`/`@module`/`@packageDocumentation` in `src/` |
| Primitives need module/symbol comments | ✅ **Valid** | [Box.tsx](../src/primitives/box/Box.tsx) `Box` has *no* TSDoc; `resolveBg`/`resolveBorder`/etc. are exported with *zero* docs |
| TypeDoc = reference index, Storybook = teaching layer | ✅ **Valid & already the architecture** | — |
| "Hide/demote noisy modules" | ⚠️ **Adjust** | Right for human HTML, but goal #1 wants agents to see *all* symbols — demote in HTML, don't drop from coverage; keep a full JSON emit |
| "Configure around `entryPoints: ["src/main.ts"]`" | ❌ **Premise wrong** | `main.tsx` is a placeholder app. A real public barrel must exist **first** |
| "Link TypeDoc from Storybook, not the reverse" | ⚠️ **Underspecified** | Direction is right but the real mechanism is single-source-of-truth via TSDoc + the barrel (below) |

---

## The unifying model: one source of truth → four surfaces

The two systems should be two *renderers* of the same TSDoc comments — the
[AGENTS.md](../AGENTS.md) rule extended to types:

```
TSDoc on exported symbols + props interfaces   ← the single source
        │
        ├─► TypeDoc HTML        →  human API reference (consumers)
        ├─► TypeDoc JSON        →  agent/machine symbol map (goal #1)
        ├─► Storybook autodocs  →  ArgTypes / Controls prop tables (goal #2)
        └─► IDE hover (tsserver) →  free, in-editor
```

The **keystone is a curated public barrel** (`src/index.ts`, plus per-layer
subpath barrels). It simultaneously:

- defines the npm `exports` surface (**goal #2**),
- becomes TypeDoc's single `entryPoint` — which *collapses* the filesystem noise
  the review flagged (**TypeDoc fix**),
- defines what "100% coverage" even means (**goal #3** = every export is
  documented).

**One nuance to decide.** Today component descriptions live on the **story
`meta` comment** ([Box.mdx](../src/primitives/box/Box.mdx) uses
`<Description of={Stories}>`), while prop descriptions live on the **interface**
([box.types.ts](../src/primitives/box/box.types.ts)). For TypeDoc to be a real
reference, the *symbol-level* description must live on the symbol (the
component / function), with the story comment pulling *from* it — not the other
way around.

---

## Recommendations, mapped to the three goals

### First, unblock everything — Goal #2 (make it a real package)

1. **Create the public barrel(s).** A top-level `src/index.ts` (none exists
   today) aggregating the per-domain barrels that already exist (e.g.
   [src/primitives/box/index.ts](../src/primitives/box/index.ts)). Explicitly
   decide public vs internal — e.g. are `resolveBg`/`resolveBorder`/`resolveShadow`
   public API or internals? Right now `export * from "./Box"` leaks them.
2. **Add the `exports` map** to package.json (`main`/`module`/`types`, and
   subpath exports like `data-portal-web/foundations`, `/primitives`),
   `sideEffects` (the `generated/css` imports matter here), and `files`.
3. **Emit `.d.ts`** (`vite-plugin-dts` or `tsc --emitDeclarationOnly`) so
   consumers and TypeDoc both consume resolved declarations.

### Goal #1 — agents analyzing symbols

4. **Emit TypeDoc JSON** (`typedoc --json docs/api.json`) alongside HTML — a
   machine-readable map of every symbol with *resolved types + doc comments*,
   which CodeGraph (AST) and Storybook MCP don't fully give.
5. **Position the three indexes**: CodeGraph = call/structure graph; TypeDoc
   JSON = type + doc layer; Storybook MCP = component usage/stories. Note this in
   [AGENTS.md](../AGENTS.md) so agents know which to reach for.
6. **Two-tier TypeDoc** if internal coverage matters: (a) public doc from the
   barrel for humans/consumers; (b) optional full JSON from `expand` for agents
   needing internals (or just rely on CodeGraph for internals).

### Goal #3 — full coverage + enforcement

7. **Turn on TypeDoc validation**: `validation.notDocumented: true`,
   `requiredToBeDocumented`, and `--treatWarningsAsErrors` in CI → the build
   fails when a public export lacks a doc comment.
8. **Drop `skipErrorChecking: true`** ([typedoc.json](../typedoc.json)) once the
   barrel is clean — it currently masks type errors during doc generation.
9. **Backfill the missing TSDoc** — component-level blocks on `Box`, `Button`,
   etc., and on exported helpers; add `@packageDocumentation` to each barrel.
10. **Story-per-export coverage check** — a small test (the Vitest `storybook`
    project already exists) asserting every public component in the barrel has a
    story + `autodocs`. Autodocs is opt-in, not global, so this catches gaps.

### The TypeDoc config rewrite (replaces current)

- `entryPoints: ["src/index.ts"]` (+ subpath barrels),
  `entryPointStrategy: "resolve"` → kills the `primitives/box/box.types`
  topology noise
- `@group` tags + `categorizeByGroup` → the Foundations / Primitives /
  Components / Adapters / Environments nav the review mocked up
- `@internal` + `excludeInternal: true` for the resolver helpers and `lib`
- emit **both** HTML and JSON; `sort: ["source-order"]`

### Binding Storybook ↔ TypeDoc (the relationship)

- Make **TSDoc the canonical prop docs** — Storybook autodocs
  `ArgTypes`/`Controls` already read them; never hand-write a prop table in MDX
  (matches the [AGENTS.md](../AGENTS.md) litmus test).
- Add an **"API Reference" section** to each component MDX deep-linking to that
  symbol's TypeDoc page (URLs get clean after the barrel refactor).
- **Co-host** the TypeDoc build under the Storybook static output (e.g.
  `dist/storybook/api`) so one deploy serves both, and link it from the
  Storybook sidebar.

---

## Sequencing

| Phase | Work | Payoff |
|---|---|---|
| **Quick wins (hours)** | `@group` + `categorizeByGroup`, `@internal`, exclude noise, validation flags, JSON emit | ~70% of the "build artifact" feel gone; agent JSON map available |
| **Structural (the real value)** | public barrel → npm `exports` → `.d.ts` → TSDoc-as-single-source binding + CI coverage gate | Unblocks goal #2 entirely; makes goal #3 enforceable |

**Bottom line:** the original audit is a solid surface read; its main blind spot
is that the fix it proposes (`entryPoints: ["src/main.ts"]`) can't work until
the public barrel exists — and that same barrel is the thing that makes this a
real package.

---

## Appendix: original external review (preserved verbatim)

````markdown
## Current TypeDoc State

You now have a useful **symbol map**, but not yet a useful **documentation experience**.

## What It Shows Well

### Public API surface is visible

You can now see exports grouped under:

```txt
adapters
components
environments
foundations
generated
lib
patterns
primitives
testing
```

This is good for auditing what the package exposes.

### Component primitives are discoverable

The `primitives/box` page shows the right API cluster:

```txt
Box
BoxProps
BoxSpacing
BoxBorderDirection
resolveBg
resolveBorder
resolveRadius
resolveShadow
resolveSpacingStyles
```

That tells us `Box` is not just a component. It is the primitive layout/surface resolver.

### Foundations are dense but coherent

The foundations layer exposes:

```txt
color
device
elevation
icon
material
radius
spacing
typography
```

That is the correct structure for a design system.

## Main Problem

The docs are currently organized by **source/module topology**, not by **developer intent**.

For example:

```txt
primitives/box
primitives/box/Box
primitives/box/box.types
```

This is technically accurate, but a reader wants:

```txt
Box
├── Usage
├── Props
├── Spacing
├── Background
├── Radius
├── Border
├── Shadow
└── API Reference
```

## What This Reveals About Your System

Your design system has four layers:

```txt
1. Foundations
   Raw design language: color, type, radius, material, elevation, device

2. Generated Tokens
   Machine-generated token accessors and normalized constants

3. Primitives
   Low-level layout and rendering components: Box, Stack, Grid, Surface

4. Components
   More semantic UI pieces: Avatar, Swatch, Shape
```

Adapters sit beside foundations:

```txt
External palette source
        ↓
Adapter
        ↓
Normalized PaletteCollection
        ↓
Foundation color system
        ↓
Components / primitives
```

## What Should Change

### 1. Hide or demote noisy modules

These should not be prominent in TypeDoc:

```txt
vite-env
testing
lib/cn
lib/date
generated/types/*
*.types
```

Keep them searchable, but not top-level docs.

### 2. Treat `primitives/*` as public API pages

Each primitive should have a stronger module comment:

```ts
/**
 * Layout and surface primitive for applying design-system spacing,
 * background, border, radius, and shadow tokens.
 *
 * Use Box when you need token-aware styling without introducing
 * semantic component behavior.
 */
```

### 3. Add package-level grouping

Ideal TypeDoc nav:

```txt
API Reference

Foundations
  Color
  Typography
  Radius
  Elevation
  Material
  Device

Primitives
  Box
  Stack
  Grid
  Surface
  Button
  Chip
  Icon
  Skeleton

Components
  Avatar
  Swatch
  LabeledSwatch
  Shape

Adapters
  ColorAdapter
  CatppuccinAdapter
  RosePineAdapter
```

### 4. Link TypeDoc from Storybook, not the reverse

Storybook page:

```mdx
# Box

Use Box as the lowest-level token-aware layout primitive.

<Canvas />

## API Reference

- Box
- BoxProps
- BoxSpacing
- BoxBorderDirection
```

TypeDoc page:

```txt
BoxProps
Full prop signature
Property descriptions
Return values
```

## Best Immediate Fix

Your TypeDoc is exposing too much filesystem shape.

Configure TypeDoc around package entrypoints and groups:

```json
{
  "entryPoints": ["src/main.ts"],
  "entryPointStrategy": "resolve",
  "excludeInternal": true,
  "excludePrivate": true,
  "excludeProtected": true,
  "categorizeByGroup": true,
  "sort": ["source-order"]
}
```

Then use `@group` tags:

```ts
/**
 * @group Primitives
 */
export const Box = ...

/**
 * @group Foundations
 */
export const spacing = ...

/**
 * @group Adapters
 */
export class CatppuccinAdapter ...
```

## Bottom Line

You have a solid API surface, but the generated docs currently read like a build artifact.

The next step is to make TypeDoc a **clean reference index** while Storybook/MDX remains the **teaching layer**.
````
