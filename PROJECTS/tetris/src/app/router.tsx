x
import { Routes, Route } from 'react-router-dom';
import { GamePage } from '../features/game/pages/GamePage';
import { HomePage } from '../features/home/pages/HomePage';
function AppRoutes() {
return (
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/game" element={<GamePage />} />
</Routes>
);
}
export default AppRoutes;