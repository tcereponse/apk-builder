import React from 'react';

export interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  count?: number;
  className?: string;
  borderRadius?: string;
}

export function SkeletonLoader({
  width = '100%',
  height = '1rem',
  count = 1,
  className,
  borderRadius = '0.25rem',
}: SkeletonLoaderProps) {
  const skeletons = Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className={`
        animate-pulse bg-gray-200 dark:bg-zinc-700 
        ${className || ''}
      `}
      style={{ width, height, borderRadius }}
    ></div>
  ));

  return <>{skeletons}</>;
}

export default SkeletonLoader;
