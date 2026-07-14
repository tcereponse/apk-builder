x
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Volume2, VolumeX, Vibrate, Moon, Sun, RefreshCw } from 'lucide-react';
import { Button } from '@shared/components/Button';
import { useSettings } from '@app/contexts/SettingsContext';

export function SettingsPage() {
const navigate = useNavigate();
const { settings, actions } = useSettings();

const handleResetAll = async () => {
if (confirm('Voulez-vous réinitialiser tous les paramètres ?')) {
await actions.updateSettings({
soundEnabled: true,
sfxEnabled: true,
vibrationEnabled: false,
theme: 'light',
difficulty: 'normal'
});
}
};

const renderToggle = (
label: string,
value: boolean,
onChange: () => void,
icon: React.ReactNode,
description?: string
) => (

<div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700"> <div className="flex items-center gap-3"> <div className="text-slate-500 dark:text-slate-400"> {icon} </div> <div> <span className="text-slate-700 dark:text-slate-300 font-medium"> {label} </span> {description && ( <p className="text-sm text-slate-400 dark:text-slate-500"> {description} </p> )} </div> </div> <button onClick={onChange} className={`relative w-12 h-7 rounded-full transition-colors ${ value ? 'bg-slate-800 dark:bg-slate-600' : 'bg-slate-300 dark:bg-slate-700' } min-h-[44px] min-w-[44px] flex items-center justify-center`} aria-label={label} > <span className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white transition-transform ${ value ? 'translate-x-5' : 'translate-x-0' }`} /> </button> </div> );

return (

<div className="max-w-md mx-auto py-6"> <div className="flex items-center justify-between mb-6"> <button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px]" aria-label="Retour" > <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" /> </button> <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200"> Paramètres </h1> <div className="w-10" /> </div> <div className="card"> {renderToggle( 'Son', settings.soundEnabled, actions.toggleSound, settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />, 'Effets sonores et musique' )}

{renderToggle(
'Vibration',
settings.vibrationEnabled,
actions.toggleVibration,
<Vibrate className="w-5 h-5" />,
'Retour haptique (mobile)'
)}

{renderToggle(
'Thème sombre',
settings.theme === 'dark',
actions.toggleTheme,
settings.theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />,
'Interface claire ou sombre'
)}

<div className="flex items-center justify-between py-3"> <div className="flex items-center gap-3"> <div className="text-slate-500 dark:text-slate-400"> <span className="text-lg">⚡</span> </div> <div> <span className="text-slate-700 dark:text-slate-300 font-medium"> Difficulté </span> <p className="text-sm text-slate-400 dark:text-slate-500"> Niveau de challenge </p> </div> </div> <div className="flex gap-2"> {['easy', 'normal', 'hard'].map((diff) => ( <button key={diff} onClick={() => actions.updateSettings({ difficulty: diff as 'easy' | 'normal' | 'hard' })} className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors min-h-[44px] min-w-[44px] ${ settings.difficulty === diff ? 'bg-slate-800 text-white dark:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600' }`} > {diff === 'easy' ? 'Facile' : diff === 'normal' ? 'Normal' : 'Difficile'} </button> ))} </div> </div> <div className="pt-4 border-t border-slate-200 dark:border-slate-700"> <Button variant="ghost" onClick={handleResetAll} className="w-full text-red-500 hover:text-red-600" > <RefreshCw className="w-4 h-4 mr-2" /> Réinitialiser tous les paramètres </Button> </div> </div> <div className="mt-8 text-center text-sm text-slate-400 dark:text-slate-500"> <p>BKACK v1.0</p> <p className="mt-1">Break the bricks, forge your score</p> </div> </div> ); }