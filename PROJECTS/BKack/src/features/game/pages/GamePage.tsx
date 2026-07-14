x
import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { GameCanvas } from '../components/GameCanvas';
import { GameHUD } from '../components/GameHUD';
import { Button } from '@shared/components/Button';
import { useGame } from '@app/contexts/GameContext';
import { useScores } from '@app/contexts/ScoreContext';
import { useSettings } from '@app/contexts/SettingsContext';
import { AudioService } from '@shared/services/AudioService';
import { HapticService } from '@shared/services/HapticService';

const audioService = new AudioService();

export function GamePage() {
const navigate = useNavigate();
const { state, actions } = useGame();
const { actions: scoreActions } = useScores();
const { settings } = useSettings();
const [isPaused, setIsPaused] = useState(false);
const [showPauseOverlay, setShowPauseOverlay] = useState(false);
const hasSavedScore = useRef(false);

useEffect(() => {
audioService.init();
return () => {
// Cleanup
};
}, []);

useEffect(() => {
if (state.status === 'gameover' && !hasSavedScore.current) {
hasSavedScore.current = true;
const newScore = {
id: crypto.randomUUID(),
score: state.score,
level: state.level,
date: new Date().toISOString(),
mode: 'classic' as const
};
scoreActions.addScore(newScore);
setTimeout(() => navigate('/gameover'), 500);
}
}, [state.status, state.score, state.level, scoreActions, navigate]);

const handlePauseToggle = useCallback(() => {
if (state.status === 'active') {
actions.pauseGame();
setIsPaused(true);
setShowPauseOverlay(true);
} else if (state.status === 'paused') {
actions.resumeGame();
setIsPaused(false);
setShowPauseOverlay(false);
}
}, [state.status, actions]);

const handleReset = useCallback(() => {
actions.startGame();
setIsPaused(false);
setShowPauseOverlay(false);
hasSavedScore.current = false;
}, [actions]);

const handleQuit = useCallback(() => {
if (confirm('Voulez-vous quitter la partie ?')) {
navigate('/');
}
}, [navigate]);

useEffect(() => {
const handleKeyDown = (e: KeyboardEvent) => {
if (e.key === ' ' || e.key === 'Escape') {
e.preventDefault();
handlePauseToggle();
}
};

window.addEventListener('keydown', handleKeyDown);
return () => window.removeEventListener('keydown', handleKeyDown);
}, [handlePauseToggle]);

return (

<div className="flex flex-col items-center gap-4 max-w-2xl mx-auto"> <GameHUD score={state.score} lives={state.lives} level={state.level} status={state.status} /> <div className="relative w-full"> <GameCanvas onScore={actions.updateScore} onLoseLife={actions.loseLife} onLevelUp={actions.nextLevel} onBricksDestroyed={actions.setBricksDestroyed} onGameEnd={actions.endGame} isPaused={state.status === 'paused'} isGameOver={state.status === 'gameover'} />

{showPauseOverlay && (

<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg"> <h2 className="text-3xl font-bold text-white mb-4">Pause</h2> <div className="flex gap-4"> <Button onClick={handlePauseToggle}> <Play className="w-5 h-5 mr-2" /> Reprendre </Button> <Button variant="secondary" onClick={handleReset}> <RotateCcw className="w-5 h-5 mr-2" /> Recommencer </Button> <Button variant="danger" onClick={handleQuit}> Quitter </Button> </div> </div> )} </div> <div className="flex gap-4"> <Button variant="secondary" onClick={handlePauseToggle} disabled={state.status === 'gameover'} > {isPaused ? ( <Play className="w-5 h-5 mr-2" /> ) : ( <Pause className="w-5 h-5 mr-2" /> )} {isPaused ? 'Reprendre' : 'Pause'} </Button> <Button variant="ghost" onClick={handleQuit}> Quitter </Button> </div> </div> ); }