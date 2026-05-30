import type { Meta, StoryObj } from "@storybook/react-vite";
import { Specimen, SpecimenRamp } from "@/primitives";
import { TEXT_STYLES } from "./typography";

/**
 * Text Styles — the iOS Human Interface Guidelines type ramp, the semantic
 * roles every other surface composes from. Each style binds a size token to
 * Apple's default weight and leading. Sizes are rem-based so they still respond
 * to the user's text-size setting (Dynamic Type).
 */
const meta: Meta = {
  title: "Foundations/Typography/Text Styles",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

/** The full ramp, each style labelled with its own name. */
export const Ramp: Story = {
  render: () => <SpecimenRamp styles={TEXT_STYLES} />,
};

/** The same ramp set against one sentence, so size/weight differences read directly. */
export const SameSentence: Story = {
  render: () => <SpecimenRamp styles={TEXT_STYLES} sample="The quick brown fox" />,
};

/** Each style in its *emphasized* weight — titles go Bold, body/headline go Semibold. */
export const Emphasized: Story = {
  render: () => <SpecimenRamp styles={TEXT_STYLES} emphasized sample="The quick brown fox" />,
};

/** A single style in isolation — the anchor of the ramp, Body (17pt Regular). */
export const Body: Story = {
  render: () => (
    <div className="p-6 max-w-3xl">
      <Specimen
        style={TEXT_STYLES.find((s) => s.name === "Body")!}
        sample="Body is the default reading size — 17pt on iOS."
      />
    </div>
  ),
};
