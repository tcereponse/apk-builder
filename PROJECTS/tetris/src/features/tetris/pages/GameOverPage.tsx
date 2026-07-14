import { useNavigate } from 'react-router-dom';
import { useGame } from '@app/contexts/GameContext';
import { useScore } from '@app/contexts/ScoreContext';
import { Trophy, RotateCcw, Home } from 'lucide-react';
function GameOverPage() {
const navigate = useNavigate();
const { state, actions } = useGame();
const { highScores, isNewRecord } = useScore();
const handleRestart = () => {
actions.restart();
navigate('/game');
};
const handleHome = () => {
actions.restart();
navigate('/');
};
const bestScore = highScores.length > 0 ? highScores[0].score : 0;
return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center z-50 safe-area-top safe-area-bottom">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-rose-500 tracking-tight">GAME OVER</h1>{isNewRecord && (
            <div className="flex items-center justify-center gap-2 text-amber-400 text-lg font-semibold animate-pulse">
              <Trophy size={28} />
              <span>Nouveau Record !</span>
            </div>
          )}          <div className="bg-slate-800/50 rounded-xl p-4 space-y-2">
            <p className="text-slate-400 text-sm">Score final</p>
            <p className="text-4xl font-bold text-white">{state.score}</p>
          </div>          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <p className="text-slate-500 text-xs">Niveau</p>
              <p className="text-xl font-bold text-white">{state.level}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <p className="text-slate-500 text-xs">Lignes</p>
              <p className="text-xl font-bold text-white">{state.lines}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <p className="text-slate-500 text-xs">Record</p>
              <p className="text-xl font-bold text-white">{bestScore}</p>
            </div>
          </div>          <div className="space-y-3 pt-2">
            <button
              onClick={handleRestart}
              className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Rejouer
            </button>
            <button
              onClick={handleHome}
              className="w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameOverPage;