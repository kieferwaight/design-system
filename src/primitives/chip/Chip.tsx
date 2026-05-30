import type { ReactNode } from "react";
import { type Kind, kindMeta, toneBg, toneColor } from "@/generated";
import { cn } from "@/lib/cn";
import { Icon } from "../icon";

export type ChipVariant = "kind" | "tinted" | "outline" | "solid" | "muted";
export type ChipSize = "xs" | "sm" | "md";

export interface ChipProps {
  /** The top-level kind classification. Automatically resolves background, tone color, and icon. */
  kind?: Kind;
  /** Custom fallback color (CSS variable or value) used by tinted, outline, and solid variants. */
  color?: string;
  /** Visual variation theme. Defaults to "kind". */
  variant?: ChipVariant;
  /** Chip size scale (height and text). Defaults to "sm". */
  size?: ChipSize;
  /** Leading icon content. Overrides the resolved kind icon. */
  leadingIcon?: ReactNode;
  /** Trailing icon content. */
  trailingIcon?: ReactNode;
  /** Numerical badge count to show on the right of the text. */
  count?: number | string;
  className?: string;
  children?: ReactNode;
}

const sizeClasses: Record<ChipSize, string> = {
  xs: "h-[16px] px-[var(--space-1.5)] text-[9px] gap-[var(--space-1)] rounded-[var(--radius-layer-6)]", // 4px radius, 6px inset, 4px gap
  sm: "h-[20px] px-[var(--space-2)] text-[10px] gap-[var(--space-1.5)] rounded-[var(--radius-layer-5)]", // 8px radius, 8px inset, 6px gap
  md: "h-[24px] px-[var(--space-2.5)] text-xs gap-[var(--space-1.5)] rounded-[var(--radius-layer-5)]", // 8px radius, 10px inset, 6px gap
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

  // Resolve leading icon. Use custom leadingIcon first, otherwise map kind icon.
  const resolvedIcon =
    leadingIcon ?? (meta?.icon ? <Icon as={meta.icon} size={size === "xs" ? "xs" : "sm"} /> : null);

  const surface: Record<ChipVariant, { background: string; color: string; border?: string }> = {
    kind: { background: bg, color: color },
    tinted: { background: bg, color: color },
    outline: { background: "transparent", color, border: `1px solid ${color}` },
    solid: { background: color, color: "var(--color-fg-on-accent)" },
    muted: {
      background: "var(--color-bg-sunken)",
      color: "var(--color-fg-secondary)",
    },
  };
  const style = surface[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium tracking-tight select-none whitespace-nowrap leading-none",
        "transition-[background-color,color,border-color] duration-150 ease-out",
        sizeClasses[size],
        className,
      )}
      style={style}
    >
      {resolvedIcon ? (
        <span className="inline-flex shrink-0 items-center justify-center">{resolvedIcon}</span>
      ) : null}
      {label ? <span>{label}</span> : null}
      {count !== undefined ? (
        <span className="tabular-nums opacity-85 ml-0.5">
          {typeof count === "number" ? formatCount(count) : count}
        </span>
      ) : null}
      {trailingIcon ? (
        <span className="inline-flex shrink-0 items-center justify-center">{trailingIcon}</span>
      ) : null}
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
