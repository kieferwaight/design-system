# Standout-Features Backlog — performance, usability & visual-stability work

This batch decomposes the standout-features analysis (performance refactors,
usability gaps, and patterns to prevent production visual problems) into focused,
independently-actionable todos. Parent initiatives:
[DesignSystemFolderRefactor.md](/Users/kwaight/src/ai-conversations/web/todo/DesignSystemFolderRefactor.md)
and [EnvironmentEngine.md](/Users/kwaight/src/ai-conversations/web/todo/EnvironmentEngine.md).

## Performance

- [PerformancePrimitiveMemoization.md](/Users/kwaight/src/ai-conversations/web/todo/PerformancePrimitiveMemoization.md)
  — `React.memo` for `Box`/`Stack`/`Grid`/`Surface`/`Text`/`Icon`; profile first.
- [PerformanceBlurAndGpu.md](/Users/kwaight/src/ai-conversations/web/todo/PerformanceBlurAndGpu.md)
  — CSS containment, a concurrent-blur budget, reduced-motion/transparency
  fallbacks, scoped `will-change`.

## Usability / quality infrastructure

- [TestingInfrastructure.md](/Users/kwaight/src/ai-conversations/web/todo/TestingInfrastructure.md)
  — build out the stubbed `src/testing/`: render wrappers, token-parity & adapter
  tests, boundary-test harness.
- [VisualRegressionTesting.md](/Users/kwaight/src/ai-conversations/web/todo/VisualRegressionTesting.md)
  — snapshot the device/theme/accent/safe-area matrix to catch drift.
- [ComponentPatternDomainCompletion.md](/Users/kwaight/src/ai-conversations/web/todo/ComponentPatternDomainCompletion.md)
  — finish the stubbed component/pattern domains (tracking pointer to parent).

## Patterns to prevent visual problems

- [ArchitecturalBoundaryEnforcement.md](/Users/kwaight/src/ai-conversations/web/todo/ArchitecturalBoundaryEnforcement.md)
  — `madge`-enforced layer/import rules (no `archive`/`examples`/`dist` imports,
  no cycles, adapter boundary).
- [FirstPaintStability.md](/Users/kwaight/src/ai-conversations/web/todo/FirstPaintStability.md)
  — extend the Environment Engine's pre-paint root-attribute hydration (incl.
  safe-area) to eliminate layout shift.
- [CssGeneratorPipeline.md](/Users/kwaight/src/ai-conversations/web/todo/CssGeneratorPipeline.md)
  — generate CSS/TS token artifacts from one source of truth in 1:1 parity.

## Suggested order

1. **TestingInfrastructure** + **ArchitecturalBoundaryEnforcement** — the safety
   net every other change verifies against.
2. **PerformancePrimitiveMemoization** — measured, low-risk, high fan-out.
3. **CssGeneratorPipeline** (+ its parity test) — removes a standing drift hazard.
4. **PerformanceBlurAndGpu** + **FirstPaintStability** — visual/perf hardening.
5. **VisualRegressionTesting** — once the matrix is stable enough to baseline.
6. **ComponentPatternDomainCompletion** — ongoing, gated by the boundary checks.

> Note: items 3, 5(boundary), and ComponentPatternDomainCompletion overlap with
> open checkboxes already in `DesignSystemFolderRefactor.md`. These files elaborate
> those items into standalone work units; the parent checklist remains the
> source of truth for completion state.
