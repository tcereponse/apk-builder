import React, { useState, useEffect, useCallback, useRef } from 'react'
const COLS = 10
const ROWS = 20
const BLOCK_SIZE = 30
const SHAPES = [
[[1, 1, 1, 1]],
[[1, 1], [1, 1]],
[[1, 1, 0], [0, 1, 1]],
[[0, 1, 1], [1, 1, 0]],
[[1, 1, 1], [0, 1, 0]],
[[1, 1, 1], [1, 0, 0]],
[[1, 1, 1], [0, 0, 1]]
]
const COLORS = [
'#00f0f0', '#f0f000', '#a000f0', '#0000f0',
'#f0a000', '#00f000', '#f00000'
]
const Tetris = () => {
const [board, setBoard] = useState<number[][]>([])
const [score, setScore] = useState(0)
const [gameOver, setGameOver] = useState(false)
const [isPaused, setIsPaused] = useState(false)
const [currentPiece, setCurrentPiece] = useState<{
shape: number[][]
color: number
x: number
y: number
} | null>(null)
const gameLoopRef = useRef<number | null>(null)
const dropInterval = 500
const createBoard = useCallback(() => {
return Array(ROWS).fill(null).map(() => Array(COLS).fill(0))
}, [])
const getRandomPiece = useCallback(() => {
const idx = Math.floor(Math.random() * SHAPES.length)
return {
shape: SHAPES[idx],
color: idx,
x: Math.floor((COLS - SHAPES[idx][0].length) / 2),
y: 0
}
}, [])
const isValidPosition = useCallback((shape: number[][], x: number, y: number) => {
for (let row = 0; row < shape.length; row++) {
for (let col = 0; col < shape[row].length; col++) {
if (shape[row][col]) {
const newX = x + col
const newY = y + row
if (newX < 0 || newX >= COLS || newY >= ROWS || newY < 0) {
return false
}
if (newY >= 0 && board[newY] && board[newY][newX] !== 0) {
return false
}
}
}
}
return true
}, [board])
const lockPiece = useCallback(() => {
if (!currentPiece) return
const { shape, color, x, y } = currentPiece
const newBoard = board.map(row => [...row])
for (let row = 0; row < shape.length; row++) {
for (let col = 0; col < shape[row].length; col++) {
if (shape[row][col]) {
const boardY = y + row
const boardX = x + col
if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
newBoard[boardY][boardX] = color + 1
}
}
}
}
let cleared = 0
for (let row = ROWS - 1; row >= 0; ) {
if (newBoard[row].every(cell => cell !== 0)) {
newBoard.splice(row, 1)
newBoard.unshift(Array(COLS).fill(0))
cleared++
} else {
row--
}
}
if (cleared > 0) {
setScore(prev => prev + cleared * 100)
}
setBoard(newBoard)
const newPiece = getRandomPiece()
if (!isValidPosition(newPiece.shape, newPiece.x, newPiece.y)) {
setGameOver(true)
if (gameLoopRef.current) {
clearInterval(gameLoopRef.current)
gameLoopRef.current = null
}
} else {
setCurrentPiece(newPiece)
}
}, [currentPiece, board, getRandomPiece, isValidPosition])
const movePiece = useCallback((dx: number, dy: number) => {
if (!currentPiece || gameOver || isPaused) return
const { shape, x, y } = currentPiece
if (isValidPosition(shape, x + dx, y + dy)) {
setCurrentPiece(prev => prev ? { ...prev, x: prev.x + dx, y: prev.y + dy } : null)
} else if (dy === 1) {
lockPiece()
}
}, [currentPiece, gameOver, isPaused, isValidPosition, lockPiece])
const rotatePiece = useCallback(() => {
if (!currentPiece || gameOver || isPaused) return
const { shape, x, y, color } = currentPiece
const rotated = shape[0].map((_: number, idx: number) =>
shape.map((row: number[]) => row[idx]).reverse()
)
if (isValidPosition(rotated, x, y)) {
setCurrentPiece(prev => prev ? { ...prev, shape: rotated } : null)
} else {
for (let offset of [-1, 1, -2, 2]) {
if (isValidPosition(rotated, x + offset, y)) {
setCurrentPiece(prev => prev ? { ...prev, shape: rotated, x: prev.x + offset } : null)
break
}
}
}
}, [currentPiece, gameOver, isPaused, isValidPosition])
  const resetGame = useCallback(() => {
    setBoard(createBoard())
    setScore(0)
    setGameOver(false)
    setIsPaused(false)
    setCurrentPiece(getRandomPiece())
  }, [createBoard, getRandomPiece])

  useEffect(() => {
    resetGame()
  }, [resetGame])

  useEffect(() => {
    if (gameOver || isPaused) return
    const interval = setInterval(() => {
      movePiece(0, 1)
    }, dropInterval)
    return () => clearInterval(interval)
  }, [movePiece, gameOver, isPaused])
useEffect(() => {
const handleKeyDown = (e: KeyboardEvent) => {
if (gameOver) return
switch (e.key) {
case 'ArrowLeft': movePiece(-1, 0); break
case 'ArrowRight': movePiece(1, 0); break
case 'ArrowDown': movePiece(0, 1); break
case 'ArrowUp': rotatePiece(); break
case ' ': movePiece(0, 1); break
case 'p': setIsPaused(prev => !prev); break
}
}
window.addEventListener('keydown', handleKeyDown)
return () => window.removeEventListener('keydown', handleKeyDown)
}, [movePiece, rotatePiece, gameOver])
const renderBoard = () => {
const displayBoard = board.map(row => [...row])
if (currentPiece && !gameOver) {
const { shape, color, x, y } = currentPiece
for (let row = 0; row < shape.length; row++) {
for (let col = 0; col < shape[row].length; col++) {
if (shape[row][col]) {
const boardY = y + row
const boardX = x + col
if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
displayBoard[boardY][boardX] = color + 1
}
}
}
}
}
return displayBoard.map((row, rowIdx) => (
      <div key={rowIdx} style={{ display: 'flex' }}>
        {row.map((cell, colIdx) => (
          <div
            key={`{${rowIdx}-${colIdx}`}
            style={{
              width: BLOCK_SIZE,
              height: BLOCK_SIZE,
              backgroundColor: cell ? COLORS[cell - 1] : '#1a1a2e',
              border: '1px solid #16213e',
              boxSizing: 'border-box'
            }}
          />
        ))}
      </div>
    ))
  }
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f0f23',
      color: '#fff',
      fontFamily: 'monospace'
    }}>
      <h1>TETRIS</h1>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        <div style={{ backgroundColor: '#16213e', padding: '10px' }}>
          {renderBoard()}
        </div>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <div>SCORE</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{score}</div>
          </div>
          {gameOver && (
            <div style={{ color: '#ff4444', fontSize: '20px', marginBottom: '10px' }}>
              GAME OVER
            </div>
          )}
          {isPaused && !gameOver && (
            <div style={{ color: '#ffaa00', fontSize: '20px', marginBottom: '10px' }}>
              PAUSED
            </div>
          )}
          <button
            onClick={resetGame}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff4444',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            New Game
          </button>
          <div style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
            <div>← → ↑ ↓ : Move</div>
            <div>Space : Drop</div>
            <div>P : Pause</div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Tetris