import { useState, useEffect, useRef, type ReactNode } from 'react'
import { Search } from 'lucide-react'
import { cn } from '../lib/utils'

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: ReactNode
  action: () => void
}

export interface CommandMenuProps {
  open: boolean
  onClose: () => void
  items: CommandItem[]
  placeholder?: string
}

export function CommandMenu({ open, onClose, items, placeholder = 'Rechercher...' }: CommandMenuProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[activeIndex]) {
      e.preventDefault()
      filtered[activeIndex].action()
      onClose()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[20vh]">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center border-b border-slate-800 px-3">
          <Search className="h-4 w-4 shrink-0 text-slate-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="h-12 w-full bg-transparent px-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto p-1">
          {filtered.length === 0 ? (
            <div className="py-6 text-center text-sm text-slate-500">Aucun résultat</div>
          ) : (
            filtered.map((item, i) => (
              <button
                key={item.id}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  item.action()
                  onClose()
                }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition',
                  i === activeIndex ? 'bg-slate-800 text-slate-100' : 'text-slate-300'
                )}
              >
                {item.icon}
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  {item.description && <div className="text-xs text-slate-500">{item.description}</div>}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
