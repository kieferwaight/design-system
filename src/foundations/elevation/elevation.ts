import type { BlurTier, ShadowDepth } from "./elevation.types";

/**
 * Backdrop blur tier physical pixel values.
 * Useful for canvas rendering or runtime animation calculations.
 */
export const BLUR_PX: Record<BlurTier, number> = {
  sm: 8,
  md: 16,
  lg: 30,
  xl: 50,
} as const;

/**
 * Backdrop blur CSS variable references.
 * Placed on parent containers to trigger glass-like transparency.
 */
export const blurTier = {
  sm: "var(--blur-sm)",
  md: "var(--blur-md)",
  lg: "var(--blur-lg)",
  xl: "var(--blur-xl)",
} as const;

/**
 * Shadow depth CSS variable references.
 * Sets the altitudinal shadow depth representing elevation on the z-axis.
 */
export const shadowDepth = {
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
} as const;

/**
 * Calibrated shadow specifications for light and dark environments.
 * These are packaged under `light-dark()` in our semantic CSS.
 */
export const SHADOW_VALUES: Record<ShadowDepth, { light: string; dark: string }> = {
  sm: {
    light: "0 1px 2px rgb(0 0 0 / 0.06)",
    dark: "0 1px 2px rgb(0 0 0 / 0.4)",
  },
  md: {
    light: "0 4px 12px rgb(0 0 0 / 0.08)",
    dark: "0 4px 12px rgb(0 0 0 / 0.5)",
  },
  lg: {
    light: "0 12px 32px rgb(0 0 0 / 0.12)",
    dark: "0 12px 32px rgb(0 0 0 / 0.6)",
  },
} as const;
