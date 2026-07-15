import React from 'react';
export function LoadingScreen() {
return (
    <div className="flex-1 min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-3 border-sky-500/20 border-t-sky-400 animate-spin" />
        </div>
        <p className="text-sm text-zinc-500 animate-pulse">Chargement...</p>
      </div>
    </div>
  );
}