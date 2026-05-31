# will-change automation — GPU hints for blur/morph animations

| | |
|---|---|
| **Project** | Apply `will-change` to animating Liquid Glass layers and remove it when idle, to avoid layout thrashing during blur/morph |
| **Status** | Backlog |
| **Priority** | Medium |
| **Tier** | Pattern — prefer doing it ourselves over a library |
| **External dep** | `will-change-css` proposed by the review — **likely unnecessary**; native + a small hook covers it |
| **Target** | prototype in [src/lab](/Users/kwaight/src/ai-conversations/web/src/lab) |
| **Note** | Source: external-tools review. Overlaps [PerformanceBlurAndGpu.md](/Users/kwaight/src/ai-conversations/web/todo/PerformanceBlurAndGpu.md) — coordinate; don't solve the same thing twice. |

---

## Why

`will-change` reserves GPU resources so the browser doesn't repaint/relayout
mid-animation, but leaving it set permanently *wastes* GPU memory. The correct
pattern is: add it on animation start, remove it on animation end. We already do
this manually in exactly one place
([primitives/input/Switch.tsx](/Users/kwaight/src/ai-conversations/web/src/primitives/input/Switch.tsx)).

## Dependency decision (lean: decline the lib)

A third-party `will-change` automation library is almost certainly not worth a
dependency. The same behavior is a ~10-line `useWillChange(ref, isAnimating)`
hook, or simply Framer Motion's own handling (Motion sets/clears `will-change`
during animations already). Prototype the hook in lab; adopt a lib **only** if it
demonstrably beats the trivial in-house version.

## What to prototype (in src/lab)

- A `useWillChange` hook that toggles the hint around a blur/morph animation and
  clears it on completion.
- Confirm whether Framer Motion already manages `will-change` for our animated
  glass surfaces, making even the hook redundant.

## Done when

- Blur/morph animations get a scoped, self-clearing `will-change`.
- A note records: in-house hook vs Motion-native vs the proposed lib (expected
  outcome: no new dependency).
