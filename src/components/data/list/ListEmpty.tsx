import type { ElementType, ReactNode } from "react";
import { Icon } from "@/primitives";

export interface ListEmptyProps {
  icon?: ElementType;
  title: string;
  subtitle?: ReactNode;
}

export function ListEmpty({ icon, title, subtitle }: ListEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8 py-16 gap-3 h-full select-none">
      {icon ? (
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bg-sunken">
          <Icon
            as={icon}
            size={22}
            color="var(--color-fg-secondary)"
            className="text-fg-tertiary"
          />
        </span>
      ) : null}
      <div className="text-base font-semibold text-fg">{title}</div>
      {subtitle ? (
        <div className="text-sm text-fg-secondary leading-snug max-w-[260px]">{subtitle}</div>
      ) : null}
    </div>
  );
}
