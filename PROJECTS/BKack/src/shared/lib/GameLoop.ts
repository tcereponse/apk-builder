export class GameLoop {
private animationId: number | null = null;
private isRunning: boolean = false;
private lastTime: number = 0;

constructor(
private update: (deltaTime: number) => void,
private render: () => void
) {}

start(): void {
if (this.isRunning) return;
this.isRunning = true;
this.lastTime = performance.now();
this.loop(performance.now());
}

private loop(timestamp: number): void {
if (!this.isRunning) return;

const deltaTime = (timestamp - this.lastTime) / 1000;
this.lastTime = timestamp;

this.update(deltaTime);
this.render();

this.animationId = requestAnimationFrame((t) => this.loop(t));
}

stop(): void {
this.isRunning = false;
if (this.animationId !== null) {
cancelAnimationFrame(this.animationId);
this.animationId = null;
}
}

pause(): void {
this.isRunning = false;
if (this.animationId !== null) {
cancelAnimationFrame(this.animationId);
this.animationId = null;
}
}

resume(): void {
if (this.isRunning) return;
this.isRunning = true;
this.lastTime = performance.now();
this.loop(performance.now());
}

isActive(): boolean {
return this.isRunning;
}
}