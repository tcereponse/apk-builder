# ARCHITECTURE TECHNIQUE — JACK

## 1. Stack Validée
| **Technologie** | **Version** | **Rôle** |
|-----------------|-------------|----------|
| React | 18.x | UI déclarative |
| Vite | 5.x | Build tool ultra-rapide |
| TypeScript | 5.x | Typage statique |
| Tailwind CSS | 3.x | Styling utilitaire |
| React Router DOM | 6.x | Routing (HashRouter) |
| Lucide React | 0.x | Icônes |
| Zod | 3.x | Validation des données |

## 2. Structure de Projet (modèle GAME2)

jack/
├── index.html # id="root", script src="./src/app/main.tsx"
├── vite.config.ts # base:'./', react(), alias @, @app, @features, @shared
├── tsconfig.json # include:["src","vite-env.d.ts"], paths complets
├── package.json # "type":"module", "build":"vite build" UNIQUEMENT
├── postcss.config.js # export default (JAMAIS module.exports)
├── tailwind.config.ts # content:["./index.html","./src/**/*.{ts,tsx}"]
├── .npmrc # legacy-peer-deps=true
├── launcher.bat # npm install --legacy-peer-deps && npm run dev
├── FIX_AND_BUILD.bat # nettoyage cache + npm run build
├── vite-env.d.ts # /// <reference types="vite/client" />
└── src/
├── index.css # @tailwind base; @tailwind components; @tailwind utilities;
├── app/
│ ├── main.tsx # ReactDOM.createRoot (JAMAIS src/main.tsx)
│ ├── App.tsx # <HashRouter> + Providers (JAMAIS BrowserRouter)
│ ├── router.tsx # <Routes> avec toutes les routes
│ ├── contexts/ # Un Context par domaine
│ └── layouts/ # Layouts partagés
├── features/
│ ├── game/ # Feature principale
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── pages/
│ │ └── index.ts
│ ├── settings/
│ └── scores/
└── shared/
├── components/ # Composants réutilisables (Button, Card, etc.)
├── hooks/ # Hooks génériques (useLocalStorage, useMediaQuery)
├── lib/ # Utilitaires (maths, physics, etc.)
├── services/ # API, IndexedDB, Cockpit
├── types/ # Types partagés
├── constants/ # Constantes (niveaux, couleurs, etc.)
└── utils/ # Helpers

text

## 3. Alias Vite (obligatoires)
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    '@app': path.resolve(__dirname, './src/app'),
    '@features': path.resolve(__dirname, './src/features'),
    '@shared': path.resolve(__dirname, './src/shared')
  }
}
4. Build & Déploiement

Commande build : vite build (JAMAIS tsc && vite build)

Sortie : dist/

APK : Généré via PWA + outil tiers (Bubblewrap ou PWA2APK)

text

---

**