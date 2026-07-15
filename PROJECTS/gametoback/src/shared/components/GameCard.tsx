import { Link } from 'react-router-dom';
import { Game } from '@shared/types/game';
import { getReleaseYear, getPlatformNames, formatDescription } from '@shared/services/gameService';
import { Calendar, Monitor, Star } from 'lucide-react';
import clsx from 'clsx';

interface GameCardProps {
  game: Game;
  className?: string;
}

export function GameCard({ game, className }: GameCardProps) {
  const year = getReleaseYear(game);
  const platforms = getPlatformNames(game);
  const description = formatDescription(game.description_raw || game.description);

  return (
    <Link
      to={`/game/${game.id}`}
      className={clsx(
        'group relative flex h-full w-full flex-col overflow-hidden rounded-xl transition-all duration-500',
        'glass-panel hover:scale-[1.02] hover:shadow-glow',
        className
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-diamond-surface/60">
        {game.background_image ? (
          <>
            <img
              src={game.background_image}
              alt={game.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-diamond-base/80 via-diamond-base/30 to-transparent" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-diamond-surface/40">
            <span className="text-sm text-diamond-muted/50">No cover</span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <div className="flex items-center gap-1 rounded-full bg-diamond-base/60 px-2 py-0.5 backdrop-blur-sm">
            <Star className="h-3 w-3 fill-yellow-500/70 text-yellow-500/70" strokeWidth={2} />
            <span className="text-xs font-medium text-diamond-text">
              {game.rating ? game.rating.toFixed(1) : '—'}
            </span>
          </div>
          {game.metacritic && (
            <div className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
              {game.metacritic}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-diamond-text transition-colors group-hover:text-white">
          {game.name}
        </h3>

        <div className="flex flex-wrap items-center gap-1.5 text-xs text-diamond-muted">
          {year && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" strokeWidth={1.5} />
              {year}
            </span>
          )}
          {platforms.length > 0 && (
            <span className="flex items-center gap-1">
              <Monitor className="h-3 w-3" strokeWidth={1.5} />
              {platforms.slice(0, 2).join(', ')}
              {platforms.length > 2 && ` +${platforms.length - 2}`}
            </span>
          )}
        </div>

        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-diamond-muted/80">
          {description}
        </p>
      </div>
    </Link>
  );
}