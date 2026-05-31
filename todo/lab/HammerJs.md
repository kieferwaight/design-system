# hammer.js — likely decline (unmaintained; overlaps @use-gesture)

| | |
|---|---|
| **Project** | Evaluate hammer.js for complex multi-touch gesture sequences |
| **Status** | Backlog |
| **Priority** | Low |
| **Tier** | Likely decline |
| **External dep** | `hammerjs` |
| **Target** | evaluation note only |
| **Note** | Source: external-tools review. Superseded by expanding @use-gesture — see [ExpandUseGesture.md](/Users/kwaight/src/ai-conversations/web/todo/lab/ExpandUseGesture.md). |

---

## Recommendation: decline

- **Maintenance:** hammer.js is effectively unmaintained (no meaningful releases in
  years), which is a poor fit for a long-lived design system.
- **Overlap:** the tap/hold/drag and multi-touch sequences the review wants it for
  are achievable with `@use-gesture/react`'s combined `useGesture` recognizer,
  which we already ship and which composes with Framer Motion.

Close this once [ExpandUseGesture.md](/Users/kwaight/src/ai-conversations/web/todo/lab/ExpandUseGesture.md)
confirms @use-gesture covers the target gesture sequences.

## Done when

- The @use-gesture expansion demonstrates the needed sequences, and this is closed
  as declined — or a specific gesture @use-gesture can't do is documented here.
