import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Stats, StatsContextType } from '@shared/types/game.types';
import { localStorageService } from '@shared/services/localStorage.service';
const defaultStats: Stats = {
totalGames: 0,
totalTime: 0,
totalLines: 0,
maxLevel: 1
};
const StatsContext = createContext<StatsContextType | undefined>(undefined);
export function StatsProvider({ children }: { children: ReactNode }) {
const [stats, setStats] = useState<Stats>(() =>
localStorageService.getStats() || defaultStats
);
const incrementGames = useCallback(() => {
setStats(prev => {
const updated = { ...prev, totalGames: prev.totalGames + 1 };
localStorageService.saveStats(updated);
return updated;
});
}, []);
const addTime = useCallback((seconds: number) => {
setStats(prev => {
const updated = { ...prev, totalTime: prev.totalTime + seconds };
localStorageService.saveStats(updated);
return updated;
});
}, []);
const addLines = useCallback((count: number) => {
setStats(prev => {
const updated = { ...prev, totalLines: prev.totalLines + count };
localStorageService.saveStats(updated);
return updated;
});
}, []);
const updateMaxLevel = useCallback((level: number) => {
setStats(prev => {
if (level <= prev.maxLevel) return prev;
const updated = { ...prev, maxLevel: level };
localStorageService.saveStats(updated);
return updated;
});
}, []);
const resetStats = useCallback(() => {
setStats(defaultStats);
localStorageService.clearStats();
}, []);
const value: StatsContextType = {
stats,
incrementGames,
addTime,
addLines,
updateMaxLevel,
resetStats
};
return (
<StatsContext.Provider value={value}>
{children}
</StatsContext.Provider>
);
}
export function useStats() {
const context = useContext(StatsContext);
if (!context) {
throw new Error('useStats must be used within StatsProvider');
}
return context;
}