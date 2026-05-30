import type { ReactNode } from "react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends Omit<AriaButtonProps, "className" | "children" | "style"> {
  variant?: Variant;
  size?: Size;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Renders a pending indicator and marks the button busy (RAC isPending). */
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-fg-on-accent data-[hovered]:brightness-110 data-[pressed]:brightness-90",
  secondary:
    "bg-bg-sunken text-fg border border-border data-[hovered]:brightness-95 data-[pressed]:brightness-90",
  tertiary: "bg-transparent text-accent data-[hovered]:bg-bg-sunken data-[pressed]:brightness-95",
  ghost:
    "bg-transparent text-fg-secondary data-[hovered]:bg-bg-sunken data-[hovered]:text-fg data-[pressed]:brightness-95",
  destructive:
    "bg-danger text-fg-on-accent data-[hovered]:brightness-110 data-[pressed]:brightness-90",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-7 px-2.5 text-xs gap-1.5 rounded-md",
  md: "h-9 px-3.5 text-sm gap-2 rounded-lg",
  lg: "h-11 px-5 text-base gap-2 rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  loading,
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <AriaButton
      isPending={loading}
      data-variant={variant}
      data-size={size}
      className={cn(
        "inline-flex items-center justify-center font-medium select-none whitespace-nowrap",
        "transition-[background-color,color,filter,transform] duration-150 ease-out",
        "data-[pressed]:scale-[0.97] data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
        "outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent data-[focus-visible]:ring-offset-2 data-[focus-visible]:ring-offset-bg",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {leadingIcon ? <span className="inline-flex shrink-0">{leadingIcon}</span> : null}
      {loading ? (
        <span className="opacity-70">…</span>
      ) : (
        <span className="truncate">{children}</span>
      )}
      {trailingIcon ? <span className="inline-flex shrink-0">{trailingIcon}</span> : null}
    </AriaButton>
  );
}
