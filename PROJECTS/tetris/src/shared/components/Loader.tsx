function Loader() {
return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      <div className="w-12 h-12 border-4 border-slate-700 border-t-slate-400 rounded-full animate-spin" />
      <span className="text-slate-400 text-sm">Chargement...</span>
    </div>
  );
};
export default Loader;
import { z } from 'zod';
export const PieceSchema = z.object({
id: z.enum(['I', 'O', 'T', 'S', 'Z', 'J', 'L']),
matrix: z.array(z.array(z.number().int().min(0).max(1))),
color: z.string().regex(/^#[0-9a-f]{6}$/i),
x: z.number().int().optional(),
y: z.number().int().optional()
});
export const GameStateSchema = z.object({
grid: z.array(z.array(z.string().nullable())),
currentPiece: PieceSchema.optional().nullable(),
nextPiece: PieceSchema.optional().nullable(),
score: z.number().int().min(0),
level: z.number().int().min(1).max(15),
lines: z.number().int().min(0),
isPaused: z.boolean(),
isGameOver: z.boolean(),
isPlaying: z.boolean(),
ghostY: z.number().int().min(0).max(19)
});
export const HighScoreSchema = z.object({
score: z.number().int().min(0),
level: z.number().int().min(1),
lines: z.number().int().min(0),
date: z.string().datetime(),
duration: z.number().int().min(0)
});
export const StatsSchema = z.object({
totalGames: z.number().int().min(0),
totalTime: z.number().int().min(0),
totalLines: z.number().int().min(0),
maxLevel: z.number().int().min(1).default(1)
});
export const SettingsSchema = z.object({
initialSpeed: z.enum(['normal', 'fast', 'expert']).default('normal'),
soundEnabled: z.boolean().default(false),
vibrationEnabled: z.boolean().default(false)
});
export type Piece = z.infer<typeof PieceSchema>;
export type GameState = z.infer<typeof GameStateSchema>;
export type HighScore = z.infer<typeof HighScoreSchema>;
export type Stats = z.infer<typeof StatsSchema>;
export type Settings = z.infer<typeof SettingsSchema>;
export type GameAction =
| { type: 'START' }
| { type: 'TICK' }
| { type: 'MOVE_LEFT' }
| { type: 'MOVE_RIGHT' }
| { type: 'ROTATE' }
| { type: 'SOFT_DROP' }
| { type: 'HARD_DROP' }
| { type: 'PAUSE' }
| { type: 'RESUME' }
| { type: 'RESTART' };
export interface GameContextType {
state: GameState;
actions: {
startGame: () => void;
moveLeft: () => void;
moveRight: () => void;
rotate: () => void;
softDrop: () => void;
hardDrop: () => void;
pause: () => void;
resume: () => void;
restart: () => void;
};
}
export interface ScoreContextType {
highScores: HighScore[];
isNewRecord: boolean;
saveHighScore: (score: number, level: number, lines: number, duration: number) => void;
resetScores: () => void;
}
export interface SettingsContextType {
settings: Settings;
updateSettings: (settings: Partial<Settings>) => void;
resetSettings: () => void;
}
export interface StatsContextType {
stats: Stats;
incrementGames: () => void;
addTime: (seconds: number) => void;
addLines: (count: number) => void;
updateMaxLevel: (level: number) => void;
resetStats: () => void;
}