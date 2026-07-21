import React from 'react';

export interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'info';
  className?: string;
  children?: React.ReactNode;
}

export function Badge({
  label,
  variant = 'info',
  className,
  children,
}: BadgeProps) {
  const variantClasses = {
    primary:
      'bg-gray-200 text-gray-800 dark:bg-zinc-700 dark:text-zinc-200',
    secondary:
      'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
    success:
      'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100',
    danger:
      'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100',
    info:
      'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100',
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
        ${variantClasses[variant]}
        ${className || ''}
      `}
    >
      {children || label}
    </span>
  );
}

export default Badge;
