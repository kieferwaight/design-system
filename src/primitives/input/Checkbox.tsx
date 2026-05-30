import { Checkbox as AriaCheckbox } from "react-aria-components";
import { cn } from "@/lib/cn";
import type { CheckboxProps } from "./input.types";

export function Checkbox({ className, children, ...rest }: CheckboxProps) {
  return (
    <AriaCheckbox
      className={cn(
        "group flex items-center gap-3 text-sm font-medium text-fg select-none cursor-pointer",
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
        className,
      )}
      {...rest}
    >
      {({ isSelected, isIndeterminate }) => (
        <>
          <div
            className={cn(
              "flex items-center justify-center w-[20px] h-[20px] rounded-[6px] border border-separator bg-bg-sunken transition-all duration-150 ease-out",
              "group-data-[hovered]:border-fg-tertiary",
              "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-accent group-data-[focus-visible]:ring-offset-2 group-data-[focus-visible]:ring-offset-bg",
              (isSelected || isIndeterminate) && "bg-accent border-accent",
            )}
          >
            {isIndeterminate ? (
              <div className="w-[10px] h-[2px] rounded bg-white" />
            ) : isSelected ? (
              <svg
                viewBox="0 0 24 24"
                className="w-[12px] h-[12px] fill-none stroke-white stroke-[3.5] stroke-[round] stroke-linejoin-round transition-transform duration-200 scale-100"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : null}
          </div>
          {children && <span>{children}</span>}
        </>
      )}
    </AriaCheckbox>
  );
}
