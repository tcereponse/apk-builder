import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GameCard } from './GameCard';
import { GameCardSkeleton } from '@shared/components/ui/Skeleton';
import { ErrorMessage } from '@shared/components/ui/ErrorMessage';
import { EmptyState } from '@shared/components/ui/EmptyState';
import { CarouselProps } from '@shared/constants/api';
import { useFavorites } from '@app/contexts/FavoritesContext';
import { motion, AnimatePresence } from 'framer-motion';
export function Carousel({
games,
title,
subtitle,
loading = false,
error = null,
onRetry,
slidesPerView = 2.2,
autoplay = true,
autoplayDelay = 4000,
}: CarouselProps) {
const [emblaRef, emblaApi] = useEmblaCarousel(
{
align: 'start',
containScroll: 'trimSnaps',
dragFree: false,
loop: autoplay,
slidesToScroll: 1,
breakpoints: {
'(min-width: 640px)': { slidesToScroll: 2 },
'(min-width: 1024px)': { slidesToScroll: 3 },
},
},
autoplay ? [AutoPlay({ delay: autoplayDelay, stopOnInteraction: true })] : []
);
const [canScrollPrev, setCanScrollPrev] = useState(false);
const [canScrollNext, setCanScrollNext] = useState(false);
const { isFavorite, toggleFavorite } = useFavorites();
const onSelect = useCallback(() => {
if (!emblaApi) return;
setCanScrollPrev(emblaApi.canScrollPrev());
setCanScrollNext(emblaApi.canScrollNext());
}, [emblaApi]);
useEffect(() => {
if (!emblaApi) return;
onSelect();
emblaApi.on('select', onSelect);
return () => {
emblaApi.off('select', onSelect);
};
}, [emblaApi, onSelect]);
const scrollPrev = useCallback(() => {
if (emblaApi) emblaApi.scrollPrev();
}, [emblaApi]);
const scrollNext = useCallback(() => {
if (emblaApi) emblaApi.scrollNext();
}, [emblaApi]);
const renderContent = () => {
if (loading) {
return (
        <div className="flex gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="min-w-[160px] flex-1 basis-[160px]">
              <GameCardSkeleton />
            </div>
          ))}
        </div>
      );
    }if (error) {
return (
        <div className="py-8">
          <ErrorMessage
            title="Erreur de chargement"
            message="Impossible de charger les jeux pour cette section."
            onRetry={onRetry}
          />
        </div>
      );
    }if (games.length === 0) {
return (
        <div className="py-8">
          <EmptyState
            title="Aucun jeu disponible"
            message="Aucun jeu n'a été trouvé pour cette section."
          />
        </div>
      );
    }return (
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {games.map((game, index) => (
            <div
              key={game.id}
              className="min-w-[140px] max-w-[200px] flex-1 basis-[140px] md:basis-[160px] lg:basis-[200px]"
            >
              <GameCard
                game={game}
                index={index}
                isFavorite={isFavorite(game.id)}
                onFavoriteToggle={() => toggleFavorite(game.id)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };return (
    <section className="relative w-full py-2">
      <div className="flex items-end justify-between mb-4 px-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gradient tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-zinc-400 mt-0.5">{subtitle}</p>
          )}
        </div>{!loading && !error && games.length > 0 && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="p-1.5 rounded-full glass hover:bg-white/10 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="p-1.5 rounded-full glass hover:bg-white/10 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Suivant"
            >
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        )}
      </div>      <div className="relative px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={loading ? 'loading' : 'content'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}