import type { StoryFn } from "@storybook/react-vite";
import { mockContacts } from "../../examples/mocks/contacts";
import { mockConversations } from "../../examples/mocks/conversations";
import { mockEmails } from "../../examples/mocks/emails";
import { mockIMessages } from "../../examples/mocks/imessage";
import { mockSearchHits } from "../../examples/mocks/search";
import { ConversationRow } from "./ConversationRow";
import { EmailRow } from "./EmailRow";
import { IMessageRow } from "./IMessageRow";
import { ContactRow } from "./ContactRow";
import { SearchResultRow } from "./SearchResultRow";

export default { title: "Archive/Rows / All Kinds Side-by-Side" };

export const Combined: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated my-4 rounded-2xl border border-border overflow-hidden">
    <ConversationRow item={mockConversations[0]} />
    <EmailRow item={mockEmails[1]} />
    <IMessageRow item={mockIMessages[0]} />
    <ContactRow item={mockContacts[0]} />
    <SearchResultRow hit={mockSearchHits[3]} separator={false} />
  </div>
);
