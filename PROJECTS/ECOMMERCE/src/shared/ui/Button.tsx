import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@shared/utils/format';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: 'primary' | 'secondary' | 'accent';
 size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
 ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
 const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
 const variants = {
 primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary-light',
 secondary: 'bg-secondary text-white hover:bg-secondary-light',
 accent: 'bg-accent text-white hover:bg-accent-light',
 };
 const sizes = {
 sm: 'px-3 py-1.5 text-sm',
 md: 'px-4 py-2 text-base',
 lg: 'px-6 py-3 text-lg',
 };
 return (
 <button
 ref={ref}
 className={cn(base, variants[variant], sizes[size], className)}
 {...props}
 />
 );
 }
);

Button.displayName = 'Button';