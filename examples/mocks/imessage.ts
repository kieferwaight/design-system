import type { IMessageItem } from "./types";

const now = Date.now() / 1000;
const MINUTE = 60;
const HOUR = 3600;
const DAY = HOUR * 24;

export const mockIMessages: IMessageItem[] = [
  {
    id: "im1",
    kind: "imessage",
    chat_label: "Sarah",
    participants: ["+15551234567"],
    is_group: false,
    last_message: "ok sounds good — I'll be there at 7",
    last_from_self: false,
    last_date: now - 12 * MINUTE,
    unread_count: 2,
    pinned: true,
  },
  {
    id: "im2",
    kind: "imessage",
    chat_label: "🏠 Family",
    participants: ["mom", "dad", "alex"],
    is_group: true,
    last_message: "Alex: lol that's amazing",
    last_from_self: false,
    last_date: now - 3 * HOUR,
    unread_count: 1,
    pinned: true,
  },
  {
    id: "im3",
    kind: "imessage",
    chat_label: "Studio Team",
    participants: ["jay", "max", "kim", "lior"],
    is_group: true,
    last_message: "You: pushed it, take a look when you can",
    last_from_self: true,
    last_date: now - 5 * HOUR,
    unread_count: 0,
    pinned: false,
  },
  {
    id: "im4",
    kind: "imessage",
    chat_label: "Mike Patel",
    participants: ["mike@patel.io"],
    is_group: false,
    last_message: "haha yeah no problem, see you next week",
    last_from_self: false,
    last_date: now - 1 * DAY,
    unread_count: 0,
    pinned: false,
  },
  {
    id: "im5",
    kind: "imessage",
    chat_label: "+1 (415) 555-0142",
    participants: ["+14155550142"],
    is_group: false,
    last_message: "Your verification code is 482917",
    last_from_self: false,
    last_date: now - 2 * DAY,
    unread_count: 0,
    pinned: false,
  },
];
