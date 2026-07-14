x
import { useNavigate } from 'react-router-dom';
import { Play, Trophy, Settings, Gamepad2 } from 'lucide-react';
import { Button } from '@shared/components/Button';
import { useGame } from '@app/contexts/GameContext';
import { useScores } from '@app/contexts/ScoreContext';
import { useSettings } from '@app/contexts/SettingsContext';
import { useEffect } from 'react';
import { GameCanvas } from '../components/GameCanvas';

export function MenuPage() {
const navigate = useNavigate();
const { actions } = useGame();
const { topScore } = useScores();
const { settings } = useSettings();

useEffect(() => {
actions.resetGame();
}, [actions]);

const handlePlay = () => {
actions.startGame();
navigate('/game');
};

return (

<div className="flex flex-col items-center justify-center min-h-[80vh] gap-6"> <div className="flex items-center gap-3"> <Gamepad2 className="w-10 h-10 text-slate-700 dark:text-slate-300" /> <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-200"> BKACK </h1> </div> <p className="text-slate-500 dark:text-slate-400 text-center"> Break the bricks, forge your score </p> <div className="w-full max-w-sm"> <GameCanvas isPreview /> </div>

{topScore > 0 && (

<div className="text-center"> <p className="text-sm text-slate-400 dark:text-slate-500"> Meilleur score </p> <p className="text-2xl font-bold text-slate-700 dark:text-slate-300"> {topScore} </p> </div> )} <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs"> <Button onClick={handlePlay} size="lg" className="flex-1"> <Play className="w-5 h-5 mr-2" /> Jouer </Button> <Button variant="secondary" onClick={() => navigate('/scores')} className="flex-1" > <Trophy className="w-5 h-5 mr-2" /> Scores </Button> </div>

<Button
variant="ghost"
onClick={() => navigate('/settings')}
className="mt-2"

<Settings className="w-5 h-5 mr-2" /> Paramètres </Button> </div> ); }