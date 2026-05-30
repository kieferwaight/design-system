import { Input as AriaInput, Button, SearchField } from "react-aria-components";
import { cn } from "@/lib/cn";
import { Icon } from "../icon";
import type { SearchInputProps } from "./input.types";

const sizeClasses = {
  sm: "h-8 text-sm px-2.5 rounded-[var(--radius-layer-5)]", // 8px radius
  md: "h-9 text-sm px-3 rounded-full", // fully rounded pill
  lg: "h-11 text-base px-4 rounded-full",
};

export function SearchInput({
  value,
  onChange,
  size = "md",
  liveCount,
  placeholder = "Search",
  className,
  ...rest
}: SearchInputProps) {
  const hasValue = value.length > 0;

  return (
    <SearchField
      aria-label={placeholder}
      value={value}
      onChange={onChange}
      className={cn(
        "group flex items-center gap-[var(--space-1.5)] bg-bg-sunken border border-separator w-full",
        "transition-all duration-150 ease-out",
        "data-[focus-within]:border-accent data-[focus-within]:ring-2 data-[focus-within]:ring-accent-subtle",
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      <Icon
        name="magnifyingglass"
        size={size === "sm" ? "xs" : "sm"}
        className="text-fg-tertiary"
      />
      <AriaInput
        placeholder={placeholder}
        className={cn(
          "flex-1 min-w-0 bg-transparent outline-none border-none placeholder:text-fg-tertiary",
          "text-fg appearance-none",
          "[&::-webkit-search-cancel-button]:hidden",
        )}
      />
      {hasValue && liveCount !== undefined ? (
        <span className="text-2xs text-fg-secondary font-mono tabular-nums pointer-events-none pr-1">
          {liveCount.toLocaleString()}
        </span>
      ) : null}
      <Button
        className={cn(
          "inline-flex items-center justify-center -mr-1 p-0.5 rounded-full outline-none",
          "data-[hovered]:bg-bg-elevated data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent",
          "group-data-[empty]:hidden cursor-pointer text-fg-tertiary hover:text-fg-secondary",
        )}
      >
        <Icon name="xmark" size="xs" />
      </Button>
    </SearchField>
  );
}
