import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DEFAULT_DYNAMIC_SIZE,
  DYNAMIC_TYPE,
  DYNAMIC_TYPE_SIZES,
  TEXT_STYLES,
  trackingFor,
  WEIGHT_VALUE,
} from "./typography";

/**
 * Dynamic Type — the iOS/iPadOS accessibility scale. Every text style resizes
 * across seven content-size categories (the user's text-size setting); weight
 * stays constant, only size and leading change. **Large** is the default — the
 * column the `--text-*` tokens encode.
 */
const meta: Meta = {
  title: "Foundations/Typography/Dynamic Type",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

const DEFAULT_INDEX = DYNAMIC_TYPE_SIZES.indexOf(DEFAULT_DYNAMIC_SIZE);

/** The full matrix: every style (rows) × every content-size category (columns). */
export const Scale: Story = {
  render: () => (
    <div className="overflow-x-auto p-6">
      <table className="border-collapse text-left">
        <thead>
          <tr>
            <th className="px-3 py-2 text-2xs font-semibold uppercase tracking-wide text-fg-tertiary">
              Style
            </th>
            {DYNAMIC_TYPE_SIZES.map((cat, i) => (
              <th
                key={cat}
                className="px-3 py-2 text-center text-2xs font-semibold uppercase tracking-wide"
                style={{
                  color: i === DEFAULT_INDEX ? "var(--color-accent)" : "var(--color-fg-tertiary)",
                }}
              >
                {cat}
                {i === DEFAULT_INDEX ? " ★" : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TEXT_STYLES.map((s) => (
            <tr key={s.sizeToken} className="border-t border-separator">
              <td className="px-3 py-1.5">
                <span className="text-sm text-fg">{s.name}</span>{" "}
                <code className="text-3xs font-mono text-fg-tertiary">--text-{s.sizeToken}</code>
              </td>
              {DYNAMIC_TYPE[s.sizeToken].map(([size, leading], i) => (
                <td
                  key={DYNAMIC_TYPE_SIZES[i]}
                  className="px-3 py-1.5 text-center tabular-nums"
                  style={{
                    background: i === DEFAULT_INDEX ? "var(--color-accent-subtle)" : undefined,
                  }}
                >
                  <span className="text-xs text-fg">{size}</span>
                  <span className="text-3xs text-fg-tertiary">/{leading}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 max-w-prose text-2xs text-fg-tertiary">
        Cells are <span className="font-mono">size/leading</span> in points. ★{" "}
        <strong>Large</strong> is the default category — the one the live{" "}
        <code className="font-mono">--text-*</code> tokens match. Weight doesn't change with Dynamic
        Type; only size and leading do.
      </p>
    </div>
  ),
};

/** Body rendered at every category, so the scaling is visible, not just tabular. */
export const BodyScaling: Story = {
  render: () => {
    const body = TEXT_STYLES.find((s) => s.name === "Body")!;
    return (
      <div className="flex flex-col gap-1 p-6 max-w-3xl">
        {DYNAMIC_TYPE_SIZES.map((cat, i) => {
          const [size, leading] = DYNAMIC_TYPE.body[i];
          return (
            <div
              key={cat}
              className="flex items-baseline justify-between gap-6 border-b border-separator py-2"
            >
              <span
                className="text-fg"
                style={{
                  fontSize: size,
                  lineHeight: `${leading}px`,
                  fontWeight: WEIGHT_VALUE[body.weight],
                  letterSpacing: trackingFor(size),
                }}
              >
                The quick brown fox
              </span>
              <span className="flex shrink-0 flex-col items-end leading-tight text-right">
                <span
                  className="text-xs font-mono"
                  style={{
                    color:
                      cat === DEFAULT_DYNAMIC_SIZE
                        ? "var(--color-accent)"
                        : "var(--color-fg-secondary)",
                  }}
                >
                  {cat}
                  {cat === DEFAULT_DYNAMIC_SIZE ? " ★" : ""}
                </span>
                <span className="text-2xs text-fg-tertiary tabular-nums">
                  {size}pt / {leading}pt
                </span>
              </span>
            </div>
          );
        })}
      </div>
    );
  },
};
