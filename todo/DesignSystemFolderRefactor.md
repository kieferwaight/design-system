# Design System

This package defines the internal React design system used across project interfaces. It provides reusable UI primitives, application components, design tokens, environment-aware layout behavior, and generated CSS/type artifacts.

The package is authored as an ESM-first React library and is intended to be published as an internal npm package for reuse across applications.

## Primary Targets

The design system prioritizes the following runtime targets, in order:

1. **iOS PWA applications served over Tailscale**
   - Single-screen mobile flows
   - Safe-area and notch-aware layouts
   - PWA launch mode handling
   - Local asset caching and worker support
   - Touch-first interaction patterns

2. **Desktop-capable web applications**
   - Wide responsive layouts
   - Persistent navigation surfaces
   - Left and right sidebar patterns
   - Keyboard and pointer-friendly interaction patterns

## Getting Started

Consumers should start with the generated documentation and Storybook examples:

- **Typedoc:** API reference for exported types, utilities, hooks, primitives, and components.
- **Storybook:** Interactive documentation for foundations, primitives, components, patterns, and environment behavior.
- **Package Entry:** Import public APIs from the package root unless a subpath export is explicitly documented.

Example import pattern:

```ts
import { Button, Text, Stack } from "@internal/design-system";
```

## Examples

End-to-end examples live outside of `src` so they do not become part of the package source. These examples demonstrate complete views, workflows, fixtures, and Storybook scenarios used for visual review and integration testing.

```text
./examples/
└── storybook/
    ├── mocks/      # Mock data and fixtures used by example workflows
    └── views/      # Complete view/workflow examples composed from the design system
```

## Agent Support

The repository may include local agent configuration for assisted development, documentation review, and MCP-enabled workflows.

```text
.mcp.json     # MCP server configuration
.claude/      # Claude project instructions, commands, and agent context
```

## TODO Tracking

### 1. Establish Target Folder Structure

- [x] Stub out the final top-level source folders:
  - [x] `src/adapters/`
  - [x] `src/primitives/`
  - [x] `src/patterns/`
  - [x] `src/environments/`
  - [x] `src/generated/{css,types,metadata}/`
  - [x] `src/testing/`
- [x] Add overview docs for each new source system:
  - [x] `src/adapters/Adapters.mdx`
  - [x] `src/primitives/Primitives.mdx`
  - [x] `src/patterns/Patterns.mdx`
  - [x] `src/environments/Environments.mdx`
  - [x] `src/generated/Generated.mdx`
  - [x] `src/testing/Testing.mdx`
- [x] Add `index.ts` barrel exports for each stable public folder.
- [x] Confirm `archive/`, `examples/`, `./dist/docs/`, and `dist/` remain outside of `src`.

### 2. Migrate Existing Source Folders

- [x] Rename `src/dependencies/` to `src/adapters/`.
- [x] Move `src/platforms/` into `src/environments/`.
- [x] Move `src/layouts/` into either:
  - [x] `src/primitives/` for low-level layout primitives
  - [x] `src/components/layout/` for reusable layout components
  - [x] `src/patterns/` for adaptive layout behaviors
- [x] Move `src/design/` into `src/generated/`:
  - [x] `primitives.css` → `src/generated/css/primitives.css`
  - [x] `semantic.css` → `src/generated/css/semantic.css`
  - [x] `theme.css` → `src/generated/css/theme.css`
  - [x] `kinds.ts` → `src/generated/types/kinds.ts`
  - [x] `radius.ts` → `src/generated/types/radius.ts`
  - [x] `tokens.ts` → review and split between source token data and generated output
- [x] Move current root-level component files in `src/components/` into categorized component folders.

### 3. Refactor Foundations

- [x] Keep foundations focused on token data, models, interfaces, and code-driven documentation.
- [x] Split `src/foundations/dimensions/` into:
  - [x] `src/foundations/spacing/`
  - [x] `src/foundations/radius/`
  - [x] `src/foundations/elevation/`
- [x] Normalize foundation file naming:
  - [x] `<Domain>.mdx`
  - [x] `<domain>.ts`
  - [x] `<domain>.types.ts`
  - [x] `index.ts`
