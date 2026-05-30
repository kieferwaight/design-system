import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

export interface SkeletonProps {
  /** Shape type of the skeleton loader. Defaults to "block". */
  variant?: "block" | "line" | "circle";
  /** Physical width value. */
  width?: number | string;
  /** Physical height value. */
  height?: number | string;
  /** Border-radius override mapping to design tokens or custom value. */
  radius?: number | string;
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({
  variant = "block",
  width,
  height,
  radius,
  className,
  style,
}: SkeletonProps) {
  const defaults: CSSProperties = {
    width: width ?? (variant === "line" ? "100%" : undefined),
    height: height ?? (variant === "line" ? 12 : undefined),
    borderRadius:
      radius ??
      (variant === "circle"
        ? "9999px"
        : variant === "line"
          ? "var(--radius-layer-6)" // 4px innermost corner
          : "var(--radius-layer-5)"), // 8px standard card/well corner
  };

  return (
    <span
      role="presentation"
      aria-hidden
      className={cn("inline-block skeleton", className)}
      style={{ ...defaults, ...style }}
    />
  );
}
