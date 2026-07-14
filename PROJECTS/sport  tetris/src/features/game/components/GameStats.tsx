import React, { memo } from 'react'
import { Trophy, Zap, Layers, Play, Pause, RotateCcw } from 'lucide-react'
interface GameStatsProps {
score: number
level: number
lines: number
isPlaying: boolean
isPaused: boolean
onStart: () => void
onReset: () => void
onTogglePause: () => void
}
const GameStats: React.FC<GameStatsProps> = memo(({
score,
level,
lines,
isPlaying,
isPaused,
onStart,
onReset,
onTogglePause
}) => {
return (
    <div className="bg-[#1a1d1e] rounded-xl p-6 border border-[#2a2d2e] flex flex-col gap-4 min-w-[180px]">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <div>
            <div className="text-xs text-gray-400">Score</div>
            <div className="text-2xl font-bold text-white">{score.toLocaleString()}</div>
          </div>
        </div>        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-blue-400" />
          <div>
            <div className="text-xs text-gray-400">Niveau</div>
            <div className="text-2xl font-bold text-white">{level}</div>
          </div>
        </div>        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-green-400" />
          <div>
            <div className="text-xs text-gray-400">Lignes</div>
            <div className="text-2xl font-bold text-white">{lines}</div>
          </div>
        </div>
      </div>      <div className="border-t border-[#2a2d2e] pt-4 flex flex-col gap-2">
        {!isPlaying ? (
          <button
            onClick={onStart}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <Play className="w-4 h-4" />
            Démarrer
          </button>
        ) : (
          <>
            <button
              onClick={onTogglePause}
              className="flex items-center justify-center gap-2 bg-[#2a2d2e] hover:bg-[#3a3d3e] text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  Reprendre
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              )}
            </button>
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 bg-[#2a2d2e] hover:bg-[#3a3d3e] text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Réinitialiser
            </button>
          </>
        )}
      </div>
    </div>
  )
})GameStats.displayName = 'GameStats'
export default GameStats