import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@app/contexts/GameContext';
import { useScore } from '@app/contexts/ScoreContext';
import { useStats } from '@app/contexts/StatsContext';
import Board from '../components/Board';
import NextPiece from '../components/NextPiece';
import ScoreBoard from '../components/ScoreBoard';
import Controls from '../components/Controls';
import { Pause, RotateCcw, Home } from 'lucide-react';
function GamePage() {
const navigate = useNavigate();
const { state, actions } = useGame();
const { saveHighScore } = useScore();
const { incrementGames, addTime, addLines, updateMaxLevel } = useStats();
const timerRef = useRef<number | null>(null);
const startTimeRef = useRef<number>(Date.now());
const handleTick = useCallback(() => {
actions.softDrop();
}, [actions]);
useEffect(() => {
if (state.isPlaying && !state.isPaused && !state.isGameOver) {
const interval = Math.max(50, 1000 - (state.level - 1) * 50);
timerRef.current = window.setInterval(handleTick, interval);
} else {
if (timerRef.current) {
clearInterval(timerRef.current);
timerRef.current = null;
}
}
return () => {
if (timerRef.current) {
clearInterval(timerRef.current);
timerRef.current = null;
}
};
}, [state.isPlaying, state.isPaused, state.isGameOver, state.level, handleTick]);
useEffect(() => {
const handleKeyDown = (e: KeyboardEvent) => {
if (state.isGameOver) return;
switch (e.key) {
case 'ArrowLeft':
e.preventDefault();
actions.moveLeft();
break;
case 'ArrowRight':
e.preventDefault();
actions.moveRight();
break;
case 'ArrowUp':
e.preventDefault();
actions.rotate();
break;
case 'ArrowDown':
e.preventDefault();
actions.softDrop();
break;
case ' ':
e.preventDefault();
actions.hardDrop();
break;
case 'p':
case 'P':
if (state.isPaused) {
actions.resume();
} else {
actions.pause();
}
break;
case 'r':
case 'R':
actions.restart();
break;
}
};
window.addEventListener('keydown', handleKeyDown);
return () => window.removeEventListener('keydown', handleKeyDown);
}, [actions, state.isPaused, state.isGameOver]);
useEffect(() => {
if (state.isGameOver && state.isPlaying === false) {
incrementGames();
const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
addTime(duration);
saveHighScore(state.score, state.level, state.lines, duration);
addLines(state.lines);
updateMaxLevel(state.level);
navigate('/game/game-over');
}
}, [state.isGameOver, state.isPlaying, state.score, state.level, state.lines, saveHighScore, addLines, updateMaxLevel, incrementGames, addTime, navigate]);
const handlePause = () => {
if (state.isPaused) {
actions.resume();
} else {
actions.pause();
}
};
const handleHome = () => {
if (timerRef.current) {
clearInterval(timerRef.current);
timerRef.current = null;
}
actions.restart();
navigate('/');
};
return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 py-4 gap-4">
      <div className="flex items-center justify-between w-full max-w-md">
        <button
          onClick={handleHome}
          className="p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Menu"
        >
          <Home size={24} />
        </button>
        <button
          onClick={handlePause}
          className="p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Pause"
        >
          <Pause size={24} />
        </button>
        <button
          onClick={actions.restart}
          className="p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Redémarrer"
        >
          <RotateCcw size={24} />
        </button>
      </div>      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start w-full justify-center">
        <div className="flex-shrink-0">
          <Board grid={state.grid} ghostY={state.ghostY} currentPiece={state.currentPiece} />
        </div>        <div className="flex flex-col gap-4 min-w-[120px]">
          <NextPiece piece={state.nextPiece} />
          <ScoreBoard score={state.score} level={state.level} lines={state.lines} />
        </div>
      </div><Controls
onMoveLeft={actions.moveLeft}
onMoveRight={actions.moveRight}
onRotate={actions.rotate}
onSoftDrop={actions.softDrop}
onHardDrop={actions.hardDrop}
/>
    </div>
  );
};
export default GamePage;