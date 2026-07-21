import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  name: string;
  error?: string;
  className?: string;
}

export function Input({
  label,
  id,
  name,
  error,
  className,
  ...rest
}: InputProps) {
  return (
    <div className={`flex flex-col ${className || ''}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        className={`
          block w-full px-3 py-2 border rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500
          bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-zinc-600'}
          placeholder-gray-400 dark:placeholder-zinc-400
          disabled:bg-gray-100 dark:disabled:bg-zinc-800 disabled:opacity-75
        `}
        {...rest}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export default Input;
