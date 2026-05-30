import type { StoryFn } from "@storybook/react-vite";
import {
  MailIcon,
  MessagesSquareIcon,
  SearchIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";
import { TabBar } from "./TabBar";

export default { title: "Archive/Chrome / Tab Bar" };

const items = [
  { key: "favorites", label: "Favorites", icon: StarIcon },
  { key: "mail", label: "Mail", icon: MailIcon, badgeCount: 59 },
  { key: "messages", label: "Messages", icon: MessagesSquareIcon, badgeCount: 3 },
  { key: "contacts", label: "Contacts", icon: UsersIcon },
  { key: "search", label: "Search", icon: SearchIcon },
];

export const Default: StoryFn = () => {
  const [active, setActive] = useState("favorites");
  return (
    <div className="relative bg-bg h-[600px] max-w-md mx-auto border border-border rounded-2xl overflow-hidden">
      <div className="p-4 text-fg-secondary text-sm">
        Tab bar pinned to bottom. Tap to switch.
      </div>
      <TabBar items={items} active={active} onSelect={setActive} />
    </div>
  );
};
