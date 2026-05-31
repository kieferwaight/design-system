# react-ios-pwa-navigation — evaluate cautiously (niche, maintenance risk)

| | |
|---|---|
| **Project** | iOS-style PWA navigation patterns (push/pop, back-swipe) for standalone mode |
| **Status** | Backlog |
| **Priority** | Low |
| **Tier** | Evaluate — verify the package before any dependency |
| **External dep** | `react-ios-pwa-navigation` (niche; confirm it exists, is maintained, and is licensed acceptably before trusting it) |
| **Target** | evaluation note; likely build in-house in [src/lab](/Users/kwaight/src/ai-conversations/web/src/lab) |
| **Note** | Source: external-tools review. The review also tied this to `gestureOwner === "app"`, which **no current profile sets** (all are `"os"`). |

---

## Why / strong caution

iOS-style PWA navigation (push/pop stack, edge-back-swipe, standalone-mode
chrome handling) is real and desirable, but a small single-purpose package is a
maintenance and supply-chain risk for a long-lived design system. **Verify the
package's existence, maintenance, downloads, and license before adding it** — do
not assume from the name.

Most of this is achievable in-house from pieces we already have:
- [View Transitions](/Users/kwaight/src/ai-conversations/web/todo/lab/ViewTransitions.md)
  for the push/pop animation.
- `@use-gesture/react` for edge-back-swipe.
- The Environment Engine's `displayMode` (standalone vs browser) and a future
  `gestureOwner: "app"` decision to know when the app owns the back gesture
  (note: **no profile sets `"app"` today** — that's a deliberate change, see
  [_Index.md](/Users/kwaight/src/ai-conversations/web/todo/lab/_Index.md)).

## Decision criteria

- Prefer composing View Transitions + @use-gesture + Environment signals over a
  niche dependency. Only adopt the package if it clearly outperforms the in-house
  composition and passes the maintenance/license check.

## Done when

- A note records: in-house composition vs the package (with the package's
  maintenance/license findings), and whether a `gestureOwner: "app"` profile value
  is warranted.
