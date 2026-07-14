import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/utils'

export interface AccordionItemProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-slate-800">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-slate-200"
      >
        {title}
        <ChevronDown className={cn('h-4 w-4 text-slate-500 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="pb-4 text-sm text-slate-400">{children}</div>}
    </div>
  )
}

export function Accordion({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('divide-y divide-slate-800', className)}>{children}</div>
}
