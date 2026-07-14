import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import GameLayout from './layouts/GameLayout';
import Loader from '@shared/components/Loader';
const HomePage = lazy(() => import('@features/tetris/pages/HomePage'));
const GamePage = lazy(() => import('@features/tetris/pages/GamePage'));
const GameOverPage = lazy(() => import('@features/tetris/pages/GameOverPage'));
const StatsPage = lazy(() => import('@features/stats/pages/StatsPage'));
const SettingsPage = lazy(() => import('@features/settings/pages/SettingsPage'));
const NotFoundPage = lazy(() => import('@features/shared/pages/NotFoundPage'));
function AppRoutes() {
return (
<Suspense fallback={<Loader />}>
<Routes>
<Route path="/" element={<RootLayout />}>
<Route index element={<HomePage />} />
<Route path="stats" element={<StatsPage />} />
<Route path="settings" element={<SettingsPage />} />
</Route>
<Route path="/game" element={<GameLayout />}>
<Route index element={<GamePage />} />
<Route path="game-over" element={<GameOverPage />} />
</Route>
<Route path="*" element={<NotFoundPage />} />
</Routes>
</Suspense>
);
}
export default AppRoutes;