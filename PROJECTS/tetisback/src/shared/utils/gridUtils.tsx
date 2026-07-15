import type { Grid, Piece } from '@shared/types/game'
import { COLS, ROWS } from '@shared/constants/game'
export function createGrid(): Grid {
return Array.from({ length: ROWS }, () => Array(COLS).fill(0))
}
export function cloneGrid(grid: Grid): Grid {
return grid.map(row => [...row])
}
export function isValidPosition(grid: Grid, piece: Piece): boolean {
for (let y = 0; y < piece.shape.length; y++) {
for (let x = 0; x < piece.shape[y].length; x++) {
if (piece.shape[y][x] === 0) continue
const gx = piece.x + x
const gy = piece.y + y
if (gx < 0 || gx >= COLS || gy >= ROWS) return false
if (gy < 0) continue
if (grid[gy][gx] !== 0) return false
}
}
return true
}
export function lockPiece(grid: Grid, piece: Piece): Grid {
const newGrid = cloneGrid(grid)
for (let y = 0; y < piece.shape.length; y++) {
for (let x = 0; x < piece.shape[y].length; x++) {
if (piece.shape[y][x] === 0) continue
const gx = piece.x + x
const gy = piece.y + y
if (gy >= 0 && gy < ROWS && gx >= 0 && gx < COLS) {
newGrid[gy][gx] = piece.type
}
}
}
return newGrid
}
export function clearLines(grid: Grid): number {
let cleared = 0
for (let y = ROWS - 1; y >= 0; ) {
if (grid[y].every(cell => cell !== 0)) {
grid.splice(y, 1)
grid.unshift(Array(COLS).fill(0))
cleared++
} else {
y--
}
}
return cleared
}