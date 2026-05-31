# Backdrop-Blur & GPU Budget — contain the expensive glass layers

| | |
|---|---|
| **Project** | Bound the cost of backdrop-blur / glass materials with CSS containment, a concurrent-blur budget, and reduced-motion/transparency fallbacks |
| **Owner** | ? |
| **Status** | Backlog |
| **Priority** | Medium-High |
| **Target layer** | [/Users/kwaight/src/ai-conversations/web/src/foundations/material](/Users/kwaight/src/ai-conversations/web/src/foundations/material), [/Users/kwaight/src/ai-conversations/web/src/primitives/surface](/Users/kwaight/src/ai-conversations/web/src/primitives/surface), [/Users/kwaight/src/ai-conversations/web/src/generated/css](/Users/kwaight/src/ai-conversations/web/src/generated/css) |
| **Parent initiative** | [/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md](/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md) |
| **Runtime** | CSS (generated) + React; verify in Storybook on a notched/low-power device profile |
| **Note** | Source: standout-features performance analysis. The system already *documents* backdrop blur as GPU-heavy (see [material/Material.mdx](/Users/kwaight/src/ai-conversations/web/src/foundations/material/Material.mdx)) but has no enforced budget. |

---

## 1. Executive Summary

`backdrop-filter` / blur is used across the material + surface layers
([primitives/surface](/Users/kwaight/src/ai-conversations/web/src/primitives/surface),
[generated/css/primitives.css](/Users/kwaight/src/ai-conversations/web/src/generated/css/primitives.css),
[generated/css/theme.css](/Users/kwaight/src/ai-conversations/web/src/generated/css/theme.css)).
Backdrop blur is one of the most expensive operations a browser can composite,
and the cost scales with the number of *concurrent* blur layers and the area
each covers.

Two gaps today:

1. **No CSS containment.** `grep` finds **zero** `contain:` declarations in
   `src`. Blur-heavy surfaces don't isolate their paint/layout, so invalidating
   one can force re-compositing of a larger subtree.
2. **No reduced-motion / reduced-transparency fallback for blur.**
   `prefers-reduced-motion` is referenced only in
   [environments/use-device.ts](/Users/kwaight/src/ai-conversations/web/src/environments/use-device.ts);
   it is not wired to suppress or flatten blur. There is no
   `prefers-reduced-transparency` handling at all.

`will-change: transform` is currently used in exactly one place
([primitives/input/Switch.tsx](/Users/kwaight/src/ai-conversations/web/src/primitives/input/Switch.tsx))
— a good pattern that should be applied deliberately (not blindly) to
animating glass layers.

## 2. Goals

- Apply CSS containment (`contain: layout paint` or `content`) to blur-bearing
  surfaces so their paint is isolated and can't thrash neighbors.
- Establish a **blur budget**: a documented, ideally enforced cap on the number
  of concurrent backdrop-blur layers, with a strategy for what degrades when the
  budget is exceeded (e.g. inner layers fall back to a solid/translucent fill).
- Honor `prefers-reduced-motion` and `prefers-reduced-transparency`: flatten
  blur to an opaque/translucent material when the user opts out.
- Use `will-change` only on layers that actually animate, and *remove* it when
  the animation ends (sticky `will-change` permanently reserves GPU memory).

## 3. Tasks

- [ ] Inventory every blur source: enumerate `backdrop-filter`/`blur()` usages in
      [generated/css](/Users/kwaight/src/ai-conversations/web/src/generated/css)
      and the material tokens that drive them.
- [ ] Add `contain:` to surface/material wrappers. Start with `contain: paint`
      (cheapest correctness risk) and validate nothing clips that shouldn't —
      `contain` establishes a new containing block and can affect fixed/absolute
      children and overflow.
- [ ] Define the blur-budget contract in
      [material/Material.mdx](/Users/kwaight/src/ai-conversations/web/src/foundations/material/Material.mdx)
      (how many stacked materials are allowed, and the degradation order).
      Decide whether enforcement is lint/test-time or runtime via the
      Environment Engine.
- [ ] Add a `@media (prefers-reduced-transparency)` and
      `@media (prefers-reduced-motion)` fallback that swaps blur for a solid/
      translucent material token. Reuse the existing material thickness scale.
- [ ] Audit `will-change`: confirm Switch's usage is scoped, and add/remove it on
      any animated glass surface via animation lifecycle, never as a static style.
- [ ] Validate on a low-power / notched device profile in Storybook and capture a
      compositing/paint trace before & after.

## 4. Cautions

- `contain: strict`/`size` can collapse intrinsic sizing — prefer `layout paint`
  / `content` and test every affected surface for clipping and scroll regressions.
- A global blur kill-switch is tempting but blunt; prefer per-layer degradation
  driven by the budget so the top-most glass still reads as glass.

## 5. Done when

- Blur layers are contained; a documented budget exists with a defined
  degradation path.
- Reduced-motion and reduced-transparency users get a non-blur material.
- Paint/compositing trace shows reduced cost with no visual regressions in
  `run-story-tests` / `preview-stories`.
