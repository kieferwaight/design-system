# Architectural Boundary Enforcement — make the layer rules machine-checked

| | |
|---|---|
| **Project** | Use `madge` to enforce the layering/import rules in AGENTS.md: no production imports from `archive/`/`examples/`/`dist/`, no circular deps, no foundation→component back-edges |
| **Owner** | ? |
| **Status** | Backlog |
| **Priority** | Medium-High |
| **Target layer** | repo-wide; harness lives in [/Users/kwaight/src/ai-conversations/web/src/testing](/Users/kwaight/src/ai-conversations/web/src/testing) |
| **Parent initiative** | [/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md](/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md) (checklist line: "Add dependency graph checks with `madge`") |
| **Runtime** | `madge` (already in devDependencies) run as a Vitest test or a `pnpm` script |
| **Note** | Source: standout-features analysis + the existing refactor checklist. AGENTS.md already states the rules in prose ("`archive/` is reference-only. Never import from it"); this makes them executable. |

---

## 1. Executive Summary

[AGENTS.md](/Users/kwaight/src/ai-conversations/web/AGENTS.md) declares the layer
contract in prose: external libraries hide behind `adapters/`, `archive/` is
reference-only and must never be imported into package source, and provider names
must terminate at the adapter boundary. The
[DesignSystemFolderRefactor](/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md)
checklist has an open item: *"Add dependency graph checks with `madge`."* `madge`
is already in [package.json](/Users/kwaight/src/ai-conversations/web/package.json)
devDependencies. Nothing enforces any of this yet — a stray import is caught only
by human review.

## 2. Rules to enforce

- **No production import from non-shippable dirs:** package source must not import
  from [archive/](/Users/kwaight/src/ai-conversations/web/archive),
  [examples/](/Users/kwaight/src/ai-conversations/web/examples), or
  [dist/](/Users/kwaight/src/ai-conversations/web/dist).
- **No circular dependencies** anywhere in `src`.
- **Layer direction:** foundations must not import from components/primitives;
  primitives must not import from components; adapters must not leak provider
  types upward (provider-specific names terminate at the adapter boundary).
- **External libs only via `adapters/`:** flag direct imports of provider
  palettes / icon sets / motion libs from outside the adapter layer.

## 3. Tasks

- [ ] Add a `madge` config (`.madgerc` or programmatic) pointed at `src` with the
      TS/JSX resolver and the right `tsconfig` path aliases (`@/…`).
- [ ] Write a circular-dependency assertion (`madge --circular`) as a test/script
      that fails on any cycle.
- [ ] Write directional assertions: query the dependency graph and fail if any
      edge violates the layer direction (foundation→component, primitive→component,
      anything→archive/examples/dist).
- [ ] Add an adapter-boundary assertion: only files under `adapters/` may import
      the provider packages (`@catppuccin/palette`, `@rose-pine/palette`,
      `lucide-react`, motion libs, …).
- [ ] Surface as `pnpm run lint:boundaries` *and* a Vitest suite under the
      [testing](/Users/kwaight/src/ai-conversations/web/src/testing) domain so it
      runs in the normal test pass.
- [ ] Seed the suite from the *current* graph: if existing violations exist,
      record them explicitly (allowlist with a comment) rather than silently
      passing — never hide a known violation behind a green check.

## 4. Done when

- A single command (and a CI test) fails on cycles, forbidden-dir imports,
  wrong-direction layer edges, and provider imports outside `adapters/`.
- Any pre-existing violation is either fixed or explicitly, visibly allowlisted.
- The rule list in AGENTS.md and this check agree (no drift between prose and
  enforcement).
