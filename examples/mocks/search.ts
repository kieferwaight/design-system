import type { SearchHit } from "./types";

const now = Date.now() / 1000;
const HOUR = 3600;

export const mockSearchHits: SearchHit[] = [
  {
    id: "p1",
    kind: "contact",
    source_kind: "contact",
    title: "Sarah Chen",
    preview: "Studio Design Co. · sarah@studio.com",
  },
  {
    id: "e2",
    kind: "email",
    source_kind: "email",
    title: "Re: Q3 roadmap — quick alignment before Tuesday",
    preview: "Sarah Chen · 2 unread in thread",
    snippet: "I've added the **streaming-pwa** section to the doc.",
    date: now - 5 * HOUR,
  },
  {
    id: "im1",
    kind: "imessage",
    source_kind: "imessage",
    title: "Sarah",
    preview: "ok sounds good — I'll be there at 7",
    date: now - 12 * 60,
  },
  {
    id: "c2",
    kind: "conversation",
    source_kind: "conversation",
    title: "Spring physics for swipe-to-reveal rows",
    preview: "ChatGPT · 18 messages",
    snippet: "What rubber-band coefficient gives an **iOS-Mail** feel without overshooting?",
    date: now - 4 * HOUR,
  },
  {
    id: "c1",
    kind: "conversation",
    source_kind: "conversation",
    title: "Rewriting the data-portal as a streaming PWA",
    preview: "Claude · 42 messages",
    snippet: "We are going to rewrite this report using a modern framework system…",
    date: now - 15 * 60,
  },
  {
    id: "e1",
    kind: "email",
    source_kind: "email",
    title: "Your annual membership renews in 7 days",
    preview: "Apple Developer · noreply@developer.apple.com",
    date: now - 2 * HOUR,
  },
];

/** Live total streamed from `search.fuzzy` topic — updates as query narrows. */
export const mockSearchTotal = 6;
