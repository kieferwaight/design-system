import { FlagIcon, PinIcon } from "lucide-react";
import { type ConversationItem } from "../../examples/mocks/types";
import { providerAccent, providerLabel } from "../../examples/mocks/conversations";
import { shortTime } from "@/lib/date";
import { Avatar } from "../primitives/Avatar";
import { Chip } from "../primitives/Chip";
import { Icon } from "../primitives/Icon";
import { Row } from "./Row";

interface ConversationRowProps {
  item: ConversationItem;
  selected?: boolean;
  onClick?: () => void;
  separator?: boolean;
}

export function ConversationRow({ item, selected, onClick, separator }: ConversationRowProps) {
  const accent = providerAccent[item.provider];
  return (
    <Row
      selected={selected}
      unread={item.unread}
      onClick={onClick}
      separator={separator}
      leading={<Avatar name={providerLabel[item.provider]} square bg={accent} size="md" />}
      title={item.title}
      preview={item.preview}
      timestamp={shortTime(item.updated_at)}
      meta={
        <Chip color={accent} variant="tinted" size="xs">
          {providerLabel[item.provider]}
        </Chip>
      }
      badges={
        <>
          {item.pinned ? <Icon as={PinIcon} size={12} color="var(--color-pin)" /> : null}
          {item.flagged ? <Icon as={FlagIcon} size={12} color="var(--color-flag)" /> : null}
          <span className="text-3xs text-fg-tertiary tabular-nums">{item.message_count}</span>
        </>
      }
    />
  );
}
