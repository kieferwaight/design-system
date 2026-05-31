/**
 * Standardized color types and schema definitions.
 * Combines standard domain models (formerly model.ts) with central specifications.
 */

/** Channels: r/g/b are 0–255, a is 0–1. */
export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** The atom of the color model: one named color value. */
export interface ColorToken {
  /** Stable slug, e.g. "catppuccin-mocha-red". */
  id: string;
  /** Display name, e.g. "Red". */
  name: string;
  /** Canonical CSS color string — what `<Swatch>` and CSS consume. */
  value: string;
  /** Precomputed hex, when the source provides one. */
  hex?: string;
  /** Precomputed 8-bit channels, when the source provides them. */
  rgb?: { r: number; g: number; b: number };
  /** Provider hint: this color reads as an accent (vs. a neutral/surface). */
  accent?: boolean;
}

export type PaletteType = "generic" | "ansi" | "design-kit" | "highlight";

/** Provenance for an imported/external palette. */
export interface PaletteSource {
  provider: string; // "catppuccin"
  pkg: string; // "@catppuccin/palette"
  version?: string;
  url?: string;
  license?: string;
}

/** An ordered set of tokens — a scale, a flavor, or a curated collection. */
export interface Palette {
  id: string;
  name: string;
  type: PaletteType;
  appearance?: "light" | "dark";
  tokens: ColorToken[];
  source?: PaletteSource;
}

/** A normal/bright pair, as ANSI terminals expect. */
export interface AnsiColor {
  normal: ColorToken;
  bright: ColorToken;
}

/** A palette with the rigid 16-color ANSI structure (8 colors × normal/bright). */
export interface AnsiPalette extends Palette {
  type: "ansi";
  ansi: {
    black: AnsiColor;
    red: AnsiColor;
    green: AnsiColor;
    yellow: AnsiColor;
    blue: AnsiColor;
    magenta: AnsiColor;
    cyan: AnsiColor;
    white: AnsiColor;
  };
}

/** Discriminated on `type`. Extend with DesignKit/Highlight when those land. */
export type AnyPalette = Palette | AnsiPalette;

/** A provider's full offering — e.g. Catppuccin = 4 flavor palettes. */
export interface PaletteCollection {
  id: string;
  name: string;
  source?: PaletteSource;
  palettes: AnyPalette[];
}

/* ---------- Specifications & Generative Schemas ---------- */

/** Translucent light/dark color mappings. */
export interface ColorAppearanceValue {
  light: string;
  dark: string;
}

/** Accessibility high-contrast paired sensitive value. */
export interface ContrastSensitiveValue {
  default: ColorAppearanceValue;
  contrast: ColorAppearanceValue;
}

/** Precomputed OKLCH scale rung metadata. */
export interface OklchRung {
  rung: number;
  lightness: number;
  chroma: number | string;
  hueShift: number;
}

/** OKLCH generative definitions. */
export interface OklchGenerativeScales {
  seeds: {
    neutralH: number;
    accentH: number;
    accentC: number;
  };
  neutral: OklchRung[];
  accent: OklchRung[];
  status: Record<string, string>;
}

/** Apple Ecosystem primary palettes. */
export interface ApplePrimitivePalette {
  systemColors: Record<string, ContrastSensitiveValue>;
  systemGrays: Record<string, ContrastSensitiveValue>;
  labels: Record<string, ColorAppearanceValue>;
  fills: Record<string, ColorAppearanceValue>;
  backgrounds: {
    base: Record<string, ColorAppearanceValue>;
    grouped: Record<string, ColorAppearanceValue>;
  };
  separators: Record<string, ColorAppearanceValue>;
  link: ColorAppearanceValue;
  materials: Record<string, ColorAppearanceValue>;
  shadows: Record<string, ColorAppearanceValue>;
}

/** Semantic T2 CSS custom property descriptor. */
export interface SemanticRole {
  tokenName: string; // e.g. "--color-bg"
  description: string; // Human readable documentation
  value: string; // Mapped value, e.g. "light-dark(var(--apple-grouped-1-light), var(--apple-grouped-1-dark))"
}
