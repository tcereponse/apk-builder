Architecture Technique — GAMER
Stack Technologique
Core Stack
text
React 18.3.1           → Interface utilisateur
Vite 5.4.0             → Build system / Dev server
5.5.3       → Typage statique
Tailwind CSS 3.4.1     → Styling utilitaire
Bibliothèques Complémentaires
{
  "react-router-dom": "6.26.0",
  "lucide-react": "0.414.0",
  "zod": "3.23.0",
  "clsx": "2.1.0",
  "tailwind-merge": "2.4.0",
  "@radix-ui/react-slot": "1.0.2"
}
Structure de Projet (Modèle GAME2)
GAMER/
├── index.html                    # id="root"
├── vite.config.ts                # base:'./', react(), alias @ @app @features @shared
├── tsconfig.json                 # include:["src","vite-env.d.ts"], paths: @/* @app/* @features/* @shared/*
├── package.json                  # "type":"module", "build":"vite build" (UNIQUEMENT)
├── postcss.config.js             # export default (JAMAIS module.exports)
├── tailwind.config.ts            # content:["./index.html","./src/**/*.{ts,tsx}"]
├── .npmrc                        # legacy-peer-deps=true
├── launcher.bat                  # npm install --legacy-peer-deps && npm run dev
├── FIX_AND_BUILD.bat             # nettoyage cache + npm run build
├── vite-env.d.ts                 # /// <reference types="vite/client" />
└── src/
    ├── index.css                 # @tailwind base; @tailwind components; @tailwind utilities;
    ├── app/
    │   ├── main.tsx              # ReactDOM.createRoot
    │   ├── App.tsx               # <HashRouter> + Providers
    │   ├── router.tsx            # <Routes> avec toutes les routes
    │   ├── contexts/             # Un Context par domaine
    │   └── layouts/              # Layouts partagés
    ├── features/
    │   └── [feature]/
    │       ├── components/
    │       ├── hooks/
    │       ├── pages/
    │       └── index.ts
    └── shared/
        ├── components/
        ├── hooks/
        ├── lib/
        ├── services/
        ├── types/
        ├── constants/
        └── utils/
Configuration Vite

vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', '@radix-ui/react-slot']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
Configuration

tsconfig.json

{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@app/*": ["./src/app/*"],
      "@features/*": ["./src/features/*"],
      "@shared/*": ["./src/shared/*"]
    }
  },
  "include": ["src", "vite-env.d.ts"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

tsconfig.node.json

{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
Configuration Tailwind

tailwind.config.ts

import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'monospace']
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 10px rgba(100, 116, 139, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(100, 116, 139, 0.8), 0 0 40px rgba(100, 116, 139, 0.4)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    }
  },
  plugins: []
} satisfies Config
Scripts npm

package.json (extrait scripts)

{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit"
  }
}
Structure des Alias
Alias	Chemin	Usage
@	./src	Imports racine
@app	./src/app	Application core (providers, router)
@features	./src/features	Fonctionnalités métier
@shared	./src/shared	Code partagé (components, hooks, utils)