import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Radio, Activity } from 'lucide-react';

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto bg-[#151718] border-x border-[#26292b] relative shadow-2xl">
      {/* Top Status Bar - Precision Graphics */}
      <header className="h-14 border-b border-[#26292b] bg-[#151718]/80 backdrop-blur-md flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#38bdf8]" />
          <span className="text-xs font-mono tracking-[0.3em] text-[#94a3b8]">GG // CORE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
          <span className="text-[10px] font-mono text-[#10b981] tracking-wider">DIAMOND STABLE</span>
        </div>
      </header>

      {/* Main Container Core */}
      <main className="flex-1 overflow-y-auto relative bg-[#0e1011]">
        <Outlet />
      </main>

      {/* Navigation Cockpit */}
      <nav className="h-16 border-t border-[#26292b] bg-[#151718]/90 backdrop-blur-md flex items-center justify-around px-2 z-50">
        <button
          onClick={() => navigate('/feed')}
          className={`flex flex-col items-center justify-center gap-1 w-20 h-12 rounded-lg transition-all ${
            location.pathname === '/feed' ? 'text-[#38bdf8] bg-[#1e293b]' : 'text-[#64748b] hover:text-[#94a3b8]'
          }`}
        >
          <Radio className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-widest">Feed</span>
        </button>

        <button
          onClick={() => navigate('/sandbox')}
          className={`flex flex-col items-center justify-center gap-1 w-20 h-12 rounded-lg transition-all ${
            location.pathname === '/sandbox' ? 'text-[#38bdf8] bg-[#1e293b]' : 'text-[#64748b] hover:text-[#94a3b8]'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-widest">Lab</span>
        </button>
      </nav>
    </div>
  );
}