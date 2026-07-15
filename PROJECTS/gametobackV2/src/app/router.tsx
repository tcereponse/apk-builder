import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { LoadingScreen } from '@shared/components/ui/LoadingScreen';
const HomePage = lazy(() => import('@features/games/pages/HomePage'));
const FavoritesPage = lazy(() => import('@features/favorites/pages/FavoritesPage'));
const GameDetailPage = lazy(() => import('@features/games/pages/GameDetailPage'));
function AppRoutes() {
return (
<Routes>
<Route path="/" element={<MainLayout />}>
<Route
index
element={
<Suspense fallback={<LoadingScreen />}>
<HomePage />
</Suspense>
}
/>
<Route
path="favorites"
element={
<Suspense fallback={<LoadingScreen />}>
<FavoritesPage />
</Suspense>
}
/>
<Route
path="game/:id"
element={
<Suspense fallback={<LoadingScreen />}>
<GameDetailPage />
</Suspense>
}
/>
<Route path="*" element={<Navigate to="/" replace />} />
</Route>
</Routes>
);
}
export default AppRoutes;