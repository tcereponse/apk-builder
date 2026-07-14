export interface ApiResponse<T> {
 data: T;
 status: number;
 message?: string;
 timestamp: string;
}

export interface ApiError {
 code: string;
 message: string;
 details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
 items: T[];
 total: number;
 page: number;
 pageSize: number;
 totalPages: number;
}

export interface SessionCreateDto {
 duration: number;
 phase: TimerPhase;
 startTime: string;
 endTime?: string;
 isCompleted?: boolean;
}

export interface SessionUpdateDto {
 duration?: number;
 phase?: TimerPhase;
 endTime?: string;
 isCompleted?: boolean;
}

export interface SettingsUpdateDto {
 workDuration?: number;
 shortBreakDuration?: number;
 longBreakDuration?: number;
 longBreakInterval?: number;
 soundEnabled?: boolean;
 soundUrl?: string;
 notificationsEnabled?: boolean;
 autoStartBreaks?: boolean;
 autoStartWork?: boolean;
}

export interface StatsQuery {
 from?: string;
 to?: string;
 period?: 'day' | 'week' | 'month' | 'year';
}

export interface HistoryQuery extends StatsQuery {
 phase?: TimerPhase;
 page?: number;
 pageSize?: number;
 sortBy?: 'startTime' | 'duration';
 sortOrder?: 'asc' | 'desc';
}

export type ApiEndpoint = 
 | '/sessions'
 | '/sessions/:id'
 | '/settings'
 | '/stats'
 | '/stats/daily'
 | '/history'
 | '/notifications/test';
