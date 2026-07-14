export class HapticService {
static isSupported(): boolean {
return typeof navigator !== 'undefined' && !!navigator.vibrate;
}

static vibrate(pattern: number | number[]): void {
if (!this.isSupported()) return;
try {
navigator.vibrate(pattern);
} catch {
// Silently fail
}
}

static light(): void {
this.vibrate(10);
}

static medium(): void {
this.vibrate(30);
}

static heavy(): void {
this.vibrate([20, 30, 20]);
}

static success(): void {
this.vibrate([10, 20, 10]);
}

static error(): void {
this.vibrate([30, 20, 30, 20, 30]);
}

static cancel(): void {
if (this.isSupported()) {
try {
navigator.vibrate(0);
} catch {
// Silently fail
}
}
}
}