import { Piece } from '@shared/types/game.types';
import { GRID_WIDTH, GRID_HEIGHT } from '@shared/constants/pieces';
interface BoardProps {
grid: (string | null)[][];
ghostY: number;
currentPiece: Piece | null;
}
function Board({ grid, ghostY, currentPiece }: BoardProps) {
const renderCell = (row: number, col: number) => {
let color: string | null = null;
if (grid[row] && grid[row][col]) {
color = grid[row][col];
}
if (currentPiece) {
const { matrix, x, y, color: pieceColor } = currentPiece;
const pieceRow = row - y;
const pieceCol = col - x;
if (pieceRow >= 0 && pieceRow < matrix.length && pieceCol >= 0 && pieceCol < matrix[pieceRow].length) {
if (matrix[pieceRow][pieceCol] === 1) {
color = pieceColor;
}
}
}
const isGhost = currentPiece && row === ghostY;
let ghostColor: string | null = null;
if (isGhost && currentPiece) {
const { matrix, x, y, color: pieceColor } = currentPiece;
const pieceRow = row - y;
const pieceCol = col - x;
if (pieceRow >= 0 && pieceRow < matrix.length && pieceCol >= 0 && pieceCol < matrix[pieceRow].length) {
if (matrix[pieceRow][pieceCol] === 1 && ghostY !== currentPiece.y) {
ghostColor = pieceColor;
}
}
}
const bgColor = ghostColor
? ${ghostColor}30
: color
? color
: 'bg-slate-900';
const borderColor = color || ghostColor
? 'border-slate-700/30'
: 'border-slate-800';
return (
      <div
        key={`${row}-${col}`}
        className={`aspect-square w-full border ${borderColor} ${bgColor} transition-colors duration-100`}
        style={{ 
          backgroundColor: ghostColor ? `${ghostColor}30` : color || 'transparent'
        }}
      />
    );
  };return (
    <div 
      className="grid gap-[1px] bg-slate-800 p-1 rounded-lg shadow-2xl"
      style={{ 
        gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
        width: 'min(80vw, 400px)',
        maxWidth: '400px',
        aspectRatio: `${GRID_WIDTH}/${GRID_HEIGHT}`
      }}
    >
      {Array.from({ length: GRID_HEIGHT }, (_, row) =>
        Array.from({ length: GRID_WIDTH }, (_, col) => renderCell(row, col))
      )}
    </div>
  );
};
export default Board;