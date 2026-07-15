import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getGames, getGameDetails, getGameScreenshots, GameFilters } from '@shared/services/gameService';

export function useGames(filters: GameFilters = {}) {
  return useQuery({
    queryKey: ['games', filters],
    queryFn: () => getGames(filters),
    staleTime: 1000 * 60 * 5,
  });
}

export function useInfiniteGames(filters: Omit<GameFilters, 'page'> = {}) {
  return useInfiniteQuery({
    queryKey: ['games-infinite', filters],
    queryFn: ({ pageParam = 1 }) => getGames({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGameDetails(id: string | number) {
  return useQuery({
    queryKey: ['game-details', id],
    queryFn: () => getGameDetails(id),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  });
}

export function useGameScreenshots(id: string | number) {
  return useQuery({
    queryKey: ['game-screenshots', id],
    queryFn: () => getGameScreenshots(id),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  });
}