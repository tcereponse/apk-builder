import React from 'react';
interface ScoreBoardProps {
score: number;
level: number;
lines: number;
}
export default function ScoreBoard({ score, level, lines }: ScoreBoardProps) {
return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 text-gray-300 space-y-2">
      <div>Score: <span className="text-white font-bold">{score}</span></div>
      <div>Level: <span className="text-white font-bold">{level}</span></div>
      <div>Lines: <span className="text-white font-bold">{lines}</span></div>
    </div>
  );
}