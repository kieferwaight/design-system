import type { Meta, StoryObj } from "@storybook/react-vite";
import { spacing } from "./spacing";

/**
 * Spacing — the source-defined modular scale (`--space-*`). Padding and margin are
 * just spacing applied to an edge, so they share this scale.
 */
const meta: Meta = {
  title: "Foundations/Spacing",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

const steps = Object.entries(spacing).filter(([token]) => token !== "space-0");

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-6">
      {steps.map(([token, value]) => (
        <div key={token} className="flex items-center gap-3">
          <span className="w-24 text-xs font-mono text-fg-secondary shrink-0">{token}</span>
          <div className="h-4 rounded bg-accent" style={{ width: `var(--${token})` }} />
          <span className="text-2xs text-fg-tertiary tabular-nums">{value}</span>
        </div>
      ))}
    </div>
  ),
};
