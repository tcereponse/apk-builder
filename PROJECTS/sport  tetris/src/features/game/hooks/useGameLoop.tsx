import { useState, useEffect, useCallback, useRef } from 'react'
import {
BOARD_WIDTH,
BOARD_HEIGHT,
createEmptyBoard,
isValidPosition,
lockPiece,
clearFullRows,
getGhostPosition
} from '@shared/utils/board'
import { calculateScore, calculateLevel } from '@shared/utils/score'
import { TETROMINO_SHAPES } from '@shared/constants/tetrominos'
import { Position, TetrominoType, GameState, CellState } from '@shared/types'
const INITIAL_STATE: GameState = {
grid: createEmptyBoard(),
score: 0,
level: 1,
lines: 0,
gameOver: false,
isPaused: false,
currentPiece: null,
nextPiece: null
}
function getRandomTetrominoType(): TetrominoType {
const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']
return types[Math.floor(Math.random() * types.length)]
}
function createPiece(type: TetrominoType): {
type: TetrominoType
position: Position
rotation: number
} {
const shape = TETROMINO_SHAPES[type][0]
const startX = Math.floor((BOARD_WIDTH - shape[0].length) / 2)
return {
type,
position: { x: startX, y: 0 },
rotation: 0
}
}
export function useGameLoop() {
const [gameState, setGameState] = useState<GameState>(INITIAL_STATE)
const [isPlaying, setIsPlaying] = useState(false)
const dropIntervalRef = useRef<NodeJS.Timeout | null>(null)
const gameOverRef = useRef(false)
const isMountedRef = useRef(true)
const spawnNewPiece = useCallback((state: GameState): GameState => {
const nextType = state.nextPiece?.type || getRandomTetrominoType()
const piece = createPiece(nextType)
const shape = TETROMINO_SHAPES[piece.type]
if (!isValidPosition(state.grid, shape, piece.position, piece.rotation)) {
return {
...state,
gameOver: true,
currentPiece: null,
nextPiece: {
type: getRandomTetrominoType()
}
}
}
return {
...state,
currentPiece: piece,
nextPiece: {
type: getRandomTetrominoType()
}
}
}, [])
const lockCurrentPiece = useCallback((state: GameState): GameState => {
if (!state.currentPiece) return state
const { type, position, rotation } = state.currentPiece
const shape = TETROMINO_SHAPES[type]
const newGrid = lockPiece(state.grid, shape, position, rotation, type)
const { board: clearedBoard, linesCleared } = clearFullRows(newGrid)
const newLines = state.lines + linesCleared
const newLevel = calculateLevel(newLines)
const newScore = state.score + calculateScore(linesCleared, state.level)
const newState: GameState = {
...state,
grid: clearedBoard,
score: newScore,
level: newLevel,
lines: newLines,
currentPiece: null
}
return spawnNewPiece(newState)
}, [spawnNewPiece])
const movePiece = useCallback((dx: number, dy: number): void => {
setGameState((prev) => {
if (prev.gameOver || prev.isPaused || !prev.currentPiece) return prev
const { type, position, rotation } = prev.currentPiece
const shape = TETROMINO_SHAPES[type]
const newPosition = { x: position.x + dx, y: position.y + dy }
if (isValidPosition(prev.grid, shape, newPosition, rotation)) {
return {
...prev,
currentPiece: {
...prev.currentPiece,
position: newPosition
}
}
}
if (dy === 1) {
return lockCurrentPiece(prev)
}
return prev
})
}, [lockCurrentPiece])
const rotatePiece = useCallback((): void => {
setGameState((prev) => {
if (prev.gameOver || prev.isPaused || !prev.currentPiece) return prev
const { type, position, rotation } = prev.currentPiece
const shape = TETROMINO_SHAPES[type]
const newRotation = (rotation + 1) % 4
if (isValidPosition(prev.grid, shape, position, newRotation)) {
return {
...prev,
currentPiece: {
...prev.currentPiece,
rotation: newRotation
}
}
}
return prev
})
}, [])
const hardDrop = useCallback((): void => {
setGameState((prev) => {
if (prev.gameOver || prev.isPaused || !prev.currentPiece) return prev
const ghostPos = getGhostPosition(
prev.grid,
TETROMINO_SHAPES[prev.currentPiece.type],
prev.currentPiece.position,
prev.currentPiece.rotation
)
return lockCurrentPiece({
...prev,
currentPiece: {
...prev.currentPiece,
position: ghostPos
}
})
})
}, [lockCurrentPiece])
const togglePause = useCallback((): void => {
setGameState((prev) => ({
...prev,
isPaused: !prev.isPaused
}))
}, [])
const resetGame = useCallback((): void => {
setGameState(() => ({
...INITIAL_STATE,
grid: createEmptyBoard(),
nextPiece: {
type: getRandomTetrominoType()
}
}))
gameOverRef.current = false
}, [])
const startGame = useCallback((): void => {
resetGame()
setIsPlaying(true)
gameOverRef.current = false
}, [resetGame])
useEffect(() => {
if (gameState.gameOver) {
gameOverRef.current = true
if (dropIntervalRef.current) {
clearInterval(dropIntervalRef.current)
dropIntervalRef.current = null
}
}
}, [gameState.gameOver])
useEffect(() => {
if (isPlaying && !gameOverRef.current) {
if (dropIntervalRef.current) {
clearInterval(dropIntervalRef.current)
dropIntervalRef.current = null
}
const interval = setInterval(() => {
setGameState((prev) => {
if (prev.gameOver || prev.isPaused || !prev.currentPiece) return prev
const { type, position, rotation } = prev.currentPiece
const shape = TETROMINO_SHAPES[type]
const newPosition = { x: position.x, y: position.y + 1 }
if (isValidPosition(prev.grid, shape, newPosition, rotation)) {
return {
...prev,
currentPiece: {
...prev.currentPiece,
position: newPosition
}
}
}
return lockCurrentPiece(prev)
})
}, Math.max(100, 1000 - gameState.level * 80))
dropIntervalRef.current = interval
}
return () => {
if (dropIntervalRef.current) {
clearInterval(dropIntervalRef.current)
dropIntervalRef.current = null
}
}
}, [isPlaying, gameState.isPaused, gameState.level, lockCurrentPiece])
useEffect(() => {
if (gameState.currentPiece === null && !gameState.gameOver && isPlaying) {
setGameState((prev) => spawnNewPiece(prev))
}
}, [gameState.currentPiece, gameState.gameOver, isPlaying, spawnNewPiece])
useEffect(() => {
isMountedRef.current = true
const handleKeyDown = (e: KeyboardEvent) => {
if (!isPlaying || !isMountedRef.current) return
switch (e.key) {
case 'ArrowLeft':
e.preventDefault()
movePiece(-1, 0)
break
case 'ArrowRight':
e.preventDefault()
movePiece(1, 0)
break
case 'ArrowDown':
e.preventDefault()
movePiece(0, 1)
break
case 'ArrowUp':
e.preventDefault()
rotatePiece()
break
case ' ':
e.preventDefault()
hardDrop()
break
case 'p':
case 'P':
togglePause()
break
case 'r':
case 'R':
resetGame()
break
default:
break
}
}
window.addEventListener('keydown', handleKeyDown)
return () => {
isMountedRef.current = false
window.removeEventListener('keydown', handleKeyDown)
}
}, [isPlaying, movePiece, rotatePiece, hardDrop, togglePause, resetGame])
return {
gameState,
isPlaying,
startGame,
resetGame,
togglePause,
movePiece,
rotatePiece,
hardDrop
}
}