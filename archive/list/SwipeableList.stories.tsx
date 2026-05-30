import type { StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "react-aria-components";
import { mockConversations } from "../../examples/mocks/conversations";
import { mockEmails } from "../../examples/mocks/emails";
import type { ConversationItem, EmailItem } from "../../examples/mocks/types";
import { ConversationRow } from "../rows/ConversationRow";
import { EmailRow } from "../rows/EmailRow";
import { SwipeableList } from "./SwipeableList";
import { SwipeableRow } from "./SwipeableRow";

export default {
  title: "Archive/List / Swipeable (iOS)",
  globals: {
    viewport: {
      value: "iphone14",
      isRotated: false
    }
  },
};

/** Swipe a row left → Pin + Flag reveal. Full swipe past ~80% pins it. */
export const Inbox: StoryFn = () => {
  const [items, setItems] = useState<EmailItem[]>(mockEmails);
  const pin = (id: string) =>
    setItems((xs) => xs.map((e) => (e.id === id ? { ...e, flagged: !e.flagged } : e)));
  return (
    <div className="h-screen bg-bg-sunken py-4">
      <SwipeableList aria-label="Inbox">
        {items.map((item) => (
          <SwipeableRow
            key={item.id}
            id={item.id}
            textValue={item.subject}
            onPin={() => pin(item.id)}
            onFlag={() => pin(item.id)}
          >
            <EmailRow item={item} />
          </SwipeableRow>
        ))}
      </SwipeableList>
    </div>
  );
};

export const Conversations: StoryFn = () => {
  const [items] = useState<ConversationItem[]>(mockConversations);
  return (
    <div className="h-screen bg-bg-sunken py-4">
      <SwipeableList aria-label="Conversations">
        {items.map((item) => (
          <SwipeableRow key={item.id} id={item.id} textValue={item.title}>
            <ConversationRow item={item} />
          </SwipeableRow>
        ))}
      </SwipeableList>
    </div>
  );
};

/** Toggle Edit → drag disabled, multi-select checkboxes, bulk action. */
export const EditMode: StoryFn = () => {
  const [items, setItems] = useState<EmailItem[]>(mockEmails);
  const [mode, setMode] = useState<"none" | "multiple">("none");
  const [keys, setKeys] = useState(new Set<string>());

  const removeSelected = () => {
    setItems((xs) => xs.filter((e) => !keys.has(e.id)));
    setKeys(new Set());
    setMode("none");
  };

  return (
    <div className="h-screen bg-bg-sunken py-4">
      <div className="flex items-center justify-between w-full sm:max-w-[420px] mx-auto px-4 pb-3">
        <Button
          isDisabled={mode === "none" || keys.size === 0}
          onPress={removeSelected}
          className="text-danger font-medium text-sm data-[disabled]:opacity-40 outline-none"
        >
          Delete{keys.size ? ` (${keys.size})` : ""}
        </Button>
        <Button
          onPress={() => setMode((m) => (m === "none" ? "multiple" : "none"))}
          className="text-accent font-medium text-sm outline-none"
        >
          {mode === "none" ? "Edit" : "Cancel"}
        </Button>
      </div>
      <SwipeableList
        aria-label="Inbox"
        selectionMode={mode}
        selectedKeys={keys}
        onSelectionChange={(s) => setKeys(s === "all" ? new Set(items.map((i) => i.id)) : new Set([...s].map(String)))}
      >
        {items.map((item) => (
          <SwipeableRow key={item.id} id={item.id} textValue={item.subject}>
            <EmailRow item={item} />
          </SwipeableRow>
        ))}
      </SwipeableList>
    </div>
  );
};
