export const RAWG_API_BASE = 'https://api.rawg.io/api';
export const RAWG_API_KEY =
import.meta.env.VITE_RAWG_API_KEY || '431a4b53e7f54290b1de7e69c904fcbe';
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 40;
import { z } from 'zod';
export const PlatformSchema = z.object({
id: z.number(),
name: z.string(),
slug: z.string(),
});
export const PlatformParentSchema = z.object({
id: z.number(),
name: z.string(),
slug: z.string(),
platforms: z.array(PlatformSchema).optional(),
});
export const GameSchema = z.object({
id: z.number(),
name: z.string(),
slug: z.string(),
released: z.string().nullable().optional(),
background_image: z.string().nullable().optional(),
background_image_additional: z.string().nullable().optional(),
description_raw: z.string().nullable().optional(),
description: z.string().nullable().optional(),
rating: z.number().nullable().optional(),
ratings_count: z.number().nullable().optional(),
metacritic: z.number().nullable().optional(),
playtime: z.number().nullable().optional(),
platforms: z.array(
z.object({
platform: PlatformSchema,
released_at: z.string().nullable().optional(),
})
).nullable().optional(),
genres: z.array(
z.object({
id: z.number(),
name: z.string(),
slug: z.string(),
})
).nullable().optional(),
tags: z.array(
z.object({
id: z.number(),
name: z.string(),
slug: z.string(),
})
).nullable().optional(),
developers: z.array(
z.object({
id: z.number(),
name: z.string(),
slug: z.string(),
})
).nullable().optional(),
publishers: z.array(
z.object({
id: z.number(),
name: z.string(),
slug: z.string(),
})
).nullable().optional(),
screenshots: z
.array(
z.object({
id: z.number(),
image: z.string(),
})
)
.nullable().optional(),
clip: z
.object({
clip: z.string(),
preview: z.string(),
})
.nullable().optional(),
});
export const GameListResponseSchema = z.object({
count: z.number(),
next: z.string().nullable(),
previous: z.string().nullable(),
results: z.array(GameSchema),
});
export const GameDetailResponseSchema = GameSchema;
export type Game = z.infer<typeof GameSchema>;
export type GameListResponse = z.infer<typeof GameListResponseSchema>;
export type Platform = z.infer<typeof PlatformSchema>;
export type PlatformParent = z.infer<typeof PlatformParentSchema>;
import { Game } from './game.schema';
export interface GameFilters {
search?: string;
year?: string;
platform?: string;
genre?: string;
ordering?: string;
page?: number;
pageSize?: number;
}
export interface GamesQueryParams extends GameFilters {
dates?: string;
}
export interface GameCardProps {
game: Game;
index?: number;
onFavoriteToggle?: (id: number) => void;
isFavorite?: boolean;
}
export interface CarouselProps {
games: Game[];
title: string;
subtitle?: string;
loading?: boolean;
error?: Error | null;
onRetry?: () => void;
slidesPerView?: number;
autoplay?: boolean;
autoplayDelay?: number;
}
export interface GameSkeletonProps {
count?: number;
}