- [x] Move React display components out of foundations and into primitives or components.
- [x] Move typography display primitives into `src/primitives/text/` where appropriate.
- [x] Keep typography token data in `src/foundations/typography/`.
- [x] Add missing source files for `src/foundations/device/`:
  - [x] `Device.mdx`
  - [x] `device.ts`
  - [x] `device.types.ts`
  - [x] `index.ts`
- [x] Decide whether `materials/` and `color/Materials.*` should be one foundation domain or two separate domains.

### 3.1. Review Foundations And Verify Classifications of Data
- [x] Ensure all declarations of tokens, data, values, dictionaries, contants, variables, and descriptions that are defined across color, device, spacing, radius, elevation, motion, icon, material, and typeography are correctly organized in the correct folder.  Material data should not be stored in the color definitions.  Typeography foundations should not be stored in the spacing domain.  Every statement of data should be correctly organized into proper files. 

### 4. Refactor Color Adapters

- [x] Move external palette providers out of `src/foundations/color/collections/`.
- [x] Create provider folders:
  - [x] `src/adapters/colors/catppuccin/`
  - [x] `src/adapters/colors/rose-pine/`
- [x] Migrate Catppuccin logic into `src/adapters/colors/catppuccin/`.
- [x] Migrate Rose Pine logic into `src/adapters/colors/rose-pine/`.
- [x] Define a shared color adapter interface for external palettes.
- [x] Import only normalized adapter output into foundation color files.
- [x] Keep `src/foundations/color/color.ts` clean, purpose-driven, and independent of provider-specific logic.

### 5. Build Primitives, Components, and Patterns

- [ ] Create primitive folders for core UI building blocks:
  - [x] `box/`
  - [x] `stack/`
  - [x] `grid/`
  - [x] `surface/`
  - [x] `text/`
  - [x] `icon/`
  - [x] `button/`
  - [x] `input/`
- [x] Move low-level reusable UI from `archive/primitives/` into `src/primitives/` only after rewriting against the new token model.
- [ ] Reorganize `src/components/` by domain:
  - [x] `layout/`
  - [ ] `typography/`
  - [x] `data/`
  - [ ] `surfaces/`
  - [ ] `feedback/`
  - [ ] `forms/`
  - [x] `navigation/`
  - [ ] `overlays/`
- [ ] Create adaptive pattern folders:
  - [ ] `navigation-stack/`
  - [ ] `split-view/`
  - [ ] `sidebar-layout/`
  - [ ] `inspector-panel/`
  - [ ] `adaptive-shell/`
- [ ] Refactor current layout logic into primitives, components, or patterns based on abstraction level.

### 6. Build the Environment Engine

- [x] This task is entirely defined in [EnvironmentEngine.md](/Users/kwaight/src/ai-conversations/web/todo/EnvironmentEngine.md).
- [x] Complete all tasks in [EnvironmentEngine.md](/Users/kwaight/src/ai-conversations/web/todo/EnvironmentEngine.md). Do not continue to the next step until this is reviewed and merged.
- [x] Internalize documentation of the EnvironmentEngine based on the EnvironmentEngine product scope document as well as any findings the developer reported during the development. Attempt to establish mermaid diagrams of the major system components as well as the application flow and execution layers.

### 7. Improve Storybook and Documentation

- [ ] Make foundation stories code-driven and token-driven.
- [ ] Use Storybook docs tables and controls to display token values, types, props, and variants.
- [ ] Reduce showroom-style foundation stories unless they explain a code-derived value.
- [ ] Move complete workflow/view stories into `examples/storybook/views/`.
- [ ] Move mock data into `examples/storybook/mocks/` or consolidate existing `examples/mocks/` into that structure.
- [ ] Add an `Environments/Environment Engine` story showing live device, viewport, launch mode, safe area, capabilities, and resolved layout behavior.
- [ ] Add autodocs coverage for primitives and components.
- [ ] Add visual/integration stories for adaptive patterns.

### 8. Add Testing and QA Structure

- [ ] Create `src/testing/` for shared render helpers, fixtures, and Storybook/Vitest utilities.
- [ ] Add tests for token generation parity.
- [ ] Add tests for color adapter normalization.
- [ ] Add tests for environment detection and profile resolution.
- [ ] Add tests for responsive pattern behavior.
- [ ] Add dependency graph checks with `madge`.
- [ ] Ensure no production imports reference `archive/`, `examples/`, `./dist/docs/`, or `dist/`.

