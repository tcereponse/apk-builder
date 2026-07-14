x
import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface EmptyStateProps {
title: string;
description?: string;
icon?: ReactNode;
action?: ReactNode;
className?: string;
}

export function EmptyState({
title,
description,
icon,
action,
className
}: EmptyStateProps) {
return (

<div className={clsx( 'flex flex-col items-center justify-center p-8 text-center min-h-[40vh]', className )}> {icon && ( <div className="text-6xl mb-4 opacity-50"> {icon} </div> )} <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2"> {title} </h3> {description && ( <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6"> {description} </p> )} {action} </div> ); }