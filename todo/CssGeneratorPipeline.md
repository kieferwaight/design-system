# CSS Generator Pipeline — single source of truth for tokens → CSS + TS

| | |
|---|---|
| **Project** | Build the generator so CSS variables, utility classes, token names, and TypeScript values stay in 1:1 parity, emitted into `src/generated/` as marked build artifacts |
| **Owner** | ? |
| **Status** | Backlog |
| **Priority** | Medium |
| **Target layer** | [/Users/kwaight/src/ai-conversations/web/src/generated](/Users/kwaight/src/ai-conversations/web/src/generated), [/Users/kwaight/src/ai-conversations/web/scripts](/Users/kwaight/src/ai-conversations/web/scripts) |
| **Parent initiative** | [/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md](/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md) (open checklist items, lines ~191–196) |
| **Runtime** | Node/TS build script run via `pnpm`; output consumed by Vite + Storybook |
| **Note** | Source: standout-features analysis. Pairs directly with the token-parity test in [TestingInfrastructure.md](/Users/kwaight/src/ai-conversations/web/todo/TestingInfrastructure.md) — the generator removes drift, the test proves it stays gone. |

---

## 1. Executive Summary

The CSS under
[src/generated/css](/Users/kwaight/src/ai-conversations/web/src/generated/css)
(`primitives.css`, `semantic.css`, `theme.css`) was *moved* into `generated/`
during the refactor but there is no generator that *produces* it from the
TypeScript token sources in
[src/foundations](/Users/kwaight/src/ai-conversations/web/src/foundations). Today
the CSS and the TS tokens are maintained in parallel — the exact drift hazard the
foundations AGENTS.md warns about ("one definition, docs read it"). The refactor
checklist has open items to build a real generator and emit reproducible
artifacts with "do not edit" headers.

## 2. Goals

- One source of truth (the TS token data in `foundations/*`) → generated CSS
  variables + utility classes + TS metadata, in 1:1 parity.
- Generated files are clearly marked build artifacts ("do not edit directly"
  header) and reproducible from a single `pnpm` command.
- The build is wired so artifacts regenerate as part of `build` and are verifiable
  in CI (regenerate → assert no diff).

## 3. Tasks

- [ ] Confirm the token source-of-truth shape per foundation and define the
      generator's input contract (read `foundations/*/<domain>.ts`).
- [ ] Implement the generator in
      [scripts/](/Users/kwaight/src/ai-conversations/web/scripts): emit
      `generated/css/*.css`, `generated/types/*`, `generated/metadata/*`.
- [ ] Add the "generated — do not edit" header to every emitted file.
- [ ] Add a `pnpm run generate` (and hook it into `build`) so artifacts are
      reproducible; add a CI check that regenerating produces no diff.
- [ ] Coordinate with the token-parity test in
      [TestingInfrastructure.md](/Users/kwaight/src/ai-conversations/web/todo/TestingInfrastructure.md)
      so the parity assertion runs against generator output.
- [ ] Exclude stale generated docs from source decisions (treat `dist/` and
      generated docs as artifacts, not truth — see AGENTS.md).

## 4. Done when

- `pnpm run generate` reproduces all of `src/generated/{css,types,metadata}` from
  the TS token sources with no manual edits.
- A CI check fails if generated output drifts from source.
- The token-parity test passes against generator output.
