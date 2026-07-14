x
import React from 'react';
import { useGame } from '../contexts/GameContext';
export function GameStats() {
const { state } = useGame();
const stats = [
{ label: 'Score', value: state.score },
{ label: 'Niveau', value: state.level },
{ label: 'Lignes', value: state.lines }
];
return (
    <div className="bg-black/40 p-4 rounded-lg backdrop-blur-sm border border-purple-500/20">
      {stats.map((stat) => (
        <div key={stat.label} className="flex justify-between items-center py-2 border-b border-purple-500/10 last:border-0">
          <span className="text-gray-400 font-medium">{stat.label}</span>
          <span className="text-white font-bold text-xl">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}