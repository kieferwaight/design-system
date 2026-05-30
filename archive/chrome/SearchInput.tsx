import { SearchIcon, XCircleIcon } from "lucide-react";
import { Button, Input, SearchField, type SearchFieldProps } from "react-aria-components";
import { cn } from "@/lib/cn";
import { Icon } from "../primitives/Icon";

interface SearchInputProps extends Omit<SearchFieldProps, "className" | "children"> {
  value: string;
  /** Receives the new string value (RAC SearchField onChange). */
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  /** Live result count, rendered on the right when value is non-empty. */
  liveCount?: number;
  className?: string;
}

const sizeClasses = {
  sm: "h-8 text-sm",
  md: "h-10 text-base",
  lg: "h-12 text-lg",
};

/**
 * iOS-style search field on RAC SearchField — rounded pill, leading magnifier,
 * built-in clear button (Escape-to-clear + properly labeled). When wired to the
 * `search.fuzzy` topic, `liveCount` reflects live total matches.
 */
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
        "group flex items-center gap-2 px-3 rounded-full bg-bg-sunken",
        "ring-1 ring-border data-[focus-within]:ring-2 data-[focus-within]:ring-accent transition-shadow",
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      <Icon as={SearchIcon} size={16} color="var(--color-fg-tertiary)" />
      <Input
        placeholder={placeholder}
        className={cn(
          "flex-1 min-w-0 bg-transparent outline-none border-none placeholder:text-fg-tertiary",
          "text-fg appearance-none",
          "[&::-webkit-search-cancel-button]:hidden",
        )}
      />
      {hasValue && liveCount !== undefined ? (
        <span className="text-2xs text-fg-secondary tabular-nums pointer-events-none">
          {liveCount.toLocaleString()}
        </span>
      ) : null}
      <Button
        className={cn(
          "inline-flex items-center justify-center -mr-1 p-0.5 rounded-full outline-none",
          "data-[hovered]:bg-bg-elevated data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent",
          "group-data-[empty]:hidden",
        )}
      >
        <Icon as={XCircleIcon} size={16} color="var(--color-fg-tertiary)" />
      </Button>
    </SearchField>
  );
}
