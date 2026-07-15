import { z } from 'zod'
export const ThemeSchema = z.enum(['light', 'dark', 'diamond'])
export type Theme = z.infer<typeof ThemeSchema>