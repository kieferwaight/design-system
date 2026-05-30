/**
 * Wire-shape types. These are the contract the future WebSocket topics will
 * deliver. Mock data conforms to them so components built against mocks plug
 * into real subscriptions unchanged.
 */

import type { Kind } from "@/generated";

export interface ConversationItem {
  id: string;
  kind: "conversation";
  provider: "chatgpt" | "claude" | "gemini" | "copilot";
  title: string;
  preview: string;
  updated_at: number;
  message_count: number;
  pinned: boolean;
  flagged: boolean;
  unread?: boolean;
}

export interface EmailItem {
  id: string;
  kind: "email";
  account: string;
  folder: "inbox" | "sent" | "drafts" | "archive" | "trash";
  from_name: string;
  from_addr: string;
  subject: string;
  preview: string;
  date: number;
  has_attachments: boolean;
  unread: boolean;
  flagged: boolean;
  thread_count?: number;
}

export interface IMessageItem {
  id: string;
  kind: "imessage";
  chat_label: string;
  participants: string[];
  is_group: boolean;
  last_message: string;
  last_from_self: boolean;
  last_date: number;
  unread_count: number;
  pinned: boolean;
}

export interface ContactItem {
  id: string;
  kind: "contact";
  display_name: string;
  given_name?: string;
  family_name?: string;
  organization?: string;
  avatar_url?: string;
  identifiers: Array<{ kind: "email" | "phone" | "handle"; value: string }>;
  sources: Array<"applecontacts" | "mail" | "imessage">;
  last_seen?: number;
}

export interface SearchHit {
  id: string;
  kind: Kind;
  title: string;
  preview: string;
  snippet?: string;
  date?: number;
  source_kind: Kind;
}

export interface AgentMessage {
  id: string;
  kind: "agent";
  role: "user" | "agent" | "tool";
  content: string;
  tool_name?: string;
  status?: "streaming" | "complete" | "error";
  date: number;
}

/* ----- Nav counts (live-updating totals per nav row) ----- */

export interface NavCounts {
  favorites: {
    all: number;
    pinned: number;
    flagged: number;
  };
  ai_models: Array<{
    slug: string;
    name: string;
    provider: "chatgpt" | "claude" | "gemini" | "copilot";
    count: number;
    accent: string;
  }>;
  email_accounts: Array<{
    id: number;
    label: string;
    count: number;
    folders?: Array<{ slug: string; label: string; count: number; unread: number }>;
  }>;
  imessage: { count: number; unread: number };
  contacts: { count: number };
}

/* ----- Message bubble (inside a conversation/imessage) ----- */

export interface Bubble {
  id: string;
  role: "user" | "assistant" | "tool" | "system";
  content: string;
  content_type?: "text" | "markdown" | "code" | "html";
  date: number;
  attachments?: Array<{ name: string; size: number; type: string }>;
}
