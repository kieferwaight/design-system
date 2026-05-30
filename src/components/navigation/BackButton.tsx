import { Button } from "react-aria-components";
import { cn } from "@/lib/cn";
import { Icon } from "@/primitives";

export interface BackButtonProps {
  /** Label text. Defaults to "Back". */
  label?: string;
  onClick?: () => void;
  className?: string;
}

export function BackButton({ label = "Back", onClick, className }: BackButtonProps) {
  return (
    <Button
      onPress={onClick}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-0.5 -ml-1 pr-1 py-1.5 outline-none",
        "text-accent font-normal text-base leading-tight select-none cursor-pointer",
        "data-[pressed]:opacity-60 transition-opacity rounded-md",
        "data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent",
        className,
      )}
    >
      <Icon name="chevron.left" size={22} className="stroke-[2.2]" />
      <span className="truncate max-w-[160px]">{label}</span>
    </Button>
  );
}
