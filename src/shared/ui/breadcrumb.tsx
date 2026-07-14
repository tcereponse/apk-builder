import { type ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  separator?: ReactNode
}

export function Breadcrumb({ items, className, separator }: BreadcrumbProps) {
  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {item.onClick || item.href ? (
              <button
                onClick={item.onClick}
                className="text-slate-400 hover:text-slate-200"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-slate-200">{item.label}</span>
            )}
            {i < items.length - 1 && (
              <span className="text-slate-600">
                {separator ?? <ChevronRight className="h-3 w-3" />}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
