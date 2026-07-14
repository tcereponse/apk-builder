x
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Settings, Trophy, Gamepad2 } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export function Header() {
const location = useLocation();
const navigate = useNavigate();
const { state } = useGame();

const isGameActive = state.status === 'active' || state.status === 'idle';

const handleHomeClick = () => {
if (isGameActive) {
if (confirm('Voulez-vous quitter la partie en cours ?')) {
navigate('/');
}
} else {
navigate('/');
}
};

const isActive = (path: string) => location.pathname === path;

return (

<header className="sticky top-0 z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700"> <div className="container mx-auto px-4 py-3 flex items-center justify-between"> <Link to="/" className="flex items-center gap-2"> <Gamepad2 className="w-6 h-6 text-slate-700 dark:text-slate-300" /> <span className="text-xl font-bold text-slate-800 dark:text-slate-200">BKACK</span> </Link> <nav className="flex items-center gap-1 sm:gap-2"> <button onClick={handleHomeClick} className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${isActive('/') ? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`} aria-label="Accueil" > <Home className="w-5 h-5 text-slate-600 dark:text-slate-400" /> </button> <Link to="/scores" className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${isActive('/scores') ? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`} aria-label="Scores" > <Trophy className="w-5 h-5 text-slate-600 dark:text-slate-400" /> </Link> <Link to="/settings" className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${isActive('/settings') ? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`} aria-label="Paramètres" > <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" /> </Link> </nav> </div> </header> ); }