import { z } from 'zod';
const HighScoreSchema = z.object({
score: z.number(),
lines: z.number(),
level: z.number(),
date: z.string(),
});
const SettingsSchema = z.object({
theme: z.enum(['light', 'dark', 'diamond']),
soundEnabled: z.boolean(),
zenMode: z.boolean(),
});
export type HighScore = z.infer<typeof HighScoreSchema>;
export type Settings = z.infer<typeof SettingsSchema>;
const defaultSettings: Settings = {
theme: 'diamond',
soundEnabled: true,
zenMode: false,
};
export class PersistanceService {
private static readonly HIGH_SCORE_KEY = 'tetisback_highscore';
private static readonly SETTINGS_KEY = 'tetisback_settings';
static saveHighScore(score: number, lines: number, level: number): void {
const data: HighScore = { score, lines, level, date: new Date().toISOString() };
try {
const validated = HighScoreSchema.parse(data);
localStorage.setItem(this.HIGH_SCORE_KEY, JSON.stringify(validated));
} catch (e) {
console.warn('Failed to save high score', e);
}
}
static loadHighScore(): HighScore | null {
try {
const raw = localStorage.getItem(this.HIGH_SCORE_KEY);
if (!raw) return null;
const parsed = JSON.parse(raw);
return HighScoreSchema.parse(parsed);
} catch (e) {
console.warn('Failed to load high score', e);
return null;
}
}
static saveSettings(settings: Settings): void {
try {
const validated = SettingsSchema.parse(settings);
localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(validated));
} catch (e) {
console.warn('Failed to save settings', e);
}
}
static loadSettings(): Settings {
try {
const raw = localStorage.getItem(this.SETTINGS_KEY);
if (!raw) return defaultSettings;
const parsed = JSON.parse(raw);
return SettingsSchema.parse(parsed);
} catch (e) {
console.warn('Failed to load settings, using defaults', e);
return defaultSettings;
}
}
static resetSettings(): void {
localStorage.removeItem(this.SETTINGS_KEY);
}
static resetHighScore(): void {
localStorage.removeItem(this.HIGH_SCORE_KEY);
}
}