import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface RowProps {
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  preview?: ReactNode;
  meta?: ReactNode;
  /** Trailing status indicators. */
  badges?: ReactNode;
  /** Top-right slot — usually a timestamp. */
  timestamp?: ReactNode;
  /** Render in unread state (bolder title, unread dot). */
  unread?: boolean;
  /** Render selected (active in list). */
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  /** Show subtle bottom separator. Set false for last row in a group. Defaults to true. */
  separator?: boolean;
}

export function Row({
  leading,
  title,
  subtitle,
  preview,
  meta,
  badges,
  timestamp,
  unread,
  selected,
  onClick,
  className,
  separator = true,
}: RowProps) {
  const isInteractive = !!onClick;
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: generic polymorphic row element is keyboard-accessible
    <div
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      data-selected={selected || undefined}
      data-unread={unread || undefined}
      className={cn(
        "group relative flex items-start gap-[var(--space-3)] px-[var(--space-4)] py-[var(--space-3)] min-h-[68px]",
        "transition-colors duration-100 ease-out select-none",
        isInteractive && "cursor-pointer active:bg-bg-sunken",
        selected ? "bg-accent text-fg-on-accent" : "hover:bg-bg-sunken",
        separator &&
          "after:absolute after:left-[68px] after:right-0 after:bottom-0 after:h-px after:bg-separator after:pointer-events-none",
        className,
      )}
    >
      {/* unread indicator — 6px dot in the left gutter */}
      {unread ? (
        <span
          role="presentation"
          className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent"
        />
      ) : null}

      {leading ? <div className="shrink-0 mt-0.5">{leading}</div> : null}

      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <div className="flex items-baseline gap-2 min-w-0">
          <div
            className={cn(
              "flex-1 min-w-0 truncate text-base leading-tight",
              unread ? "font-semibold text-fg" : "font-medium text-fg",
              selected && "text-fg-on-accent",
            )}
          >
            {title}
          </div>
          {timestamp ? (
            <div
              className={cn(
                "shrink-0 text-2xs tabular-nums",
                selected ? "text-fg-on-accent/80" : "text-fg-tertiary",
              )}
            >
              {timestamp}
            </div>
          ) : null}
        </div>

        {subtitle ? (
          <div
            className={cn(
              "text-xs truncate leading-tight",
              selected ? "text-fg-on-accent/80" : "text-fg-secondary",
            )}
          >
            {subtitle}
          </div>
        ) : null}

        {preview ? (
          <div
            className={cn(
              "text-sm leading-snug line-clamp-2 mt-0.5",
              selected ? "text-fg-on-accent/70" : "text-fg-secondary",
            )}
          >
            {preview}
          </div>
        ) : null}

        {(meta || badges) && (
          <div className="flex items-center gap-1.5 mt-1.5 min-h-[16px]">
            {meta}
            <span className="flex-1" />
            {badges}
          </div>
        )}
      </div>
    </div>
  );
}
