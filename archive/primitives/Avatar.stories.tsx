import type { StoryFn } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

export default {
  title: "Archive/Primitives / Avatar",
};

export const Sizes: StoryFn = () => (
  <div className="flex items-end gap-3 p-6">
    <Avatar name="Sarah Chen" size="xs" />
    <Avatar name="Sarah Chen" size="sm" />
    <Avatar name="Sarah Chen" size="md" />
    <Avatar name="Sarah Chen" size="lg" />
    <Avatar name="Sarah Chen" size="xl" />
  </div>
);

export const InitialsHashing: StoryFn = () => (
  <div className="grid grid-cols-4 gap-3 p-6">
    {[
      "Sarah Chen",
      "Mike Patel",
      "Alex Waight",
      "Lior Goldberg",
      "Jay Kim",
      "Max Volkov",
      "Kim Park",
      "Dana Lee",
    ].map((n) => (
      <div key={n} className="flex items-center gap-2">
        <Avatar name={n} size="md" />
        <span className="text-sm text-fg-secondary">{n}</span>
      </div>
    ))}
  </div>
);

export const Square: StoryFn = () => (
  <div className="flex items-end gap-3 p-6">
    <Avatar name="ChatGPT" size="md" square bg="#10a37f" />
    <Avatar name="Claude" size="md" square bg="#cc785c" />
    <Avatar name="Gemini" size="md" square bg="#4285f4" />
    <Avatar name="Copilot" size="md" square bg="#0078d4" />
  </div>
);

export const Empty: StoryFn = () => (
  <div className="flex items-center gap-3 p-6">
    <Avatar />
    <Avatar name="" />
    <Avatar name="!@#$%" />
  </div>
);
