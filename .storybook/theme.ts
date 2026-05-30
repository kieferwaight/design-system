import { create } from "storybook/theming";

/**
 * Storybook UI theme — Catppuccin Macchiato.
 * Used by both the manager (sidebar/toolbar) and the docs pages.
 * Hex values are the canonical Macchiato palette (@catppuccin/palette).
 */
const macchiato = {
  base: "#24273a",
  mantle: "#1e2030",
  crust: "#181926",
  text: "#cad3f5",
  subtext0: "#a5adcb",
  surface0: "#363a4f",
  surface1: "#494d64",
  blue: "#8aadf4",
  mauve: "#c6a0f6",
  pink: "#f5bde6",
  peach: "#f5a97f",
  red: "#ed8796",
  green: "#a6da95",
};

// Cascadia Code NF is the user's local coding font; fall back gracefully.
const fontStack = '"Cascadia Code NF", "Cascadia Code", ui-monospace, "SF Mono", monospace';

/** Peach → pink → mauve. Shared with the docs H1 gradient in preview-head.html. */
export const titleGradient = `linear-gradient(90deg, ${macchiato.peach} 0%, ${macchiato.pink} 50%, ${macchiato.mauve} 100%)`;

export const designKitTheme = create({
  base: "dark",

  // Brand — no logo, just the wordmark.
  brandTitle: "Design Kit",
  brandImage: undefined,
  brandUrl: undefined,

  // Typography
  fontBase: fontStack,
  fontCode: fontStack,

  // Accents
  colorPrimary: macchiato.mauve,
  colorSecondary: macchiato.blue,

  // App surfaces
  appBg: macchiato.mantle,
  appContentBg: macchiato.base,
  appPreviewBg: macchiato.base,
  appBorderColor: macchiato.surface0,
  appBorderRadius: 10,

  // Text
  textColor: macchiato.text,
  textInverseColor: macchiato.crust,
  textMutedColor: macchiato.subtext0,

  // Toolbar / top bar
  barBg: macchiato.crust,
  barTextColor: macchiato.subtext0,
  barSelectedColor: macchiato.mauve,
  barHoverColor: macchiato.pink,

  // Form inputs
  inputBg: macchiato.surface0,
  inputBorder: macchiato.surface1,
  inputTextColor: macchiato.text,
  inputBorderRadius: 8,

  // Booleans / toggles
  booleanBg: macchiato.surface0,
  booleanSelectedBg: macchiato.surface1,
});
