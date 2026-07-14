import React, { memo, useMemo } from 'react'
import { CellState, Position, TetrominoType } from '@shared/types'
import { TETROMINO_COLORS, TETROMINO_SHAPES } from '@shared/constants/tetrominos'
import { BOARD_WIDTH, BOARD_HEIGHT } from '@shared/utils/board'
interface BoardProps {
grid: CellState[][]
currentPiece?: {
type: TetrominoType
position: Position
rotation: number
} | null
ghostPosition?: Position | null
}
const Board: React.FC<BoardProps> = memo(({ grid, currentPiece, ghostPosition }) => {
const finalGrid = useMemo(() => {
const displayGrid = grid.map(row => row.map(cell => ({ ...cell })))
if (currentPiece && ghostPosition) {
const shape = TETROMINO_SHAPES[currentPiece.type]
const rotatedShape = shape[currentPiece.rotation % shape.length]
for (let row = 0; row < rotatedShape.length; row++) {
for (let col = 0; col < rotatedShape[row].length; col++) {
if (rotatedShape[row][col] !== 0) {
const boardX = ghostPosition.x + col
const boardY = ghostPosition.y + row
if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
if (displayGrid[boardY][boardX].type === null) {
displayGrid[boardY][boardX] = {
type: currentPiece.type,
isActive: true
}
}
}
}
}
}
}
if (currentPiece) {
const shape = TETROMINO_SHAPES[currentPiece.type]
const rotatedShape = shape[currentPiece.rotation % shape.length]
for (let row = 0; row < rotatedShape.length; row++) {
for (let col = 0; col < rotatedShape[row].length; col++) {
if (rotatedShape[row][col] !== 0) {
const boardX = currentPiece.position.x + col
const boardY = currentPiece.position.y + row
if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
displayGrid[boardY][boardX] = {
type: currentPiece.type,
isActive: false
}
}
}
}
}
}
return displayGrid
}, [grid, currentPiece, ghostPosition])
return (
    <div className="relative bg-[#1a1d1e] rounded-xl p-2 shadow-2xl border border-[#2a2d2e]">
      <div
        className="grid gap-[1px]"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
          width: 'min(60vh, 50vw)',
          height: 'min(120vh, 100vw)',
          maxWidth: '400px',
          maxHeight: '800px',
          aspectRatio: `${BOARD_WIDTH}/${BOARD_HEIGHT}`
        }}
      >
        {finalGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const cellKey = `${rowIndex}-${colIndex}`
            const color = cell.type ? TETROMINO_COLORS[cell.type] : 'transparent'
            const isGhost = cell.isActive && cell.type !== null
            return (
              <div
                key={cellKey}
                className={`rounded-sm transition-all duration-75 ${
                  isGhost ? 'opacity-20' : 'opacity-100'
                } ${cell.type ? 'shadow-inner' : 'bg-[#0f1112]'}`}
                style={{
                  backgroundColor: cell.type ? color : '#0f1112',
                  border: cell.type ? '1px solid rgba(255,255,255,0.1)' : 'none'
                }}
              />
            )
          })
        )}
      </div>
    </div>
  )
})Board.displayName = 'Board'
export default Board