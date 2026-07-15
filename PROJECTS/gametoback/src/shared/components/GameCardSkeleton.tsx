export function GameCardSkeleton() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl glass-panel animate-pulse">
      <div className="aspect-[3/4] bg-diamond-surface/40" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="h-4 w-3/4 rounded bg-diamond-surface/40" />
        <div className="flex gap-2">
          <div className="h-3 w-12 rounded bg-diamond-surface/40" />
          <div className="h-3 w-16 rounded bg-diamond-surface/40" />
        </div>
        <div className="mt-1 space-y-1.5">
          <div className="h-2.5 w-full rounded bg-diamond-surface/40" />
          <div className="h-2.5 w-3/4 rounded bg-diamond-surface/40" />
        </div>
      </div>
    </div>
  );
}