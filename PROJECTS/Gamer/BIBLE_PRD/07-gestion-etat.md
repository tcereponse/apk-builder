Gestion d'État — GAMER
Architecture des Contexts
Structure des Contexts
// src/app/contexts/index.ts
export { ThemeProvider, useTheme } from './ThemeContext'
export { UIProvider, useUI } from './UIContext'
export { AuthProvider, useAuth } from './AuthContext'
ThemeContext
// src/app/contexts/ThemeContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('gamer-theme') as Theme
    return saved || 'light'
  })
  
  useEffect(() => {
    localStorage.setItem('gamer-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
  
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
UIContext
// src/app/contexts/UIContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

interface UIState {
  isMenuOpen: boolean
  isModalOpen: boolean
  modalContent: ReactNode | null
  isScrolling: boolean
  activeSection: string
}

interface UIContextType extends UIState {
  toggleMenu: () => void
  closeMenu: () => void
  openModal: (content: ReactNode) => void
  closeModal: () => void
  setActiveSection: (section: string) => void
  setScrolling: (isScrolling: boolean) => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

const initialState: UIState = {
  isMenuOpen: false,
  isModalOpen: false,
  modalContent: null,
  isScrolling: false,
  activeSection: ''
}

export function UIProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UIState>(initialState)
  
  const toggleMenu = () => setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }))
  const closeMenu = () => setState(prev => ({ ...prev, isMenuOpen: false }))
  
  const openModal = (content: ReactNode) => setState(prev => ({ 
    ...prev, 
    isModalOpen: true, 
    modalContent: content 
  }))
  
  const closeModal = () => setState(prev => ({ 
    ...prev, 
    isModalOpen: false, 
    modalContent: null 
  }))
  
  const setActiveSection = (section: string) => setState(prev => ({ 
    ...prev, 
    activeSection: section 
  }))
  
  const setScrolling = (isScrolling: boolean) => setState(prev => ({ 
    ...prev, 
    isScrolling 
  }))
  
  return (
    <UIContext.Provider value={{ 
      ...state, 
      toggleMenu, 
      closeMenu, 
      openModal, 
      closeModal, 
      setActiveSection,
      setScrolling 
    }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (!context) throw new Error('useUI must be used within UIProvider')
  return context
}
AuthContext (Optionnel — pour V2)
// src/app/contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'
import { User } from '@/shared/types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  
  const login = async (email: string, password: string) => {
    // Simulation
    await new Promise(resolve => setTimeout(resolve, 1000))
    setUser({
      id: '1',
      email,
      username: email.split('@')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  }
  
  const logout = () => setUser(null)
  
  const register = async (data: RegisterData) => {
    // Simulation
    await new Promise(resolve => setTimeout(resolve, 1000))
    setUser({
      id: '2',
      email: data.email,
      username: data.username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  }
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout,
      register 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
Reducers Complexes (Optionnel)
Newsletter Reducer
// src/features/newsletter/hooks/useNewsletterState.ts
import { useReducer, useCallback } from 'react'

interface NewsletterState {
  email: string
  consent: boolean
  isLoading: boolean
  error: string | null
  success: boolean
}

type NewsletterAction = 
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_CONSENT'; payload: boolean }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; payload: string }
  | { type: 'RESET' }

const initialState: NewsletterState = {
  email: '',
  consent: false,
  isLoading: false,
  error: null,
  success: false
}

function newsletterReducer(state: NewsletterState, action: NewsletterAction): NewsletterState {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload, error: null }
    case 'SET_CONSENT':
      return { ...state, consent: action.payload }
    case 'SUBMIT_START':
      return { ...state, isLoading: true, error: null }
    case 'SUBMIT_SUCCESS':
      return { ...state, isLoading: false, success: true }
    case 'SUBMIT_ERROR':
      return { ...state, isLoading: false, error: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function useNewsletterState() {
  const [state, dispatch] = useReducer(newsletterReducer, initialState)
  
  const setEmail = useCallback((email: string) => {
    dispatch({ type: 'SET_EMAIL', payload: email })
  }, [])
  
  const setConsent = useCallback((consent: boolean) => {
    dispatch({ type: 'SET_CONSENT', payload: consent })
  }, [])
  
  const submit = useCallback(async (service: NewsletterService) => {
    dispatch({ type: 'SUBMIT_START' })
    try {
      await service.subscribe({ email: state.email, consent: state.consent })
      dispatch({ type: 'SUBMIT_SUCCESS' })
    } catch (error) {
      dispatch({ type: 'SUBMIT_ERROR', payload: error instanceof Error ? error.message : 'Erreur inconnue' })
    }
  }, [state.email, state.consent])
  
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])
  
  return { state, setEmail, setConsent, submit, reset }
}
State Management Guidelines
Règles d'Utilisation

Context pour état global : Thème, UI, Auth

useReducer pour état complexe : Newsletter, Formulaires

useState pour état local : Composants simples

Custom hooks pour logique réutilisable : Données, animations

Hiérarchie d'État
text
Global State (Context) → Feature State (useReducer) → Local State (useState)