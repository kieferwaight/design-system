import type { Meta, StoryObj } from "@storybook/react-vite";
import { applePrimitives, colorValue, semanticRoles } from "@/foundations/color";
import { GLYPH_SIZE_PX } from "@/generated";
import { LabeledSwatch, RgbLabel } from "./LabeledSwatch";
import { Swatch } from "./Swatch";

/**
 * Labeled Swatch — the composition that captions a base **Swatch**. `right`
 * placement pairs a swatch with an RGB detail; `below` placement centers a short
 * caption (size, name, or hex) under it.
 */
const meta: Meta = {
  title: "Layouts/Labeled Swatch",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

const labelFor = (slug: string) => slug.replace(/^./, (initial) => initial.toUpperCase());
const systemColorVar = (slug: string) => `var(--sys-${slug})`;
const RGB_DETAIL_COLOR_NAMES = ["red", "blue", "green"] as const;
const RGB = RGB_DETAIL_COLOR_NAMES.map((name) => {
  const value = applePrimitives.systemColors[name].default.dark;
  return { name: labelFor(name), value, ...colorValue(value).rgba };
});
const HEX_CAPTION = colorValue(applePrimitives.systemColors.orange.default.dark).hex;

/** `right` placement — a large swatch beside its R/G/B detail. */
export const RgbDetail: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-10 p-6">
      {RGB.map((c) => (
        <LabeledSwatch key={c.name} placement="right" swatch={<Swatch value={c.value} size="xl" />}>
          <RgbLabel r={c.r} g={c.g} b={c.b} />
        </LabeledSwatch>
      ))}
    </div>
  ),
};

/** `below` placement — the three sanctioned short captions: size, name, hex. */
export const CaptionBelow: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-10 p-6">
      <LabeledSwatch swatch={<Swatch value={systemColorVar("teal")} size="lg" />}>
        <span className="text-2xs font-mono text-fg-tertiary">lg · {GLYPH_SIZE_PX.lg}px</span>
      </LabeledSwatch>
      <LabeledSwatch swatch={<Swatch value={systemColorVar("indigo")} size="lg" />}>
        <span className="text-sm font-medium text-fg">{labelFor("indigo")}</span>
      </LabeledSwatch>
      <LabeledSwatch swatch={<Swatch value={HEX_CAPTION} size="lg" />}>
        <span className="text-xs font-mono text-fg-secondary">{HEX_CAPTION}</span>
      </LabeledSwatch>
    </div>
  ),
};

/** A gallery — a wrapped grid of `below`-captioned swatches (name). */
export const Gallery: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-6">
      {Object.keys(applePrimitives.systemColors).map((name) => (
        <LabeledSwatch key={name} swatch={<Swatch value={systemColorVar(name)} size="lg" />}>
          <span className="text-xs font-medium text-fg">{labelFor(name)}</span>
        </LabeledSwatch>
      ))}
    </div>
  ),
};

/** Semantic role tokens, captioned with their role name. */
export const SemanticRoles: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-6">
      {semanticRoles.map(({ tokenName }) => (
        <LabeledSwatch key={tokenName} swatch={<Swatch value={`var(${tokenName})`} size="md" />}>
          <span className="text-xs font-medium text-fg">{tokenName}</span>
        </LabeledSwatch>
      ))}
    </div>
  ),
};
