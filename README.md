# data-portal web

The new SPA + component library. Built mobile-first as a PWA for browsing the
data-portal archive. Currently in **phase 0**: component storyboard against
mock data. No backend integration yet.

## Commands

The component storyboard runs on **Storybook** (loopback `:6066`), exposed over
Tailscale TLS at `https://dev.tailb19d9.ts.net:6006`. Day-to-day ops are wrapped
in npm scripts (backed by `scripts/dev.sh`) so they're one repeatable command each.

```bash
pnpm install         # one-time install

# Storybook dev loop
pnpm run sb          # start Storybook (alias: `pnpm stories`)
pnpm run sb:restart  # kill + free port + start fresh   <- usual after-edit command
pnpm run sb:stop     # stop the server, free :6066
pnpm run sb:clean    # clear Storybook/Vite caches + build output
pnpm run sb:reset    # stop -> clean -> restart (when something's wedged)

# Tailscale exposure (TLS :6006 -> loopback :6066)
pnpm run serve:up     # start the Tailscale serve proxy
pnpm run serve:down   # tear it down
pnpm run serve:status # serve status + local health check
pnpm run up           # serve:up + start Storybook (cold start)

# Build / quality
pnpm run sb:build    # static storyboard build (-> storyboard/)
pnpm run typecheck   # tsc -b
pnpm run lint        # Biome check
pnpm run format      # Biome format --write
pnpm run dev         # Vite dev server (real app shell — later)
```

Ports are decoupled because `tailscale serve` reserves `:6006` on the node, which
would block Storybook's `0.0.0.0:6006` bind — so Storybook stays on loopback
`:6066` and Tailscale fronts it with TLS on `:6006`.

## Layout

The Storybook is organized as a Design Kit catalog (sidebar order set in
`.storybook/preview.tsx`; see `src/Overview.mdx` for conventions):

```
src/
  design/        — CSS token tiers (primitives.css → semantic.css → theme.css) + tokens.ts, kinds.ts
  lib/           — pure utilities (cn, etc.)
  mocks/         — typed mock data shaped like the future API payloads
  foundations/   — Color (incl. model.ts + Collections), Typography, Dimensions, Icons
  components/    — atomic components (being rebuilt)  — placeholder
  layouts/ views/ platforms/ lab/   — catalog sections (mostly stubs)
  dependencies/  — doc-only overviews (React Aria, Motion)
  archive/       — the original prototypes, frozen (primitives/rows/nav/list/content/chrome)
```

Every component/doc has a co-located `*.stories.tsx` or `*.mdx`, picked up by the
`stories` glob in `.storybook/main.ts`. Place = each story's `title`.

## Deployment

A GitHub Actions workflow builds the static storyboard (`pnpm run sb:build` →
`storyboard/`) and publishes to GitHub Pages. _(Note: the workflow predates the
Ladle→Storybook migration — verify `.github/workflows/*` still matches the
`storybook build` output before relying on it.)_

# Data Portal Web Design System

Internal React design system and component library for data-portal interfaces.

This package provides reusable foundations, adapters, primitives, components, patterns, and environment-aware UI behavior for building mobile-first PWA interfaces and desktop-capable web applications. It is authored as an ESM-first React package and is intended to be published internally through npm for reuse across projects.

## Current Status

This project is in an early design-system migration phase.

The current codebase contains a working Storybook catalog, mock data, prototype components, generated documentation, and archived UI experiments. The target architecture is being formalized so the design system can evolve from prototype components into a reusable package.

Do not treat `archive/` as production source. Components in `archive/` are reference material only and should be rebuilt against the new foundations, primitives, and environment model before reuse.

## Primary Targets

The design system prioritizes two runtime targets:

1. **iOS PWA applications served over Tailscale**
   - Single-screen mobile flows
   - Safe-area and notch-aware layouts
   - Safari browser chrome awareness
   - Installed PWA launch mode handling
   - Local asset caching and worker support
   - Touch-first interaction patterns

2. **Desktop-capable web applications**
   - Wide responsive layouts
   - Persistent navigation surfaces
   - Left and right sidebar patterns
   - Keyboard and pointer-friendly interaction patterns
   - Multi-pane application shells

## Architecture Model

The source architecture follows a layered design-system model:

```text
Foundations
  -> Adapters
  -> Primitives
  -> Components
  -> Patterns
  -> Environments
  -> Examples
```

### Layer Responsibilities

| Layer | Responsibility |
| --- | --- |
| `foundations/` | Source-of-truth tokens, type models, design data, and code-driven docs. |
| `adapters/` | Normalized integrations for external systems such as palettes, icon libraries, animation libraries, and accessibility libraries. |
| `primitives/` | Low-level UI building blocks that bind foundations to React. |
| `components/` | Reusable application UI components built from primitives. |
| `patterns/` | Adaptive layout and behavior patterns such as split views, navigation stacks, and inspector panels. |
| `environments/` | Runtime behavior for iOS, iPad, desktop, PWA, safe areas, launch modes, and device capability profiles. |
| `examples/` | End-to-end demos, mock data, and workflow-level Storybook examples. |
| `generated/` | Generated CSS, TypeScript metadata, and build artifacts derived from foundations and adapters. |
| `lab/` | Experiments that are not ready to become stable package source. |

## Target Source Structure

```text
src/
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

examples/
└── storybook/
    ├── mocks/
    └── views/

archive/        # Reference-only prototype code
scripts/        # Local development helpers
dist/           # Build/runtime artifacts
docs/           # Generated documentation, if emitted at project root
```

## Environment Engine

