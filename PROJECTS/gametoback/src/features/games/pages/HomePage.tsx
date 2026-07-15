import { useInfiniteGames } from '@shared/hooks/useGames';
import { GameCarousel } from '@shared/components/GameCarousel';
import { useMemo } from 'react';

const YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

export default function HomePage() {
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteGames({
    pageSize: 30,
  });

  const allGames = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.results);
  }, [data]);

  const gamesByYear = useMemo(() => {
    const map = new Map<number, typeof allGames>();
    YEARS.forEach((year) => map.set(year, []));

    allGames.forEach((game) => {
      if (!game.released) return;
      const year = new Date(game.released).getFullYear();
      if (map.has(year)) {
        map.get(year)!.push(game);
      }
    });

    return map;
  }, [allGames]);

  const latestGames = useMemo(() => {
    return allGames.slice(0, 12);
  }, [allGames]);

  const popularGames = useMemo(() => {
    return [...allGames]
      .filter((g) => g.rating && g.rating > 3.5)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 12);
  }, [allGames]);

  return (
    <div className="pb-12 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex items-center gap-2 border-b border-diamond-border/30 pb-4">
          <div className="h-1 w-1 rounded-full bg-diamond-text/30" />
          <span className="text-xs font-light uppercase tracking-[0.3em] text-diamond-muted/60">
            Catalogue 1989–2026
          </span>
          <div className="ml-auto text-xs text-diamond-muted/40">
            {allGames.length} jeux chargés
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 w-40 rounded bg-diamond-surface/40 animate-pulse" />
                <div className="flex gap-4 overflow-hidden">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <div key={j} className="min-w-[180px] flex-1 basis-[180px]">
                      <div className="aspect-[3/4] w-full rounded-xl bg-diamond-surface/40 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            <GameCarousel title="Dernières Sorties" games={latestGames} autoplay autoplayDelay={5000} />

            <GameCarousel title="Les Mieux Notés" games={popularGames} />

            {YEARS.map((year) => {
              const games = gamesByYear.get(year) || [];
              if (games.length === 0) return null;
              return (
                <GameCarousel
                  key={year}
                  title={`Sorties ${year}`}
                  games={games.slice(0, 12)}
                />
              );
            })}

            {hasNextPage && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => fetchNextPage()}
                  className="rounded-full border border-diamond-border/30 px-8 py-2 text-sm text-diamond-muted transition-all hover:border-diamond-text/30 hover:text-diamond-text"
                >
                  Charger plus
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}