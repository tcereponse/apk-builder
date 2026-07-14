x

import { useNavigate } from 'react-router-dom'
import { useScores } from '@app/contexts/ScoresContext'
import { ArrowLeft, Trophy } from 'lucide-react'

export function ScoresPage() {
  const navigate = useNavigate()
  const { state } = useScores()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-white">Scores</h1>
      </div>

      {state.loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : state.error ? (
        <div className="text-center py-12 text-slate-400">
          <p>{state.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-blue-500 hover:text-blue-400"
          >
            Réessayer
          </button>
        </div>
      ) : state.scores.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Trophy className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p>Aucun score enregistré</p>
          <p className="text-sm mt-2">Joue une partie pour apparaître ici !</p>
        </div>
      ) : (
        <div className="space-y-2">
          {state.scores.map((score, index) => (
            <div
              key={score.id || index}
              className="flex items-center justify-between bg-slate-800/50 rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-mono text-sm w-6">
                  #{index + 1}
                </span>
                <span className="text-white font-medium">
                  {score.playerName}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-sm">
                  Niv. {score.level}
                </span>
                <span className="text-white font-bold">
                  {score.score} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}