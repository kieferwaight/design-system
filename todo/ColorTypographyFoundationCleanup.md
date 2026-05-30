# Color & Typography Foundation Cleanup — remove refactor leftovers

| | |
|---|---|
| **Project** | Bring `foundations/color` + `foundations/typography` back onto the standard per-domain pattern after the Phase 3–4 refactor |
| **Owner** | ? |
| **Status** | Backlog |
| **Priority** | Medium |
| **Target layer** | [/Users/kwaight/src/ai-conversations/web/src/foundations/color](/Users/kwaight/src/ai-conversations/web/src/foundations/color), [/Users/kwaight/src/ai-conversations/web/src/foundations/typography](/Users/kwaight/src/ai-conversations/web/src/foundations/typography) |
| **Parent initiative** | [/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md](/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md) |
| **Runtime** | Storybook (CSF + addon-docs MDX); tokens are typed TS read by docs/stories |
| **Note** | Sub-pages are *sanctioned* by [foundations/AGENTS.md](/Users/kwaight/src/ai-conversations/web/src/foundations/AGENTS.md) (typography splits into Font/Weight/…; color adds Color Token + Collections). The cleanup below targets only genuinely abandoned files and dead/duplicated token data, **not** the multi-page split. |

---

## 1. Executive Summary

The Phase 3–4 refactor consolidated these two domains but left behind a
hand-transcribed reference doc, several dead/unconsumed token exports, and a
stale code comment. Every other foundation folder (`spacing`, `radius`,
`elevation`, `material`, `device`, `icon`) holds exactly the five-file pattern
from [foundations/AGENTS.md](/Users/kwaight/src/ai-conversations/web/src/foundations/AGENTS.md):

```
domain/
├── Domain.mdx          # narrative — imports & renders domain.ts
├── Domain.stories.tsx  # canvases — render from domain.ts
├── domain.ts           # tokens + metadata (source of truth)
├── domain.types.ts     # type contracts
└── index.ts            # barrel
```

`color` and `typography` carry extra files. Most are legitimate sanctioned
sub-pages; the items below are the ones that are **abandoned, dead, or
off-pattern** and should be removed, refactored, or aligned.

The two cardinal rules being violated are AGENTS.md's *"Never hand-write values
into `.mdx`/`.md`"* (one definition, docs read it) and the implicit *"don't ship
token data nothing consumes."*

---

## 2. Typography

### 2.1 Remove — `Apple-Typeography-Tokens.md` (abandoned, hand-transcribed)

[/Users/kwaight/src/ai-conversations/web/src/foundations/typography/Apple-Typeography-Tokens.md](/Users/kwaight/src/ai-conversations/web/src/foundations/typography/Apple-Typeography-Tokens.md)

- 174 lines of **hand-typed** Markdown tables of every text-style token, the
  macOS ramp, and all seven iOS Dynamic Type categories.
- This is the exact drift hazard AGENTS.md forbids: every value is duplicated
  from the real source of truth,
  [typography.ts](/Users/kwaight/src/ai-conversations/web/src/foundations/typography/typography.ts)
  (`TEXT_STYLES`, `DYNAMIC_TYPE`, `MACOS_STYLES`), where the docs/stories already
  read it.
- Referenced by **nothing** (no import, no `?raw`, no link). The filename is also
  misspelled ("Typeography") and `.md` doesn't render as a Storybook page.
- **Action:** delete. If any prose in it is worth keeping (e.g. the SF Pro / SF
  Mono blurb, the "avoid Ultralight/Thin/Light for small UI" guidance), fold it
  into `Typography.mdx` or a `description`/comment in `typography.ts` rather than
  a parallel table.

### 2.2 Keep (verified) — the multi-story split

`DynamicType / Font / MacOS / Numerals / Pairings / Size / TextStyles /
Variations / Weight` stories are **sanctioned** and the data-driven ones
(`DynamicType`, `MacOS`, `Pairings`, `Size`, `TextStyles`, `Weight`) already
import from `typography.ts`. No action. `Font` / `Numerals` / `Variations` are
CSS-feature showcases (no `typography.ts` tokens to render) — acceptable.

---

## 3. Color

### 3.1 Refactor — drop dead `oklchGenerativeScales` export

