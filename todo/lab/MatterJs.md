# matter-js — 2D physics for organic glass merging

| | |
|---|---|
| **Project** | Use a 2D physics engine for realistic, organic Liquid Glass merging / settling animations |
| **Status** | Backlog |
| **Priority** | Low |
| **Tier** | Speculative — heavy; only for genuinely physical behavior |
| **External dep** | `matter-js` (full physics engine — significant bundle + runtime cost) |
| **Target** | prototype in [src/lab](/Users/kwaight/src/ai-conversations/web/src/lab) |
| **Note** | Source: external-tools review. Lowest-leverage of the morphing set: a whole physics engine for what spring tokens may already approximate. |

---

## Why / caution

`matter-js` simulates rigid-body physics — collisions, gravity, constraints. It
could make glass blobs merge and settle "organically," but:

- It's a **large** dependency with a continuous simulation loop (battery/CPU on
  mobile — exactly the devices we target).
- Our existing spring presets (`--spring-snappy|smooth|bouncy|gentle`) +
  Framer Motion already produce convincing settle/bounce for most UI. Real
  rigid-body physics is overkill unless we need true collision/fluid behavior.

## Decision criteria

- Only pursue if a spring-based prototype demonstrably *can't* achieve the desired
  organic merge. Try springs first.
- If prototyped, sandbox it hard (one canvas, paused when offscreen, killed under
  reduced-motion) and measure mobile frame/battery cost before any graduation.

## Done when

- A note records whether springs suffice (expected: yes for most cases). A
  matter-js prototype is built only if springs provably fall short.
