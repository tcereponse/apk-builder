/**
 * Shared API types for the data layer.
 * Re-exported from `src/shared/api/index.ts`.
 */
import type { QueryKey as TanStackQueryKey } from "@tanstack/react-query";

/**
 * Standard API envelope returned by every successful/failed endpoint.
 * The ApiClient automatically unwraps `data` for consumers.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

/** Paginated list response. */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
}

/**
 * Typed query key alias for TanStack Query.
 * Always use this instead of bare arrays to keep key construction consistent.
 */
export type QueryKey = TanStackQueryKey;

/** Options passed by hooks to fetchers (repository methods). */
export interface FetcherOptions {
  /** Abort signal wired up by TanStack Query for cancellation. */
  signal?: AbortSignal;
}

/**
 * Typed error thrown by the ApiClient and surfaced to TanStack Query.
 * Status codes follow HTTP semantics:
 *   - 0   : network/transport failure
 *   - 408 : request timeout
 *   - 401 : unauthorized (auto-redirect to login)
 *   - 4xx : client error
 *   - 5xx : server error
 */
export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
    // Restore prototype chain (required when extending built-ins under ES5 targets).
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /** True for 4xx client errors. */
  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  /** True for 5xx server errors. */
  get isServerError(): boolean {
    return this.status >= 500;
  }

  /** True for transport-level failures (status 0) or timeouts (408). */
  get isNetworkError(): boolean {
    return this.status === 0 || this.status === 408;
  }

  /** Convenience factory for unauthorized errors. */
  static unauthorized(message = "Unauthorized"): ApiError {
    return new ApiError(401, message);
  }

  /** Convenience factory for not-found errors. */
  static notFound(message = "Not found"): ApiError {
    return new ApiError(404, message);
  }

  /** Serialize to a plain object for logging / telemetry. */
  toJSON(): { name: string; status: number; message: string; details?: unknown } {
    return { name: this.name, status: this.status, message: this.message, details: this.details };
  }
}
