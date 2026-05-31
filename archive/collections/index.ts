import { catppuccin, rosePine } from "@/adapters";
import type { PaletteCollection } from "../color.types";

/** All external palette providers, normalized to our standard model. */
export const externalCollections: PaletteCollection[] = [catppuccin, rosePine];

export { catppuccin, rosePine };
