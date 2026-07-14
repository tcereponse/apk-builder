Couche Données — GAMER
Types & Schémas (Zod)
Types Globaux
// src/shared/types/index.ts
import { z } from 'zod'

// User
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().min(3).max(30),
  avatar: z.string().url().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export type User = z.infer<typeof UserSchema>

// Feature
export const FeatureSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  badge: z.string().optional(),
  color: z.string().optional()
})

export type Feature = z.infer<typeof FeatureSchema>

// Testimonial
export const TestimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  avatar: z.string().url().optional(),
  text: z.string(),
  rating: z.number().min(1).max(5)
})

export type Testimonial = z.infer<typeof TestimonialSchema>

// Stat
export const StatSchema = z.object({
  id: z.string(),
  value: z.string(),
  label: z.string(),
  icon: z.string()
})

export type Stat = z.infer<typeof StatSchema>

// Newsletter Subscription
export const NewsletterSubscriptionSchema = z.object({
  email: z.string().email(),
  consent: z.boolean().refine(v => v === true, 'Vous devez accepter la politique de confidentialité')
})

export type NewsletterSubscription = z.infer<typeof NewsletterSubscriptionSchema>
Services API
Base Service
// src/shared/services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.gamer.example.com'

export class ApiService {
  private baseUrl: string
  
  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }
  
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `HTTP ${response.status}`)
    }
    
    return response.json()
  }
  
  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }
  
  post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}
Feature Service
// src/shared/services/featureService.ts
import { ApiService } from './api'
import { Feature, FeatureSchema } from '@/shared/types'

export class FeatureService extends ApiService {
  async getFeatures(): Promise<Feature[]> {
    // Fallback aux données statiques (mode démo)
    try {
      const data = await this.get<Feature[]>('/api/features')
      return data.map(d => FeatureSchema.parse(d))
    } catch {
      // Données mockées
      return this.getMockFeatures()
    }
  }
  
  private getMockFeatures(): Feature[] {
    return [
      {
        id: '1',
        title: 'Communauté Active',
        description: 'Rejoins des milliers de passionnés',
        icon: 'Users',
        badge: '🔥 10k+ joueurs'
      },
      // ... autres features
    ]
  }
}
Newsletter Service
// src/shared/services/newsletterService.ts
import { ApiService } from './api'
import { NewsletterSubscription } from '@/shared/types'

export class NewsletterService extends ApiService {
  async subscribe(data: NewsletterSubscription): Promise<{ success: boolean }> {
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Validation
    if (!data.email.includes('@')) {
      throw new Error('Email invalide')
    }
    
    // En production : appel réel
    // return this.post('/api/newsletter/subscribe', data)
    
    return { success: true }
  }
}
IndexedDB Layer
DB Configuration
// src/shared/services/db.ts
import { openDB, IDBPDatabase } from 'idb' // Optionnel

const DB_NAME = 'GamerDB'
const DB_VERSION = 1

interface GamerDB {
  users: {
    key: string
    value: {
      id: string
      username: string
      email: string
      preferences: Record<string, unknown>
    }
  }
  cache: {
    key: string
    value: {
      key: string
      data: unknown
      timestamp: number
    }
    indexes: { 'by-timestamp': number }
  }
}

export class DatabaseService {
  private db: IDBPDatabase<GamerDB> | null = null
  
  async init() {
    this.db = await openDB<GamerDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Users store
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'id' })
        }
        
        // Cache store
        if (!db.objectStoreNames.contains('cache')) {
          const store = db.createObjectStore('cache', { keyPath: 'key' })
          store.createIndex('by-timestamp', 'timestamp')
        }
      }
    })
  }
  
  async getFromCache<T>(key: string): Promise<T | null> {
    if (!this.db) await this.init()
    const entry = await this.db!.get('cache', key)
    
    if (!entry) return null
    if (Date.now() - entry.timestamp > 5 * 60 * 1000) { // 5 minutes
      await this.db!.delete('cache', key)
      return null
    }
    
    return entry.data as T
  }
  
  async setCache<T>(key: string, data: T): Promise<void> {
    if (!this.db) await this.init()
    await this.db!.put('cache', {
      key,
      data,
      timestamp: Date.now()
    })
  }
}
Constants
// src/shared/constants/index.ts
export const APP_CONFIG = {
  name: 'GAMER',
  version: '1.0.0',
  description: 'L\'énergie du jeu',
  socialLinks: {
    discord: 'https://discord.gg/gamer',
    twitter: 'https://twitter.com/gamer',
    youtube: 'https://youtube.com/@gamer',
    twitch: 'https://twitch.tv/gamer',
    github: 'https://github.com/gamer'
  }
}

export const FEATURES_CONSTANTS = {
  featuresPerPage: 4,
  testimonialsPerPage: 3,
  statsCount: 4
}

export const NEWSLETTER_CONSTANTS = {
  successMessage: 'Merci pour votre inscription ! ✨',
  errorMessage: 'Une erreur est survenue. Veuillez réessayer.',
  validationMessage: 'Email invalide'
}