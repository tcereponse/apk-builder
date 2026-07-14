import { type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { cn } from '../lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 text-sm',
  {
    variants: {
      variant: {
        info: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-200',
        success: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-200',
        warning: 'border-amber-500/30 bg-amber-500/5 text-amber-200',
        destructive: 'border-rose-500/30 bg-rose-500/5 text-rose-200',
      },
    },
    defaultVariants: { variant: 'info' },
  }
)

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  destructive: XCircle,
}

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
}

export function Alert({ className, variant = 'info', title, children, ...props }: AlertProps) {
  const Icon = icons[variant ?? 'info']
  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert" {...props}>
      <div className="flex gap-3">
        <Icon className="h-5 w-5 shrink-0" />
        <div className="flex-1">
          {title && <p className="font-semibold">{title}</p>}
          {children && <div className={cn(title && 'mt-1', 'text-sm opacity-90')}>{children}</div>}
        </div>
      </div>
    </div>
  )
}
