import type { Meta, StoryObj } from "@storybook/react-vite";
import { MessageSquareIcon, SparklesIcon } from "lucide-react";
import { expect } from "storybook/test";
import { NavCard } from "./NavCard";
import { NavItem } from "./NavItem";

const meta = {
  title: "Archive/Nav / NavCard",
  component: NavCard,
  tags: ["ai-generated"],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  args: {
    title: "AI Models",
    icon: SparklesIcon,
    count: 1696,
    children: (
      <>
        <NavItem label="ChatGPT" icon={MessageSquareIcon} count={412} />
        <NavItem label="Claude" icon={MessageSquareIcon} count={884} />
        <NavItem label="Gemini" icon={MessageSquareIcon} count={400} />
      </>
    ),
  },
} satisfies Meta<typeof NavCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {};

export const Collapsed: Story = {
  args: { defaultOpen: false },
};

/**
 * The header toggles the children open/closed — a real interaction whose result
 * (children appearing/disappearing) the static render can't prove on its own.
 */
export const TogglesOpen: Story = {
  args: { defaultOpen: false },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.queryByText("Claude")).toBeNull();
    await userEvent.click(canvas.getByRole("button", { name: /AI Models/i }));
    await expect(await canvas.findByText("Claude")).toBeVisible();
  },
};
