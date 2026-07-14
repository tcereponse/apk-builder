x
import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
size?: 'sm' | 'md' | 'lg';
children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
({ variant = 'primary', size = 'md', children, className, ...props }, ref) => {
const baseStyles = 'rounded-lg font-semibold transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]';

const variantStyles = {
primary: 'bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600',
secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600',
ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400',
danger: 'bg-red-500 text-white hover:bg-red-600'
};

const sizeStyles = {
sm: 'px-3 py-1.5 text-sm',
md: 'px-6 py-3 text-base',
lg: 'px-8 py-4 text-lg'
};

const classes = twMerge(clsx(
baseStyles,
variantStyles[variant],
sizeStyles[size],
className
));

return (
<button ref={ref} className={classes} {...props}>
{children}
</button>
);
}
);

Button.displayName = 'Button';