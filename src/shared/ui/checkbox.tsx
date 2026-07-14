import { forwardRef, type InputHTMLAttributes } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../lib/utils'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, ...props }, ref) => (
    <span className="relative inline-flex h-5 w-5 items-center justify-center">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        className="peer absolute h-full w-full cursor-pointer opacity-0"
        {...props}
      />
      <span
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded border border-slate-600 bg-slate-950 transition peer-checked:border-cyan-500 peer-checked:bg-cyan-500 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-500',
          className
        )}
      >
        {checked && <Check className="h-3.5 w-3.5 text-slate-950" />}
      </span>
    </span>
  )
)
Checkbox.displayName = 'Checkbox'
