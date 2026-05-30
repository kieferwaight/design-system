import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface SkeletonProps {
  /** Shape variant. Defaults to "block" (rectangle). */
  variant?: "block" | "line" | "circle";
  width?: number | string;
  height?: number | string;
  /** Border-radius override. */
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
        ? "var(--radius-full)"
        : variant === "line"
          ? "var(--radius-sm)"
          : "var(--radius-md)"),
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
