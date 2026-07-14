import { type HTMLAttributes } from 'react'
import { cn } from '../lib/utils'

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column'
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
}

export function Stack({
  className,
  direction = 'column',
  gap = 'md',
  align,
  justify,
  ...props
}: StackProps) {
  const gaps = { none: '', sm: 'gap-2', md: 'gap-4', lg: 'gap-6', xl: 'gap-8' }
  const aligns = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch' }
  const justifies = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  }
  return (
    <div
      className={cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        gaps[gap],
        align && aligns[align],
        justify && justifies[justify],
        className
      )}
      {...props}
    />
  )
}
