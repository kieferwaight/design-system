# svg-path-properties — measure paths during morph animations

| | |
|---|---|
| **Project** | Compute SVG path length / point-at-length / bounding box for precise intermediate states during shape morphs |
| **Status** | Backlog |
| **Priority** | Medium |
| **Tier** | Small utility — only useful once morphing work starts |
| **External dep** | `svg-path-properties` (small, dependency-light) |
| **Target** | prototype in [src/lab](/Users/kwaight/src/ai-conversations/web/src/lab) → graduate alongside `adapters/motion/shape-morph/` |
| **Note** | Source: external-tools review. Gated behind [Flubber.md](/Users/kwaight/src/ai-conversations/web/todo/lab/Flubber.md) — no point adopting until a morph engine is chosen. |

---

## Why

Morphing and path-following animations need exact path math — total length,
point/​tangent at a given length, bounding box. `getTotalLength()` /
`getPointAtLength()` exist natively on rendered `<path>` elements, so this lib
earns its place only when we need those calculations **off-DOM** (on path strings
that aren't mounted) or in a worker.

## What to prototype (in src/lab)

- Sample N points along an interpolated morph path to position glass highlights /
  specular reflections that track the shape.
- Verify whether native `getPointAtLength` on an offscreen `<path>` is sufficient
  before adding the dep.

## Dependency decision

- Prefer the native SVG geometry API when the path is (or can be) mounted; adopt
  `svg-path-properties` only for off-DOM/string-based math.

## Done when

- A lab story positions elements along a morphing path accurately.
- A note records native-API-vs-lib, and the lib is only added if native fell short.
