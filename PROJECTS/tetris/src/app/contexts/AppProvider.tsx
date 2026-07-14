import { ReactNode } from 'react';
import { GameProvider } from './GameContext';
import { ScoreProvider } from './ScoreContext';
import { SettingsProvider } from './SettingsContext';
import { StatsProvider } from './StatsContext';
interface AppProviderProps {
children: ReactNode;
}
export function AppProvider({ children }: AppProviderProps) {
return (
<SettingsProvider>
<ScoreProvider>
<StatsProvider>
<GameProvider>
{children}
</GameProvider>
</StatsProvider>
</ScoreProvider>
</SettingsProvider>
);
}