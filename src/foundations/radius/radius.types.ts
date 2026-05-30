/**
 * Glyph size keys pairing to physical sizes (16px to 80px).
 * Primarily used for visual atoms such as Swatch and Avatar.
 */
export type GlyphSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Concentric container layer depth tokens.
 * L0 represents the outermost window/device screen, L6 represents innermost items.
 */
export type LayerRadius =
  | "layer-0"
  | "layer-1"
  | "layer-2"
  | "layer-3"
  | "layer-4"
  | "layer-5"
  | "layer-6";

export interface LayerRadiusInfo {
  token: string;
  valuePx: number;
  description: string;
}
