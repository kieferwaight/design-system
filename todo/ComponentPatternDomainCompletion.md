# Component & Pattern Domain Completion — fill the stubbed domains

| | |
|---|---|
| **Project** | Build out the component domains (`typography/`, `surfaces/`, `feedback/`, `forms/`, `overlays/`) and adaptive patterns (`navigation-stack/`, `split-view/`, `sidebar-layout/`, …) that the refactor left unstarted |
| **Owner** | ? |
| **Status** | Backlog |
| **Priority** | Medium |
| **Target layer** | [/Users/kwaight/src/ai-conversations/web/src/components](/Users/kwaight/src/ai-conversations/web/src/components), [/Users/kwaight/src/ai-conversations/web/src/patterns](/Users/kwaight/src/ai-conversations/web/src/patterns) |
| **Parent initiative** | [/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md](/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md) (open checklist items, lines ~147–162) |
| **Runtime** | React 19 + Storybook (CSF + MDX); follow `get-storybook-story-instructions` |
| **Note** | Source: standout-features analysis. This is a pointer/tracking todo — the authoritative checklist lives in the parent. It exists so the gap is visible alongside the other standout-feature todos. |

---

## 1. Executive Summary

Two domains are essentially empty stubs:
[src/patterns/index.ts](/Users/kwaight/src/ai-conversations/web/src/patterns/index.ts)
is `export {};`, and the components tree
([src/components](/Users/kwaight/src/ai-conversations/web/src/components)) today
only has `data/`, `layouts/`, `navigation/`, and a single `surfaces/shape/`.
The refactor checklist
([DesignSystemFolderRefactor.md](/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md))
lists these as open:

- Components: `typography/`, `surfaces/`, `feedback/`, `forms/`, `overlays/`
- Adaptive patterns: `navigation-stack/`, `split-view/`, `sidebar-layout/`, …

## 2. Approach

Each domain follows the established per-domain pattern (component + stories + MDX +
types + barrel), reuses primitives, and routes any external dependency through
`adapters/`. Before writing any component, call
`get-storybook-story-instructions`; after each change, `preview-stories` and
`run-story-tests`.

## 3. Tasks (track detail in the parent checklist)

- [ ] `components/typography/` — text/heading/label components over the typography
      foundation tokens.
- [ ] `components/surfaces/` — card/panel/material surfaces beyond `shape`.
- [ ] `components/feedback/` — alert/toast/progress/status.
- [ ] `components/forms/` — field/label/validation wrappers over `primitives/input`.
- [ ] `components/overlays/` — dialog/popover/sheet/menu (lean on
      `react-aria-components`, already a dependency, via an adapter).
- [ ] `patterns/navigation-stack/`, `patterns/split-view/`,
      `patterns/sidebar-layout/` — the adaptive layout patterns; wire them to the
      Environment Engine's `layout` signal (`single-screen | split-view |
      multi-pane`).
- [ ] Replace the `patterns/index.ts` stub barrel as patterns land.

## 4. Done when

- Each listed domain has a real implementation + stories + docs and exports
  through its barrel.
- The corresponding checkboxes in the parent refactor checklist are checked.
- New components pass `run-story-tests` and respect the architectural boundaries
  (see [ArchitecturalBoundaryEnforcement.md](/Users/kwaight/src/ai-conversations/web/todo/ArchitecturalBoundaryEnforcement.md)).
