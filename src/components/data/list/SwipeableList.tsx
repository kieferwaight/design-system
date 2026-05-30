import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { GridList, type Selection } from "react-aria-components";
import { cn } from "@/lib/cn";

export interface SwipeableListProps {
  "aria-label": string;
  children: ReactNode;
  /** "none" = swipe-to-reveal enabled; "multiple" = checkbox multi-select. */
  selectionMode?: "none" | "multiple";
  selectedKeys?: Selection;
  onSelectionChange?: (keys: Selection) => void;
  className?: string;
}

export function SwipeableList({
  children,
  selectionMode = "none",
  selectedKeys,
  onSelectionChange,
  className,
  ...rest
}: SwipeableListProps) {
  return (
    <GridList
      aria-label={rest["aria-label"]}
      selectionMode={selectionMode}
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      className={cn(
        "flex flex-col w-full sm:max-w-[420px] mx-auto bg-bg outline-none border-none",
        className,
      )}
    >
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </GridList>
  );
}
