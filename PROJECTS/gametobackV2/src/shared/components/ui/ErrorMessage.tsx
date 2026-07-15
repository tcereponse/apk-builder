import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
export interface ErrorMessageProps {
title?: string;
message?: string;
onRetry?: () => void;
retryLabel?: string;
fullPage?: boolean;
}
export function ErrorMessage({
title = 'Une erreur est survenue',
message = 'Impossible de charger les données. Veuillez réessayer.',
onRetry,
retryLabel = 'Réessayer',
fullPage = false,
}: ErrorMessageProps) {
const content = (
    <div className="flex flex-col items-center justify-center gap-3 text-center p-6">
      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
        <AlertCircle className="w-6 h-6 text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm">{message}</p>
      {onRetry && (
        <Button
          variant="secondary"
          icon={<RefreshCw className="w-4 h-4" />}
          onClick={onRetry}
          className="mt-2"
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );if (fullPage) {
return (
      <div className="flex-1 min-h-[60vh] flex items-center justify-center">
        {content}
      </div>
    );
  }return content;
}