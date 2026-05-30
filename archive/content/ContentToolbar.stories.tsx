import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { ContentToolbar } from "./ContentToolbar";

const meta = {
  title: "Archive/Content / ContentToolbar",
  component: ContentToolbar,
  tags: ["ai-generated"],
  args: { onPin: fn(), onFlag: fn(), onShare: fn(), onMore: fn() },
} satisfies Meta<typeof ContentToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: "Quarterly planning notes", subtitle: "ChatGPT · 42 messages" },
};

export const Pinned: Story = {
  args: { title: "Pinned thread", subtitle: "Claude", pinned: true },
};

export const Flagged: Story = {
  args: { title: "Follow up on invoice", subtitle: "Mail · Inbox", flagged: true },
};

export const PinTogglesCallback: Story = {
  args: { title: "Quarterly planning notes", subtitle: "ChatGPT" },
  // The four trailing icon buttons render in order: pin, flag, share, more.
  // Proves the pin action is wired (icons have no text, so we index by order).
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getAllByRole("button")[0]);
    await expect(args.onPin).toHaveBeenCalled();
  },
};
