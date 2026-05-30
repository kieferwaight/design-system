import { EllipsisIcon, FlagIcon, PinIcon, ShareIcon } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "../primitives/Icon";

interface ContentToolbarProps {
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  pinned?: boolean;
  flagged?: boolean;
  onPin?: () => void;
  onFlag?: () => void;
  onShare?: () => void;
  onMore?: () => void;
  className?: string;
}

/**
 * The header bar of the content pane. Title + subtitle + action icons.
 * Pinning/flagging are toggleable — buttons reflect their active state via
 * tint, matching the iOS Mail toolbar pattern.
 */
export function ContentToolbar({
  leading,
  title,
  subtitle,
  pinned,
  flagged,
  onPin,
  onFlag,
  onShare,
  onMore,
  className,
}: ContentToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-2.5 py-2 min-h-[52px]",
        "pt-[calc(0.5rem+env(safe-area-inset-top))]",
        className,
      )}
    >
      {leading ? <div className="shrink-0">{leading}</div> : null}
      <div className="flex-1 min-w-0 flex flex-col text-center">
        <h2 className="text-sm font-semibold leading-tight truncate text-fg">{title}</h2>
        {subtitle ? (
          <span className="text-2xs text-fg-tertiary truncate">{subtitle}</span>
        ) : null}
      </div>
      <div className="shrink-0 flex items-center">
        <ToolbarButton onClick={onPin} active={pinned} icon={PinIcon} tint="var(--color-pin)" />
        <ToolbarButton onClick={onFlag} active={flagged} icon={FlagIcon} tint="var(--color-flag)" />
        <ToolbarButton onClick={onShare} icon={ShareIcon} />
        <ToolbarButton onClick={onMore} icon={EllipsisIcon} />
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  icon,
  tint,
}: {
  onClick?: () => void;
  active?: boolean;
  icon: typeof PinIcon;
  tint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-full",
        "transition-colors duration-100 active:bg-bg-sunken",
        "hover:bg-bg-sunken",
      )}
      style={active && tint ? { color: tint } : undefined}
    >
      <Icon as={icon} size={18} color={active ? tint : "var(--color-fg-secondary)"} />
    </button>
  );
}
