import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
plugins: [react()],
test: {
globals: true,
environment: 'jsdom',
setupFiles: ['./src/tests/setup.ts'],
include: ['src//*.{test,spec}.{ts,tsx}'],
coverage: {
provider: 'v8',
reporter: ['text', 'json', 'html'],
exclude: [
'node_modules/',
'src/tests/',
'src//.d.ts',
'src/**/.schema.ts',
'src/**/index.ts',
'src/app/main.tsx',
'src/vite-env.d.ts',
],
},
},
resolve: {
alias: {
'@': path.resolve(__dirname, './src'),
'@app': path.resolve(__dirname, './src/app'),
'@features': path.resolve(__dirname, './src/features'),
'@shared': path.resolve(__dirname, './src/shared'),
},
},
});