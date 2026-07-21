import React from 'react';

export interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({
  title,
  description,
  children,
  className,
  onClick,
}: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 
        border border-gray-200 dark:border-zinc-700
        ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200' : ''}
        ${className || ''}
      `}
      onClick={onClick}
    >
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      )}
      <div>{children}</div>
    </div>
  );
}

export default Card;
