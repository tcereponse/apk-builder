@echo off
echo Nettoyage complet du projet...
rd /s /q node_modules 2>nul
rd /s /q .vite 2>nul
rd /s /q dist 2>nul
del /f /q package-lock.json 2>nul
echo Reinstallation des dependances...
call npm install --legacy-peer-deps
echo Build du projet...
call npm run build
echo Build termine !
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
base: './',
plugins: [react()],
resolve: {
alias: {
'@': path.resolve(__dirname, './src'),
'@app': path.resolve(__dirname, './src/app'),
'@features': path.resolve(__dirname, './src/features'),
'@shared': path.resolve(__dirname, './src/shared')
}
},
build: {
chunkSizeWarningLimit: 500,
sourcemap: false,
minify: 'esbuild',
rollupOptions: {
output: {
manualChunks: {
vendor: ['react', 'react-dom', 'react-router-dom']
}
}
}
}
});