import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Star, Heart } from 'lucide-react';
import { useGame } from '../hooks/useGames';
import { useFavorites } from '@app/contexts/FavoritesContext';
import { formatDate } from '@shared/utils/formatDate';
import { LoadingScreen } from '@shared/components/ui/LoadingScreen';
import { ErrorMessage } from '@shared/components/ui/ErrorMessage';
import { Button } from '@shared/components/ui/Button';
import { Card } from '@shared/components/ui/Card';
import { motion } from 'framer-motion';

export default function GameDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: game, isLoading, error, refetch } = useGame(id || '');
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !game) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <ErrorMessage
          title="Jeu introuvable"
          message="Impossible de charger les détails de ce jeu."
          onRetry={() => refetch()}
          fullPage
        />
      </div>
    );
  }

  const isFav = isFavorite(game.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 pb-8"
    >
      <div className="relative">
        <div className="relative h-[280px] md:h-[400px] overflow-hidden">
          <img
            src={game.background_image || 'https://images.rawg.io/placeholder.jpg'}
            alt={game.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.rawg.io/placeholder.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 to-transparent" />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 z-10 p-2 rounded-full glass hover:bg-white/10 transition-all duration-200"
            aria-label="Retour"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                    {game.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(game.released)}
                    </span>
                    {game.metacritic && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                        {game.metacritic}
                      </span>
                    )}
                    {game.rating && (
                      <span className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                        {game.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant={isFav ? 'secondary' : 'primary'}
                  icon={<Heart className={`w-4 h-4 ${isFav ? 'fill-red-400 text-red-400' : ''}`} />}
                  onClick={() => toggleFavorite(game.id)}
                  className="shrink-0"
                  size="sm"
                >
                  {isFav ? 'Favori' : 'Ajouter'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto px-4 -mt-4 relative z-10">
        <Card variant="glass" padding="lg" className="space-y-5">
          {game.description_raw && (
            <div>
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Synopsis
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {game.description_raw}
              </p>
            </div>
          )}
        </Card>
      </div>
    </motion.div>
  );
}