import { BotIcon, UserIcon, WrenchIcon } from "lucide-react";
import { shortTime } from "@/lib/date";
import { Chip, Icon } from "@/primitives";
import type { AgentMessage } from "../../../../examples/mocks/types";
import { Row } from "./Row";

export interface AgentRowProps {
  item: AgentMessage;
  separator?: boolean;
}

export function AgentRow({ item, separator }: AgentRowProps) {
  const isStreaming = item.status === "streaming";
  const isError = item.status === "error";

  const leading =
    item.role === "user" ? (
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-bg-sunken">
        <Icon as={UserIcon} size={18} color="var(--color-fg-secondary)" />
      </span>
    ) : item.role === "tool" ? (
      <span
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
        style={{ background: "rgba(255, 159, 10, 0.16)" }}
      >
        <Icon as={WrenchIcon} size={18} color="var(--color-warning)" />
      </span>
    ) : (
      <span
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
        style={{ background: "rgba(191, 90, 242, 0.16)" }}
      >
        <Icon as={BotIcon} size={18} color="var(--color-accent)" />
      </span>
    );

  return (
    <Row
      separator={separator}
      leading={leading}
      title={
        item.role === "tool" && item.tool_name ? (
          <span className="font-mono text-sm">{item.tool_name}</span>
        ) : item.role === "user" ? (
          "You"
        ) : (
          "Agent"
        )
      }
      preview={
        isStreaming ? (
          <span>
            {item.content}
            <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-accent align-middle animate-pulse" />
          </span>
        ) : (
          item.content
        )
      }
      timestamp={shortTime(item.date)}
      meta={
        isStreaming ? (
          <Chip kind="agent" size="xs">
            streaming…
          </Chip>
        ) : isError ? (
          <Chip color="var(--color-danger)" variant="tinted" size="xs">
            error
          </Chip>
        ) : null
      }
    />
  );
}
