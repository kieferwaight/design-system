import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Numerals & Ligatures — the OpenType features that matter for an archive UI.
 * **Tabular** numerals keep digits the same width so timestamps and counts
 * don't jitter as they update; **proportional** numerals read better in prose.
 * Standard ligatures stay on for running text.
 */
const meta: Meta = {
  title: "Foundations/Typography/Numerals & Ligatures",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

const ROWS = ["10:09", "11:41", "08:30", "12:00", "1,284 items", "99,999"];

/** Proportional vs tabular numerals in a right-aligned column — watch the digits line up. */
export const Numerals: Story = {
  render: () => (
    <div className="flex gap-10 p-6">
      {(
        [
          ["Proportional", "normal"],
          ["Tabular", "tabular-nums"],
        ] as const
      ).map(([label, variant]) => (
        <section key={label} className="flex flex-col gap-1">
          <h3 className="m-0 text-sm font-semibold text-fg">{label}</h3>
          <code className="text-2xs font-mono text-fg-tertiary mb-2">
            font-variant-numeric: {variant === "normal" ? "normal" : "tabular-nums"}
          </code>
          <div
            className="flex flex-col items-end text-fg"
            style={{
              fontSize: 20,
              fontVariantNumeric: variant === "normal" ? "normal" : "tabular-nums",
            }}
          >
            {ROWS.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

/** Standard ligatures (fi, fl, ffi) — on for body text, off for nothing in particular here. */
export const Ligatures: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 max-w-2xl">
      <section className="flex flex-col gap-1">
        <code className="text-2xs font-mono text-fg-tertiary">
          font-variant-ligatures: common-ligatures
        </code>
        <p
          className="m-0 text-fg"
          style={{ fontSize: 34, fontVariantLigatures: "common-ligatures" }}
        >
          efficient flfi waffle
        </p>
      </section>
      <section className="flex flex-col gap-1">
        <code className="text-2xs font-mono text-fg-tertiary">font-variant-ligatures: none</code>
        <p className="m-0 text-fg" style={{ fontSize: 34, fontVariantLigatures: "none" }}>
          efficient flfi waffle
        </p>
      </section>
    </div>
  ),
};
