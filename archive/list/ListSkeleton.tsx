import { Skeleton } from "../primitives/Skeleton";

interface ListSkeletonProps {
  count?: number;
}

/**
 * Loading placeholder for the list pane. Renders N rows of skeleton shimmer
 * matching the height & gutter of a real row, so content swap is non-jarring.
 */
export function ListSkeleton({ count = 8 }: ListSkeletonProps) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: stable indices for skeleton
        <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-separator">
          <Skeleton variant="circle" width={36} height={36} />
          <div className="flex-1 flex flex-col gap-1.5 pt-1">
            <Skeleton variant="line" width="55%" height={12} />
            <Skeleton variant="line" width="85%" height={10} />
            <Skeleton variant="line" width="70%" height={10} />
          </div>
          <Skeleton variant="line" width={28} height={9} />
        </div>
      ))}
    </div>
  );
}
