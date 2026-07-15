import { Game, GamesResponse } from '@shared/types/game';
import { fetchGames, fetchGameDetails, fetchGameScreenshots } from './api';

export interface GameFilters {
  search?: string;
  platform?: string;
  year?: number;
  page?: number;
  pageSize?: number;
}

export async function getGames(filters: GameFilters = {}): Promise<GamesResponse> {
  const params: any = {
    page: filters.page || 1,
    pageSize: filters.pageSize || 20,
  };

  if (filters.search) {
    params.search = filters.search;
  }

  if (filters.platform) {
    params.platforms = filters.platform;
  }

  if (filters.year) {
    const start = `${filters.year}-01-01`;
    const end = `${filters.year}-12-31`;
    params.dates = `${start},${end}`;
  }

  const data = await fetchGames(params);
  return data as GamesResponse;
}

export async function getGameDetails(id: string | number): Promise<Game> {
  const data = await fetchGameDetails(id);
  return data as Game;
}

export async function getGameScreenshots(id: string | number) {
  const data = await fetchGameScreenshots(id);
  return data.results || [];
}

export function getPlatformNames(game: Game): string[] {
  return game.platforms.map((p) => p.platform.name);
}

export function getPrimaryPlatform(game: Game): string | null {
  return game.platforms.length > 0 ? game.platforms[0].platform.name : null;
}

export function getReleaseYear(game: Game): number | null {
  if (!game.released) return null;
  return new Date(game.released).getFullYear();
}

export function formatDescription(description: string | null, maxLength = 160): string {
  if (!description) return 'Aucune description disponible.';
  const clean = description.replace(/<[^>]*>/g, '');
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength).trim()}...`;
}