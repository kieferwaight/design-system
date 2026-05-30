/** Materials available in the design system. */
export type MaterialThickness = "ultra-thin" | "thin" | "regular" | "thick";

export interface MaterialInfo {
  token: string;
  className: string;
  name: string;
  description: string;
}
