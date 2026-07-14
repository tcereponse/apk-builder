import { Piece } from '@shared/types/game.types';
interface NextPieceProps {
piece: Piece | null;
}
function NextPiece({ piece }: NextPieceProps) {
if (!piece) {
return (
      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
        <p className="text-slate-500 text-xs text-center mb-2">Prochaine pièce</p>
        <div className="flex items-center justify-center h-16">
          <div className="w-16 h-16 bg-slate-800/50 rounded" />
        </div>
      </div>
    );
  }const { matrix, color } = piece;
return (
    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
      <p className="text-slate-500 text-xs text-center mb-2">Prochaine pièce</p>
      <div className="flex items-center justify-center">
        <div 
          className="grid gap-[2px]"
          style={{ 
            gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)`,
            width: `${matrix[0].length * 24}px`,
            height: `${matrix.length * 24}px`
          }}
        >
          {matrix.map((row, rowIdx) =>
            row.map((cell, colIdx) => (
              <div
                key={`${rowIdx}-${colIdx}`}
                className="w-6 h-6 rounded-sm"
                style={{
                  backgroundColor: cell === 1 ? color : 'transparent',
                  border: cell === 1 ? `1px solid ${color}80` : 'none'
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default NextPiece;