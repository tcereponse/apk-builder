x
import { HashRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { GameProvider } from './contexts/GameContext';
import { ScoreProvider } from './contexts/ScoreContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { UiProvider } from './contexts/UiContext';

function App() {
return (
<HashRouter>
<GameProvider>
<ScoreProvider>
<SettingsProvider>
<UiProvider>
<AppRouter />
</UiProvider>
</SettingsProvider>
</ScoreProvider>
</GameProvider>
</HashRouter>
);
}

export default App;