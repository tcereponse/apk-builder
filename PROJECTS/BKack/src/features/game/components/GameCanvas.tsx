x
import { useRef, useEffect, useCallback, useState } from 'react';
import { useGame } from '@app/contexts/GameContext';
import { useSettings } from '@app/contexts/SettingsContext';
import { useUi } from '@app/contexts/UiContext';
import { HapticService } from '@shared/services/HapticService';
import { AudioService } from '@shared/services/AudioService';

interface GameCanvasProps {
onScore?: (points: number) => void;
onLoseLife?: () => void;
onLevelUp?: () => void;
onBricksDestroyed?: (count: number) => void;
onGameEnd?: () => void;
isPaused?: boolean;
isGameOver?: boolean;
isPreview?: boolean;
}

const audioService = new AudioService();

export function GameCanvas({
onScore,
onLoseLife,
onLevelUp,
onBricksDestroyed,
onGameEnd,
isPaused = false,
isGameOver = false,
isPreview = false
}: GameCanvasProps) {
const canvasRef = useRef<HTMLCanvasElement>(null);
const animationRef = useRef<number>();
const { state, actions } = useGame();
const { settings } = useSettings();
const { isMobile } = useUi();

const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
const [scale, setScale] = useState(1);

const gameState = useRef({
paddle: { x: 350, y: 560, width: 100, height: 16 },
ball: { x: 400, y: 540, radius: 8, vx: 0, vy: 0, speed: 5 },
bricks: [] as Array<{
x: number;
y: number;
width: number;
height: number;
alive: boolean;
health: number;
color: string;
}>,
isBallStuck: true,
paddleSpeed: 0,
moveLeft: false,
moveRight: false,
bricksDestroyed: 0,
totalBricks: 0,
keys: {
left: false,
right: false
}
});

const paddleWidth = isMobile ? 80 : 100;

const generateBricks = useCallback((level: number) => {
const rows = Math.min(6 + Math.floor(level / 2), 10);
const cols = Math.min(8 + Math.floor(level / 3), 12);
const brickWidth = 70;
const brickHeight = 24;
const padding = 6;
const offsetX = (dimensions.width - (cols * (brickWidth + padding) - padding)) / 2;
const offsetY = 60;

const colors = [
'#94a3b8', '#64748b', '#475569', '#334155', '#1e293b',
'#9ca3af', '#6b7280', '#4b5563', '#374151'
];

const bricks = [];
for (let row = 0; row < rows; row++) {
for (let col = 0; col < cols; col++) {
const health = level > 3 && row < 2 ? 2 : 1;
const colorIndex = row % colors.length;
bricks.push({
x: offsetX + col * (brickWidth + padding),
y: offsetY + row * (brickHeight + padding),
width: brickWidth,
height: brickHeight,
alive: true,
health,
color: colors[colorIndex]
});
}
}
return bricks;
}, [dimensions.width]);

const resetBall = useCallback(() => {
const ball = gameState.current.ball;
ball.x = gameState.current.paddle.x + gameState.current.paddle.width / 2;
ball.y = gameState.current.paddle.y - ball.radius;
ball.vx = 0;
ball.vy = 0;
gameState.current.isBallStuck = true;
}, []);

const launchBall = useCallback(() => {
if (!gameState.current.isBallStuck) return;
const ball = gameState.current.ball;
const angle = -Math.PI / 4 + (Math.random() * Math.PI / 2);
const speed = 5 + (state.level - 1) * 0.5;
ball.vx = Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1);
ball.vy = -Math.sin(angle) * speed;
gameState.current.isBallStuck = false;

if (settings.soundEnabled) {
audioService.play('pop');
}
if (settings.vibrationEnabled) {
HapticService.light();
}
}, [state.level, settings.soundEnabled, settings.vibrationEnabled]);

const initGame = useCallback(() => {
const bricks = generateBricks(1);
gameState.current.bricks = bricks;
gameState.current.totalBricks = bricks.filter(b => b.alive).length;
gameState.current.bricksDestroyed = 0;
gameState.current.paddle.width = paddleWidth;
gameState.current.paddle.x = (dimensions.width - paddleWidth) / 2;
gameState.current.isBallStuck = true;
resetBall();
if (onBricksDestroyed) {
onBricksDestroyed(0);
}
}, [dimensions.width, paddleWidth, generateBricks, resetBall, onBricksDestroyed]);

