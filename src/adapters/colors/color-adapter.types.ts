import type { PaletteCollection } from "@/foundations/color/color.types";

/**
 * Interface that all external color palette adapters must implement.
 * Ensures external libraries are normalized into our target PaletteCollection structure
 * before entering the design system's core foundations.
 */
export interface ColorAdapter {
  /** Uniquely identifies the color collection provider (e.g. "catppuccin"). */
  id: string;
  /** Display name of the provider (e.g. "Catppuccin"). */
  name: string;
  /** Resolves and returns the fully normalized palette collection. */
  getCollection(): PaletteCollection;
}
