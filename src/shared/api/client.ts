/** Gold Grade API Client — typed HTTP client with interceptors, error handling, and retry. */

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export interface ApiClientOptions {
  baseUrl?: string
  headers?: Record<string, string>
  timeout?: number
  retries?: number
}

export class ApiClient {
  private baseUrl: string
  private headers: Record<string, string>
  private timeout: number
  private retries: number

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? import.meta.env.VITE_API_URL ?? ''
    this.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
    this.timeout = options.timeout ?? 30_000
    this.retries = options.retries ?? 1
  }

  setAuthToken(token: string | null): void {
    if (token) {
      this.headers.Authorization = `Bearer ${token}`
    } else {
      delete this.headers.Authorization
    }
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const url = params ? `${path}?${new URLSearchParams(params)}` : path
    return this.request<T>('GET', url)
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', path, body)
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PUT', path, body)
  }

  async patch<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PATCH', path, body)
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path)
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`
    let lastError: Error | null = null

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), this.timeout)

        const res = await fetch(url, {
          method,
          headers: this.headers,
          body: body ? JSON.stringify(body) : null,
          signal: controller.signal,
        })

        clearTimeout(timer)

        if (!res.ok) {
          const errorBody = await res.json().catch(() => undefined)
          throw new ApiError(
            errorBody?.message ?? `HTTP ${res.status}`,
            res.status,
            errorBody
          )
        }

        const contentType = res.headers.get('content-type') ?? ''
        if (contentType.includes('application/json')) {
          return (await res.json()) as T
        }
        return (await res.text()) as unknown as T
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        // Don't retry on 4xx errors (client errors)
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          throw error
        }
        // Retry on network errors and 5xx
        if (attempt < this.retries) {
          await new Promise((r) => setTimeout(r, 2 ** attempt * 500))
        }
      }
    }

    throw lastError ?? new Error('Request failed')
  }
}

/** Singleton API client. */
export const apiClient = new ApiClient()
