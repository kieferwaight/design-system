import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * LabeledSwatch — a composition that pairs a swatch with a label. It owns only
 * the layout: a swatch slot + a label slot, centered on the cross-axis.
 *
 * - `below` — swatch above a centered caption (keep it short: a size, color
 *   name, or hex value).
 * - `right` — swatch to the left of the label, vertically centered. Best for an
 *   RGB triple (see `RgbLabel`).
 *
 * Builds directly on **Components/Swatch** — pass a `<Swatch>` (or any
 * node) into the `swatch` slot.
 */
export type LabelPlacement = "below" | "right";

export interface LabeledSwatchProps {
  /** The swatch (or any media) being labelled. */
  swatch: ReactNode;
  /** The label content. Short by design — name, hex, size, or an RGB triple. */
  children: ReactNode;
  /** `below` (default) stacks + centers; `right` puts the label beside the swatch. */
  placement?: LabelPlacement;
  className?: string;
}

export function LabeledSwatch({
  swatch,
  children,
  placement = "below",
  className,
}: LabeledSwatchProps) {
  const below = placement === "below";
  return (
    <div
      className={cn(
        "inline-flex",
        below ? "flex-col items-center gap-1.5 text-center" : "flex-row items-center gap-3",
        className,
      )}
    >
      {swatch}
      <div className={cn("flex flex-col font-mono leading-tight", below && "items-center")}>
        {children}
      </div>
    </div>
  );
}

/**
 * RgbLabel — an R/G/B triple stacked for the `right` placement, the canonical
 * "color detail" label.
 */
export function RgbLabel({ r, g, b }: { r: number; g: number; b: number }) {
  const rows: [string, number][] = [
    ["R", r],
    ["G", g],
    ["B", b],
  ];
  return (
    <div className="flex flex-col gap-0.5 font-mono tabular-nums" style={{ fontSize: 17 }}>
      {rows.map(([ch, n]) => (
        <span key={ch} className="text-fg">
          <span className="mr-1.5 text-fg-secondary">{ch}</span>
          {n}
        </span>
      ))}
    </div>
  );
}
