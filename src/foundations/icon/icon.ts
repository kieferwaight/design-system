import type { IconSize } from "./icon.types";

/**
 * Physical pixel sizes for icons.
 * Aligned proportionally to be slightly smaller than the box scales for avatars/swatches,
 * ensuring they sit cleanly inside their structural container boxes.
 */
export const ICON_SIZE_PX: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 28,
  xl: 36,
} as const;

/**
 * CSS variable references for standard icon sizes.
 */
export const iconSize = {
  xs: "var(--icon-size-xs)",
  sm: "var(--icon-size-sm)",
  md: "var(--icon-size-md)",
  lg: "var(--icon-size-lg)",
  xl: "var(--icon-size-xl)",
} as const;
