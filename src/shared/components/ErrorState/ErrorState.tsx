import React from 'react';
import Button from '../Button/Button'; // Assuming Button component exists

export interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title,
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center p-8 text-center
        bg-red-50 dark:bg-gray-800 rounded-lg shadow-sm
        border border-red-200 dark:border-zinc-700
        text-red-700 dark:text-red-400
        ${className || ''}
      `}
    >
      <div className="mb-4 text-5xl">⚠️</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-4 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-4 bg-red-600 hover:bg-red-700 text-white">
          Retry
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
