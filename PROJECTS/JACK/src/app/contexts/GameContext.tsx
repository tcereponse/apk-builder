x

import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { GameState, GameAction } from '@features/game/types/game'

const initialState: GameState = {
  score: 0,
  level: 1,
  lives: 3,
  status: 'idle',
  bricks: [],
  ball: { x: 400, y: 550, dx: 0, dy: 0, radius: 8, speed: 4 },
  paddle: { x: 350, y: 580, width: 120, height: 16 }
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INIT_GAME':
      return { ...initialState, status: 'idle' }
    case 'START_GAME':
      return { ...state, status: 'playing' }
    case 'PAUSE_GAME':
      return { ...state, status: 'paused' }
    case 'RESUME_GAME':
      return { ...state, status: 'playing' }
    case 'END_GAME':
      return { ...state, status: 'gameover' }
    case 'UPDATE_BALL':
      return { ...state, ball: action.payload }
    case 'UPDATE_PADDLE':
      return { ...state, paddle: action.payload }
    case 'DESTROY_BRICK':
      return { ...state, bricks: state.bricks.filter(b => b.id !== action.payload) }
    case 'ADD_SCORE':
      return { ...state, score: state.score + action.payload }
    case 'LOSE_LIFE':
      return { ...state, lives: state.lives - 1 }
    case 'NEXT_LEVEL':
      return { ...state, level: state.level + 1 }
    case 'RESET_GAME':
      return { ...initialState }
    default:
      return state
  }
}

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) throw new Error('useGame must be used within GameProvider')
  return context
}