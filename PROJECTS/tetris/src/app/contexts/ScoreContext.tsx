import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { HighScore, ScoreContextType } from '@shared/types/game.types';
import { localStorageService } from '@shared/services/localStorage.service';
const ScoreContext = createContext<ScoreContextType | undefined>(undefined);
export function ScoreProvider({ children }: { children: ReactNode }) {
const [highScores, setHighScores] = useState<HighScore[]>(() =>
localStorageService.getHighScores()
);
const [isNewRecord, setIsNewRecord] = useState(false);
const saveHighScore = useCallback((score: number, level: number, lines: number, duration: number) => {
const newScore: HighScore = {
score,
level,
lines,
date: new Date().toISOString(),
duration
};
const updated = [...highScores, newScore]
.sort((a, b) => b.score - a.score)
.slice(0, 5);
const record = highScores.length === 0 || score > highScores[0]?.score;
setIsNewRecord(record);
setHighScores(updated);
localStorageService.saveHighScores(updated);
}, [highScores]);
const resetScores = useCallback(() => {
setHighScores([]);
localStorageService.clearHighScores();
setIsNewRecord(false);
}, []);
const value: ScoreContextType = {
highScores,
isNewRecord,
saveHighScore,
resetScores
};
return (
<ScoreContext.Provider value={value}>
{children}
</ScoreContext.Provider>
);
}
export function useScore() {
const context = useContext(ScoreContext);
if (!context) {
throw new Error('useScore must be used within ScoreProvider');
}
return context;
}