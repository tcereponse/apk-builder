import { z } from 'zod'
export const PositionSchema = z.object({
x: z.number().int(),
y: z.number().int()
})
export type Position = z.infer<typeof PositionSchema>
export const TetrominoTypeSchema = z.enum(['I', 'O', 'T', 'S', 'Z', 'J', 'L'])
export type TetrominoType = z.infer<typeof TetrominoTypeSchema>
export const CellStateSchema = z.object({
type: TetrominoTypeSchema.nullable(),
isActive: z.boolean()
})
export type CellState = z.infer<typeof CellStateSchema>
export const GameStateSchema = z.object({
grid: z.array(z.array(CellStateSchema)),
score: z.number().int().min(0),
level: z.number().int().min(1),
lines: z.number().int().min(0),
gameOver: z.boolean(),
isPaused: z.boolean(),
currentPiece: z.object({
type: TetrominoTypeSchema,
position: PositionSchema,
rotation: z.number().int().min(0).max(3)
}).nullable(),
nextPiece: z.object({
type: TetrominoTypeSchema
}).nullable()
})
export type GameState = z.infer<typeof GameStateSchema>
export const PieceSchema = z.object({
type: TetrominoTypeSchema,
position: PositionSchema,
rotation: z.number().int().min(0).max(3)
})
export type Piece = z.infer<typeof PieceSchema>