import React from 'react'
import type { Piece } from '@shared/types/game'
interface NextPieceProps {
piece: Piece | null
}
export function NextPiece({ piece }: NextPieceProps) {
if (!piece) return null
const shape = piece.shape
const color = piece.type
return (
    <div className="glass-panel p-4 flex flex-col items-center">
      <span className="text-xs uppercase tracking-widest text-diamond-muted mb-2">
        Suivant
      </span>
      <div className="grid grid-cols-4 gap-1">
        {shape.map((row, y) =>
          row.map((val, x) => (
            <div
              key={`${y}-${x}`}
              className="w-5 h-5 rounded-sm"
              style={{
                backgroundColor: val ? getColor(color) : 'transparent',
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}function getColor(type: number): string {
const map: Record<number, string> = {
1: '#00f0f0',
2: '#0000f0',
3: '#f0a000',
4: '#f0f000',
5: '#00f000',
6: '#a000f0',
7: '#f00000',
}
return map[type] || '#888'
}