import { cn } from '../lib/utils'

export interface ProgressProps {
  value: number // 0-100
  className?: string
}

export function Progress({ value, className }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-slate-800', className)}>
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-300"
        style={{ width: `${clamped}%` }}
      ></div>
    </div>
  )
}
