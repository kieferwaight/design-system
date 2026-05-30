import type { StoryFn } from "@storybook/react-vite";
import { Chip } from "./Chip";

export default {
  title: "Archive/Primitives / Chip",
};

export const KindTaxonomy: StoryFn = () => (
  <div className="flex flex-wrap gap-2 p-6">
    <Chip kind="conversation" />
    <Chip kind="email" />
    <Chip kind="imessage" />
    <Chip kind="contact" />
    <Chip kind="agent" />
    <Chip kind="search" />
  </div>
);

export const Variants: StoryFn = () => (
  <div className="flex flex-col gap-3 p-6">
    <div className="flex gap-2">
      <Chip kind="conversation" variant="kind" />
      <Chip kind="conversation" variant="outline" />
      <Chip kind="conversation" variant="solid" />
      <Chip kind="conversation" variant="muted">
        Muted
      </Chip>
    </div>
    <div className="flex gap-2">
      <Chip kind="imessage" variant="kind" />
      <Chip kind="imessage" variant="outline" />
      <Chip kind="imessage" variant="solid" />
    </div>
  </div>
);

export const Sizes: StoryFn = () => (
  <div className="flex items-center gap-2 p-6">
    <Chip kind="email" size="xs" />
    <Chip kind="email" size="sm" />
    <Chip kind="email" size="md" />
  </div>
);

export const WithCounts: StoryFn = () => (
  <div className="flex flex-wrap gap-2 p-6">
    <Chip kind="conversation" count={42} />
    <Chip kind="email" count={1284} />
    <Chip kind="imessage" count={18922} />
    <Chip kind="contact" count={2841} />
    <Chip kind="agent" count={1247000} />
  </div>
);

export const ProviderTags: StoryFn = () => (
  <div className="flex flex-wrap gap-2 p-6">
    <Chip color="#10a37f" variant="tinted">
      ChatGPT
    </Chip>
    <Chip color="#cc785c" variant="tinted">
      Claude
    </Chip>
    <Chip color="#4285f4" variant="tinted">
      Gemini
    </Chip>
    <Chip color="#0078d4" variant="tinted">
      Copilot
    </Chip>
  </div>
);
