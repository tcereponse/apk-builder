x

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { SettingsSchema, type Settings } from '@shared/types/schemas'

type SettingsAction =
  | { type: 'TOGGLE_SOUND' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_DIFFICULTY'; payload: Settings['difficulty'] }
  | { type: 'TOGGLE_VIBRATION' }
  | { type: 'LOAD_SETTINGS'; payload: Settings }

const defaultSettings: Settings = {
  soundEnabled: true,
  theme: 'dark',
  difficulty: 'normal',
  vibrationEnabled: true
}

function settingsReducer(state: Settings, action: SettingsAction): Settings {
  switch (action.type) {
    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled }
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' }
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload }
    case 'TOGGLE_VIBRATION':
      return { ...state, vibrationEnabled: !state.vibrationEnabled }
    case 'LOAD_SETTINGS':
      return SettingsSchema.parse(action.payload)
    default:
      return state
  }
}

interface SettingsContextType {
  settings: Settings
  toggleSound: () => void
  toggleTheme: () => void
  setDifficulty: (difficulty: Settings['difficulty']) => void
  toggleVibration: () => void
  loadSettings: (settings: Settings) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, dispatch] = useReducer(settingsReducer, defaultSettings)

  return (
    <SettingsContext.Provider value={{
      settings,
      toggleSound: () => dispatch({ type: 'TOGGLE_SOUND' }),
      toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
      setDifficulty: (difficulty) => dispatch({ type: 'SET_DIFFICULTY', payload: difficulty }),
      toggleVibration: () => dispatch({ type: 'TOGGLE_VIBRATION' }),
      loadSettings: (payload) => dispatch({ type: 'LOAD_SETTINGS', payload })
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) throw new Error('useSettings must be used within SettingsProvider')
  return context
}