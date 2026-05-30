import { type SearchHit } from "../../examples/mocks/types";
import { kindMeta, toneBg, toneColor } from "@/generated";
import { shortTime } from "@/lib/date";
import { Chip } from "../primitives/Chip";
import { Icon } from "../primitives/Icon";
import { Row } from "./Row";

interface SearchResultRowProps {
  hit: SearchHit;
  /** Echo the matched query so we can highlight it in the title/snippet. */
  query?: string;
  selected?: boolean;
  onClick?: () => void;
  separator?: boolean;
}

function highlight(text: string, q: string | undefined) {
  if (!q || !text) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
  const parts = text.split(re);
  return parts.map((part, i) =>
    re.test(part) ? (
      <mark
        // biome-ignore lint/suspicious/noArrayIndexKey: highlight indexes stable to render
        key={i}
        className="bg-warning/30 text-fg px-0.5 rounded-sm"
      >
        {part}
      </mark>
    ) : (
      // biome-ignore lint/suspicious/noArrayIndexKey:
      <span key={i}>{part}</span>
    ),
  );
}

export function SearchResultRow({
  hit,
  query,
  selected,
  onClick,
  separator,
}: SearchResultRowProps) {
  const meta = kindMeta(hit.source_kind);
  return (
    <Row
      selected={selected}
      onClick={onClick}
      separator={separator}
      leading={
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
          style={{ background: toneBg(meta.tone) }}
        >
          <Icon as={meta.icon} size={18} color={toneColor(meta.tone)} />
        </span>
      }
      title={<span>{highlight(hit.title, query)}</span>}
      subtitle={hit.preview}
      preview={hit.snippet ? <span>{highlight(hit.snippet, query)}</span> : undefined}
      timestamp={hit.date ? shortTime(hit.date) : undefined}
      meta={
        <Chip kind={hit.source_kind} size="xs">
          {meta.label}
        </Chip>
      }
    />
  );
}
