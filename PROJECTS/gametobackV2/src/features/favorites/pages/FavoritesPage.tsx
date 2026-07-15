import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useFavorites } from '@app/contexts/FavoritesContext';
import { useGamesByIds } from '@features/games/hooks/useGames';
import { GameCard } from '@features/games/components/GameCard';
import { LoadingScreen } from '@shared/components/ui/LoadingScreen';
import { ErrorMessage } from '@shared/components/ui/ErrorMessage';
import { EmptyState } from '@shared/components/ui/EmptyState';
import { motion } from 'framer-motion';
export default function FavoritesPage() {
const { favorites, isLoading: favoritesLoading } = useFavorites();
const { data, isLoading: gamesLoading, error, refetch } = useGamesByIds(favorites);
if (favoritesLoading) {
return <LoadingScreen />;
}
if (favorites.length === 0) {
return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] p-6">
        <EmptyState
          icon="heart"
          title="Aucun favori"
          message="Commencez à ajouter des jeux à vos favoris en cliquant sur le cœur sur les cartes de jeux."
        />
      </div>
    );
  }if (gamesLoading) {
return <LoadingScreen />;
}
if (error) {
return (
      <div className="flex-1 flex items-center justify-center p-6">
        <ErrorMessage
          title="Erreur de chargement"
          message="Impossible de charger vos jeux favoris."
          onRetry={() => refetch()}
          fullPage
        />
      </div>
    );
  }const games = data || [];
return (
    <div className="flex-1 pb-4">
      <header className="sticky top-0 z-20 glass border-b border-white/5 px-4 py-4 backdrop-blur-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-full glass hover:bg-white/10 transition-all duration-200"
              aria-label="Retour"
            >
              <ArrowLeft className="w-5 h-5 text-slate-300" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gradient">Mes Favoris</h1>
              <p className="text-xs text-zinc-500">{games.length} jeux</p>
            </div>
          </div>
          <Heart className="w-5 h-5 text-red-400 fill-red-400" />
        </div>
      </header>      <div className="max-w-3xl mx-auto px-4 pt-6">
        {games.length === 0 ? (
          <EmptyState
            icon="heart"
            title="Aucun favori"
            message="Vous n'avez pas encore de jeux favoris."
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.4) }}
              >
                <GameCard
                  game={game}
                  index={index}
                  isFavorite={true}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}