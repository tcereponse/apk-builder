x

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'
import { ScoreSchema, type Score } from '@shared/types/schemas'
import { StorageService } from '@shared/services/storage'

type ScoresState = {
  scores: Score[]
  loading: boolean
  error: string | null
}

type ScoresAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Score[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADD_SCORE'; payload: Score }

const initialState: ScoresState = {
  scores: [],
  loading: true,
  error: null
}

function scoresReducer(state: ScoresState, action: ScoresAction): ScoresState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, scores: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'ADD_SCORE':
      return { ...state, scores: [action.payload, ...state.scores].slice(0, 50) }
    default:
      return state
  }
}

interface ScoresContextType {
  state: ScoresState
  addScore: (score: Score) => Promise<void>
  refreshScores: () => Promise<void>
}

const ScoresContext = createContext<ScoresContextType | undefined>(undefined)

const storage = new StorageService()

export function ScoresProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(scoresReducer, initialState)

  useEffect(() => {
    storage.init().then(() => refreshScores())
  }, [])

  async function refreshScores() {
    dispatch({ type: 'FETCH_START' })
    try {
      const scores = await storage.getTopScores()
      dispatch({ type: 'FETCH_SUCCESS', payload: scores })
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Impossible de charger les scores' })
    }
  }

  async function addScore(score: Score) {
    try {
      const validated = ScoreSchema.parse(score)
      await storage.saveScore(validated)
      dispatch({ type: 'ADD_SCORE', payload: validated })
    } catch (error) {
      console.error('Erreur sauvegarde score:', error)
    }
  }

  return (
    <ScoresContext.Provider value={{ state, addScore, refreshScores }}>
      {children}
    </ScoresContext.Provider>
  )
}

export function useScores() {
  const context = useContext(ScoresContext)
  if (!context) throw new Error('useScores must be used within ScoresProvider')
  return context
}