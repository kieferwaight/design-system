import type { Meta, StoryObj } from "@storybook/react-vite";
import { iconSize } from "@/foundations/icon";
import { Icon } from "./Icon";

/**
 * Icon Primitive — wraps native Apple SVG vector assets (SF Symbols) and Lucide React icons,
 * standardizing stroke weights, size scales, and dynamic color cascading.
 */
const meta: Meta<typeof Icon> = {
  title: "Primitives/Icon",
  component: Icon,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Icon>;

/** The t-shirt size scale matching standard visual atoms. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6 p-6">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon name="gearshape.fill" size={size} color="var(--color-fg)" />
          <span className="text-2xs font-mono text-fg-tertiary">
            {size} ({iconSize[size]})
          </span>
        </div>
      ))}
    </div>
  ),
};

/** Leveraging CSS currentColor cascading to dynamically theme icons. */
export const Colors: Story = {
  render: () => (
    <div className="flex gap-6 p-6">
      <div className="flex flex-col items-center gap-2 text-[var(--color-accent)]">
        <Icon name="apple.logo" size="md" />
        <span className="text-2xs font-mono text-fg-tertiary">Accent</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-[var(--sys-green)]">
        <Icon name="checkmark.shield.fill" size="md" />
        <span className="text-2xs font-mono text-fg-tertiary">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-[var(--sys-yellow)]">
        <Icon name="exclamationmark.triangle.fill" size="md" />
        <span className="text-2xs font-mono text-fg-tertiary">Warning</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-[var(--sys-red)]">
        <Icon name="trash" size="md" />
        <span className="text-2xs font-mono text-fg-tertiary">Destructive</span>
      </div>
    </div>
  ),
};

/** A curated gallery of beautiful, high-fidelity native Apple SVG assets. */
export const AssetGallery: Story = {
  render: () => {
    const icons = [
      "apple.logo",
      "cpu.fill",
      "paperplane.fill",
      "gearshape.fill",
      "calendar",
      "lock.fill",
      "wifi",
      "camera.fill",
      "building.2.fill",
      "chart.pie.fill",
      "applescript.fill",
      "bell.fill",
    ];
    return (
      <div className="p-6">
        <div className="grid grid-cols-4 gap-6 rounded-2xl border border-separator bg-bg-elevated p-6 max-w-xl">
          {icons.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center gap-3 rounded-xl bg-bg-sunken p-4"
            >
              <Icon name={name} size="lg" color="var(--color-fg)" />
              <code className="text-[10px] font-mono text-fg-tertiary text-center truncate w-full">
                {name}
              </code>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
