import { type ReactNode } from 'react'
import { Skeleton } from './skeleton'
import { ErrorState } from './error-state'
import { EmptyState } from './empty-state'

export interface AsyncBoundaryProps {
  isLoading?: boolean
  isError?: boolean
  isEmpty?: boolean
  error?: unknown
  onRetry?: () => void
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: ReactNode
  skeleton?: ReactNode
  children: ReactNode
}

/** Reusable boundary that handles loading, error, empty, and success states. */
export function AsyncBoundary({
  isLoading,
  isError,
  isEmpty,
  onRetry,
  emptyTitle = 'Aucune donnée',
  emptyDescription,
  emptyAction,
  skeleton,
  children,
}: AsyncBoundaryProps) {
  if (isLoading) {
    return <>{skeleton ?? <Skeleton className="h-32 w-full" />}</>
  }

  if (isError) {
    return <ErrorState onRetry={onRetry} />
  }

  if (isEmpty) {
    return <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
  }

  return <>{children}</>
}
