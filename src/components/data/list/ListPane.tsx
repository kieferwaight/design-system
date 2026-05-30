import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Box, Stack } from "@/primitives";

export interface ListPaneProps {
  /** Sticky top region — usually a large title + search input. */
  header?: ReactNode;
  /** Rendered above the scrollable list, below the header. Filter chips, etc. */
  toolbar?: ReactNode;
  /** Bottom region — usually a status indicator (count, loading, etc.). */
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ListPane({ header, toolbar, footer, children, className }: ListPaneProps) {
  return (
    <Stack direction="vertical" bg="var(--color-bg)" className={cn("h-full w-full", className)}>
      {header && (
        <Box as="header" border="bottom" className="sticky top-0 z-20 glass-strong">
          {header}
        </Box>
      )}
      {toolbar && (
        <Box border="bottom" className="px-3 py-2">
          {toolbar}
        </Box>
      )}
      <Box className="flex-1 overflow-y-auto overscroll-contain">{children}</Box>
      {footer && (
        <Box border="top" className="px-4 py-2 text-2xs text-fg-tertiary tabular-nums text-center">
          {footer}
        </Box>
      )}
    </Stack>
  );
}
