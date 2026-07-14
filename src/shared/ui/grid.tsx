import { type HTMLAttributes } from 'react'
import { cn } from '../lib/utils'

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'none' | 'sm' | 'md' | 'lg'
}

export function Grid({ className, cols = 2, gap = 'md', ...props }: GridProps) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  }
  const gaps = { none: '', sm: 'gap-2', md: 'gap-4', lg: 'gap-6' }
  return <div className={cn('grid', colClasses[cols], gaps[gap], className)} {...props} />
}
