import type { StoryFn } from "@storybook/react-vite";
import { mockSearchHits } from "../../examples/mocks/search";
import { SearchResultRow } from "./SearchResultRow";

export default { title: "Archive/Rows / Search Result" };

export const Default: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated">
    {mockSearchHits.map((h, i, arr) => (
      <SearchResultRow key={h.id} hit={h} separator={i < arr.length - 1} />
    ))}
  </div>
);

export const Highlighted: StoryFn = () => (
  <div className="max-w-md mx-auto bg-bg-elevated">
    {mockSearchHits.map((h, i, arr) => (
      <SearchResultRow
        key={h.id}
        hit={h}
        query="sarah"
        separator={i < arr.length - 1}
      />
    ))}
  </div>
);
