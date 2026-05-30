import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Font — the system stack. SF Pro can't be web-embedded, so we ride the
 * platform font: `-apple-system` resolves to SF Pro on Apple devices and
 * degrades to the host UI font elsewhere. Two families: `--font-sans` for UI
 * and `--font-mono` for code/numerals.
 *
 * - **SF Pro** (`--font-sans`) — the system sans. Nine weights, variable optical
 *   sizes (legibility tuning per size), four widths, and a rounded variant;
 *   150+ languages across Latin, Greek, and Cyrillic.
 * - **SF Mono** (`--font-mono`) — the monospaced San Francisco. Six weights;
 *   aligns rows/columns for code and tabular data.
 */
const meta: Meta = {
  title: "Foundations/Typography/Font",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

const SANS = `-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, "Segoe UI", Roboto, sans-serif`;
const MONO = `ui-monospace, "SF Mono", Menlo, monospace`;

function FontCard({
  token,
  family,
  stack,
  fontFamily,
}: {
  token: string;
  family: string;
  stack: string;
  fontFamily: string;
}) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-border bg-bg-elevated p-5 max-w-3xl">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="m-0 text-base font-semibold text-fg">{family}</h3>
        <code className="text-xs font-mono text-fg-secondary">{token}</code>
      </div>
      <p className="m-0 text-3xl text-fg" style={{ fontFamily }}>
        The quick brown fox jumps over the lazy dog
      </p>
      <p className="m-0 text-fg-secondary" style={{ fontFamily, fontSize: 17 }}>
        ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 &amp;@#?!
      </p>
      <code className="text-2xs font-mono text-fg-tertiary break-words">{stack}</code>
    </section>
  );
}

/** The two system families side by side. */
export const Families: Story = {
  render: () => (
    <div className="flex flex-col gap-5 p-6">
      <FontCard token="--font-sans" family="Sans (UI)" stack={SANS} fontFamily="var(--font-sans)" />
      <FontCard
        token="--font-mono"
        family="Mono (code · numerals)"
        stack={MONO}
        fontFamily="var(--font-mono)"
      />
    </div>
  ),
};
