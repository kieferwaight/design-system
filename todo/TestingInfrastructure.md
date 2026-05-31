# Testing Infrastructure — build out the stubbed `src/testing/` domain

| | |
|---|---|
| **Project** | Replace the empty `src/testing` stub with real shared test utilities: render wrappers, boundary tests, and token-parity/adapter tests |
| **Owner** | ? |
| **Status** | Backlog |
| **Priority** | High |
| **Target layer** | [/Users/kwaight/src/ai-conversations/web/src/testing](/Users/kwaight/src/ai-conversations/web/src/testing) |
| **Parent initiative** | [/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md](/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md) |
| **Runtime** | Vitest (`vitest run --project storybook`) + Playwright browser project; `madge` already in devDependencies |
| **Note** | Source: standout-features usability analysis. `src/testing/index.ts` is currently `export {};` — a stub. The harness deps already exist; only the utilities are missing. |

---

## 1. Executive Summary

[src/testing/index.ts](/Users/kwaight/src/ai-conversations/web/src/testing/index.ts)
is a stub (`// Stub entrypoint for Testing… export {};`) despite the refactor plan
calling for real testing utilities. Meanwhile the dependencies are already in
place: `vitest`, `@vitest/browser-playwright`, `playwright`, and `madge` are all
in [package.json](/Users/kwaight/src/ai-conversations/web/package.json), and the
`test` script runs the Storybook Vitest project. The gap is purely the shared
utilities and the test suites that use them.

## 2. Goals

Stand up four categories of test tooling, all exported from `src/testing`:

1. **Unified render wrapper** — a single `renderWithProviders` (and a Storybook
   decorator equivalent) that wraps a subject in theme + accent + the Environment
   Engine provider, with knobs to drive device/viewport/display-mode and
   theme/accent. Every component test and story should use one decorator, not a
   bespoke wrapper.
2. **Architectural boundary tests** — use `madge` (already a devDep) to assert the
   layer rules: see
   [todo/ArchitecturalBoundaryEnforcement.md](/Users/kwaight/src/ai-conversations/web/todo/ArchitecturalBoundaryEnforcement.md)
   (tracked separately; this domain provides the test harness it runs in).
3. **Token generation parity tests** — assert the generated CSS variables in
   [generated/css](/Users/kwaight/src/ai-conversations/web/src/generated/css)
   are 1:1 with the TypeScript token sources in
   [foundations](/Users/kwaight/src/ai-conversations/web/src/foundations) (no
   variable defined in CSS that lacks a TS token and vice-versa). Pairs with
   [todo/CssGeneratorPipeline.md](/Users/kwaight/src/ai-conversations/web/todo/CssGeneratorPipeline.md).
4. **Color adapter normalization tests** — assert the
   [adapters](/Users/kwaight/src/ai-conversations/web/src/adapters) normalize each
   provider palette (Catppuccin, Rosé Pine, …) into the system's own color model,
   and that provider-specific names terminate at the adapter boundary (per
   AGENTS.md).

## 3. Tasks

- [ ] Design the `src/testing` public surface: `renderWithProviders`, a
      `<TestEnvironment device viewport displayMode theme accent>` wrapper, and a
      reusable Storybook decorator that shares the same provider stack.
- [ ] Replace the stub `index.ts` barrel with the real exports.
- [ ] Write the render-wrapper unit tests (it mounts, providers apply, knobs
      change the rendered environment attributes).
- [ ] Add token-parity test (CSS vars ↔ TS tokens). Make it data-driven so new
      tokens are covered automatically.
- [ ] Add color-adapter normalization tests per provider.
- [ ] Wire `pnpm test` to include the new non-story Vitest suites (the current
      `test` script only runs `--project storybook`; decide whether boundary/
      parity tests live in a separate project or the same run).
- [ ] Document the testing conventions in
      [src/testing/Testing.mdx](/Users/kwaight/src/ai-conversations/web/src/testing/Testing.mdx).

## 4. Done when

- `src/testing` exports a single shared provider/render wrapper used by tests and
  stories alike.
- Token-parity and adapter-normalization suites run green in CI/local `pnpm test`.
- The boundary-test harness exists and is consumed by the
  [boundary-enforcement todo](/Users/kwaight/src/ai-conversations/web/todo/ArchitecturalBoundaryEnforcement.md).
- `Testing.mdx` documents how to write a component/story test against the wrapper.
