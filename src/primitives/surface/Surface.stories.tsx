import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "../stack";
import { Surface } from "./Surface";

/**
 * Surface Primitive — a specialized container extending `Box` that represents layout layers
 * and sheets. It maps container depth levels (0..6) and translucent glass materials
 * directly to concentric radii, shadows, and backdrop filters.
 */
const meta: Meta<typeof Surface> = {
  title: "Primitives/Surface",
  component: Surface,
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  args: {
    level: 3,
    padding: "space-4",
    children: (
      <Stack gap="space-2">
        <span className="text-sm font-bold text-fg">Level 3 Container (Standard Card)</span>
        <span className="text-xs text-fg-secondary">
          Resolves automatically to layer-3 radius (16px) and elevated background with soft shadow.
        </span>
      </Stack>
    ),
  },
};

/**
 * Nested container levels illustrating concentric layer alignment and shading scales.
 */
export const AltitudinalTiers: Story = {
  render: () => (
    <Surface level={1} padding="space-5" className="max-w-lg">
      <Stack gap="space-4">
        <div>
          <div className="text-xs font-mono text-fg-tertiary">
            Level 1: Sheet Panel (radius 24px, base bg)
          </div>
        </div>

        <Surface level={2} padding="space-4">
          <Stack gap="space-3">
            <div className="text-xs font-mono text-fg-tertiary">
              Level 2: Nested Panel (radius 20px, secondary bg)
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Surface level={3} padding="space-3">
                <div className="text-xs font-bold text-fg">Level 3: Card A</div>
                <div className="text-3xs text-fg-secondary mt-1">radius 16px, elevated bg</div>
              </Surface>
              <Surface level={3} padding="space-3">
                <div className="text-xs font-bold text-fg">Level 3: Card B</div>
                <div className="text-3xs text-fg-secondary mt-1">radius 16px, elevated bg</div>
              </Surface>
            </div>

            <Surface level={4} padding="space-3">
              <div className="text-xs font-mono text-fg-tertiary">
                Level 4: Embedded Sunken Control Wells (radius 12px, sunken bg)
              </div>
            </Surface>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  ),
};

/** Translucent physical glass layers rendered on top of a dynamic artwork background. */
export const GlassMaterials: Story = {
  render: () => (
    <div
      className="p-8 rounded-2xl bg-cover bg-center max-w-lg"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80')",
      }}
    >
      <Stack gap="space-4">
        {(["ultra-thin", "thin", "regular", "thick"] as const).map((thickness) => (
          <Surface
            key={thickness}
            material={thickness}
            padding="space-4"
            radius="layer-3"
            border
            borderColor="rgba(255, 255, 255, 0.15)"
          >
            <Stack gap="space-1">
              <span className="text-sm font-bold text-white uppercase">{thickness} Material</span>
              <span className="text-xs text-white/80">
                Backdrop filter glassmorphic panel layer
              </span>
            </Stack>
          </Surface>
        ))}
      </Stack>
    </div>
  ),
};
