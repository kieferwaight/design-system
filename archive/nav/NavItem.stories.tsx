import type { Meta, StoryObj } from "@storybook/react-vite";
import { MailIcon, MessageSquareIcon } from "lucide-react";
import { expect, fn } from "storybook/test";
import { NavItem } from "./NavItem";

const meta = {
  title: "Archive/Nav / NavItem",
  component: NavItem,
  tags: ["ai-generated"],
  args: { onClick: fn() },
  // NavItem renders an <li>; give it a list parent so the markup is valid.
  decorators: [
    (Story) => (
      <ul className="w-72 bg-bg-elevated rounded-xl p-1">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "All Conversations", icon: MessageSquareIcon, count: 1284 },
};

export const Active: Story = {
  args: { label: "ChatGPT", icon: MessageSquareIcon, count: 412, active: true },
  // The active prop must surface as a queryable state, not just a tint.
  // (Scope by name — the preview's comment widget adds its own button.)
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: /ChatGPT/i })).toHaveAttribute(
      "data-active",
      "true",
    );
  },
};

export const MailFolderWithUnread: Story = {
  args: {
    label: "Inbox",
    secondary: "kiefer@icloud.com",
    icon: MailIcon,
    indent: 1,
    unreadCount: 7,
    drillable: true,
  },
};

export const FiresOnClick: Story = {
  args: { label: "Pinned", icon: MessageSquareIcon },
  // Proves the press handler is wired through react-aria's Button.
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: /Pinned/i }));
    await expect(args.onClick).toHaveBeenCalled();
  },
};
