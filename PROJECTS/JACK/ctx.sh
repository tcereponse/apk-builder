adowBlur = 0

    ctx.fillStyle = '#94a3b8'
    ctx.font = 'bold 18px Inter, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(`Score: ${state.score}`, 20, 35)
    ctx.textAlign = 'right'
    ctx.fillText(`Niveau: ${state.level}`, canvas.width - 20, 35)
    ctx.textAlign = 'left'
    ctx.fillText(`❤️ ${state.lives}`, 20, 65)

    if (state.status === 'idle') {
      ctx.fillStyle = 'rgba(148,163,184,0.7)'
      ctx.font = '20px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Clique ou tape pour lancer', canvas.width / 2, canvas.height / 2 + 40)
    }

    if (state.status === 'paused') {
      ctx.fillStyle = 'rgba(15,23,42,0.8)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#f8fafc'
      ctx.font = 'bold 32px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('⏸ PAUSE', canvas.width / 2, canvas.height / 2)
    }
  }, [state])

  const gameLoop = useCallback(() => {
    if (state.status !== 'playing') return

    const result = updateBall(
      state.ball,
      state.paddle,
      state.bricks,
      800, 600
    )

    const { ball, destroyedBrickIds, lostLife } = result

    if (lostLife) {
      const newLives = state.lives - 1
      if (newLives <= 0) {
        dispatch({ type: 'END_GAME' })
        setFinalScore(state.score)
        setShowGameOver(true)
        addScore({ playerName: 'Joueur', score: state.score, level: state.level, date: new Date() })
      } else {
        dispatch({ type: 'LOSE_LIFE' })
        resetBall()
      }
      return
    }

    dispatch({ type: 'UPDATE_BALL', payload: ball })

    for (const brickId of destroyedBrickIds) {
      const brick = state.bricks.find(b => b.id === brickId)
      if (brick) {
        dispatch({ type: 'ADD_SCORE', payload: brick.points })
        dispatch({ type: 'DESTROY_BRICK', payload: brickId })
      }
    }

    if (state.bricks.length === 0) {
      const newLevel = state.level + 1
      const bricks = generateLevel(newLevel)
      dispatch({ type: 'NEXT_LEVEL' })
      dispatch({ type: 'INIT_GAME' })
      resetBall()
    }

    drawGame()
  }, [state, dispatch, resetBall, drawGame, addScore])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let animationId: number

    const loop = () => {
      gameLoop()
      animationId = requestAnimationFrame(loop)
    }

    if (state.status === 'playing' || state.status === 'idle') {
      animationId = requestAnimationFrame(loop)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [gameLoop, state.status])

  useEffect(() => {
    drawGame()
  }, [drawGame])

  const handleCanvasClick = () => {
    if (state.status === 'idle') {
      startGame()
    }
  }

  const handleRestart = () => {
    setShowGameOver(false)
    dispatch({ type: 'RESET_GAME' })
    const bricks = generateLevel(1)
    dispatch({ type: 'INIT_GAME' })
  }

  if (showGameOver) {
    return (
      <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center z-50">
        <div className="bg-slate-800 rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Game Over</h2>
          <p className="text-slate-400 mb-6">Score final: <span className="text-2xl font-bold text-blue-400">{finalScore}</span></p>
          <p className="text-sm text-slate-500 mb-6">Niveau atteint: {state.level}</p>
          <div className="space-y-3">
            <button
              onClick={handleRestart}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all rounded-xl text-white font-semibold"
            >
              <RotateCcw className="w-5 h-5" />
              Rejouer
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all rounded-xl text-white font-semibold"
            >
              <Home className="w-5 h-5" />
              Accueil
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="game-canvas w-full h-full rounded-lg"
          onClick={handleCanvasClick}
        />
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
          <button
            onClick={() => {
              if (state.status === 'playing') {
                dispatch({ type: 'PAUSE_GAME' })
              } else if (state.status === 'paused') {
                dispatch({ type: 'RESUME_GAME' })
              }
            }}
            className="p-3 bg-slate-800/80 backdrop-blur-sm rounded-full hover:bg-slate-700/80 transition-all"
          >
            {state.status === 'paused' ? (
              <Play className="w-6 h-6 text-white" />
            ) : (
              <Pause className="w-6 h-6 text-white" />
            )}
          </button>
          <button
            onClick={handleRestart}
            className="p-3 bg-slate-800/80 backdrop-blur-sm rounded-full hover:bg-slate-700/80 transition-all"
          >
            <RotateCcw className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="p-3 bg-slate-800/80 backdrop-blur-sm rounded-full hover:bg-slate-700/80 transition-all"
          >
            <Home className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}