import { useEffect, useRef, useCallback } from 'react';
import { useGame } from '../contexts/GameContext';
export function useGameLoop() {
const { state, moveDown } = useGame();
const intervalRef = useRef<number | null>(null);
const getSpeed = useCallback(() => {
return Math.max(100, 1000 - (state.level - 1) * 80);
}, [state.level]);
useEffect(() => {
if (state.isPlaying && !state.paused && !state.gameOver) {
intervalRef.current = setInterval(() => {
moveDown();
}, getSpeed());
}
return () => {
if (intervalRef.current) {
clearInterval(intervalRef.current);
intervalRef.current = null;
}
};
}, [state.isPlaying, state.paused, state.gameOver, moveDown, getSpeed]);
}