import type { StoryFn } from "@storybook/react-vite";
import { BackButton } from "./BackButton";

export default { title: "Archive/Chrome / Back Button" };

export const Default: StoryFn = () => (
  <div className="flex flex-col gap-3 p-6">
    <BackButton />
    <BackButton label="Inbox" />
    <BackButton label="Conversations" />
    <BackButton label="A really long parent route name that should truncate" />
  </div>
);
