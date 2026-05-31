# geometric — 2D geometry helpers for merge-position math

| | |
|---|---|
| **Project** | 2D geometry calculations (points, lines, angles, centroids) to position elements during merge/layout animations |
| **Status** | Backlog |
| **Priority** | Low |
| **Tier** | Small utility — niche |
| **External dep** | `geometric` (tiny, pure functions, no deps) |
| **Target** | prototype in [src/lab](/Users/kwaight/src/ai-conversations/web/src/lab) |
| **Note** | Source: external-tools review. Cheap to add but only earns a place if morph/merge math actually needs it. |

---

## Why / caution

`geometric` is a small pure-function geometry kit (centroid, angle, distance,
intersection). Useful for computing where two merging glass elements should meet.
But this is a handful of formulas we may already inline — don't add a dependency
for a one-off `Math.hypot` / midpoint.

## Decision criteria

- Adopt only if the morphing/merge work (see
  [Flubber.md](/Users/kwaight/src/ai-conversations/web/todo/lab/Flubber.md)) needs
  more than two or three trivial geometry helpers.
- Otherwise inline the math and close this.

## Done when

- Merge-position math works in a lab story; a note records lib-vs-inline (default:
  inline unless the helper count grows).
