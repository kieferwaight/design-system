import type { Bubble } from "./types";

const now = Date.now() / 1000;
const MINUTE = 60;

export const mockBubbles: Bubble[] = [
  {
    id: "b1",
    role: "user",
    content:
      "We are going to rewrite this report using a modern framework system that is flexible, fast, and structured. Do some research on the latest single page application tech stacks available right now.",
    content_type: "text",
    date: now - 60 * MINUTE,
  },
  {
    id: "b2",
    role: "assistant",
    content: `## Bleeding-edge SPA stacks — May 2026

Three real camps right now:

1. **Signals-first, no virtual DOM** — SolidJS 2.0 (Beta), Svelte 5 with runes. ~7–20KB runtime, fine-grained updates.
2. **Type-safe React without Next.js** — TanStack Start v1.0 in SPA mode, React Router 7. Compile-time-typed routes.
3. **Islands / hybrid** — Astro 5 with Server Islands. Right for content sites, wrong for one-big-interactive-surface apps.

Build baseline is **Vite 8 + Rolldown** everywhere except Next. The View Transitions API is shipped in every major browser, so route swaps stop needing Framer Motion.`,
    content_type: "markdown",
    date: now - 58 * MINUTE,
  },
  {
    id: "b3",
    role: "user",
    content: "Also, can we start with a hosted storyboard of sorts so we can make sure the components without data are correct first.",
    content_type: "text",
    date: now - 30 * MINUTE,
  },
  {
    id: "b4",
    role: "assistant",
    content: `Smart pivot. Building the design system against mock data first lets us iterate on visual hierarchy without dragging the WebSocket layer through every tweak.

**Stack**: Vite + React + Ladle + Tailwind v4. iOS-native dark. Auto-deploys to GitHub Pages on push.`,
    content_type: "markdown",
    date: now - 28 * MINUTE,
  },
];
