import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
variant?: 'glass' | 'dark' | 'default';
padding?: 'none' | 'sm' | 'md' | 'lg';
hover?: boolean;
}
export function Card({
variant = 'glass',
padding = 'md',
hover = true,
className,
children,
...props
}: CardProps) {
const variantClasses = {
glass: 'glass glass-hover',
dark: 'bg-zinc-900/80 border border-white/5',
default: 'bg-zinc-900/50 border border-white/5',
};
const paddingClasses = {
none: 'p-0',
sm: 'p-3',
md: 'p-4',
lg: 'p-6',
};
const classes = twMerge(
clsx(
'rounded-xl transition-all duration-300',
variantClasses[variant],
paddingClasses[padding],
hover && 'hover:shadow-glass-lg hover:border-white/15'
),
className
);
return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}