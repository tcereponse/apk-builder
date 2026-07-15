import React, { useState, useEffect } from 'react';
import { useGame } from '@/app/contexts/GameContext';
export default function StatisticsDisplay() {
const { state } = useGame();
const [time, setTime] = useState(0);
const [piecesPlaced, setPiecesPlaced] = useState(0);
const [linesCleared, setLinesCleared] = useState(0);
useEffect(() => {
if (state.status === 'playing') {
const interval = setInterval(() => setTime(t => t + 1), 1000);
return () => clearInterval(interval);
}
}, [state.status]);
useEffect(() => {
setLinesCleared(state.lines);
}, [state.lines]);
return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 text-gray-300 space-y-1 text-sm">
      <div>⏱ {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}</div>
      <div>🧱 Pieces: {piecesPlaced}</div>
      <div>📊 Efficiency: {linesCleared > 0 ? Math.round(piecesPlaced / linesCleared) : 0}</div>
    </div>
  );
}