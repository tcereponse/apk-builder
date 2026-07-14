interface ScoreBoardProps {
score: number;
level: number;
lines: number;
}
function ScoreBoard({ score, level, lines }: ScoreBoardProps) {
return (
    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 space-y-3">
      <div>
        <p className="text-slate-500 text-xs">Score</p>
        <p className="text-2xl font-bold text-white">{score}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-slate-500 text-xs">Niveau</p>
          <p className="text-lg font-bold text-white">{level}</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs">Lignes</p>
          <p className="text-lg font-bold text-white">{lines}</p>
        </div>
      </div>
    </div>
  );
};
export default ScoreBoard;