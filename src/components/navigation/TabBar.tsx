import type { ElementType } from "react";
import { type Key, Tab, TabList, Tabs } from "react-aria-components";
import { cn } from "@/lib/cn";
import { Icon } from "@/primitives";

export interface TabBarItemDef {
  key: string;
  label: string;
  icon: ElementType;
  badgeCount?: number;
}

export interface TabBarProps {
  items: TabBarItemDef[];
  active: string;
  onSelect: (key: string) => void;
}

export function TabBar({ items, active, onSelect }: TabBarProps) {
  return (
    <Tabs
      selectedKey={active}
      onSelectionChange={(key: Key) => onSelect(String(key))}
      className={cn(
        "fixed bottom-0 inset-x-0 z-30 glass-strong border-t border-border",
        "pb-[env(safe-area-inset-bottom)] pt-1",
      )}
    >
      <TabList items={items} className="flex" aria-label="Sections">
        {(it: TabBarItemDef) => (
          <Tab
            id={it.key}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 cursor-pointer",
              "select-none transition-colors duration-100 outline-none",
              "text-fg-tertiary data-[selected]:text-accent data-[pressed]:opacity-60",
              "data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent rounded-md",
            )}
          >
            {({ isSelected }) => (
              <>
                <span className="relative">
                  <Icon
                    as={it.icon}
                    size={22}
                    className={isSelected ? "stroke-[2.2]" : "stroke-[1.8]"}
                  />
                  {it.badgeCount && it.badgeCount > 0 ? (
                    <span
                      className="absolute -top-1 -right-2 min-w-[16px] h-[16px] px-1 rounded-full text-3xs font-bold text-fg-on-accent inline-flex items-center justify-center tabular-nums"
                      style={{ background: "var(--color-danger)" }}
                    >
                      {it.badgeCount > 99 ? "99+" : it.badgeCount}
                    </span>
                  ) : null}
                </span>
                <span className="text-3xs leading-none font-medium">{it.label}</span>
              </>
            )}
          </Tab>
        )}
      </TabList>
    </Tabs>
  );
}
