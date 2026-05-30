import type { StoryFn } from "@storybook/react-vite";
import { mockConversations } from "../../examples/mocks/conversations";
import { ConversationRow } from "./ConversationRow";

export default { title: "Archive/Rows / Conversation" };

export const Default: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated">
    {mockConversations.slice(0, 5).map((c, i, arr) => (
      <ConversationRow key={c.id} item={c} separator={i < arr.length - 1} />
    ))}
  </div>
);

export const Selected: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated">
    {mockConversations.slice(0, 3).map((c, i, arr) => (
      <ConversationRow key={c.id} item={c} selected={i === 1} separator={i < arr.length - 1} />
    ))}
  </div>
);

export const States: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated">
    <ConversationRow
      item={{ ...mockConversations[0], pinned: true, flagged: true, unread: true }}
    />
    <ConversationRow item={{ ...mockConversations[1], pinned: true, unread: false }} />
    <ConversationRow item={{ ...mockConversations[2], flagged: true }} />
    <ConversationRow item={{ ...mockConversations[3], unread: true }} separator={false} />
  </div>
);
