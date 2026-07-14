import { Statistics, DailyStats, Session } from '../../shared/types';

export interface StatsContextType {
 stats: Statistics;
 dailyStats: DailyStats[];
 loading: boolean;
 error: string | null;
 refresh: () => Promise<void>;
}

export interface ChartDataPoint {
 label: string;
 work: number;
 breaks: number;
 sessions: number;
}

export interface ProductivityChartProps {
 data: ChartDataPoint[];
 period: 'day' | 'week' | 'month';
 height?: number;
}

export interface StatsSummaryProps {
 stats: Statistics;
 className?: string;
}

export interface StatsFilter {
 period: 'today' | 'week' | 'month' | 'year' | 'all';
 phase?: TimerPhase;
}

export interface StatCardData {
 label: string;
 value: string | number;
 icon?: React.ReactNode;
 change?: number;
 trend?: 'up' | 'down' | 'stable';
}

export interface StatsHookReturn {
 stats: Statistics | null;
 dailyStats: DailyStats[];
 chartData: ChartDataPoint[];
 loading: boolean;
 error: string | null;
 fetchStats: (filters?: StatsFilter) => Promise<void>;
}
