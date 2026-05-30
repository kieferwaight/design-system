import { Switch as AriaSwitch } from "react-aria-components";
import { cn } from "@/lib/cn";
import type { SwitchProps } from "./input.types";

export function Switch({ className, children, ...rest }: SwitchProps) {
  return (
    <AriaSwitch
      className={cn(
        "group flex items-center justify-between gap-3 text-sm font-medium text-fg select-none cursor-pointer w-full",
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
        className,
      )}
      {...rest}
    >
      {({ isSelected }) => (
        <>
          {children && <span>{children}</span>}
          <div
            className={cn(
              "relative w-[48px] h-[28px] rounded-full bg-border transition-colors duration-200 ease-out",
              "group-data-[hovered]:brightness-95",
              "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-accent group-data-[focus-visible]:ring-offset-2 group-data-[focus-visible]:ring-offset-bg",
              isSelected && "bg-[var(--sys-green)]",
            )}
          >
            <div
              className={cn(
                "absolute top-[2px] left-[2px] w-[24px] h-[24px] rounded-full bg-white shadow-sm",
                "transition-transform duration-200 ease-out will-change-transform",
                isSelected && "transform translate-x-[20px]",
              )}
            />
          </div>
        </>
      )}
    </AriaSwitch>
  );
}
