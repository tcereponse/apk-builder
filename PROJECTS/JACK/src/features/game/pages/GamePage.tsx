x

import { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '@app/contexts/GameContext'
import { useScores } from '@app/contexts/ScoresContext'
import { useGameEngine } from '../hooks/useGameEngine'
import { updateBall } from '../utils/physics'
import { generateLevel } from '../utils/levelGenerator'
import { Pause, Play, RotateCcw, Home } from 'lucide-react'

export function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const navigate = useNavigate()
  const { state, dispatch } = useGame()
  const { addScore } = useScores()
  const { dimensions, startGame, resetBall } = useGameEngine(canvasRef)
  const [showGameOver, setShowGameOver] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    state.bricks.forEach(brick => {
      ctx.fillStyle = brick.color
))}}}