import type { Meta, StoryObj } from "@storybook/react-vite";
import { spacing } from "@/foundations/spacing";
import { Box } from "../box";
import { Stack } from "./Stack";

/**
 * Stack Primitive — a high-performance flexbox wrapper extending `Box` properties
 * to organize elements along vertical or horizontal axes with structured token gaps.
 */
const meta: Meta<typeof Stack> = {
  title: "Primitives/Stack",
  component: Stack,
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  args: {
    direction: "vertical",
    gap: "space-3",
    padding: "space-4",
    bg: "sunken",
    radius: "layer-3",
    children: (
      <>
        <Box bg="elevated" padding="space-3" radius="layer-5" border>
          <span className="text-xs text-fg">First Stack Item</span>
        </Box>
        <Box bg="elevated" padding="space-3" radius="layer-5" border>
          <span className="text-xs text-fg">Second Stack Item</span>
        </Box>
        <Box bg="elevated" padding="space-3" radius="layer-5" border>
          <span className="text-xs text-fg">Third Stack Item</span>
        </Box>
      </>
    ),
  },
};

/** Horizontal layout rows. */
export const HorizontalRow: Story = {
  args: {
    direction: "horizontal",
    gap: "space-4",
    align: "center",
    padding: "space-4",
    bg: "sunken",
    radius: "layer-3",
    children: (
      <>
        <Box bg="elevated" padding="space-3" radius="layer-5" className="w-24 text-center">
          <span className="text-xs text-fg">Item One</span>
        </Box>
        <Box bg="elevated" padding="space-3" radius="layer-5" className="w-24 text-center">
          <span className="text-xs text-fg">Item Two</span>
        </Box>
        <Box bg="elevated" padding="space-3" radius="layer-5" className="w-24 text-center">
          <span className="text-xs text-fg">Item Three</span>
        </Box>
      </>
    ),
  },
};

/** Standard spacing ladder gaps between stack children. */
export const SpacingGaps: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      {(["space-1", "space-3", "space-5", "space-7"] as const).map((gapKey) => (
        <div key={gapKey}>
          <div className="mb-2 text-2xs font-mono text-fg-tertiary">
            gap="{gapKey}" ({spacing[gapKey]})
          </div>
          <Stack direction="horizontal" gap={gapKey} bg="sunken" padding="space-2" radius="layer-4">
            <Box bg="elevated" padding="space-2" radius="layer-6" className="w-12 h-8" />
            <Box bg="elevated" padding="space-2" radius="layer-6" className="w-12 h-8" />
            <Box bg="elevated" padding="space-2" radius="layer-6" className="w-12 h-8" />
          </Stack>
        </div>
      ))}
    </div>
  ),
};

/** Alignments along the cross axis (align prop). */
export const CrossAxisAlignments: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["start", "center", "end", "stretch"] as const).map((align) => (
        <div key={align}>
          <div className="mb-2 text-2xs font-mono text-fg-tertiary">align="{align}"</div>
          <Stack
            direction="horizontal"
            align={align}
            gap="space-3"
            bg="sunken"
            padding="space-3"
            radius="layer-3"
            className="h-20"
          >
            <Box
              bg="elevated"
              padding="space-2"
              radius="layer-5"
              className="w-16 h-8 flex items-center justify-center text-3xs text-fg"
            >
              1
            </Box>
            <Box
              bg="elevated"
              padding="space-2"
              radius="layer-5"
              className="w-16 h-12 flex items-center justify-center text-3xs text-fg"
            >
              2 (taller)
            </Box>
            <Box
              bg="elevated"
              padding="space-2"
              radius="layer-5"
              className="w-16 h-6 flex items-center justify-center text-3xs text-fg"
            >
              3
            </Box>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

/** Flex wrapping flow behavior when elements exceed bounds. */
export const FlexWrapping: Story = {
  args: {
    direction: "horizontal",
    wrap: true,
    gap: "space-2",
    padding: "space-4",
    bg: "sunken",
    radius: "layer-3",
    className: "w-80",
    children: Array.from({ length: 10 }).map((_, i) => (
      <Box
        // biome-ignore lint/suspicious/noArrayIndexKey: simple static mock indices
        key={`badge-${i}`}
        bg="elevated"
        padding="space-2"
        radius="layer-5"
        className="w-16 h-8 flex items-center justify-center text-3xs text-fg"
      >
        Badge {i + 1}
      </Box>
    )),
  },
};
