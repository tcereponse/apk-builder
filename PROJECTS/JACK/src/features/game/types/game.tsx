export interface Brick {
  id: string
  x: number
  y: number
  width: number
  height: number
  color: string
  points: number
  hits: number
  maxHits: number
}

export interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  speed: number
}

export interface Paddle {
  x: number
  y: number
  width: number
  height: number
}

export interface GameState {
  score: number
  level: number
  lives: number
  status: 'idle' | 'playing' | 'paused' | 'gameover' | 'victory'
  bricks: Brick[]
  ball: Ball
  paddle: Paddle
}

export type GameAction =
  | { type: 'INIT_GAME' }
  | { type: 'START_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'END_GAME' }
  | { type: 'UPDATE_BALL'; payload: Ball }
  | { type: 'UPDATE_PADDLE'; payload: Paddle }
  | { type: 'DESTROY_BRICK'; payload: string }
  | { type: 'ADD_SCORE'; payload: number }
  | { type: 'LOSE_LIFE' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'RESET_GAME' }

export interface LevelConfig {
  rows: number
  cols: number
  brickWidth: number
  brickHeight: number
  brickPadding: number
  brickOffsetTop: number
  brickOffsetLeft: number
}