The environment layer resolves device, viewport, launch mode, safe-area values, browser chrome behavior, input capabilities, PWA support, and layout/navigation strategy into one runtime profile.

Example profile shape:

```ts
type EnvironmentProfile = {
  device: "ios" | "ipad" | "desktop";
  viewport: "ios" | "ipad" | "desktop";
  launchMode: "browser" | "pwa" | "standalone";
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

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start Storybook:

```bash
pnpm run sb
```

Restart Storybook after edits or server issues:

```bash
pnpm run sb:restart
```

Expose Storybook over Tailscale:

```bash
pnpm run serve:up
```

Start Storybook and Tailscale exposure together:

```bash
pnpm run up
```

## Commands

### Storybook

```bash
pnpm run sb          # Start Storybook
pnpm run stories     # Alias for Storybook
pnpm run sb:restart  # Stop, free port, and restart Storybook
pnpm run sb:stop     # Stop Storybook
pnpm run sb:clean    # Clear Storybook/Vite caches and build output
pnpm run sb:reset    # Stop, clean, and restart Storybook
pnpm run sb:build    # Build static Storybook output
```

### Tailscale Serve

Storybook runs on local loopback `:6066`. Tailscale serves it with TLS on `:6006`.

```bash
pnpm run serve:up      # Start Tailscale serve proxy
pnpm run serve:down    # Stop Tailscale serve proxy
pnpm run serve:status  # Show serve status and health check
pnpm run up            # Start serve proxy and Storybook
```

### Build and Quality

```bash
pnpm run build       # TypeScript build and Vite build
pnpm run typecheck   # TypeScript project check
pnpm run lint        # Biome check
pnpm run format      # Biome format --write
pnpm run test        # Vitest Storybook test project
pnpm run test:watch  # Vitest Storybook test project in watch mode
pnpm run docs        # Generate Typedoc documentation
```

### Demo Runtime

```bash
pnpm run demo:build
pnpm run demo
pnpm run demo:up
pnpm run demo:down
pnpm run demo:stop
```

## Documentation

Documentation is split across Storybook and Typedoc.

- **Storybook** documents foundations, primitives, components, patterns, environment behavior, and workflow examples.
- **Typedoc** documents exported TypeScript APIs, models, utilities, hooks, and package entrypoints.
- **MDX docs** provide local explanations for each design-system layer and domain.

## Storybook Conventions

Use Storybook as the interactive catalog and integration test surface.

Guidelines:

- Prefer one maintainable Storybook page per domain or component folder.
- Use Storybook controls, docs tables, and play functions where useful.
- Foundation stories should be code-driven and token-driven.
- Component stories should demonstrate props, states, variants, accessibility behavior, and environment behavior.
- Complete views and workflows should live in `examples/storybook/views/`.
- Mock data should live in `examples/storybook/mocks/`.

## Package Conventions

### Folder Pattern

Use the following hierarchy where possible:

```text
<System>/<Domain>/<Provider>/<Artifacts>
```

Examples:

```text
src/adapters/colors/catppuccin/
src/adapters/icons/lucide/
src/foundations/color/
src/components/navigation/
src/environments/pwa/
```

### Provider Folder Pattern

```text
provider/
├── Provider.mdx
├── provider.ts
├── provider.types.ts
├── provider.test.ts
└── index.ts
```

### Foundation Folder Pattern

```text
domain/
├── Domain.mdx
├── domain.ts
├── domain.types.ts
└── index.ts
```

## Dependency Policy

External systems should be wrapped behind adapters when they influence public API, runtime behavior, or design-system conventions.

Examples:

- Palette packages belong behind `adapters/colors/*`.
- Icon systems belong behind `adapters/icons/*`.
- Motion systems belong behind `adapters/motion/*`.
- Accessibility libraries belong behind `adapters/accessibility/*`.

Keep package dependencies intentional:

- Use `dependencies` for libraries required by consumers at runtime.
- Use `devDependencies` for build, docs, Storybook, tests, formatting, and local tooling.

## Generated Artifacts

Generated files should be reproducible and should not be edited directly.

Target generated structure:

```text
src/generated/
├── css/
│   ├── primitives.css
│   ├── semantic.css
│   └── theme.css
├── types/
│   ├── kinds.ts
│   └── radius.ts
└── metadata/
```

## Archive Policy

`archive/` contains prototype UI from earlier iterations. It is retained only as reference material.

Rules:

- Do not import from `archive/` in production source.
- Do not use archive files as the source of architectural decisions.
- Rebuild useful archive components into `primitives/`, `components/`, or `patterns/`.
- Exclude `archive/**` from generated API documentation.
- Delete archive code after useful patterns have been rebuilt or intentionally discarded.

## Build Artifacts

Expected artifact boundaries:

```text
dist/                 # Build/runtime artifacts
├── logs/             # Runtime logs
├── storybook/        # Static Storybook build
└── docs/             # Generated Typedoc output, if configured here
```

Generated docs may currently exist at project root under `docs/`. That should either remain intentional or be moved under `dist/docs/` as part of the cleanup plan.

## Deployment

A GitHub Actions workflow is expected to build the static Storybook catalog and publish it to GitHub Pages.

Before relying on deployment, verify the workflow output path matches the current Storybook build command:

```bash
pnpm run sb:build
```

## Development Principles

- Keep folders single-purpose.
- Make repeatable patterns instead of one-off files.
- Keep foundations data-focused.
- Keep external library behavior behind adapters.
- Build primitives before components.
- Build adaptive patterns before app-specific views.
- Keep examples outside package source.
- Keep generated artifacts reproducible.
- Keep archive code isolated until it is rebuilt or removed.