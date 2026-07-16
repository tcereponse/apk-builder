import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@shared/utils/format';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
 ({ className, ...props }, ref) => {
 return (
 <input
 ref={ref}
 className={cn('input-field w-full', className)}
 {...props}
 />
 );
 }
);

Input.displayName = 'Input';