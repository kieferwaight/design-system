import type { Meta, StoryObj } from "@storybook/react-vite";
import { type SpacingScale, spacing } from "@/foundations/spacing";
import { Box } from "./Box";

/**
 * Box Primitive — the foundational, polymorphic layout container. It directly translates
 * design system spacer, radius, elevation, and backdrop blur tokens into CSS variable properties.
 */
const meta: Meta<typeof Box> = {
  title: "Primitives/Box",
  component: Box,
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj<typeof Box>;

/** Box using default configurations. */
export const Default: Story = {
  args: {
    bg: "elevated",
    padding: "space-4",
    radius: "layer-3",
    shadow: "sm",
    children: <div className="text-sm text-fg">I am a default Box container</div>,
  },
};

/**
 * Nested concentric containers to demonstrate how layer-based radii automatically prevent
 * corner pinching: outer layer = inner layer + inset gap.
 */
export const NestedConcentricRadii: Story = {
  render: () => (
    <Box bg="sunken" padding="space-5" radius="layer-1" className="max-w-md">
      <div className="mb-3 text-xs font-mono text-fg-secondary">
        Outer: layer-1 (24px) | inset: space-5 (24px)
      </div>
      <Box bg="base" padding="space-4" radius="layer-3">
        <div className="mb-3 text-xs font-mono text-fg-secondary">
          Middle: layer-3 (16px) | inset: space-4 (16px)
        </div>
        <Box bg="elevated" padding="space-3" radius="layer-5" shadow="sm">
          <div className="text-xs font-mono text-fg">Inner: layer-5 (8px)</div>
        </Box>
      </Box>
    </Box>
  ),
};

/** Spacing tokens mapping seamlessly to padding and margin scales. */
export const PaddingsAndMargins: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      {Object.entries(spacing).map(([key, value]) => (
        <Box
          key={key}
          bg="elevated"
          padding={key as SpacingScale}
          border
          className="flex items-center justify-between"
        >
          <span className="text-xs font-medium text-fg">{key}</span>
          <span className="text-2xs font-mono text-fg-tertiary">({value})</span>
        </Box>
      ))}
    </div>
  ),
};

/** Shadow depths representing relative altitude along the z-axis. */
export const ShadowDepths: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-6 bg-bg-sunken rounded-2xl">
      {(["sm", "md", "lg"] as const).map((depth) => (
        <Box
          key={depth}
          bg="elevated"
          padding="space-5"
          radius="layer-3"
          shadow={depth}
          className="flex flex-col items-center justify-center w-28 h-28"
        >
          <span className="text-sm font-bold text-fg uppercase">{depth}</span>
          <span className="text-2xs font-mono text-fg-tertiary mt-1">var(--shadow-{depth})</span>
        </Box>
      ))}
    </div>
  ),
};

/** Backdrop blurs combined with translucent materials creating premium glass layers. */
export const BackdropBlurs: Story = {
  render: () => (
    <div
      className="p-8 rounded-2xl bg-cover bg-center max-w-lg"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80')",
      }}
    >
      <div className="flex flex-col gap-4">
        {(["sm", "md", "lg", "xl"] as const).map((tier) => (
          <Box
            key={tier}
            blur={tier}
            bg="rgba(255, 255, 255, 0.15)"
            padding="space-4"
            radius="layer-3"
            border
            borderColor="rgba(255, 255, 255, 0.2)"
          >
            <div className="text-sm font-bold text-white uppercase">{tier} Blur</div>
            <div className="text-2xs text-white/80 font-mono">
              backdropFilter: blur(var(--blur-{tier}))
            </div>
          </Box>
        ))}
      </div>
    </div>
  ),
};

/** Directional borders to easily divide content sections. */
export const DirectionalBorders: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <Box padding="space-4" bg="elevated" border="top">
        <span className="text-xs font-mono text-fg-secondary">border="top" only</span>
      </Box>
      <Box padding="space-4" bg="elevated" border="y">
        <span className="text-xs font-mono text-fg-secondary">border="y" (top & bottom) only</span>
      </Box>
      <Box
        padding="space-4"
        bg="elevated"
        border={["left", "bottom"]}
        borderColor="var(--sys-green)"
      >
        <span className="text-xs font-mono text-fg-secondary">
          border={["left", "bottom"]} with custom color
        </span>
      </Box>
    </div>
  ),
};
