import type { Meta, StoryObj } from "@storybook/react-vite";
import { sizeVar, TEXT_STYLES, weightVar } from "./typography";

/**
 * Font Pairings — sanctioned combinations of the text styles, shown in context.
 * On Apple platforms the "pairing" is almost always the *same* family at
 * different roles (title + body + footnote), with mono reserved for code and
 * data. These are the compositions components should reach for.
 */
const meta: Meta = {
  title: "Foundations/Typography/Pairings",
  tags: ["experimental"],
};
export default meta;

type Story = StoryObj;

const style = (name: string) => TEXT_STYLES.find((s) => s.name === name)!;

function styleProps(name: string) {
  const s = style(name);
  return {
    fontSize: sizeVar(s.sizeToken),
    fontWeight: weightVar(s.weight) as unknown as number,
    lineHeight: `${s.leading}px`,
    letterSpacing: s.size >= 20 ? "var(--tracking-tight)" : "var(--tracking-normal)",
  };
}

/** Article header — Large Title over Subheadline, the canonical screen intro. */
export const ArticleHeader: Story = {
  render: () => (
    <div className="flex flex-col gap-2 p-8 max-w-2xl">
      <span className="text-fg" style={styleProps("Large Title")}>
        Conversations
      </span>
      <span className="text-fg-secondary" style={styleProps("Subheadline")}>
        Every export, normalized into one searchable archive.
      </span>
    </div>
  ),
};

/** List row — Headline title, Subheadline preview, Caption timestamp. */
export const ListRow: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <div className="flex flex-col gap-1 rounded-xl border border-border bg-bg-elevated p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-fg" style={styleProps("Headline")}>
            Quarterly planning
          </span>
          <span className="text-fg-tertiary tabular-nums" style={styleProps("Caption 1")}>
            10:41
          </span>
        </div>
        <span className="text-fg-secondary line-clamp-2" style={styleProps("Subheadline")}>
          Let's lock the roadmap before the offsite — I'll draft the doc and share it tonight.
        </span>
      </div>
    </div>
  ),
};

/** Body + mono — running prose with an inline code span and a code block. */
export const BodyAndCode: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-8 max-w-2xl">
      <p className="m-0 text-fg" style={styleProps("Body")}>
        Run the importer with{" "}
        <code
          className="rounded bg-bg-sunken px-1.5 py-0.5 font-mono"
          style={{ fontSize: "0.85em" }}
        >
          --contacts-only
        </code>{" "}
        to re-derive people after a mail sync.
      </p>
      <pre className="m-0 overflow-x-auto rounded-lg bg-bg-sunken p-4">
        <code className="font-mono text-fg" style={{ fontSize: 13, lineHeight: 1.6 }}>
          uv run python -m archive.ingest --db data/archive.db --contacts-only
        </code>
      </pre>
      <span className="text-fg-tertiary" style={styleProps("Footnote")}>
        Footnote — Apple Contacts requires Full Disk Access for the importing process.
      </span>
    </div>
  ),
};
