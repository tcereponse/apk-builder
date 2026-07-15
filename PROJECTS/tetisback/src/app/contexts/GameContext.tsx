import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameEngine } from '@/features/game/lib/GameEngine';
import { GameState } from '@/shared/types/game';
type GameAction = { type: 'MOVE_LEFT' } | { type: 'MOVE_RIGHT' } | { type: 'ROTATE' } | { type: 'SOFT_DROP' } | { type: 'HARD_DROP' } | { type: 'PAUSE' } | { type: 'RESET'; payload?: { zenMode?: boolean } } | { type: 'TICK' };
interface GameContextValue {
state: GameState;
dispatch: (action: GameAction) => void;
}
const GameContext = createContext<GameContextValue | null>(null);
export function GameProvider({ children }: { children: ReactNode }) {
const engine = React.useMemo(() => new GameEngine(), []);
const [state, setState] = React.useState<GameState>(engine.getState());
React.useEffect(() => {
engine.onStateChange((newState) => {
setState(newState);
});
}, [engine]);
const dispatch = (action: GameAction) => {
switch (action.type) {
case 'MOVE_LEFT': engine.moveLeft(); break;
case 'MOVE_RIGHT': engine.moveRight(); break;
case 'ROTATE': engine.rotate(); break;
case 'SOFT_DROP': engine.softDrop(); break;
case 'HARD_DROP': engine.hardDrop(); break;
case 'PAUSE': engine.togglePause(); break;
case 'RESET': engine.reset(action.payload); break;
case 'TICK': engine.tick(); break;
}
};
return (
<GameContext.Provider value={{ state, dispatch }}>
{children}
</GameContext.Provider>
);
}
export function useGame() {
const ctx = useContext(GameContext);
if (!ctx) throw new Error('useGame must be used within GameProvider');
return ctx;
}