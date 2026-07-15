import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { fetchGames, fetchGameById, fetchGamesByIds } from '@shared/services/api';
import { GameFilters } from '@shared/types/game.types';
export function useGames(filters: GameFilters = {}) {
const { search, year, platform, genre, ordering = '-released', page = 1, pageSize = 20 } = filters;
const queryKey = ['games', { search, year, platform, genre, ordering, page, pageSize }];
return useQuery({
queryKey,
queryFn: () =>
fetchGames({
search,
year,
platform,
genre,
ordering,
page,
pageSize,
}),
staleTime: 5 * 60 * 1000,
gcTime: 30 * 60 * 1000,
});
}
export function useInfiniteGames(filters: Omit<GameFilters, 'page'> = {}) {
const { search, year, platform, genre, ordering = '-released', pageSize = 20 } = filters;
return useInfiniteQuery({
queryKey: ['games', 'infinite', { search, year, platform, genre, ordering, pageSize }],
queryFn: ({ pageParam = 1 }) =>
fetchGames({
search,
year,
platform,
genre,
ordering,
page: pageParam,
pageSize,
}),
getNextPageParam: (lastPage) => {
if (!lastPage.next) return undefined;
const url = new URL(lastPage.next);
const page = url.searchParams.get('page');
return page ? parseInt(page, 10) : undefined;
},
initialPageParam: 1,
staleTime: 5 * 60 * 1000,
gcTime: 30 * 60 * 1000,
});
}
export function useGame(id: number | string) {
return useQuery({
queryKey: ['game', id],
queryFn: () => fetchGameById(id),
staleTime: 10 * 60 * 1000,
gcTime: 30 * 60 * 1000,
enabled: !!id,
});
}
export function useGamesByIds(ids: number[]) {
const idsString = ids.slice().sort().join(',');
return useQuery({
queryKey: ['games', 'batch', idsString],
queryFn: () => fetchGamesByIds(ids),
staleTime: 5 * 60 * 1000,
gcTime: 30 * 60 * 1000,
enabled: ids.length > 0,
});
}