import { z } from 'zod'

export const statSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.union([z.number(), z.string()]),
  unit: z.string().optional(),
  /** Trend in percent (positive = up, negative = down). */
  trend: z.number().optional(),
  /** Hint for color tone. */
  tone: z.enum(['neutral', 'positive', 'negative', 'info']).default('neutral'),
  icon: z.string().optional(),
})

export const chartPointSchema = z.object({
  label: z.string(),
  value: z.number(),
})

export const chartDataSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  points: z.array(chartPointSchema),
})

export type Stat = z.infer<typeof statSchema>
export type ChartPoint = z.infer<typeof chartPointSchema>
export type ChartData = z.infer<typeof chartDataSchema>
export type StatTone = Stat['tone']
