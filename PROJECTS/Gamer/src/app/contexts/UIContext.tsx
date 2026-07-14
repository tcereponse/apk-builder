x

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