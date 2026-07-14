import { Outlet } from 'react-router-dom';
function GameLayout() {
return (
    <div className="h-screen w-screen bg-slate-950 flex items-center justify-center overflow-hidden safe-area-top safe-area-bottom">
      <Outlet />
    </div>
  );
};
export default GameLayout;