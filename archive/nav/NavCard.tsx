import { ChevronDownIcon, type LucideIcon } from "lucide-react";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/cn";
import { formatCount } from "../primitives/Chip";
import { Icon } from "../primitives/Icon";

interface NavCardProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  /** Aggregate count rendered next to the title (e.g. sum across children). */
  count?: number;
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * A collapsible card in the Content Navigation View (the leftmost pane).
 * Mirrors the existing `_navdrawer.html` "details" cards but as a React
 * component, with live count chip in the header.
 */
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
          "w-full flex items-center gap-2.5 px-3.5 py-3 select-none",
          "text-left hover:bg-bg-sunken active:bg-bg-sunken transition-colors",
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
          <span className="text-xs text-fg-tertiary tabular-nums">{formatCount(count)}</span>
        ) : null}
        <Icon
          as={ChevronDownIcon}
          size={14}
          color="var(--color-fg-tertiary)"
          className={cn(
            "transition-transform duration-200 ease-out",
            open ? "rotate-0" : "-rotate-90",
          )}
        />
      </button>

      {open ? <ul className="flex flex-col py-1 border-t border-separator">{children}</ul> : null}
    </section>
  );
}
