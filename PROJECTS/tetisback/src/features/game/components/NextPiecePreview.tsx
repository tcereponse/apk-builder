import React from 'react';
import { Piece } from '@/shared/types/game';
interface NextPiecePreviewProps {
piece: Piece | null;
}
export default function NextPiecePreview({ piece }: NextPiecePreviewProps) {
if (!piece) return <div className="w-24 h-24 border border-gray-600 bg-gray-800" />;
const { shape, color } = piece;
return (
    <div className="border border-gray-600 bg-gray-800 p-1">
      <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${shape[0].length}, 1fr)` }}>
        {shape.map((row, r) => row.map((cell, c) => (
          <div key={`${r}-${c}`} className="w-6 h-6" style={{ backgroundColor: cell ? color : 'transparent' }} />
        )))}
      </div>
    </div>
  );
}