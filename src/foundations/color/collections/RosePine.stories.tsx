import type { Meta, StoryObj } from "@storybook/react-vite";
import { LabeledSwatch } from "@/components/data/swatch/LabeledSwatch";
import { Swatch } from "@/components/data/swatch/Swatch";
import type { Palette } from "../color.types";
import { rosePine } from "./index";

const meta: Meta = {
  title: "Foundations/Color/Collections/Rosé Pine",
  tags: ["external"],
};
export default meta;

type Story = StoryObj;

function Gallery({ palette }: { palette: Palette }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-fg m-0">
        {palette.name} <span className="text-fg-tertiary font-normal">· {palette.appearance}</span>
      </h3>
      <div className="flex flex-wrap gap-5">
        {palette.tokens.map((t) => (
          <LabeledSwatch key={t.id} swatch={<Swatch token={t} size="lg" />}>
            <span className="text-xs font-medium text-fg">{t.name}</span>
            <span className="text-2xs font-mono text-fg-tertiary">{t.hex ?? t.value}</span>
          </LabeledSwatch>
        ))}
      </div>
    </section>
  );
}

/** The three Rosé Pine variants (hex re-prefixed with `#` during normalization). */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {rosePine.palettes.map((p) => (
        <Gallery key={p.id} palette={p as Palette} />
      ))}
      <p className="text-2xs text-fg-tertiary">
        Source: {rosePine.source?.pkg} · {rosePine.source?.license}
      </p>
    </div>
  ),
};
