import type { Meta, StoryObj } from "@storybook/react-vite";
import { InboxIcon, SearchIcon } from "lucide-react";
import { ListEmpty } from "./ListEmpty";

const meta = {
  title: "Archive/List / ListEmpty",
  component: ListEmpty,
  tags: ["ai-generated"],
  decorators: [
    (Story) => (
      <div className="h-80 w-96 bg-bg-elevated">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListEmpty>;

export default meta;
type Story = StoryObj<typeof meta>;

// Static presentational variants — the render itself is the test.
export const NoSelection: Story = {
  args: { icon: InboxIcon, title: "Nothing selected", subtitle: "Pick a conversation to read it." },
};

export const NoSearchResults: Story = {
  args: {
    icon: SearchIcon,
    title: "No results",
    subtitle: "No messages match “quarterly invoice”.",
  },
};

export const TitleOnly: Story = {
  args: { title: "This folder is empty" },
};
