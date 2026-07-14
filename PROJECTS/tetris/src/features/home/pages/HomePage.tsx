x
import React from 'react';
import { Link } from 'react-router-dom';
export function HomePage() {
return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8">
          TETRIS
        </h1>
        <p className="text-gray-400 text-xl mb-12">Le jeu classique revisité</p>
        <Link
          to="/game"
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl rounded-full shadow-lg transition-all transform hover:scale-105 inline-block"
        >
          Jouer
        </Link>
      </div>
    </div>
  );
}