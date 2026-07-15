import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
export function MainLayout() {
return (
    <div className="flex flex-col min-h-screen min-h-dvh bg-slate-950">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}