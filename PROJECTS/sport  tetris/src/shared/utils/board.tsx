import { Position, TetrominoType, CellState } from '@shared/types'
import { TETROMINO_SHAPES } from '@shared/constants/tetrominos'
export const BOARD_WIDTH = 10
export const BOARD_HEIGHT = 20
export function createEmptyBoard(): CellState[][] {
return Array.from({ length: BOARD_HEIGHT }, () =>
Array.from({ length: BOARD_WIDTH }, () => ({
type: null,
isActive: false
}))
)
}
export function isValidPosition(
board: CellState[][],
shape: number[][],
position: Position,
rotation: number
): boolean {
const rotatedShape = shape[rotation % shape.length]
for (let row = 0; row < rotatedShape.length; row++) {
for (let col = 0; col < rotatedShape[row].length; col++) {
if (rotatedShape[row][col] !== 0) {
const boardX = position.x + col
const boardY = position.y + row
if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT || boardY < 0) {
return false
}
if (boardY >= 0 && board[boardY][boardX].type !== null) {
return false
}
}
}
}
return true
}
export function lockPiece(
board: CellState[][],
shape: number[][],
position: Position,
rotation: number,
type: TetrominoType
): CellState[][] {
const newBoard = board.map(row => row.map(cell => ({ ...cell })))
const rotatedShape = shape[rotation % shape.length]
for (let row = 0; row < rotatedShape.length; row++) {
for (let col = 0; col < rotatedShape[row].length; col++) {
if (rotatedShape[row][col] !== 0) {
const boardX = position.x + col
const boardY = position.y + row
if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
newBoard[boardY][boardX] = {
type: type,
isActive: false
}
}
}
}
}
return newBoard
}
export function clearFullRows(board: CellState[][]): {
board: CellState[][]
linesCleared: number
} {
const newBoard = board.filter(row => row.some(cell => cell.type === null))
const linesCleared = BOARD_HEIGHT - newBoard.length
const emptyRows = Array.from({ length: linesCleared }, () =>
Array.from({ length: BOARD_WIDTH }, () => ({
type: null,
isActive: false
}))
)
return {
board: [...emptyRows, ...newBoard],
linesCleared
}
}
export function getGhostPosition(
board: CellState[][],
shape: number[][],
position: Position,
rotation: number
): Position {
let ghostY = position.y
while (isValidPosition(board, shape, { x: position.x, y: ghostY + 1 }, rotation)) {
ghostY++
}
return { x: position.x, y: ghostY }
}