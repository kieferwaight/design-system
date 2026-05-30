import type { NavCounts } from "./types";

export const mockNavCounts: NavCounts = {
  favorites: { all: 4287, pinned: 23, flagged: 11 },
  ai_models: [
    { slug: "chatgpt", name: "ChatGPT", provider: "chatgpt", count: 1247, accent: "#10a37f" },
    { slug: "claude", name: "Claude", provider: "claude", count: 892, accent: "#cc785c" },
    { slug: "gemini", name: "Gemini", provider: "gemini", count: 314, accent: "#4285f4" },
    { slug: "copilot", name: "Copilot", provider: "copilot", count: 88, accent: "#0078d4" },
  ],
  email_accounts: [
    {
      id: 1,
      label: "kiefer.waight@icloud.com",
      count: 52341,
      folders: [
        { slug: "inbox", label: "Inbox", count: 1284, unread: 47 },
        { slug: "sent", label: "Sent", count: 4112, unread: 0 },
        { slug: "drafts", label: "Drafts", count: 8, unread: 0 },
        { slug: "archive", label: "Archive", count: 41897, unread: 0 },
      ],
    },
    {
      id: 2,
      label: "kw@studio.com",
      count: 8723,
      folders: [
        { slug: "inbox", label: "Inbox", count: 312, unread: 12 },
        { slug: "sent", label: "Sent", count: 1881, unread: 0 },
        { slug: "archive", label: "Archive", count: 6530, unread: 0 },
      ],
    },
  ],
  imessage: { count: 18922, unread: 3 },
  contacts: { count: 2841 },
};
