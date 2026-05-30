import { variants } from "@rose-pine/palette";
import type {
  ColorToken,
  Palette,
  PaletteCollection,
  PaletteSource,
} from "@/foundations/color/color.types";
import type { ColorAdapter } from "../color-adapter.types";
import type { RosePineVariant } from "./rose-pine.types";

const SOURCE: PaletteSource = {
  provider: "rose-pine",
  pkg: "@rose-pine/palette",
  url: "https://github.com/rose-pine/palette",
  license: "MIT",
};

const APPEARANCE: Record<RosePineVariant, "light" | "dark"> = {
  main: "dark",
  moon: "dark",
  dawn: "light",
};

const withHash = (hex: string) => (hex.startsWith("#") ? hex : `#${hex}`);

function variantPalette(key: RosePineVariant): Palette {
  const variant = variants[key];
  const tokens: ColorToken[] = Object.entries(variant.colors).map(([name, c]) => {
    const [r, g, b] = c.rgb;
    return {
      id: `rose-pine-${key}-${name}`,
      name,
      value: withHash(c.hex),
      hex: withHash(c.hex),
      rgb: { r, g, b },
    };
  });
  return {
    id: variant.id,
    name: variant.name,
    type: "generic",
    appearance: APPEARANCE[key],
    tokens,
    source: SOURCE,
  };
}

export class RosePineAdapter implements ColorAdapter {
  id = "rose-pine";
  name = "Rosé Pine";

  getCollection(): PaletteCollection {
    return {
      id: this.id,
      name: this.name,
      source: SOURCE,
      palettes: (Object.keys(variants) as RosePineVariant[]).map(variantPalette),
    };
  }
}

/** Pre-instantiated adapter instance. */
export const rosePineAdapter = new RosePineAdapter();
export const rosePine = rosePineAdapter.getCollection();
