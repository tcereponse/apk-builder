x

import { useNavigate } from 'react-router-dom'
import { useSettings } from '@app/contexts/SettingsContext'
import { ArrowLeft, Volume2, VolumeX, Moon, Sun, Vibrate, Award } from 'lucide-react'

export function SettingsPage() {
  const navigate = useNavigate()
  const { settings, toggleSound, toggleTheme, setDifficulty, toggleVibration } = useSettings()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-white">Paramètres</h1>
      </div>

      <div className="space-y-3">
        {/* Son */}
        <button
          onClick={toggleSound}
          className="w-full flex items-center justify-between bg-slate-800/50 rounded-xl px-4 py-4 hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            {settings.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-blue-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
            <span className="text-white">Son</span>
          </div>
          <div className={`w-12 h-7 rounded-full transition-colors ${settings.soundEnabled ? 'bg-blue-500' : 'bg-slate-700'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mt-1 ${settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
        </button>

        {/* Thème */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between bg-slate-800/50 rounded-xl px-4 py-4 hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            {settings.theme === 'dark' ? (
              <Moon className="w-5 h-5 text-blue-400" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
            <span className="text-white">Thème sombre</span>
          </div>
          <div className={`w-12 h-7 rounded-full transition-colors ${settings.theme === 'dark' ? 'bg-blue-500' : 'bg-slate-700'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mt-1 ${settings.theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
        </button>

        {/* Difficulté */}
        <div className="bg-slate-800/50 rounded-xl px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-5 h-5 text-blue-400" />
            <span className="text-white">Difficulté</span>
          </div>
          <div className="flex gap-2">
            {(['easy', 'normal', 'hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  settings.difficulty === diff
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                {diff === 'easy' ? 'Facile' : diff === 'normal' ? 'Normal' : 'Difficile'}
              </button>
            ))}
          </div>
        </div>

        {/* Vibrations */}
        <button
          onClick={toggleVibration}
          className="w-full flex items-center justify-between bg-slate-800/50 rounded-xl px-4 py-4 hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Vibrate className={`w-5 h-5 ${settings.vibrationEnabled ? 'text-blue-400' : 'text-slate-400'}`} />
            <span className="text-white">Vibrations</span>
          </div>
          <div className={`w-12 h-7 rounded-full transition-colors ${settings.vibrationEnabled ? 'bg-blue-500' : 'bg-slate-700'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mt-1 ${settings.vibrationEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
        </button>
      </div>

      <div className="text-center text-slate-500 text-xs mt-4">
        JACK v1.0 • Tous droits réservés
      </div>
    </div>
  )
}