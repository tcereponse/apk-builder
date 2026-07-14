Gestion d'État — TETRISArchitecture des Contexts (React Context API)AppProvider (src/app/contexts/AppProvider.tsx):
Wrapper central qui combine tous les contexts.
1. GameContext (@app/contexts/GameContext.tsx):
State:





{
  grid: Cell[][],
  currentPiece: Piece | null,
  nextPiece: Piece,
  score: number,
  level: number,
  lines: number,
  isPaused: boolean,
  isGameOver: boolean,
  isPlaying: boolean,
  ghostY: number // position de la pièce fantôme
}

Actions:





{
  moveLeft: () => void,
  moveRight: () => void,
  rotate: () => void,
  softDrop: () => void,
  hardDrop: () => void,
  pause: () => void,
  resume: () => void,
  restart: () => void,
  startGame: () => void
}

Implementation: useReducer avec un reducer pur qui délègue au Game Engine.

2. ScoreContext (@app/contexts/ScoreContext.tsx):
State:





{
  highScores: HighScore[],
  currentScore: number,
  currentLevel: number,
  currentLines: number,
  isNewRecord: boolean
}

Actions:





{
  updateScore: (score: number, level: number, lines: number) => void,
  saveHighScore: () => void,
  resetScores: () => void,
  getTopScores: () => HighScore[]
}

3. SettingsContext (@app/contexts/SettingsContext.tsx):
State:





{
  initialSpeed: 'normal' | 'fast' | 'expert',
  soundEnabled: boolean,
  vibrationEnabled: boolean
}

Actions:





{
  updateSettings: (settings: Partial<Settings>) => void,
  resetSettings: () => void
}

4. StatsContext (@app/contexts/StatsContext.tsx):
State:





{
  totalGames: number,
  totalTime: number,
  totalLines: number,
  maxLevel: number
}

Actions:





{
  incrementGames: () => void,
  addTime: (seconds: number) => void,
  addLines: (count: number) => void,
  updateMaxLevel: (level: number) => void,
  resetStats: () => void
}

Reducer Pattern (Game Engine)Game Reducer (features/tetris/hooks/gameReducer.ts):





type GameAction =
  | { type: 'TICK' }
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'ROTATE' }
  | { type: 'SOFT_DROP' }
  | { type: 'HARD_DROP' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESTART' }
  | { type: 'START' };
Reducer Logic:
TICK: Appelle engine.moveDown() et vérifie les lignes complétées

MOVE_LEFT/RIGHT: Appelle engine.moveHorizontal(dx)

ROTATE: Appelle engine.rotate()

SOFT_DROP: Appelle engine.moveDown() (une fois)

HARD_DROP: Appelle engine.hardDrop(), puis checkLines()

PAUSE/RESUME: Bascule l'état isPaused

RESTART: Réinitialise complet avec engine.reset()

Mécanisme de TimerHook: useGameLoop utilise requestAnimationFrame avec delta-time

Intervalle: 1000 / (level * 0.1 + 1) ms entre chaque tick

Pause: Le timer s'arrête si isPaused ou isGameOver

Cleanup: cancelAnimationFrame sur unmount

État Global vs LocalGlobal (Context): High scores, settings, stats (persistants)

Local (useState/useReducer): Game state volatile (non persisté)

Point de décision: Le Game State n'est pas persisté pour éviter la triche (restaurer une partie)

Performance (Memoization)useMemo sur les dérivés de state (ex: grille calculée)

React.memo sur tous les composants de rendu (Board, Cell, ScoreBoard)

useCallback sur toutes les actions passées aux enfants