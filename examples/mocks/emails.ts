import type { EmailItem } from "./types";

const now = Date.now() / 1000;
const HOUR = 3600;
const DAY = HOUR * 24;

export const mockEmails: EmailItem[] = [
  {
    id: "e1",
    kind: "email",
    account: "kiefer.waight@icloud.com",
    folder: "inbox",
    from_name: "Apple Developer",
    from_addr: "noreply@developer.apple.com",
    subject: "Your annual membership renews in 7 days",
    preview:
      "Your Apple Developer Program membership will automatically renew on June 3. To continue building apps for Apple platforms, no action is required.",
    date: now - 2 * HOUR,
    has_attachments: false,
    unread: true,
    flagged: false,
  },
  {
    id: "e2",
    kind: "email",
    account: "kiefer.waight@icloud.com",
    folder: "inbox",
    from_name: "Sarah Chen",
    from_addr: "sarah@studio.com",
    subject: "Re: Q3 roadmap — quick alignment before Tuesday",
    preview:
      "Quick note before our call: I've added the streaming-pwa section to the doc. Take a look when you can…",
    date: now - 5 * HOUR,
    has_attachments: true,
    unread: true,
    flagged: true,
    thread_count: 4,
  },
  {
    id: "e3",
    kind: "email",
    account: "kiefer.waight@icloud.com",
    folder: "inbox",
    from_name: "GitHub",
    from_addr: "noreply@github.com",
    subject: "[kieferwaight/data-portal] PR #42: SPA rewrite phase 0",
    preview:
      "Claude opened a draft pull request: Set up Vite + React + Ladle component storyboard with iOS-native dark theme…",
    date: now - 1 * DAY,
    has_attachments: false,
    unread: false,
    flagged: false,
  },
  {
    id: "e4",
    kind: "email",
    account: "kw@studio.com",
    folder: "inbox",
    from_name: "Linear",
    from_addr: "no-reply@linear.app",
    subject: "Weekly digest: 23 issues updated",
    preview:
      "This week in DATA workspace: 12 issues moved to In Progress, 8 closed, 3 new bugs reported…",
    date: now - 2 * DAY,
    has_attachments: false,
    unread: false,
    flagged: false,
  },
  {
    id: "e5",
    kind: "email",
    account: "kiefer.waight@icloud.com",
    folder: "inbox",
    from_name: "Stripe",
    from_addr: "receipts@stripe.com",
    subject: "Your receipt from Anthropic [#1234-5678]",
    preview: "Amount paid: $20.00 USD. Thanks for your business — your receipt is attached.",
    date: now - 3 * DAY,
    has_attachments: true,
    unread: false,
    flagged: false,
  },
];
