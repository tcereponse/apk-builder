import { Routes, Route } from 'react-router-dom';
import { GamePage } from '@/features/game/pages/GamePage';
export default function AppRoutes() {
return (
<Routes>
<Route path="/" element={<GamePage />} />
</Routes>
);
}