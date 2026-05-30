import type { LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import { Icon } from "../primitives/Icon";

interface ListEmptyProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: ReactNode;
}

export function ListEmpty({ icon, title, subtitle }: ListEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8 py-16 gap-3 h-full">
      {icon ? (
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bg-sunken">
          <Icon as={icon} size={22} color="var(--color-fg-tertiary)" />
        </span>
      ) : null}
      <div className="text-base font-semibold text-fg">{title}</div>
      {subtitle ? (
        <div className="text-sm text-fg-secondary leading-snug max-w-[260px]">{subtitle}</div>
      ) : null}
    </div>
  );
}
