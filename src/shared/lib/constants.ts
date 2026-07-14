/// <reference types="vite/client" />
/**
 * Application constants. Import from `@/shared/lib` (or the api barrel).
 *
 * Values are env-driven where it makes sense (Vite exposes them via
 * `import.meta.env`); the rest are compile-time literals used for
 * consistency across the app.
 */

/** API base URL. Empty string means "same-origin" (works with MSW). */
export const API_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "";

/** Application identity. */
export const APP_NAME = "React Forge App";
export const APP_VERSION = "0.1.0";

/** Namespaced localStorage keys to avoid collisions with other apps. */
export const STORAGE_KEYS = {
  AUTH_TOKEN: "rf:auth-token",
  USER_PREFS: "rf:user-prefs",
  THEME: "rf:theme",
  REDIRECT_AFTER_LOGIN: "rf:redirect-after-login",
} as const;

/** Route paths used across the app. */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  LOGOUT: "/logout",
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
  PROFILE: "/profile",
  NOT_FOUND: "/404",
} as const;

/** Alias used by the HTTP client for the 401 redirect. */
export const LOGIN_ROUTE = ROUTES.LOGIN;

/** Default page size for paginated queries. */
export const DEFAULT_PAGE_SIZE = 20;

/** API request timeout (30s). */
export const API_TIMEOUT_MS = 30_000;

/** UI debounce delays (ms). */
export const DEBOUNCE = {
  SEARCH: 300,
  AUTOSAVE: 800,
  INPUT: 150,
  RESIZE: 200,
} as const;

/** QueryClient defaults. */
export const QUERY_DEFAULTS = {
  staleTime: 60_000,
  gcTime: 5 * 60_000,
  retry: 1,
  refetchOnWindowFocus: false,
} as const;

/** Union of all storage keys (useful for typed getters/setters). */
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/** Union of all route paths (useful for typed navigation). */
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
