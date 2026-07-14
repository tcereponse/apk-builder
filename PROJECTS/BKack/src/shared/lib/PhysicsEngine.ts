export class PhysicsEngine {
static checkCircleRectCollision(
cx: number,
cy: number,
radius: number,
rx: number,
ry: number,
rw: number,
rh: number
): boolean {
const closestX = Math.max(rx, Math.min(cx, rx + rw));
const closestY = Math.max(ry, Math.min(cy, ry + rh));
const dx = cx - closestX;
const dy = cy - closestY;
return (dx * dx + dy * dy) < (radius * radius);
}

static reflectBall(
cx: number,
cy: number,
radius: number,
rx: number,
ry: number,
rw: number,
rh: number,
vx: number,
vy: number
): { vx: number; vy: number } {
const closestX = Math.max(rx, Math.min(cx, rx + rw));
const closestY = Math.max(ry, Math.min(cy, ry + rh));
const dx = cx - closestX;
const dy = cy - closestY;

if (Math.abs(dx) < Math.abs(dy)) {
return { vx: -vx, vy: vy };
} else {
return { vx: vx, vy: -vy };
}
}

static calculatePaddleReflection(
ballX: number,
paddleX: number,
paddleWidth: number,
currentVx: number,
currentVy: number
): { vx: number; vy: number } {
const hitPos = (ballX - paddleX) / paddleWidth;
const angle = (hitPos - 0.5) * Math.PI / 2.2;
const speed = Math.sqrt(currentVx * currentVx + currentVy * currentVy);
return {
vx: Math.sin(angle) * speed,
vy: -Math.cos(angle) * speed
};
}
}