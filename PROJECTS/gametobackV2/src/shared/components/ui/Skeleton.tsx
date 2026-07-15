import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
variant?: 'text' | 'rect' | 'circle' | 'card';
width?: string | number;
height?: string | number;
count?: number;
}
export function Skeleton({
variant = 'rect',
width,
height,
className,
count = 1,
...props
}: SkeletonProps) {
const baseClasses = 'bg-zinc-800/60 rounded animate-pulse';
const variantClasses = {
text: 'h-4 rounded',
rect: 'rounded-lg',
circle: 'rounded-full aspect-square',
card: 'rounded-xl aspect-[2/3]',
};
const style = {
width: typeof width === 'number' ? ${width}px : width,
height: typeof height === 'number' ? ${height}px : height,
};
const classes = twMerge(
clsx(baseClasses, variantClasses[variant]),
className
);
if (count > 1) {
return (
      <div className="flex flex-col gap-3" {...props}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={classes}
            style={style}
          />
        ))}
      </div>
    );
  }return <div className={classes} style={style} {...props} />;
}
export function GameCardSkeleton() {
return (
    <div className="relative rounded-xl overflow-hidden aspect-[2/3] bg-zinc-800/80 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
        <div className="h-4 w-3/4 bg-zinc-700/60 rounded" />
        <div className="h-3 w-1/2 bg-zinc-700/40 rounded" />
        <div className="h-3 w-2/3 bg-zinc-700/40 rounded" />
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-12 bg-zinc-700/40 rounded-full" />
          <div className="h-5 w-12 bg-zinc-700/40 rounded-full" />
        </div>
      </div>
    </div>
  );
}