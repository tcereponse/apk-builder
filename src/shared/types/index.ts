export type TimerPhase = 'work' | 'shortBreak' | 'longBreak';

export interface TimerState {
 phase: TimerPhase;
 secondsRemaining: number;
 isRunning: boolean;
 cyclesCompleted: number;
 workDuration: number;
 shortBreakDuration: number;
 longBreakDuration: number;
 longBreakInterval: number;
 currentCycle: number;
}

export interface Session {
 id: string;
 startTime: Date;
 endTime: Date;
 duration: number;
 phase: TimerPhase;
 isCompleted: boolean;
}

export interface Settings {
 workDuration: number;
 shortBreakDuration: number;
 longBreakDuration: number;
 longBreakInterval: number;
 soundEnabled: boolean;
 soundUrl?: string;
 notificationsEnabled: boolean;
 autoStartBreaks: boolean;
 autoStartWork: boolean;
}

export interface Statistics {
 totalSessions: number;
 totalWorkTime: number;
 totalBreakTime: number;
 completedCycles: number;
 averageWorkDuration: number;
 sessionsByDay: Record<string, number>;
 productivityScore: number;
}

export interface DailyStats {
 date: string;
 sessions: number;
 workTime: number;
 breakTime: number;
 cycles: number;
}

export type FilterType = 'all' | 'work' | 'shortBreak' | 'longBreak';

export interface HistoryFilters {
 phase?: TimerPhase;
 startDate?: Date;
 endDate?: Date;
 minDuration?: number;
 maxDuration?: number;
}

export interface NotificationPayload {
 title: string;
 body: string;
 phase: TimerPhase;
 icon?: string;
}

export type SoundType = 'tick' | 'alarm' | 'phaseChange' | 'sessionComplete';

export interface SoundConfig {
 type: SoundType;
 url: string;
 volume: number;
 loop: boolean;
}

export interface TimerAction {
 type: 'START' | 'PAUSE' | 'RESET' | 'COMPLETE' | 'SKIP';
 payload?: Partial<TimerState>;
}

export type Theme = 'light' | 'dark' | 'system';

export interface AppPreferences {
 theme: Theme;
 language: string;
 compactMode: boolean;
}
