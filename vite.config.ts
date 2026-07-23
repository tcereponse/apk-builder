import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
 plugins: [react()],
 base: './',
 server: {
 port: 5173,
 },
 resolve: {
 alias: {
 '@': path.resolve(__dirname, './src'),
 '@app': path.resolve(__dirname, './src/app'),
 '@features': path.resolve(__dirname, './src/features'),
 '@shared': path.resolve(__dirname, './src/shared'),
 },
 },
 build: {
 outDir: 'dist',
 sourcemap: true,
 },
});