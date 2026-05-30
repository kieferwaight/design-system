import type { DynamicTypeSize, MacTextStyle, TextStyle, WeightToken } from "./typography.types";

export type { DynamicTypeSize, MacTextStyle, TextStyle, WeightToken };

/**
 * Apple's typography system, as data.
 *
 * The catalog encodes the full Apple spec: the shared text-style names, each
 * style's default + emphasized weight, the iOS/iPadOS **Dynamic Type** scale
 * (every content-size category), and the separate **macOS** ramp. The live CSS
 * tokens in `src/design/primitives.css` (`--text-*`) hold the iOS **Large /
 * Default** ramp — the anchor every component renders at.
 *
 * https://developer.apple.com/design/human-interface-guidelines/typography
 */

export const WEIGHT_VALUE: Record<WeightToken, number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 800,
};

const WEIGHT_LABEL: Record<WeightToken, string> = {
  regular: "Regular",
  medium: "Medium",
  semibold: "Semibold",
  bold: "Bold",
  heavy: "Heavy",
};

export const weightLabel = (w: WeightToken) => WEIGHT_LABEL[w];

/**
 * The iOS text-style ramp at the **Large (default)** Dynamic Type size — the
 * values mirrored by the `--text-*` / `--weight-*` tokens. Largest → smallest.
 */
export const TEXT_STYLES: TextStyle[] = [
  {
    name: "Large Title",
    sizeToken: "large",
    weight: "regular",
    emphasized: "bold",
    size: 34,
    leading: 41,
    role: "The top-level title on a scroll view's first screen.",
  },
  {
    name: "Title 1",
    sizeToken: "title1",
    weight: "regular",
    emphasized: "bold",
    size: 28,
    leading: 34,
    role: "Primary section heading.",
  },
  {
    name: "Title 2",
    sizeToken: "title2",
    weight: "regular",
    emphasized: "bold",
    size: 22,
    leading: 28,
    role: "Secondary heading.",
  },
  {
    name: "Title 3",
    sizeToken: "title3",
    weight: "regular",
    emphasized: "semibold",
    size: 20,
    leading: 25,
    role: "Tertiary heading.",
  },
  {
    name: "Headline",
    sizeToken: "headline",
    weight: "semibold",
    emphasized: "semibold",
    size: 17,
    leading: 22,
    role: "Emphasized body — list row titles, card headers.",
  },
  {
    name: "Body",
    sizeToken: "body",
    weight: "regular",
    emphasized: "semibold",
    size: 17,
    leading: 22,
    role: "The default reading size for running text.",
  },
  {
    name: "Callout",
    sizeToken: "callout",
    weight: "regular",
    emphasized: "semibold",
    size: 16,
    leading: 21,
    role: "Slightly smaller than body — secondary content blocks.",
  },
  {
    name: "Subheadline",
    sizeToken: "subhead",
    weight: "regular",
    emphasized: "semibold",
    size: 15,
    leading: 20,
    role: "Supporting text under a headline.",
  },
  {
    name: "Footnote",
    sizeToken: "footnote",
    weight: "regular",
    emphasized: "semibold",
    size: 13,
    leading: 18,
    role: "Asides, attributions, fine print.",
  },
  {
    name: "Caption 1",
    sizeToken: "caption1",
    weight: "regular",
    emphasized: "semibold",
    size: 12,
    leading: 16,
    role: "Labels for images and controls.",
  },
  {
    name: "Caption 2",
    sizeToken: "caption2",
    weight: "regular",
    emphasized: "semibold",
    size: 11,
    leading: 13,
    role: "The smallest legible label.",
  },
];

/**
 * Recommended UI weights, in order. SF Pro ships nine weights, but Apple advises
 * against Ultralight / Thin / Light for small UI text — they lose legibility.
 */
export const WEIGHTS: { token: WeightToken; label: string; value: number; use: string }[] = [
  { token: "regular", label: "Regular", value: 400, use: "Body text and most running content." },
  {
    token: "medium",
    label: "Medium",
    value: 500,
    use: "Mild emphasis — active tabs, selected rows.",
  },
  {
    token: "semibold",
    label: "Semibold",
    value: 600,
    use: "Headlines and button labels — the workhorse emphasis on iOS.",
  },
  { token: "bold", label: "Bold", value: 700, use: "Strong emphasis, large titles, alerts." },
];

/** Weights Apple says to avoid for small UI text (SF Pro's lightest three). */
export const AVOID_WEIGHTS: { label: string; value: number }[] = [
  { label: "Ultralight", value: 100 },
  { label: "Thin", value: 200 },
  { label: "Light", value: 300 },
];

/* ---------------- iOS / iPadOS Dynamic Type ---------------- */

/** Content-size categories, smallest → largest. "Large" is the default. */
export const DYNAMIC_TYPE_SIZES: DynamicTypeSize[] = [
  "xSmall",
  "Small",
  "Medium",
  "Large",
  "xLarge",
  "xxLarge",
  "xxxLarge",
];

