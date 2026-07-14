x
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function GameLayout() {
return (

<div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900"> <Header /> <main className="flex-1 container mx-auto px-4 sm:px-6 md:px-8 py-safe-top pb-safe-bottom"> <Outlet /> </main> <footer className="p-2 text-center text-xs text-slate-400 dark:text-slate-600"> BKACK v1.0 </footer> </div> ); }