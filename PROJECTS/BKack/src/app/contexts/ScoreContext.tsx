x
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Score, scoreSchema } from '@shared/types/game';
import { StorageService } from '@shared/services/StorageService';

interface ScoreContextType {
scores: Score[];
topScore: number;
isLoading: boolean;
actions: {
addScore: (score: Score) => Promise<void>;
loadScores: () => Promise<void>;
clearScores: () => Promise<void>;
};
}

const ScoreContext = createContext<ScoreContextType | null>(null);
const storage = new StorageService();

export function ScoreProvider({ children }: { children: ReactNode }) {
const [scores, setScores] = useState<Score[]>([]);
const [isLoading, setIsLoading] = useState(false);

const loadScores = useCallback(async () => {
setIsLoading(true);
try {
await storage.init();
const loaded = await storage.getTopScores(10);
setScores(loaded);
} catch (error) {
console.error('Failed to load scores:', error);
} finally {
setIsLoading(false);
}
}, []);

const addScore = useCallback(async (score: Score) => {
try {
await storage.init();
const validatedScore = scoreSchema.parse(score);
await storage.saveScore(validatedScore);
await loadScores();
} catch (error) {
console.error('Failed to save score:', error);
}
}, [loadScores]);

const clearScores = useCallback(async () => {
try {
await storage.init();
await storage.clearScores();
setScores([]);
} catch (error) {
console.error('Failed to clear scores:', error);
}
}, []);

const topScore = scores.length > 0 ? scores[0].score : 0;

return (
<ScoreContext.Provider value={{
scores,
topScore,
isLoading,
actions: { addScore, loadScores, clearScores }
}}>
{children}
</ScoreContext.Provider>
);
}

export function useScores() {
const context = useContext(ScoreContext);
if (!context) {
throw new Error('useScores must be used within ScoreProvider');
}
return context;
}