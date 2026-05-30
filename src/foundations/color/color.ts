import type { ApplePrimitivePalette, OklchGenerativeScales, SemanticRole } from "./color.types";

/**
 * Centered design system color definitions.
 * Source of truth for raw Apple primitives, generative OKLCH variables,
 * semantic Tier-2 mappings, and data-accent configurations.
 */

/**
 * OKLCH Generative seed, lightness, and chroma configurations.
 * Directly mirrors the mathematical seed logic from primitives.css.
 */
export const oklchGenerativeScales: OklchGenerativeScales = {
  seeds: {
    neutralH: 250, // slightly cool gray — feels native on iOS
    accentH: 250, // default accent (blue-ish)
    accentC: 0.16, // accent chroma — how saturated
  },
  neutral: [
    { rung: 0, lightness: 0.99, chroma: 0.003 },
    { rung: 50, lightness: 0.97, chroma: 0.004 },
    { rung: 100, lightness: 0.94, chroma: 0.005 },
    { rung: 200, lightness: 0.89, chroma: 0.006 },
    { rung: 300, lightness: 0.81, chroma: 0.007 },
    { rung: 400, lightness: 0.71, chroma: 0.008 },
    { rung: 500, lightness: 0.6, chroma: 0.009 },
    { rung: 600, lightness: 0.5, chroma: 0.009 },
    { rung: 700, lightness: 0.41, chroma: 0.008 },
    { rung: 800, lightness: 0.31, chroma: 0.007 },
    { rung: 900, lightness: 0.22, chroma: 0.006 },
    { rung: 1000, lightness: 0.15, chroma: 0.005 },
    { rung: 1100, lightness: 0.1, chroma: 0.004 },
  ],
  accent: [
    { rung: 50, lightness: 0.95, chroma: "calc(var(--seed-accent-c) * 0.25)" },
    { rung: 100, lightness: 0.9, chroma: "calc(var(--seed-accent-c) * 0.45)" },
    { rung: 200, lightness: 0.83, chroma: "calc(var(--seed-accent-c) * 0.70)" },
    { rung: 300, lightness: 0.75, chroma: "calc(var(--seed-accent-c) * 0.90)" },
    { rung: 400, lightness: 0.68, chroma: "var(--seed-accent-c)" },
    { rung: 500, lightness: 0.6, chroma: "var(--seed-accent-c)" }, // true accent
    { rung: 600, lightness: 0.53, chroma: "var(--seed-accent-c)" },
    { rung: 700, lightness: 0.45, chroma: "calc(var(--seed-accent-c) * 0.90)" },
    { rung: 800, lightness: 0.37, chroma: "calc(var(--seed-accent-c) * 0.70)" },
    { rung: 900, lightness: 0.28, chroma: "calc(var(--seed-accent-c) * 0.50)" },
  ],
  status: {
    success: "oklch(0.62 0.15 145)",
    warning: "oklch(0.75 0.16 75)",
    danger: "oklch(0.58 0.20 25)",
  },
};

/**
 * Apple Ecosystem raw Tier-1 constants.
 * Combines standard light/dark modes with prefers-contrast overrides.
 * Values sourced exactly from primitives.css.
 */
