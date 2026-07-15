import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
type Theme = 'light' | 'dark' | 'diamond';
interface ThemeContextValue {
theme: Theme;
setTheme: (theme: Theme) => void;
}
const ThemeContext = createContext<ThemeContextValue | null>(null);
export function ThemeProvider({ children }: { children: ReactNode }) {
const [theme, setTheme] = useState<Theme>('diamond');
useEffect(() => {
document.documentElement.setAttribute('data-theme', theme);
}, [theme]);
return (
<ThemeContext.Provider value={{ theme, setTheme }}>
{children}
</ThemeContext.Provider>
);
}
export function useTheme() {
const ctx = useContext(ThemeContext);
if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
return ctx;
}