# View Transitions — implement the unused `transition` profile signal

| | |
|---|---|
| **Project** | iOS-style push/pop + shared-element navigation via the native View Transitions API, wired to the per-profile `transition` signal |
| **Status** | Backlog |
| **Priority** | **High** |
| **Tier** | Native API / thin wrapper |
| **External dep** | optional: `react-view-transitions` (thin) — or use the native `document.startViewTransition` directly, zero-dep |
| **Target** | prototype in [src/lab](/Users/kwaight/src/ai-conversations/web/src/lab) → graduate to `adapters/motion/view-transitions/` |
| **Note** | Source: external-tools review. Ranked high because the hook already exists in the system and is currently dead. |

---

## Why

The Environment Engine already publishes a navigation `transition` per profile —
`"ios-slide" | "fade-scale" | "none"`
([environment.types.ts:11](/Users/kwaight/src/ai-conversations/web/src/environments/environment.types.ts#L11);
[ios.ts](/Users/kwaight/src/ai-conversations/web/src/environments/profiles/ios.ts)
sets `ios-slide`, [ipad.ts](/Users/kwaight/src/ai-conversations/web/src/environments/profiles/ipad.ts)
sets `fade-scale`, [desktop.ts](/Users/kwaight/src/ai-conversations/web/src/environments/profiles/desktop.ts)
sets `none`) — but **nothing consumes it**. The native View Transitions API is the
natural implementation: browser-driven, GPU-composited, 60fps, with shared-element
("morph") support that matches Liquid Glass.

## What to prototype (in src/lab)

- A minimal router/stack that calls `document.startViewTransition()` on navigate
  and picks the named transition from the active profile's `transition` value.
- A shared-element transition (`view-transition-name`) between a list row and its
  detail view — the iOS push "hero" feel.
- Reduced-motion: fall back to `transition: "none"` when the user opts out.

## Dependency decision

- Start **zero-dep** with the native API; only pull `react-view-transitions` if
  the React-lifecycle ergonomics (interrupting/queuing transitions across
  renders) prove fiddly. Document the choice either way.
- Feature-detect `startViewTransition`; degrade gracefully on unsupported
  browsers (the `"none"` path).

## Done when

- Navigating in the lab honors the profile's `transition` value with a native
  view transition, including one shared-element case and a reduced-motion
  fallback.
- A recommendation is recorded: native-only vs `react-view-transitions`.
