import { converter, formatHex, formatRgb, parse, wcagContrast } from "culori";
import type { RGBA } from "../src/foundations/color/color.types";

/**
 * The single place culori is touched. Wraps a CSS color string in lazy accessors
 * for the representations our docs/tooling need (hex, rgb, oklch, WCAG contrast).
 *
 * Accepts anything CSS understands — hex, rgb()/rgba(), hsl(), oklch(), named.
 */
const toOklch = converter("oklch");

export interface OklchValue {
  l: number;
  c: number;
  h: number;
  alpha: number;
}

export class ColorValue {
  /** The parsed culori color (undefined if the input couldn't be parsed). */
  private readonly parsed: ReturnType<typeof parse>;

  constructor(readonly input: string) {
    this.parsed = parse(input);
  }

  get valid(): boolean {
    return this.parsed !== undefined;
  }

  get hex(): string {
    return this.parsed ? formatHex(this.parsed) : "#000000";
  }

  get rgba(): RGBA {
    const c = this.parsed;
    if (!c) return { r: 0, g: 0, b: 0, a: 1 };
    const rgb = converter("rgb")(c);
    return {
      r: Math.round((rgb.r ?? 0) * 255),
      g: Math.round((rgb.g ?? 0) * 255),
      b: Math.round((rgb.b ?? 0) * 255),
      a: rgb.alpha ?? 1,
    };
  }

  get rgbaString(): string {
    return this.parsed ? formatRgb(this.parsed) : "rgb(0 0 0)";
  }

  get oklch(): OklchValue {
    const o = this.parsed ? toOklch(this.parsed) : undefined;
    return { l: o?.l ?? 0, c: o?.c ?? 0, h: o?.h ?? 0, alpha: o?.alpha ?? 1 };
  }

  /** WCAG contrast ratio (1–21) against another color. */
  contrast(other: string): number {
    return wcagContrast(this.input, other);
  }
}

/** Convenience factory. */
export function colorValue(input: string): ColorValue {
  return new ColorValue(input);
}
