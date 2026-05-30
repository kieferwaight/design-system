import type { StoryFn } from "@storybook/react-vite";
import { mockIMessages } from "../../examples/mocks/imessage";
import { IMessageRow } from "./IMessageRow";

export default { title: "Archive/Rows / iMessage" };

export const Default: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated">
    {mockIMessages.map((m, i, arr) => (
      <IMessageRow key={m.id} item={m} separator={i < arr.length - 1} />
    ))}
  </div>
);

export const HighUnread: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated">
    <IMessageRow item={{ ...mockIMessages[0], unread_count: 12 }} />
    <IMessageRow item={{ ...mockIMessages[1], unread_count: 999 }} separator={false} />
  </div>
);
