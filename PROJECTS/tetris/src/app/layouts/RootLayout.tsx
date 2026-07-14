import { Outlet, Link } from 'react-router-dom';
import { Trophy, Settings } from 'lucide-react';
function RootLayout() {
return (
    <div className="min-h-screen bg-slate-950 flex flex-col safe-area-top safe-area-bottom">
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white tracking-tight">
          TETRIS
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/stats" className="text-slate-400 hover:text-white transition-colors" aria-label="Statistiques">
            <Trophy size={24} />
          </Link>
          <Link to="/settings" className="text-slate-400 hover:text-white transition-colors" aria-label="Paramètres">
            <Settings size={24} />
          </Link>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
export default RootLayout;