export const applePrimitives: ApplePrimitivePalette = {
  systemColors: {
    red: {
      default: { light: "rgb(255 56 60)", dark: "rgb(255 66 69)" },
      contrast: { light: "rgb(233 21 45)", dark: "rgb(255 97 101)" },
    },
    orange: {
      default: { light: "rgb(255 141 40)", dark: "rgb(255 146 48)" },
      contrast: { light: "rgb(197 83 0)", dark: "rgb(255 160 86)" },
    },
    yellow: {
      default: { light: "rgb(255 204 0)", dark: "rgb(255 214 0)" },
      contrast: { light: "rgb(161 106 0)", dark: "rgb(254 223 67)" },
    },
    green: {
      default: { light: "rgb(52 199 89)", dark: "rgb(48 209 88)" },
      contrast: { light: "rgb(0 137 50)", dark: "rgb(74 217 104)" },
    },
    mint: {
      default: { light: "rgb(0 200 179)", dark: "rgb(0 218 195)" },
      contrast: { light: "rgb(0 133 117)", dark: "rgb(84 223 203)" },
    },
    teal: {
      default: { light: "rgb(0 195 208)", dark: "rgb(0 210 224)" },
      contrast: { light: "rgb(0 129 152)", dark: "rgb(59 221 236)" },
    },
    cyan: {
      default: { light: "rgb(0 192 232)", dark: "rgb(60 211 254)" },
      contrast: { light: "rgb(0 126 174)", dark: "rgb(109 217 255)" },
    },
    blue: {
      default: { light: "rgb(0 136 255)", dark: "rgb(0 145 255)" },
      contrast: { light: "rgb(30 110 244)", dark: "rgb(92 184 255)" },
    },
    indigo: {
      default: { light: "rgb(97 85 245)", dark: "rgb(109 124 255)" },
      contrast: { light: "rgb(86 74 222)", dark: "rgb(167 170 255)" },
    },
    purple: {
      default: { light: "rgb(203 48 224)", dark: "rgb(219 52 242)" },
      contrast: { light: "rgb(176 47 194)", dark: "rgb(234 141 255)" },
    },
    pink: {
      default: { light: "rgb(255 45 85)", dark: "rgb(255 55 95)" },
      contrast: { light: "rgb(231 18 77)", dark: "rgb(255 138 196)" },
    },
    brown: {
      default: { light: "rgb(172 127 94)", dark: "rgb(183 138 102)" },
      contrast: { light: "rgb(149 109 81)", dark: "rgb(219 166 121)" },
    },
  },
  systemGrays: {
    gray: {
      default: { light: "rgb(142 142 147)", dark: "rgb(142 142 147)" },
      contrast: { light: "rgb(108 108 112)", dark: "rgb(174 174 178)" },
    },
    gray2: {
      default: { light: "rgb(174 174 178)", dark: "rgb(99 99 102)" },
      contrast: { light: "rgb(142 142 147)", dark: "rgb(124 124 128)" },
    },
    gray3: {
      default: { light: "rgb(199 199 204)", dark: "rgb(72 72 74)" },
      contrast: { light: "rgb(174 174 178)", dark: "rgb(84 84 86)" },
    },
    gray4: {
      default: { light: "rgb(209 209 214)", dark: "rgb(58 58 60)" },
      contrast: { light: "rgb(188 188 192)", dark: "rgb(68 68 70)" },
    },
    gray5: {
      default: { light: "rgb(229 229 234)", dark: "rgb(44 44 46)" },
      contrast: { light: "rgb(216 216 220)", dark: "rgb(54 54 56)" },
    },
    gray6: {
      default: { light: "rgb(242 242 247)", dark: "rgb(28 28 30)" },
      contrast: { light: "rgb(235 235 240)", dark: "rgb(36 36 38)" },
    },
  },
  labels: {
    label: { light: "rgb(0 0 0)", dark: "rgb(255 255 255)" },
    label2: { light: "rgb(60 60 67 / 0.6)", dark: "rgb(235 235 245 / 0.6)" },
    label3: { light: "rgb(60 60 67 / 0.3)", dark: "rgb(235 235 245 / 0.3)" },
    label4: { light: "rgb(60 60 67 / 0.18)", dark: "rgb(235 235 245 / 0.16)" },
    placeholder: { light: "rgb(60 60 67 / 0.3)", dark: "rgb(235 235 245 / 0.3)" },
  },
  fills: {
    fill1: { light: "rgb(120 120 128 / 0.2)", dark: "rgb(120 120 128 / 0.36)" },
    fill2: { light: "rgb(120 120 128 / 0.16)", dark: "rgb(120 120 128 / 0.32)" },
    fill3: { light: "rgb(118 118 128 / 0.12)", dark: "rgb(118 118 128 / 0.24)" },
    fill4: { light: "rgb(116 116 128 / 0.08)", dark: "rgb(118 118 128 / 0.18)" },
  },
  backgrounds: {
    base: {
      bg1: { light: "rgb(255 255 255)", dark: "rgb(0 0 0)" },
      bg2: { light: "rgb(242 242 247)", dark: "rgb(28 28 30)" },
      bg3: { light: "rgb(255 255 255)", dark: "rgb(44 44 46)" },
    },
    grouped: {
      grouped1: { light: "rgb(242 242 247)", dark: "rgb(0 0 0)" },
      grouped2: { light: "rgb(255 255 255)", dark: "rgb(28 28 30)" },
      grouped3: { light: "rgb(242 242 247)", dark: "rgb(44 44 46)" },
    },
  },
  separators: {
    separator: { light: "rgb(60 60 67 / 0.29)", dark: "rgb(84 84 88 / 0.6)" },
    separatorOpaque: { light: "rgb(198 198 200)", dark: "rgb(56 56 58)" },
  },
  link: { light: "rgb(0 136 255)", dark: "rgb(0 145 255)" },
  materials: {
    ultraThin: { light: "rgb(255 255 255 / 0.36)", dark: "rgb(37 37 37 / 0.50)" },
    thin: { light: "rgb(255 255 255 / 0.50)", dark: "rgb(37 37 37 / 0.62)" },
    regular: { light: "rgb(255 255 255 / 0.62)", dark: "rgb(37 37 37 / 0.72)" },
    thick: { light: "rgb(255 255 255 / 0.78)", dark: "rgb(37 37 37 / 0.84)" },
    border: { light: "rgb(255 255 255 / 0.5)", dark: "rgb(255 255 255 / 0.12)" },
  },
  shadows: {
    sm: { light: "0 1px 2px rgb(0 0 0 / 0.06)", dark: "0 1px 2px rgb(0 0 0 / 0.4)" },
    md: { light: "0 4px 12px rgb(0 0 0 / 0.08)", dark: "0 4px 12px rgb(0 0 0 / 0.5)" },
    lg: { light: "0 12px 32px rgb(0 0 0 / 0.12)", dark: "0 12px 32px rgb(0 0 0 / 0.6)" },
  },
};

