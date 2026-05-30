import type { StoryFn } from "@storybook/react-vite";
import {
  BotIcon,
  ChevronRightIcon,
  EllipsisIcon,
  FlagIcon,
  MailIcon,
  MessageSquareIcon,
  MessagesSquareIcon,
  PaperclipIcon,
  PinIcon,
  SearchIcon,
  StarIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import { Icon } from "./Icon";

export default {
  title: "Archive/Primitives / Icon",
};

export const Sizes: StoryFn = () => (
  <div className="flex items-end gap-4 p-6">
    {[10, 12, 14, 16, 20, 24, 32, 48].map((s) => (
      <div key={s} className="flex flex-col items-center gap-1">
        <Icon as={MessageSquareIcon} size={s} />
        <span className="text-3xs text-fg-tertiary">{s}px</span>
      </div>
    ))}
  </div>
);

export const Set: StoryFn = () => {
  const set = [
    [MessageSquareIcon, "conversation"],
    [MailIcon, "email"],
    [MessagesSquareIcon, "imessage"],
    [UserIcon, "contact"],
    [BotIcon, "agent"],
    [SearchIcon, "search"],
    [PinIcon, "pin"],
    [FlagIcon, "flag"],
    [StarIcon, "star"],
    [PaperclipIcon, "paperclip"],
    [EllipsisIcon, "ellipsis"],
    [ChevronRightIcon, "chevron-right"],
    [TrashIcon, "trash"],
  ] as const;
  return (
    <div className="grid grid-cols-6 gap-4 p-6">
      {set.map(([I, name]) => (
        <div key={name} className="flex flex-col items-center gap-1.5">
          <Icon as={I} size={20} />
          <span className="text-3xs text-fg-tertiary">{name}</span>
        </div>
      ))}
    </div>
  );
};

export const Tints: StoryFn = () => (
  <div className="flex items-center gap-4 p-6">
    <Icon as={PinIcon} size={20} color="var(--color-pin)" />
    <Icon as={FlagIcon} size={20} color="var(--color-flag)" />
    <Icon as={StarIcon} size={20} color="var(--color-favorite)" />
    <Icon as={MessageSquareIcon} size={20} color="var(--color-accent)" />
    <Icon as={MailIcon} size={20} color="var(--color-accent)" />
    <Icon as={MessagesSquareIcon} size={20} color="var(--color-success)" />
    <Icon as={BotIcon} size={20} color="var(--color-accent)" />
  </div>
);
