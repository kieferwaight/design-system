# AGENTS.md — data-portal web design system

Agent guide for the `web/` package. Read these in order before contributing:

1. **[README.md](README.md)** — stack, commands, layout, deployment, the layered architecture model and its layer responsibilities.
2. **[src/Overview.mdx](src/Overview.mdx)** — the catalog model: what each layer (Foundations → Adapters → Primitives → Components → Patterns → Environments → Examples) is for, the review path, and the status tags.
3. **This file** — how to write code, how to write documentation, and how to keep the two aligned.
4. **[src/foundations/AGENTS.md](src/foundations/AGENTS.md)** — the token data-model rules for the Foundations layer specifically. Read it before touching anything under `foundations/`.

Don't restate README/Overview content here — link to it. This file is about *authoring discipline*.

---

## The one rule

**Source code is the single source of truth. Documentation is generated *from* that code — never hand-transcribed beside it.**

Every token, value, name, and description lives once, in a typed TypeScript module (or a generated CSS file derived from one). Docs *import that module* and render it. When the code changes, the docs change with it — automatically, with no second edit and no chance of drift.

### DO

- Write documentation that **reuses the existing code** to show end users the design system. Storybook ships many blocks for embedding stories, TypeScript values, and source as code blocks, tables, color tables, etc. — use them.
- Define token metadata (name, description, usage, value) **as structured data in the `.ts` module**, so a doc page can map over it to build a table.
- Embed the actual source module into the doc when the values *are* the documentation (see the `?raw` pattern below).

### DON'T

- **Do not hand-write constants or raw values into `.mdx` files.** [color.ts](src/foundations/color/color.ts) declares each color token with a name, description, and value precisely so docs can import and render it. Transcribing those values into prose creates a maintenance chore, and the copy silently rots when the source changes — readers then trust a stale number.
- Do not document a value you could have imported. If you find yourself typing `16px` or `--color-bg` into MDX, stop and import the module instead.

**Litmus test before committing any doc:** *If an engineer changes a value in the `.ts`/`.css` source, does this doc update itself?* If no, you've hand-transcribed — rewrite it to import.

---

## How to write code

The layered architecture and per-layer responsibilities are defined in [README.md](README.md) and [src/Overview.mdx](src/Overview.mdx). Build bottom-up: foundations → adapters → primitives → components → patterns → environments. Beyond that:

- **Foundations are data, not visuals.** A foundation module exports plain typed objects/arrays. See [src/foundations/AGENTS.md](src/foundations/AGENTS.md) for the token data-model contract — it is the linchpin of the whole "docs stay aligned" guarantee.
- **Co-locate by domain.** Each domain/component folder owns its source, its types, its barrel `index.ts`, and its docs. Folder patterns are in [README.md](README.md) (Foundation, Provider, Package patterns).
- **Generated artifacts are reproducible and never hand-edited.** `src/generated/**` (CSS tiers, type maps) is derived from foundations — change the source, regenerate, don't patch the output.
- **External libraries hide behind `adapters/`.** Palettes, icon sets, motion, a11y — normalize them to our own model at the adapter boundary so provider names don't leak into the public API.
- **`archive/` is reference-only.** Never import from it into package source.

### Use CodeGraph before editing

A CodeGraph MCP index (`codegraph_*` tools) is configured. Use it for structural questions — where a symbol is defined, what calls it, what a change breaks — instead of grepping. If a tool reports the project isn't loaded, pass `projectPath: "/Users/kwaight/src/ai-conversations/web"`.

---

## How to write documentation

Storybook is the documentation engine. There are **two complementary doc surfaces**, and a healthy domain usually has both:

### 1. CSF stories — `*.stories.tsx`

The interactive canvases. A story file is also a documentation artifact:

- The **block comment on `meta`** becomes the component's autodocs description. The **block comment on each named export** becomes that story's caption. Write them as real prose — they are user-facing docs, not code comments. See [Swatch.stories.tsx](src/components/data/swatch/Swatch.stories.tsx) and [Material.stories.tsx](src/foundations/material/Material.stories.tsx).
- `args` + `argTypes` drive the **Controls** panel and the auto-generated props table. Define `component`, default `args`, and `argTypes` controls so the playground works (`Swatch.stories.tsx` is the model).
- **Render from the source data**, never from inlined copies — e.g. `Object.entries(spacing).map(...)` in [Spacing.stories.tsx](src/foundations/spacing/Spacing.stories.tsx), `MATERIAL_THICKNESSES.map(...)` in `Material.stories.tsx`. A new token appears in the story automatically.
- **Before writing or editing any `*.stories.*` file, call the `get-storybook-story-instructions` MCP tool** and follow it as the source of truth for imports and patterns. The essentials for this repo:
  - `import type { Meta, StoryObj } from "@storybook/react-vite";`
  - test helpers from `storybook/test` (not `@storybook/test`)
  - interactive components get **play functions** that drive the UI and assert visible outcomes.

