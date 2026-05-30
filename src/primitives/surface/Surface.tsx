import { forwardRef } from "react";
import { MATERIALS } from "@/foundations/material";
import { cn } from "@/lib/cn";
import { Box } from "../box";
import type { SurfaceLevel, SurfaceProps } from "./surface.types";

export const Surface = forwardRef<HTMLElement, SurfaceProps>(
  ({ level, material, className, bg, radius, shadow, children, ...rest }, ref) => {
    // Standard concentric defaults for each level
    const levelDefaults: Record<
      SurfaceLevel,
      { radius: string; bg: string; shadow?: "sm" | "md" | "lg" }
    > = {
      0: { radius: "layer-0", bg: "canvas" },
      1: { radius: "layer-1", bg: "base", shadow: "md" },
      2: { radius: "layer-2", bg: "secondary", shadow: "sm" },
      3: { radius: "layer-3", bg: "elevated", shadow: "sm" },
      4: { radius: "layer-4", bg: "sunken" },
      5: { radius: "layer-5", bg: "sunken" },
      6: { radius: "layer-6", bg: "transparent" },
    };

    const hasLevel = level !== undefined;
    const defaults = hasLevel ? levelDefaults[level] : undefined;

    // Apply level defaults if not overridden by explicit props
    const resolvedRadius = radius ?? defaults?.radius;
    const resolvedBg = bg ?? defaults?.bg;
    const resolvedShadow = shadow ?? defaults?.shadow;

    // Resolve material class if supplied
    const materialClass = material ? MATERIALS[material]?.className : undefined;

    return (
      <Box
        ref={ref}
        radius={resolvedRadius}
        bg={resolvedBg}
        shadow={resolvedShadow}
        className={cn("surface", materialClass, className)}
        {...rest}
      >
        {children}
      </Box>
    );
  },
);

Surface.displayName = "Surface";
