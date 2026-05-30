import type { CSSProperties, ElementType } from "react";
import type { IconSize } from "@/foundations/icon";
import { cn } from "@/lib/cn";

// Eager load all SVGs in assets/ using Vite glob import
const svgs = import.meta.glob("../../../assets/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// Pre-process and cache the SVGs
const ICON_MAP = Object.entries(svgs).reduce(
  (acc, [path, content]) => {
    const filename = path.split("/").pop() || "";
    const name = filename.replace(".svg", "");
    // Replace fill="white" and stroke="white" to allow currentColor cascading
    const processed = content
      .replace(/fill="white"/g, 'fill="currentColor"')
      .replace(/stroke="white"/g, 'stroke="currentColor"');
    acc[name] = processed;
    return acc;
  },
  {} as Record<string, string>,
);

export interface IconProps {
  /** Name of the SVG asset in `/assets` (without the `.svg` extension), e.g. "arrow.up". */
  name?: string;
  /** Legacy: React component/Lucide icon to render. */
  as?: ElementType;
  /** Size token or raw pixel size. Defaults to "sm" (16px). */
  size?: IconSize | number;
  /** Foreground color (cascades to fill/stroke). */
  color?: string;
  /** Custom class name. */
  className?: string;
  /** Custom inline styles. */
  style?: CSSProperties;
  "aria-label"?: string;
}

export function Icon({
  name,
  as: Component,
  size = "sm",
  color,
  className,
  style,
  "aria-label": ariaLabel,
  ...rest
}: IconProps) {
  // Determine physical/CSS size style
  const sizeStyle =
    typeof size === "number"
      ? { width: size, height: size }
      : {
          width: `var(--icon-size-${size})`,
          height: `var(--icon-size-${size})`,
        };

  // If a legacy Lucide component is passed, render it
  if (Component) {
    const lucideSize =
      typeof size === "number"
        ? size
        : size === "xs"
          ? 12
          : size === "sm"
            ? 16
            : size === "md"
              ? 20
              : size === "lg"
                ? 28
                : 36;
    return (
      <Component
        size={lucideSize}
        color={color}
        className={cn("inline-block shrink-0", className)}
        style={style}
        aria-label={ariaLabel}
        {...rest}
      />
    );
  }

  // If name is provided, look up the asset in our processed map
  if (name) {
    const svgContent = ICON_MAP[name];
    if (svgContent) {
      return (
        <span
          role="img"
          className={cn(
            "inline-flex shrink-0 items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            className,
          )}
          style={{
            ...sizeStyle,
            color,
            ...style,
          }}
          aria-label={ariaLabel || name}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static SVG assets are eager-loaded at compile-time and safe
          dangerouslySetInnerHTML={{ __html: svgContent }}
          {...rest}
        />
      );
    }
  }

  // Fallback: render nothing if neither name nor component is matched
  return null;
}
