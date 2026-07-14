import { type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-cyan-500/10 text-cyan-300',
        success: 'border-transparent bg-emerald-500/10 text-emerald-300',
        warning: 'border-transparent bg-amber-500/10 text-amber-300',
        destructive: 'border-transparent bg-rose-500/10 text-rose-300',
        outline: 'border-slate-700 text-slate-300',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { badgeVariants }
