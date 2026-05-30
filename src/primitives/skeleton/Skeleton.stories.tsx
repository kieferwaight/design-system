import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../box";
import { Stack } from "../stack";
import { Skeleton } from "./Skeleton";

/**
 * Skeleton Primitive — a structural content placeholder utilizing standard anim pulse.
 * It abstracts corner-radius mappings, maintaining visual symmetry during async loads.
 */
const meta: Meta<typeof Skeleton> = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    variant: "block",
    width: 240,
    height: 120,
  },
};

/**
 * Available shape variants matching typical UI nodes (blocks, text lines, and rounded avatar circles).
 */
export const Shapes: Story = {
  render: () => (
    <Stack gap="space-4" padding="space-4" bg="sunken" radius="layer-3" className="max-w-xs">
      <div>
        <div className="mb-2 text-3xs font-mono text-fg-tertiary">variant="circle"</div>
        <Skeleton variant="circle" width={48} height={48} />
      </div>
      <div>
        <div className="mb-2 text-3xs font-mono text-fg-tertiary">variant="line"</div>
        <Skeleton variant="line" />
      </div>
      <div>
        <div className="mb-2 text-3xs font-mono text-fg-tertiary">variant="block"</div>
        <Skeleton variant="block" width={180} height={32} />
      </div>
    </Stack>
  ),
};

/** Composing multiple skeleton pieces to build complete card overlays before data renders. */
export const skeletalComposition: Story = {
  render: () => (
    <Box padding="space-4" bg="elevated" radius="layer-3" border className="max-w-sm">
      <Stack gap="space-4">
        {/* Header section */}
        <Stack direction="horizontal" gap="space-3" align="center">
          <Skeleton variant="circle" width={40} height={40} />
          <Stack gap="space-1" className="flex-1">
            <Skeleton variant="line" width="60%" height={10} />
            <Skeleton variant="line" width="30%" height={8} />
          </Stack>
        </Stack>
        {/* Image body */}
        <Skeleton variant="block" height={160} />
        {/* Text paragraph */}
        <Stack gap="space-2">
          <Skeleton variant="line" />
          <Skeleton variant="line" />
          <Skeleton variant="line" width="80%" />
        </Stack>
      </Stack>
    </Box>
  ),
};
