import { type CSSProperties, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Box } from "../box";
import type { GridProps } from "./grid.types";

export const Grid = forwardRef<HTMLElement, GridProps>(
  ({ cols, rows, gap, gapX, gapY, flow = "row", className, style, children, ...rest }, ref) => {
    // Columns template translation
    const gridCols = typeof cols === "number" ? `repeat(${cols}, minmax(0, 1fr))` : cols;

    // Rows template translation
    const gridRows = typeof rows === "number" ? `repeat(${rows}, minmax(0, 1fr))` : rows;

    const gridStyles: CSSProperties = {
      display: "grid",
      ...(gridCols ? { gridTemplateColumns: gridCols } : {}),
      ...(gridRows ? { gridTemplateRows: gridRows } : {}),
      ...(gap ? { gap: `var(--${gap})` } : {}),
      ...(gapX ? { columnGap: `var(--${gapX})` } : {}),
      ...(gapY ? { rowGap: `var(--${gapY})` } : {}),
      ...(flow ? { gridAutoFlow: flow } : {}),
      ...style,
    };

    return (
      <Box ref={ref} className={cn("grid", className)} style={gridStyles} {...rest}>
        {children}
      </Box>
    );
  },
);

Grid.displayName = "Grid";
