# GESTION D'ÉTAT — BKACK

## 🏛️ Architecture d'État

### Principes
1. **État global** → React Context
2. **État local** → useState/useReducer
3. **État complexe** → useReducer (Game Loop)
4. **Séparation** → Data (Domain) / UI (Presentation)

---

## 📦 Contextes

### 1. GameContext (État de Jeu Global)
// app/contexts/GameContext.tsx
export interface GameContextType {
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
  };
}

export const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const actions = useMemo(() => ({
    startGame: () => dispatch({ type: 'START_GAME' }),
    pauseGame: () => dispatch({ type: 'PAUSE_GAME' }),
    resumeGame: () => dispatch({ type: 'RESUME_GAME' }),
    endGame: () => dispatch({ type: 'END_GAME' }),
    resetGame: () => dispatch({ type: 'RESET_GAME' }),
    updateScore: (points: number) => dispatch({ type: 'UPDATE_SCORE', payload: points }),
    loseLife: () => dispatch({ type: 'LOSE_LIFE' }),
    nextLevel: () => dispatch({ type: 'NEXT_LEVEL' })
  }), []);

  return (
    <GameContext.Provider value={{ state, actions }}>
      {children}
    </GameContext.Provider>
  );
};
2. ScoreContext (Gestion des Scores)
export interface ScoreContextType {
  scores: Score[];
  topScore: number;
  actions: {
    addScore: (score: Score) => void;
    loadScores: () => Promise<void>;
    clearScores: () => void;
  };
}
3. SettingsContext (Paramètres Utilisateur)
export interface SettingsContextType {
  settings: Settings;
  actions: {
    updateSettings: (newSettings: Partial<Settings>) => void;
    toggleSound: () => void;
    toggleVibration: () => void;
    toggleTheme: () => void;
  };
}
4. UiContext (État UI)
export interface UiContextType {
  isMobile: boolean;
  showModal: boolean;
  modalContent: React.ReactNode | null;
  actions: {
    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;
  };
}
🔄 Reducers
Game Reducer
type GameAction =
  | { type: 'START_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'UPDATE_SCORE'; payload: number }
  | { type: 'LOSE_LIFE' }
  | { type: 'NEXT_LEVEL' };

const gameReducer = (state: GameState, action: GameAction): GameState => {
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
      return { ...state, status: 'paused' };
    case 'RESUME_GAME':
      return { ...state, status: 'active' };
    case 'END_GAME':
      return { ...state, status: 'gameover' };
    case 'UPDATE_SCORE':
      return { ...state, score: state.score + action.payload };
    case 'LOSE_LIFE':
      const newLives = state.lives - 1;
      return {
        ...state,
        lives: newLives,
        status: newLives === 0 ? 'gameover' : state.status
      };
    case 'NEXT_LEVEL':
      return {
        ...state,
        level: state.level + 1,
        bricksDestroyed: 0
      };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
};
🎣 Hooks Personnalisés
useGame
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
useScore
export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) throw new Error('useScore must be used within ScoreProvider');
  return context;
};
useSettings
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
useLocalStorage
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};
📊 État Global (App)
// App.tsx
const App = () => {
  return (
    <HashRouter>
      <GameProvider>
        <ScoreProvider>
          <SettingsProvider>
            <UiProvider>
              <AppRouter />
            </UiProvider>
          </SettingsProvider>
        </ScoreProvider>
      </GameProvider>
    </HashRouter>
  );
};
🎯 Règles d'État

Unidirectionnel : Les actions dispatchent → state mis à jour → UI réactive

Immuable : Le state ne se modifie jamais directement

Centralisé : Un Context par domaine métier

Persistant : Settings + Scores → sauvegardés en IndexedDB

Transient : GameState → stocké en mémoire uniquement

text

---

## 📋 BIBLE_