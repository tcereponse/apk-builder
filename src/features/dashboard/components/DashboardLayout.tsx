import { cn } from '@/shared/lib/utils'
import { StatsGrid } from './StatsGrid'
import { SimpleChart } from './SimpleChart'
import type { Stat, ChartData } from '../types'

export interface DashboardLayoutProps {
  title?: string
  description?: string
  stats: Stat[]
  charts?: ChartData[]
  /** Optional extra content rendered at the bottom (e.g., a data table). */
  children?: React.ReactNode
  className?: string
}

export function DashboardLayout({
  title,
  description,
  stats,
  charts,
  children,
  className,
}: DashboardLayoutProps) {
  return (
    <section className={cn('space-y-6', className)} aria-label={title ?? 'Tableau de bord'}>
      {(title || description) && (
        <header className="space-y-1">
          {title && <h2 className="text-2xl font-semibold text-foreground">{title}</h2>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </header>
      )}

      <StatsGrid stats={stats} />

      {charts && charts.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          {charts.map((chart) => (
            <div
              key={chart.id}
              className="rounded-lg border border-border bg-background p-4 shadow-sm"
            >
              <SimpleChart data={chart} />
            </div>
          ))}
        </div>
      )}

      {children && <div className="space-y-4">{children}</div>}
    </section>
  )
}

export default DashboardLayout
