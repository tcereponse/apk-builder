x

import { useNavigate } from 'react-router-dom'
import { Gamepad2, Trophy, Settings, Sparkles } from 'lucide-react'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tighter text-white mb-2">JACK</h1>
        <p className="text-slate-400 text-lg tracking-wide">Casse-brique</p>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={() => navigate('/game')}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all rounded-xl text-white font-semibold text-lg shadow-lg shadow-blue-500/25"
        >
          <Gamepad2 className="w-6 h-6" />
          Jouer
        </button>

        <button
          onClick={() => navigate('/scores')}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all rounded-xl text-white font-semibold text-lg"
        >
          <Trophy className="w-6 h-6" />
          Scores
        </button>

        <button
          onClick={() => navigate('/settings')}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all rounded-xl text-white font-semibold text-lg"
        >
          <Settings className="w-6 h-6" />
          Paramètres
        </button>
      </div>

      <div className="flex items-center gap-2 text-slate-500 text-xs mt-4">
        <Sparkles className="w-3 h-3" />
        <span>Version 1.0 • Mobile & Desktop</span>
      </div>
    </div>
  )
}