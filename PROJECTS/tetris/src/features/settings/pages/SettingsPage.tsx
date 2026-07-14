import { useNavigate } from 'react-router-dom';
import { useSettings } from '@app/contexts/SettingsContext';
import { ArrowLeft } from 'lucide-react';
function SettingsPage() {
const navigate = useNavigate();
const { settings, updateSettings, resetSettings } = useSettings();
const handleSpeedChange = (speed: 'normal' | 'fast' | 'expert') => {
updateSettings({ initialSpeed: speed });
};
return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        Retour
      </button>      <h1 className="text-3xl font-bold text-white mb-8">Paramètres</h1>      <div className="space-y-6">
        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Vitesse initiale</h2>
          <div className="grid grid-cols-3 gap-3">
            {(['normal', 'fast', 'expert'] as const).map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  settings.initialSpeed === speed
                    ? 'bg-slate-700 text-white border-2 border-slate-500'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border-2 border-transparent'
                }`}
              >
                {speed === 'normal' && 'Normal'}
                {speed === 'fast' && 'Rapide'}
                {speed === 'expert' && 'Expert'}
              </button>
            ))}
          </div>
        </div>        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-300">Son</h2>
              <p className="text-xs text-slate-500">Désactivé par défaut</p>
            </div>
            <button
              onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
                settings.soundEnabled ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  settings.soundEnabled ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-300">Vibrations</h2>
              <p className="text-xs text-slate-500">Retour haptique sur mobile</p>
            </div>
            <button
              onClick={() => updateSettings({ vibrationEnabled: !settings.vibrationEnabled })}
              className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
                settings.vibrationEnabled ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  settings.vibrationEnabled ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div><button
onClick={resetSettings}
className="w-full py-3 px-6 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 font-medium rounded-lg transition-all duration-200 border border-rose-800/50"
Réinitialiser tous les paramètres
</button>
      </div>
    </div>
  );
};
export default SettingsPage;