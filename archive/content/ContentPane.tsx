import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContentPaneProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Container for the rightmost (Content) pane. On mobile this becomes the
 * full screen when a list item is selected.
 */
export function ContentPane({ header, footer, children, className }: ContentPaneProps) {
  return (
    <div className={cn("flex flex-col h-full bg-bg", className)}>
      {header ? (
        <div className="sticky top-0 z-20 glass-strong border-b border-separator">{header}</div>
      ) : null}
      <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
      {footer ? (
        <div className="sticky bottom-0 glass-strong border-t border-separator">{footer}</div>
      ) : null}
    </div>
  );
}