/** The default category the `--text-*` tokens encode. */
export const DEFAULT_DYNAMIC_SIZE: DynamicTypeSize = "Large";

/**
 * Per-style [size, leading] across every content-size category, in
 * `DYNAMIC_TYPE_SIZES` order. Weight is constant across categories (read it from
 * `TEXT_STYLES`); only size/leading scale. Keyed by `sizeToken`.
 */
export const DYNAMIC_TYPE: Record<string, [number, number][]> = {
  large: [
    [31, 38],
    [32, 39],
    [33, 40],
    [34, 41],
    [36, 43],
    [38, 46],
    [40, 48],
  ],
  title1: [
    [25, 31],
    [26, 32],
    [27, 33],
    [28, 34],
    [30, 37],
    [32, 39],
    [34, 41],
  ],
  title2: [
    [19, 24],
    [20, 25],
    [21, 26],
    [22, 28],
    [24, 30],
    [26, 32],
    [28, 34],
  ],
  title3: [
    [17, 22],
    [18, 23],
    [19, 24],
    [20, 25],
    [22, 28],
    [24, 30],
    [26, 32],
  ],
  headline: [
    [14, 19],
    [15, 20],
    [16, 21],
    [17, 22],
    [19, 24],
    [21, 26],
    [23, 29],
  ],
  body: [
    [14, 19],
    [15, 20],
    [16, 21],
    [17, 22],
    [19, 24],
    [21, 26],
    [23, 29],
  ],
  callout: [
    [13, 18],
    [14, 19],
    [15, 20],
    [16, 21],
    [18, 23],
    [20, 25],
    [22, 28],
  ],
  subhead: [
    [12, 16],
    [13, 18],
    [14, 19],
    [15, 20],
    [17, 22],
    [19, 24],
    [21, 28],
  ],
  footnote: [
    [12, 16],
    [12, 16],
    [12, 16],
    [13, 18],
    [15, 20],
    [17, 22],
    [19, 24],
  ],
  caption1: [
    [11, 13],
    [11, 13],
    [11, 13],
    [12, 16],
    [14, 19],
    [16, 21],
    [18, 23],
  ],
  caption2: [
    [11, 13],
    [11, 13],
    [11, 13],
    [11, 13],
    [13, 18],
    [15, 20],
    [17, 22],
  ],
};

/* ---------------- macOS built-in text styles ---------------- */

/** The macOS ramp — denser than iOS, with its own default/emphasized weights. */
export const MACOS_STYLES: MacTextStyle[] = [
  {
    name: "Large Title",
    sizeToken: "large",
    weight: "regular",
    emphasized: "bold",
    size: 26,
    leading: 32,
  },
  {
    name: "Title 1",
    sizeToken: "title1",
    weight: "regular",
    emphasized: "bold",
    size: 22,
    leading: 26,
  },
  {
    name: "Title 2",
    sizeToken: "title2",
    weight: "regular",
    emphasized: "bold",
    size: 17,
    leading: 22,
  },
  {
    name: "Title 3",
    sizeToken: "title3",
    weight: "regular",
    emphasized: "semibold",
    size: 15,
    leading: 20,
  },
  {
    name: "Headline",
    sizeToken: "headline",
    weight: "bold",
    emphasized: "heavy",
    size: 13,
    leading: 16,
  },
  {
    name: "Body",
    sizeToken: "body",
    weight: "regular",
    emphasized: "semibold",
    size: 13,
    leading: 16,
  },
  {
    name: "Callout",
    sizeToken: "callout",
    weight: "regular",
    emphasized: "semibold",
    size: 12,
    leading: 15,
  },
  {
    name: "Subheadline",
    sizeToken: "subhead",
    weight: "regular",
    emphasized: "semibold",
    size: 11,
    leading: 14,
  },
  {
    name: "Footnote",
    sizeToken: "footnote",
    weight: "regular",
    emphasized: "semibold",
    size: 10,
    leading: 13,
  },
  {
    name: "Caption 1",
    sizeToken: "caption1",
    weight: "regular",
    emphasized: "medium",
    size: 10,
    leading: 13,
  },
  {
    name: "Caption 2",
    sizeToken: "caption2",
    weight: "medium",
    emphasized: "semibold",
    size: 10,
    leading: 13,
  },
];

/* ---------------- helpers ---------------- */

/** Apple optically tightens tracking on larger sizes; we mirror that at ≥20pt. */
export const trackingFor = (size: number) =>
  size >= 20 ? "var(--tracking-tight)" : "var(--tracking-normal)";

/** Resolve a weight token to its `var(--weight-*)` reference. */
export const weightVar = (w: WeightToken) => `var(--weight-${w})`;
/** Resolve a size token to its `var(--text-*)` reference. */
export const sizeVar = (t: string) => `var(--text-${t})`;
