x
import { Heart, Star } from 'lucide-react';
import { GameStatus } from '@shared/types/game';

interface GameHUDProps {
score: number;
lives: number;
level: number;
status: GameStatus;
}

export function GameHUD({ score, lives, level, status }: GameHUDProps) {
const isActive = status === 'active' || status === 'idle';

return (

<div className="flex items-center justify-between w-full px-4 py-3 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700"> <div className="flex items-center gap-3"> <Star className="w-5 h-5 text-yellow-500" /> <span className="text-xl font-bold text-slate-800 dark:text-slate-200"> {score} </span> </div> <div className="flex items-center gap-4"> <div className="flex items-center gap-1"> <span className="text-sm text-slate-500 dark:text-slate-400">Niv.</span> <span className="font-semibold text-slate-700 dark:text-slate-300"> {level} </span> </div> <div className="flex items-center gap-1"> {Array.from({ length: 5 }).map((_, i) => ( <Heart key={i} className={`w-5 h-5 transition-colors ${ i < lives ? 'text-red-500 fill-red-500' : 'text-slate-300 dark:text-slate-600' }`} /> ))} </div> </div>

{status === 'paused' && (

<div className="absolute left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800/90 text-white text-sm font-semibold rounded-full"> PAUSE </div> )} </div> ); }