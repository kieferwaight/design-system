import type { MaterialThickness } from "@/foundations/material";
import type { BoxProps } from "../box";

export type SurfaceLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface SurfaceProps extends BoxProps {
  /**
   * Concentric layer altitude level (0..6).
   * Automatically sets the corner radius (layer-0..6) and resolves standard semantic background colors.
   */
  level?: SurfaceLevel;
  /**
   * Translucent apple-style backdrop-filter material thickness.
   * If supplied, applies glassmorphic styling class.
   */
  material?: MaterialThickness;
}
