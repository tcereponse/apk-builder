Gestion des Erreurs & Chargement — GAMER
ErrorBoundary
ErrorBoundary Component
// src/shared/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Oups ! Une erreur est survenue
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            {this.state.error?.message || 'Erreur inconnue'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
          >
            Réessayer
          </button>
        </div>
      )
    }
    
    return this.props.children
  }
}
Hook pour ErrorBoundary
// src/shared/hooks/useErrorBoundary.ts
import { useCallback, useState } from 'react'

interface UseErrorBoundaryReturn {
  error: Error | null
  reset: () => void
  handleError: (error: Error) => void
}

export function useErrorBoundary(): UseErrorBoundaryReturn {
  const [error, setError] = useState<Error | null>(null)
  
  const reset = useCallback(() => {
    setError(null)
  }, [])
  
  const handleError = useCallback((error: Error) => {
    setError(error)
    console.error('Error caught:', error)
  }, [])
  
  return { error, reset, handleError }
}
Suspense & Lazy Loading
Lazy Loading Pattern
// src/app/router.tsx (avec Suspense)
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'

const HomePage = lazy(() => import('@/features/home/pages/HomePage'))

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* ... autres routes */}
      </Routes>
    </Suspense>
  )
}
LoadingSpinner Component
// src/shared/components/LoadingSpinner.tsx
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullScreen?: boolean
}

const sizeMap = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16'
}

export function LoadingSpinner({ 
  size = 'md', 
  className = '',
  fullScreen = false 
}: LoadingSpinnerProps) {
  const spinner = (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizeMap[size]} animate-spin text-slate-600 dark:text-slate-300`} />
    </div>
  )
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50">
        {spinner}
      </div>
    )
  }
  
  return spinner
}
États Vides
EmptyState Component
// src/shared/components/EmptyState.tsx
import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {icon && <div className="text-slate-400 dark:text-slate-500 mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}
Retry Logic
useRetry Hook
// src/shared/hooks/useRetry.ts
import { useState, useCallback } from 'react'

interface UseRetryOptions {
  maxAttempts?: number
  delay?: number
  onRetry?: (attempt: number) => void
}

export function useRetry({ 
  maxAttempts = 3, 
  delay = 1000, 
  onRetry 
}: UseRetryOptions = {}) {
  const [attempt, setAttempt] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)
  
  const retry = useCallback(async <T>(
    fn: () => Promise<T>
  ): Promise<T> => {
    setIsRetrying(true)
    
    for (let i = attempt; i < maxAttempts; i++) {
      try {
        const result = await fn()
        setAttempt(0)
        setIsRetrying(false)
        return result
      } catch (error) {
        if (i === maxAttempts - 1) {
          setAttempt(0)
          setIsRetrying(false)
          throw error
        }
        
        setAttempt(i + 1)
        onRetry?.(i + 1)
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
      }
    }
    
    setIsRetrying(false)
    throw new Error('Max attempts reached')
  }, [attempt, maxAttempts, delay, onRetry])
  
  const reset = useCallback(() => {
    setAttempt(0)
    setIsRetrying(false)
  }, [])
  
  return { retry, reset, attempt, isRetrying, maxAttempts }
}
Retry Component
// src/shared/components/RetryButton.tsx
import { RefreshCw } from 'lucide-react'

interface RetryButtonProps {
  onRetry: () => void
  isLoading?: boolean
  label?: string
}

export function RetryButton({ 
  onRetry, 
  isLoading = false, 
  label = 'Réessayer' 
}: RetryButtonProps) {
  return (
    <button
      onClick={onRetry}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
      {label}
    </button>
  )
}
Global Error Handling
Error Handler Service
// src/shared/services/errorHandler.ts
import { z } from 'zod'

interface ErrorReport {
  message: string
  stack?: string
  component?: string
  timestamp: string
  userAgent: string
  url: string
}

export class ErrorHandler {
  static instance: ErrorHandler
  
  private constructor() {}
  
  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler()
    }
    return ErrorHandler.instance
  }
  
  handleError(error: unknown, context?: Record<string, unknown>) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    const report: ErrorReport = {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...context
    }
    
    console.error('Error Report:', report)
    
    // En production : envoyer au cockpit
    if (import.meta.env.PROD) {
      this.sendToCockpit(report)
    }
  }
  
  private sendToCockpit(report: ErrorReport) {
    // WebSocket ou API call
    try {
      const ws = new WebSocket('wss://cockpit.gamer.example.com/errors')
      ws.onopen = () => {
        ws.send(JSON.stringify(report))
        ws.close()
      }
    } catch (e) {
      console.error('Failed to send error report:', e)
    }
  }
  
  handleApiError(error: unknown): string {
    if (error instanceof z.ZodError) {
      return error.errors.map(e => e.message).join(', ')
    }
    
    if (error instanceof Error) {
      return error.message
    }
    
    return 'Une erreur inattendue est survenue'
  }
}

export const errorHandler = ErrorHandler.getInstance()
Zod Validation Error Handler
// src/shared/lib/validation.ts
import { z } from 'zod'

export function validateAndHandle<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { data: T; errors: string[] } {
  const result = schema.safeParse(data)
  
  if (result.success) {
    return { data: result.data, errors: [] }
  }
  
  const errors = result.error.errors.map(e => e.message)
  return { data: data as T, errors }
}