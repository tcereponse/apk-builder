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
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center border-b border-slate-800 px-3">
          <Search className="h-4 w-4 shrink-0 text-slate-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 text-slate-100"
          />
        </div>
        {filtered.length > 0 ? (
          <ul className="max-h-[300px] overflow-y-auto p-2">
            {filtered.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-slate-800 aria-selected:text-slate-100',
                  index === activeIndex && 'bg-slate-800 text-slate-100'
                )}
                onMouseDown={(e) => {
                  e.preventDefault();
                  item.action();
                  onClose();
                }}
                role="option"
                aria-selected={index === activeIndex}
              >
                {item.icon && <span className="mr-2 h-4 w-4">{item.icon}</span>}
                <div className="flex-1">
                  <p className="font-medium text-slate-100">{item.label}</p>
                  {item.description && <p className="text-xs text-slate-400">{item.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 text-center text-sm text-slate-500">Aucun résultat.</p>
        )}
      </div>
    </div>
  )
}
