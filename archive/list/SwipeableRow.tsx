import {
  animate,
  motion,
  type MotionStyle,
  useIsPresent,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { FlagIcon, PinIcon } from "lucide-react";
import { type ReactNode, useRef } from "react";
import { GridListItem } from "react-aria-components";
import { cn } from "@/lib/cn";
import { Icon } from "../primitives/Icon";

const MotionItem = motion.create(GridListItem);

/** iOS-style momentum snap — from the React Aria ios-list example. */
const inertiaTransition = {
  type: "inertia" as const,
  bounceStiffness: 300,
  bounceDamping: 40,
  timeConstant: 300,
};

/** Width the action track snaps open to when partially revealed. */
const OPEN = 152;

interface SwipeableRowProps {
  id: string;
  /** Accessible label for the grid row (RAC needs this when children aren't plain text). */
  textValue: string;
  children: ReactNode;
  /** Fires on the Pin action button and on a full left-swipe past ~80%. */
  onPin?: () => void;
  onFlag?: () => void;
}

/**
 * A GridList row with iOS swipe-to-reveal. Swiping left exposes Pin + Flag
 * action buttons that grow with the drag (width tracks `--x`); a full swipe
 * past 80% fires the primary (Pin). Keyboard focus reveals the actions too.
 * Drag is disabled in multi-select mode (the GridList owns selection then).
 *
 * Pattern: https://react-aria.adobe.com/examples/ios-list
 */
export function SwipeableRow({ id, textValue, children, onPin, onFlag }: SwipeableRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const xPx = useMotionTemplate`${x}px`;
  const isPresent = useIsPresent();

  return (
    <MotionItem
      id={id}
      textValue={textValue}
      layout
      transition={{ duration: 0.25 }}
      exit={{ opacity: 0 }}
      style={{ position: isPresent ? "relative" : "absolute" }}
      className={cn(
        "block overflow-hidden outline-none w-full bg-bg",
        "data-[focus-visible]:ring-2 data-[focus-visible]:ring-accent data-[focus-visible]:ring-inset",
        "data-[selected]:bg-accent-subtle",
      )}
    >
      {({ selectionMode }) => (
        <motion.div
          ref={ref}
          style={{ x, "--x": xPx } as MotionStyle}
          drag={selectionMode === "none" ? "x" : false}
          dragConstraints={{ right: 0 }}
          dragElastic={0.08}
          onDragStart={() => {
            // Cancel any in-flight RAC press so drag and press don't fight.
            document.dispatchEvent(new PointerEvent("pointercancel"));
          }}
          onDragEnd={(_e, { offset }) => {
            const width = ref.current?.offsetWidth ?? 0;
            let target = offset.x > -20 ? 0 : -OPEN;
            if (x.get() < -width * 0.8) {
              target = -width;
              onPin?.();
            }
            animate(x, target, { ...inertiaTransition, min: target, max: target });
          }}
          onFocus={() => x.set(-OPEN)}
          onBlur={() => x.set(0)}
          className="relative bg-bg"
        >
          {children}

          {selectionMode === "none" ? (
            <div
              aria-hidden
              className="absolute top-0 left-full h-full flex"
              style={{ width: "max(152px, calc(-1 * var(--x)))" }}
            >
              <button
                type="button"
                onClick={onFlag}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 text-fg-on-accent text-2xs font-semibold bg-[var(--color-flag)]"
              >
                <Icon as={FlagIcon} size={18} />
                Flag
              </button>
              <button
                type="button"
                onClick={onPin}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 text-fg-on-accent text-2xs font-semibold bg-[var(--color-pin)]"
              >
                <Icon as={PinIcon} size={18} />
                Pin
              </button>
            </div>
          ) : null}
        </motion.div>
      )}
    </MotionItem>
  );
}
