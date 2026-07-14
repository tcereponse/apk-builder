x
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameAction, GameContextType } from '../types/game.types';
import { gameReducer } from '../reducers/gameReducer';
const initialState: GameState = {
board: Array(20).fill(null).map(() => Array(10).fill(0)),
currentPiece: null,
nextPiece: null,
score: 0,
level: 1,
lines: 0,
gameOver: false,
paused: false,
isPlaying: false
};
const GameContext = createContext<GameContextType | undefined>(undefined);
export function GameProvider({ children }: { children: ReactNode }) {
const [state, dispatch] = useReducer(gameReducer, initialState);
const actions = {
startGame: () => dispatch({ type: 'START_GAME' }),
pauseGame: () => dispatch({ type: 'PAUSE_GAME' }),
resumeGame: () => dispatch({ type: 'RESUME_GAME' }),
moveLeft: () => dispatch({ type: 'MOVE_LEFT' }),
moveRight: () => dispatch({ type: 'MOVE_RIGHT' }),
moveDown: () => dispatch({ type: 'MOVE_DOWN' }),
rotatePiece: () => dispatch({ type: 'ROTATE_PIECE' }),
dropPiece: () => dispatch({ type: 'DROP_PIECE' }),
resetGame: () => dispatch({ type: 'RESET_GAME' })
};
const contextValue: GameContextType = {
state,
...actions
};
return (
<GameContext.Provider value={contextValue}>
{children}
</GameContext.Provider>
);
}
export function useGame() {
const context = useContext(GameContext);
if (!context) {
throw new Error('useGame must be used within a GameProvider');
}
return context;
}
export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Board = Cell[][];
export interface Position {
row: number;
col: number;
}
export interface Piece {
shape: number[][];
color: number;
position: Position;
}
export interface GameState {
board: Board;
currentPiece: Piece | null;
nextPiece: Piece | null;
score: number;
level: number;
lines: number;
gameOver: boolean;
paused: boolean;
isPlaying: boolean;
}
export type GameAction =
| { type: 'START_GAME' }
| { type: 'PAUSE_GAME' }
| { type: 'RESUME_GAME' }
| { type: 'MOVE_LEFT' }
| { type: 'MOVE_RIGHT' }
| { type: 'MOVE_DOWN' }
| { type: 'ROTATE_PIECE' }
| { type: 'DROP_PIECE' }
| { type: 'RESET_GAME' };
export interface GameContextType {
state: GameState;
startGame: () => void;
pauseGame: () => void;
resumeGame: () => void;
moveLeft: () => void;
moveRight: () => void;
moveDown: () => void;
rotatePiece: () => void;
dropPiece: () => void;
resetGame: () => void;
}