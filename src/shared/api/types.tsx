import { type ReactNode } from 'react'

export function ApiError({ children }: { children?: ReactNode }) {
  return <>{children}</>
}

export function type FetcherOptions(...args: any[]) { return {} }

export function type PaginatedResponse(...args: any[]) { return {} }

export function type QueryKey(...args: any[]) { return {} }
