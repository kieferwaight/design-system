import { Shape, type ShapeSize } from "@/components/surfaces/shape/Shape";
import { GLYPH_SIZE_PX } from "@/generated";
import { cn } from "@/lib/cn";

/**
 * Avatar — an identity glyph built on the SAME base as **Components/Swatch**:
 * a **Components/Shape** at a size from the shared glyph scale, either a `circle`
 * (the person default) or a rounded `square` whose corner radius is paired to its
 * size via `glyphRadius`. Where Swatch fills the Shape with a color, Avatar fills
 * it with an image, or initials over a color derived from the name.
 *
 * Because both ride the same Shape, an `md` avatar and an `md` swatch are the
 * same 36px box with the same rounding.
 */
export type AvatarShape = "circle" | "square";
export type AvatarSize = ShapeSize;

export interface AvatarProps {
  /** Display name — drives initials and (when no `bg`/`src`) the hashed color. */
  name?: string;
  /** Image URL. When set, replaces the initials. */
  src?: string;
  /** A size token (shared glyph scale), or an explicit pixel size. */
  size?: AvatarSize | number;
  /** `circle` (default, people) or `square` (rounded via `glyphRadius`). */
  shape?: AvatarShape;
  /** Override the background. Any CSS color or `var(--token)`. Default: hashed from `name`. */
  bg?: string;
  className?: string;
}

/** The tintable Apple system palette — the hash lands on one of these. */
const HASH_TINTS = [
  "var(--sys-blue)",
  "var(--sys-green)",
  "var(--sys-orange)",
  "var(--sys-red)",
  "var(--sys-purple)",
  "var(--sys-cyan)",
  "var(--sys-indigo)",
  "var(--sys-pink)",
  "var(--sys-teal)",
  "var(--sys-yellow)",
] as const;

function hashTint(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return HASH_TINTS[Math.abs(h) % HASH_TINTS.length];
}

function initials(name: string): string {
  const parts = name
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  name = "",
  src,
  size = "md",
  shape = "circle",
  bg,
  className,
}: AvatarProps) {
  const px = typeof size === "number" ? size : GLYPH_SIZE_PX[size];
  const background = bg ?? hashTint(name);
  return (
    <Shape
      shape={shape}
      size={px}
      background={background}
      role="img"
      aria-label={name || undefined}
      title={name || undefined}
      className={cn("select-none overflow-hidden font-semibold text-fg-on-accent", className)}
      style={{ fontSize: Math.max(8, Math.round(px * 0.42)) }}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <span aria-hidden>{initials(name)}</span>
      )}
    </Shape>
  );
}
