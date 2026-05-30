/**
 * "Kinds" are the top-level classification every row, chip, and content view
 * uses. The design system enforces visual consistency across the app by
 * lookup-driven color + icon assignment, not per-component decisions.
 */

import {
  BotIcon,
  type LucideIcon,
  MailIcon,
  MessageSquareIcon,
  MessagesSquareIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";

export type Kind = "conversation" | "email" | "imessage" | "contact" | "agent" | "search";

/**
 * Color is intentionally NOT part of kind metadata. The token system is
 * single-accent + status, re-seeded at runtime via data-accent — per-kind
 * rainbow hues would fight that. The icon is the kind differentiator; kind
 * chips/rows render with --color-accent (+ --color-accent-subtle pill bg).
 * The optional `tone` lets a few kinds opt into a status role instead.
 */
export type KindTone = "accent" | "success" | "muted";

export interface KindMeta {
  /** Stable enum value (matches server). */
  kind: Kind;
  /** Human-readable label for chips. */
  label: string;
  /** Lucide icon for chip + row icon slot. */
  icon: LucideIcon;
  /** Semantic color role this kind renders in. Defaults to "accent". */
  tone: KindTone;
}

/** Resolve a tone to its semantic CSS color var (foreground/icon color). */
export function toneColor(tone: KindTone): string {
  switch (tone) {
    case "success":
      return "var(--color-success)";
    case "muted":
      return "var(--color-fg-tertiary)";
    default:
      return "var(--color-accent)";
  }
}

/** Resolve a tone to its tinted pill-background var. */
export function toneBg(tone: KindTone): string {
  switch (tone) {
    case "success":
      return "color-mix(in oklch, var(--color-success) 16%, transparent)";
    case "muted":
      return "var(--color-bg-sunken)";
    default:
      return "var(--color-accent-subtle)";
  }
}

export const KINDS: Record<Kind, KindMeta> = {
  conversation: {
    kind: "conversation",
    label: "Conversation",
    icon: MessageSquareIcon,
    tone: "accent",
  },
  email: { kind: "email", label: "Email", icon: MailIcon, tone: "accent" },
  imessage: { kind: "imessage", label: "iMessage", icon: MessagesSquareIcon, tone: "success" },
  contact: { kind: "contact", label: "Contact", icon: UserIcon, tone: "muted" },
  agent: { kind: "agent", label: "Agent", icon: BotIcon, tone: "accent" },
  search: { kind: "search", label: "Search", icon: SearchIcon, tone: "accent" },
};

export function kindMeta(k: Kind): KindMeta {
  return KINDS[k];
}
