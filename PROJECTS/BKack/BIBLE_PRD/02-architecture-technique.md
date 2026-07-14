# ARCHITECTURE TECHNIQUE — BKACK

## 🏗️ Stack Technologique (Approuvée Diamond Forge)

### Core Stack
| Technologie | Version | Rôle |
|-------------|---------|------|
| **React** | 18.3.1 | UI Library |
| **TypeScript** | 5.6.2 | Typage statique |
| **Vite** | 5.4.8 | Bundler & Dev Server |
| **Tailwind CSS** | 3.4.11 | Styling utilitaire |
| **Zod** | 3.23.8 | Validation des données |
| **Lucide React** | 0.462.0 | Icones |

### Structure Source (INVIOLABLE)

bkack/
├── index.html # id="root", <script src="./src/app/main.tsx">
├── vite.config.ts # base:'./', react(), alias @ @app @features @shared
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
│ ├── game/ # Logique de jeu complète
│ │ ├── components/ # GameCanvas, Paddle, Ball, Brick, UI overlay
│ │ ├── hooks/ # useGameLoop, usePhysics, useInput, useScore
│ │ ├── pages/ # GamePage, MenuPage, GameOverPage
│ │ └── index.ts # Export public
│ ├── profile/ # Gestion du profil joueur
│ │ ├── components/ # ProfileCard, ScoreHistory
│ │ ├── hooks/ # useProfile, useStats
│ │ ├── pages/ # ProfilePage
│ │ └── index.ts
│ └── settings/ # Paramètres utilisateur
│ ├── components/ # SettingsPanel, Toggle, Slider
│ ├── hooks/ # useSettings
│ ├── pages/ # SettingsPage
│ └── index.ts
├── shared/
│ ├── components/ # Button, Card, Modal, Spinner, ErrorBoundary
│ ├── hooks/ # useLocalStorage, useDebounce, useMediaQuery
│ ├── lib/ # PhysicsEngine, CollisionDetector, GameLoop
│ ├── services/ # StorageService, AudioService, HapticService
│ ├── types/ # GameTypes, UserTypes, SettingsTypes
│ ├── constants/ # GameConstants, Colors, Breakpoints
│ └── utils/ # math, array, string, validation helpers

text

### ⚙️ Vite Alias Configuration
// vite.config.ts
alias: {
  '@': '/src',
  '@app': '/src/app',
  '@features': '/src/features',
  '@shared': '/src/shared'
}
🔧 Build Process (UNIQUE)

INTERDICTION FORMELLE : tsc && vite build
COMMANDE UNIQUE AUTORISÉE : vite build

📦 Dépendances Principales
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "zod": "^3.23.8",
  "lucide-react": "^0.462.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.2"
}
🧪 Qualité & Performance

Bundling : Vite avec Tree Shaking

Minification : esbuild (par défaut)

Code Splitting : Dynamique par feature

Lazy Loading : Pages chargées à la demande

text

---

## 📋 BIBLE_