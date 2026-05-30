import type { ElementType, ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { formatCount, Icon } from "@/primitives";

export interface NavCardProps {
  title: string;
  icon: ElementType;
  iconColor?: string;
  /** Aggregate count rendered next to the title. */
  count?: number;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function NavCard({
  title,
  icon,
  iconColor,
  count,
  defaultOpen = true,
  children,
}: NavCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-bg-elevated overflow-hidden",
        "transition-shadow duration-200",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center gap-2.5 px-3.5 py-3 select-none outline-none border-none",
          "text-left hover:bg-bg-sunken active:bg-bg-sunken transition-colors cursor-pointer",
        )}
      >
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
          style={{ background: "var(--color-bg-sunken)" }}
        >
          <Icon as={icon} size={16} color={iconColor ?? "var(--color-fg-secondary)"} />
        </span>
        <span className="flex-1 font-semibold text-base text-fg truncate">{title}</span>
        {count !== undefined ? (
          <span className="text-xs text-fg-tertiary tabular-nums pr-1">{formatCount(count)}</span>
        ) : null}
        <Icon
          name="chevron.down"
          size={14}
          className={cn(
            "text-fg-tertiary stroke-[2] transition-transform duration-200 ease-out",
            open ? "rotate-0" : "-rotate-90",
          )}
        />
      </button>

      {open ? (
        <ul className="flex flex-col py-1 border-t border-separator list-none m-0 p-0">
          {children}
        </ul>
      ) : null}
    </section>
  );
}
