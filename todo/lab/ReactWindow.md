# react-window — decline (we already have @tanstack/react-virtual)

| | |
|---|---|
| **Project** | Virtualize animated lists containing Liquid Glass elements |
| **Status** | Backlog |
| **Priority** | Low |
| **Tier** | Decline — redundant |
| **External dep** | `react-window` — **not needed** |
| **Target** | use existing `@tanstack/react-virtual` instead |
| **Note** | Source: external-tools review (the review itself flags we already have a virtualizer). |

---

## Recommendation: decline; use what we have

`@tanstack/react-virtual` v3.10.0 is already in
[package.json](/Users/kwaight/src/ai-conversations/web/package.json) and is a more
modern, headless virtualizer than `react-window`. Adding a second virtualization
library would be pure redundancy.

The real, valid task here is **not a new dependency** — it's: *virtualize animated
Liquid Glass lists with `@tanstack/react-virtual`*, ensuring virtualization
doesn't break enter/exit animations (virtualized items mount/unmount as they
scroll, which interacts with `AnimatePresence`).

## What to prototype (in src/lab, when relevant)

- A virtualized list of glass rows with Motion enter/exit, confirming animations
  behave as items recycle.

## Done when

- This is closed as "declined react-window," with any virtualized-animation
  findings folded into the relevant component work.
