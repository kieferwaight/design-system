import { type FlavorName, flavors, version } from "@catppuccin/palette";
import type {
  AnsiColor,
  AnsiPalette,
  ColorToken,
  Palette,
  PaletteCollection,
  PaletteSource,
} from "@/foundations/color/color.types";
import type { ColorAdapter } from "../color-adapter.types";

const SOURCE: PaletteSource = {
  provider: "catppuccin",
  pkg: "@catppuccin/palette",
  version,
  url: "https://github.com/catppuccin/palette",
  license: "MIT",
};

const FLAVOR_IDS: FlavorName[] = ["latte", "frappe", "macchiato", "mocha"];
const ANSI_NAMES = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"] as const;

function flavorPalette(id: FlavorName): Palette {
  const flavor = flavors[id];
  const tokens: ColorToken[] = flavor.colorEntries.map(([key, c]) => ({
    id: `catppuccin-${id}-${key}`,
    name: c.name,
    value: c.hex,
    hex: c.hex,
    rgb: c.rgb,
    accent: c.accent,
  }));
  return {
    id: `catppuccin-${id}`,
    name: `Catppuccin ${flavor.name}`,
    type: "generic",
    appearance: flavor.dark ? "dark" : "light",
    tokens,
    source: SOURCE,
  };
}

function flavorAnsi(id: FlavorName): AnsiPalette {
  const flavor = flavors[id];
  const token = (key: (typeof ANSI_NAMES)[number], variant: "normal" | "bright"): ColorToken => {
    const c = flavor.ansiColors[key][variant];
    return {
      id: `catppuccin-${id}-ansi-${variant}-${key}`,
      name: `${variant} ${key}`,
      value: c.hex,
      hex: c.hex,
      rgb: c.rgb,
    };
  };
  const pair = (key: (typeof ANSI_NAMES)[number]): AnsiColor => ({
    normal: token(key, "normal"),
    bright: token(key, "bright"),
  });
  const ansi = {
    black: pair("black"),
    red: pair("red"),
    green: pair("green"),
    yellow: pair("yellow"),
    blue: pair("blue"),
    magenta: pair("magenta"),
    cyan: pair("cyan"),
    white: pair("white"),
  };
  const tokens = ANSI_NAMES.flatMap((k) => [ansi[k].normal, ansi[k].bright]);
  return {
    id: `catppuccin-${id}-ansi`,
    name: `Catppuccin ${flavor.name} · ANSI`,
    type: "ansi",
    appearance: flavor.dark ? "dark" : "light",
    tokens,
    ansi,
    source: SOURCE,
  };
}

export class CatppuccinAdapter implements ColorAdapter {
  id = "catppuccin";
  name = "Catppuccin";

  getCollection(): PaletteCollection {
    return {
      id: this.id,
      name: this.name,
      source: SOURCE,
      palettes: FLAVOR_IDS.flatMap((id) => [flavorPalette(id), flavorAnsi(id)]),
    };
  }
}

/** Pre-instantiated adapter instance. */
export const catppuccinAdapter = new CatppuccinAdapter();
export const catppuccin = catppuccinAdapter.getCollection();
