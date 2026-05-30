import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ListHeaderProps {
  /** iOS-style large title (top-left, weighty). */
  title: ReactNode;
  /** Optional subtitle line under the title. */
  subtitle?: ReactNode;
  /** Trailing actions in the header bar (toolbar buttons). */
  trailing?: ReactNode;
  /** Leading slot — usually BackButton on mobile drill-down. */
  leading?: ReactNode;
  /** Rendered below the large title — usually a SearchInput. */
  belowTitle?: ReactNode;
  className?: string;
}

export function ListHeader({
  title,
  subtitle,
  trailing,
  leading,
  belowTitle,
  className,
}: ListHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-2 px-4 pt-3 pb-2", className)}>
      <div className="flex items-center gap-2 min-h-[36px]">
        {leading ? <div className="shrink-0">{leading}</div> : null}
        <div className="flex-1 min-w-0 flex flex-col">
          <h1 className="text-2xl font-bold leading-tight truncate text-fg">{title}</h1>
          {subtitle ? (
            <span className="text-2xs text-fg-tertiary truncate mt-0.5">{subtitle}</span>
          ) : null}
        </div>
        {trailing ? <div className="shrink-0 flex items-center gap-1">{trailing}</div> : null}
      </div>
      {belowTitle ? <div>{belowTitle}</div> : null}
    </header>
  );
}
