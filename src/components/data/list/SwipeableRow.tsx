import {
  animate,
  type MotionStyle,
  motion,
  useIsPresent,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { type ReactNode, useRef } from "react";
import { GridListItem } from "react-aria-components";
import { cn } from "@/lib/cn";
import { Icon } from "@/primitives";

const MotionItem = motion.create(GridListItem);

const inertiaTransition = {
  type: "inertia" as const,
  bounceStiffness: 300,
  bounceDamping: 40,
  timeConstant: 300,
};

const OPEN = 152;

export interface SwipeableRowProps {
  id: string;
  /** Accessible label for the grid row. */
  textValue: string;
  children: ReactNode;
  /** Fires on Pin action button and full left-swipe. */
  onPin?: () => void;
  onFlag?: () => void;
}

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
        "block overflow-hidden outline-none w-full bg-bg border-none",
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
            document.dispatchEvent(new PointerEvent("pointercancel"));
          }}
          onDragEnd={(_e, { offset }) => {
            const width = ref.current?.offsetWidth ?? 0;
            let target = offset.x > -20 ? 0 : -OPEN;
            if (x.get() < -width * 0.8) {
              target = -width;
              onPin?.();
            }
            animate(x, target, {
              ...inertiaTransition,
              min: target,
              max: target,
            });
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
                className="flex-1 flex flex-col items-center justify-center gap-0.5 text-fg-on-accent text-2xs font-semibold bg-[var(--color-flag)] border-none outline-none cursor-pointer"
              >
                <Icon name="flag.fill" size={18} />
                Flag
              </button>
              <button
                type="button"
                onClick={onPin}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 text-fg-on-accent text-2xs font-semibold bg-[var(--color-pin)] border-none outline-none cursor-pointer"
              >
                <Icon name="pin.fill" size={18} />
                Pin
              </button>
            </div>
          ) : null}
        </motion.div>
      )}
    </MotionItem>
  );
}
