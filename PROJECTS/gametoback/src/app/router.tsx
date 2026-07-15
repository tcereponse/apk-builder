import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './layouts/Layout';

const HomePage = lazy(() => import('@features/games/pages/HomePage'));
const GameDetailPage = lazy(() => import('@features/games/pages/GameDetailPage'));

export function AppRouter() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-diamond-base">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-diamond-border border-t-diamond-text" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="game/:id" element={<GameDetailPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}