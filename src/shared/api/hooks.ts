/**
 * Generic TanStack Query v5 hooks.
 *
 * Design: hooks accept a `fetcher` function (typically a repository method).
 * The repository layer owns the transport (it calls ApiClient), keeping the
 * UI completely decoupled from HTTP details. Cancellation is wired through
 * the AbortSignal provided by TanStack Query.
 */
import {
  useQuery as useReactQuery,
  useMutation as useReactMutation,
  useInfiniteQuery as useReactInfiniteQuery,
  type UseQueryOptions,
  type UseMutationOptions,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { ApiError, type FetcherOptions, type PaginatedResponse, type QueryKey } from "./types";

/**
 * Typed wrapper around useQuery with ApiError as the error channel.
 *
 * @example
 * const { data, isLoading } = useQuery(["tasks"], ({ signal }) =>
 *   taskRepository.list({ signal })
 * );
 */
export function useQuery<T>(
  key: QueryKey,
  fetcher: (opts: FetcherOptions) => Promise<T>,
  options?: Omit<UseQueryOptions<T, ApiError, T, QueryKey>, "queryKey" | "queryFn">
) {
  return useReactQuery<T, ApiError, T, QueryKey>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher({ signal }),
    ...options,
  });
}

/**
 * Typed wrapper around useMutation.
 * Supports optimistic updates via onMutate / onError / onSettled in options.
 *
 * @example
 * const { mutateAsync } = useMutation(
 *   (input: CreateTaskInput) => taskRepository.create(input),
 *   {
 *     onMutate: async (input) => {
 *       await queryClient.cancelQueries({ queryKey: ["tasks"] });
 *       const prev = queryClient.getQueryData<Task[]>(["tasks"]);
 *       queryClient.setQueryData<Task[]>(["tasks"], (old) => [...(old ?? []), { ...input, id: "tmp" }]);
 *       return { prev };
 *     },
 *     onError: (_err, _input, ctx) => {
 *       if (ctx?.prev) queryClient.setQueryData(["tasks"], ctx.prev);
 *     },
 *     onSettled: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
 *   }
 * );
 */
export function useMutation<TData = unknown, TVariables = void, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, ApiError, TVariables, TContext>, "mutationFn">
) {
  return useReactMutation<TData, ApiError, TVariables, TContext>({
    mutationFn,
    ...options,
  });
}

/**
 * Typed wrapper around useInfiniteQuery for cursor/offset pagination.
 *
 * @example
 * const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
 *   ["tasks", "infinite"],
 *   ({ pageParam, signal }) => taskRepository.list({ page: pageParam, signal }),
 *   { initialPageParam: 1, getNextPageParam: (last) => last.hasNext ? last.page + 1 : undefined }
 * );
 */
export function useInfiniteQuery<T>(
  key: QueryKey,
  fetcher: (opts: FetcherOptions & { pageParam: number }) => Promise<T>,
  options: {
    /** First page parameter (defaults to 1). */
    initialPageParam?: number;
    /** Required — determines when there is no next page. */
    getNextPageParam: (
      lastPage: T,
      allPages: T[],
      lastPageParam: number,
      allPageParams: number[]
    ) => number | undefined;
    getPreviousPageParam?: (
      firstPage: T,
      allPages: T[],
      firstPageParam: number,
      allPageParams: number[]
    ) => number | undefined;
  } & Omit<
      UseInfiniteQueryOptions<T, ApiError, T, QueryKey, number>,
      | "queryKey"
      | "queryFn"
      | "initialPageParam"
      | "getNextPageParam"
      | "getPreviousPageParam"
    >
) {
  const { initialPageParam, ...rest } = options;
  return useReactInfiniteQuery<T, ApiError, T, QueryKey, number>({
    queryKey: key,
    queryFn: ({ pageParam, signal }) => fetcher({ pageParam, signal }),
    initialPageParam: initialPageParam ?? 1,
    ...rest,
  });
}

/**
 * Convenience hook for endpoints that return PaginatedResponse<T>.
 * Keeps the previous page visible while fetching the next one (placeholderData).
 *
 * @example
 * const { data, isLoading } = usePaginatedQuery(
 *   ["tasks"],
 *   (page, { signal }) => taskRepository.list({ page, signal }),
 *   page
 * );
 */
export function usePaginatedQuery<T>(
  key: QueryKey,
  fetcher: (page: number, opts: FetcherOptions) => Promise<PaginatedResponse<T>>,
  page: number,
  options?: Omit<
    UseQueryOptions<PaginatedResponse<T>, ApiError, PaginatedResponse<T>, QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  return useReactQuery<PaginatedResponse<T>, ApiError, PaginatedResponse<T>, QueryKey>({
    queryKey: [...key, { page }],
    queryFn: ({ signal }) => fetcher(page, { signal }),
    placeholderData: (prev) => prev,
    ...options,
  });
}
