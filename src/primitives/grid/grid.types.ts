import type { SpacingScale } from "@/foundations/spacing";
import type { BoxProps } from "../box";

export type GridAutoFlow = "row" | "column" | "dense" | "row dense" | "column dense";

export interface GridProps extends BoxProps {
  /** Column template. If a number is passed, generates repeated 1fr items (e.g. repeat(N, minmax(0, 1fr))). Otherwise direct string template. */
  cols?: number | string;
  /** Row template. If N passed, repeat(N, minmax(0, 1fr)). Otherwise string template. */
  rows?: number | string;
  /** Spacing scale gap for both axes. Maps to space-0 through space-9 scale. */
  gap?: SpacingScale;
  /** Column gap. Maps to space-0 through space-9 scale. */
  gapX?: SpacingScale;
  /** Row gap. Maps to space-0 through space-9 scale. */
  gapY?: SpacingScale;
  /** Auto-flow mode. Defaults to "row". */
  flow?: GridAutoFlow;
}
