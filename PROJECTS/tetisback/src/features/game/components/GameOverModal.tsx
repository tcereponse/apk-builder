import React from 'react';
import { useGame } from '@/app/contexts/GameContext';
interface GameOverModalProps {
score: number;
}
export default function GameOverModal({ score }: GameOverModalProps) {
const { dispatch } = useGame();
return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg text-center border border-gray-600">
        <h2 className="text-3xl font-bold text-red-500">Game Over</h2>
        <p className="text-xl text-white mt-4">Score: {score}</p>
        <button onClick={() => dispatch({ type: 'RESET' })} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">Restart</button>
      </div>
    </div>
  );
}