import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Bubble } from "./Bubble";

const meta = {
  title: "Archive/Content / Bubble",
  component: Bubble,
  tags: ["ai-generated"],
} satisfies Meta<typeof Bubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
  args: { role: "user", children: "Can you summarize this thread for me?", timestamp: "9:41 AM" },
};

export const AssistantMessage: Story = {
  args: {
    role: "assistant",
    children: "Sure — here's the gist of the conversation so far.",
    timestamp: "9:41 AM",
  },
};

export const ToolMessage: Story = {
  args: { role: "tool", children: "search_archive(query='invoices') → 12 results" },
};

export const SystemMessage: Story = {
  args: { role: "system", children: "Conversation branched from an earlier message." },
};

/**
 * The single project-wide CssCheck. `bg-accent` on a user bubble maps through
 * the Tailwind @theme bridge to `var(--color-accent)` from the design tokens —
 * so a real, non-transparent background colour is the only proof that both
 * Tailwind and theme.css actually loaded in the preview (toBeVisible would pass
 * on a fully unstyled bubble). `rounded-2xl` must likewise have produced a real
 * radius.
 */
export const CssCheck: Story = {
  args: { role: "user", children: "Themed bubble" },
  play: async ({ canvas }) => {
    const bubble = canvas.getByText("Themed bubble");
    const style = getComputedStyle(bubble);
    await expect(style.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
    await expect(style.backgroundColor).not.toBe("transparent");
    await expect(style.borderTopLeftRadius).not.toBe("0px");
  },
};
