x
import React from 'react';
import { useGame } from '../contexts/GameContext';
export function GameControls() {
const { state, startGame, pauseGame, resumeGame, resetGame } = useGame();
return (
    <div className="flex flex-col gap-2">
      {!state.isPlaying ? (
        <button
          onClick={startGame}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-colors"
        >
          Commencer
        </button>
      ) : state.paused ? (
        <button
          onClick={resumeGame}
          className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg shadow-lg transition-colors"
        >
          Reprendre
        </button>
      ) : (
        <button
          onClick={pauseGame}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-lg transition-colors"
        >
          Pause
        </button>
      )}
      <button
        onClick={resetGame}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transition-colors"
      >
        Réinitialiser
      </button>
    </div>
  );
}