import React, { memo } from 'react'
import { TetrominoType } from '@shared/types'
import { TETROMINO_SHAPES, TETROMINO_COLORS } from '@shared/constants/tetrominos'
interface NextPiecePreviewProps {
type: TetrominoType | null
}
const NextPiecePreview: React.FC<NextPiecePreviewProps> = memo(({ type }) => {
if (!type) {
return (
      <div className="bg-[#1a1d1e] rounded-xl p-4 border border-[#2a2d2e]">
        <div className="text-sm text-gray-400 text-center">Prochaine pièce</div>
        <div className="flex items-center justify-center h-16 text-gray-600 text-sm">
          Aucune
        </div>
      </div>
    )
  }const shape = TETROMINO_SHAPES[type][0]
const color = TETROMINO_COLORS[type]
return (
    <div className="bg-[#1a1d1e] rounded-xl p-4 border border-[#2a2d2e]">
      <div className="text-sm text-gray-400 text-center mb-2">Prochaine pièce</div>
      <div className="flex items-center justify-center">
        <div
          className="grid gap-[2px]"
          style={{
            gridTemplateColumns: `repeat(${shape[0].length}, 1fr)`,
            gridTemplateRows: `repeat(${shape.length}, 1fr)`,
            width: '80px',
            height: '80px'
          }}
        >
          {shape.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const cellKey = `${rowIndex}-${colIndex}`
              return (
                <div
                  key={cellKey}
                  className="rounded-sm"
                  style={{
                    backgroundColor: cell !== 0 ? color : 'transparent',
                    border: cell !== 0 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                  }}
                />
              )
            })
          )}
        </div>
      </div>
    </div>
  )
})NextPiecePreview.displayName = 'NextPiecePreview'
export default NextPiecePreview