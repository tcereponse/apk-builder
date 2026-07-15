# PomodoroPro

Timer Pomodoro avec cycles travail/pause paramétrables, statistiques de productivité, sons de notification et historique des sessions.

## 🚀 Démarrage rapide

```bash
# Installation
npm install

# Développement
npm run dev

# Build production
npm run build

# Tests
npm test

# Vérification complète (typecheck + lint + format + test)
npm run verify
```

## 📋 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Build production (tsc + vite build) |
| `npm run preview` | Preview du build production |
| `npm test` | Tests unitaires (Vitest) |
| `npm run test:coverage` | Tests avec coverage |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint avec auto-fix |
| `npm run format` | Prettier (write) |
| `npm run typecheck` | Vérification TypeScript |
| `npm run verify` | Vérification complète (CI) |

## 🏗️ Architecture

```
src/
├── app/              # App shell, providers, routing
├── features/         # Features autonomes (auth, tasks, etc.)
│   └── {feature}/
│       ├── api/      # Repository pattern
│       ├── components/# Composants de la feature
│       ├── hooks/    # Hooks (TanStack Query)
│       └── types.ts  # Types + Zod schemas
├── shared/           # Code partagé
│   ├── ui/           # Design system
│   ├── lib/          # Utils (cn, formatters)
│   └── api/          # Client HTTP
└── main.tsx          # Entry point
```

## 🧪 Tests

- **Vitest** + **React Testing Library** pour les tests unitaires
- Coverage minimum: 80%
- Tests dans `src/**/*.test.tsx`

```bash
npm test           # Watch mode
npm run test:coverage  # Coverage report
```

## 🐳 Docker

```bash
# Build
docker-compose up --build

# Dev
docker-compose up dev
```

## 📦 Déploiement

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --build
```

## 🔧 Configuration

Copier `.env.example` vers `.env` et configurer les variables.

## 📝 Licence

MIT

---

Généré par **React Forge** — Gold Grade Industrial
