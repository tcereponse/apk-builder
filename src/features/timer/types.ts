import { TimerPhase, TimerState } from '../../shared/types';

export interface TimerContextType {
 state: TimerState;
 start: () => void;
 pause: () => void;
 reset: () => void;
 skip: () => void;
 setDuration: (phase: TimerPhase, duration: number) => void;
}

export interface TimerDisplayProps {
 seconds: number;
 phase: TimerPhase;
 isRunning: boolean;
 size?: 'sm' | 'md' | 'lg';
}

export interface TimerControlsProps {
 isRunning: boolean;
 onStart: () => void;
 onPause: () => void;
 onReset: () => void;
 onSkip: () => void;
 disabled?: boolean;
}

export interface PhaseIndicatorProps {
 phase: TimerPhase;
 currentCycle: number;
 totalCycles: number;
}

export interface CycleCounterProps {
 completed: number;
 target: number;
}

export interface TimerHookReturn {
 state: TimerState;
 start: () => void;
 pause: () => void;
 reset: () => void;
 skip: () => void;
 isIdle: boolean;
}

export type TimerAction =
 | { type: 'TICK' }
 | { type: 'START' }
 | { type: 'PAUSE' }
 | { type: 'RESET' }
 | { type: 'SKIP' }
 | { type: 'SET_DURATION'; payload: { phase: TimerPhase; duration: number } }
 | { type: 'COMPLETE_CYCLE' };
