x

import { LucideIcon } from 'lucide-react'
import { useCountUp } from '@/shared/hooks/useCountUp'
import { cn } from '@/shared/lib/utils'

interface StatCardProps {
  icon: LucideIcon
  value: string
  label: string
  className?: string
}

export function StatCard({ icon: Icon, value, label, className }: StatCardProps) {
  const numericValue = parseInt(value.replace(/[^0-9.]/g, ''))
  const displayValue = useCountUp(numericValue)
  const suffix = value.replace(/[0-9.]/g, '')
  
  return (
    <div className={cn(
      'text-center p-6',
      className
    )}>
      <Icon className="w-8 h-8 mx-auto mb-3 text-slate-600 dark:text-slate-400" />
      <div className="text-3xl font-bold text-slate-900 dark:text-white font-display">
        {displayValue}{suffix}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{label}</p>
    </div>
  )
}