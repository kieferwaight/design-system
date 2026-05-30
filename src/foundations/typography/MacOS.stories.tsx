import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  MACOS_STYLES,
  type MacTextStyle,
  trackingFor,
  WEIGHT_VALUE,
  weightLabel,
} from "./typography";

/**
 * macOS Text Styles — the built-in ramp for the desktop platform. Denser than
 * iOS (Large Title is 26pt vs 34pt) and with its own default/emphasized weights
 * — notably **Headline is Bold** here (Heavy when emphasized), where on iOS it's
 * Semibold. Use these when the kit is hosted on macOS (Electron) rather than iOS.
 */
const meta: Meta = {
  title: "Foundations/Typography/macOS",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

function MacSpecimen({ style, emphasized = false }: { style: MacTextStyle; emphasized?: boolean }) {
  const weight = emphasized ? style.emphasized : style.weight;
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-separator py-2">
      <span
        className="text-fg min-w-0 truncate"
        style={{
          fontSize: style.size,
          lineHeight: `${style.leading}px`,
          fontWeight: WEIGHT_VALUE[weight],
          letterSpacing: trackingFor(style.size),
        }}
      >
        {style.name}
      </span>
      <span className="flex shrink-0 flex-col items-end leading-tight text-right">
        <span className="text-xs font-mono text-fg-secondary">--text-{style.sizeToken}</span>
        <span className="text-2xs text-fg-tertiary tabular-nums">
          {style.size}pt · {weightLabel(style.weight)}
          {style.emphasized !== style.weight ? ` → ${weightLabel(style.emphasized)}` : ""} ·{" "}
          {style.leading}pt
        </span>
      </span>
    </div>
  );
}

/** The macOS ramp at its default weights. */
export const Ramp: Story = {
  render: () => (
    <div className="flex flex-col p-6 max-w-3xl">
      {MACOS_STYLES.map((s) => (
        <MacSpecimen key={s.sizeToken} style={s} />
      ))}
    </div>
  ),
};

/** The same ramp in its emphasized weights (Headline → Heavy). */
export const Emphasized: Story = {
  render: () => (
    <div className="flex flex-col p-6 max-w-3xl">
      {MACOS_STYLES.map((s) => (
        <MacSpecimen key={s.sizeToken} style={s} emphasized />
      ))}
    </div>
  ),
};
