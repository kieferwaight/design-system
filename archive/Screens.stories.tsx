import type { StoryFn } from "@storybook/react-vite";
import {
  MailIcon,
  MessagesSquareIcon,
  SearchIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";
import { mockBubbles } from "../examples/mocks/bubbles";
import { mockConversations } from "../examples/mocks/conversations";
import { mockEmails } from "../examples/mocks/emails";
import { mockIMessages } from "../examples/mocks/imessage";
import { mockNavCounts } from "../examples/mocks/nav-counts";
import { mockSearchHits } from "../examples/mocks/search";
import { BackButton } from "./chrome/BackButton";
import { SearchInput } from "./chrome/SearchInput";
import { TabBar } from "./chrome/TabBar";
import { Bubble } from "./content/Bubble";
import { BubbleStream } from "./content/BubbleStream";
import { ContentPane } from "./content/ContentPane";
import { ContentToolbar } from "./content/ContentToolbar";
import { ListEmpty } from "./list/ListEmpty";
import { ListHeader } from "./list/ListHeader";
import { ListPane } from "./list/ListPane";
import { NavDrawer } from "./nav/NavDrawer";
import { Button } from "./primitives/Button";
import { ConversationRow } from "./rows/ConversationRow";
import { EmailRow } from "./rows/EmailRow";
import { IMessageRow } from "./rows/IMessageRow";
import { SearchResultRow } from "./rows/SearchResultRow";

export default { title: "Archive/Screens (Mobile Drill-Down)" };

const tabs = [
  { key: "favorites", label: "Favorites", icon: StarIcon },
  { key: "mail", label: "Mail", icon: MailIcon, badgeCount: 59 },
  { key: "messages", label: "Messages", icon: MessagesSquareIcon, badgeCount: 3 },
  { key: "contacts", label: "Contacts", icon: UsersIcon },
  { key: "search", label: "Search", icon: SearchIcon },
];

/** A 393×850 phone-shaped frame around any screen. iPhone 15 width. */
function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto my-6">
      <div
        className="relative w-[393px] h-[852px] bg-bg overflow-hidden border border-border"
        style={{ borderRadius: 44 }}
      >
        {children}
      </div>
    </div>
  );
}

export const NavView: StoryFn = () => (
  <Phone>
    <div className="h-full pb-[72px] overflow-y-auto">
      <div className="px-4 pt-4 pb-2 sticky top-0 glass-strong z-10">
        <h1 className="text-3xl font-bold">data-portal</h1>
      </div>
      <NavDrawer counts={mockNavCounts} active="all" />
    </div>
    <TabBar items={tabs} active="favorites" onSelect={() => {}} />
  </Phone>
);

export const ListView_Conversations: StoryFn = () => {
  const [q, setQ] = useState("");
  return (
    <Phone>
      <div className="h-full pb-[72px]">
        <ListPane
          header={
            <ListHeader
              leading={<BackButton label="Library" />}
              title="Conversations"
              subtitle={`${mockConversations.length.toLocaleString()} archived`}
              trailing={<Button variant="ghost" size="sm">Edit</Button>}
              belowTitle={
                <SearchInput
                  value={q}
                  onChange={setQ}
                />
              }
            />
          }
          footer={`${mockConversations.length} of 4,287 · streaming`}
        >
          {mockConversations.map((c, i, arr) => (
            <ConversationRow key={c.id} item={c} separator={i < arr.length - 1} />
          ))}
        </ListPane>
      </div>
      <TabBar items={tabs} active="favorites" onSelect={() => {}} />
    </Phone>
  );
};

export const ListView_Inbox: StoryFn = () => {
  const [q, setQ] = useState("");
  return (
    <Phone>
      <div className="h-full pb-[72px]">
        <ListPane
          header={
            <ListHeader
              leading={<BackButton label="Mailboxes" />}
              title="Inbox"
              subtitle="kiefer.waight@icloud.com"
              belowTitle={
                <SearchInput
                  value={q}
                  onChange={setQ}
                  placeholder="Search Mail"
                />
              }
            />
          }
          footer="Updated just now · 47 unread"
        >
          {mockEmails.map((e, i, arr) => (
            <EmailRow key={e.id} item={e} separator={i < arr.length - 1} />
          ))}
        </ListPane>
      </div>
      <TabBar items={tabs} active="mail" onSelect={() => {}} />
    </Phone>
  );
};

export const ListView_Messages: StoryFn = () => {
  const [q, setQ] = useState("");
  return (
    <Phone>
      <div className="h-full pb-[72px]">
        <ListPane
          header={
            <ListHeader
              title="Messages"
              subtitle="3 unread"
              belowTitle={
                <SearchInput
                  value={q}
                  onChange={setQ}
                  placeholder="Search Messages"
                />
              }
            />
          }
        >
          {mockIMessages.map((m, i, arr) => (
            <IMessageRow key={m.id} item={m} separator={i < arr.length - 1} />
          ))}
        </ListPane>
      </div>
      <TabBar items={tabs} active="messages" onSelect={() => {}} />
    </Phone>
  );
};

export const ContentView_Conversation: StoryFn = () => (
  <Phone>
    <ContentPane
      header={
        <ContentToolbar
          leading={<BackButton label="Claude" />}
          title="Rewriting the data-portal as a streaming PWA"
          subtitle="Claude · 42 messages"
          pinned
        />
      }
    >
      <BubbleStream bubbles={mockBubbles} />
    </ContentPane>
  </Phone>
);

export const ContentView_IMessage: StoryFn = () => {
  return (
    <Phone>
      <ContentPane
        header={
          <ContentToolbar
            leading={<BackButton label="Messages" />}
            title="Sarah"
            subtitle="iMessage"
          />
        }
      >
        <div className="flex flex-col gap-2 px-4 py-4">
          <Bubble role="assistant">
            still good for 7pm?
          </Bubble>
          <Bubble role="assistant" timestamp="2 hr ago">
            running 10 min late
          </Bubble>
          <Bubble role="user" timestamp="1 hr ago">
            no worries, just got here
          </Bubble>
          <Bubble role="assistant" timestamp="12 min ago">
            ok sounds good — I'll be there at 7
          </Bubble>
        </div>
      </ContentPane>
    </Phone>
  );
};

export const SearchView_Live: StoryFn = () => {
  const [q, setQ] = useState("sarah");
  const filtered = q
    ? mockSearchHits.filter(
        (h) =>
          h.title.toLowerCase().includes(q.toLowerCase()) ||
          h.preview.toLowerCase().includes(q.toLowerCase()) ||
          h.snippet?.toLowerCase().includes(q.toLowerCase()),
      )
    : mockSearchHits;
  return (
    <Phone>
      <div className="h-full pb-[72px]">
        <ListPane
          header={
            <ListHeader
              title="Search"
              belowTitle={
                <SearchInput
                  value={q}
                  onChange={setQ}
                  liveCount={filtered.length}
                  placeholder="Search archive"
                />
              }
            />
          }
          footer={
            filtered.length > 0
              ? `${filtered.length} of ${mockSearchHits.length} matches · live`
              : "no matches"
          }
        >
          {filtered.length > 0 ? (
            filtered.map((h, i, arr) => (
              <SearchResultRow
                key={`${h.kind}:${h.id}`}
                hit={h}
                query={q}
                separator={i < arr.length - 1}
              />
            ))
          ) : (
            <ListEmpty icon={SearchIcon} title="No matches" subtitle={`Nothing matches "${q}".`} />
          )}
        </ListPane>
      </div>
      <TabBar items={tabs} active="search" onSelect={() => {}} />
    </Phone>
  );
};
