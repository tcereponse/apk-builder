import { type ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/utils'

export interface SheetProps {
  open: boolean
  onClose: () => void
  side?: 'left' | 'right' | 'top' | 'bottom'
  title?: string
  children: ReactNode
  className?: string
}

export function Sheet({ open, onClose, side = 'right', title, children, className }: SheetProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const sideClasses = {
    left: 'left-0 h-full',
    right: 'right-0 h-full',
    top: 'top-0 w-full',
    bottom: 'bottom-0 w-full',
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          'absolute bg-slate-900 shadow-2xl',
          sideClasses[side],
          side === 'left' || side === 'right' ? 'w-full max-w-md' : 'max-h-[80vh]',
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          {title && <h2 className="text-lg font-semibold text-slate-100">{title}</h2>}
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-300"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  )
}
