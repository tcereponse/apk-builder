import { TimerPhase, NotificationPayload, SoundType, SoundConfig } from '../../shared/types';

export interface NotificationService {
 send: (payload: NotificationPayload) => void;
 requestPermission: () => Promise<NotificationPermission>;
 permission: NotificationPermission;
}

export interface SoundService {
 play: (type: SoundType) => void;
 stop: (type: SoundType) => void;
 preload: (configs: SoundConfig[]) => void;
 setVolume: (volume: number) => void;
}

export interface NotificationContextType {
 enabled: boolean;
 permission: NotificationPermission;
 sendNotification: (payload: NotificationPayload) => void;
 requestPermission: () => Promise<NotificationPermission>;
}

export interface SoundContextType {
 enabled: boolean;
 play: (type: SoundType) => void;
 stop: (type: SoundType) => void;
 setVolume: (volume: number) => void;
 volume: number;
}

export interface NotificationHookReturn {
 send: (payload: NotificationPayload) => void;
 permission: NotificationPermission;
 requestPermission: () => Promise<NotificationPermission>;
 isSupported: boolean;
}

export interface SoundHookReturn {
 play: (type: SoundType) => void;
 stop: (type: SoundType) => void;
 setVolume: (volume: number) => void;
 volume: number;
 isPlaying: boolean;
 isLoading: boolean;
}

export type NotificationEvent = 
 | 'PHASE_CHANGE'
 | 'SESSION_COMPLETE'
 | 'BREAK_OVER'
 | 'WORK_OVER';

export interface NotificationConfig {
 event: NotificationEvent;
 enabled: boolean;
 sound?: SoundType;
 message: string;
}
