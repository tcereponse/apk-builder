import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GameFilters } from '@shared/types/game.types';
interface UseGamesFiltersReturn {
filters: GameFilters;
setSearch: (search: string) => void;
setYear: (year: string) => void;
setPlatform: (platform: string) => void;
setGenre: (genre: string) => void;
setOrdering: (ordering: string) => void;
setPage: (page: number) => void;
resetFilters: () => void;
updateFilters: (newFilters: Partial<GameFilters>) => void;
}
const DEFAULT_FILTERS: GameFilters = {
search: '',
year: '',
platform: '',
genre: '',
ordering: '-released',
page: 1,
pageSize: 20,
};
export function useGamesFilters(): UseGamesFiltersReturn {
const [searchParams, setSearchParams] = useSearchParams();
const [filters, setFilters] = useState<GameFilters>(() => {
const search = searchParams.get('search') || '';
const year = searchParams.get('year') || '';
const platform = searchParams.get('platform') || '';
const genre = searchParams.get('genre') || '';
const ordering = searchParams.get('ordering') || '-released';
const page = parseInt(searchParams.get('page') || '1', 10);
const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);
return { search, year, platform, genre, ordering, page, pageSize };
});
useEffect(() => {
const params: Record<string, string> = {};
if (filters.search) params.search = filters.search;
if (filters.year) params.year = filters.year;
if (filters.platform) params.platform = filters.platform;
if (filters.genre) params.genre = filters.genre;
if (filters.ordering && filters.ordering !== '-released') params.ordering = filters.ordering;
if (filters.page && filters.page > 1) params.page = String(filters.page);
if (filters.pageSize && filters.pageSize !== 20) params.pageSize = String(filters.pageSize);
setSearchParams(params, { replace: true });
}, [filters, setSearchParams]);
const setSearch = useCallback((search: string) => {
setFilters((prev) => ({ ...prev, search, page: 1 }));
}, []);
const setYear = useCallback((year: string) => {
setFilters((prev) => ({ ...prev, year, page: 1 }));
}, []);
const setPlatform = useCallback((platform: string) => {
setFilters((prev) => ({ ...prev, platform, page: 1 }));
}, []);
const setGenre = useCallback((genre: string) => {
setFilters((prev) => ({ ...prev, genre, page: 1 }));
}, []);
const setOrdering = useCallback((ordering: string) => {
setFilters((prev) => ({ ...prev, ordering, page: 1 }));
}, []);
const setPage = useCallback((page: number) => {
setFilters((prev) => ({ ...prev, page }));
}, []);
const resetFilters = useCallback(() => {
setFilters(DEFAULT_FILTERS);
}, []);
const updateFilters = useCallback((newFilters: Partial<GameFilters>) => {
setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
}, []);
return {
filters,
setSearch,
setYear,
setPlatform,
setGenre,
setOrdering,
setPage,
resetFilters,
updateFilters,
};
}