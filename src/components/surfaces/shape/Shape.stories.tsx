import type { Meta, StoryObj } from "@storybook/react-vite";
import { GLYPH_SIZE_PX, glyphRadius } from "@/generated";
import { Shape, type ShapeSize } from "./Shape";

/**
 * Shape — the base glyph atom that **Components/Swatch** and **Components/Avatar**
 * are built on: a sized `square` (rounded via `glyphRadius`) or `circle`, on the
 * shared glyph size scale (xs 16 · sm 24 · md 36 · lg 54 · xl 80). It carries
 * only the geometry; Swatch adds a color fill, Avatar adds an image/initials.
 */
const meta: Meta<typeof Shape> = {
  title: "Components/Shapes",
  component: Shape,
  tags: ["experimental"],
  args: { shape: "square", size: "lg", background: "var(--color-fill)" },
  argTypes: {
    shape: { control: "inline-radio", options: ["square", "circle"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] },
  },
};
export default meta;

type Story = StoryObj<typeof Shape>;

const SIZES: ShapeSize[] = ["xs", "sm", "md", "lg", "xl"];

/** Both shapes across the shared glyph size scale. */
export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-2">
        <h3 className="m-0 text-sm font-semibold text-fg">
          Square · sizes (radius paired to size)
        </h3>
        <div className="flex items-end gap-6">
          {SIZES.map((s) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <Shape shape="square" size={s} background="var(--color-fill)" />
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
            <Shape key={s} shape="circle" size={s} background="var(--color-fill)" />
          ))}
        </div>
      </section>
    </div>
  ),
};

/** Interactive playground — tweak shape, size, and fill via Controls. */
export const Playground: Story = {};
