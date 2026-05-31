# Primitive Component Memoization — stop needless re-renders of low-level primitives

| | |
|---|---|
| **Project** | Add a deliberate memoization strategy to the layout/leaf primitives so parent re-renders don't cascade through the whole tree |
| **Owner** | ? |
| **Status** | Backlog |
| **Priority** | Medium |
| **Target layer** | [/Users/kwaight/src/ai-conversations/web/src/primitives](/Users/kwaight/src/ai-conversations/web/src/primitives) |
| **Parent initiative** | [/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md](/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md) |
| **Runtime** | React 19; verify with Storybook + React DevTools Profiler |
| **Note** | Source: standout-features performance analysis. React 19's compiler reduces but does not eliminate the need — primitives are the highest-fan-out components in the system, so a wasted render here multiplies. |

---

## 1. Executive Summary

The layout/leaf primitives — `Box`, `Stack`, `Grid`, `Surface`, `Text`, `Icon` —
are the most frequently instantiated components in the system and sit at the
bottom of nearly every render tree. None of them are memoized today. `Box`
([primitives/box/Box.tsx](/Users/kwaight/src/ai-conversations/web/src/primitives/box/Box.tsx))
is a plain `export function` with several pure `resolve*` helpers (`resolveSpacingStyles`,
`resolveRadius`, `resolveShadow`, `resolveBg`) that recompute a style object on
every render. `Icon`
([primitives/icon/Icon.tsx](/Users/kwaight/src/ai-conversations/web/src/primitives/icon/Icon.tsx))
renders from a build-time set of SVG assets and is a pure function of its props.

When a parent re-renders for an unrelated reason, every primitive child re-runs
its style resolution even though props are unchanged. For stable primitives this
is pure waste.

## 2. Goals

- Wrap genuinely-pure primitives in `React.memo` with the default shallow
  comparison: `Box`, `Stack`, `Grid`, `Surface`, `Text`, `Icon`.
- Ensure the `resolve*` style helpers are stable: they already are pure
  top-level functions, but confirm no inline object/array props defeat
  `React.memo`'s shallow compare at common call sites.
- Preserve `forwardRef` semantics — `memo(forwardRef(...))` ordering matters; ref
  forwarding must still work for every primitive that exposes a ref.

## 3. Tasks

- [ ] Profile first. Add a Storybook story (or use an existing dense canvas) and
      record a React DevTools Profiler trace to capture the *current* wasted-render
      baseline. Do not optimize blind — measure before/after.
- [ ] Wrap each leaf/layout primitive in `React.memo`. Keep the displayName so
      Storybook/DevTools still show readable names.
- [ ] Audit prop shapes for memo-defeating patterns: inline `style={{…}}`,
      `sx`-style objects, and array props passed literally at call sites. Where a
      primitive accepts an object prop (e.g. `Box` spacing shorthand), document
      that callers should hoist or memoize the object, or normalize it to a stable
      primitive value inside the component.
- [ ] For style objects built inside the component from props, confirm they are
      cheap enough that `useMemo` is *not* warranted (avoid premature `useMemo` —
      the hook itself has overhead). Only memoize derived values that are
      provably expensive.
- [ ] Re-profile and record the delta in [todo/reports/](/Users/kwaight/src/ai-conversations/web/todo/reports).

## 4. Non-goals / cautions

- Do **not** memoize components that take `children` and almost always receive
  fresh children — `React.memo` will never hit there and just adds a comparison
  cost. Verify per-primitive that the common usage actually has stable props.
- Do not reach for `useMemo`/`useCallback` inside primitives reflexively; the
  win here is `React.memo` at the boundary, not internal hook caching.

## 5. Done when

- Each targeted primitive is wrapped, `forwardRef` + `displayName` intact.
- A before/after Profiler trace shows the wasted-render reduction.
- `pnpm run typecheck` + `pnpm run lint` clean; `run-story-tests` green.
