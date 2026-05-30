import type { StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import { SearchInput } from "./SearchInput";

export default { title: "Archive/Chrome / Search Input" };

export const Default: StoryFn = () => {
  const [q, setQ] = useState("");
  return (
    <div className="p-6 max-w-md mx-auto">
      <SearchInput value={q} onChange={setQ} />
    </div>
  );
};

export const Sizes: StoryFn = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  return (
    <div className="flex flex-col gap-3 p-6 max-w-md mx-auto">
      <SearchInput
        value={a}
        onChange={setA}
        size="sm"
        placeholder="Small"
      />
      <SearchInput
        value={b}
        onChange={setB}
        size="md"
        placeholder="Medium"
      />
      <SearchInput
        value={c}
        onChange={setC}
        size="lg"
        placeholder="Large"
      />
    </div>
  );
};

export const LiveCount: StoryFn = () => {
  // Simulates how it'll feel when the `search.fuzzy` topic streams totals back
  // as the user types — total count narrows in real time.
  const [q, setQ] = useState("sarah");
  const total = q ? Math.max(1, Math.floor(50_000 / (q.length * q.length + 1))) : undefined;
  return (
    <div className="p-6 max-w-md mx-auto">
      <SearchInput
        value={q}
        onChange={setQ}
        liveCount={total}
        placeholder="Live count appears as you type"
      />
    </div>
  );
};
