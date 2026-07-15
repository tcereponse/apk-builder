import React from 'react';
import { Piece } from '@/shared/types/game';
interface GameBoardProps {
grid: (string | null)[][];
ghostY: number;
currentPiece: Piece | null;
}
export default function GameBoard({ grid, ghostY, currentPiece }: GameBoardProps) {
const renderCell = (row: number, col: number) => {
let color = grid[row][col] || null;
if (currentPiece && ghostY !== undefined) {
const { shape, x, y } = currentPiece;
if (row >= y && row < y + shape.length && col >= x && col < x + shape[0].length) {
const shapeRow = shape[row - y];
if (shapeRow && shapeRow[col - x] !== null) {
if (row === ghostY + (row - y)) {
return <div key={${row}-${col}} className="w-6 h-6 border border-gray-500 opacity-40" style={{ backgroundColor: shapeRow[col - x] }} />;
}
}
}
}
if (currentPiece) {
const { shape, x, y } = currentPiece;
if (row >= y && row < y + shape.length && col >= x && col < x + shape[0].length) {
const shapeRow = shape[row - y];
if (shapeRow && shapeRow[col - x] !== null) {
if (!(row === ghostY + (row - y))) {
color = shapeRow[col - x];
}
}
}
}
if (color) {
return <div key={${row}-${col}} className="w-6 h-6 border border-gray-700" style={{ backgroundColor: color }} />;
}
return <div key={${row}-${col}} className="w-6 h-6 border border-gray-800" />;
};
return (
    <div className="grid grid-cols-10 gap-0 border-2 border-gray-600 p-1 bg-gray-800">
      {grid.map((row, r) => row.map((_, c) => renderCell(r, c)))}
    </div>
  );
}