### 9. Build Generated Artifact Pipeline

- [ ] Build a CSS generator so CSS variables, utility classes, token names, and TypeScript values stay in 1:1 parity.
- [ ] Generate CSS artifacts into `src/generated/css/`.
- [ ] Generate TypeScript metadata into `src/generated/types/` and `src/generated/metadata/`.
- [ ] Add a clear "do not edit directly" header to generated files.
- [ ] Update build scripts so generated artifacts are reproducible.
- [ ] Exclude stale generated docs from source decisions.

### 10. Clean Archive and Build Artifacts

- [ ] Treat `archive/` as reference-only code.
- [ ] Rebuild useful archive components into the new architecture instead of moving them directly.
- [ ] Remove archive references from Typedoc output.
- [ ] Update Typedoc config to exclude:
  - [ ] `archive/**`
  - [ ] `examples/**`
  - [ ] `dist/**`
  - [ ] `docs/**`
  - [ ] `node_modules/**`
- [ ] Migrate `docs/` to live under `dist/docs/` instead of project root.
- [ ] Ensure `dist/` contains only build/runtime artifacts.
- [ ] Delete archive once all useful components have been rebuilt or intentionally discarded.

### 11. Dependency and Package Hygiene

- [ ] Confirm which dependencies belong in `dependencies` versus `devDependencies`.
- [ ] Keep external UI systems behind adapters where possible.
- [ ] Add package export paths for public APIs.
- [ ] Confirm the package builds as ESM.
- [ ] Confirm Storybook, Typedoc, Vitest, Vite, and package exports all resolve the same public entrypoints.
- [ ] Add documentation for installing, flushing, and updating dependencies.


### 12. Implement icons.
- [x] Icons have been stored in /Users/kwaight/src/ai-conversations/web/assets . Create a primitive SVG component to display icons. In foundations icon define size tokens relative to the other size tokesn referenced for avatars, swatches, and other sm, lg, xl, related tokens.  Make sure we generate each icon as a first class react component.  These icons have animation capabilities, color capabilities, etc that we will create extentions icon components to support those different capabilities


## Contributing

This repository is being refactored into a reusable internal design system. Contributors should treat the current implementation as a migration workspace: preserve useful behavior, but rebuild source code around the target architecture rather than copying legacy files forward unchanged.

Start here:

```text
├── README.md                         # Project overview, commands, and local development workflow
├── src/Overview.mdx                  # Design-system overview and Storybook table of contents
└── src/DesignSystemFolderRefactor.md # Architecture plan, migration checklist, and folder specification
```

### Contribution Principles

- Keep each folder focused on one system, domain, provider, or artifact type.
- Prefer repeatable folder patterns over one-off files.
- Keep foundations data-focused: tokens, models, interfaces, and generated documentation.
- Keep external libraries behind adapters when they shape public API or runtime behavior.
- Build primitives before higher-level components.
- Build adaptive patterns before app-specific views.
- Keep complete views, mocks, and workflow demos outside package source.
- Treat generated files as build artifacts, not hand-authored source.
- Treat `archive/` as reference-only code until useful pieces are rebuilt correctly.

### Architecture Flow

```text
Foundations   -> data, tokens, models, and type contracts
Adapters      -> normalized wrappers around external libraries and provider data
Primitives    -> low-level React UI bindings over foundations and adapters
Components    -> reusable interface pieces composed from primitives
Patterns      -> adaptive layout and interaction systems composed from components
Environments  -> runtime profiles for iOS, iPad, desktop, PWA, and browser contexts
Examples      -> complete workflows, mocks, and Storybook integration demos
```

## Storybook Guidelines

Storybook is the primary documentation, review, and integration surface for the design system.

Guidelines:

- Prefer one maintainable Storybook page per source folder or domain.
- Pull related components and scenarios into that page so behavior can be reviewed in one place.
- Use Storybook controls, docs tables, autodocs, play functions, and interaction tests where appropriate.
- Foundation stories should be code-driven and token-driven.
- Component stories should demonstrate props, variants, states, accessibility behavior, and environment-specific behavior.
- Pattern stories should demonstrate adaptive behavior across iOS, iPad, and desktop profiles.
- Complete workflow stories belong in `examples/storybook/views/`, not package source.

