import { type HTMLAttributes } from 'react'
import { cn } from '../lib/utils'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({ className, size = 'lg', ...props }: ContainerProps) {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  }
  return <div className={cn('mx-auto w-full px-4', sizes[size], className)} {...props}></div>
}
