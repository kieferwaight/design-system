import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { GLYPH_SIZE_PX, type GlyphSize, glyphRadius } from "@/generated";
import { cn } from "@/lib/cn";

/**
 * Shape — the base glyph atom: a single sized box, either a `circle` or a
 * rounded `square`. It owns ONLY the geometry shared across glyph-like
 * components — the size (a rung of the shared glyph scale, or an explicit px)
 * and the corner radius (full pill for circles; `glyphRadius` paired to the box
 * size for squares, so a square reads as a rounded square at any scale).
 *
 * It is the common base under **Components/Swatch** (fills it with a color) and
 * **Components/Avatar** (fills it with an image or initials). Reach for Shape
 * directly when you need a bare sized box on the same size + radius system.
 */
export type ShapeKind = "square" | "circle";
/** Shape sizes ARE the shared glyph ladder (xs 16 · sm 24 · md 36 · lg 54 · xl 80). */
export type ShapeSize = GlyphSize;

export interface ShapeProps extends Omit<ComponentPropsWithoutRef<"span">, "style"> {
  /** `square` (rounded via `glyphRadius`) or `circle` (full pill). */
  shape?: ShapeKind;
  /** A size token (shared glyph scale), or an explicit pixel size. */
  size?: ShapeSize | number;
  /** Background fill — any CSS color or `var(--token)`. */
  background?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function Shape({
  shape = "square",
  size = "md",
  background,
  className,
  style,
  children,
  ...rest
}: ShapeProps) {
  const px = typeof size === "number" ? size : GLYPH_SIZE_PX[size];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center border border-border align-middle",
        className,
      )}
      style={{
        width: px,
        height: px,
        background,
        // Square: radius paired to the box size; circle: full pill.
        borderRadius: shape === "circle" ? "9999px" : `${glyphRadius(px)}px`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
