x
import { useNavigate } from 'react-router-dom';
import { RotateCcw, Home, Share2, Trophy } from 'lucide-react';
import { Button } from '@shared/components/Button';
import { useGame } from '@app/contexts/GameContext';
import { useScores } from '@app/contexts/ScoreContext';

export function GameOverPage() {
const navigate = useNavigate();
const { state, actions } = useGame();
const { topScore } = useScores();

const isNewRecord = state.score > 0 && state.score >= topScore;

const handleReplay = () => {
actions.startGame();
navigate('/game');
};

const handleMenu = () => {
actions.resetGame();
navigate('/');
};

const handleShare = async () => {
const text = 🎯 Score: ${state.score} | Niveau: ${state.level} | BKACK Casse-briques;
try {
if (navigator.share) {
await navigator.share({ title: 'BKACK Score', text });
} else {
await navigator.clipboard?.writeText(text);
alert('Score copié dans le presse-papier !');
}
} catch {
// User cancelled
}
};

return (

<div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 p-4"> <div className="text-center"> <div className="text-6xl mb-4">💎</div> <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-200"> Game Over </h1> </div> <div className="card w-full max-w-sm text-center"> <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700"> <span className="text-slate-500 dark:text-slate-400">Score</span> <span className="text-3xl font-bold text-slate-800 dark:text-slate-200"> {state.score} </span> </div> <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700"> <span className="text-slate-500 dark:text-slate-400">Niveau</span> <span className="text-xl font-semibold text-slate-700 dark:text-slate-300"> {state.level} </span> </div> <div className="flex justify-between items-center py-3"> <span className="text-slate-500 dark:text-slate-400">Briques détruites</span> <span className="text-xl font-semibold text-slate-700 dark:text-slate-300"> {state.bricksDestroyed} </span> </div>

{isNewRecord && (

<div className="mt-3 p-2 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-lg border border-yellow-500/30"> <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-400"> <Trophy className="w-5 h-5" /> <span className="font-semibold">Nouveau record !</span> <Trophy className="w-5 h-5" /> </div> </div> )} </div> <div className="flex flex-wrap gap-4 justify-center"> <Button onClick={handleReplay} size="lg"> <RotateCcw className="w-5 h-5 mr-2" /> Rejouer </Button> <Button variant="secondary" onClick={handleMenu}> <Home className="w-5 h-5 mr-2" /> Menu </Button> <Button variant="ghost" onClick={handleShare}> <Share2 className="w-5 h-5 mr-2" /> Partager </Button> </div> </div> ); }