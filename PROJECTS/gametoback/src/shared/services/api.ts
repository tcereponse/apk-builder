const API_BASE = 'https://api.rawg.io/api';
const API_KEY = '431a4b53e7f54290b1de7e69c904fcbe';

export interface FetchGamesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  platforms?: string;
  dates?: string;
  ordering?: string;
}

export async function fetchGames(params: FetchGamesParams = {}) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    page: String(params.page || 1),
    page_size: String(params.pageSize || 20),
    ordering: params.ordering || '-released',
    ...(params.search && { search: params.search }),
    ...(params.platforms && { platforms: params.platforms }),
    ...(params.dates && { dates: params.dates }),
  });

  const url = `${API_BASE}/games?${searchParams.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`RAWG API error: ${response.status}`);
  }

  return response.json();
}

export async function fetchGameDetails(id: string | number) {
  const url = `${API_BASE}/games/${id}?key=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`RAWG API error: ${response.status}`);
  }

  return response.json();
}

export async function fetchGameScreenshots(id: string | number) {
  const url = `${API_BASE}/games/${id}/screenshots?key=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`RAWG API error: ${response.status}`);
  }

  return response.json();
}