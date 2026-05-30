import type { StoryFn } from "@storybook/react-vite";
import { InboxIcon, MailIcon, PencilLineIcon } from "lucide-react";
import { useState } from "react";
import { mockConversations } from "../../examples/mocks/conversations";
import { mockEmails } from "../../examples/mocks/emails";
import { BackButton } from "../chrome/BackButton";
import { SearchInput } from "../chrome/SearchInput";
import { Button } from "../primitives/Button";
import { Icon } from "../primitives/Icon";
import { ConversationRow } from "../rows/ConversationRow";
import { EmailRow } from "../rows/EmailRow";
import { ListEmpty } from "./ListEmpty";
import { ListHeader } from "./ListHeader";
import { ListPane } from "./ListPane";
import { ListSkeleton } from "./ListSkeleton";

export default { title: "Archive/List / Pane" };

export const Conversations: StoryFn = () => {
  const [q, setQ] = useState("");
  return (
    <div className="h-screen max-w-md mx-auto border-x border-border bg-bg">
      <ListPane
        header={
          <ListHeader
            leading={<BackButton label="Library" />}
            title="Conversations"
            subtitle={`${mockConversations.length.toLocaleString()} archived`}
            trailing={<Button variant="ghost" size="sm">Edit</Button>}
            belowTitle={<SearchInput value={q} onChange={setQ} />}
          />
        }
        footer={`Updated just now · ${mockConversations.length} total`}
      >
        {mockConversations.map((c, i, arr) => (
          <ConversationRow key={c.id} item={c} separator={i < arr.length - 1} />
        ))}
      </ListPane>
    </div>
  );
};

export const Inbox: StoryFn = () => {
  const [q, setQ] = useState("");
  return (
    <div className="h-screen max-w-md mx-auto border-x border-border bg-bg">
      <ListPane
        header={
          <ListHeader
            leading={<BackButton label="Mailboxes" />}
            title="Inbox"
            subtitle="kiefer.waight@icloud.com"
            trailing={
              <Button variant="ghost" size="sm">
                <Icon as={PencilLineIcon} size={18} />
              </Button>
            }
            belowTitle={
              <SearchInput
                value={q}
                onChange={setQ}
                placeholder="Search Mail"
              />
            }
          />
        }
      >
        {mockEmails.map((e, i, arr) => (
          <EmailRow key={e.id} item={e} separator={i < arr.length - 1} />
        ))}
      </ListPane>
    </div>
  );
};

export const Loading: StoryFn = () => (
  <div className="h-screen max-w-md mx-auto border-x border-border bg-bg">
    <ListPane
      header={<ListHeader title="Conversations" />}
    >
      <ListSkeleton count={8} />
    </ListPane>
  </div>
);

export const Empty: StoryFn = () => (
  <div className="h-screen max-w-md mx-auto border-x border-border bg-bg">
    <ListPane
      header={<ListHeader title="Flagged" />}
    >
      <ListEmpty
        icon={MailIcon}
        title="Nothing flagged"
        subtitle="Items you flag in any source will show up here, ready to revisit."
      />
    </ListPane>
  </div>
);

export const VeryEmpty: StoryFn = () => (
  <div className="h-screen max-w-md mx-auto border-x border-border bg-bg">
    <ListPane header={<ListHeader title="Sent" />}>
      <ListEmpty icon={InboxIcon} title="No sent messages" />
    </ListPane>
  </div>
);
