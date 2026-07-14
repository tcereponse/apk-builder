import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import AppRouter from './router';
import { AppProvider } from './contexts/AppContext';

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center bg-red-50">
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-red-600">Erreur Critique</h2>
      <p className="mt-2 text-gray-700">{error.message}</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppProvider>
        <HashRouter>
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Chargement...</div>}>
            <AppRouter />
          </Suspense>
        </HashRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;