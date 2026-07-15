import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-diamond-base">
      <Header />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}