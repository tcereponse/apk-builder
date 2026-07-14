import { Piece, GameState } from '@shared/types/game.types';
import { PIECES, GRID_WIDTH, GRID_HEIGHT } from '@shared/constants/pieces';
export function createGame(): GameState {
const grid: string[][] = Array(GRID_HEIGHT).fill(null).map(() =>
Array(GRID_WIDTH).fill(null)
);
const nextPiece = getRandomPiece();
const currentPiece = getRandomPiece();
return {
grid,
currentPiece: { ...currentPiece, x: Math.floor(GRID_WIDTH / 2) - 1, y: 0 },
nextPiece,
score: 0,
level: 1,
lines: 0,
isPaused: false,
isGameOver: false,
isPlaying: true,
ghostY: 0
};
}
export function togglePause(state: GameState): GameState {
return {
...state,
isPaused: !state.isPaused
};
}
function getRandomPiece(): Piece {
const types = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'] as const;
const type = types[Math.floor(Math.random() * types.length)];
const pieceData = PIECES[type];
return {
id: type,
matrix: pieceData.matrix,
color: pieceData.color,
x: 0,
y: 0
};
}
function isValidPosition(state: GameState, piece: Piece): boolean {
const { matrix, x, y } = piece;
for (let row = 0; row < matrix.length; row++) {
for (let col = 0; col < matrix[row].length; col++) {
if (matrix[row][col] === 1) {
const newX = x + col;
const newY = y + row;
if (newX < 0 || newX >= GRID_WIDTH || newY >= GRID_HEIGHT) {
return false;
}
if (newY < 0) continue;
if (state.grid[newY][newX] !== null) {
return false;
}
}
}
}
return true;
}
function mergePiece(state: GameState, piece: Piece): string[][] {
const newGrid = state.grid.map(row => [...row]);
const { matrix, x, y, color } = piece;
for (let row = 0; row < matrix.length; row++) {
for (let col = 0; col < matrix[row].length; col++) {
if (matrix[row][col] === 1) {
const newX = x + col;
const newY = y + row;
if (newY >= 0 && newY < GRID_HEIGHT && newX >= 0 && newX < GRID_WIDTH) {
newGrid[newY][newX] = color;
}
}
}
}
return newGrid;
}
function clearLines(grid: string[][]): { newGrid: string[][], cleared: number } {
const newGrid: string[][] = [];
let cleared = 0;
for (let row = 0; row < grid.length; row++) {
if (grid[row].every(cell => cell !== null)) {
cleared++;
} else {
newGrid.push(grid[row]);
}
}
while (newGrid.length < GRID_HEIGHT) {
newGrid.unshift(Array(GRID_WIDTH).fill(null));
}
return { newGrid, cleared };
}
function getNextPiece(state: GameState): Piece {
const newPiece = getRandomPiece();
return {
...newPiece,
x: Math.floor(GRID_WIDTH / 2) - 1,
y: 0
};
}
export function moveHorizontal(state: GameState, dx: number): GameState {
if (!state.currentPiece || state.isGameOver || state.isPaused) return state;
const piece = { ...state.currentPiece, x: state.currentPiece.x + dx };
if (isValidPosition(state, piece)) {
return { ...state, currentPiece: piece };
}
return state;
}
export function rotatePiece(state: GameState): GameState {
if (!state.currentPiece || state.isGameOver || state.isPaused) return state;
const matrix = state.currentPiece.matrix;
const rotated = matrix[0].map((_, idx) => matrix.map(row => row[idx]).reverse());
const piece = { ...state.currentPiece, matrix: rotated };
if (isValidPosition(state, piece)) {
return { ...state, currentPiece: piece };
}
// Wall kick: try left/right shifts
for (const dx of [-1, 1, -2, 2]) {
const kickPiece = { ...piece, x: piece.x + dx };
if (isValidPosition(state, kickPiece)) {
return { ...state, currentPiece: kickPiece };
}
}
return state;
}
export function moveDown(state: GameState): GameState {
if (!state.currentPiece || state.isGameOver || state.isPaused) return state;
const piece = { ...state.currentPiece, y: state.currentPiece.y + 1 };
if (isValidPosition(state, piece)) {
return { ...state, currentPiece: piece };
}
// Lock piece
const newGrid = mergePiece(state, state.currentPiece);
const { newGrid: clearedGrid, cleared } = clearLines(newGrid);
const newLines = state.lines + cleared;
const newLevel = Math.floor(newLines / 10) + 1;
const newScore = state.score + (cleared > 0 ? cleared * 100 * state.level : 0);
const nextPiece = getNextPiece(state);
if (!isValidPosition({ ...state, grid: clearedGrid }, nextPiece)) {
return {
...state,
grid: clearedGrid,
isPlaying: false,
isGameOver: true,
currentPiece: null
};
}
return {
...state,
grid: clearedGrid,
currentPiece: nextPiece,
nextPiece: getRandomPiece(),
score: newScore,
level: newLevel,
lines: newLines
};
}
export function hardDrop(state: GameState): GameState {
if (!state.currentPiece || state.isGameOver || state.isPaused) return state;
let result = state;
let moved = true;
while (moved) {
const piece = { ...result.currentPiece!, y: result.currentPiece!.y + 1 };
if (isValidPosition(result, piece)) {
result = { ...result, currentPiece: piece };
} else {
moved = false;
}
}
return moveDown(result);
}
export function getGhostY(state: GameState): number {
if (!state.currentPiece || state.isGameOver) return 0;
let y = state.currentPiece.y;
while (true) {
const piece = { ...state.currentPiece, y: y + 1 };
if (isValidPosition(state, piece)) {
y++;
} else {
break;
}
}
return y;
}