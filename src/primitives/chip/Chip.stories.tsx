import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../icon";
import { Chip } from "./Chip";

/**
 * Chip Primitive — a compact metadata capsule or filter badge. It is designed to visually enforce
 * structural classification tags, badge counts, and dismissible icons on standard spacer grids.
 */
const meta: Meta<typeof Chip> = {
  title: "Primitives/Chip",
  component: Chip,
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    variant: "kind",
    kind: "conversation",
    count: 24,
  },
};

/**
 * High-fidelity lookup kinds representing top-level interface domains.
 * Color tones and icons are resolved automatically.
 */
export const Kinds: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-6 bg-bg-sunken rounded-2xl">
      <Chip kind="conversation" count={5} />
      <Chip kind="email" count={128} />
      <Chip kind="imessage" count={12} />
      <Chip kind="contact" />
      <Chip kind="agent" count="Online" />
      <Chip kind="search" />
    </div>
  ),
};

/** Visual variant layers. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-6 bg-bg-sunken rounded-2xl">
      <Chip variant="kind" kind="conversation" />
      <Chip variant="tinted" color="var(--sys-purple)">
        Tinted PURPLE
      </Chip>
      <Chip variant="outline" color="var(--sys-orange)">
        Outline ORANGE
      </Chip>
      <Chip variant="solid" color="var(--sys-blue)">
        Solid BLUE
      </Chip>
      <Chip variant="muted">Muted Grey Tag</Chip>
    </div>
  ),
};

/** Height and size variations. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-6 bg-bg-sunken rounded-2xl">
      <Chip size="xs" kind="conversation" count={2} />
      <Chip size="sm" kind="conversation" count={24} />
      <Chip size="md" kind="conversation" count={1042} />
    </div>
  ),
};

/** Chips integrated with custom Vector SF Symbols and interactive dismiss triggers. */
export const InteractiveDismiss: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-6 bg-bg-sunken rounded-2xl">
      <Chip
        variant="tinted"
        color="var(--sys-green)"
        trailingIcon={<Icon name="xmark" size="xs" className="hover:opacity-70 cursor-pointer" />}
      >
        Verified Active
      </Chip>
      <Chip
        variant="outline"
        color="var(--color-fg-secondary)"
        trailingIcon={<Icon name="xmark" size="xs" className="hover:opacity-70 cursor-pointer" />}
      >
        Static Tag
      </Chip>
    </div>
  ),
};
