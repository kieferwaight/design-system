import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Button } from "../primitives/Button";
import { ListHeader } from "./ListHeader";

const meta = {
  title: "Archive/List / ListHeader",
  component: ListHeader,
  tags: ["ai-generated"],
  decorators: [
    (Story) => (
      <div className="w-96 bg-bg-elevated">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: "All Conversations" },
  // The title must be exposed as the level-1 heading for the pane.
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 1, name: "All Conversations" }),
    ).toBeVisible();
  },
};

export const WithSubtitle: Story = {
  args: { title: "Inbox", subtitle: "1,284 messages · 7 unread" },
};

export const WithTrailingAction: Story = {
  args: {
    title: "Claude",
    trailing: (
      <Button size="sm" variant="ghost">
        Edit
      </Button>
    ),
  },
};
