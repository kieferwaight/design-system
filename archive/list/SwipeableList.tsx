import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { GridList, type Selection } from "react-aria-components";
import { cn } from "@/lib/cn";

interface SwipeableListProps {
  "aria-label": string;
  children: ReactNode;
  /** "none" = swipe-to-reveal enabled; "multiple" = checkbox multi-select. */
  selectionMode?: "none" | "multiple";
  selectedKeys?: Selection;
  onSelectionChange?: (keys: Selection) => void;
  className?: string;
}

/**
 * The list container of the design system: a RAC GridList (keyboard nav, roving
 * focus, optional multi-select) holding SwipeableRow items. Full-width and
 * single-column on mobile; constrained to a phone-ish column on `sm+`. Items
 * are wrapped in AnimatePresence so removals collapse the list smoothly.
 */
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
        "flex flex-col w-full sm:max-w-[420px] mx-auto bg-bg outline-none",
        className,
      )}
    >
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </GridList>
  );
}
