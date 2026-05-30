import type { StoryFn } from "@storybook/react-vite";
import { ArrowRightIcon, FlagIcon, PinIcon, SearchIcon, TrashIcon } from "lucide-react";
import { Button } from "./Button";

export default {
  title: "Archive/Primitives / Button",
};

export const Variants: StoryFn = () => (
  <div className="flex flex-col items-start gap-3 p-6">
    <Button variant="primary">Primary action</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="destructive" leadingIcon={<TrashIcon size={14} />}>
      Delete
    </Button>
  </div>
);

export const Sizes: StoryFn = () => (
  <div className="flex flex-col items-start gap-3 p-6">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const WithIcons: StoryFn = () => (
  <div className="flex flex-col items-start gap-3 p-6">
    <Button leadingIcon={<SearchIcon size={14} />}>Search archive</Button>
    <Button variant="secondary" leadingIcon={<PinIcon size={14} />}>
      Pin conversation
    </Button>
    <Button variant="tertiary" trailingIcon={<ArrowRightIcon size={14} />}>
      View thread
    </Button>
    <Button variant="ghost" leadingIcon={<FlagIcon size={14} />}>
      Flag
    </Button>
  </div>
);

export const States: StoryFn = () => (
  <div className="flex flex-col items-start gap-3 p-6">
    <Button>Default</Button>
    <Button isDisabled>Disabled</Button>
    <Button loading>Loading</Button>
    <Button fullWidth>Full width</Button>
  </div>
);
