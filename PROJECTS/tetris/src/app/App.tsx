x
import { HashRouter } from 'react-router-dom';
import { GameProvider } from '../features/game/contexts/GameContext';
import AppRoutes from './router';
function App() {
return (
<HashRouter>
<GameProvider>
<AppRoutes />
</GameProvider>
</HashRouter>
);
}
export default App;