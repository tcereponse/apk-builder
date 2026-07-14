x

import { Outlet } from 'react-router-dom'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4 safe-area-padding">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
      <footer className="text-center text-slate-500 text-xs py-4 safe-area-padding">
        JACK v1.0 • Casse-brique
      </footer>
    </div>
  )
}