import type { Meta, StoryObj } from "@storybook/react-vite";
import { glyphRadius } from "@/generated";
import { sizeVar, TEXT_STYLES } from "./typography";

/**
 * Size — the raw size ramp behind the text styles, viewed as bars (the
 * type-equivalent of the Spacing scale). All values are `rem`, so they track
 * the user's Dynamic Type setting rather than locking to pixels.
 */
const meta: Meta = {
  title: "Foundations/Typography/Size",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

/** Each size token in one row: token name · glyph at that size · a box sized to it · the pt value. */
export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-2 p-6">
      {TEXT_STYLES.map((s) => (
        <div key={s.sizeToken} className="flex items-center gap-4">
          <span className="w-32 shrink-0 text-xs font-mono text-fg-secondary">
            --text-{s.sizeToken}
          </span>
          <span
            className="w-16 shrink-0 text-fg leading-none"
            style={{ fontSize: sizeVar(s.sizeToken) }}
          >
            Aa
          </span>
          <div
            className="shrink-0 bg-accent"
            style={{
              width: sizeVar(s.sizeToken),
              height: sizeVar(s.sizeToken),
              borderRadius: glyphRadius(s.size),
            }}
          />
          <span className="text-2xs text-fg-tertiary tabular-nums">{s.size}pt</span>
        </div>
      ))}
    </div>
  ),
};
