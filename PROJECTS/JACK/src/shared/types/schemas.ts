import { z } from 'zod'

export const ScoreSchema = z.object({
  id: z.number().optional(),
  playerName: z.string().min(1).max(20),
  score: z.number().int().positive(),
  level: z.number().int().min(1).max(99),
  date: z.date().default(() => new Date())
})

export const SettingsSchema = z.object({
  soundEnabled: z.boolean().default(true),
  theme: z.enum(['light', 'dark']).default('dark'),
  difficulty: z.enum(['easy', 'normal', 'hard']).default('normal'),
  vibrationEnabled: z.boolean().default(true)
})

export type Score = z.infer<typeof ScoreSchema>
export type Settings = z.infer<typeof SettingsSchema>