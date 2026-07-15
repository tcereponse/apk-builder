export type PieceType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export interface Piece {
type: PieceType;
shape: string[][];
color: string;
x: number;
y: number;
}
export interface GameState {
grid: (string | null)[][];
currentPiece: Piece | null;
nextPiece: Piece | null;
score: number;
level: number;
lines: number;
status: 'playing' | 'paused' | 'gameover';
ghostY: number;
}