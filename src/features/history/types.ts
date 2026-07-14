import { Session, HistoryFilters, FilterType } from '../../shared/types';

export interface HistoryContextType {
 sessions: Session[];
 total: number;
 page: number;
 pageSize: number;
 filters: HistoryFilters;
 loading: boolean;
 error: string | null;
 setFilters: (filters: HistoryFilters) => void;
 setPage: (page: number) => void;
 refresh: () => Promise<void>;
}

export interface SessionListProps {
 sessions: Session[];
 loading?: boolean;
 onItemClick?: (session: Session) => void;
}

export interface SessionItemProps {
 session: Session;
 onClick?: (session: Session) => void;
 compact?: boolean;
}

export interface HistoryFiltersProps {
 filters: HistoryFilters;
 onFilterChange: (filters: HistoryFilters) => void;
 availablePhases: TimerPhase[];
}

export interface HistoryPaginationProps {
 currentPage: number;
 totalPages: number;
 onPageChange: (page: number) => void;
}

export interface HistoryHookReturn {
 sessions: Session[];
 total: number;
 page: number;
 pageSize: number;
 filters: HistoryFilters;
 loading: boolean;
 error: string | null;
 setFilters: (filters: HistoryFilters) => void;
 setPage: (page: number) => void;
 refresh: () => Promise<void>;
 deleteSession: (id: string) => Promise<void>;
}

export type SortField = 'startTime' | 'duration';
export type SortOrder = 'asc' | 'desc';

export interface HistorySort {
 field: SortField;
 order: SortOrder;
}
