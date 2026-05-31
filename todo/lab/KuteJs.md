# kute.js — alternative SVG morph engine (bake-off vs flubber)

| | |
|---|---|
| **Project** | Evaluate kute.js as the SVG morphing engine for Liquid Glass shape transitions |
| **Status** | Backlog |
| **Priority** | Low |
| **Tier** | Pick-one — direct alternative to flubber |
| **External dep** | `kute.js` (lightweight, includes its own tween loop) |
| **Target** | prototype in [src/lab](/Users/kwaight/src/ai-conversations/web/src/lab) only if flubber disappoints |
| **Note** | Source: external-tools review. Do **not** ship both this and flubber — they solve the same problem. |

---

## Why / caution

kute.js does path morphing with its own animation engine. That self-contained
tween loop is a double edge: convenient standalone, but it sits *outside*
Framer Motion's timeline, so it won't share our spring tokens or compose with
Motion values as cleanly as flubber (which gives us just an interpolator we feed
into Motion).

## Decision criteria

- Default to [flubber](/Users/kwaight/src/ai-conversations/web/todo/lab/Flubber.md)
  because it composes with our existing Motion stack. Only pursue kute.js if
  flubber's interpolation quality or dissimilar-path handling proves inadequate.
- If adopted, it must still respect our spring tokens and reduced-motion — verify
  its independent engine can be driven/paused accordingly.

## Done when

- A short note records the flubber-vs-kute decision (likely: flubber). If kute.js
  isn't pursued, close this without a prototype.
