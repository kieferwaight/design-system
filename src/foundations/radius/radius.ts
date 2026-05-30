import type { GlyphSize, LayerRadiusInfo } from "./radius.types";

/**
 * Concentric layer corner radius hierarchy scale.
 * The standard ladder assumes a one-spacing-unit gap (--space-1 = 4px).
 */
export const LAYER_RADII: Record<number, LayerRadiusInfo> = {
  0: { token: "--radius-layer-0", valuePx: 28, description: "Window / device screen" },
  1: { token: "--radius-layer-1", valuePx: 24, description: "Side nav, sheets" },
  2: { token: "--radius-layer-2", valuePx: 20, description: "Panels" },
  3: { token: "--radius-layer-3", valuePx: 16, description: "Cards" },
  4: { token: "--radius-layer-4", valuePx: 12, description: "Controls" },
  5: { token: "--radius-layer-5", valuePx: 8, description: "Inputs, chips" },
  6: { token: "--radius-layer-6", valuePx: 4, description: "Innermost" },
} as const;

/**
 * Two corner-radius systems, deliberately separate:
 *
 * - **Layer radii** (`--radius-layer-0 … 6`) organize NESTED CONTAINERS — `inner = outer − gap`.
 * - **Glyph radii** (below) pair a SINGLE box's corners to its size, so a
 *   glyph-like box (swatch, avatar, chip) reads as a rounded square at any scale.
 */

/**
 * The shared glyph-box SIZE ladder (px) — the single source of truth for the
 * square/circle glyph atoms (Swatch, Avatar). An even ×1.5 modular ratio; `md` is the default.
 */
export const GLYPH_SIZE_PX: Record<GlyphSize, number> = {
  xs: 16,
  sm: 24,
  md: 36,
  lg: 54,
  xl: 80,
} as const;

/** CSS var refs for the named glyph-radius buckets (paired to `GLYPH_SIZE_PX`). */
export const radiusGlyph = {
  xs: "var(--radius-glyph-xs)", // 16px box → 4
  sm: "var(--radius-glyph-sm)", // 24 → 6
  md: "var(--radius-glyph-md)", // 36 → 8
  lg: "var(--radius-glyph-lg)", // 54 → 11
  xl: "var(--radius-glyph-xl)", // 80 → 14
} as const;

/** [boxSizePx, radiusPx] anchors — the calibration the buckets/tokens encode. */
const ANCHORS: [number, number][] = [
  [16, 4],
  [24, 6],
  [36, 8],
  [54, 11],
  [80, 14],
];

/**
 * Glyph corner radius (px) for a box of `sizePx`, interpolated across the anchor
 * scale (and extrapolated past the ends, floored at 2px). Use for glyph-like
 * boxes whose radius should track their own size — smaller rounds proportionally
 * more (xs ≈ ¼ of the box) so corners stay visible, larger rounds less (xl ≈ ⅙).
 */
export function glyphRadius(sizePx: number): number {
  const a = ANCHORS;
  const first = a[0];
  const last = a[a.length - 1];
  if (sizePx <= first[0]) {
    const slope = (a[1][1] - first[1]) / (a[1][0] - first[0]);
    return Math.max(2, Math.round(first[1] - slope * (first[0] - sizePx)));
  }
  for (let i = 0; i < a.length - 1; i++) {
    const [x0, r0] = a[i];
    const [x1, r1] = a[i + 1];
    if (sizePx <= x1) {
      const t = (sizePx - x0) / (x1 - x0);
      return Math.round(r0 + t * (r1 - r0));
    }
  }
  const [x0, r0] = a[a.length - 2];
  const slope = (last[1] - r0) / (last[0] - x0);
  return Math.round(last[1] + slope * (sizePx - last[0]));
}
