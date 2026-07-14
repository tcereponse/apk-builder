import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Settings, SettingsContextType } from '@shared/types/game.types';
import { localStorageService } from '@shared/services/localStorage.service';
const defaultSettings: Settings = {
initialSpeed: 'normal',
soundEnabled: false,
vibrationEnabled: false
};
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
export function SettingsProvider({ children }: { children: ReactNode }) {
const [settings, setSettings] = useState<Settings>(() =>
localStorageService.getSettings() || defaultSettings
);
const updateSettings = useCallback((newSettings: Partial<Settings>) => {
setSettings(prev => {
const updated = { ...prev, ...newSettings };
localStorageService.saveSettings(updated);
return updated;
});
}, []);
const resetSettings = useCallback(() => {
setSettings(defaultSettings);
localStorageService.saveSettings(defaultSettings);
}, []);
const value: SettingsContextType = {
settings,
updateSettings,
resetSettings
};
return (
<SettingsContext.Provider value={value}>
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