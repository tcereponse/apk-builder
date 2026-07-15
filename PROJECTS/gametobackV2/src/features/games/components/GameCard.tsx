import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameCardProps } from '@shared/types/game.types';
import { formatDate } from '@shared/utils/formatDate';
import { formatPlatforms } from '@shared/utils/formatPlatforms';
import { truncateText } from '@shared/utils/truncateText';
import { FavoriteButton } from '@features/favorites/components/FavoriteButton';
function GameCardComponent({ game, index = 0, onFavoriteToggle, isFavorite = false }: GameCardProps) {
const imageUrl = game.background_image || 'https://images.rawg.io/placeholder.jpg';
return (
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.4, ease: 'easeOut' }}
className="relative group rounded-xl overflow-hidden aspect-[2/3] bg-zinc-900/80"
      <Link to={`/game/${game.id}`} className="block w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={imageUrl}
            alt={game.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.rawg.io/placeholder.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 via-40% to-transparent" />          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton
              gameId={game.id}
              initialFavorite={isFavorite}
              onToggle={onFavoriteToggle}
              size="sm"
            />
          </div>          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1.5">
            <h3 className="text-base font-bold text-white leading-tight line-clamp-2">
              {game.name}
            </h3>            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="opacity-80">{formatDate(game.released)}</span>
              {game.metacritic && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                  {game.metacritic}
                </span>
              )}
            </div>            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {truncateText(game.description_raw || game.description, 100)}
            </p>            <div className="flex flex-wrap gap-1.5 pt-1">
              {game.platforms.slice(0, 3).map((p) => (
                <span
                  key={p.platform.id}
                  className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-medium text-zinc-400 border border-white/5"
                >
                  {p.platform.name}
                </span>
              ))}
              {game.platforms.length > 3 && (
                <span className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-medium text-zinc-500">
                  +{game.platforms.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
export const GameCard = memo(GameCardComponent);