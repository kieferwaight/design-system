import type { SpacingScale } from "@/foundations/spacing";
import type { BoxProps } from "../box";

export type StackDirection = "row" | "column" | "horizontal" | "vertical";
export type StackAlign = "start" | "end" | "center" | "baseline" | "stretch";
export type StackJustify = "start" | "end" | "center" | "between" | "around" | "evenly";
export type StackWrap = boolean | "wrap" | "nowrap" | "wrap-reverse";

export interface StackProps extends BoxProps {
  /** Flex container flow direction. Defaults to "vertical". */
  direction?: StackDirection;
  /** Spacing scale gap between children. Maps to space-0 through space-9 scale. */
  gap?: SpacingScale;
  /** Cross-axis item alignment (alignItems). Defaults to "stretch". */
  align?: StackAlign;
  /** Main-axis distribution (justifyContent). Defaults to "start". */
  justify?: StackJustify;
  /** Wrap behavior. Defaults to false (nowrap). */
  wrap?: StackWrap;
}
