Couche Données — TETRISTypes Zod (Validation)Game Engine Inputs:





// shared/types/game.types.ts
import { z } from 'zod';

export const PositionSchema = z.object({
  x: z.number().int().min(0).max(9),
  y: z.number().int().min(0).max(19)
});

export const PieceSchema = z.object({
  id: z.enum(['I', 'O', 'T', 'S', 'Z', 'J', 'L']),
  matrix: z.array(z.array(z.number().int().min(0).max(1))),
  color: z.string().regex(/^#[0-9a-f]{6}$/i)
});

export const GameStateSchema = z.object({
  grid: z.array(z.array(z.string().nullable())),
  currentPiece: PieceSchema.optional(),
  nextPiece: PieceSchema,
  score: z.number().int().min(0),
  level: z.number().int().min(1).max(15),
  lines: z.number().int().min(0),
  isPaused: z.boolean(),
  isGameOver: z.boolean()
});
User Settings:





export const SettingsSchema = z.object({
  initialSpeed: z.enum(['normal', 'fast', 'expert']).default('normal'),
  soundEnabled: z.boolean().default(false),
  vibrationEnabled: z.boolean().default(false)
});
High Score:





export const HighScoreSchema = z.object({
  score: z.number().int().min(0),
  level: z.number().int().min(1),
  lines: z.number().int().min(0),
  date: z.string().datetime(),
  duration: z.number().int().min(0) // en secondes
});

export const StatsSchema = z.object({
  highScores: z.array(HighScoreSchema).max(5),
  totalGames: z.number().int().min(0),
  totalTime: z.number().int().min(0), // en secondes
  totalLines: z.number().int().min(0),
  maxLevel: z.number().int().min(1).default(1)
});
Services (Abstraction localStorage)LocalStorageService (shared/services/localStorage.service.ts):
get<T>(key: string, schema: ZodSchema): T | null

set<T>(key: string, value: T, schema: ZodSchema): void

remove(key: string): void

Keys: 'tetris_settings', 'tetris_highscores', 'tetris_stats'

AnalyticsService (shared/services/analytics.service.ts):
trackGameStart(): Incrémente totalGames

trackGameEnd(score: number, level: number, lines: number, duration: number): Met à jour stats et high scores

trackLevelUp(level: number): Met à jour maxLevel

Persistance des High ScoresStockage: localStorage avec clé tetris_highscores

Format: JSON array de HighScoreSchema (trié par score décroissant)

Mise à jour: À chaque fin de partie, insertion si score > dernier ou si < 5 éléments

Réinitialisation: Confirmation via modal avant de supprimer

IndexedDB (Optionnel pour V2)Non utilisé en V1 (localStorage suffisant pour < 50KB de données)

Préparé pour extension future avec synchronisation

Gestion des Erreurs de ParsingEn cas d'échec de validation Zod, les données sont considérées comme corrompues

Réinitialisation automatique des données à la valeur par défaut (vide)

Log dans la console (uniquement en développement)