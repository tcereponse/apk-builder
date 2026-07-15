import { Link } from 'react-router-dom';
import { Gamepad2, Search, Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-diamond-border/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-white/5 blur-xl" />
            <Gamepad2 className="relative h-7 w-7 text-diamond-text" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-light tracking-[0.2em] text-diamond-text uppercase">
            GAMETOBACK
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded-full p-2 transition-colors hover:bg-white/5"
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5 text-diamond-muted" strokeWidth={1.5} />
          </button>
          <button className="rounded-full p-2 transition-colors hover:bg-white/5 lg:hidden" aria-label="Menu">
            <Menu className="h-5 w-5 text-diamond-muted" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-t border-diamond-border/30 px-4 py-3 sm:px-6">
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-diamond-muted" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Rechercher un jeu, une plateforme, une année..."
              className="w-full rounded-full border border-diamond-border/40 bg-diamond-surface/50 px-10 py-2.5 text-sm text-diamond-text placeholder:text-diamond-muted/60 outline-none transition-all focus:border-diamond-text/30 focus:ring-1 focus:ring-diamond-text/20"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}