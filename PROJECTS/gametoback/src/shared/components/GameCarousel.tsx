import { useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Game } from '@shared/types/game';
import { GameCard } from './GameCard';
import { GameCardSkeleton } from './GameCardSkeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GameCarouselProps {
  games: Game[];
  title?: string;
  isLoading?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
}

export function GameCarousel({
  games,
  title,
  isLoading = false,
  autoplay = false,
  autoplayDelay = 4000,
}: GameCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: true,
      loop: true,
      skipSnaps: false,
      slidesToScroll: 1,
    },
    autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })] : []
  );

  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!emblaApi) return;

    const onPrev = () => emblaApi.scrollPrev();
    const onNext = () => emblaApi.scrollNext();

    const prevBtn = prevButtonRef.current;
    const nextBtn = nextButtonRef.current;

    if (prevBtn) prevBtn.addEventListener('click', onPrev);
    if (nextBtn) nextBtn.addEventListener('click', onNext);

    return () => {
      if (prevBtn) prevBtn.removeEventListener('click', onPrev);
      if (nextBtn) nextBtn.removeEventListener('click', onNext);
    };
  }, [emblaApi]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {title && (
          <div className="flex items-center justify-between px-4">
            <div className="h-6 w-40 rounded bg-diamond-surface/40 animate-pulse" />
          </div>
        )}
        <div className="overflow-hidden">
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="min-w-[180px] flex-1 basis-[180px]">
                <GameCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border border-diamond-border/30 bg-diamond-surface/20">
        <p className="text-sm text-diamond-muted">Aucun jeu disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {title && (
        <div className="flex items-center justify-between px-4">
          <h2 className="text-lg font-medium tracking-tight text-diamond-text">{title}</h2>
          <span className="text-xs font-light text-diamond-muted/60 uppercase tracking-widest">
            {games.length} jeux
          </span>
        </div>
      )}

      <div className="relative">
        <div className="carousel-container overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {games.map((game) => (
              <div
                key={game.id}
                className="min-w-[160px] flex-1 basis-[160px] sm:min-w-[200px] sm:basis-[200px] lg:min-w-[240px] lg:basis-[240px]"
              >
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </div>

        <button
          ref={prevButtonRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 rounded-full bg-diamond-base/80 p-1.5 text-diamond-text shadow-glass backdrop-blur-sm transition-all hover:bg-diamond-surface/80 hover:scale-110 sm:-translate-x-4 sm:p-2"
          aria-label="Précédent"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
        </button>

        <button
          ref={nextButtonRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 rounded-full bg-diamond-base/80 p-1.5 text-diamond-text shadow-glass backdrop-blur-sm transition-all hover:bg-diamond-surface/80 hover:scale-110 sm:translate-x-4 sm:p-2"
          aria-label="Suivant"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}