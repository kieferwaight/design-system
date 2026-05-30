import { FlagIcon, PaperclipIcon } from "lucide-react";
import { Avatar } from "@/components/data/avatar/Avatar";
import { shortTime } from "@/lib/date";
import { Icon } from "@/primitives";
import type { EmailItem } from "../../../../examples/mocks/types";
import { Row } from "./Row";

export interface EmailRowProps {
  item: EmailItem;
  selected?: boolean;
  onClick?: () => void;
  separator?: boolean;
}

export function EmailRow({ item, selected, onClick, separator }: EmailRowProps) {
  return (
    <Row
      selected={selected}
      unread={item.unread}
      onClick={onClick}
      separator={separator}
      leading={<Avatar name={item.from_name || item.from_addr} size="md" />}
      title={
        <span className="flex items-baseline gap-1.5">
          <span className="truncate">{item.from_name || item.from_addr}</span>
          {item.thread_count && item.thread_count > 1 ? (
            <span className="text-xs text-fg-tertiary font-normal tabular-nums">
              ({item.thread_count})
            </span>
          ) : null}
        </span>
      }
      subtitle={item.subject}
      preview={item.preview}
      timestamp={shortTime(item.date)}
      badges={
        <>
          {item.has_attachments ? (
            <Icon as={PaperclipIcon} size={12} color="var(--color-fg-tertiary)" />
          ) : null}
          {item.flagged ? <Icon as={FlagIcon} size={12} color="var(--color-flag)" /> : null}
        </>
      }
    />
  );
}