/**
 * Semantic Tier-2 Roles.
 * Maps components/design tokens directly to Apple Ecosystem Tier-1 constants.
 * Mirrors the declaration list in semantic.css.
 */
export const semanticRoles: SemanticRole[] = [
  // Backgrounds
  {
    tokenName: "--color-bg",
    description: "Grouped 1 background - main app body canvas background",
    value: "light-dark(var(--apple-grouped-1-light), var(--apple-grouped-1-dark))",
  },
  {
    tokenName: "--color-bg-elevated",
    description: "Grouped 2 background - list cards, rows, content surfaces",
    value: "light-dark(var(--apple-grouped-2-light), var(--apple-grouped-2-dark))",
  },
  {
    tokenName: "--color-bg-sunken",
    description: "Grouped 3 background - inset wells, fields background",
    value: "light-dark(var(--apple-grouped-3-light), var(--apple-grouped-3-dark))",
  },
  {
    tokenName: "--color-bg-base",
    description: "Flat Base 1 background",
    value: "light-dark(var(--apple-bg-1-light), var(--apple-bg-1-dark))",
  },
  {
    tokenName: "--color-bg-secondary",
    description: "Flat Base 2 background",
    value: "light-dark(var(--apple-bg-2-light), var(--apple-bg-2-dark))",
  },
  {
    tokenName: "--color-bg-tertiary",
    description: "Flat Base 3 background",
    value: "light-dark(var(--apple-bg-3-light), var(--apple-bg-3-dark))",
  },
  // Foreground labels
  {
    tokenName: "--color-fg",
    description: "Primary content label, solid contrast text / iconography",
    value: "light-dark(var(--apple-label-light), var(--apple-label-dark))",
  },
  {
    tokenName: "--color-fg-secondary",
    description: "Secondary content label - subtitle hierarchy",
    value: "light-dark(var(--apple-label2-light), var(--apple-label2-dark))",
  },
  {
    tokenName: "--color-fg-tertiary",
    description: "Tertiary content label - text descriptions and input hints",
    value: "light-dark(var(--apple-label3-light), var(--apple-label3-dark))",
  },
  {
    tokenName: "--color-fg-quaternary",
    description: "Quaternary content label - disabled controls and states",
    value: "light-dark(var(--apple-label4-light), var(--apple-label4-dark))",
  },
  {
    tokenName: "--color-placeholder",
    description: "Text input placeholder text color",
    value: "light-dark(var(--apple-placeholder-light), var(--apple-placeholder-dark))",
  },
  {
    tokenName: "--color-fg-on-accent",
    description: "Solid high-contrast text color laid on top of accent fill",
    value: "#fff",
  },
  // Fills
  {
    tokenName: "--color-fill",
    description: "Control fill - standard element background",
    value: "light-dark(var(--apple-fill1-light), var(--apple-fill1-dark))",
  },
  {
    tokenName: "--color-fill-secondary",
    description: "Secondary control fill - emphasized element background",
    value: "light-dark(var(--apple-fill2-light), var(--apple-fill2-dark))",
  },
  {
    tokenName: "--color-fill-tertiary",
    description: "Tertiary control fill - highly focused element background",
    value: "light-dark(var(--apple-fill3-light), var(--apple-fill3-dark))",
  },
  {
    tokenName: "--color-fill-quaternary",
    description: "Quaternary control fill - custom container layer background",
    value: "light-dark(var(--apple-fill4-light), var(--apple-fill4-dark))",
  },
  // Interactive Accent & Links
  {
    tokenName: "--color-accent",
    description: "Dynamic active accent color - maps to system blue by default",
    value: "var(--sys-blue)",
  },
  {
    tokenName: "--color-accent-hover",
    description: "Accent color state for pointer hover events",
    value: "color-mix(in srgb, var(--color-accent) 88%, black)",
  },
  {
    tokenName: "--color-accent-press",
    description: "Accent color state for active mouse press / tap events",
    value: "color-mix(in srgb, var(--color-accent) 76%, black)",
  },
  {
    tokenName: "--color-accent-subtle",
    description: "Tinted translucent background for accent components",
    value: "color-mix(in srgb, var(--color-accent) 15%, transparent)",
  },
  {
    tokenName: "--color-link",
    description: "Link text color - tracks system blue highlights",
    value: "light-dark(var(--apple-link-light), var(--apple-link-dark))",
  },
  // Borders & Separators
  {
    tokenName: "--color-separator",
    description: "Fine translucent divider boundary line",
    value: "light-dark(var(--apple-separator-light), var(--apple-separator-dark))",
  },
  {
    tokenName: "--color-border",
    description: "Element border outline var, references separator",
    value: "var(--color-separator)",
  },
  {
    tokenName: "--color-separator-opaque",
    description: "Solid separator line for overlay components",
    value: "light-dark(var(--apple-opaque-sep-light), var(--apple-opaque-sep-dark))",
  },
  // Status Colors
  {
    tokenName: "--color-success",
    description: "Success status role - green indicator",
    value: "var(--sys-green)",
  },
  {
    tokenName: "--color-warning",
    description: "Warning status role - orange indicator",
    value: "var(--sys-orange)",
  },
  {
    tokenName: "--color-danger",
    description: "Danger status role - red indicator",
    value: "var(--sys-red)",
  },
  // Semantics Component roles
  {
    tokenName: "--color-pin",
    description: "Pinned item color role",
    value: "var(--sys-yellow)",
  },
  {
    tokenName: "--color-flag",
    description: "Flagged item color role",
    value: "var(--sys-orange)",
  },
  {
    tokenName: "--color-favorite",
    description: "Hearted/favorited item color role",
    value: "var(--sys-red)",
  },
  // Materials
  {
    tokenName: "--material-ultra-thin",
    description: "Ultra-thin Apple translucency material fill",
    value: "light-dark(var(--apple-mat-ultrathin-light), var(--apple-mat-ultrathin-dark))",
  },
  {
    tokenName: "--material-thin",
    description: "Thin Apple translucency material fill",
    value: "light-dark(var(--apple-mat-thin-light), var(--apple-mat-thin-dark))",
  },
  {
    tokenName: "--material-regular",
    description: "Regular thickness Apple translucency material fill",
    value: "light-dark(var(--apple-mat-regular-light), var(--apple-mat-regular-dark))",
  },
  {
    tokenName: "--material-thick",
    description: "Thick Apple translucency material fill",
    value: "light-dark(var(--apple-mat-thick-light), var(--apple-mat-thick-dark))",
  },
  {
    tokenName: "--material-border",
    description: "Concentric specular highlight catching specular light on glass edge",
    value: "light-dark(rgb(255 255 255 / 0.5), rgb(255 255 255 / 0.12))",
  },
];

/**
 * Selection themes for accent overrides.
 * Re-points `--color-accent` at a specific system color.
 */
export const accentThemes: Record<string, string> = {
  blue: "var(--sys-blue)",
  indigo: "var(--sys-indigo)",
  purple: "var(--sys-purple)",
  pink: "var(--sys-pink)",
  red: "var(--sys-red)",
  orange: "var(--sys-orange)",
  green: "var(--sys-green)",
  teal: "var(--sys-teal)",
};
