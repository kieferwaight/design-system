import type { StoryFn } from "@storybook/react-vite";
import { AgentRow } from "./AgentRow";

export default { title: "Archive/Rows / Agent" };

const now = Date.now() / 1000;

export const Default: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated">
    <AgentRow
      item={{
        id: "1",
        kind: "agent",
        role: "user",
        content: "Pull all unread emails from Sarah this week and summarize them.",
        date: now - 120,
      }}
    />
    <AgentRow
      item={{
        id: "2",
        kind: "agent",
        role: "tool",
        tool_name: "search_emails",
        content: "Searching account=kiefer.waight@icloud.com, from='Sarah', unread=true, since=7d",
        date: now - 100,
      }}
    />
    <AgentRow
      item={{
        id: "3",
        kind: "agent",
        role: "agent",
        content:
          "Found 4 unread emails from Sarah this week. Two are about the Q3 roadmap, one about a billing question, and one about scheduling Friday's review.",
        date: now - 60,
      }}
      separator={false}
    />
  </div>
);

export const Streaming: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated">
    <AgentRow
      item={{
        id: "1",
        kind: "agent",
        role: "agent",
        content: "Searching now and synthesizing — pulling threads from the last seven days",
        status: "streaming",
        date: now - 5,
      }}
      separator={false}
    />
  </div>
);

export const Error: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated">
    <AgentRow
      item={{
        id: "1",
        kind: "agent",
        role: "tool",
        tool_name: "search_emails",
        content: "Tool failed: SQLite database is locked",
        status: "error",
        date: now,
      }}
      separator={false}
    />
  </div>
);
