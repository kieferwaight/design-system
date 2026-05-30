import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Variations — the non-size/weight axes the type tokens carry: leading
 * (`--leading-*`), tracking (`--tracking-*`), and the style variants the
 * system font supports (italic, small-caps). Apple optically tightens tracking
 * on larger sizes; our titles pull `--tracking-tight` to match.
 */
const meta: Meta = {
  title: "Foundations/Typography/Variations",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

const SAMPLE = "The quick brown fox jumps over the lazy dog";

function Row({
  token,
  label,
  children,
}: {
  token: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 py-3 border-b border-separator">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-2xs uppercase tracking-wide text-fg-tertiary">{label}</span>
        <code className="text-xs font-mono text-fg-secondary">{token}</code>
      </div>
      {children}
    </div>
  );
}

/** The three leading (line-height) steps on a wrapped paragraph. */
export const Leading: Story = {
  render: () => (
    <div className="flex flex-col p-6 max-w-2xl">
      {(["tight", "snug", "normal"] as const).map((step) => (
        <Row key={step} token={`--leading-${step}`} label={`Leading ${step}`}>
          <p className="m-0 text-fg" style={{ fontSize: 17, lineHeight: `var(--leading-${step})` }}>
            {SAMPLE}. {SAMPLE}.
          </p>
        </Row>
      ))}
    </div>
  ),
};

/** Tracking: tight (titles) vs normal (body). */
export const Tracking: Story = {
  render: () => (
    <div className="flex flex-col p-6 max-w-2xl">
      <Row token="--tracking-tight" label="Tracking tight (titles)">
        <p className="m-0 text-fg" style={{ fontSize: 28, letterSpacing: "var(--tracking-tight)" }}>
          {SAMPLE}
        </p>
      </Row>
      <Row token="--tracking-normal" label="Tracking normal (body)">
        <p
          className="m-0 text-fg"
          style={{ fontSize: 28, letterSpacing: "var(--tracking-normal)" }}
        >
          {SAMPLE}
        </p>
      </Row>
    </div>
  ),
};

/** Style variants the system font renders: roman, italic, small-caps. */
export const StyleVariants: Story = {
  render: () => (
    <div className="flex flex-col p-6 max-w-2xl">
      <Row token="font-style: normal" label="Roman">
        <p className="m-0 text-fg" style={{ fontSize: 22 }}>
          {SAMPLE}
        </p>
      </Row>
      <Row token="font-style: italic" label="Italic">
        <p className="m-0 text-fg italic" style={{ fontSize: 22 }}>
          {SAMPLE}
        </p>
      </Row>
      <Row token="font-variant: small-caps" label="Small caps">
        <p className="m-0 text-fg" style={{ fontSize: 22, fontVariant: "small-caps" }}>
          {SAMPLE}
        </p>
      </Row>
    </div>
  ),
};
