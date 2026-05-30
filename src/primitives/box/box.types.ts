import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { BlurTier, ShadowDepth } from "@/foundations/elevation";
import type { GlyphSize, LayerRadius } from "@/foundations/radius";
import type { SpacingScale } from "@/foundations/spacing";

export type BoxSpacing =
  | SpacingScale
  | Partial<Record<"top" | "bottom" | "left" | "right" | "x" | "y", SpacingScale>>;

export type BoxBorderDirection = "all" | "top" | "bottom" | "left" | "right" | "x" | "y";

export interface BoxProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** The element type or React component to render as. Defaults to "div". */
  as?: ElementType;
  /** Margin space mapping to space-0 through space-9 scale. */
  margin?: BoxSpacing;
  /** Padding space mapping to space-0 through space-9 scale. */
  padding?: BoxSpacing;
  /** Corner radius mapping to layer scale (layer-0..6) or glyph scale (xs..xl), or custom. */
  radius?: LayerRadius | GlyphSize | string | number;
  /** Ambient box shadow depth tier. */
  shadow?: ShadowDepth;
  /** Backdrop blur physical glass tier. */
  blur?: BlurTier;
  /** Semantic background token alias or custom CSS value. */
  bg?: "canvas" | "base" | "secondary" | "tertiary" | "elevated" | "sunken" | string;
  /** Border activation (true/all), direction(s) (top, x, y etc), or custom CSS border statement. */
  border?: boolean | BoxBorderDirection | BoxBorderDirection[] | string;
  /** Optional custom border color. Defaults to var(--color-border). */
  borderColor?: string;
  children?: ReactNode;
}
