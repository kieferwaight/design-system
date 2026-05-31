# Phase 6 — Environment Engine: Implementation Report

| | |
|---|---|
| **Report type** | Implementation report |
| **Task / spec** | [EnvironmentEngine.md](/Users/kwaight/src/ai-conversations/web/todo/EnvironmentEngine.md) |
| **Phase** | Phase 6 |
| **Status** | Complete |
| **Author** | Developer agent |
| **Date** | 2026-05-30 |
| **Branch / PR** | `main` |
| **Progress log** | [refactor-changelog-notes.md](/Users/kwaight/src/ai-conversations/web/refactor-changelog-notes.md) (Phase 6) |
| **Validation** | typecheck ✓ 0 errors · Biome ✓ clean (26 files) · Vitest ✓ 5/5 passed |

---

> Extracted from `todo/EnvironmentEngine.md` to keep the product spec clean.
> Original implementation report appended by the developer agent on completion.
> Concise summary also lives in `refactor-changelog-notes.md` (Phase 6).

---

## Developer Review & Implementation Response

# Phase 6: Build the Environment Engine

This implementation plan covers the construction of the **Environment Engine** under `src/environments/` as specified in the [EnvironmentEngine.md](file:///Users/kwaight/src/ai-conversations/web/todo/EnvironmentEngine.md) product scope.

The Environment Engine acts as a centralized, reactive, SSR-safe device and capability detection engine that compiles all client-side facts into an immutable, single source of truth decision object: the `EnvironmentProfile`.

---

## User Review Required

> [!IMPORTANT]
> - **Types & Contracts Refactor**: We will update the device vocabulary in `src/foundations/device/device.types.ts` to include `ViewportClass` and standard type aliases, renaming the legacy `LaunchMode` interface to `LaunchState` to avoid name collisions.
> - **Reactive Sensor Implementations**: We will build six active browser-level sensors (Device, Launch, Input, SafeArea, Keyboard, Capability) under `src/environments/sensors/`.
> - **Safe-Area DOM Probe**: Since safe-area insets are CSS-only (`env(safe-area-inset-top)` etc.), we will implement a lightweight, invisible DOM probe element to extract computed safe-area pixel counts on the client.
> - **Virtual Viewport Keyboard Sensor**: We will implement a `visualViewport` listener to detect virtual soft keyboards opening/closing on touch-first platforms, calculating dynamic keyboard heights and safe scroll offsets.
> - **Coalesced RAF Store**: To prevent layout thrashing and redundant React re-renders from simultaneous sensor updates, the store will queue sensor events and dispatch atomic profile updates within a single requestAnimationFrame (rAF) frame.
> - **HTML Root Attributes**: We will apply `data-device`, `data-viewport`, and `data-display-mode` attributes directly to the `<html>` root pre-paint, ensuring correct styling during the first layout paint and preventing visual snapping.

---

## Open Questions

> [!NOTE]
> 1. **Default Server Device Fallback**: We will default the server-side / hydration default profile to `"desktop"`. Let us know if you prefer `"ios"` (mobile-first rendering) as the default layout fallback for server rendering or first paint.
> 2. **PWA Lifecycles**: The PWA stubs under `src/environments/pwa/` (`manifest.ts`, `service-worker.ts`, `cache.ts`, `push.ts`) will be implemented as standard metadata/registration stubs for this design system package to expose capability detection, rather than running a full service worker registration during Storybook runs.

---

## Proposed Changes

We will build the Environment Engine bottom-up, keeping data and sensors modular, followed by the resolver engine, store, provider, and Storybook documentation.

---

### 1. Refactor Foundations Device Types

#### [MODIFY] [device.types.ts](file:///Users/kwaight/src/ai-conversations/web/src/foundations/device/device.types.ts)
- Rename interface `LaunchMode` to `LaunchState`.
- Introduce type alias `ViewportClass = DeviceType`.
- Export string-union `LaunchMode = "browser" | "standalone" | "pwa"`.
- Update `DeviceState` properties as needed.

#### [MODIFY] [device-detector.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/device-detector.ts)
- Update imports from `device.types.ts` to consume the renamed `LaunchState` interface.

#### [MODIFY] [use-device.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/use-device.ts)
- Update imports and signatures to use `LaunchState` instead of the old `LaunchMode` interface.

---

### 2. Core Environment Contracts & Sensors

We will define the public contract and implement the reactive sensors.

#### [NEW] [environment.types.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/environment.types.ts)
- Full TypeScript declarations for the `EnvironmentProfile` (containing `input`, `layout`, `navigation`, `surface`, and `capabilities` slices) and the flat `SensorSnapshot` interface.

#### [NEW] [sensors/sensor.types.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/sensors/sensor.types.ts)
- Define a unified `Sensor` interface:
  ```typescript
  export interface Sensor<T> {
    read(): T;
    subscribe(onValueChange: () => void): () => void;
  }
  ```

#### [NEW] [sensors/device-sensor.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/sensors/device-sensor.ts)
- Wraps static device detector signals and listens to `resize`/`orientationchange` events to track width changes and orientation (`portrait` | `landscape`).

#### [NEW] [sensors/launch-sensor.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/sensors/launch-sensor.ts)
- Monitors active `display-mode` (`browser`, `standalone`, `fullscreen`, `minimal-ui`) via media query listeners.

#### [NEW] [sensors/input-sensor.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/sensors/input-sensor.ts)
- Reactively queries hover and pointer capabilities (`(pointer: coarse)`, `(pointer: fine)`, `(hover: hover)`) so that iPadOS toggles dynamically between touch-first and mouse/trackpad modes.

#### [NEW] [sensors/safe-area-sensor.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/sensors/safe-area-sensor.ts)
- Deploys a lightweight, invisible DOM probe element styled with absolute safe-area insets.
- Uses `ResizeObserver` and window resize listeners to read computed pixels reactively and extract insets, falling back to 0s during SSR.

#### [NEW] [sensors/keyboard-sensor.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/sensors/keyboard-sensor.ts)
- Listens to `window.visualViewport` resize and scroll events.
- Detects soft keyboard appearances on iOS/Safari, calculates the active height offset, and signals state updates.

#### [NEW] [sensors/capability-sensor.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/sensors/capability-sensor.ts)
- Probes client support for Service Workers, Caches, Push API, Notifications, Clipboard API, and Web Share (`navigator.share`).

---

### 3. Pure Resolution Engine

#### [NEW] [environment-engine.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/environment-engine.ts)
- Contains the pure mapping function `resolveEnvironment(SensorSnapshot): EnvironmentProfile`.
- Maps hardware types and viewport thresholds to the standard resolution matrix (`layout.mode`, `density`, `sidebar`, `list`, `content`, `inspector`).
- Implements launch-context overrides (e.g. `gestureOwner = "app"` in iOS standalone PWAs).

#### [NEW] [profiles/ios.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/profiles/ios.ts)
#### [NEW] [profiles/ipad.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/profiles/ipad.ts)
#### [NEW] [profiles/desktop.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/profiles/desktop.ts)
- Static design layout matrix overrides for individual platforms.

---

### 4. Coalescing Store and Provider

#### [NEW] [pwa/manifest.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/pwa/manifest.ts)
#### [NEW] [pwa/service-worker.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/pwa/service-worker.ts)
- PWAs cache and configuration support layers.

#### [NEW] [EnvironmentProvider.tsx](file:///Users/kwaight/src/ai-conversations/web/src/environments/EnvironmentProvider.tsx)
- Orchestrates the six active sensors into one `EnvironmentStore`.
- Coalesces rapid parallel sensor firings using `requestAnimationFrame` to dispatch atomic state changes to React.
- Applies initial pre-paint `data-*` attributes onto the `<html>` element.
- Provides the React Context container wrapping the child tree.

#### [NEW] [use-environment.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/use-environment.ts)
- Exposes `useEnvironment()` using React's `useSyncExternalStore` for SSR-safe, tear-free subscription.
- Provides slice hooks: `useEnvironmentLayout()`, `useSafeArea()`, and `useKeyboardInset()`.

#### [MODIFY] [index.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/index.ts)
- Re-exports new public contracts, provider, hooks, and types.

---

### 5. Documentation & Stories

#### [NEW] [EnvironmentEngine.stories.tsx](file:///Users/kwaight/src/ai-conversations/web/src/environments/EnvironmentEngine.stories.tsx)
- Interactive, responsive console view showing real-time profiles, sensors snapshots, dynamic pointer shifts, simulated keyboard heights, and safe area insets.

#### [MODIFY] [Environments.mdx](file:///Users/kwaight/src/ai-conversations/web/src/environments/Environments.mdx)
- Update environments documentation to fully detail the resolved profile structure, available hooks, and interactive showcase.

---

## Verification Plan

### Automated Resolution Tests
- Create a comprehensive suite of unit tests [environment-engine.test.ts](file:///Users/kwaight/src/ai-conversations/web/src/environments/environment-engine.test.ts) using `vitest`.
- Assertions:
  - Verify every hardware row maps to correct `layout.mode` and `navigation.transition`.
  - Mock sensor states to verify iOS standalone PWAs override `gestureOwner` to `"app"`.
  - Assert pointer coarse/fine combinations evaluate hybrid and pointer-specific primary inputs.

### Build and Linter Validation
- Run the full workspace compilation:
  ```bash
  pnpm run typecheck
  ```
- Run formatting and checks on the newly added environments folder:
  ```bash
  npx biome check src/environments --write
  ```
- Run automated Vitest runs to confirm all green tests:
  ```bash
  pnpm run test
  ```


## Developer Completion Notes


# Walkthrough — Built the Environment Engine

We have successfully completed **Phase 6 (Build the Environment Engine)**, implementing a highly cohesive, reactive, and unit-tested platform detection and resolution layer under `src/environments/`.

---

## 1. Core Architecture Accomplishments

The Environment Engine centralizes scattered platform and viewport checks into a single immutable decision object: the `EnvironmentProfile`.

### A. Contracts & Device Vocabulary Refactored
- **`device.types.ts`**: Introduced `ViewportClass` and standard type aliases, renaming the legacy `LaunchMode` interface to `LaunchState` to avoid name collisions.
- **`environment.types.ts`**: Declared the full interface schemas for the resolved `EnvironmentProfile` (with `input`, `layout`, `navigation`, `surface`, and `capabilities` slices) and the aggregate `SensorSnapshot`.

### B. Six Reactive Browser Sensors
We built six dedicated sensor modules under `src/environments/sensors/` that isolate all side-effects and browser APIs:
- **`DeviceSensor`**: Tracks device breakpoints and rotates orientational state (`portrait` / `landscape`).
- **`LaunchSensor`**: Evaluates active `display-mode` queries (standalone PWA vs browser tab).
- **`InputSensor`**: Tracks coarse vs fine pointers reactively, resolving iPad primary modes dynamically.
- **`SafeAreaSensor`**: Employs an invisible, lazy offscreen DOM probe element to parse computed pixels for CSS safe-area-insets, backed by a `ResizeObserver`.
- **`KeyboardSensor`**: Uses the `visualViewport` API to calculate soft keyboard heights and scroll offsets on touch-screen inputs.
- **`CapabilitySensor`**: Probes browser support for PWA features, service worker registration, and web capabilities.

### C. Pure Resolution Engine
- **`environment-engine.ts`**: Contains the pure function `resolveEnvironment(SensorSnapshot)` which evaluates hardware facts against the standard platform resolution matrix.
- **Matrix Configurations**: Declared distinct static layout/navigation parameters under `src/environments/profiles/` for `ios`, `ipad`, and `desktop` environments.
- **Launch Overrides**: Dynamically assigns `gestureOwner = "app"` and overrides safe area chrome offsets in standalone PWA configurations on iOS/iPadOS hardware.

### D. RAF Coalescing Store & Provider
- **`EnvironmentProvider.tsx`**: Orchestrates all sensors into a single `EnvironmentStore`. Debounces simultaneous, high-frequency browser resize/scroll triggers inside a single `requestAnimationFrame` (rAF) frame to prevent layout thrashing.
- **Pre-Paint Data Hydration**: Instantly assigns `data-device`, `data-viewport`, and `data-display-mode` onto the root `<html>` element pre-paint, ensuring styling correctness on the first paint frame.
- **`use-environment.ts`**: Exposes the context hook `useEnvironment()` using React's `useSyncExternalStore` for tear-free context rendering, alongside slice-specific hooks (`useEnvironmentLayout`, `useSafeArea`, `useKeyboardInset`).

---

## 2. Interactive Console & Documentation

- **`EnvironmentEngine.stories.tsx`**: Built an interactive console showing live profiles, responsive layout intents, keyboard heights, safe area insets, and browser API supports.
- **`Environments.mdx`**: Updated the narrative documentation, detailing hooks usage, code examples, and embedding the Console showcase canvas.

---

## 3. Validation & Testing Results

### A. Resolution Unit Tests
We implemented 5 automated unit tests inside `src/environments/environment-engine.test.ts` to verify resolution logic:
- Desktop browser layout resolution.
- iOS Safari browser tab safe-area chrome mapping.
- iOS standalone PWA custom back-swipe gesture ownership (`gestureOwner="app"`).
- iPadOS touch-first split-screen layout.
- iPadOS fine-pointer hybrid input primary resolution.

All tests passed successfully in **2 milliseconds**:
```bash
$ npx vitest run --project unit
✓  unit  src/environments/environment-engine.test.ts (5 tests) 2ms
Tests  5 passed (5)
```

### B. Biome Formatting & Style Check
The environments package is 100% formatted and formatted cleanly with **0 errors and 0 warnings**:
```bash
$ npx biome check src/environments
Checked 26 files in 6ms. No fixes applied.
```

### C. TypeScript Compilation Check
The complete design system package compiles cleanly with **0 errors and 0 warnings**:
```bash
$ pnpm run typecheck
$ tsc -b
# Success!
```
