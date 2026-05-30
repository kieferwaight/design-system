import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../icon";
import { Button } from "./Button";

/**
 * Button Primitive — a highly-responsive tap trigger wrapped in React Aria. It manages active states,
 * focus visible ring indicators, variants, and pending loading states, calibrated to standard token metrics.
 */
const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Action Button",
  },
};

/** Visual variant layers. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-6 bg-bg-sunken rounded-2xl">
      <Button variant="primary">Primary Action</Button>
      <Button variant="secondary">Secondary Action</Button>
      <Button variant="tertiary">Tertiary Action</Button>
      <Button variant="ghost">Ghost Trigger</Button>
      <Button variant="destructive" leadingIcon={<Icon name="trash" size="sm" />}>
        Delete Content
      </Button>
    </div>
  ),
};

/** T-shirt sizes. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-6 bg-bg-sunken rounded-2xl">
      <Button size="sm">Small Control</Button>
      <Button size="md">Medium Control</Button>
      <Button size="lg">Large Control</Button>
    </div>
  ),
};

/** Buttons combined with custom Vector SF Symbols. */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-6 bg-bg-sunken rounded-2xl">
      <Button leadingIcon={<Icon name="magnifyingglass" size="sm" />}>Search Database</Button>
      <Button variant="secondary" leadingIcon={<Icon name="pin.fill" size="sm" />}>
        Pin Column
      </Button>
      <Button variant="tertiary" trailingIcon={<Icon name="arrow.right" size="sm" />}>
        Forward Thread
      </Button>
      <Button variant="ghost" leadingIcon={<Icon name="bell.fill" size="sm" />}>
        Subscribe
      </Button>
    </div>
  ),
};

/** Standard button states (Default, Disabled, Pending/Loading, and Full Width). */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 bg-bg-sunken rounded-2xl max-w-sm">
      <Button>Active Action</Button>
      <Button isDisabled>Disabled Action</Button>
      <Button loading>Pending Action</Button>
      <Button fullWidth>Stretch Fit Button</Button>
    </div>
  ),
};
