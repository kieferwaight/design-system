import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../box";
import { Grid } from "./Grid";

/**
 * Grid Primitive — a CSS Grid container wrapper extending `Box`. It supports column/row
 * templates and spacing gap scales to define dynamic multi-dimensional interface layouts.
 */
const meta: Meta<typeof Grid> = {
  title: "Primitives/Grid",
  component: Grid,
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: {
    cols: 3,
    gap: "space-3",
    padding: "space-4",
    bg: "sunken",
    radius: "layer-3",
    children: (
      <>
        <Box
          bg="elevated"
          padding="space-3"
          radius="layer-5"
          border
          className="h-16 flex items-center justify-center"
        >
          <span className="text-xs text-fg">Card 1</span>
        </Box>
        <Box
          bg="elevated"
          padding="space-3"
          radius="layer-5"
          border
          className="h-16 flex items-center justify-center"
        >
          <span className="text-xs text-fg">Card 2</span>
        </Box>
        <Box
          bg="elevated"
          padding="space-3"
          radius="layer-5"
          border
          className="h-16 flex items-center justify-center"
        >
          <span className="text-xs text-fg">Card 3</span>
        </Box>
      </>
    ),
  },
};

/** A responsive grid mapping direct template specifications. */
export const CustomColumnsTemplate: Story = {
  args: {
    cols: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "space-3",
    padding: "space-4",
    bg: "sunken",
    radius: "layer-3",
    children: Array.from({ length: 6 }).map((_, i) => (
      <Box
        // biome-ignore lint/suspicious/noArrayIndexKey: simple static mock indices
        key={`card-${i}`}
        bg="elevated"
        padding="space-3"
        radius="layer-5"
        border
        className="h-16 flex flex-col items-center justify-center"
      >
        <span className="text-xs font-bold text-fg">#{i + 1}</span>
        <span className="text-3xs text-fg-secondary">Auto Card</span>
      </Box>
    )),
  },
};

/** Separate column gap and row gap settings. */
export const MixedGaps: Story = {
  args: {
    cols: 2,
    gapX: "space-6", // wide column distance
    gapY: "space-2", // tight row distance
    padding: "space-4",
    bg: "sunken",
    radius: "layer-3",
    children: Array.from({ length: 4 }).map((_, i) => (
      <Box
        // biome-ignore lint/suspicious/noArrayIndexKey: simple static mock indices
        key={`item-${i}`}
        bg="elevated"
        padding="space-3"
        radius="layer-5"
        border
        className="h-12 flex items-center justify-center text-xs text-fg"
      >
        Item {i + 1}
      </Box>
    )),
  },
};
