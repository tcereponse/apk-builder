import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/** Format a date to French locale. */
export function formatDate(date: Date | string | number): string {
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

/** Format a number as currency (EUR). */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)
}

/** Format a number with thousand separators. */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(n)
}

/** Truncate text with ellipsis. */
export function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) + '…' : text
}

/** Sleep for ms milliseconds. */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Generate a random ID. */
export function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

/** Debounce a function. */
export function debounce<T extends (...args: never[]) => unknown>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>
  return ((...args: never[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }) as T
}
