# react-spring — likely decline (redundant with Framer Motion)

| | |
|---|---|
| **Project** | Evaluate react-spring as a complement/alternative to Framer Motion for spring interactions |
| **Status** | Backlog |
| **Priority** | Low |
| **Tier** | Likely decline — redundant |
| **External dep** | `@react-spring/web` |
| **Target** | evaluation note only; no prototype unless a concrete gap appears |
| **Note** | Source: external-tools review. Recorded so the question isn't re-opened later. |

---

## Recommendation: decline unless a specific gap is found

We already standardize on `framer-motion` v12, and our spring presets live in
tokens (`--spring-snappy|smooth|bouncy|gentle`). Running two animation libraries
that both do spring physics means two mental models, two bundles, and competing
sources of truth for "what a spring feels like."

`react-spring` is excellent, but its strengths (imperative spring control,
`useSpring`/`useTrail`) are largely covered by Motion. Adopt it **only** if we hit
a concrete interaction Motion genuinely can't express — and document that exact
case here before adding the dependency.

## Done when

- This file records either a specific Motion limitation that justifies the dep, or
  a clear "declined — Framer Motion covers our spring needs." (Default: declined.)