[color.ts:13–57](/Users/kwaight/src/ai-conversations/web/src/foundations/color/color.ts#L13-L57)

- ~45 lines of OKLCH seed/neutral/accent/status scale data.
- **Zero consumers** anywhere in `src` (no import, not rendered in any
  `.mdx`/`.stories.tsx`). It re-encodes the OKLCH math that already lives in
  `src/design/primitives.css`.
- `Color.mdx` admits it is for "the forthcoming **Liquid Glass** generative
  track" — i.e. premature/parked data, not live.
- **Action:** remove the export (and its `OklchGenerativeScales` / `OklchRung`
  types in [color.types.ts:97–114](/Users/kwaight/src/ai-conversations/web/src/foundations/color/color.types.ts#L97-L114))
  until Liquid Glass lands, **or** wire it into a doc/story so it's actually
  rendered. Don't keep unconsumed token data sitting in the source of truth.

### 3.2 Refactor — trim unconsumed `applePrimitives` fields

[color.ts:135–183](/Users/kwaight/src/ai-conversations/web/src/foundations/color/color.ts#L135-L183)

- Of the `ApplePrimitivePalette` object, only `systemColors` and `systemGrays`
  are consumed (by `Palette.stories.tsx` and `LabeledSwatch.stories.tsx`).
- `labels`, `fills`, `backgrounds`, `separators`, `link`, `materials`, `shadows`
  have **0 external references** — the live semantic layer is now driven by
  `semanticRoles` (Tier-2 `--color-*`), and `materials` duplicates the dedicated
  [material](/Users/kwaight/src/ai-conversations/web/src/foundations/material)
  foundation.
- These fields are populated only to satisfy the over-broad
  `ApplePrimitivePalette` interface
  ([color.types.ts:116–130](/Users/kwaight/src/ai-conversations/web/src/foundations/color/color.types.ts#L116-L130)).
- **Action:** either (a) narrow the interface + object to the consumed
  `systemColors`/`systemGrays`, or (b) make the docs/stories render the remaining
  fields so they earn their place. Pick one — don't leave them as dead duplicates
  of `semanticRoles` + `primitives.css`.

### 3.3 Clean up — stale "formerly model.ts" comment

[color.types.ts:1–4](/Users/kwaight/src/ai-conversations/web/src/foundations/color/color.types.ts#L1-L4)

- Header comment: *"Combines standard domain models (formerly model.ts) with
  central specifications."* The `model.ts` file no longer exists; this references
  a pre-refactor layout that will confuse future readers.
- **Action:** rewrite the comment to describe the file as-is; drop the historical
  "formerly" note.

### 3.4 Align (low) — base stories filename off-pattern

[/Users/kwaight/src/ai-conversations/web/src/foundations/color/Palette.stories.tsx](/Users/kwaight/src/ai-conversations/web/src/foundations/color/Palette.stories.tsx)

- Every other domain's base canvas file is `Domain.stories.tsx`
  (`Spacing.stories.tsx`, `Material.stories.tsx`, …). Color's is
  `Palette.stories.tsx` (title `Foundations/Color/Palette`), so there is no
  canonical `Color.stories.tsx` base page.
- The file's content is **good** — it reads everything from `color.ts` and uses
  `colorValue()` for conversions, no hand-typed channels.
- **Action (optional/low):** rename to `Color.stories.tsx` for pattern parity, or
  confirm "Palette" is the intended sub-page name and leave it. Cosmetic only.

### 3.5 Keep (verified) — sanctioned color sub-tree

`ColorModel.mdx` (Color Token model page), `collections/` (Catppuccin / Rosé Pine
+ `Collections.mdx`), and `color-value.ts` (the culori conversion util, used by
`ColorModel.mdx` and `LabeledSwatch.stories.tsx`) are all explicitly sanctioned
by [foundations/AGENTS.md](/Users/kwaight/src/ai-conversations/web/src/foundations/AGENTS.md)
and actively referenced. No action.

---

## 4. Suggested order

1. Delete `Apple-Typeography-Tokens.md` (§2.1) — pure removal, zero risk.
2. Fix the stale comment (§3.3) — trivial.
3. Remove `oklchGenerativeScales` + its types (§3.1) — verify no consumer first.
4. Trim/justify `applePrimitives` fields (§3.2) — the one design decision; touches
   the type contract.
5. (Optional) rename `Palette.stories.tsx` → `Color.stories.tsx` (§3.4).
6. After each change: `run-story-tests` (MCP) → `preview-stories`, then
   `pnpm run typecheck` + `pnpm run lint`.
