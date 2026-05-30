import {
  CpuIcon,
  FlagIcon,
  InboxIcon,
  MailIcon as Mail,
  MessagesSquareIcon,
  PinIcon,
  SendIcon,
  StarIcon,
  TrashIcon,
  UsersIcon,
} from "lucide-react";
import type { ElementType } from "react";
import { Avatar } from "@/components/data/avatar/Avatar";
import type { NavCounts } from "../../../examples/mocks/types";
import { NavCard } from "./NavCard";
import { NavItem } from "./NavItem";

export interface NavDrawerProps {
  counts: NavCounts;
  /** Active item slug — controls the highlight state. */
  active?: string;
  onSelect?: (key: string) => void;
}

const FOLDER_ICON: Record<string, ElementType> = {
  inbox: InboxIcon,
  sent: SendIcon,
  drafts: Mail,
  archive: Mail,
  trash: TrashIcon,
};

export function NavDrawer({ counts, active, onSelect }: NavDrawerProps) {
  const select = (k: string) => () => onSelect?.(k);

  return (
    <nav className="flex flex-col gap-3 p-3 bg-bg min-h-full">
      <NavCard title="Favorites" icon={StarIcon} iconColor="var(--color-favorite)">
        <NavItem
          label="All Conversations"
          icon={Mail}
          iconColor="var(--color-accent)"
          count={counts.favorites.all}
          active={active === "all"}
          onClick={select("all")}
        />
        <NavItem
          label="Pinned"
          icon={PinIcon}
          iconColor="var(--color-pin)"
          count={counts.favorites.pinned}
          active={active === "pinned"}
          onClick={select("pinned")}
        />
        <NavItem
          label="Flagged"
          icon={FlagIcon}
          iconColor="var(--color-flag)"
          count={counts.favorites.flagged}
          active={active === "flagged"}
          onClick={select("flagged")}
        />
      </NavCard>

      <NavCard
        title="AI Models"
        icon={CpuIcon}
        iconColor="var(--color-success)"
        count={counts.ai_models.reduce((a, m) => a + m.count, 0)}
      >
        {counts.ai_models.map((m) => (
          <NavItem
            key={m.slug}
            label={m.name}
            leading={<Avatar name={m.name} size="sm" shape="square" bg={m.accent} />}
            count={m.count}
            active={active === `ai:${m.slug}`}
            onClick={select(`ai:${m.slug}`)}
          />
        ))}
      </NavCard>

      <NavCard
        title="Email"
        icon={Mail}
        iconColor="var(--color-accent)"
        count={counts.email_accounts.reduce((a, x) => a + x.count, 0)}
      >
        {counts.email_accounts.map((acct) => (
          <NavSubgroup key={acct.id} label={acct.label} count={acct.count} active={active}>
            {acct.folders?.map((f) => {
              const I = FOLDER_ICON[f.slug] ?? InboxIcon;
              return (
                <NavItem
                  key={f.slug}
                  label={f.label}
                  icon={I}
                  iconColor="var(--color-accent)"
                  count={f.count}
                  unreadCount={f.unread}
                  indent={1}
                  active={active === `mail:${acct.id}:${f.slug}`}
                  onClick={select(`mail:${acct.id}:${f.slug}`)}
                />
              );
            })}
          </NavSubgroup>
        ))}
      </NavCard>

      <NavCard
        title="Messages"
        icon={MessagesSquareIcon}
        iconColor="var(--color-success)"
        count={counts.imessage.count}
      >
        <NavItem
          label="iMessage"
          icon={MessagesSquareIcon}
          iconColor="var(--color-success)"
          count={counts.imessage.count}
          unreadCount={counts.imessage.unread}
          active={active === "imessage"}
          onClick={select("imessage")}
        />
      </NavCard>

      <NavCard
        title="Contacts"
        icon={UsersIcon}
        iconColor="var(--color-fg-secondary)"
        count={counts.contacts.count}
      >
        <NavItem
          label="All Contacts"
          icon={UsersIcon}
          count={counts.contacts.count}
          active={active === "contacts"}
          onClick={select("contacts")}
        />
      </NavCard>
    </nav>
  );
}

function NavSubgroup({
  label,
  count,
  active,
  children,
}: {
  label: string;
  count: number;
  active?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <NavItem
        label={label}
        icon={Mail}
        iconColor="var(--color-accent)"
        count={count}
        drillable
        active={active === `mail:${label}`}
      />
      {children}
    </>
  );
}
