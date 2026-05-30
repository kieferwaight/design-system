import type { ReactNode } from "react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<AriaButtonProps, "className" | "children" | "style"> {
  /** Visual theme variants. Defaults to "primary". */
  variant?: ButtonVariant;
  /** Button height and padding sizes. Defaults to "md". */
  size?: ButtonSize;
  /** Leading icon content. */
  leadingIcon?: ReactNode;
  /** Trailing icon content. */
  trailingIcon?: ReactNode;
  /** Active loading indicator (renders pending spinner). */
  loading?: boolean;
  /** Stretches the button to the full width of the container. */
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-fg-on-accent data-[hovered]:brightness-110 data-[pressed]:brightness-90",
  secondary:
    "bg-bg-sunken text-fg border border-border data-[hovered]:brightness-95 data-[pressed]:brightness-90",
  tertiary: "bg-transparent text-accent data-[hovered]:bg-bg-sunken data-[pressed]:brightness-95",
  ghost:
    "bg-transparent text-fg-secondary data-[hovered]:bg-bg-sunken data-[hovered]:text-fg data-[pressed]:brightness-95",
  destructive:
    "bg-danger text-fg-on-accent data-[hovered]:brightness-110 data-[pressed]:brightness-90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-[28px] px-[var(--space-2.5)] text-xs gap-[var(--space-1.5)] rounded-[var(--radius-layer-5)]", // 8px radius, gap 6px
  md: "h-[36px] px-[var(--space-3.5)] text-sm gap-[var(--space-2)] rounded-[var(--radius-layer-5)]", // 8px radius, gap 8px
  lg: "h-[44px] px-[var(--space-5)] text-base gap-[var(--space-2)] rounded-[var(--radius-layer-4)]", // 12px radius, gap 8px
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
      {leadingIcon ? (
        <span className="inline-flex shrink-0 items-center justify-center">{leadingIcon}</span>
      ) : null}
      {loading ? (
        <span className="opacity-70 flex items-center justify-center animate-pulse">…</span>
      ) : (
        <span className="truncate">{children}</span>
      )}
      {trailingIcon ? (
        <span className="inline-flex shrink-0 items-center justify-center">{trailingIcon}</span>
      ) : null}
    </AriaButton>
  );
}
