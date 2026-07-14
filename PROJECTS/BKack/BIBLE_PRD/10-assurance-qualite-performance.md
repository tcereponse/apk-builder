# ASSURANCE QUALITÉ & PERFORMANCE — BKACK

## 🎯 Objectifs de Performance

| Métrique | Cible | Outil de Mesure |
|----------|-------|-----------------|
| **Largest Contentful Paint (LCP)** | ≤ 2.5s | Lighthouse |
| **First Input Delay (FID)** | ≤ 100ms | Lighthouse |
| **Cumulative Layout Shift (CLS)** | ≤ 0.1 | Lighthouse |
| **Time to Interactive (TTI)** | ≤ 3.8s | Lighthouse |
| **Bundle Size (gzipped)** | ≤ 150KB | vite-bundle-visualizer |
| **FPS en jeu** | ≥ 60 fps | requestAnimationFrame |
| **First Contentful Paint (FCP)** | ≤ 1.8s | Lighthouse |
| **Speed Index** | ≤ 3.4s | Lighthouse |

---

## ⚡ Optimisations Vite

### Configuration
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['lucide-react', 'clsx', 'tailwind-merge']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
});
📦 Bundle Analysis
Plugin de Visualisation
npm install --save-dev rollup-plugin-visualizer
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true
    })
  ]
});
🧪 Lighthouse CI
Configuration
// .lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["http://localhost:5173"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.9}],
        "categories:accessibility": ["error