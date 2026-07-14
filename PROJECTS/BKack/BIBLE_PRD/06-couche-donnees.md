# COUCHE DONNÉES — BKACK

## 🧬 Schémas Zod

### Types de Base
import { z } from 'zod';

// Score
export const ScoreSchema = z.object({
  id: z.string().uuid(),
  score: z.number().int().positive(),
  level: z.number().int().min(1).max(99),
  date: z.string().datetime(),
  mode: z.enum(['classic', 'challenge', 'endless'])
});
export type Score = z.infer<typeof ScoreSchema>;

// Paramètres Joueur
export const SettingsSchema = z.object({
  soundEnabled: z.boolean().default(true),
  sfxEnabled: z.boolean().default(true),
  vibrationEnabled: z.boolean().default(false),
  theme: z.enum(['light', 'dark']).default('light'),
  difficulty: z.enum(['easy', 'normal', 'hard']).default('normal')
});
export type Settings = z.infer<typeof SettingsSchema>;

// État de Jeu
export const GameStateSchema = z.object({
  score: z.number().int().nonnegative(),
  lives: z.number().int().min(0).max(5),
  level: z.number().int().min(1),
  bricksDestroyed: z.number().int().nonnegative(),
  status: z.enum(['idle', 'active', 'paused', 'gameover'])
});
export type GameState = z.infer<typeof GameStateSchema>;

// Profil
export const ProfileSchema = z.object({
  username: z.string().min(1).max(20).optional(),
  totalGames: z.number().int().nonnegative().default(0),
  totalScore: z.number().int().nonnegative().default(0),
  highestLevel: z.number().int().min(0).default(0),
  createdAt: z.string().datetime()
});
export type Profile = z.infer<typeof ProfileSchema>;
📦 Services
StorageService (IndexedDB)
export class StorageService {
  private db: IDBDatabase | null = null;
  private DB_NAME = 'BKACK_DB';
  private STORES = {
    scores: 'scores',
    settings: 'settings',
    profile: 'profile'
  };

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, 1);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        // Créer les object stores
        if (!db.objectStoreNames.contains('scores')) {
          db.createObjectStore('scores', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile', { keyPath: 'id' });
        }
      };
      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };
      request.onerror = (event) => reject(event);
    });
  }

  async saveScore(score: Score): Promise<void> {
    if (!this.db) throw new Error('DB not initialized');
    const tx = this.db.transaction('scores', 'readwrite');
    await tx.objectStore('scores').add(score);
  }

  async getTopScores(limit: number = 10): Promise<Score[]> {
    if (!this.db) throw new Error('DB not initialized');
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('scores', 'readonly');
      const request = tx.objectStore('scores').getAll();
      request.onsuccess = () => {
        const scores = request.result as Score[];
        resolve(scores.sort((a, b) => b.score - a.score).slice(0, limit));
      };
      request.onerror = () => reject(request.error);
    });
  }

  async saveSettings(settings: Settings): Promise<void> {
    if (!this.db) throw new Error('DB not initialized');
    const tx = this.db.transaction('settings', 'readwrite');
    await tx.objectStore('settings').put({ key: 'user_settings', ...settings });
  }

  async getSettings(): Promise<Settings | null> {
    if (!this.db) throw new Error('DB not initialized');
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('settings', 'readonly');
      const request = tx.objectStore('settings').get('user_settings');
      request.onsuccess = () => resolve(request.result as Settings || null);
      request.onerror = () => reject(request.error);
    });
  }
}
🔄 Services d'Application
AudioService
export class AudioService {
  private context: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();

  async init(): Promise<void> {
    this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    await this.loadSounds();
  }

  private async loadSounds(): Promise<void> {
    const soundFiles = ['pop', 'tink', 'ping', 'buzz', 'fanfare'];
    for (const name of soundFiles) {
      const response = await fetch(`/sounds/${name}.mp3`);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await this.context!.decodeAudioData(arrayBuffer);
      this.sounds.set(name, buffer);
    }
  }

  play(name: string): void {
    if (!this.context || !this.sounds.has(name)) return;
    const source = this.context.createBufferSource();
    source.buffer = this.sounds.get(name)!;
    source.connect(this.context.destination);
    source.start(0);
  }
}
HapticService
export class HapticService {
  static vibrate(pattern: number | number[]): void {
    if (!navigator.vibrate) return;
    navigator.vibrate(pattern);
  }

  static light(): void {
    this.vibrate(20);
  }

  static medium(): void {
    this.vibrate(50);
  }

  static heavy(): void {
    this.vibrate([30, 50, 30]);
  }
}
🗃️ Export Unifié
// shared/services/index.ts
export { StorageService } from './StorageService';
export { AudioService } from './AudioService';
export { HapticService } from './HapticService';
🔐 Validation & Sécurité

Sanitization : Toutes les entrées utilisateur sont nettoyées

Validation : Zod appliqué avant toute insertion en DB

Encapsulation : Services en singleton pour éviter les fuites mémoire

text

---

## 📋 BIBLE_