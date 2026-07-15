import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
label?: string;
error?: string;
icon?: React.ReactNode;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
({ label, error, icon, className, id, ...props }, ref) => {
const inputId = id || label?.toLowerCase().replace(/\s/g, '-');
const classes = twMerge(
clsx(
'w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-slate-200',
'placeholder:text-zinc-500 transition-all duration-200',
'focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-transparent',
'disabled:opacity-50 disabled:pointer-events-none',
error && 'border-red-400/50 focus:ring-red-400/40',
icon && 'pl-10'
),
className
);
return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={classes}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);Input.displayName = 'Input';