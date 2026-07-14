Assurance Qualité & Performance — GAMER
Performance Objectives
Lighthouse Targets
Métrique	Score Minimum	Objectif
Performance	90	95
Accessibility	95	100
Best Practices	90	95
SEO	90	100
Progressive Web App	80	95
Core Web Vitals
Métrique	Seuil	Objectif
FCP	< 1.5s	< 1.0s
LCP	< 2.5s	< 1.5s
CLS	< 0.1	< 0.05
TTI	< 3.5s	< 2.0s
Speed Index	< 3.0s	< 2.0s
Bundle Optimization
Bundle Analysis
// package.json (scripts additionnels)
{
  "scripts": {
    "build": "vite build",
    "build:analyze": "vite build --mode analyze",
    "preview": "vite preview"
  }
}
Optimisation des Chunks
// vite.config.ts (optimisations)
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'clsx', 'tailwind-merge'],
          'utils-vendor': ['zod']
        }
      }
    },
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    cssMinify: true,
    chunkSizeWarningLimit: 1000
  }
})
Optimisation des Images
// src/shared/components/OptimizedImage.tsx
import { useState, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height,