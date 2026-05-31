# flubber — SVG shape morphing for Liquid Glass merges

| | |
|---|---|
| **Project** | Smooth path interpolation to morph Liquid Glass shapes — e.g. circular buttons merging, a search input absorbing an icon |
| **Status** | Backlog |
| **Priority** | Medium |
| **Tier** | Useful — the core of the Liquid Glass shape-merge idea |
| **External dep** | `flubber` (pulls d3-interpolate-ish deps; verify bundle weight before adopting) |
| **Target** | prototype in [src/lab](/Users/kwaight/src/ai-conversations/web/src/lab) → graduate to `adapters/motion/shape-morph/` |
| **Note** | Source: external-tools review. Medium, not high: the Liquid Glass *generative* track isn't live yet (the parked `oklchGenerativeScales` data in `foundations/color` is evidence), so this is foundational R&D, not a quick win. |

---

## Why

`flubber` interpolates between two SVG paths even when their point counts /
structures differ — best-in-class for the "two glass blobs merge into one" effect.
Framer Motion can animate a single morphing `d` attribute, but it won't *compute*
the in-between paths for dissimilar shapes; flubber fills exactly that gap.

## What to prototype (in src/lab)

- Two circular glass buttons morphing into one merged shape and back, driving the
  interpolated `d` through a Motion value so spring tokens still apply.
- A search field absorbing/expelling an icon glyph.

## Dependency decision

- Compare against [kute.js](/Users/kwaight/src/ai-conversations/web/todo/lab/KuteJs.md)
  — **pick one morphing engine, not both.** This todo + KuteJs are a bake-off.
- Check flubber's transitive deps and bundle cost; it's not tiny. Justify the
  weight against how central shape-merge actually is to the roadmap.
- Pairs with [svg-path-properties](/Users/kwaight/src/ai-conversations/web/todo/lab/SvgPathProperties.md)
  for measuring intermediate states.

## Done when

- A lab story morphs two glass shapes at 60fps with spring timing.
- A bake-off verdict (flubber vs kute.js) is recorded with bundle + API notes.
