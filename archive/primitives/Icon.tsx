import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface IconProps {
  as: LucideIcon;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
}

/**
 * Thin wrapper around Lucide icons. Centralizes default stroke + size scale
 * across the app, so individual usage sites don't drift on stroke weights.
 */
export function Icon({
  as: Component,
  size = 16,
  color,
  strokeWidth = 1.8,
  className,
  style,
  ...rest
}: IconProps) {
  return (
    <Component
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      className={cn("inline-block shrink-0", className)}
      style={style}
      {...rest}
    />
  );
}