## Scripts

Local development is managed through `scripts/dev.sh` and package scripts in `package.json`.

```text
├── scripts/
│   └── dev.sh   # Storybook, Tailscale serve, demo runtime, cleanup, and restart helpers
```

### Storybook

```bash
pnpm run sb          # Start Storybook
pnpm run stories     # Alias for Storybook
pnpm run sb:restart  # Stop, free port, and restart Storybook
pnpm run sb:stop     # Stop Storybook
pnpm run sb:clean    # Clear Storybook/Vite caches and build output
pnpm run sb:reset    # Stop, clean, and restart Storybook
pnpm run sb:build    # Build static Storybook output to dist/storybook
```

### Tailscale Serve

```bash
pnpm run serve:up      # Expose Storybook through Tailscale Serve
pnpm run serve:down    # Disable Tailscale Serve
pnpm run serve:status  # Show Tailscale Serve status and health checks
pnpm run up            # Start Storybook and Tailscale Serve together
```

### Build, Test, and QA

```bash
pnpm run build       # TypeScript project build and Vite build
pnpm run typecheck   # TypeScript project check
pnpm run lint        # Biome check
pnpm run format      # Biome format --write
pnpm run test        # Vitest Storybook test project
pnpm run test:watch  # Vitest Storybook test project in watch mode
pnpm run docs        # Generate Typedoc documentation
```

### Demo Runtime

```bash
pnpm run demo:build  # Build the demo runtime
pnpm run demo        # Run the demo runtime locally
pnpm run demo:up     # Start demo runtime service
pnpm run demo:down   # Stop demo runtime service
pnpm run demo:stop   # Force-stop demo runtime service
```

## Dependencies

Package dependency state is managed by pnpm.

```text
./
├── package.json      # Scripts, package metadata, dependency declarations
├── pnpm-lock.yaml    # Locked dependency graph
├── .npmrc            # pnpm/npm configuration
└── node_modules/     # Installed packages; never edit directly
```

### Install Dependencies

```bash
pnpm install
```

### Add Runtime Dependencies

Use runtime dependencies only for libraries required by applications that consume this design-system package.

```bash
pnpm add <package-name>
```

Examples of runtime dependencies:

- `react`
- `react-dom`
- `react-aria-components`
- `framer-motion`
- `@use-gesture/react`
- `@tanstack/react-virtual`
- `clsx`
- `culori`
- palette/icon packages used by exported adapters

### Add Development Dependencies

Use development dependencies for local tooling, build systems, docs, tests, formatters, and Storybook-only packages.

```bash
pnpm add -D <package-name>
```

Examples of development dependencies:

- `typescript`
- `vite`
- `vitest`
- `storybook`
- `typedoc`
- `playwright`
- `biome`
- `madge`

### Clean and Reinstall Dependencies

Use this when dependency state, lockfiles, generated caches, or Storybook output becomes inconsistent.

```bash
rm -rf node_modules
rm -rf dist
rm -rf .storybook-cache
pnpm install
pnpm run typecheck
pnpm run test
```

### Dependency Policy

- Keep consumer-required libraries in `dependencies`.
- Keep build/test/docs tooling in `devDependencies`.
- Put external provider integrations behind adapters before exposing them through package APIs.
- Avoid importing external provider packages directly from components.
- Keep the lockfile committed so development and CI resolve the same dependency graph.

## Build and Runtime Artifacts

Build configuration and runtime tooling are defined at the project root.

```text
├── biome.json          # Formatting and linting configuration
├── tsconfig.json       # TypeScript project configuration
├── typedoc.json        # Typedoc documentation configuration
├── vite.config.ts      # Vite build/runtime configuration
├── vitest.config.ts    # Vitest and Storybook test configuration
└── src/vite-env.d.ts   # Vite type declarations
```

### Artifact Boundaries

Generated outputs should remain outside hand-authored source unless they are intentionally committed generated artifacts.

```text
./dist/                         # Build and runtime artifacts
├── tsconfig.tsbuildinfo         # TypeScript incremental build cache
├── logs/                        # Runtime logs
│   └── debug-storybook.log
├── storybook/                   # Static Storybook build output
└── docs/                        # Generated Typedoc output, if configured here
```

