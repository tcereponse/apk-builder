import { useState, type ReactNode } from 'react'
import { cn } from '../lib/utils'

export interface TabsProps {
  defaultValue: string
  children: ReactNode
  className?: string
}

export interface TabsListProps {
  children: ReactNode
  className?: string
}

export interface TabsTriggerProps {
  value: string
  children: ReactNode
  className?: string
}

export interface TabsContentProps {
  value: string
  children: ReactNode
  className?: string
}

interface TabsContextValue {
  value: string
  setValue: (v: string) => void
}

import { createContext, useContext } from 'react'

const TabsContext = createContext<TabsContextValue | null>(null)

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [value, setValue] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn('inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950/40 p-1', className)}>
      {children}
    </div>
  )
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabsTrigger must be used within Tabs')
  const active = ctx.value === value
  return (
    <button
      onClick={() => ctx.setValue(value)}
      className={cn(
        'rounded-md px-3 py-1.5 text-sm font-medium transition',
        active ? 'bg-slate-800 text-slate-100' : 'text-slate-400 hover:text-slate-200',
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabsContent must be used within Tabs')
  if (ctx.value !== value) return null
  return <div className={className}>{children}</div>
}
