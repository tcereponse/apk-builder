import { useNavigate } from 'react-router-dom';
import { useScore } from '@app/contexts/ScoreContext';
import { useStats } from '@app/contexts/StatsContext';
import { ArrowLeft, Trophy, Clock, LayoutGrid, TrendingUp } from 'lucide-react';
function StatsPage() {
const navigate = useNavigate();
const { highScores } = useScore();
const { stats } = useStats();
const formatTime = (seconds: number) => {
const mins = Math.floor(seconds / 60);
const secs = seconds % 60;
return ${mins}:${secs.toString().padStart(2, '0')};
};
return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        Retour
      </button>      <h1 className="text-3xl font-bold text-white mb-8">Statistiques</h1>      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Trophy size={18} />
            <span className="text-xs">Parties</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalGames}</p>
        </div>
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Clock size={18} />
            <span className="text-xs">Temps joué</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatTime(stats.totalTime)}</p>
        </div>
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <LayoutGrid size={18} />
            <span className="text-xs">Lignes totales</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalLines}</p>
        </div>
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <TrendingUp size={18} />
            <span className="text-xs">Niveau max</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.maxLevel}</p>
        </div>
      </div>      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Meilleurs scores</h2>
        {highScores.length === 0 ? (
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800 text-center">
            <p className="text-slate-400">Aucune partie jouée pour l'instant.</p>
            <p className="text-slate-500 text-sm mt-1">Lance-toi !</p>
          </div>
        ) : (
          <div className="space-y-2">
            {highScores.map((score, index) => (
              <div
                key={index}
                className="bg-slate-900/50 rounded-lg p-4 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-slate-500">#{index + 1}</span>
                  <div>
                    <p className="text-lg font-bold text-white">{score.score}</p>
                    <p className="text-xs text-slate-500">
                      Niveau {score.level} • {score.lines} lignes
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  {new Date(score.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default StatsPage;