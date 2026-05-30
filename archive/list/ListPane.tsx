import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ListPaneProps {
  /** Sticky top region — usually a large title + search input. */
  header?: ReactNode;
  /** Rendered above the scrollable list, below the header. Filter chips, etc. */
  toolbar?: ReactNode;
  /** Bottom region — usually a status indicator (count, loading, etc.). */
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Container for the middle (List) pane. Owns the scroll region and structural
 * separation: pinned header → optional toolbar → scrollable list → footer.
 * Each row inside `children` should be a row component from `rows/`.
 */
export function ListPane({ header, toolbar, footer, children, className }: ListPaneProps) {
  return (
    <div className={cn("flex flex-col h-full bg-bg", className)}>
      {header ? (
        <div className="sticky top-0 z-20 glass-strong border-b border-separator">{header}</div>
      ) : null}
      {toolbar ? <div className="px-3 py-2 border-b border-separator">{toolbar}</div> : null}
      <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
      {footer ? (
        <div className="border-t border-separator px-4 py-2 text-2xs text-fg-tertiary tabular-nums text-center">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
