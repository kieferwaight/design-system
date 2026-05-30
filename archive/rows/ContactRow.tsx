import { type ContactItem } from "../../examples/mocks/types";
import { Avatar } from "../primitives/Avatar";
import { Chip } from "../primitives/Chip";
import { Row } from "./Row";

interface ContactRowProps {
  item: ContactItem;
  selected?: boolean;
  onClick?: () => void;
  separator?: boolean;
}

const SOURCE_LABEL: Record<string, string> = {
  applecontacts: "Contacts",
  mail: "Mail",
  imessage: "Messages",
};

export function ContactRow({ item, selected, onClick, separator }: ContactRowProps) {
  const primaryEmail = item.identifiers.find((i) => i.kind === "email")?.value;
  const primaryPhone = item.identifiers.find((i) => i.kind === "phone")?.value;
  const subtitle = item.organization ?? primaryEmail ?? primaryPhone;

  return (
    <Row
      selected={selected}
      onClick={onClick}
      separator={separator}
      leading={<Avatar name={item.display_name} src={item.avatar_url} size="md" />}
      title={item.display_name}
      subtitle={subtitle}
      meta={
        <div className="flex gap-1">
          {item.sources.map((s) => (
            <Chip key={s} variant="muted" size="xs">
              {SOURCE_LABEL[s] ?? s}
            </Chip>
          ))}
        </div>
      }
    />
  );
}
