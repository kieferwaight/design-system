import type { Meta, StoryObj } from "@storybook/react-vite";
import { AVOID_WEIGHTS, WEIGHTS, weightVar } from "./typography";

/**
 * Weight — the four UI weights the system stack exposes reliably.
 * `--weight-regular | medium | semibold | bold`. SF Pro ships nine weights, but
 * Apple recommends only these four for UI; iOS leans on **Semibold** (not Bold)
 * as its everyday emphasis — headlines, button labels, active tabs.
 */
const meta: Meta = {
  title: "Foundations/Typography/Weight",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

/** Each weight at a readable size, with its token, numeric value, and intended use. */
export const Scale: Story = {
  render: () => (
    <div className="flex flex-col p-6 max-w-3xl">
      <h3 className="m-0 mb-1 text-2xs font-semibold uppercase tracking-wide text-fg-tertiary">
        Recommended for UI
      </h3>
      {WEIGHTS.map((w) => (
        <div
          key={w.token}
          className="flex items-baseline justify-between gap-6 py-3 border-b border-separator"
        >
          <span
            className="text-fg"
            style={{ fontSize: 28, fontWeight: weightVar(w.token) as unknown as number }}
          >
            {w.label}
          </span>
          <span className="flex shrink-0 flex-col items-end leading-tight text-right max-w-xs">
            <span className="text-xs font-mono text-fg-secondary">
              --weight-{w.token} · {w.value}
            </span>
            <span className="text-2xs text-fg-tertiary">{w.use}</span>
          </span>
        </div>
      ))}

      <h3 className="m-0 mb-1 mt-6 text-2xs font-semibold uppercase tracking-wide text-fg-tertiary">
        Discouraged for small UI text
      </h3>
      {AVOID_WEIGHTS.map((w) => (
        <div
          key={w.label}
          className="flex items-baseline justify-between gap-6 py-3 border-b border-separator"
        >
          <span className="text-fg-secondary" style={{ fontSize: 28, fontWeight: w.value }}>
            {w.label}
          </span>
          <span className="flex shrink-0 flex-col items-end leading-tight text-right max-w-xs">
            <span className="text-xs font-mono text-fg-tertiary tabular-nums">{w.value}</span>
            <span className="text-2xs text-warning">Avoid — loses legibility at body sizes</span>
          </span>
        </div>
      ))}
    </div>
  ),
};

/** The same word across every weight — recommended, then the discouraged light ones. */
export const SameWord: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-wrap items-baseline gap-8">
        {WEIGHTS.map((w) => (
          <span
            key={w.token}
            className="text-fg"
            style={{ fontSize: 40, fontWeight: weightVar(w.token) as unknown as number }}
          >
            Aa
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-baseline gap-8">
        {AVOID_WEIGHTS.map((w) => (
          <span
            key={w.label}
            className="text-fg-tertiary"
            style={{ fontSize: 40, fontWeight: w.value }}
          >
            Aa
          </span>
        ))}
      </div>
    </div>
  ),
};
