# Refactor Changelog Notes

This file tracks the findings, decisions, notes, and concerns identified during the Design System Folder Refactor.

---

## Phase 1: Establish Target Folder Structure (Completed)

### Findings & Insights
- **Documentation-Only Subsystems**: The legacy directories `src/dependencies/` and `src/platforms/` were identified as containing exclusively `.mdx` files (`Dependencies.mdx`, `Platforms.mdx`, etc.). They did not contain any functional runtime code.
- **Concentric Layout Radii**: Legacy layout folder `src/layouts/` only contained one custom primitive, `LabeledSwatch.tsx` (and its stories).
- **Compilation Success**: Stubbing out `/src/adapters/`, `/src/primitives/`, `/src/patterns/`, `/src/environments/`, `/src/testing/`, and `/src/generated/` (with subfolders `css/`, `types/`, `metadata/`) and barrel `index.ts` files compiles successfully under TypeScript without error.

---

## Phase 2: Migrate Existing Source Folders (Completed)

### Findings & Insights
- **Ex-Dependencies & Ex-Platforms Documentation**: Fully moved Framer Motion documentation to `src/adapters/motion/Motion.mdx`, React Aria documentation to `src/adapters/accessibility/react-aria/ReactAria.mdx`, and platform overviews to standard target paths inside `src/environments/` (macOS under `desktop/`, standalone PWA under `ios/` and `pwa/`).
- **Category-Driven Component Relocation**:
  * Moved the core visual atoms `Swatch.tsx` and `LabeledSwatch.tsx` to `src/components/data/swatch/`.
  * Moved `Avatar.tsx` to `src/components/data/avatar/`.
  * Moved `Shape.tsx` (the geometric rendering base) to `src/components/surfaces/shape/`.
  * This successfully empty-cleared and removed the old `src/layouts/` directory and root-level files in `src/components/`.
- **Generated Core & Centralized Re-routing**:
  * Migrated the stylesheets (`primitives.css`, `semantic.css`, `theme.css`) to `src/generated/css/` and TypeScript helpers (`kinds.ts`, `radius.ts`, `tokens.ts`) to `src/generated/types/`.
  * Configured `src/generated/index.ts` to export all types.
  * Corrected all import references to use the simple absolute `@/generated` barrel export, eliminating messy relative subpath tracking for components, stories, archive files, and mocks.
- **Type-Check Success**: All imports compile flawlessly under `tsc -b` with 0 warnings or compiler errors.

---

## Phase 3: Refactor Foundations & Verify Classifications (Completed)

### Findings & Insights
- **Decoupled Dimensions Split**:
  * Legacy `src/foundations/dimensions/` was successfully split into three separate standalone domains: `spacing/`, `radius/`, and `elevation/`.
  * Spacing defines standard constants and scales (`spacing.ts`, `spacing.types.ts`).
  * Radius maintains concentric layer scales and pairs a hand-written mathematical interpolation helper `glyphRadius()` for visual atoms (`radius.ts`, `radius.types.ts`).
  * Elevation declares altitudinal ambient shadows (sm, md, lg) and translucent backdrop blurs (sm, md, lg, xl) mapping perfectly to the semantic CSS layout tokens (`elevation.ts`, `elevation.types.ts`).
- **Relocated React Display/Specimen Components**:
  * Moved the typography visual component `Specimen.tsx` out of foundations into the UI Primitives layer under `src/primitives/text/Specimen.tsx` to satisfy the "Foundations should be strictly data-focused" architectural constraint.
  * Re-routed typography stories (`TextStyles.stories.tsx`) to import the `Specimen` renderers from `@/primitives`.
- **decoupled Device Foundation & Active Environments**:
  * Successfully separated static device breakpoints and query constraints (`src/foundations/device/device.ts` & `device.types.ts`) from active browser state hook detection/side-effects.
  * Active hook managers (`useDeviceState`, `useLaunchMode`, `useDisplayMode`) and attribute decorators (`applyDeviceAttributes`) were relocated to `src/environments/use-device.ts` and `src/environments/device-detector.ts`.
  * Deleted obsolete `src/lib/device.ts` and `src/lib/use-device.ts` files.
