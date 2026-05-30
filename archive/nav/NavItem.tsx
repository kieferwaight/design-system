import { ChevronRightIcon, type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "react-aria-components";
import { cn } from "@/lib/cn";
import { formatCount } from "../primitives/Chip";
import { Icon } from "../primitives/Icon";

interface NavItemProps {
  label: ReactNode;
  /** Optional secondary line under the label (mail account → email address). */
  secondary?: ReactNode;
  icon?: LucideIcon;
  iconColor?: string;
  /** Custom leading slot — use this for avatars / colored squares. Overrides icon. */
  leading?: ReactNode;
  count?: number;
  /** Smaller pill rendered to the right of count, typically for unread. */
  unreadCount?: number;
  active?: boolean;
  /** Show a trailing chevron — indicates "drills deeper" on mobile. */
  drillable?: boolean;
  /** Indent — used for nested folders inside an email account. */
  indent?: 0 | 1;
  onClick?: () => void;
}

export function NavItem({
  label,
  secondary,
  icon,
  iconColor,
  leading,
  count,
  unreadCount,
  active,
  drillable,
  indent = 0,
  onClick,
}: NavItemProps) {
  return (
    <li>
      <Button
        onPress={onClick}
        className={cn(
          "w-full flex items-center gap-3 min-h-[42px] py-1.5 pr-3 select-none text-left outline-none",
          "transition-colors duration-100 data-[pressed]:bg-bg-sunken",
          "data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent data-[focus-visible]:ring-inset",
          active ? "bg-accent/15" : "data-[hovered]:bg-bg-sunken",
          indent === 0 ? "pl-3.5" : "pl-9",
        )}
        data-active={active || undefined}
      >
        {leading ? (
          <span className="shrink-0">{leading}</span>
        ) : icon ? (
          <span
            className="inline-flex items-center justify-center w-6 h-6 shrink-0"
            style={{ color: iconColor ?? "var(--color-fg-secondary)" }}
          >
            <Icon as={icon} size={15} />
          </span>
        ) : null}
        <span className="flex-1 min-w-0">
          <span
            className={cn(
              "block truncate text-sm leading-tight",
              active ? "font-semibold text-fg" : "text-fg",
            )}
          >
            {label}
          </span>
          {secondary ? (
            <span className="block truncate text-2xs text-fg-tertiary mt-0.5">{secondary}</span>
          ) : null}
        </span>
        {unreadCount !== undefined && unreadCount > 0 ? (
          <span
            className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full text-3xs font-bold tabular-nums text-fg-on-accent"
            style={{ background: "var(--color-accent)" }}
          >
            {formatCount(unreadCount)}
          </span>
        ) : null}
        {count !== undefined ? (
          <span className="text-2xs text-fg-tertiary tabular-nums shrink-0">
            {formatCount(count)}
          </span>
        ) : null}
        {drillable ? (
          <Icon as={ChevronRightIcon} size={13} color="var(--color-fg-tertiary)" />
        ) : null}
      </Button>
    </li>
  );
}