#### Story example data: import it, don't invent it

A story's sample data is data too — the "one definition" rule applies to it. **Do not declare inline constants that duplicate values the design system already owns.** When you need example colors, names, sizes, or copy, import them from the foundation/mock source and derive what you need.

The trap looks harmless — a small literal at the top of a story file:

```ts
// ❌ duplicates color data we already define; rots silently, one more thing to track
const RGB = [
  { name: "Red",   value: "rgb(255 66 69)",  r: 255, g: 66,  b: 69 },
  { name: "Blue",  value: "rgb(0 145 255)",  r: 0,   g: 145, b: 255 },
  { name: "Green", value: "rgb(48 209 88)",  r: 48,  g: 209, b: 88 },
];
```

Those names and channel values already live in [color.ts](src/foundations/color/color.ts) (`applePrimitives.systemColors`). Import the source and convert — a different shape (hex vs rgb vs oklch) is **not** a reason to re-type the data, because [color-value.ts](src/foundations/color/color-value.ts) does the conversion:

```ts
// ✅ one source of truth; new system colors flow in automatically
import { applePrimitives, colorValue } from "@/foundations/color";

const RGB = (["red", "blue", "green"] as const).map((name) => {
  const value = applePrimitives.systemColors[name].default.dark;
  return { name: labelFor(name), value, ...colorValue(value).rgba }; // .hex / .oklch / .contrast also available
});
```

[LabeledSwatch.stories.tsx](src/components/data/swatch/LabeledSwatch.stories.tsx) is the worked example. The rule generalizes: reach for `mocks/` for realistic record data, foundations for tokens, and existing utilities (`colorValue`, `glyphRadius`, …) to reshape what's there. If a value truly doesn't exist yet, define it **once** in the appropriate source module and import it — never as a private literal inside a story.

### 2. MDX docs pages — `*.mdx`

The written, narrative docs (one `Overview` page per domain). Authored with Storybook's **Doc Blocks**, imported from `@storybook/addon-docs/blocks`. Every existing foundation MDX is a worked example — match them.

Two MDX modes:

- **Standalone doc page** — `<Meta title="Foundations/Spacing/Overview" />`. This is the repo's established pattern: a prose page that sits in the sidebar on its own. Used by every `*.mdx` today.
- **Attached doc page** — `<Meta of={SpacingStories} />` (import the `*.stories.tsx` default export). This binds the MDX to a story file so you can pull that file's `meta`/args/stories into the page with `of={...}` blocks (`<Description of>`, `<Canvas of>`, `<Controls of>`). Reach for this when you want one rich page that *embeds the live stories themselves* rather than just describing them.

### Autodocs

Storybook can auto-generate a docs page for a story file from its `meta` comment, `argTypes`, and stories. Enable it per file (or per story) with the **`autodocs`** tag:

```ts
const meta: Meta<typeof Swatch> = { title: "Components/Swatch", component: Swatch, tags: ["autodocs"] };
```

Tags also classify maturity (`experimental`, `stable`, `external`, … — see Overview.mdx); these are independent of `autodocs` and a story can carry a maturity tag freely. Autodocs is **not** globally enabled in [.storybook/preview.tsx](.storybook/preview.tsx), so a story only gets a docs page when it opts in via `autodocs` **or** a hand-written MDX is attached to it.

> **⚠️ `autodocs` and an attached MDX are mutually exclusive — pick exactly one docs source per story file.** A story file gets *one* docs page. You either let Storybook generate it (`tags: ["autodocs"]`) **or** you hand-write an MDX attached with `<Meta of={Stories} />`. Doing both makes Storybook try to create two docs pages for the same component and it **fails to index** with: *"You created a component docs page for 'X', but also tagged the CSF file with 'autodocs'. This is probably a mistake."*
>
> The decision is simple: **the moment you write a `Foo.mdx` with `<Meta of={...} />`, remove `autodocs` from `Foo.stories.tsx`** (keep only the maturity tag, e.g. `tags: ["experimental"]`). The attached MDX *is* the docs page — and it's strictly more capable, since you control the prose and choose which stories to embed with `<Canvas of>`. Reserve bare `autodocs` for files that have **no** sibling MDX and just want the default auto-generated page.

### Doc Blocks — what to reach for

All from `@storybook/addon-docs/blocks`:

