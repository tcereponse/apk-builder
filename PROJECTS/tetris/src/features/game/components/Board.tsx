x
import React from 'react';
import { Board as BoardType, Cell } from '../types/game.types';
interface BoardProps {
board: BoardType;
}
export function Board({ board }: BoardProps) {
return (
    <div className="bg-gray-900 p-2 rounded-lg shadow-xl border-2 border-gray-700">
      <div className="grid gap-[2px] bg-gray-800 p-[2px] rounded">
        {board.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid grid-cols-10 gap-[2px]">
            {row.map((cell, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="w-8 h-8 rounded-sm transition-colors duration-150"
                style={{
                  backgroundColor: cell ? getCellColor(cell) : '#1a1a2e',
                  boxShadow: cell ? 'inset -2px -2px 0 rgba(0,0,0,0.3), inset 2px 2px 0 rgba(255,255,255,0.1)' : 'none'
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}function getCellColor(value: Cell): string {
const colors: Record<number, string> = {
1: '#00f0f0',
2: '#0000f0',
3: '#f0a000',
4: '#f0f000',
5: '#00f000',
6: '#a000f0',
7: '#f00000'
};
return colors[value] || '#1a1a2e';
}