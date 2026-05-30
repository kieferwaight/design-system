import type { Meta, StoryObj } from "@storybook/react-vite";
import { BLUR_PX, blurTier, SHADOW_VALUES, shadowDepth } from "./elevation";

/**
 * Elevation — shadow depths representing z-axis height, and backdrop blurs representing glass materials.
 */
const meta: Meta = {
  title: "Foundations/Elevation",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

const SHADOW_DEPTHS = Object.keys(shadowDepth) as (keyof typeof shadowDepth)[];
const BLUR_TIERS = Object.keys(blurTier) as (keyof typeof blurTier)[];

export const Shadows: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <h3 className="m-0 text-sm font-semibold text-fg">Altitudinal Shadows</h3>
      <div className="flex flex-wrap gap-8">
        {SHADOW_DEPTHS.map((depth) => (
          <div
            key={depth}
            className="flex h-32 w-48 flex-col justify-between p-4"
            style={{
              background: "var(--color-bg-elevated)",
              borderRadius: "var(--radius-layer-3)",
              boxShadow: shadowDepth[depth],
              border: "1px solid var(--color-separator)",
            }}
          >
            <code className="text-xs font-mono text-fg-secondary">--shadow-{depth}</code>
            <div className="text-3xs font-mono text-fg-tertiary">
              <div>Light: {SHADOW_VALUES[depth].light}</div>
              <div className="mt-1">Dark: {SHADOW_VALUES[depth].dark}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const BackdropBlurs: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <h3 className="m-0 text-sm font-semibold text-fg">Backdrop Blurs (Glass Materials)</h3>
      {/* Dynamic colorful background to showcase glass filtration */}
      <div
        className="relative flex flex-wrap gap-6 p-12 overflow-hidden"
        style={{
          borderRadius: "var(--radius-layer-1)",
          background: "linear-gradient(135deg, #ff007f 0%, #7f00ff 50%, #00f0ff 100%)",
          minHeight: "300px",
        }}
      >
        {BLUR_TIERS.map((tier) => (
          <div
            key={tier}
            className="flex h-36 w-44 flex-col justify-between p-4 shadow-lg text-white"
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              borderRadius: "var(--radius-layer-3)",
              WebkitBackdropFilter: `blur(${blurTier[tier]}) saturate(180%)`,
              backdropFilter: `blur(${blurTier[tier]}) saturate(180%)`,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            <code className="text-xs font-mono">--blur-{tier}</code>
            <div className="text-2xs">
              <div>Radius: {BLUR_PX[tier]}px</div>
              <div className="mt-1 opacity-80">GPU Intensive</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
