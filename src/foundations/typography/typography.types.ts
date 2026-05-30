export type WeightToken = "regular" | "medium" | "semibold" | "bold" | "heavy";

export interface TextStyle {
  /** HIG name, e.g. "Large Title". */
  name: string;
  /** Size token (without the `--text-` prefix), e.g. "large", "body". */
  sizeToken: string;
  /** Default weight at the Large (default) Dynamic Type size. */
  weight: WeightToken;
  /** Weight used when the style is *emphasized* (the bold/strong variant). */
  emphasized: WeightToken;
  /** Point size at the Large (default) Dynamic Type size. */
  size: number;
  /** Line height (leading) in points, Large size. */
  leading: number;
  /** Where the style is meant to be used. */
  role: string;
}

export type DynamicTypeSize =
  | "xSmall"
  | "Small"
  | "Medium"
  | "Large"
  | "xLarge"
  | "xxLarge"
  | "xxxLarge";

export interface MacTextStyle {
  name: string;
  sizeToken: string;
  weight: WeightToken;
  emphasized: WeightToken;
  size: number;
  leading: number;
}
