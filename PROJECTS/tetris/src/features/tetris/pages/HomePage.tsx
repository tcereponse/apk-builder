import { useNavigate } from 'react-router-dom';
import { useGame } from '@app/contexts/GameContext';
import { useScore } from '@app/contexts/ScoreContext';
function HomePage() {
const navigate = useNavigate();
const { actions } = useGame();
const { highScores } = useScore();
const handleStart = () => {
actions.startGame();
navigate('/game');
};
const bestScore = highScores.length > 0 ? highScores[0].score : 0;
return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 gap-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">TETRIS</h1>
        <p className="text-slate-400 text-sm">Diamond Forge Edition</p>
      </div>      <div className="w-full max-w-xs space-y-4">
        <button
          onClick={handleStart}
          className="w-full py-4 px-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-200 text-lg shadow-lg hover:shadow-xl active:scale-95"
        >
          Nouvelle Partie
        </button><button
onClick={() => navigate('/stats')}
className="w-full py-3 px-6 bg-slate-900/50 hover:bg-slate-800/50 text-slate-300 font-medium rounded-lg transition-all duration-200 border border-slate-800"
Statistiques
</button>
      </div>{bestScore > 0 && (
        <div className="text-center mt-4">
          <p className="text-slate-500 text-sm">Meilleur score</p>
          <p className="text-2xl font-bold text-white">{bestScore}</p>
        </div>
      )}
    </div>
  );
};
export default HomePage;