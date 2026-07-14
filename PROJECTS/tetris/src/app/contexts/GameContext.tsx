import { createContext, useContext, useReducer, ReactNode, useCallback, useMemo } from 'react';
import { GameState, GameAction, GameContextType } from '@shared/types/game.types';
import { createGame, moveHorizontal, rotatePiece, moveDown, hardDrop, getGhostY, togglePause } from '@shared/lib/game-engine';
const initialState: GameState = {
grid: [],
currentPiece: null,
nextPiece: null,
score: 0,
level: 1,
lines: 0,
isPaused: false,
isGameOver: false,
isPlaying: false,
ghostY: 0
};
const GameContext = createContext<GameContextType | undefined>(undefined);
function gameReducer(state: GameState, action: GameAction): GameState {
switch (action.type) {
case 'START': {
const engine = createGame();
return {
...state,
...engine,
isPlaying: true,
isGameOver: false,
isPaused: false
};
}
case 'TICK': {
if (state.isPaused || state.isGameOver || !state.isPlaying) return state;
const result = moveDown(state);
return {
...result,
ghostY: getGhostY(result)
};
}
case 'MOVE_LEFT': {
if (state.isPaused || state.isGameOver || !state.isPlaying) return state;
const result = moveHorizontal(state, -1);
return {
...result,
ghostY: getGhostY(result)
};
}
case 'MOVE_RIGHT': {
if (state.isPaused || state.isGameOver || !state.isPlaying) return state;
const result = moveHorizontal(state, 1);
return {
...result,
ghostY: getGhostY(result)
};
}
case 'ROTATE': {
if (state.isPaused || state.isGameOver || !state.isPlaying) return state;
const result = rotatePiece(state);
return {
...result,
ghostY: getGhostY(result)
};
}
case 'SOFT_DROP': {
if (state.isPaused || state.isGameOver || !state.isPlaying) return state;
const result = moveDown(state);
return {
...result,
ghostY: getGhostY(result)
};
}
case 'HARD_DROP': {
if (state.isPaused || state.isGameOver || !state.isPlaying) return state;
const result = hardDrop(state);
return {
...result,
ghostY: getGhostY(result)
};
}
case 'PAUSE': {
return togglePause(state);
}
case 'RESUME': {
return togglePause(state);
}
case 'RESTART': {
const engine = createGame();
return {
...state,
...engine,
isPlaying: true,
isGameOver: false,
isPaused: false
};
}
default:
return state;
}
}
export function GameProvider({ children }: { children: ReactNode }) {
const [state, dispatch] = useReducer(gameReducer, initialState);
const startGame = useCallback(() => {
dispatch({ type: 'START' });
}, []);
const moveLeft = useCallback(() => {
dispatch({ type: 'MOVE_LEFT' });
}, []);
const moveRight = useCallback(() => {
dispatch({ type: 'MOVE_RIGHT' });
}, []);
const rotate = useCallback(() => {
dispatch({ type: 'ROTATE' });
}, []);
const softDrop = useCallback(() => {
dispatch({ type: 'SOFT_DROP' });
}, []);
const hardDrop = useCallback(() => {
dispatch({ type: 'HARD_DROP' });
}, []);
const pause = useCallback(() => {
dispatch({ type: 'PAUSE' });
}, []);
const resume = useCallback(() => {
dispatch({ type: 'RESUME' });
}, []);
const restart = useCallback(() => {
dispatch({ type: 'RESTART' });
}, []);
const value = useMemo<GameContextType>(() => ({
state,
actions: {
startGame,
moveLeft,
moveRight,
rotate,
softDrop,
hardDrop,
pause,
resume,
restart
}
}), [state, startGame, moveLeft, moveRight, rotate, softDrop, hardDrop, pause, resume, restart]);
return (
<GameContext.Provider value={value}>
{children}
</GameContext.Provider>
);
}
export function useGame() {
const context = useContext(GameContext);
if (!context) {
throw new Error('useGame must be used within GameProvider');
}
return context;
}