| Block | Use it to | Notes |
| --- | --- | --- |
| `Meta` | Place the page in the sidebar (`title=`) or attach to a story (`of=`). | Required, once per MDX. |
| `Source` | Embed a code block. | Pair with a **`?raw`** import to show the *actual* source module — `import src from "./spacing.ts?raw"` then `<Source code={src} language="tsx" dark />`. This is our primary "values are the docs" pattern ([Spacing.mdx](src/foundations/spacing/Spacing.mdx), [Elevation.mdx](src/foundations/elevation/Elevation.mdx), [Icon.mdx](src/foundations/icon/Icon.mdx)). |
| `Canvas` | Embed a live, interactive story into the page. | `<Canvas of={Stories.Ramp} />` renders the running story inline — the way to put real components on a written page. |
| `Story` | Embed a single story without the canvas chrome. | `<Story of={Stories.Playground} />`. |
| `Controls` | Render the interactive props table for an attached story. | `<Controls of={Stories.Playground} />`. |
| `ArgTypes` | Render the props/args table statically. | Driven by `argTypes` + TS types. |
| `Description` | Pull a component's or story's JSDoc comment into the page. | Keeps the prose in the source comment, not duplicated in MDX. |
| `Typeset` | Show a type ramp (sizes/weights/sample). | Specialized typography block. |
| `ColorPalette` / `ColorItem` | Render a swatch table from color data. | Specialized color block — feed it from the color source objects. |
| `IconGallery` / `IconItem` | Render an icon grid. | Specialized icon block. |
| `Subtitle` / `Title` | Page heading helpers. | |

### The code-driven table pattern (use heavily)

When the values come from a JS object, **map over the imported object to build the table in JSX** — don't write the rows by hand. GFM Markdown tables are enabled ([.storybook/main.ts](.storybook/main.ts)) and are fine for *static prose* tables, but any table whose cells are token data must be generated:

```mdx
import { LAYER_RADII } from "./radius";

<table>
  <thead><tr><th>CSS Variable</th><th>Default</th><th>Usage</th></tr></thead>
  <tbody>
    {Object.entries(LAYER_RADII).map(([key, item]) => (
      <tr key={key}>
        <td><code>{item.token}</code></td>
        <td><code>{item.valuePx}px</code></td>
        <td>{item.description}</td>
      </tr>
    ))}
  </tbody>
</table>
```

Worked examples: [Radius.mdx](src/foundations/radius/Radius.mdx), [Material.mdx](src/foundations/material/Material.mdx), [Collections.mdx](src/foundations/color/collections/Collections.mdx). The `description` text in those tables lives in the `.ts` source — that's why the rule "metadata as structured data" matters.

### Putting it together — a single embedded doc page

The combined toolset lets one MDX page tell the whole story of a domain from live code:

```mdx
import { Meta, Description, Canvas, Controls, Source } from "@storybook/addon-docs/blocks";
import * as Stories from "./Material.stories";
import materialSrc from "./material.ts?raw";

<Meta of={Stories} />

# Material Foundation
<Description of={Stories} />          {/* the meta block-comment */}

## Live
<Canvas of={Stories.Ramp} />          {/* the running story, embedded */}

## Source of truth
<Source code={materialSrc} language="tsx" dark />
```

---

## Keeping code and documentation aligned — the contract

This is the whole point of the data-driven approach. The guarantees:

1. **One definition.** A token/value/description exists in exactly one `.ts` (or generated `.css`) module.
2. **Docs import, never copy.** MDX and stories import that module and render it (`?raw` source, JSX-mapped tables, `Object.entries(...)` story renders, `Description`/`Controls` blocks).
3. **Adding data updates docs for free.** A new entry in the source object appears in every page that maps over it — no doc edit required.
4. **A value change can never desync the docs**, because the docs read the value at build time.

When you add a foundation token or component prop, you are done when the source object carries its description and the doc imports it — *not* when you've typed the value into prose.

---

## Workflow & validation

Commands live in [README.md](README.md). The tight loop:

1. Edit source / stories / MDX.
2. `pnpm run sb:restart` to pick up changes (or it hot-reloads).
3. **After any component or story change**, call the **`run-story-tests`** MCP tool (focused runs while iterating, a broad pass before handoff) and fix failures before reporting done.
4. **After any story/component change**, call **`preview-stories`** and include every returned URL in your reply so the user can visually verify.
5. `pnpm run typecheck` and `pnpm run lint` before handoff.

To inspect existing docs/props instead of guessing: `list-all-documentation` → `get-documentation` (never invent prop names or IDs).

---

## Conventions

- **Co-location**: every component/doc has a sibling `*.stories.tsx` or `*.mdx`, picked up by the `stories` glob in [.storybook/main.ts](.storybook/main.ts).
- **Title = placement**: a story/MDX's sidebar location is its `title` (or attached story's title). Sidebar order is set in [.storybook/preview.tsx](.storybook/preview.tsx) `storySort`.
- **Icons are SF Symbols only** — never emoji or other icon fonts (org rule).
- **Status tags** (`stable` / `experimental` / `research` / `deprecated` / `external` / `migration`) communicate maturity — see Overview.mdx.
- **Imports**: Doc Blocks from `@storybook/addon-docs/blocks`; story types from `@storybook/react-vite`; test utils from `storybook/test`; raw source via Vite's `?raw` suffix.
