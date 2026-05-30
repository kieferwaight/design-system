import { type CSSProperties, forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { BoxProps, BoxSpacing } from "./box.types";

export function resolveSpacingStyles(
  prop: BoxSpacing | undefined,
  type: "padding" | "margin",
): CSSProperties {
  if (!prop) return {};
  if (typeof prop === "string") {
    return { [type]: `var(--${prop})` };
  }

  const styles: CSSProperties = {};
  const t = type;

  if (prop.x) {
    styles[`${t}Left`] = `var(--${prop.x})`;
    styles[`${t}Right`] = `var(--${prop.x})`;
  }
  if (prop.y) {
    styles[`${t}Top`] = `var(--${prop.y})`;
    styles[`${t}Bottom`] = `var(--${prop.y})`;
  }
  if (prop.top) styles[`${t}Top`] = `var(--${prop.top})`;
  if (prop.bottom) styles[`${t}Bottom`] = `var(--${prop.bottom})`;
  if (prop.left) styles[`${t}Left`] = `var(--${prop.left})`;
  if (prop.right) styles[`${t}Right`] = `var(--${prop.right})`;

  return styles;
}

export function resolveRadius(radius?: string | number): string | undefined {
  if (radius === undefined) return undefined;
  if (typeof radius === "number") return `${radius}px`;

  if (radius.startsWith("layer-")) {
    return `var(--radius-${radius})`;
  }
  const glyphRadii = ["xs", "sm", "md", "lg", "xl"];
  if (glyphRadii.includes(radius)) {
    return `var(--radius-glyph-${radius})`;
  }
  return radius;
}

export function resolveShadow(shadow?: string): string | undefined {
  if (!shadow) return undefined;
  const standardShadows = ["sm", "md", "lg"];
  if (standardShadows.includes(shadow)) {
    return `var(--shadow-${shadow})`;
  }
  return shadow;
}

export function resolveBg(bg?: string): string | undefined {
  if (!bg) return undefined;
  const semanticBgMap: Record<string, string> = {
    canvas: "var(--color-bg)",
    base: "var(--color-bg-base)",
    secondary: "var(--color-bg-secondary)",
    tertiary: "var(--color-bg-tertiary)",
    elevated: "var(--color-bg-elevated)",
    sunken: "var(--color-bg-sunken)",
  };
  return semanticBgMap[bg] || bg;
}

export function resolveBorder(
  border?: boolean | string | string[],
  borderColor = "var(--color-border)",
): CSSProperties {
  if (!border) return {};
  const knownDirections = ["all", "top", "bottom", "left", "right", "x", "y"];
  if (typeof border === "string" && !knownDirections.includes(border) && !Array.isArray(border)) {
    return { border };
  }

  const borderValue = `1px solid ${borderColor}`;
  const styles: CSSProperties = {};

  const applyDirection = (dir: string) => {
    if (dir === "all") {
      styles.border = borderValue;
    } else if (dir === "top") {
      styles.borderTop = borderValue;
    } else if (dir === "bottom") {
      styles.borderBottom = borderValue;
    } else if (dir === "left") {
      styles.borderLeft = borderValue;
    } else if (dir === "right") {
      styles.borderRight = borderValue;
    } else if (dir === "x") {
      styles.borderLeft = borderValue;
      styles.borderRight = borderValue;
    } else if (dir === "y") {
      styles.borderTop = borderValue;
      styles.borderBottom = borderValue;
    }
  };

  if (border === true || border === "all") {
    return { border: borderValue };
  }

  if (Array.isArray(border)) {
    for (const b of border) {
      applyDirection(b);
    }
  } else if (typeof border === "string") {
    applyDirection(border);
  }

  return styles;
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      as: Component = "div",
      margin,
      padding,
      radius,
      shadow,
      blur,
      bg,
      border,
      borderColor,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    // Resolve CSS styles from tokens
    const marginStyles = resolveSpacingStyles(margin, "margin");
    const paddingStyles = resolveSpacingStyles(padding, "padding");
    const borderRadiusStyle = resolveRadius(radius);
    const shadowStyle = resolveShadow(shadow);
    const bgStyle = resolveBg(bg);
    const borderStyles = resolveBorder(border, borderColor);

    const blurStyle = blur
      ? {
          WebkitBackdropFilter: `blur(var(--blur-${blur})) saturate(180%)`,
          backdropFilter: `blur(var(--blur-${blur})) saturate(180%)`,
        }
      : {};

    const resolvedStyle: CSSProperties = {
      ...marginStyles,
      ...paddingStyles,
      ...(borderRadiusStyle ? { borderRadius: borderRadiusStyle } : {}),
      ...(shadowStyle ? { boxShadow: shadowStyle } : {}),
      ...(bgStyle ? { backgroundColor: bgStyle } : {}),
      ...borderStyles,
      ...blurStyle,
      ...style,
    };

    return (
      <Component ref={ref} className={cn("box-border", className)} style={resolvedStyle} {...rest}>
        {children}
      </Component>
    );
  },
);

Box.displayName = "Box";
