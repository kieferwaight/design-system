import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Box, Stack } from "@/primitives";

export interface ContentPaneProps {
  /** Optional top header content. */
  header?: ReactNode;
  /** Optional bottom footer content. */
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ContentPane({ header, footer, children, className }: ContentPaneProps) {
  return (
    <Stack direction="vertical" bg="var(--color-bg)" className={cn("h-full w-full", className)}>
      {header && (
        <Box as="header" border="bottom" className="sticky top-0 z-20 glass-strong">
          {header}
        </Box>
      )}
      <Box className="flex-1 overflow-y-auto overscroll-contain">{children}</Box>
      {footer && (
        <Box as="footer" border="top" className="sticky bottom-0 glass-strong">
          {footer}
        </Box>
      )}
    </Stack>
  );
}
