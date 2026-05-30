import type { Meta, StoryObj } from "@storybook/react-vite";
import { GLYPH_SIZE_PX, glyphRadius } from "@/generated";
import { Swatch, type SwatchSize } from "./Swatch";

/**
 * Swatch — the base color atom, built on **Components/Shape**: a square or a
 * circle at a size from the shared glyph scale (xs 16 · sm 24 · md 36 · lg 54 ·
 * xl 80). Square swatches use the **glyph** corner radius paired to their size,
 * so they read as rounded squares at every size (xs→4px … xl→14px). The same
 * Shape backs **Components/Avatar**. No labels — compose with **Layouts/Labeled
 * Swatch** for captions.
 */
const meta: Meta<typeof Swatch> = {
  title: "Components/Swatch",
  component: Swatch,
  tags: ["experimental"],
  args: { value: "var(--sys-blue)", shape: "square", size: "lg" },
  argTypes: {
    shape: { control: "inline-radio", options: ["square", "circle"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] },
  },
};
export default meta;

type Story = StoryObj<typeof Swatch>;

const SIZES: SwatchSize[] = ["xs", "sm", "md", "lg", "xl"];

/** Both shapes across the size scale. Squares self-round via the glyph radius. */
export const Swatches: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-2">
        <h3 className="m-0 text-sm font-semibold text-fg">
          Square · sizes (radius paired to size)
        </h3>
        <div className="flex items-end gap-6">
          {SIZES.map((s) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <Swatch value="var(--sys-blue)" shape="square" size={s} />
              <span className="text-2xs font-mono text-fg-tertiary tabular-nums">
                {s} · {GLYPH_SIZE_PX[s]}px · r{glyphRadius(GLYPH_SIZE_PX[s])}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <h3 className="m-0 text-sm font-semibold text-fg">Circle · sizes</h3>
        <div className="flex items-end gap-6">
          {SIZES.map((s) => (
            <Swatch key={s} value="var(--sys-pink)" shape="circle" size={s} />
          ))}
        </div>
      </section>
    </div>
  ),
};

/** Interactive playground — tweak shape and size via Controls. */
export const Playground: Story = {};
