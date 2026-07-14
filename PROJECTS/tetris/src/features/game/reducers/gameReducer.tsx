import { GameState, GameAction } from '../types/game.types';
export function gameReducer(state: GameState, action: GameAction): GameState {
switch (action.type) {
case 'START_GAME':
return {
...state,
isPlaying: true,
gameOver: false,
paused: false,
board: Array(20).fill(null).map(() => Array(10).fill(0)),
score: 0,
level: 1,
lines: 0
};
case 'PAUSE_GAME':
return { ...state, paused: true };
case 'RESUME_GAME':
return { ...state, paused: false };
case 'MOVE_LEFT':
return state;
case 'MOVE_RIGHT':
return state;
case 'MOVE_DOWN':
return state;
case 'ROTATE_PIECE':
return state;
case 'DROP_PIECE':
return state;
case 'RESET_GAME':
return {
...state,
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
default:
return state;
}
}