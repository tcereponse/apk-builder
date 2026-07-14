import type { Ball, Paddle, Brick } from '../types/game'

export function updateBall(ball: Ball, paddle: Paddle, bricks: Brick[], canvasWidth: number, canvasHeight: number): { ball: Ball; destroyedBrickIds: string[]; lostLife: boolean } {
  let newBall = { ...ball }
  const destroyedBrickIds: string[] = []
  let lostLife = false

  // Mise à jour position
  newBall.x += newBall.dx
  newBall.y += newBall.dy

  // Collision murs gauche/droit
  if (newBall.x - newBall.radius < 0) {
    newBall.x = newBall.radius
    newBall.dx = Math.abs(newBall.dx)
  } else if (newBall.x + newBall.radius > canvasWidth) {
    newBall.x = canvasWidth - newBall.radius
    newBall.dx = -Math.abs(newBall.dx)
  }

  // Collision mur haut
  if (newBall.y - newBall.radius < 0) {
    newBall.y = newBall.radius
    newBall.dy = Math.abs(newBall.dy)
  }

  // Perte de vie (mur bas)
  if (newBall.y + newBall.radius > canvasHeight) {
    lostLife = true
    return { ball: newBall, destroyedBrickIds, lostLife }
  }

  // Collision raquette
  if (newBall.dy > 0 &&
      newBall.y + newBall.radius >= paddle.y &&
      newBall.y + newBall.radius <= paddle.y + paddle.height + 2 &&
      newBall.x >= paddle.x - newBall.radius &&
      newBall.x <= paddle.x + paddle.width + newBall.radius) {
    
    // Angle de rebond basé sur la position d'impact
    const impact = (newBall.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2)
    const angle = impact * (Math.PI / 3) // Max 60 degrés
    const speed = Math.sqrt(newBall.dx * newBall.dx + newBall.dy * newBall.dy)
    
    newBall.dx = speed * Math.sin(angle)
    newBall.dy = -speed * Math.cos(angle)
    newBall.y = paddle.y - newBall.radius
  }

  // Collision briques
  for (const brick of bricks) {
    const brickRect = {
      left: brick.x,
      right: brick.x + brick.width,
      top: brick.y,
      bottom: brick.y + brick.height
    }

    const ballRect = {
      left: newBall.x - newBall.radius,
      right: newBall.x + newBall.radius,
      top: newBall.y - newBall.radius,
      bottom: newBall.y + newBall.radius
    }

    if (ballRect.right > brickRect.left &&
        ballRect.left < brickRect.right &&
        ballRect.bottom > brickRect.top &&
        ballRect.top < brickRect.bottom) {
      
      // Détection du côté d'impact
      const overlapX = Math.min(ballRect.right - brickRect.left, brickRect.right - ballRect.left)
      const overlapY = Math.min(ballRect.bottom - brickRect.top, brickRect.bottom - ballRect.top)

      if (overlapX < overlapY) {
        newBall.dx = -newBall.dx
      } else {
        newBall.dy = -newBall.dy
      }

      destroyedBrickIds.push(brick.id)
    }
  }

  return { ball: newBall, destroyedBrickIds, lostLife }
}