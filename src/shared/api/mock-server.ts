/**
 * MSW (Mock Service Worker) setup for development and tests.
 *
 * In development, the same ApiClient calls are transparently intercepted by
 * MSW — no feature code needs to change between mock and real backend.
 *
 * Usage in main.tsx:
 *   if (import.meta.env.DEV) {
 *     const { setupMockServer } = await import("@/shared/api/mock-server");
 *     await setupMockServer(handlers);
 *   }
 */
import { setupWorker } from "msw/browser";
import {
  http,
  HttpResponse,
  type HttpHandler,
  type HttpResponseResolver,
  type PathParams,
  type DefaultBodyType,
} from "msw";
import { DEFAULT_PAGE_SIZE } from "../lib/constants";

/** Add a realistic delay to a mock response (default 300ms). */
export async function mockDelay(ms = 300): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, ms));
}

type MockMethod = "get" | "post" | "put" | "patch" | "delete";

const methodFactories: Record<MockMethod, typeof http.get> = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete,
};

/**
 * Build a single MSW handler bound to a method, path and resolver.
 *
 * @example
 * const handler = createMockHandler("get", "/api/tasks", async () => {
 *   await mockDelay();
 *   return okResponse([{ id: 1, title: "Demo" }]);
 * });
 */
export function createMockHandler(
  method: MockMethod,
  path: string,
  resolver: HttpResponseResolver<PathParams, DefaultBodyType>
): HttpHandler {
  const factory = methodFactories[method];
  return factory(path, resolver);
}

/** Wrap a value into a standard success ApiResponse envelope. */
export function okResponse<T>(data: T, init?: ResponseInit): Response {
  return HttpResponse.json({ success: true, data, error: undefined }, init);
}

/** Wrap an error message into a failed ApiResponse envelope. */
export function errorResponse(
  message: string,
  status = 400,
  details?: unknown
): Response {
  return HttpResponse.json(
    { success: false, data: null, error: message, details },
    { status }
  );
}

/** Build a paginated mock response. */
export function paginatedResponse<T>(
  items: T[],
  page: number,
  total: number
): Response {
  return okResponse({
    items,
    total,
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    hasNext: page * DEFAULT_PAGE_SIZE < total,
  });
}

/** The MSW worker type (kept abstract so callers don't depend on internal types). */
export type MockWorker = ReturnType<typeof setupWorker>;

let workerPromise: Promise<MockWorker> | null = null;

/**
 * Start the MSW worker with the given handlers (idempotent).
 * Unhandled requests fall through to the network (real backend).
 */
export async function setupMockServer(
  handlers: HttpHandler[]
): Promise<MockWorker> {
  if (workerPromise) return workerPromise;
  workerPromise = (async () => {
    const worker = setupWorker(...handlers);
    const base = (import.meta.env.BASE_URL as string | undefined) ?? "/";
    await worker.start({
      onUnhandledRequest: "bypass",
      quiet: false,
      serviceWorker: { url: `${base}mockServiceWorker.js` },
    });
    return worker;
  })();
  return workerPromise;
}
