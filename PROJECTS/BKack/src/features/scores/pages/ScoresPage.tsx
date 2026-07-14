x
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trophy, Trash2 } from 'lucide-react';
import { Button } from '@shared/components/Button';
import { EmptyState } from '@shared/components/EmptyState';
import { useScores } from '@app/contexts/ScoreContext';

export function ScoresPage() {
const navigate = useNavigate();
const { scores, isLoading, actions } = useScores();

useEffect(() => {
actions.loadScores();
}, [actions]);

const handleClear = async () => {
if (confirm('Voulez-vous effacer tous les scores ?')) {
await actions.clearScores();
}
};

const formatDate = (dateStr: string) => {
const date = new Date(dateStr);
return date.toLocaleDateString('fr-FR', {
day: '2-digit',
month: '2-digit',
year: 'numeric',
hour: '2-digit',
minute: '2-digit'
});
};

if (isLoading) {
return (

<div className="flex items-center justify-center min-h-[60vh]"> <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-slate-800 dark:border-slate-700 dark:border-t-slate-200" /> </div> ); }

return (

<div className="max-w-md mx-auto py-6"> <div className="flex items-center justify-between mb-6"> <button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px]" aria-label="Retour" > <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" /> </button> <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200"> Scores </h1> <div className="w-10" /> </div>

{scores.length === 0 ? (
<EmptyState
title="Aucun score"
description="Jouez une partie pour enregistrer votre premier score !"
icon="🏆"
action={
<Button onClick={() => navigate('/')}>
Jouer maintenant
</Button>
}
/>
) : (
<>

<div className="space-y-2"> {scores.map((score, index) => ( <div key={score.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700" > <div className="flex items-center gap-4"> <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300"> {index + 1} </div> <div> <div className="text-lg font-bold text-slate-800 dark:text-slate-200"> {score.score} </div> <div className="text-xs text-slate-400 dark:text-slate-500"> Niveau {score.level} • {formatDate(score.date)} </div> </div> </div> {index === 0 && ( <Trophy className="w-5 h-5 text-yellow-500" /> )} </div> ))} </div> <div className="mt-6 text-center"> <Button variant="ghost" onClick={handleClear} className="text-red-500 hover:text-red-600" > <Trash2 className="w-4 h-4 mr-2" /> Effacer tous les scores </Button> </div> </> )} </div> ); }