const handleCollision = useCallback(() => {
const ball = gameState.current.ball;
const paddle = gameState.current.paddle;
const bricks = gameState.current.bricks;

// Paddle collision
if (
ball.vy > 0 &&
ball.y + ball.radius >= paddle.y &&
ball.y + ball.radius <= paddle.y + paddle.height + 4 &&
ball.x >= paddle.x - ball.radius &&
ball.x <= paddle.x + paddle.width + ball.radius
) {
const hitPos = (ball.x - paddle.x) / paddle.width;
const angle = (hitPos - 0.5) * Math.PI / 2.2;
const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
ball.vx = Math.sin(angle) * speed;
ball.vy = -Math.cos(angle) * speed;
ball.y = paddle.y - ball.radius;

if (settings.soundEnabled) {
audioService.play('pop');
}
if (settings.vibrationEnabled) {
HapticService.light();
}
return;
}

// Brick collisions
for (const brick of bricks) {
if (!brick.alive) continue;

const bx = brick.x;
const by = brick.y;
const bw = brick.width;
const bh = brick.height;

const closestX = Math.max(bx, Math.min(ball.x, bx + bw));
const closestY = Math.max(by, Math.min(ball.y, by + bh));
const dx = ball.x - closestX;
const dy = ball.y - closestY;

if (dx * dx + dy * dy < ball.radius * ball.radius) {
brick.health--;
if (brick.health <= 0) {
brick.alive = false;
gameState.current.bricksDestroyed++;
if (onScore) {
onScore(10 + state.level * 5);
}
if (settings.soundEnabled) {
audioService.play('tink');
}
if (settings.vibrationEnabled) {
HapticService.medium();
}
}

// Reflect ball
const overlapX = ball.radius - Math.abs(dx);
const overlapY = ball.radius - Math.abs(dy);

if (overlapX < overlapY) {
ball.vx = -ball.vx;
} else {
ball.vy = -ball.vy;
}

// Check level complete
const aliveBricks = bricks.filter(b => b.alive).length;
if (aliveBricks === 0) {
if (onLevelUp) {
onLevelUp();
}
if (settings.soundEnabled) {
audioService.play('fanfare');
}
// Regenerate bricks for next level
const newBricks = generateBricks(state.level + 1);
gameState.current.bricks = newBricks;
gameState.current.totalBricks = newBricks.filter(b => b.alive).length;
gameState.current.bricksDestroyed = 0;
resetBall();
if (onBricksDestroyed) {
onBricksDestroyed(0);
}
}

if (onBricksDestroyed) {
onBricksDestroyed(gameState.current.bricksDestroyed);
}
return;
}
}
}, [state.level, settings.soundEnabled, settings.vibrationEnabled, onScore, onLevelUp, onBricksDestroyed, resetBall, generateBricks]);

const updateGame = useCallback(() => {
if (isPaused || isGameOver || isPreview) return;

const ball = gameState.current.ball;
const paddle = gameState.current.paddle;

// Move paddle
const speed = 8;
if (gameState.current.moveLeft) {
paddle.x = Math.max(0, paddle.x - speed);
}
if (gameState.current.moveRight) {
paddle.x = Math.min(dimensions.width - paddle.width, paddle.x + speed);
}

if (gameState.current.isBallStuck) {
ball.x = paddle.x + paddle.width / 2;
ball.y = paddle.y - ball.radius;
return;
}

// Move ball
ball.x += ball.vx;
ball.y += ball.vy;

// Wall collisions
if (ball.x - ball.radius < 0) {
ball.x = ball.radius;
ball.vx = -ball.vx;
}
if (ball.x + ball.radius > dimensions.width) {
ball.x = dimensions.width - ball.radius;
ball.vx = -ball.vx;
}
if (ball.y - ball.radius < 0) {
ball.y = ball.radius;
ball.vy = -ball.vy;
}

// Bottom wall - lose life
if (ball.y + ball.radius > dimensions.height) {
if (onLoseLife) {
onLoseLife();
}
if (settings.soundEnabled) {
audioService.play('buzz');
}
if (settings.vibrationEnabled) {
HapticService.heavy();
}
if (state.lives <= 1) {
if (onGameEnd) {
onGameEnd();
}
return;
}
resetBall();
return;
}

handleCollision();

// Speed up ball slightly if it's too slow
const currentSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
const minSpeed = 3 + (state.level - 1) * 0.3;
if (currentSpeed < minSpeed && currentSpeed > 0) {
const ratio = minSpeed / currentSpeed;
ball.vx *= ratio;
ball.vy *= ratio;
}
}, [isPaused, isGameOver, isPreview, dimensions.width, dimensions.height, state.lives, state.level, settings.soundEnabled, settings.vibrationEnabled, handleCollision, onLoseLife, onGameEnd, resetBall]);

const draw = useCallback(() => {
const canvas = canvasRef.current;
if (!canvas) return;
const ctx = canvas.getContext('2d');
if (!ctx) return;

ctx.clearRect(0, 0, dimensions.width, dimensions.height);

// Background
const gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height);
gradient.addColorStop(0, '#1e293b');
gradient.addColorStop(1, '#0f172a');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, dimensions.width, dimensions.height);

// Grid pattern
ctx.strokeStyle = 'rgba(100, 116, 139, 0.1)';
ctx.lineWidth = 1;
for (let x = 0; x < dimensions.width; x += 40) {
ctx.beginPath();
ctx.moveTo(x, 0);
ctx.lineTo(x, dimensions.height);
ctx.stroke();
}
for (let y = 0; y < dimensions.height; y += 40) {
ctx.beginPath();
ctx.moveTo(0, y);
ctx.lineTo(dimensions.width, y);
ctx.stroke();
}

// Bricks
for (const brick of gameState.current.bricks) {
if (!brick.alive) continue;
ctx.fillStyle = brick.color;
)}}}