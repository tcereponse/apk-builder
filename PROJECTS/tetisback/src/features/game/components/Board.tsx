import React from 'react'
import { cn } from '@shared/utils/cn'
import type { Grid, Ghost } from '@shared/types/game'
interface BoardProps {
grid: Grid
ghost: Ghost
}
export function Board({ grid, ghost }: BoardProps) {
return (
    <div className="relative glass-panel p-2 shadow-2xl">
      <div className="grid grid-cols-10 gap-[2px] bg-diamond-border/30 p-1 rounded-lg">
        {grid.map((row, y) =>
          row.map((cell, x) => {
            const ghostValue = ghost?.[y]?.[x] || 0
            const isGhost = ghostValue > 0 && cell === 0
            const color = isGhost ? ghostValue : cell
            return (
              <div
                key={`${y}-${x}`}
                className={cn(
                  'w-6 h-6 md:w-8 md:h-8 rounded-sm transition-all duration-75',
                  color > 0 && 'cell-solid',
                  isGhost && 'cell-ghost',
                  color === 0 && 'bg-diamond-surface/30'
                )}
                style={{
                  backgroundColor: color > 0 ? getColor(color, isGhost) : undefined,
                }}
              />
            )
          })
        )}
      </div>
    </div>
  )
}const COLORS: Record<number, string> = {
1: '#00f0f0', // I
2: '#0000f0', // J
3: '#f0a000', // L
4: '#f0f000', // O
5: '#00f000', // S
6: '#a000f0', // T
7: '#f00000', // Z
}
function getColor(value: number, ghost: boolean): string {
const base = COLORS[value] || '#888'
if (ghost) {
return base + '40'
}
return base
}