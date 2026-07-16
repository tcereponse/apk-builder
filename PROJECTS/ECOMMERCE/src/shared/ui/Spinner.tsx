import { cn } from '@shared/utils/format';

interface SpinnerProps {
 size?: 'sm' | 'md' | 'lg';
 className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
 const sizes = {
 sm: 'w-5 h-5 border-2',
 md: 'w-8 h-8 border-3',
 lg: 'w-12 h-12 border-4',
 };
 return (
 <div
 className={cn(
 'animate-spin rounded-full border-t-transparent border-primary',
 sizes[size],
 className
 )}
 />
 );
}