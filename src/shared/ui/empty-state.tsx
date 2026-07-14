import { type ReactNode } from 'react'

export function EmptyState({ children }: { children?: ReactNode }) {
  return <>{children}</>
}
