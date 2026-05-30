import { ChevronLeftIcon } from "lucide-react";
import { Button } from "react-aria-components";
import { cn } from "@/lib/cn";
import { Icon } from "../primitives/Icon";

interface BackButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * iOS-style back button — chevron + label, accent-tinted. Used at the top-left
 * of List View and Content View to drill back up the mobile navigation stack.
 */
export function BackButton({ label = "Back", onClick, className }: BackButtonProps) {
  return (
    <Button
      onPress={onClick}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-0.5 -ml-1 pr-1 py-1.5 outline-none",
        "text-accent font-normal text-base leading-tight select-none",
        "data-[pressed]:opacity-60 transition-opacity rounded-md",
        "data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent",
        className,
      )}
    >
      <Icon as={ChevronLeftIcon} size={22} strokeWidth={2.2} />
      <span className="truncate max-w-[160px]">{label}</span>
    </Button>
  );
}
