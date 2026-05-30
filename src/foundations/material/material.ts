import type { MaterialInfo, MaterialThickness } from "./material.types";

export const MATERIAL_THICKNESSES: MaterialThickness[] = ["ultra-thin", "thin", "regular", "thick"];

export const MATERIALS: Record<MaterialThickness, MaterialInfo> = {
  "ultra-thin": {
    token: "var(--material-ultra-thin)",
    className: "material-ultra-thin",
    name: "Ultra-Thin",
    description: "Most translucent — fleeting overlays, scrubber bars.",
  },
  thin: {
    token: "var(--material-thin)",
    className: "material-thin",
    name: "Thin",
    description: "Light scrims, inline panels.",
  },
  regular: {
    token: "var(--material-regular)",
    className: "material-regular",
    name: "Regular",
    description: "The default — sheets, popovers.",
  },
  thick: {
    token: "var(--material-thick)",
    className: "material-thick",
    name: "Thick",
    description: "Most opaque — bars, sidebars, persistent chrome.",
  },
} as const;
