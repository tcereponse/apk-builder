x
import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Settings, settingsSchema } from '@shared/types/game';
import { StorageService } from '@shared/services/StorageService';

interface SettingsContextType {
settings: Settings;
actions: {
updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
toggleSound: () => Promise<void>;
toggleVibration: () => Promise<void>;
toggleTheme: () => Promise<void>;
};
}

const SettingsContext = createContext<SettingsContextType | null>(null);
const storage = new StorageService();

const defaultSettings: Settings = {
soundEnabled: true,
sfxEnabled: true,
vibrationEnabled: false,
theme: 'light',
difficulty: 'normal'
};

export function SettingsProvider({ children }: { children: ReactNode }) {
const [settings, setSettings] = useState<Settings>(defaultSettings);
const [isLoaded, setIsLoaded] = useState(false);

const loadSettings = useCallback(async () => {
try {
await storage.init();
const saved = await storage.getSettings();
if (saved) {
const parsed = settingsSchema.parse(saved);
setSettings(parsed);
}
} catch (error) {
console.error('Failed to load settings:', error);
} finally {
setIsLoaded(true);
}
}, []);

useEffect(() => {
loadSettings();
}, [loadSettings]);

const updateSettings = useCallback(async (newSettings: Partial<Settings>) => {
try {
const updated = { ...settings, ...newSettings };
const parsed = settingsSchema.parse(updated);
setSettings(parsed);
await storage.init();
await storage.saveSettings(parsed);
} catch (error) {
console.error('Failed to update settings:', error);
}
}, [settings]);

const toggleSound = useCallback(async () => {
await updateSettings({ soundEnabled: !settings.soundEnabled });
}, [settings, updateSettings]);

const toggleVibration = useCallback(async () => {
await updateSettings({ vibrationEnabled: !settings.vibrationEnabled });
}, [settings, updateSettings]);

const toggleTheme = useCallback(async () => {
const newTheme = settings.theme === 'light' ? 'dark' : 'light';
await updateSettings({ theme: newTheme });
document.documentElement.classList.toggle('dark', newTheme === 'dark');
}, [settings, updateSettings]);

useEffect(() => {
if (isLoaded) {
document.documentElement.classList.toggle('dark', settings.theme === 'dark');
}
}, [settings.theme, isLoaded]);

if (!isLoaded) {
return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
}

return (
<SettingsContext.Provider value={{
settings,
actions: { updateSettings, toggleSound, toggleVibration, toggleTheme }
}}>
{children}
</SettingsContext.Provider>
);
}

export function useSettings() {
const context = useContext(SettingsContext);
if (!context) {
throw new Error('useSettings must be used within SettingsProvider');
}
return context;
}