- **Standardized Foundation Nomenclature**:
  * Normalized **Material** and **Icon** domains: renamed plural documents/stories to singular (`Material.mdx`, `Material.stories.tsx`, `Icon.mdx`), defined strict type interfaces (`material.types.ts`, `icon.types.ts`), and declared standard token references (`material.ts`, `icon.ts`).
  * Reorganized typography domain: renamed `type-styles.ts` to `typography.ts` and created `typography.types.ts` to decouple types from static Apple type spec databases.
  * Exported all 8 foundation domains through a centralized barrel export `src/foundations/index.ts`.
- **Validation**: Verified successful type-checking and automated syntax formatting with Biome, yielding 0 compiler warnings/errors and clean import organization.
- **Dynamic Documentation Integration**:
  * Extracted the concentric `LAYER_RADII` scale into the hand-authored code module (`radius.ts`) to serve as the single source of truth for the entire domain.
  * Refactored `Radius.stories.tsx` and `Radius.mdx` to import and render this data dynamically via inline React mapping rather than manually duplicated tables, eliminating future documentation drift.

---

## Phase 4: Refactor Color Adapters (Completed)

### Findings & Insights
- **Decoupled Provider Packages**: Successfully moved the third-party upstream palette integrations (`@catppuccin/palette` and `@rose-pine/palette`) out of foundations.
- **Unified Adapter Protocol**: Created a shared `ColorAdapter` interface contract in `src/adapters/colors/color-adapter.types.ts` that enforces a standard normalization path to our `PaletteCollection` schema.
- **Provider-Specific Isolation**: 
  * Re-implemented Catppuccin and Rosé Pine under clean adapter classes (`CatppuccinAdapter` and `RosePineAdapter`) inside `src/adapters/colors/catppuccin/` and `src/adapters/colors/rose-pine/` directories.
  * Re-routed color foundation registrations in `src/foundations/color/collections/index.ts` to only import the pre-normalized output from `@/adapters`. Foundations now carry **zero dependencies** on external palette packages.
  * Deleted obsolete legacy provider files inside the foundations directory.

---

## Phase 12: Custom Vector Icon Primitive (Completed)

### Findings & Insights
- **Eager Asset Bundling**: Implemented a highly optimized inline vector `<Icon>` primitive (`src/primitives/icon/Icon.tsx`) that bundles all 620 high-fidelity Apple-style SVG symbols from `/assets` at build-time using Vite's `import.meta.glob` API. This yields zero clientside network overhead during icon rendering.
- **Automatic Style Cascading**: Integrated an eager regex-based pre-processor that strips hardcoded path/stroke attributes (e.g. `fill="white"`) from vector SVGs and substitutes them with `currentColor` variables. Icons now inherit parent text color stylings flawlessly.
- **Token Sizing Integration**: Aligned custom icon sizes to standard foundation sizing tokens (`xs` through `xl`) mapping back to standard CSS custom properties, while retaining custom pixel overrides.
- **Strict Accessibility Compliance**: Added `role="img"` to wrapping container tags, fully satisfying Storybook/Biome a11y linter constraints.
- **Lucide Backward Compatibility**: Maintained seamless support for any legacy Lucide React components via the `as={...}` injection prop.

---

## Phase 5: Rebuild & Migrate Layout/UI Primitives - Option A (Completed)

### Findings & Insights
- **Polymorphic Container Base (`Box` Primitive)**:
  - Created a highly extensible, polymorphic base `Box` primitive (`src/primitives/box/`) that defaults to `"div"`.
  - Implemented dynamic spacer translators that cleanly resolve padding and margin properties (supporting individual sides and coordinates `{ x, y }`) directly into CSS `var(--space-X)` custom properties.
  - Aligned corner-radius styling to concentric container scales (`var(--radius-layer-X)`) and physical glyph buckets (`var(--radius-glyph-X)`).
  - Integrated altitudinal ambient shadows (`var(--shadow-X)`) and GPU-accelerated backdrop blur glassmorphism filters (`var(--blur-X)`).
  - Supports versatile border declarations (e.g. `border="top"` or `border={["left", "bottom"]}`).
