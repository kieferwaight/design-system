import type { Meta, StoryObj } from "@storybook/react-vite";
import { LabeledSwatch } from "@/components/data/swatch/LabeledSwatch";
import { Swatch } from "@/components/data/swatch/Swatch";
import type { AnsiPalette, Palette } from "../color.types";
import { catppuccin } from "./index";

const meta: Meta = {
  title: "Foundations/Color/Collections/Catppuccin",
  tags: ["external"],
};
export default meta;

type Story = StoryObj;

const flavors = catppuccin.palettes.filter((p): p is Palette => p.type === "generic");
const ansis = catppuccin.palettes.filter((p): p is AnsiPalette => p.type === "ansi");

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

/** All four Catppuccin flavors, normalized to our Palette/ColorToken model. */
export const Flavors: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {flavors.map((p) => (
        <Gallery key={p.id} palette={p} />
      ))}
      <p className="text-2xs text-fg-tertiary">
        Source: {catppuccin.source?.pkg}@{catppuccin.source?.version} · {catppuccin.source?.license}
      </p>
    </div>
  ),
};

/** ANSI terminal mapping (8 colors × normal/bright) — exercises the AnsiPalette type. */
export const Ansi: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      {ansis.map((p) => (
        <section key={p.id} className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-fg m-0">{p.name}</h3>
          {(["normal", "bright"] as const).map((variant) => (
            <div key={variant} className="flex items-center gap-3">
              <span className="w-12 text-2xs text-fg-tertiary font-mono">{variant}</span>
              <div className="flex gap-2">
                {Object.values(p.ansi).map((pair) => (
                  <Swatch key={pair[variant].id} shape="square" size="md" token={pair[variant]} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
};
