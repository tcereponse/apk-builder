x
import React from 'react';
import { Board } from '../components/Board';
import { GameControls } from '../components/GameControls';
import { GameStats } from '../components/GameStats';
import { useGame } from '../contexts/GameContext';
import { useGameLoop } from '../hooks/useGameLoop';
export function GamePage() {
const { state } = useGame();
useGameLoop();
return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-purple-500/20">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-center">
              TETRIS
            </h1>
            <Board board={state.board} />
          </div>
          <div className="flex flex-col gap-6 min-w-[200px]">
            <GameStats />
            <GameControls />
          </div>
        </div>
      </div>
    </div>
  );
}