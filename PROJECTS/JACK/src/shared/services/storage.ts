import type { Score, Settings } from '@shared/types/schemas'

export class StorageService {
  private db: any = null

  async init() {
    return new Promise((resolve) => {
      const request = indexedDB.open('JackDB', 1)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains('scores')) {
          db.createObjectStore('scores', { keyPath: 'id', autoIncrement: true })
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings')
        }
      }

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result
        resolve(this.db)
      }

      request.onerror = () => {
        console.error('Erreur d\'ouverture IndexedDB')
        resolve(null)
      }
    })
  }

  async saveScore(score: Score): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de données non initialisée'))
        return
      }

      const tx = this.db.transaction('scores', 'readwrite')
      const store = tx.objectStore('scores')
      const request = store.add(score)

      request.onsuccess = () => resolve(request.result as number)
      request.onerror = () => reject(request.error)
    })
  }

  async getTopScores(limit = 10): Promise<Score[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de données non initialisée'))
        return
      }

      const tx = this.db.transaction('scores', 'readonly')
      const store = tx.objectStore('scores')
      const request = store.getAll()

      request.onsuccess = () => {
        const scores = (request.result as Score[]).sort((a, b) => b.score - a.score)
        resolve(scores.slice(0, limit))
      }
      request.onerror = () => reject(request.error)
    })
  }

  async saveSettings(settings: Settings): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de données non initialisée'))
        return
      }

      const tx = this.db.transaction('settings', 'readwrite')
      const store = tx.objectStore('settings')
      const request = store.put(settings, 'userSettings')

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async getSettings(): Promise<Settings | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de données non initialisée'))
        return
      }

      const tx = this.db.transaction('settings', 'readonly')
      const store = tx.objectStore('settings')
      const request = store.get('userSettings')

      request.onsuccess = () => resolve(request.result as Settings || null)
      request.onerror = () => reject(request.error)
    })
  }
}