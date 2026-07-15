import { HashRouter } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppRoutes from './router';
function App() {
return (
<ThemeProvider>
<GameProvider>
<HashRouter>
<AppRoutes />
</HashRouter>
</GameProvider>
</ThemeProvider>
);
}
export default App;