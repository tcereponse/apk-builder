import { useEffect } from 'react';
import { useGame } from '@/app/contexts/GameContext';
export function useKeyboardControls() {
const { dispatch } = useGame();
useEffect(() => {
const handleKeyDown = (e: KeyboardEvent) => {
switch (e.key) {
case 'ArrowLeft': dispatch({ type: 'MOVE_LEFT' }); e.preventDefault(); break;
case 'ArrowRight': dispatch({ type: 'MOVE_RIGHT' }); e.preventDefault(); break;
case 'ArrowUp': dispatch({ type: 'ROTATE' }); e.preventDefault(); break;
case 'ArrowDown': dispatch({ type: 'SOFT_DROP' }); e.preventDefault(); break;
case ' ': dispatch({ type: 'HARD_DROP' }); e.preventDefault(); break;
case 'p':
case 'P': dispatch({ type: 'PAUSE' }); e.preventDefault(); break;
case 'r':
case 'R': dispatch({ type: 'RESET' }); e.preventDefault(); break;
default: break;
}
};
window.addEventListener('keydown', handleKeyDown);
return () => window.removeEventListener('keydown', handleKeyDown);
}, [dispatch]);
}