adowBlur = 0;

// Ball highlight
ctx.fillStyle = 'rgba(255,255,255,0.4)';
ctx.beginPath();
ctx.arc(ball.x - 2, ball.y - 3, 3, 0, Math.PI * 2);
ctx.fill();

// Instructions if ball is stuck
if (gameState.current.isBallStuck && !isPreview) {
ctx.fillStyle = 'rgba(255,255,255,0.6)';
ctx.font = '20px sans-serif';
ctx.textAlign = 'center';
ctx.fillText('Tap or press Space to launch', dimensions.width / 2, dimensions.height / 2 + 60);
}

// Preview mode label
if (isPreview) {
ctx.fillStyle = 'rgba(255,255,255,0.2)';
ctx.font = '16px sans-serif';
ctx.textAlign = 'center';
ctx.fillText('Preview', dimensions.width / 2, 30);
}
}, [dimensions, isPreview]);

const gameLoop = useCallback(() => {
updateGame();
draw();
animationRef.current = requestAnimationFrame(gameLoop);
}, [updateGame, draw]);

useEffect(() => {
const canvas = canvasRef.current;
if (!canvas) return;

const container = canvas.parentElement;
if (!container) return;

const updateDimensions = () => {
const rect = container.getBoundingClientRect();
const containerWidth = rect.width;
const aspectRatio = 4 / 3;
let width = Math.min(containerWidth, 800);
let height = width / aspectRatio;

if (height > window.innerHeight * 0.7) {
height = window.innerHeight * 0.7;
width = height * aspectRatio;
}

const dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
canvas.style.width = ${width}px;
canvas.style.height = ${height}px;

const ctx = canvas.getContext('2d');
if (ctx) {
ctx.scale(dpr, dpr);
}

setDimensions({ width, height });
setScale(dpr);

if (!isPreview && gameState.current.bricks.length === 0) {
initGame();
}
};

updateDimensions();
const resizeObserver = new ResizeObserver(updateDimensions);
resizeObserver.observe(container);

if (!isPreview) {
initGame();
audioService.init();
}

return () => {
resizeObserver.disconnect();
if (animationRef.current) {
cancelAnimationFrame(animationRef.current);
}
};
}, [isPreview, initGame]);

useEffect(() => {
if (!isPreview) {
gameLoop();
return () => {
if (animationRef.current) {
cancelAnimationFrame(animationRef.current);
}
};
}
}, [isPreview, gameLoop]);

useEffect(() => {
if (isPreview) {
// Animate preview bricks
const interval = setInterval(() => {
for (const brick of gameState.current.bricks) {
if (Math.random() < 0.02) {
brick.alive = !brick.alive;
}
}
}, 100);
return () => clearInterval(interval);
}
}, [isPreview]);

useEffect(() => {
if (isPreview) return;

const handleKeyDown = (e: KeyboardEvent) => {
if (e.key === 'ArrowLeft' || e.key === 'a') {
gameState.current.moveLeft = true;
e.preventDefault();
}
if (e.key === 'ArrowRight' || e.key === 'd') {
gameState.current.moveRight = true;
e.preventDefault();
}
if (e.key === ' ' || e.key === 'Space') {
e.preventDefault();
if (gameState.current.isBallStuck) {
launchBall();
}
}
};

const handleKeyUp = (e: KeyboardEvent) => {
if (e.key === 'ArrowLeft' || e.key === 'a') {
gameState.current.moveLeft = false;
e.preventDefault();
}
if (e.key === 'ArrowRight' || e.key === 'd') {
gameState.current.moveRight = false;
e.preventDefault();
}
};

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

return () => {
window.removeEventListener('keydown', handleKeyDown);
window.removeEventListener('keyup', handleKeyUp);
};
}, [isPreview, launchBall]);

useEffect(() => {
if (isPreview) return;

const canvas = canvasRef.current;
if (!canvas) return;

let touchStartX = 0;

const handleTouchStart = (e: TouchEvent) => {
e.preventDefault();
const touch = e.touches[0];
const rect = canvas.getBoundingClientRect();
touchStartX = touch.clientX - rect.left;

if (gameState.current.isBallStuck) {
launchBall();
}
};

const handleTouchMove = (e: TouchEvent) => {
e.preventDefault();
const touch = e.touches[0];
const rect = canvas.getBoundingClientRect();
const scaleX = dimensions.width / rect.width;
const x = (touch.clientX - rect.left) * scaleX;

const paddle = gameState.current.paddle;
const halfWidth = paddle.width / 2;
paddle.x = Math.max(0, Math.min(dimensions.width - paddle.width, x - halfWidth));

if (gameState.current.isBallStuck) {
gameState.current.ball.x = paddle.x + paddle.width / 2;
}
};

const handleTouchEnd = (e: TouchEvent) => {
e.preventDefault();
};

canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

return () => {
canvas.removeEventListener('touchstart', handleTouchStart);
canvas.removeEventListener('touchmove', handleTouchMove);
canvas.removeEventListener('touchend', handleTouchEnd);
};
}, [isPreview, dimensions.width, launchBall]);

useEffect(() => {
if (isPreview) return;

const canvas = canvasRef.current;
if (!canvas) return;

const handleMouseMove = (e: MouseEvent) => {
const rect = canvas.getBoundingClientRect();
const scaleX = dimensions.width / rect.width;
const x = (e.clientX - rect.left) * scaleX;

const paddle = gameState.current.paddle;
const halfWidth = paddle.width / 2;
paddle.x = Math.max(0, Math.min(dimensions.width - paddle.width, x - halfWidth));

if (gameState.current.isBallStuck) {
gameState.current.ball.x = paddle.x + paddle.width / 2;
}
};

const handleMouseClick = (e: MouseEvent) => {
if (gameState.current.isBallStuck) {
launchBall();
}
};

canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('click', handleMouseClick);

return () => {
canvas.removeEventListener('mousemove', handleMouseMove);
canvas.removeEventListener('click', handleMouseClick);
};
}, [isPreview, dimensions.width, launchBall]);

useEffect(() => {
if (isPreview) {
// Preview animation with random bricks
const bricks = generateBricks(1);
gameState.current.bricks = bricks;
}
}, [isPreview, generateBricks]);

return (
<canvas
ref={canvasRef}
className="w-full aspect-[4/3] max-w-[800px] rounded-lg shadow-xl touch-none select-none"
style={{ touchAction: 'none' }}
/>
);
}

// Polyfill roundRect if not available
if (!CanvasRenderingContext2D.prototype.roundRect) {
CanvasRenderingContext2D.prototype.roundRect = function(
x: number,
y: number,
w: number,
h: number,
radii: number | number[]
) {
const r = typeof radii === 'number' ? radii : (Array.isArray(radii) ? radii[0] || 0 : 0);
this.moveTo(x + r, y);
this.arcTo(x + w, y, x + w, y + h, r);
this.arcTo(x + w, y + h, x, y + h, r);
this.arcTo(x, y + h, x, y, r);
this.arcTo(x, y, x + w, y, r);
this.closePath();
return this;
};
}