- **Concentric Flex Layouts (`Stack` Primitive)**:
  - Created a flexbox flow wrapper (`src/primitives/stack/`) that inherits all `Box` attributes and abstracts directional arrangements, cross-axis alignment, main-axis distribution, wraps, and modular gaps.
- **Concentric Multi-Dimensional Layouts (`Grid` Primitive)**:
  - Created a CSS Grid layout primitive (`src/primitives/grid/`) managing grid auto flows, cols/rows repeat template scales, and individual/combined axis gaps.
- **Altitudinal Container Sheets (`Surface` Primitive)**:
  - Created an altitudinal sheet panel primitive (`src/primitives/surface/`) that maps nesting depths (level 0 to 6) automatically to concentric container radius buckets and semantic shading levels.
  - Integrates Apple-style translucent backdrop-filter glass materials (`ultra-thin` to `thick`) by dynamically binding semantic CSS classes.
- **Key UI Primitives Migration**:
  - **Button**: Rebuilt legacy Aria Button (`src/primitives/button/`) to strictly bind heights, paddings, and corner radii to spacing scale and container radius tokens.
  - **Chip**: Rebuilt metadata capsules (`src/primitives/chip/`) using our new custom Vector `<Icon>` primitive and modular spacing/radius token maps.
  - **Skeleton**: Rebuilt content loader placeholders (`src/primitives/skeleton/`) to consume innermost (`var(--radius-layer-6)`) and standard card/well (`var(--radius-layer-5)`) concentric corner radius tokens.
- **Centralized Re-exporting**:
  - Registered all new primitives inside `src/primitives/index.ts` to expose them cleanly as a unified public entrypoint.
- **Validation**:
  - Confirmed 100% successful compile checks (`pnpm run typecheck` with 0 warnings/errors) and clean Biome formatting across all newly created folders.
  - Resolved Biome empty suppression comment warnings in `SearchResultRow.tsx` by providing explicit explanation strings.
  - Verified 100% clean lints across active directories under `src/` (primitives, components, foundations, environments, adapters, generated types) and verified 0 warnings or compiler errors inside `pnpm run typecheck`.

---

## Phase 6: Build the Environment Engine (Completed)

### Findings & Insights
- **Unified Platform Resolutions**: Replaced scattered platform checks with a single immutable source-of-truth decision object: the `EnvironmentProfile`. The engine resolves device, viewport, orientation, input primary, layout boundaries, and gesture owners cleanly.
- **6 Browser Sensors Orchestration**:
  - `DeviceSensor` reactively tracks orientation and width queries.
  - `LaunchSensor` monitors standalone vs browser display-modes.
  - `InputSensor` dynamically resolves coarse vs fine pointers for hybrid platforms (e.g., iPad trackpads).
  - `SafeAreaSensor` queries computed pixels using a lazily attached, offscreen DOM probe element.
  - `KeyboardSensor` calculates keyboard heights and scroll offsets using the virtualViewport API.
  - `CapabilitySensor` probes PWA features, serviceWorker, notifications, and clipboard API support.
- **RequestAnimationFrame Debouncing**: Aggregates rapid parallel triggers inside the `EnvironmentStore` and queues coalesced atomic state updates within a single rAF frame, preventing layout thrashing and redundant renders.
- **Platform-Specific Profiles**: Encoded static matrix boundaries for `ios.ts`, `ipad.ts`, and `desktop.ts` configurations.
- **First-Paint Attribute Hydration**: Reflects device type, viewport class, and display-mode data attributes onto the `<html>` root pre-paint, ensuring correct layout styling instantly and preventing layout snaps.
- **Validation**:
  - Created a robust test suite `environment-engine.test.ts` with 5 tests verifying core resolutions, hybrid input shifts, and iOS PWA back-swipe gesture ownership (`gestureOwner="app"`).
  - Achieved a 100% test success rate in 2ms.
  - Verified 100% clean type-checking (`pnpm run typecheck` with 0 warnings) and clean lints (`npx biome check src/environments`).

