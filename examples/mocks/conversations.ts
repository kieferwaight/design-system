import type { ConversationItem } from "./types";

const now = Date.now() / 1000;
const HOUR = 3600;
const DAY = HOUR * 24;

export const mockConversations: ConversationItem[] = [
  {
    id: "c1",
    kind: "conversation",
    provider: "claude",
    title: "Rewriting the data-portal as a streaming PWA",
    preview:
      "We are going to rewrite this report using a modern framework system that is flexible, fast, and structured.",
    updated_at: now - 15 * 60,
    message_count: 42,
    pinned: true,
    flagged: false,
    unread: true,
  },
  {
    id: "c2",
    kind: "conversation",
    provider: "chatgpt",
    title: "Spring physics for swipe-to-reveal rows",
    preview:
      "What rubber-band coefficient gives an iOS-Mail feel without overshooting? I'm pulling between 0.55 and 0.35.",
    updated_at: now - 4 * HOUR,
    message_count: 18,
    pinned: false,
    flagged: true,
  },
  {
    id: "c3",
    kind: "conversation",
    provider: "claude",
    title: "Why SolidJS 2's async-first reactive graph matters",
    preview:
      "Computations returning Promises is the headline, but the real win is deterministic batching.",
    updated_at: now - 1 * DAY,
    message_count: 31,
    pinned: false,
    flagged: false,
  },
  {
    id: "c4",
    kind: "conversation",
    provider: "gemini",
    title: "Latency budget for live fuzzy search",
    preview: "140ms debounce is too slow for sub-50ms perceived response. Try 30–60ms with…",
    updated_at: now - 2 * DAY,
    message_count: 7,
    pinned: false,
    flagged: false,
  },
  {
    id: "c5",
    kind: "conversation",
    provider: "claude",
    title: "SF Symbols extraction → SVG pipeline",
    preview:
      "NSImage → PDF context → pdf2svg works, but the path data is bigger than the SVG export route.",
    updated_at: now - 3 * DAY,
    message_count: 12,
    pinned: false,
    flagged: false,
  },
  {
    id: "c6",
    kind: "conversation",
    provider: "copilot",
    title: "FastAPI WebSocket broker topology",
    preview: "Single /ws endpoint, async generators per topic. Hot path is patch propagation…",
    updated_at: now - 5 * DAY,
    message_count: 24,
    pinned: false,
    flagged: false,
  },
  {
    id: "c7",
    kind: "conversation",
    provider: "chatgpt",
    title: "Tailwind v4 @theme directive in CSS",
    preview: "No more tailwind.config.ts — tokens live in CSS, resolved by Lightning CSS.",
    updated_at: now - 7 * DAY,
    message_count: 9,
    pinned: false,
    flagged: false,
  },
  {
    id: "c8",
    kind: "conversation",
    provider: "claude",
    title: "Zustand vs TanStack Query for push-first state",
    preview:
      "TanStack Query optimizes request/response. For subscription-first reads Zustand wins on simplicity.",
    updated_at: now - 14 * DAY,
    message_count: 16,
    pinned: false,
    flagged: false,
  },
];

/** Provider → accent color used in row swatch / chip. */
export const providerAccent: Record<ConversationItem["provider"], string> = {
  chatgpt: "#10a37f",
  claude: "#cc785c",
  gemini: "#4285f4",
  copilot: "#0078d4",
};

/** Provider → short display label. */
export const providerLabel: Record<ConversationItem["provider"], string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  gemini: "Gemini",
  copilot: "Copilot",
};
