# Expand @use-gesture — multi-touch beyond swipe (no new dependency)

| | |
|---|---|
| **Project** | Use the already-installed `@use-gesture/react` for pinch / rotate / multi-touch on Liquid Glass elements, not just swipe |
| **Status** | Backlog |
| **Priority** | **High** |
| **Tier** | No new dependency — pure usage expansion |
| **External dep** | none — `@use-gesture/react` v10.3.1 already in [package.json](/Users/kwaight/src/ai-conversations/web/package.json) |
| **Target** | prototype in [src/lab](/Users/kwaight/src/ai-conversations/web/src/lab) → fold into existing gesture usage |
| **Note** | Source: external-tools review. Ranked #1 because there is nothing to install or evaluate — the leverage is already in the stack. |

---

## Why

`@use-gesture/react` is already a dependency and already used for swipe-style
interactions. It also exposes `usePinch`, `useWheel`, `useScroll`, and the
combined `useGesture` recognizer — pinch-to-zoom, rotation, and multi-pointer
sequences — that we aren't using yet. This is the cheapest path to "advanced
touch" because it adds **zero** bundle weight and stays inside a library we've
already vetted.

## What to prototype (in src/lab)

- A pinch/rotate playground on a Liquid Glass surface, driving `framer-motion`
  motion values (the two compose cleanly: `@use-gesture` reads input, Motion
  animates output).
- A combined `useGesture` recognizer handling tap + hold + drag in one binding —
  the "complex touch sequence" use case the review assigns to hammer.js, done
  with the lib we already have.

## Decision criteria

- Confirm the combined recognizer covers the gesture sequences we'd otherwise
  reach for hammer.js to do (see [HammerJs.md](/Users/kwaight/src/ai-conversations/web/todo/lab/HammerJs.md)).
- Respect `prefers-reduced-motion` and the Environment Engine's `gestureOwner`
  signal — don't claim gestures the OS owns.

## Done when

- A lab story demonstrates pinch + rotate + a multi-step sequence on a glass
  element at 60fps, composing with Motion values.
- We've decided whether this closes out the hammer.js evaluation.
