x

import { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  badge?: string
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, badge, className }: FeatureCardProps) {
  return (
    <div className={cn(
      'group relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
      className
    )}>
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
          <Icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </div>
        {badge && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}