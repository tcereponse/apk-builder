import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '../lib/utils'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const pages: (number | '...')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pages.push('...')
    }
  }

  return (
    <nav className={cn('flex items-center gap-1', className)} aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border border-slate-700 p-2 text-slate-400 disabled:opacity-50"
        aria-label="Page précédente"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={i} className="px-2 text-slate-500">
            <MoreHorizontal className="h-4 w-4" />
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(p)}
            className={cn(
              'h-9 min-w-[36px] rounded-md border px-2 text-sm',
              p === currentPage
                ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                : 'border-slate-700 text-slate-400 hover:bg-slate-800'
            )}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border border-slate-700 p-2 text-slate-400 disabled:opacity-50"
        aria-label="Page suivante"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
