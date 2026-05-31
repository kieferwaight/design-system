# auto-animate — zero-config layout animations for reordering

| | |
|---|---|
| **Project** | Smooth FLIP animations when nav/list items reorder, add, or remove (e.g. search expand/collapse) with one hook |
| **Status** | Backlog |
| **Priority** | **High** |
| **Tier** | Tiny / zero-config |
| **External dep** | `@formkit/auto-animate` (small, framework-agnostic, MIT) |
| **Target** | prototype in [src/lab](/Users/kwaight/src/ai-conversations/web/src/lab) → graduate to `adapters/motion/layout-animations/` |
| **Note** | Source: external-tools review. Ranked high because it's a single hook with effectively no API surface to evaluate. |

---

## Why

`@formkit/auto-animate` adds FLIP animations to a container's direct children with
one `useAutoAnimate()` hook — no per-item wiring. It's the cheapest possible win
for "navigation items animate when search expands/collapses." Framer Motion's
`layout` prop can also do this, so the real question is ergonomics, not
capability.

## What to prototype (in src/lab)

- A nav/list that reorders + adds/removes items, wrapped once with the hook.
- The same list done with Framer Motion `layout` for a side-by-side comparison.

## Dependency decision (this is the crux)

We already have `framer-motion`, whose `layout`/`AnimatePresence` covers most of
auto-animate's job. Adopt auto-animate **only if** it's meaningfully simpler for
the common reorder case *and* the extra dependency is justified versus reusing
Motion. If Motion's `layout` is "good enough," record that and close this — don't
add a second animation lib for marginal ergonomics.

## Done when

- A lab story shows reorder/add/remove animating smoothly.
- A clear verdict: adopt `@formkit/auto-animate`, or use Framer Motion `layout`
  and decline the dep — with the reasoning written down.
