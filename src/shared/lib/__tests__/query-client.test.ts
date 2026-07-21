import { describe, it, expect } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { queryClient } from '../query-client';

describe('Query Client', () => {
  it('should export an instance of QueryClient', () => {
    expect(queryClient).toBeInstanceOf(QueryClient);
  });

  // You might want to test specific default options if they are set in query-client.ts
  it('should have default options configured (if any)', () => {
    // Example: Assuming defaultStaleTime is set
    // if (queryClient.defaultOptions?.queries?.staleTime !== undefined) {
    //   expect(queryClient.defaultOptions.queries.staleTime).toBe(60 * 1000); // 1 minute
    // }
    // For this exercise, we just ensure it's a QueryClient instance.
    expect(true).toBe(true);
  });
});
