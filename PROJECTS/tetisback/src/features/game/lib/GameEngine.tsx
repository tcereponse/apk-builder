import { Piece, PieceType, GameState } from '@/shared/types/game';
import { PIECES, COLORS, WALL_KICKS } from '@/shared/constants/game';
export class GameEngine {
private grid: (string | null)[][];
private currentPiece: Piece | null;
private nextPiece: Piece | null;
private score: number;
private level: number;
private lines: number;
private status: 'playing' | 'paused' | 'gameover';
private zenMode: boolean;
private stateCallbacks: ((state: GameState) => void)[] = [];
private bag: PieceType[] = [];
private ghostY: number = 0;
constructor() {
this.grid = Array(20).fill(null).map(() => Array(10).fill(null));
this.currentPiece = null;
this.nextPiece = null;
this.score = 0;
this.level = 1;
this.lines = 0;
this.status = 'playing';
this.zenMode = false;
this.fillBag();
this.spawnPiece();
}
private fillBag(): void {
const types: PieceType[] = ['I','J','L','O','S','T','Z'];
this.bag = [...types];
for (let i = this.bag.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
}
}
private getNextType(): PieceType {
if (this.bag.length === 0) this.fillBag();
return this.bag.pop()!;
}
private createPiece(type: PieceType): Piece {
const shape = PIECES[type];
const color = COLORS[type];
return {
type,
shape: shape.map(row => [...row]),
color,
x: Math.floor((10 - shape[0].length) / 2),
y: 0,
};
}
private spawnPiece(): void {
const type = this.getNextType();
const piece = this.createPiece(type);
this.currentPiece = piece;
const nextType = this.getNextType();
this.nextPiece = this.createPiece(nextType);
if (this.collides(piece.shape, piece.x, piece.y)) {
if (this.zenMode) {
this.clearLines();
this.spawnPiece();
} else {
this.status = 'gameover';
}
}
this.updateGhost();
this.notify();
}
private collides(shape: string[][], offsetX: number, offsetY: number): boolean {
for (let y = 0; y < shape.length; y++) {
for (let x = 0; x < shape[y].length; x++) {
if (shape[y][x] !== null) {
const newX = offsetX + x;
const newY = offsetY + y;
if (newX < 0 || newX >= 10 || newY >= 20 || newY < 0) return true;
if (newY >= 0 && this.grid[newY][newX] !== null) return true;
}
}
}
return false;
}
private mergePiece(): void {
if (!this.currentPiece) return;
const { shape, x, y, color } = this.currentPiece;
for (let row = 0; row < shape.length; row++) {
for (let col = 0; col < shape[row].length; col++) {
if (shape[row][col] !== null) {
const gridY = y + row;
const gridX = x + col;
if (gridY >= 0 && gridY < 20 && gridX >= 0 && gridX < 10) {
this.grid[gridY][gridX] = color;
}
}
}
}
this.clearLines();
this.spawnPiece();
}
private clearLines(): void {
let cleared = 0;
for (let row = 19; row >= 0; ) {
const full = this.grid[row].every(cell => cell !== null);
if (full) {
this.grid.splice(row, 1);
this.grid.unshift(Array(10).fill(null));
cleared++;
} else {
row--;
}
}
if (cleared > 0) {
const points = [0, 100, 300, 500, 800];
this.score += points[cleared] * this.level;
this.lines += cleared;
this.level = Math.floor(this.lines / 10) + 1;
}
}
private updateGhost(): void {
if (!this.currentPiece) return;
let y = this.currentPiece.y;
while (!this.collides(this.currentPiece.shape, this.currentPiece.x, y + 1)) {
y++;
}
this.ghostY = y;
}
private notify(): void {
const state = this.getState();
this.stateCallbacks.forEach(cb => cb(state));
}
getState(): GameState {
return {
grid: this.grid,
currentPiece: this.currentPiece,
nextPiece: this.nextPiece,
score: this.score,
level: this.level,
lines: this.lines,
status: this.status,
ghostY: this.ghostY,
};
}
onStateChange(cb: (state: GameState) => void): void {
this.stateCallbacks.push(cb);
}
moveLeft(): void {
if (this.status !== 'playing') return;
if (!this.currentPiece) return;
const { shape, x, y } = this.currentPiece;
if (!this.collides(shape, x - 1, y)) {
this.currentPiece.x--;
this.updateGhost();
this.notify();
}
}
moveRight(): void {
if (this.status !== 'playing') return;
if (!this.currentPiece) return;
const { shape, x, y } = this.currentPiece;
if (!this.collides(shape, x + 1, y)) {
this.currentPiece.x++;
this.updateGhost();
this.notify();
}
}
rotate(): void {
if (this.status !== 'playing') return;
if (!this.currentPiece) return;
const shape = this.currentPiece.shape;
const rotated = shape[0].map((_, idx) => shape.map(row => row[idx]).reverse());
for (const [dx, dy] of WALL_KICKS) {
if (!this.collides(rotated, this.currentPiece.x + dx, this.currentPiece.y + dy)) {
this.currentPiece.shape = rotated;
this.currentPiece.x += dx;
this.currentPiece.y += dy;
this.updateGhost();
this.notify();
return;
}
}
}
softDrop(): void {
if (this.status !== 'playing') return;
if (!this.currentPiece) return;
const { shape, x, y } = this.currentPiece;
if (!this.collides(shape, x, y + 1)) {
this.currentPiece.y++;
this.updateGhost();
this.notify();
}
}
hardDrop(): void {
if (this.status !== 'playing') return;
if (!this.currentPiece) return;
while (!this.collides(this.currentPiece.shape, this.currentPiece.x, this.currentPiece.y + 1)) {
this.currentPiece.y++;
}
this.mergePiece();
this.updateGhost();
this.notify();
}
togglePause(): void {
if (this.status === 'playing') this.status = 'paused';
else if (this.status === 'paused') this.status = 'playing';
this.notify();
}
reset(options?: { zenMode?: boolean }): void {
this.grid = Array(20).fill(null).map(() => Array(10).fill(null));
this.score = 0;
this.level = 1;
this.lines = 0;
this.status = 'playing';
this.zenMode = options?.zenMode || false;
this.fillBag();
this.spawnPiece();
this.notify();
}
tick(): void {
if (this.status !== 'playing') return;
if (!this.currentPiece) return;
const { shape, x, y } = this.currentPiece;
if (!this.collides(shape, x, y + 1)) {
this.currentPiece.y++;
this.updateGhost();
this.notify();
} else {
this.mergePiece();
this.updateGhost();
this.notify();
}
}
}