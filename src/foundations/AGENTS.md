# AGENTS.md — Foundations

The Foundations layer is the **source of truth** for the design system's design data: color, typography, spacing, radius, elevation, material, icon, and device contracts. Everything above it (adapters, primitives, components, patterns) composes from here.

Read the package-wide authoring rules in [../../AGENTS.md](../../AGENTS.md) first — this file is the foundations-specific contract. The catalog model and review path are in [../Overview.mdx](../Overview.mdx).

---

## The core rule: tokens are typed data, docs are generated from them

A foundation is **data, not visuals**. Each domain exports plain, typed TypeScript objects/arrays — and that data carries its own metadata (names, descriptions, usage notes) so that **documentation can import the module and render it**, instead of anyone hand-transcribing values into prose.

This is the mechanism that keeps code and docs aligned: there is one definition, the docs read it, and a change to the source propagates to every page automatically.

### Define metadata as structured data

When you add or update a token — color, font value, spacing step, CSS value — attach its description and usage **in the object itself**, not in an MDX file. Two shapes are in use:

- **A typed array of descriptor objects**, when each token needs rich metadata. See [color.ts](color/color.ts) → `semanticRoles: SemanticRole[]`, where each entry is `{ tokenName, description, value }`. The `description` field exists *so the docs can render it* ([color.types.ts](color/color.types.ts) documents that intent on the type).
- **A keyed record with inline metadata**, for simpler scales. See `LAYER_RADII` / `MATERIALS` (each value carries `token`, `valuePx`/`className`, `description`).

For a plain scale where the *values themselves* are the documentation, a simple `as const` object with code comments is enough — the doc embeds the source verbatim (below). See [spacing.ts](spacing/spacing.ts).

### Never hand-write values into `.mdx`

Do not type `16px`, `--color-bg`, or a description string into an MDX file. Import the module and render it. If you're typing a token value into prose, you've created drift waiting to happen — readers will trust a number that the source has since changed.

The same rule covers **example data in stories** — don't redeclare a foundation's values as a private literal to seed a story. A differing shape is no excuse: [color-value.ts](color/color-value.ts) (`colorValue(x)` → `.hex` / `.rgba` / `.oklch` / `.contrast`) converts between representations, so a hex source feeds an rgb caption with one call. Import `applePrimitives` and convert, rather than re-typing channels. See the story-data guidance in [../../AGENTS.md](../../AGENTS.md).

---

## Per-domain folder pattern

```
domain/
├── Domain.mdx          # narrative doc page — imports & renders domain.ts
├── Domain.stories.tsx  # interactive canvases — render from domain.ts
├── domain.ts           # the tokens + their metadata (source of truth)
├── domain.types.ts     # the type contracts for that data
└── index.ts            # barrel: export * from both
```

Some domains add more pages (typography splits into Font / Weight / Size / … stories; color adds a Color Token model page and a Collections sub-tree). Keep one page per concept; render every page from the source module.

---

## Documenting a foundation — the three patterns

All blocks import from `@storybook/addon-docs/blocks`. The full Doc Blocks catalog and the CSF story rules are in [../../AGENTS.md](../../AGENTS.md). The three patterns that recur in this layer:

1. **Embed the source module** when the values *are* the docs — `import src from "./spacing.ts?raw"` then `<Source code={src} language="tsx" dark />`. See [spacing/Spacing.mdx](spacing/Spacing.mdx), [elevation/Elevation.mdx](elevation/Elevation.mdx), [icon/Icon.mdx](icon/Icon.mdx).

2. **Generate the table from the data** when you want a formatted reference — `import` the object and `.map(...)` it into `<tr>` rows, pulling `description` straight from the source. See [radius/Radius.mdx](radius/Radius.mdx), [material/Material.mdx](material/Material.mdx), [color/collections/Collections.mdx](color/collections/Collections.mdx).

3. **Render the live tokens in a story** — the `*.stories.tsx` renders by iterating the source object (`Object.entries(spacing)`, `MATERIAL_THICKNESSES.map(...)`), so a new token shows up in the canvas with zero story edits. See [spacing/Spacing.stories.tsx](spacing/Spacing.stories.tsx), [material/Material.stories.tsx](material/Material.stories.tsx). You can also embed those stories into an MDX page with `<Canvas of={...} />`.

Foundation stories should be **code-driven and token-driven** — they explain the source data, not act as visual-only showcases (Overview.mdx).

---

## Checklist for adding / changing a foundation token

1. Add the token + its metadata (description, usage, value) to `domain.ts`; update `domain.types.ts` if the shape changed.
2. If it backs a CSS custom property, update the generating source so `src/generated/css/*` regenerates — never hand-edit generated CSS.
3. **Do not touch the MDX or stories to add the value** — confirm they already import/iterate the source, so the new token appears automatically. If a doc *doesn't* yet read from source (a legacy hand-written value), fix that: replace the literal with an import.
4. Run `run-story-tests` (MCP), then `preview-stories`, and share the URLs.
5. `pnpm run typecheck` + `pnpm run lint`.

You are done when the source object carries the new token's metadata and the docs render it without any value typed by hand.
