import { type CSSProperties, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Box } from "../box";
import type { StackProps } from "./stack.types";

export const Stack = forwardRef<HTMLElement, StackProps>(
  (
    {
      direction = "vertical",
      gap,
      align = "stretch",
      justify = "start",
      wrap = false,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    // direction translation
    const dirMap: Record<typeof direction, CSSProperties["flexDirection"]> = {
      row: "row",
      column: "column",
      horizontal: "row",
      vertical: "column",
    };
    const flexDir = dirMap[direction] || "column";

    // align translation
    const alignMap: Record<typeof align, CSSProperties["alignItems"]> = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      baseline: "baseline",
      stretch: "stretch",
    };
    const alignItems = alignMap[align] || "stretch";

    // justify translation
    const justifyMap: Record<typeof justify, CSSProperties["justifyContent"]> = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      between: "space-between",
      around: "space-around",
      evenly: "space-evenly",
    };
    const justifyContent = justifyMap[justify] || "flex-start";

    // wrap translation
    const flexWrap: CSSProperties["flexWrap"] =
      wrap === true ? "wrap" : wrap === false ? "nowrap" : wrap;

    const stackStyles: CSSProperties = {
      display: "flex",
      flexDirection: flexDir,
      alignItems,
      justifyContent,
      flexWrap,
      ...(gap ? { gap: `var(--${gap})` } : {}),
      ...style,
    };

    return (
      <Box ref={ref} className={cn("stack", className)} style={stackStyles} {...rest}>
        {children}
      </Box>
    );
  },
);

Stack.displayName = "Stack";
