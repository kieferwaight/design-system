import { cn } from "@/lib/cn";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  name?: string;
  src?: string;
  size?: Size;
  /** When true, avatar is square with sm radius instead of full circle. */
  square?: boolean;
  /** Override background color. Default is derived from name hash. */
  bg?: string;
  className?: string;
}

const sizePx: Record<Size, number> = { xs: 20, sm: 28, md: 36, lg: 48, xl: 64 };
const fontPx: Record<Size, number> = { xs: 9, sm: 11, md: 13, lg: 17, xl: 22 };

const PALETTE = [
  "#0a84ff",
  "#30d158",
  "#ff9f0a",
  "#ff453a",
  "#bf5af2",
  "#64d2ff",
  "#5e5ce6",
  "#ff375f",
  "#63e6e2",
  "#ffd60a",
];

function hashColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return PALETTE[Math.abs(h) % PALETTE.length];
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

export function Avatar({ name = "", src, size = "md", square, bg, className }: AvatarProps) {
  const px = sizePx[size];
  const fontSize = fontPx[size];
  const radius = square ? "var(--radius-sm)" : "var(--radius-full)";
  const background = bg ?? hashColor(name);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-semibold text-fg-on-accent select-none",
        "shrink-0 overflow-hidden",
        className,
      )}
      style={{ width: px, height: px, borderRadius: radius, background, fontSize }}
      aria-label={name}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials(name)}</span>
      )}
    </span>
  );
}
