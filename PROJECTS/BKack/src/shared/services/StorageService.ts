import { Score, Settings, scoreSchema, settingsSchema } from '@shared/types/game';

export class StorageService {
private db: IDBDatabase | null = null;
private readonly DB_NAME = 'BKACK_DB';
private readonly DB_VERSION = 1;

private readonly STORES = {
scores: 'scores',
settings: 'settings',
profile: 'profile'
} as const;

async init(): Promise<void> {
if (this.db) return;

return new Promise((resolve, reject) => {
const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

request.onupgradeneeded = (event) => {
const db = (event.target as IDBOpenDBRequest).result;

if (!db.objectStoreNames.contains(this.STORES.scores)) {
const scoreStore = db.createObjectStore(this.STORES.scores, { keyPath: 'id' });
scoreStore.createIndex('score', 'score', { unique: false });
scoreStore.createIndex('date', 'date', { unique: false });
}

if (!db.objectStoreNames.contains(this.STORES.settings)) {
db.createObjectStore(this.STORES.settings, { keyPath: 'key' });
}

if (!db.objectStoreNames.contains(this.STORES.profile)) {
db.createObjectStore(this.STORES.profile, { keyPath: 'id' });
}
};

request.onsuccess = (event) => {
this.db = (event.target as IDBOpenDBRequest).result;
resolve();
};

request.onerror = (event) => {
reject((event.target as IDBOpenDBRequest).error);
};
});
}

async saveScore(score: Score): Promise<void> {
if (!this.db) throw new Error('Database not initialized');
const validated = scoreSchema.parse(score);

return new Promise((resolve, reject) => {
const tx = this.db!.transaction(this.STORES.scores, 'readwrite');
const request = tx.objectStore(this.STORES.scores).add(validated);

request.onsuccess = () => resolve();
request.onerror = () => reject(request.error);
});
}

async getTopScores(limit: number = 10): Promise<Score[]> {
if (!this.db) throw new Error('Database not initialized');

return new Promise((resolve, reject) => {
const tx = this.db!.transaction(this.STORES.scores, 'readonly');
const store = tx.objectStore(this.STORES.scores);
const index = store.index('score');
const request = index.openCursor(null, 'prev');
const results: Score[] = [];

request.onsuccess = () => {
const cursor = request.result;
if (cursor && results.length < limit) {
results.push(cursor.value);
cursor.continue();
} else {
resolve(results);
}
};

request.onerror = () => reject(request.error);
});
}

async saveSettings(settings: Settings): Promise<void> {
if (!this.db) throw new Error('Database not initialized');
const validated = settingsSchema.parse(settings);

return new Promise((resolve, reject) => {
const tx = this.db!.transaction(this.STORES.settings, 'readwrite');
const request = tx.objectStore(this.STORES.settings).put({
key: 'user_settings',
...validated
});

request.onsuccess = () => resolve();
request.onerror = () => reject(request.error);
});
}

async getSettings(): Promise<Settings | null> {
if (!this.db) throw new Error('Database not initialized');

return new Promise((resolve, reject) => {
const tx = this.db!.transaction(this.STORES.settings, 'readonly');
const request = tx.objectStore(this.STORES.settings).get('user_settings');

request.onsuccess = () => {
const result = request.result;
if (result) {
try {
const parsed = settingsSchema.parse(result);
resolve(parsed);
} catch {
resolve(null);
}
} else {
resolve(null);
}
};

request.onerror = () => reject(request.error);
});
}

async clearScores(): Promise<void> {
if (!this.db) throw new Error('Database not initialized');

return new Promise((resolve, reject) => {
const tx = this.db!.transaction(this.STORES.scores, 'readwrite');
const request = tx.objectStore(this.STORES.scores).clear();

request.onsuccess = () => resolve();
request.onerror = () => reject(request.error);
});
}
}