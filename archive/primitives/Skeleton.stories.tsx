import type { StoryFn } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

export default {
  title: "Archive/Primitives / Skeleton",
};

export const Variants: StoryFn = () => (
  <div className="flex flex-col gap-6 p-6">
    <div className="flex items-center gap-3">
      <Skeleton variant="circle" width={36} height={36} />
      <div className="flex flex-col gap-1.5 flex-1">
        <Skeleton variant="line" width="50%" height={12} />
        <Skeleton variant="line" width="80%" height={10} />
      </div>
    </div>
    <Skeleton variant="block" width={300} height={120} />
    <div className="flex flex-col gap-2">
      <Skeleton variant="line" width="100%" />
      <Skeleton variant="line" width="92%" />
      <Skeleton variant="line" width="78%" />
    </div>
  </div>
);

export const RowSkeleton: StoryFn = () => (
  <div className="flex flex-col gap-2 p-3 w-full max-w-md">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-3 p-3 rounded-lg bg-bg-elevated border border-border"
      >
        <Skeleton variant="circle" width={32} height={32} />
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton variant="line" width="60%" height={11} />
          <Skeleton variant="line" width="85%" height={9} />
        </div>
        <Skeleton variant="line" width={32} height={9} />
      </div>
    ))}
  </div>
);
