# Lab — Motion & Gesture Dependency Experiments

Low-priority research track. Each file tracks **one external dependency** proposed
for Apple-style Liquid Glass transitions and advanced touch. All start life in
[src/lab/](/Users/kwaight/src/ai-conversations/web/src/lab) (currently just a
placeholder [Lab.mdx](/Users/kwaight/src/ai-conversations/web/src/lab/Lab.mdx)) —
tagged `research`, unstable — and only **graduate** to
[src/adapters/motion/](/Users/kwaight/src/ai-conversations/web/src/adapters/motion)
once they earn it. Source: external-tools review.

## Two corrections to the source review (verified against the repo)

- The review says `adapters/motion/framer-motion/` and `gesture/` subfolders
  already exist. **They don't** — `adapters/motion/` currently holds only
  [Motion.mdx](/Users/kwaight/src/ai-conversations/web/src/adapters/motion/Motion.mdx).
  The proposed subfolder layout is a *target*, not the current state.
- The review cites `navigation.gestureOwner === "app"`. **All current profiles
  use `gestureOwner: "os"`** ([ios.ts](/Users/kwaight/src/ai-conversations/web/src/environments/profiles/ios.ts),
  [ipad.ts](/Users/kwaight/src/ai-conversations/web/src/environments/profiles/ipad.ts),
  [desktop.ts](/Users/kwaight/src/ai-conversations/web/src/environments/profiles/desktop.ts)).
  There is no `"app"` owner today — adopting one is its own decision.

## What we already have (so we don't double-buy)

- `framer-motion` v12, `@use-gesture/react` v10.3.1, `@tanstack/react-virtual`
  v3.10.0, `culori`, `react-aria-components` — all in
  [package.json](/Users/kwaight/src/ai-conversations/web/package.json).
- Spring presets as tokens: `--spring-snappy | smooth | bouncy | gentle`.
- A real `transition` signal per profile: `"ios-slide" | "fade-scale" | "none"`
  ([environment.types.ts:11](/Users/kwaight/src/ai-conversations/web/src/environments/environment.types.ts#L11))
  — **defined but nothing consumes it yet.** This is the biggest open hook.

## Ranking (higher = lower-effort / more leverage from what we have)

| # | Dep | Priority | Tier | Why this rank |
|---|-----|----------|------|---------------|
| 1 | [Expand @use-gesture](/Users/kwaight/src/ai-conversations/web/todo/lab/ExpandUseGesture.md) | **High** | No new dep | Already installed; pure usage expansion |
| 2 | [View Transitions](/Users/kwaight/src/ai-conversations/web/todo/lab/ViewTransitions.md) | **High** | Native / thin | Implements the unused `transition` profile signal; native API |
| 3 | [auto-animate](/Users/kwaight/src/ai-conversations/web/todo/lab/AutoAnimate.md) | **High** | Tiny | Zero-config one-hook FLIP; trivial to trial |
| 4 | [flubber](/Users/kwaight/src/ai-conversations/web/todo/lab/Flubber.md) | Medium | Useful | Core of Liquid-Glass shape-merge, but heavier |
| 5 | [svg-path-properties](/Users/kwaight/src/ai-conversations/web/todo/lab/SvgPathProperties.md) | Medium | Util | Small; only useful once morphing work starts |
| 6 | [will-change automation](/Users/kwaight/src/ai-conversations/web/todo/lab/WillChangeAutomation.md) | Medium | Pattern | Prefer doing it ourselves; overlaps blur todo |
| 7 | [kute.js](/Users/kwaight/src/ai-conversations/web/todo/lab/KuteJs.md) | Low | Pick-one | Alternative to flubber — evaluate, don't ship both |
| 8 | [matter-js](/Users/kwaight/src/ai-conversations/web/todo/lab/MatterJs.md) | Low | Speculative | Full physics engine; heavy; organic-merge only |
| 9 | [geometric](/Users/kwaight/src/ai-conversations/web/todo/lab/Geometric.md) | Low | Util | Tiny geometry helpers; niche |
| 10 | [react-spring](/Users/kwaight/src/ai-conversations/web/todo/lab/ReactSpring.md) | Low | Likely decline | Redundant with framer-motion |
| 11 | [hammer.js](/Users/kwaight/src/ai-conversations/web/todo/lab/HammerJs.md) | Low | Likely decline | Unmaintained; overlaps @use-gesture |
| 12 | [react-window](/Users/kwaight/src/ai-conversations/web/todo/lab/ReactWindow.md) | Low | Decline | We already have @tanstack/react-virtual |
| 13 | [react-ios-pwa-navigation](/Users/kwaight/src/ai-conversations/web/todo/lab/ReactIosPwaNavigation.md) | Low | Evaluate | Niche; maintenance risk; verify before any dep |

## Graduation rule (applies to every item)

1. Prototype in `src/lab/`, tagged `research`. No public export, no other layer
   imports it.
2. Measure: bundle cost, 60fps under the device matrix, reduced-motion behavior.
3. If it earns a place, wrap it behind an adapter under `adapters/motion/<x>/`
   so the library name never leaks past the boundary (AGENTS.md rule), then
   delete the lab copy.
4. If it doesn't, record *why* in the todo and close it — don't leave a dead dep
   in `package.json`.
