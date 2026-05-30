import type { CSSProperties } from "react";
import {
  sizeVar,
  type TextStyle,
  trackingFor,
  weightLabel,
  weightVar,
} from "@/foundations/typography";
import { cn } from "@/lib/cn";

/**
 * Specimen — the visual display of a single text style (the atom of the type
 * model). Foundations/Typography: TextStyle token → **Specimen** → Ramp.
 *
 * Renders a line of sample text at the style's exact size/weight/leading next to
 * a spec column (token name + numeric size · weight → emphasized · leading).
 */
export interface SpecimenProps {
  style: TextStyle;
  /** The sample words rendered at this style. Defaults to the style name. */
  sample?: string;
  /** Render in the style's *emphasized* weight instead of its default. */
  emphasized?: boolean;
  /** Show the right-hand spec column (token + numbers). Default true. */
  showSpec?: boolean;
}

export function Specimen({ style, sample, emphasized = false, showSpec = true }: SpecimenProps) {
  const weight = emphasized ? style.emphasized : style.weight;
  const textStyle: CSSProperties = {
    fontSize: sizeVar(style.sizeToken),
    fontWeight: weightVar(weight) as unknown as number,
    lineHeight: `${style.leading}px`,
    letterSpacing: trackingFor(style.size),
  };

  return (
    <div className="flex items-baseline justify-between gap-6 py-2 border-b border-separator">
      <span className="text-fg min-w-0 truncate" style={textStyle}>
        {sample ?? style.name}
      </span>
      {showSpec ? (
        <span className="flex shrink-0 flex-col items-end leading-tight text-right">
          <span className="text-xs font-mono text-fg-secondary">--text-{style.sizeToken}</span>
          <span className="text-2xs text-fg-tertiary tabular-nums">
            {style.size}pt · {weightLabel(style.weight)}
            {style.emphasized !== style.weight ? ` → ${weightLabel(style.emphasized)}` : ""} ·{" "}
            {style.leading}pt
          </span>
        </span>
      ) : null}
    </div>
  );
}

/**
 * SpecimenRamp — an ordered set of Specimens (the Palette-equivalent for type).
 */
export function SpecimenRamp({
  styles,
  sample,
  emphasized,
  className,
}: {
  styles: TextStyle[];
  sample?: string | ((s: TextStyle) => string);
  emphasized?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col p-6 max-w-3xl", className)}>
      {styles.map((s) => (
        <Specimen
          key={s.name}
          style={s}
          emphasized={emphasized}
          sample={typeof sample === "function" ? sample(s) : sample}
        />
      ))}
    </div>
  );
}
