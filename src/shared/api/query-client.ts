/**
 * QueryClient factory with sensible defaults.
 * Import `createQueryClient` once in your app entry (main.tsx) and pass the
 * result to <QueryClientProvider>.
 */
import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./types";
import { QUERY_DEFAULTS } from "../lib/constants";

/**
 * Create a configured QueryClient.
 *
 * Defaults:
 *   - staleTime: 60s (avoid refetch storms)
 *   - gcTime:    5min (keep unused data in cache briefly)
 *   - retry:     1 attempt, but never on 4xx (except 408/429)
 *   - refetchOnWindowFocus: false (no surprise refetches)
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_DEFAULTS.staleTime,
        gcTime: QUERY_DEFAULTS.gcTime,
        retry: (failureCount, error) => {
          // Never retry client errors (except timeout / rate-limit).
          if (
            error instanceof ApiError &&
            error.isClientError &&
            !error.isNetworkError &&
            error.status !== 429
          ) {
            return false;
          }
          return failureCount < QUERY_DEFAULTS.retry;
        },
        refetchOnWindowFocus: QUERY_DEFAULTS.refetchOnWindowFocus,
      },
      mutations: {
        // Mutations should not auto-retry; surface errors to the UI.
        retry: false,
      },
    },
  });
}
