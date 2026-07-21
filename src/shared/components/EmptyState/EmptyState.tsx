import React from 'react';
import Button from '../Button/Button'; // Assuming Button component exists

export interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  title,
  message,
  icon,
  actionButton,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center p-8 text-center
        bg-white dark:bg-gray-800 rounded-lg shadow-sm
        border border-gray-200 dark:border-zinc-700
        ${className || ''}
      `}
    >
      {icon && <div className="mb-4 text-gray-400 dark:text-zinc-500 text-5xl">{icon}</div>}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">{message}</p>
      {actionButton && (
        <Button onClick={actionButton.onClick} className="mt-4">
          {actionButton.label}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
