# First-Paint Stability — extend pre-paint env hydration to kill layout shift

| | |
|---|---|
| **Project** | Generalize the Environment Engine's pre-paint root-attribute hydration so layout decisions (incl. safe-area) are CSS-driven from first paint, eliminating snap/CLS |
| **Owner** | ? |
| **Status** | Backlog |
| **Priority** | Medium |
| **Target layer** | [/Users/kwaight/src/ai-conversations/web/src/environments](/Users/kwaight/src/ai-conversations/web/src/environments) |
| **Parent initiative** | [/Users/kwaight/src/ai-conversations/web/todo/EnvironmentEngine.md](/Users/kwaight/src/ai-conversations/web/todo/EnvironmentEngine.md) |
| **Runtime** | React 19 + the Environment Engine; verify via Storybook on multiple device profiles |
| **Note** | Source: standout-features "patterns to prevent visual problems" analysis. The Environment Engine is already a standout — this extends its strongest pattern rather than reworking it. |

---

## 1. Executive Summary

The Environment Engine is already well-built: it debounces parallel browser
triggers with `requestAnimationFrame` and dispatches atomic snapshot updates
([EnvironmentProvider.tsx:17,62,105](/Users/kwaight/src/ai-conversations/web/src/environments/EnvironmentProvider.tsx)),
and it hydrates the document root with environment attributes via
[device-detector.ts:102](/Users/kwaight/src/ai-conversations/web/src/environments/device-detector.ts#L102)
so `data-device` / `data-viewport` / `data-display-mode` are present before paint
and CSS can branch without a JS round-trip.

The opportunity is to push *more* layout decisions onto this same pre-paint,
CSS-attribute mechanism so first paint already matches the final layout — no
post-hydration snap, no cumulative layout shift. The safe-area sensor
([sensors/safe-area-sensor.ts](/Users/kwaight/src/ai-conversations/web/src/environments/sensors/safe-area-sensor.ts))
exists but its insets are not yet exposed as a pre-paint root attribute/variable
the way device/viewport/display-mode are.

## 2. Goals

- Publish safe-area state to the root pre-paint: a `data-safe-area` attribute
  and/or `--safe-area-*` CSS custom properties set in the same hydration pass as
  the existing attributes, so notched layouts are correct on first paint.
- Move layout branches that currently depend on a React render (device/viewport
  conditionals in components) onto CSS selectors keyed off the root attributes,
  so the structure is right before React commits.
- Audit for first-paint snap: find components that read environment state in an
  effect and reflow after mount; convert those to attribute-driven CSS where
  feasible.

## 3. Tasks

- [ ] Extend the root-attribute hydration to include safe-area insets
      (attribute + CSS vars). Keep it in the existing pre-paint pass, not a
      `useEffect`, to avoid a frame of wrong layout.
- [ ] Document the full root-attribute contract (every `data-*` and `--*` the
      engine sets) in
      [Environments.mdx](/Users/kwaight/src/ai-conversations/web/src/environments/Environments.mdx)
      so component authors target attributes instead of JS branching.
- [ ] Sweep components/patterns for "read env in effect → reflow" and migrate the
      layout-affecting ones to CSS-attribute selectors.
- [ ] Verify there's no FOUC/snap: load each device profile in Storybook and
      confirm first paint already matches steady state (record before/after).
- [ ] Confirm SSR/initial-HTML story (if any) and the atomic update path still
      hold — the rAF debounce must not reintroduce a visible intermediate state.

## 4. Cautions

- Don't move *content* state into pre-paint attributes — this is for layout/
  structure decisions only. Over-stuffing the root with attributes bloats CSS
  selector matching.
- Keep the engine's atomic-update guarantee: partial attribute updates between
  frames are the snap this is meant to prevent.

## 5. Done when

- Safe-area insets are available as root attributes/vars from first paint.
- The root-attribute contract is documented and used by at least the layout
  components that previously branched in JS.
- A before/after check on representative device profiles shows no first-paint
  layout shift.
