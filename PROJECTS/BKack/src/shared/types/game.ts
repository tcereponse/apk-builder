import { z } from 'zod';

export const gameStatusSchema = z.enum(['idle', 'active', 'paused', 'gameover']);
export type GameStatus = z.infer<typeof gameStatusSchema>;

export const gameStateSchema = z.object({
score: z.number().int().nonnegative(),
lives: z.number().int().min(0).max(5),
level: z.number().int().min(1),
bricksDestroyed: z.number().int().nonnegative(),
status: gameStatusSchema
});
export type GameState = z.infer<typeof gameStateSchema>;

export const scoreSchema = z.object({
id: z.string().uuid(),
score: z.number().int().positive(),
level: z.number().int().min(1).max(99),
date: z.string().datetime(),
mode: z.enum(['classic', 'challenge', 'endless'])
});
export type Score = z.infer<typeof scoreSchema>;

export const settingsSchema = z.object({
soundEnabled: z.boolean().default(true),
sfxEnabled: z.boolean().default(true),
vibrationEnabled: z.boolean().default(false),
theme: z.enum(['light', 'dark']).default('light'),
difficulty: z.enum(['easy', 'normal', 'hard']).default('normal')
});
export type Settings = z.infer<typeof settingsSchema>;

export const profileSchema = z.object({
username: z.string().min(1).max(20).optional(),
totalGames: z.number().int().nonnegative().default(0),
totalScore: z.number().int().nonnegative().default(0),
highestLevel: z.number().int().min(0).default(0),
createdAt: z.string().datetime()
});
export type Profile = z.infer<typeof profileSchema>;

export const brickSchema = z.object({
x: z.number(),
y: z.number(),
width: z.number().positive(),
height: z.number().positive(),
alive: z.boolean().default(true),
health: z.number().int().min(1).default(1),
color: z.string()
});
export type Brick = z.infer<typeof brickSchema>;

export const ballSchema = z.object({
x: z.number(),
y: z.number(),
radius: z.number().positive(),
vx: z.number(),
vy: z.number(),
speed: z.number().positive()
});
export type Ball = z.infer<typeof ballSchema>;

export const paddleSchema = z.object({
x: z.number(),
y: z.number(),
width: z.number().positive(),
height: z.number().positive()
});
export type Paddle = z.infer<typeof paddleSchema>;