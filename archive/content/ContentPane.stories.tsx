import type { StoryFn } from "@storybook/react-vite";
import { mockBubbles } from "../../examples/mocks/bubbles";
import { BackButton } from "../chrome/BackButton";
import { BubbleStream } from "./BubbleStream";
import { ContentPane } from "./ContentPane";
import { ContentToolbar } from "./ContentToolbar";

export default { title: "Archive/Content / Pane" };

export const Conversation: StoryFn = () => (
  <div className="h-screen max-w-md mx-auto border-x border-border bg-bg">
    <ContentPane
      header={
        <ContentToolbar
          leading={<BackButton label="Claude" />}
          title="Rewriting the data-portal as a streaming PWA"
          subtitle="Claude · 42 messages"
          pinned
        />
      }
    >
      <BubbleStream bubbles={mockBubbles} />
    </ContentPane>
  </div>
);

export const ToolbarStates: StoryFn = () => (
  <div className="flex flex-col gap-3 max-w-md mx-auto">
    <div className="bg-bg border border-border rounded-2xl overflow-hidden">
      <ContentToolbar leading={<BackButton label="Claude" />} title="Default toolbar" />
    </div>
    <div className="bg-bg border border-border rounded-2xl overflow-hidden">
      <ContentToolbar
        leading={<BackButton label="Inbox" />}
        title="With pin + flag active"
        subtitle="Sarah Chen · 4 messages"
        pinned
        flagged
      />
    </div>
  </div>
);
