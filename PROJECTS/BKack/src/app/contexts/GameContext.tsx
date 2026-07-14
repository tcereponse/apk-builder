x
import React, { createContext, useContext, useReducer, useMemo, ReactNode } from 'react';
import { GameState, GameStatus, gameStateSchema } from '@shared/types/game';
import { z } from 'zod';

type GameAction =
| { type: 'START_GAME' }
| { type: 'PAUSE_GAME' }
| { type: 'RESUME_GAME' }
| { type: 'END_GAME' }
| { type: 'RESET_GAME' }
| { type: 'UPDATE_SCORE'; payload: number }
| { type: 'LOSE_LIFE' }
| { type: 'NEXT_LEVEL' }
| { type: 'SET_BRICKS_DESTROYED'; payload: number }
| { type: 'SET_STATUS'; payload: GameStatus };

const initialState: GameState = {
score: 0,
lives: 3,
level: 1,
bricksDestroyed: 0,
status: 'idle'
};

function gameReducer(state: GameState, action: GameAction): GameState {
switch (action.type) {
case 'START_GAME':
return {
...state,
status: 'active',
score: 0,
lives: 3,
level: 1,
bricksDestroyed: 0
};
case 'PAUSE_GAME':
if (state.status === 'active') {
return { ...state, status: 'paused' };
}
return state;
case 'RESUME_GAME':
if (state.status === 'paused') {
return { ...state, status: 'active' };
}
return state;
case 'END_GAME':
return { ...state, status: 'gameover' };
case 'RESET_GAME':
return { ...initialState };
case 'UPDATE_SCORE':
return { ...state, score: state.score + action.payload };
case 'LOSE_LIFE': {
const newLives = state.lives - 1;
return {
...state,
lives: newLives,
status: newLives === 0 ? 'gameover' : state.status
};
}
case 'NEXT_LEVEL':
return {
...state,
level: state.level + 1,
bricksDestroyed: 0
};
case 'SET_BRICKS_DESTROYED':
return { ...state, bricksDestroyed: action.payload };
case 'SET_STATUS':
return { ...state, status: action.payload };
default:
return state;
}
}

interface GameContextType {
state: GameState;
actions: {
startGame: () => void;
pauseGame: () => void;
resumeGame: () => void;
endGame: () => void;
resetGame: () => void;
updateScore: (points: number) => void;
loseLife: () => void;
nextLevel: () => void;
setBricksDestroyed: (count: number) => void;
setStatus: (status: GameStatus) => void;
};
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
const [state, dispatch] = useReducer(gameReducer, initialState);

const actions = useMemo(() => ({
startGame: () => dispatch({ type: 'START_GAME' }),
pauseGame: () => dispatch({ type: 'PAUSE_GAME' }),
resumeGame: () => dispatch({ type: 'RESUME_GAME' }),
endGame: () => dispatch({ type: 'END_GAME' }),
resetGame: () => dispatch({ type: 'RESET_GAME' }),
updateScore: (points: number) => dispatch({ type: 'UPDATE_SCORE', payload: points }),
loseLife: () => dispatch({ type: 'LOSE_LIFE' }),
nextLevel: () => dispatch({ type: 'NEXT_LEVEL' }),
setBricksDestroyed: (count: number) => dispatch({ type: 'SET_BRICKS_DESTROYED', payload: count }),
setStatus: (status: GameStatus) => dispatch({ type: 'SET_STATUS', payload: status })
}), []);

const validatedState = gameStateSchema.parse(state);

return (
<GameContext.Provider value={{ state: validatedState, actions }}>
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