import type { Meta, StoryObj } from "@storybook/react-vite";
import { GLYPH_SIZE_PX, glyphRadius } from "@/generated";
import { Avatar, type AvatarSize } from "./Avatar";

/**
 * Avatar — an identity glyph on the SAME base as **Components/Swatch**: a
 * **Components/Shape** as a `circle` (people) or rounded `square` at a size from
 * the shared glyph scale (xs 16 · sm 24 · md 36 · lg 54 · xl 80). Square corners
 * pair to the box size via `glyphRadius` (xs→4px … xl→14px), exactly like a
 * square Swatch. Fills the Shape with an image, or initials over a color hashed
 * from the name.
 */
const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["experimental"],
  args: { name: "Ada Lovelace", shape: "circle", size: "lg" },
  argTypes: {
    shape: { control: "inline-radio", options: ["circle", "square"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

const SIZES: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];
const NAMES = ["Ada Lovelace", "Grace Hopper", "Alan Turing", "Katherine Johnson", "Linus T"];

/** Both shapes across the shared glyph size scale — same boxes as the Swatch. */
export const Avatars: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-2">
        <h3 className="m-0 text-sm font-semibold text-fg">Circle · sizes</h3>
        <div className="flex items-end gap-6">
          {SIZES.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <Avatar name={NAMES[i]} shape="circle" size={s} />
              <span className="text-2xs font-mono text-fg-tertiary tabular-nums">
                {s} · {GLYPH_SIZE_PX[s]}px
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <h3 className="m-0 text-sm font-semibold text-fg">
          Square · sizes (radius paired to size)
        </h3>
        <div className="flex items-end gap-6">
          {SIZES.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <Avatar name={NAMES[i]} shape="square" size={s} />
              <span className="text-2xs font-mono text-fg-tertiary tabular-nums">
                {s} · r{glyphRadius(GLYPH_SIZE_PX[s])}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <h3 className="m-0 text-sm font-semibold text-fg">Image source</h3>
        <div className="flex items-end gap-6">
          <Avatar name="Photo" size="lg" src="https://i.pravatar.cc/160?img=12" />
          <Avatar name="Photo" size="lg" shape="square" src="https://i.pravatar.cc/160?img=5" />
        </div>
      </section>
    </div>
  ),
};

/** Interactive playground — tweak name, shape, and size via Controls. */
export const Playground: Story = {};
