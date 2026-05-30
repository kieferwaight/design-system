import { type Bubble as BubbleData } from "../../examples/mocks/types";
import { relativeTime } from "@/lib/date";
import { Bubble } from "./Bubble";

interface BubbleStreamProps {
  bubbles: BubbleData[];
}

/**
 * Renders a sequence of bubbles with a small day-separator when the gap
 * between consecutive messages crosses a date boundary.
 */
export function BubbleStream({ bubbles }: BubbleStreamProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      {bubbles.map((b, i) => {
        const prev = bubbles[i - 1];
        const showDivider =
          !prev || new Date(prev.date * 1000).toDateString() !== new Date(b.date * 1000).toDateString();
        return (
          <div key={b.id} className="flex flex-col gap-3">
            {showDivider ? (
              <div className="text-center text-3xs uppercase tracking-wider text-fg-tertiary py-2">
                {new Date(b.date * 1000).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            ) : null}
            <Bubble role={b.role} timestamp={relativeTime(b.date)}>
              {b.content_type === "markdown" ? (
                <span className="whitespace-pre-wrap">{b.content}</span>
              ) : (
                <span className="whitespace-pre-wrap">{b.content}</span>
              )}
            </Bubble>
          </div>
        );
      })}
    </div>
  );
}
