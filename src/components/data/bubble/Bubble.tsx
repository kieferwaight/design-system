import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface BubbleProps {
  role: "user" | "assistant" | "tool" | "system";
  children: ReactNode;
  timestamp?: ReactNode;
  /** Right-align (true) or left-align (false). Defaults: user → right, else left. */
  alignRight?: boolean;
}

export function Bubble({ role, children, timestamp, alignRight }: BubbleProps) {
  const right = alignRight ?? role === "user";
  return (
    <div
      className={cn(
        "flex flex-col gap-1 max-w-[82%]",
        right ? "ml-auto items-end" : "mr-auto items-start",
      )}
    >
      <div
        className={cn(
          "rounded-2xl px-3.5 py-2 text-base leading-snug break-words",
          right
            ? "bg-accent text-fg-on-accent rounded-br-md"
            : role === "tool"
              ? "font-mono text-sm bg-bg-sunken border border-border text-warning rounded-bl-md"
              : role === "system"
                ? "bg-transparent text-fg-tertiary italic text-xs px-0"
                : "bg-bg-sunken text-fg rounded-bl-md",
        )}
      >
        {children}
      </div>
      {timestamp ? (
        <span className="text-3xs text-fg-tertiary tabular-nums px-1">{timestamp}</span>
      ) : null}
    </div>
  );
}
