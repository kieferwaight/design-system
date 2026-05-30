import type { StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import { mockNavCounts } from "../../examples/mocks/nav-counts";
import { NavDrawer } from "./NavDrawer";

export default { title: "Archive/Nav / Drawer" };

export const Default: StoryFn = () => {
  const [active, setActive] = useState<string>("all");
  return (
    <div className="max-w-sm mx-auto bg-bg min-h-screen">
      <NavDrawer counts={mockNavCounts} active={active} onSelect={setActive} />
    </div>
  );
};

export const LiveCountsDemo: StoryFn = () => {
  // Simulates how the `nav.counts` WS topic will progressively bump totals
  // (e.g. while an importer is running on the server).
  const [counts, setCounts] = useState(mockNavCounts);
  return (
    <div className="max-w-sm mx-auto bg-bg min-h-screen">
      <div className="flex gap-2 p-3 border-b border-separator">
        <button
          type="button"
          className="text-xs px-3 py-1.5 rounded-md bg-accent text-fg-on-accent"
          onClick={() =>
            setCounts((c) => ({
              ...c,
              favorites: { ...c.favorites, all: c.favorites.all + 1 },
              ai_models: c.ai_models.map((m, i) =>
                i === 0 ? { ...m, count: m.count + 1 } : m,
              ),
            }))
          }
        >
          +1 ChatGPT
        </button>
        <button
          type="button"
          className="text-xs px-3 py-1.5 rounded-md bg-success text-fg-on-accent"
          onClick={() =>
            setCounts((c) => ({
              ...c,
              imessage: { ...c.imessage, unread: c.imessage.unread + 1 },
            }))
          }
        >
          +1 iMessage unread
        </button>
      </div>
      <NavDrawer counts={counts} active="all" />
    </div>
  );
};
