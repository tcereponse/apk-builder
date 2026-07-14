x

import { Outlet } from 'react-router-dom'

export function GameLayout() {
  return (
    <div className="h-screen w-screen bg-slate-900 overflow-hidden flex items-center justify-center safe-area-padding">
      <Outlet />
    </div>
  )
}