### Testing

Testing should cover both low-level contracts and Storybook integration behavior.

Required test areas:

- token generation parity
- color adapter normalization
- environment profile resolution
- responsive pattern behavior
- Storybook interaction tests
- dependency graph boundaries

### Linting and QA

Use Biome for formatting and linting. Use TypeScript for API and package contract validation. Use Madge for dependency graph checks where architectural boundaries need enforcement.

### Documentation Artifacts

Typedoc output is generated from exported TypeScript APIs. Storybook output is generated from stories and MDX documentation. Neither should be treated as source truth unless the generated output is intentionally committed for deployment.

### Source

entrypoints

├── index.html
├── main.tsx

understanding of system, etc

The organization of `./src` is
```text
./src/
└── <System>
    └── <Domain>
        └── <Provider>
            └── <Artifacts>
```

src root files
```text
./src
├── Overview.mdx # Overview Of Design System & Table Of Contents
```

```markdown
## Core Source Folder Plan

The `src` directory is organized around stable design-system layers. Each layer has a clear responsibility and should not become a miscellaneous holding area.

```text
./src/
├── Overview.mdx
├── foundations/
├── adapters/
├── primitives/
├── components/
├── patterns/
├── environments/
├── generated/
├── lib/
├── testing/
└── lab/
```

General folder pattern:

```text
./src/<system>/<domain>/<provider-or-feature>/<artifacts>
```

Use this pattern where it creates clarity. Do not add unnecessary nesting when a folder only owns one domain.

---

### Foundations

Foundations define the source-of-truth design data for the system. This layer should contain tokens, type contracts, models, and documentation. It should not contain application components or provider-specific integration logic.

```text
./src/foundations/
├── Foundations.mdx
├── index.ts
│
├── color/
│   ├── Color.mdx
│   ├── color.ts
│   ├── color.types.ts
│   └── index.ts
│
├── device/
│   ├── Device.mdx
│   ├── device.ts
│   ├── device.types.ts
│   └── index.ts
│
├── spacing/
│   ├── Spacing.mdx
│   ├── spacing.ts
│   ├── spacing.types.ts
│   └── index.ts
│
├── radius/
│   ├── Radius.mdx
│   ├── radius.ts
│   ├── radius.types.ts
│   └── index.ts
│
├── elevation/
│   ├── Elevation.mdx
│   ├── elevation.ts
│   ├── elevation.types.ts
│   └── index.ts
│
├── motion/
│   ├── Motion.mdx
│   ├── motion.ts
│   ├── motion.types.ts
│   └── index.ts
│
├── icon/
│   ├── Icon.mdx
│   ├── icon.ts
│   ├── icon.types.ts
│   └── index.ts
│
├── material/
│   ├── Material.mdx
│   ├── material.ts
│   ├── material.types.ts
│   └── index.ts
│
└── typography/
    ├── Typography.mdx
    ├── typography.ts
    ├── typography.types.ts
    └── index.ts
```

Foundation folder contract:

```text
<domain>/
├── <Domain>.mdx        # Human documentation and Storybook docs surface
├── <domain>.ts         # Token data, constants, models, and derived values
├── <domain>.types.ts   # Types and interfaces
└── index.ts            # Public exports for the domain
```

#### Foundation Rules

- Keep foundation modules framework-light wherever possible.
- Keep external provider data out of foundations unless it has already been normalized by an adapter.
- Use foundations for stable design contracts, not implementation-specific behavior.
- Move React display components into `primitives/`, `components/`, or Storybook-only stories.
- Keep foundation stories code-driven and token-driven.

#### Device Foundation

The device foundation defines classification types and static contracts. It does not own runtime behavior by itself. Runtime interpretation belongs in `environments/`.

```ts
type DeviceType = "ios" | "ipad" | "desktop";
type ViewportClass = "ios" | "ipad" | "desktop";
type LaunchMode = "browser" | "pwa" | "standalone";
type DisplayMode = "browser" | "standalone" | "fullscreen" | "minimal-ui";
```

Device classification answers:

```text
What kind of device or viewport is this?
```

Environment resolution answers:

```text
Given that device, viewport, launch mode, safe area, and browser context, how should the UI behave?
```

---

### Adapters

Adapters normalize external systems before they enter the design system. They allow the package to consume provider-specific libraries without leaking those provider APIs into foundations, primitives, or components.

```text
./src/adapters/
├── Adapters.mdx
├── index.ts
│
├── colors/
│   ├── Colors.mdx
│   ├── color-adapter.types.ts
│   ├── index.ts
│   │
│   ├── catppuccin/
│   │   ├── Catppuccin.mdx
│   │   ├── catppuccin.ts
│   │   ├── catppuccin.types.ts
│   │   ├── catppuccin.test.ts
│   │   └── index.ts
│   │
│   └── rose-pine/
│       ├── RosePine.mdx
│       ├── rose-pine.ts
│       ├── rose-pine.types.ts
│       ├── rose-pine.test.ts
│       └── index.ts
│
├── icons/
│   ├── lucide/
│   ├── sf-symbols/
│   └── aws/
│
├── motion/
│   ├── framer-motion/
│   └── gesture/
│
└── accessibility/
    └── react-aria/
