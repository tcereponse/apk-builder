import { useState, useCallback, useMemo } from 'react';
import { GameFilters } from '@shared/services';

interface UseGameFiltersReturn {
  filters: GameFilters;
  setSearch: (search: string) => void;
  setPlatform: (platform: string | null) => void;
  setYear: (year: number | null) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

const initialFilters: GameFilters = {
  search: '',
  platform: undefined,
  year: undefined,
  page: 1,
  pageSize: 20,
};

export function useGameFilters(): UseGameFiltersReturn {
  const [filters, setFilters] = useState<GameFilters>(initialFilters);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({
      ...prev,
      search: search || undefined,
      page: 1,
    }));
  }, []);

  const setPlatform = useCallback((platform: string | null) => {
    setFilters((prev) => ({
      ...prev,
      platform: platform || undefined,
      page: 1,
    }));
  }, []);

  const setYear = useCallback((year: number | null) => {
    setFilters((prev) => ({
      ...prev,
      year: year || undefined,
      page: 1,
    }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return !!(filters.search || filters.platform || filters.year);
  }, [filters.search, filters.platform, filters.year]);

  return {
    filters,
    setSearch,
    setPlatform,
    setYear,
    setPage,
    resetFilters,
    hasActiveFilters,
  };
}