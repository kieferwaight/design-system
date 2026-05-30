import { Shape, type ShapeSize } from "@/components/surfaces/shape/Shape";
import type { ColorToken } from "@/foundations/color";
import { cn } from "@/lib/cn";

/**
 * Swatch — the base visual atom of the color model: a single colored shape.
 * Color Token → **Swatch** → Palette → System.
 *
 * It builds on **Components/Shape** — a `square` or `circle` on the shared glyph
 * size scale, square corners paired to size via `glyphRadius` — and fills it
 * with a color. (Its sibling **Components/Avatar** fills the same Shape with an
 * image or initials.) Labels are NOT its job: compose it with **Layouts/Labeled
 * Swatch** to caption it.
 */
export type SwatchShape = "square" | "circle";
/** Swatch sizes ARE the shared glyph ladder (xs 16 · sm 24 · md 36 · lg 54 · xl 80). */
export type SwatchSize = ShapeSize;

export interface SwatchProps {
  /** Any CSS color — hex, rgb(), oklch(), or var(--token). */
  value?: string;
  /** A standardized ColorToken — fills `value`/title from the model when passed. */
  token?: ColorToken;
  /** `square` (default) or `circle`. */
  shape?: SwatchShape;
  /** A size token, or an explicit pixel size. */
  size?: SwatchSize | number;
  className?: string;
  title?: string;
}

export function Swatch({
  value,
  token,
  shape = "square",
  size = "md",
  className,
  title,
}: SwatchProps) {
  const resolved = value ?? token?.value ?? "transparent";
  return (
    <Shape
      shape={shape}
      size={size}
      background={resolved}
      title={title ?? token?.name ?? resolved}
      className={cn("shadow-sm", className)}
    />
  );
}

/** Pull display name + value off a ColorToken (for label compositions). */
export function swatchPropsFromToken(token: ColorToken): { name: string; value: string } {
  return { name: token.name, value: token.value };
}
