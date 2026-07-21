// This file would contain types for API responses if any external APIs were used.
// For now, it remains minimal as we're using mock data.

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface ErrorResponse {
  code: string;
  message: string;
}
