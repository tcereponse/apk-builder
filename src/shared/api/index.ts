/**
 * Barrel export for the data layer's API surface.
 *
 * Import hooks and the client from here:
 *   import { useQuery, apiClient, ApiError } from "@/shared/api";
 */
export { ApiClient, apiClient, type ApiClientOptions } from "./client";
export {
  ApiError,
  type ApiResponse,
  type PaginatedResponse,
  type QueryKey,
  type FetcherOptions,
} from "./types";
export {
  useQuery,
  useMutation,
  useInfiniteQuery,
  usePaginatedQuery,
} from "./hooks";
export { createQueryClient } from "./query-client";
export {
  setupMockServer,
  createMockHandler,
  mockDelay,
  okResponse,
  errorResponse,
  paginatedResponse,
} from "./mock-server";
