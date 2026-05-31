# Visual Regression Testing — catch token/layout drift across the device matrix

| | |
|---|---|
| **Project** | Add automated visual-regression snapshots across the defined device/viewport matrix and across theme/accent, including safe-area and PWA-vs-browser layouts |
| **Owner** | ? |
| **Status** | Backlog |
| **Priority** | High |
| **Target layer** | [/Users/kwaight/src/ai-conversations/web/.storybook](/Users/kwaight/src/ai-conversations/web/.storybook), [/Users/kwaight/src/ai-conversations/web/src/testing](/Users/kwaight/src/ai-conversations/web/src/testing) |
| **Parent initiative** | [/Users/kwaight/src/ai-conversations/web/todo/TestingInfrastructure.md](/Users/kwaight/src/ai-conversations/web/todo/TestingInfrastructure.md) |
| **Runtime** | Playwright (already a devDep) snapshots, or hosted Chromatic against the built Storybook (`pnpm sb:build`) |
| **Note** | Source: standout-features analysis. For a *design system* the rendered pixels are the contract — there is no VRT today, so token/cross-browser/safe-area drift can ship silently. |

---

## 1. Executive Summary

There is no visual-regression setup (no Chromatic, Percy, or Playwright snapshot
config) in the repo. For a design system this is the single highest-leverage
quality gate: it catches **token drift**, **cross-browser rendering differences**,
and **safe-area / layout breakage** on notched and PWA devices — exactly the
classes of bug that unit tests miss. The pieces to build on already exist:

- `playwright` + `@vitest/browser-playwright` are in
  [package.json](/Users/kwaight/src/ai-conversations/web/package.json).
- Storybook builds a static site via `pnpm sb:build` →
  [dist/storybook](/Users/kwaight/src/ai-conversations/web/dist).
- A device/viewport matrix is already defined for Storybook and the Environment
  Engine drives `data-device` / `data-viewport` / `data-display-mode` attributes
  on the root, so the same story can be snapshotted under many environments.
- A safe-area sensor exists
  ([environments/sensors/safe-area-sensor.ts](/Users/kwaight/src/ai-conversations/web/src/environments/sensors/safe-area-sensor.ts)).

## 2. Goals

- Snapshot every (or a curated set of) stories across: the full device/viewport
  matrix, each theme, each accent, and PWA (`display-mode: standalone`) vs
  browser.
- Make notched-device safe-area insets a first-class snapshot dimension.
- Keep the matrix from exploding: pick a representative cross-section
  (smallest/largest device, one notched, light+dark, two accents) rather than the
  full Cartesian product.

## 3. Tasks

- [ ] **Choose the tool.** Two viable paths:
      - *Playwright snapshots* (in-repo, no SaaS): drive the built Storybook
        iframe per story × environment, `toHaveScreenshot`. Free, but you own the
        baseline storage and flake management.
      - *Chromatic* (hosted): least setup, handles baselines/review UI, costs
        money and adds an external dependency.
      Pick one and record the rationale.
- [ ] Decide the environment cross-section to snapshot (document which device/
      theme/accent combos and why — avoid silent full-matrix cost).
- [ ] Implement the runner: build Storybook, iterate stories, set the Environment
      attributes (device/viewport/display-mode) per snapshot, capture.
- [ ] Add safe-area variants by injecting the inset values the safe-area sensor
      reads, so notched layouts are exercised.
- [ ] Wire into CI as a non-blocking check first (collect baselines), then promote
      to blocking once stable.
- [ ] Document the update/approve workflow for intentional visual changes.

## 4. Cautions

- VRT is flake-prone: pin fonts, disable animations during capture
  (`prefers-reduced-motion` / a test flag), and freeze any time-based or random
  content. Note `Date.now()`/`Math.random()` already need care elsewhere.
- Snapshot scope is a budget — log what was *excluded* so "all green" doesn't
  imply coverage the matrix never had.

## 5. Done when

- A documented, curated matrix of stories renders to baselines and a diff fails CI
  on unexpected pixel change.
- Safe-area and PWA-vs-browser are represented in the matrix.
- The approve-intended-change workflow is written down.
