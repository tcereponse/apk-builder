import React, { useEffect, useRef } from 'react';
import { useGame } from '@/app/contexts/GameContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { PersistanceService } from '@/shared/services/PersistanceService';
import GameBoard from '../components/GameBoard';
import NextPiecePreview from '../components/NextPiecePreview';
import ScoreBoard from '../components/ScoreBoard';
import StatisticsDisplay from '../components/StatisticsDisplay';
import ThemeSelector from '../components/ThemeSelector';
import SoundToggle from '../components/SoundToggle';
import Controls from '../components/Controls';
import GameOverModal from '../components/GameOverModal';
export function GamePage() {
const { state, dispatch } = useGame();
const { theme } = useTheme();
const timerRef = useRef<number | null>(null);
useKeyboardControls();
useEffect(() => {
if (state.status === 'gameover') {
const current = PersistanceService.loadHighScore();
if (!current || state.score > current.score) {
PersistanceService.saveHighScore(state.score, state.lines, state.level);
}
}
}, [state.status, state.score, state.lines, state.level]);
useEffect(() => {
if (state.status === 'playing') {
const interval = setInterval(() => {
dispatch({ type: 'TICK' });
}, Math.max(50, 1000 / (state.level * 0.3 + 0.5)));
timerRef.current = interval;
return () => { if (timerRef.current) clearInterval(timerRef.current); };
} else {
if (timerRef.current) clearInterval(timerRef.current);
}
}, [state.status, state.level, dispatch]);
return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="flex flex-col items-center">
          <GameBoard grid={state.grid} ghostY={state.ghostY} currentPiece={state.currentPiece} />
        </div>
        <div className="flex flex-col gap-4">
          <NextPiecePreview piece={state.nextPiece} />
          <ScoreBoard score={state.score} level={state.level} lines={state.lines} />
          <StatisticsDisplay />
          <ThemeSelector />
          <SoundToggle />
          <Controls />
        </div>
      </div>
      {state.status === 'gameover' && <GameOverModal score={state.score} />}
    </div>
  );
}