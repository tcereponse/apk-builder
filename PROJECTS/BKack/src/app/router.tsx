x
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GameLayout } from './layouts/GameLayout';
import { PageLoader } from '@shared/components/PageLoader';

const MenuPage = lazy(() => import('@features/game/pages/MenuPage'));
const GamePage = lazy(() => import('@features/game/pages/GamePage'));
const GameOverPage = lazy(() => import('@features/game/pages/GameOverPage'));
const ScoresPage = lazy(() => import('@features/scores/pages/ScoresPage'));
const SettingsPage = lazy(() => import('@features/settings/pages/SettingsPage'));

export function AppRouter() {
return (
<Routes>
<Route path="/" element={<GameLayout />}>
<Route index element={
<Suspense fallback={<PageLoader />}>
<MenuPage />
</Suspense>
} />
<Route path="game" element={
<Suspense fallback={<PageLoader />}>
<GamePage />
</Suspense>
} />
<Route path="gameover" element={
<Suspense fallback={<PageLoader />}>
<GameOverPage />
</Suspense>
} />
<Route path="scores" element={
<Suspense fallback={<PageLoader />}>
<ScoresPage />
</Suspense>
} />
<Route path="settings" element={
<Suspense fallback={<PageLoader />}>
<SettingsPage />
</Suspense>
} />
</Route>
</Routes>
);
}