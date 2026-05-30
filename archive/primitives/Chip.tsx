import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { type Kind, kindMeta, toneBg, toneColor } from "@/generated";

type ChipVariant = "kind" | "tinted" | "outline" | "solid" | "muted";
type ChipSize = "xs" | "sm" | "md";

interface ChipProps {
  /** When variant="kind", `kind` resolves the color + icon from the kind registry. */
  kind?: Kind;
  /** Custom color (CSS color or var). Used by non-kind variants. */
  color?: string;
  variant?: ChipVariant;
  size?: ChipSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  count?: number | string;
  className?: string;
  children?: ReactNode;
}

const sizeClasses: Record<ChipSize, string> = {
  xs: "h-4 px-1.5 text-3xs gap-1 rounded",
  sm: "h-5 px-2 text-2xs gap-1.5 rounded-md",
  md: "h-6 px-2.5 text-xs gap-1.5 rounded-md",
};

export function Chip({
  kind,
  color: colorProp,
  variant = "kind",
  size = "sm",
  leadingIcon,
  trailingIcon,
  count,
  className,
  children,
}: ChipProps) {
  const meta = kind ? kindMeta(kind) : null;
  const color = colorProp ?? (meta ? toneColor(meta.tone) : "var(--color-fg-secondary)");
  const bg = meta ? toneBg(meta.tone) : "var(--color-bg-sunken)";
  const label = children ?? meta?.label;
  const Icon = leadingIcon ?? (meta?.icon ? <meta.icon size={size === "xs" ? 9 : 11} /> : null);

  const surface: Record<ChipVariant, { background: string; color: string; border?: string }> = {
    kind: { background: bg, color: color },
    tinted: { background: bg, color: color },
    outline: { background: "transparent", color, border: `1px solid ${color}` },
    solid: { background: color, color: "var(--color-fg-on-accent)" },
    muted: { background: "var(--color-bg-sunken)", color: "var(--color-fg-secondary)" },
  };
  const style = surface[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium tracking-tight select-none whitespace-nowrap leading-none",
        sizeClasses[size],
        className,
      )}
      style={style}
    >
      {Icon ? <span className="inline-flex shrink-0">{Icon}</span> : null}
      {label ? <span>{label}</span> : null}
      {count !== undefined ? (
        <span className="tabular-nums opacity-80">
          {typeof count === "number" ? formatCount(count) : count}
        </span>
      ) : null}
      {trailingIcon ? <span className="inline-flex shrink-0">{trailingIcon}</span> : null}
    </span>
  );
}

/** Truncate large counts: 1247 → 1.2k, 52341 → 52k, 1284000 → 1.3M. */
export function formatCount(n: number): string {
  if (n < 1000) return String(n);
  if (n < 10_000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  if (n < 1_000_000) return `${Math.round(n / 1000)}k`;
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
}
