import { PinIcon, UsersIcon } from "lucide-react";
import { Avatar } from "@/components/data/avatar/Avatar";
import { shortTime } from "@/lib/date";
import { Icon } from "@/primitives";
import type { IMessageItem } from "../../../../examples/mocks/types";
import { Row } from "./Row";

export interface IMessageRowProps {
  item: IMessageItem;
  selected?: boolean;
  onClick?: () => void;
  separator?: boolean;
}

export function IMessageRow({ item, selected, onClick, separator }: IMessageRowProps) {
  return (
    <Row
      selected={selected}
      unread={item.unread_count > 0}
      onClick={onClick}
      separator={separator}
      leading={
        item.is_group ? (
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: "var(--color-success)" }}
          >
            <UsersIcon size={18} color="white" strokeWidth={2} />
          </span>
        ) : (
          <Avatar name={item.chat_label} size="md" />
        )
      }
      title={item.chat_label}
      preview={
        item.last_from_self ? (
          <span>
            <span className="text-fg-tertiary">You: </span>
            {item.last_message}
          </span>
        ) : (
          item.last_message
        )
      }
      timestamp={shortTime(item.last_date)}
      badges={
        <>
          {item.pinned ? <Icon as={PinIcon} size={12} color="var(--color-pin)" /> : null}
          {item.unread_count > 0 ? (
            <span
              className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full text-3xs font-bold tabular-nums text-fg-on-accent"
              style={{ background: "var(--color-accent)" }}
            >
              {item.unread_count}
            </span>
          ) : null}
        </>
      }
    />
  );
}