```

Provider folder contract:

```text
<provider>/
├── <Provider>.mdx        # Provider documentation and usage notes
├── <provider>.ts         # Adapter implementation
├── <provider>.types.ts   # Provider-specific or normalized types
├── <provider>.test.ts    # Adapter normalization tests
└── index.ts              # Public exports for the provider
```

#### Adapter Rules

- Adapters may depend on external libraries.
- Foundations may consume normalized adapter output, but should not import provider-specific implementation details.
- Components should not import external provider packages directly when an adapter exists.
- Provider-specific naming should terminate inside the adapter boundary unless intentionally exported.

---

### Primitives

Primitives are low-level React building blocks. They bind foundations and adapters to UI without encoding full application behavior.

```text
./src/primitives/
├── Primitives.mdx
├── index.ts
│
├── box/
│   ├── Box.mdx
│   ├── Box.tsx
│   ├── Box.stories.tsx
│   ├── box.types.ts
│   └── index.ts
│
├── stack/
├── grid/
├── surface/
├── text/
├── icon/
├── button/
└── input/
```

Primitive rules:

- Primitives should be small, composable, and stable.
- Primitives may consume tokens, CSS variables, normalized adapter output, and shared utilities.
- Primitives should avoid app-specific data, workflow logic, and environment-specific branching unless the primitive exists specifically to expose a low-level environment contract.
- Prefer primitives before creating new components.

---

### Components

Components are reusable interface pieces built from primitives. They may encode design-system variants, states, accessibility behavior, and domain-neutral UI composition.

```text
./src/components/
├── Components.mdx
├── index.ts
│
├── layout/
│   ├── container/
│   ├── grid/
│   └── stack/
│
├── typography/
│   └── text/
│
├── data/
│   ├── table/
│   ├── avatar/
│   └── swatch/
│
├── surfaces/
│   ├── card/
│   └── panel/
│
├── feedback/
├── forms/
├── navigation/
└── overlays/
```

Component rules:

- Components should be reusable across products.
- Components may compose primitives and patterns.
- Components should not contain project-specific mock data.
- Components should expose typed props, Storybook stories, and docs where stable.

---

### Patterns

Patterns are reusable adaptive behaviors and layout systems. They are larger than components but still product-neutral.

```text
./src/patterns/
├── Patterns.mdx
├── index.ts
│
├── navigation-stack/
├── split-view/
├── sidebar-layout/
├── inspector-panel/
└── adaptive-shell/
```

Pattern rules:

- Patterns may combine primitives, components, and environment profiles.
- Patterns should model reusable interaction systems, not one-off screens.
- Adaptive patterns should define clear behavior for iOS, iPad, and desktop.
- Complete product workflows belong in `examples/`, not `patterns/`.

---

### Environments

Environments resolve runtime context into behavior. This layer owns the environment engine for iOS, iPad, desktop, browser, PWA, safe areas, input capabilities, workers, local cache, and launch mode behavior.

```text
./src/environments/
├── Environments.mdx
├── environment-engine.ts
├── environment.types.ts
├── index.ts
│
├── ios/
│   ├── ios-environment.ts
│   ├── ios-safe-area.ts
│   ├── ios-keyboard.ts
│   ├── ios-viewport.ts
│   └── index.ts
│
├── ipad/
│   ├── ipad-environment.ts
│   ├── ipad-layout.ts
│   ├── ipad-navigation.ts
│   └── index.ts
│
├── desktop/
│   ├── desktop-environment.ts
│   ├── desktop-layout.ts
│   ├── desktop-navigation.ts
│   └── index.ts
│
└── pwa/
    ├── manifest.ts
    ├── splash.ts
    ├── service-worker.ts
    ├── push.ts
    ├── cache.ts
    └── index.ts
