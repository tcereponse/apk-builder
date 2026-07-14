import { Settings, TimerPhase, SoundConfig, AppPreferences } from '../../shared/types';

export interface SettingsContextType {
 settings: Settings;
 preferences: AppPreferences;
 updateSettings: (newSettings: Partial<Settings>) => void;
 updatePreferences: (newPrefs: Partial<AppPreferences>) => void;
 resetSettings: () => void;
 saveSettings: () => Promise<void>;
 loading: boolean;
 error: string | null;
}

export interface DurationSettingsProps {
 workDuration: number;
 shortBreakDuration: number;
 longBreakDuration: number;
 longBreakInterval: number;
 onUpdate: (updates: Partial<Settings>) => void;
 disabled?: boolean;
}

export interface SoundSettingsProps {
 soundEnabled: boolean;
 soundUrl?: string;
 onUpdate: (updates: Partial<Settings>) => void;
 testSound: () => void;
 availableSounds: { label: string; url: string }[];
}

export interface SettingsHookReturn {
 settings: Settings;
 preferences: AppPreferences;
 updateSettings: (updates: Partial<Settings>) => void;
 updatePreferences: (updates: Partial<AppPreferences>) => void;
 resetSettings: () => void;
 saveSettings: () => Promise<void>;
 loading: boolean;
 error: string | null;
}

export interface ValidationError {
 field: keyof Settings;
 message: string;
}

export type SettingsTab = 'general' | 'durations' | 'sounds' | 'notifications' | 'appearance';

export interface SettingsTabConfig {
 id: SettingsTab;
 label: string;
 icon: string;
 component: React.ReactNode;
}
