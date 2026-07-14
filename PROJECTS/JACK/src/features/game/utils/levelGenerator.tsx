import { v4 as uuidv4 } from 'uuid'
import type { Brick, LevelConfig } from '../types/game'

const BRICK_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899'  // pink
]

export function generateLevel(level: number): Brick[] {
  const rows = Math.min(5 + Math.floor(level / 2), 10)
  const cols = 8
  const brickWidth = 70
  const brickHeight = 24
  const padding = 6
  const offsetTop = 60
  const offsetLeft = (800 - (cols * (brickWidth + padding) - padding)) / 2

  const bricks: Brick[] = []
  const maxHits = Math.min(1 + Math.floor(level / 3), 3)

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = offsetLeft + col * (brickWidth + padding)
      const y = offsetTop + row * (brickHeight + padding)
      const colorIndex = (row + col) % BRICK_COLORS.length
      const hits = Math.min(maxHits, 1 + Math.floor(Math.random() * 2))

      bricks.push({
        id: uuidv4(),
        x,
        y,
        width: brickWidth,
        height: brickHeight,
        color: BRICK_COLORS[colorIndex],
        points: 10 * hits,
        hits: 0,
        maxHits: hits
      })
    }
  }

  return bricks
}