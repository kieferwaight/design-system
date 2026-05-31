import type { Meta, StoryObj } from "@storybook/react-vite";
import { type CSSProperties, type ReactElement, useState } from "react";
import { expect, fireEvent } from "storybook/test";
import {
  accentColor,
  AccessibilityDemo,
  AccentChromaCurve,
  AccentHueDrift,
  AccentInUse,
  AccentRamp,
  AccentSwatches,
  ChromaVariants,
  DataVizRamps,
  ElevatedSurfaces,
  BenefitCards,
  FutureSystems,
  GrayGradient,
  HueDriftCompare,
  HueFamilies,
  LayerDiagram,
  LightnessStack,
  MaterialsDemo,
  MockApp,
  MiniApp,
  NeutralChromaCurve,
  NeutralRamp,
  NeutralSwatches,
  SeedControls,
  SurfaceHierarchy,
  SystemAccents,
  ThemeGeneration,
  TypographyHierarchy,
  neutralColor,
  SEEDS,
  SwatchStrip,
} from "./color-demos";
import { oklchGenerativeScales } from "./color";

/**
 * Interactive companions to the **Foundations / Color / Overview** doc.
 *
 * `Playground` is the live version of the seed engine: drag the three seeds and
 * watch the neutral ramp, accent ramp, and a sample UI regenerate together —
 * the whole point of a generative color system.
 */
const meta: Meta = {
  title: "Foundations/Color/Systems",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

const demo = (render: () => ReactElement): Story => ({ render });

const slider: CSSProperties = { width: 220, accentColor: "var(--color-accent)" };
const field: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  fontSize: 13,
  color: "var(--color-fg)",
};

/** Drag the seeds — every derived ramp and the sample app regenerate live. */
export const Playground: Story = {
  render: () => {
    function Demo() {
      const [neutralH, setNeutralH] = useState(SEEDS.neutralH);
      const [accentH, setAccentH] = useState(SEEDS.accentH);
      const [accentC, setAccentC] = useState(SEEDS.accentC);
      return (
        <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24, maxWidth: 720 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 28 }}>
            <label style={field}>
              <span>
                Neutral hue · <strong>{neutralH}°</strong>
              </span>
              <input
                aria-label="Neutral hue"
                type="range"
                min={0}
                max={360}
                value={neutralH}
                style={slider}
                onChange={(e) => setNeutralH(Number(e.target.value))}
              />
            </label>
            <label style={field}>
              <span>
                Accent hue · <strong>{accentH}°</strong>
              </span>
              <input
                aria-label="Accent hue"
                type="range"
                min={0}
                max={360}
                value={accentH}
                style={slider}
                onChange={(e) => setAccentH(Number(e.target.value))}
              />
            </label>
            <label style={field}>
              <span>
                Accent chroma · <strong>{accentC.toFixed(2)}</strong>
              </span>
              <input
                aria-label="Accent chroma"
                type="range"
                min={0}
                max={0.32}
                step={0.01}
                value={accentC}
                style={slider}
                onChange={(e) => setAccentC(Number(e.target.value))}
              />
            </label>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: 12, color: "var(--color-fg-secondary)" }}>Neutral scale</span>
            <SwatchStrip colors={oklchGenerativeScales.neutral.map((r) => neutralColor(r, neutralH))} />
            <span style={{ fontSize: 12, color: "var(--color-fg-secondary)" }}>Accent scale</span>
            <SwatchStrip
              colors={oklchGenerativeScales.accent.map((r) => accentColor(r, accentH, accentC))}
            />
          </div>

          <div style={{ maxWidth: 280 }}>
            <MiniApp hue={accentH} name="Generated app" />
          </div>
        </div>
      );
    }
    return <Demo />;
  },
  play: async ({ canvas }) => {
    const hue = canvas.getByLabelText("Accent hue");
    await expect(hue).toHaveValue(String(SEEDS.accentH));
    // Drive the slider and confirm the live readout regenerates with it.
    fireEvent.change(hue, { target: { value: "150" } });
    await expect(hue).toHaveValue("150");
    await expect(canvas.getByText("150°")).toBeInTheDocument();
  },
};

export const DemoLayerDiagram: Story = demo(() => <LayerDiagram />);
export const DemoGrayGradient: Story = demo(() => <GrayGradient />);
export const DemoElevatedSurfaces: Story = demo(() => <ElevatedSurfaces />);
export const DemoSystemAccents: Story = demo(() => <SystemAccents />);
export const DemoAccentInUse: Story = demo(() => <AccentInUse />);
export const DemoMaterials: Story = demo(() => <MaterialsDemo />);
export const DemoAccessibility: Story = demo(() => <AccessibilityDemo />);
export const DemoNeutralRamp: Story = demo(() => <NeutralRamp />);
export const DemoAccentRamp: Story = demo(() => <AccentRamp />);
export const DemoSeedControls: Story = demo(() => <SeedControls />);
export const DemoLightnessStack: Story = demo(() => <LightnessStack />);
export const DemoMockApp: Story = demo(() => <MockApp />);
export const DemoChromaVariants: Story = demo(() => <ChromaVariants />);
export const DemoHueFamilies: Story = demo(() => <HueFamilies />);
export const DemoNeutralSwatches: Story = demo(() => <NeutralSwatches />);
export const DemoSurfaceHierarchy: Story = demo(() => <SurfaceHierarchy />);
export const DemoTypographyHierarchy: Story = demo(() => <TypographyHierarchy />);
export const DemoNeutralChromaCurve: Story = demo(() => <NeutralChromaCurve />);
export const DemoHueDriftCompare: Story = demo(() => <HueDriftCompare />);
export const DemoAccentSwatches: Story = demo(() => <AccentSwatches />);
export const DemoAccentChromaCurve: Story = demo(() => <AccentChromaCurve />);
export const DemoAccentHueDrift: Story = demo(() => <AccentHueDrift />);
export const DemoThemeGeneration: Story = demo(() => <ThemeGeneration />);
export const DemoDataVizRamps: Story = demo(() => <DataVizRamps />);
export const DemoFutureSystems: Story = demo(() => <FutureSystems />);

/** One scale logic, six hue families — the seed is the only thing that changes. */
export const Families: Story = {
  render: () => (
    <div style={{ padding: 32, maxWidth: 640 }}>
      <HueFamilies />
    </div>
  ),
};

/** The same layout at muted, balanced, and vibrant chroma. */
export const Personality: Story = {
  render: () => (
    <div style={{ padding: 32, maxWidth: 640 }}>
      <ChromaVariants />
    </div>
  ),
};

/** Identical UI regenerated from three accent seeds. */
export const Themes: Story = {
  render: () => (
    <div style={{ padding: 32, maxWidth: 720 }}>
      <ThemeGeneration />
    </div>
  ),
};

/** Apple's translucency materials over a colourful field. */
export const Materials: Story = {
  render: () => (
    <div style={{ padding: 32, maxWidth: 560 }}>
      <MaterialsDemo />
    </div>
  ),
};

/** Benefits of the generative color system. */
export const ArchitecturalBenefits: Story = demo(() => <BenefitCards />);