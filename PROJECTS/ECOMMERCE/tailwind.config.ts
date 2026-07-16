import type { Config } from 'tailwindcss';

export default {
 content: ['./index.html', './src/**/*.{ts,tsx}'],
 theme: {
 extend: {
 colors: {
 primary: {
 DEFAULT: '#1e293b',
 light: '#334155',
 dark: '#0f172a',
 },
 secondary: {
 DEFAULT: '#64748b',
 light: '#94a3b8',
 },
 accent: {
 DEFAULT: '#f59e0b',
 light: '#fbbf24',
 },
 },
 fontFamily: {
 sans: ['Inter', 'system-ui', 'sans-serif'],
 },
 },
 },
 plugins: [],
} satisfies Config;