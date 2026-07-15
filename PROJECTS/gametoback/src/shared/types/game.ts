import { z } from 'zod';

export const GameSchema = z.object({
  id: z.number(),
  name: z.string(),
  released: z.string().nullable(),
  background_image: z.string().url().nullable(),
  description: z.string().nullable(),
  description_raw: z.string().nullable(),
  rating: z.number().nullable(),
  metacritic: z.number().nullable(),
  platforms: z.array(
    z.object({
      platform: z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
      }),
      released_at: z.string().nullable(),
    })
  ),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    })
  ),
  developers: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    })
  ),
  publishers: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    })
  ),
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    })
  ),
  esrb_rating: z
    .object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    })
    .nullable(),
  website: z.string().nullable(),
  reddit_url: z.string().nullable(),
  tba: z.boolean().optional(),
});

export type Game = z.infer<typeof GameSchema>;

export const GamesResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(GameSchema),
});

export type GamesResponse = z.infer<typeof GamesResponseSchema>;