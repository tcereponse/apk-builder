x
import React, { ReactNode } from 'react';
import { Button } from './Button';

interface Props {
children: ReactNode;
fallback?: ReactNode;
}

interface State {
hasError: boolean;
error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
constructor(props: Props) {
super(props);
this.state = { hasError: false, error: null };
}

static getDerivedStateFromError(error: Error): State {
return { hasError: true, error };
}

componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
console.error('ErrorBoundary caught:', error, errorInfo);
}

render() {
if (this.state.hasError) {
return this.props.fallback || (

<div className="flex flex-col items-center justify-center min-h-[60vh] p-8"> <div className="max-w-md text-center"> <div className="text-6xl mb-4">⚠️</div> <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2"> Oups ! Une erreur est survenue </h2> <p className="text-slate-600 dark:text-slate-400 mb-6"> {this.state.error?.message || 'Erreur inattendue'} </p> <Button onClick={() => window.location.reload()}> Recharger l'application </Button> </div> </div> ); }

return this.props.children;
}
}