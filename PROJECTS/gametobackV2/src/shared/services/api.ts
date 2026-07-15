import { RAWG_API_BASE, RAWG_API_KEY, DEFAULT_PAGE_SIZE } from '@shared/constants/api';
import {
Game,
GameListResponse,
GameDetailResponseSchema,
GameListResponseSchema,
GameSchema,
} from '@shared/types/game.schema';
import { GameFilters } from '@shared/types/game.types';
function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== '');
if (entries.length === 0) return '';
return '?' + entries.map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`).join('&');
}
export interface FetchGamesOptions extends GameFilters {
page?: number;
pageSize?: number;
dates?: string;
}
export async function fetchGames(options: FetchGamesOptions = {}): Promise<GameListResponse> {
const {
search,
year,
platform,
genre,
ordering = '-released',
page = 1,
pageSize = DEFAULT_PAGE_SIZE,
dates,
} = options;
const params: Record<string, string | number | boolean> = {
key: RAWG_API_KEY,
ordering,
page,
page_size: pageSize,
language: 'fr',
};
if (search) params.search = search;
if (platform) params.platforms = platform;
if (genre) params.genres = genre;
if (dates) params.dates = dates;
else if (year) {
const start = `${year}-01-01`;
const end = `${year}-12-31`;
params.dates = `${start},${end}`;
}
const url = `${RAWG_API_BASE}/games${buildQueryString(params)}`;
const response = await fetch(url);
if (!response.ok) {
const errorText = await response.text();
throw new Error(`API Error ${response.status}: ${errorText}`);
}
const json = await response.json();
const parsed = GameListResponseSchema.safeParse(json);
if (!parsed.success) {
console.error('Zod validation error:', parsed.error);
throw new Error('Invalid response format from RAWG API');
}
return parsed.data;
}
export async function fetchGameById(id: number | string): Promise<Game> {
const url = `${RAWG_API_BASE}/games/${id}?key=${RAWG_API_KEY}&language=fr`;
const response = await fetch(url);
if (!response.ok) {
const errorText = await response.text();
throw new Error(`API Error ${response.status}: ${errorText}`);
}
const json = await response.json();
const parsed = GameDetailResponseSchema.safeParse(json);
if (!parsed.success) {
console.error('Zod validation error:', parsed.error);
throw new Error('Invalid game detail response from RAWG API');
}
return parsed.data;
}
export async function fetchGamesByIds(ids: number[]): Promise<Game[]> {
if (ids.length === 0) return [];
const limit = 50;
const chunks: number[][] = [];
for (let i = 0; i < ids.length; i += limit) {
chunks.push(ids.slice(i, i + limit));
}
const results: Game[] = [];
for (const chunk of chunks) {
const params = {
key: RAWG_API_KEY,
ids: chunk.join(','),
page_size: chunk.length,
language: 'fr',
};
const url = `${RAWG_API_BASE}/games${buildQueryString(params)}`;
const response = await fetch(url);
if (!response.ok) {
const errorText = await response.text();
throw new Error(`API Error ${response.status}: ${errorText}`);
}
const json = await response.json();
const parsed = GameListResponseSchema.safeParse(json);
if (!parsed.success) {
console.error('Zod validation error for batch:', parsed.error);
continue;
}
results.push(...parsed.data.results);
}
return results;
}