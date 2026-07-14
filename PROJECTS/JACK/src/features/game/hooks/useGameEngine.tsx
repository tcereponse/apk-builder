import { useState, useEffect, useRef, useCallback } from 'react'
import { useGame } from '@app/contexts/GameContext'
import { generateLevel } from '../utils/levelGenerator'
import type { Ball, Paddle, Brick } from '../types/game'

export function useGameEngine(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const { state, dispatch } = useGame()
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)

  const updateDimensions = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.parentElement?.getBoundingClientRect()
    if (!rect) return
    
    const containerWidth = rect.width
    const containerHeight = rect.height
    const aspectRatio = 800 / 600
    let width = containerWidth
    let height = containerWidth / aspectRatio
    
    if (height > containerHeight) {
      height = containerHeight
      width = containerHeight * aspectRatio
    }
    
    canvas.width = 800
    canvas.height = 600
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    setDimensions({ width, height })
  }, [canvasRef])

  const handlePaddleMove = useCallback((clientX: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const x = (clientX - rect.left) * scaleX
    const paddleWidth = state.paddle.width
    const maxX = canvas.width - paddleWidth
    
    const newX = Math.max(0, Math.min(x - paddleWidth / 2, maxX))
    dispatch({ type: 'UPDATE_PADDLE', payload: { ...state.paddle, x: newX } })
  }, [canvasRef, state.paddle, dispatch])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (state.status !== 'playing') return
    handlePaddleMove(e.clientX)
  }, [state.status, handlePaddleMove])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (state.status !== 'playing') return
    e.preventDefault()
    const touch = e.touches[0]
    if (touch) handlePaddleMove(touch.clientX)
  }, [state.status, handlePaddleMove])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const speed = 12
    const newPaddle = { ...state.paddle }
    
    if (e.key === 'ArrowLeft') {
      newPaddle.x = Math.max(0, newPaddle.x - speed)
      dispatch({ type: 'UPDATE_PADDLE', payload: newPaddle })
    } else if (e.key === 'ArrowRight') {
      const maxX = 800 - state.paddle.width
      newPaddle.x = Math.min(maxX, newPaddle.x + speed)
      dispatch({ type: 'UPDATE_PADDLE', payload: newPaddle })
    } else if (e.key === ' ' || e.key === 'Space') {
      e.preventDefault()
      if (state.status === 'idle') {
        startGame()
      } else if (state.status === 'playing') {
        dispatch({ type: 'PAUSE_GAME' })
      } else if (state.status === 'paused') {
        dispatch({ type: 'RESUME_GAME' })
      }
    }
  }, [state.paddle, state.status, dispatch])

  const startGame = useCallback(() => {
    const bricks = generateLevel(state.level)
    dispatch({ type: 'INIT_GAME' })
    dispatch({ type: 'START_GAME' })
    const ball: Ball = {
      x: state.paddle.x + state.paddle.width / 2,
      y: state.paddle.y - 16,
      dx: 4 * (Math.random() > 0.5 ? 1 : -1),
      dy: -4,
      radius: 8,
      speed: 4 + (state.level - 1) * 0.5
    }
    dispatch({ type: 'UPDATE_BALL', payload: ball })
  }, [state.level, state.paddle, dispatch])

  const resetBall = useCallback(() => {
    const ball: Ball = {
      x: state.paddle.x + state.paddle.width / 2,
      y: state.paddle.y - 16,
      dx: 4 * (Math.random() > 0.5 ? 1 : -1),
      dy: -4,
      radius: 8,
      speed: 4 + (state.level - 1) * 0.5
    }
    dispatch({ type: 'UPDATE_BALL', payload: ball })
  }, [state.paddle, state.level, dispatch])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [canvasRef, updateDimensions, handleMouseMove, handleTouchMove, handleKeyDown])

  return {
    dimensions,
    startGame,
    resetBall,
    updateDimensions
  }
}