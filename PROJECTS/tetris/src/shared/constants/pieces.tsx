export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;
export const PIECES = {
I: {
matrix: [
[0, 0, 0, 0],
[1, 1, 1, 1],
[0, 0, 0, 0],
[0, 0, 0, 0]
],
color: '#06b6d4'
},
O: {
matrix: [
[1, 1],
[1, 1]
],
color: '#eab308'
},
T: {
matrix: [
[0, 1, 0],
[1, 1, 1],
[0, 0, 0]
],
color: '#a855f7'
},
S: {
matrix: [
[0, 1, 1],
[1, 1, 0],
[0, 0, 0]
],
color: '#22c55e'
},
Z: {
matrix: [
[1, 1, 0],
[0, 1, 1],
[0, 0, 0]
],
color: '#ef4444'
},
J: {
matrix: [
[1, 0, 0],
[1, 1, 1],
[0, 0, 0]
],
color: '#3b82f6'
},
L: {
matrix: [
[0, 0, 1],
[1, 1, 1],
[0, 0, 0]
],
color: '#f97316'
}
};
import { HighScore, Settings, Stats } from '@shared/types/game.types';
const KEYS = {
HIGH_SCORES: 'tetris_highscores',
SETTINGS: 'tetris_settings',
STATS: 'tetris_stats'
};
export const localStorageService = {
getHighScores(): HighScore[] {
try {
const data = localStorage.getItem(KEYS.HIGH_SCORES);
if (data) {
const parsed = JSON.parse(data);
if (Array.isArray(parsed)) {
return parsed;
}
}
} catch {
localStorage.removeItem(KEYS.HIGH_SCORES);
}
return [];
},
saveHighScores(scores: HighScore[]): void {
try {
localStorage.setItem(KEYS.HIGH_SCORES, JSON.stringify(scores));
} catch {
// Silently fail
}
},
clearHighScores(): void {
localStorage.removeItem(KEYS.HIGH_SCORES);
},
getSettings(): Settings | null {
try {
const data = localStorage.getItem(KEYS.SETTINGS);
if (data) {
return JSON.parse(data);
}
} catch {
localStorage.removeItem(KEYS.SETTINGS);
}
return null;
},
saveSettings(settings: Settings): void {
try {
localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
} catch {
// Silently fail
}
},
getStats(): Stats | null {
try {
const data = localStorage.getItem(KEYS.STATS);
if (data) {
return JSON.parse(data);
}
} catch {
localStorage.removeItem(KEYS.STATS);
}
return null;
},
saveStats(stats: Stats): void {
try {
localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
} catch {
// Silently fail
}
},
clearStats(): void {
localStorage.removeItem(KEYS.STATS);
}
};