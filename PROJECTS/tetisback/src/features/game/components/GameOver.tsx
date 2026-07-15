import React from 'react'
import { useGame } from '@app/contexts/GameContext'
import { Trophy, Clock, Layers, Target, RotateCcw } from 'lucide-react'
import { cn } from '@shared/utils/cn'
interface GameOverProps {
score: number
stats: {
time: number
piecesPlaced: number
linesCleared: number
efficiency: number
}
}
export function GameOver({ score, stats }: GameOverProps) {
const { resetGame } = useGame()
const formatTime = (seconds: number) => {
const m = Math.floor(seconds / 60)
const s = Math.floor(seconds % 60)
return ${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}
}
return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="glass-panel p-8 max-w-md w-full mx-4 space-y-6 text-center">
        <div className="flex justify-center">
          <Trophy className="w-16 h-16 text-diamond-primary animate-pulse-slow" />
        </div>
        <h2 className="text-3xl font-light tracking-widest text-diamond-primary">GAME OVER</h2>
        <div className="text-5xl font-bold font-mono text-diamond-text">{score}</div>        <div className="grid grid-cols-2 gap-3 text-left border-t border-diamond-border/30 pt-4">
          <Stat label="Temps" value={formatTime(stats.time)} />
          <Stat label="Pièces" value={stats.piecesPlaced.toString()} />
          <Stat label="Lignes" value={stats.linesCleared.toString()} />
          <Stat label="Efficacité" value={`${Math.round(stats.efficiency)}%`} />
        </div><button
onClick={() => resetGame(false)}
className={cn(
'w-full py-3 rounded-xl flex items-center justify-center gap-2',
'bg-diamond-primary/20 hover:bg-diamond-primary/30',
'border border-diamond-primary/30 text-diamond-primary',
'transition-all duration-200 active:scale-95'
)}
          <RotateCcw size={20} />
          <span>Rejouer</span>
        </button><button
onClick={() => resetGame(true)}
className={cn(
'w-full py-2 rounded-xl flex items-center justify-center gap-2',
'bg-diamond-surface/40 hover:bg-diamond-surface/60',
'border border-diamond-border/30 text-diamond-muted',
'transition-all duration-200 active:scale-95 text-sm'
)}
<span>Mode Zen</span>
</button>
      </div>
    </div>
  )
}function Stat({ label, value }: { label: string; value: string }) {
return (
    <div>
      <div className="text-xs text-diamond-muted uppercase tracking-wider">{label}</div>
      <div className="text-lg font-mono font-semibold text-diamond-text">{value}</div>
    </div>
  )
}