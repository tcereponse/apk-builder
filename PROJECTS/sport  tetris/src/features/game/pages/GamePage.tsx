import React, { useEffect } from 'react'
import Board from '../components/Board'
import NextPiecePreview from '../components/NextPiecePreview'
import GameStats from '../components/GameStats'
import GameControls from '../components/GameControls'
import { useGameLoop } from '../hooks/useGameLoop'
import { getGhostPosition } from '@shared/utils/board'
import { TETROMINO_SHAPES } from '@shared/constants/tetrominos'
const GamePage: React.FC = () => {
const {
gameState,
isPlaying,
startGame,
resetGame,
togglePause,
movePiece,
rotatePiece,
hardDrop
} = useGameLoop()
const ghostPosition = gameState.currentPiece
? getGhostPosition(
gameState.grid,
TETROMINO_SHAPES[gameState.currentPiece.type],
gameState.currentPiece.position,
gameState.currentPiece.rotation
)
: null
useEffect(() => {
document.title = 'SPORT TETRIS'
}, [])
return (
    <div className="min-h-screen bg-[#151718] flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
        <div className="flex flex-col items-center gap-4">
          <div className="text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            SPORT TETRIS
          </div>
          <Board
            grid={gameState.grid}
            currentPiece={gameState.currentPiece}
            ghostPosition={ghostPosition}
          />
          {gameState.gameOver && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-4">Game Over</div>
                <div className="text-xl text-gray-300 mb-4">Score: {gameState.score}</div>
                <button
                  onClick={resetGame}
                  className="bg-primary hover:bg-primary/80 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Rejouer
                </button>
              </div>
            </div>
          )}
        </div>        <div className="flex flex-col gap-4 w-full max-w-[280px]">
          <NextPiecePreview type={gameState.nextPiece?.type || null} />
          <GameStats
            score={gameState.score}
            level={gameState.level}
            lines={gameState.lines}
            isPlaying={isPlaying}
            isPaused={gameState.isPaused}
            onStart={startGame}
            onReset={resetGame}
            onTogglePause={togglePause}
          />
          <GameControls
            isPlaying={isPlaying}
            isPaused={gameState.isPaused}
            onMoveLeft={() => movePiece(-1, 0)}
            onMoveRight={() => movePiece(1, 0)}
            onMoveDown={() => movePiece(0, 1)}
            onRotate={rotatePiece}
            onHardDrop={hardDrop}
            onTogglePause={togglePause}
            onReset={resetGame}
          />
        </div>
      </div>
    </div>
  )
};
export default GamePage