```

Environment profile contract:

```ts
type EnvironmentProfile = {
  device: DeviceType;
  viewport: ViewportClass;
  launchMode: LaunchMode;

  layout: "single-screen" | "split-view" | "multi-pane";
  navigation: "push-stack" | "popover" | "persistent-sidebar";
  sidebar: "none" | "collapsible" | "persistent";
  inspector: "hidden" | "sheet" | "side-panel";

  safeArea: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  capabilities: {
    touch: boolean;
    hover: boolean;
    keyboard: boolean;
    pwa: boolean;
    push: boolean;
    worker: boolean;
    offlineCache: boolean;
  };
};
```

Environment rules:

- Device classification belongs in `foundations/device`.
- Runtime behavior belongs in `environments/`.
- Layout systems that consume environment profiles belong in `patterns/`.
- PWA install, manifest, splash, service worker, push, and cache behavior belongs in `environments/pwa/`.
- iOS-specific safe-area, keyboard, Safari chrome, and viewport behavior belongs in `environments/ios/`.

---

### Generated

Generated files are derived artifacts. They must be reproducible from foundations, adapters, and build scripts.

```text
./src/generated/
├── Generated.mdx
├── index.ts
│
├── css/
│   ├── primitives.css
│   ├── semantic.css
│   └── theme.css
│
├── types/
│   ├── kinds.ts
│   └── radius.ts
│
└── metadata/
```

Generated rules:

- Do not edit generated files directly.
- Add a generated-file header to every generated artifact.
- Keep generated CSS, TypeScript metadata, and documentation metadata separate.
- Generated artifacts should be rebuilt by scripts and verified by tests.

---

### Lib

`lib` contains shared implementation utilities that do not belong to a more specific source layer.

```text
./src/lib/
├── Lib.mdx
├── index.ts
│
├── hooks/
│   └── index.ts
│
├── colors/
│   ├── color-value.ts
│   └── index.ts
│
├── dates/
│   ├── date.ts
│   └── index.ts
│
└── cn.ts
```

Lib rules:

- Prefer a specific source layer before adding to `lib`.
- Keep `lib` small and intentionally organized.
- Move runtime device hooks into `environments/` when they affect environment behavior.
- Move token-derived helpers into the relevant foundation when they define design contracts.

---

### Testing

Testing contains shared test utilities and architecture boundary checks.

```text
./src/testing/
├── Testing.mdx
├── index.ts
├── render.tsx
├── storybook.ts
├── fixtures.ts
└── architecture.test.ts
```

Testing rules:

- Keep reusable render helpers here.
- Keep shared fixtures here only when they are test-specific.
- Keep product or workflow mock data in `examples/storybook/mocks/`.
- Add boundary tests to prevent production source from importing `archive/`, `examples/`, `./dist/docs/`, or `dist/`.

---

### Lab

`lab` contains active experiments that are not yet stable enough for the design-system source layers.

```text
./src/lab/
├── Lab.mdx
└── ...
```

Lab rules:

- `lab` may import from stable source layers.
- Stable source layers must not import from `lab`.
- Promote successful experiments into the correct source layer.
- Move abandoned experiments to `archive/` or delete them.

---

## External Project Folders

The following folders are intentionally outside `src`.

```text
./examples/     # Complete demos, workflow stories, and mock data
./archive/      # Reference-only obsolete code
./dist/docs/         # Generated Typedoc output if emitted at root
./dist/         # Build and runtime artifacts
./scripts/      # Local development and automation scripts
```

### Examples

```text
./examples/
└── storybook/
    ├── mocks/
    └── views/
```

Examples may depend on package source. Package source must not depend on examples.

### Archive

```text
./archive/
└── ...
```

Archive is reference-only. Do not import archive code into `src`. Rebuild useful ideas into the correct source layer before reuse.
```