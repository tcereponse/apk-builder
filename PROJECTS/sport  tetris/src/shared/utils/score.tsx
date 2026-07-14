export function calculateScore(lines: number, level: number): number {
const baseScores: Record<number, number> = {
1: 100,
2: 300,
3: 500,
4: 800
}
const baseScore = baseScores[lines] || 0
return baseScore * level
}
export function calculateLevel(lines: number): number {
return Math.floor(lines / 10) + 1
}