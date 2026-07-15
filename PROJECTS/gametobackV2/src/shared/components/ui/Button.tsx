import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
size?: 'sm' | 'md' | 'lg';
loading?: boolean;
fullWidth?: boolean;
icon?: React.ReactNode;
}
export function Button({
variant = 'primary',
size = 'md',
loading = false,
fullWidth = false,
icon,
className,
children,
disabled,
...props
}: ButtonProps) {
const baseClasses = twMerge(
clsx(
'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg',
'focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:ring-offset-2 focus:ring-offset-slate-950',
'disabled:opacity-50 disabled:pointer-events-none',
{
'bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30':
variant === 'primary',
'glass hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20':
variant === 'secondary',
'hover:bg-white/5 text-slate-400 hover:text-slate-200': variant === 'ghost',
'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20':
variant === 'destructive',
'px-3 py-1.5 text-sm': size === 'sm',
'px-4 py-2 text-base': size === 'md',
'px-6 py-3 text-lg': size === 'lg',
'w-full': fullWidth,
'cursor-wait': loading,
}
),
className
);
return (
<button className={baseClasses} disabled={disabled || loading} {...props}>
{loading ? (
<svg
className="animate-spin h-4 w-4 shrink-0"
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
<circle
className="opacity-25"
cx="12"
cy="12"
r="10"
stroke="currentColor"
strokeWidth="4"
/>
<path
className="opacity-75"
fill="currentColor"
d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
/>
</svg>
) : (
icon
)}
{children}
</button>
);
}