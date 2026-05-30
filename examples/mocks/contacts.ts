import type { ContactItem } from "./types";

export const mockContacts: ContactItem[] = [
  {
    id: "p1",
    kind: "contact",
    display_name: "Sarah Chen",
    given_name: "Sarah",
    family_name: "Chen",
    organization: "Studio Design Co.",
    identifiers: [
      { kind: "email", value: "sarah@studio.com" },
      { kind: "email", value: "sarah.chen@icloud.com" },
      { kind: "phone", value: "+15551234567" },
    ],
    sources: ["applecontacts", "mail", "imessage"],
  },
  {
    id: "p2",
    kind: "contact",
    display_name: "Mike Patel",
    given_name: "Mike",
    family_name: "Patel",
    identifiers: [
      { kind: "email", value: "mike@patel.io" },
      { kind: "phone", value: "+14155553311" },
    ],
    sources: ["applecontacts", "imessage"],
  },
  {
    id: "p3",
    kind: "contact",
    display_name: "Alex Waight",
    given_name: "Alex",
    family_name: "Waight",
    identifiers: [{ kind: "phone", value: "+15554480123" }],
    sources: ["applecontacts", "imessage"],
  },
  {
    id: "p4",
    kind: "contact",
    display_name: "noreply@github.com",
    identifiers: [{ kind: "email", value: "noreply@github.com" }],
    sources: ["mail"],
  },
];
