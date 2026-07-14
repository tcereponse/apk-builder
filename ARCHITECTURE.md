# Architecture — PomodoroPro

## Vue d'ensemble

Timer Pomodoro avec cycles travail/pause paramétrables, statistiques de productivité, sons de notification et historique des sessions.

## Stack technique

- **React 18** — UI library
- **TypeScript 5** — Typage statique (strict mode)
- **Vite 5** — Build tool & dev server
- **Tailwind CSS 3** — Styling utility-first
- **React Router 6** — Routing client-side
- **TanStack Query 5** — Cache serveur & data fetching
- **Zustand 4** — State management global
- **Zod 3** — Validation runtime
- **Vitest** — Tests unitaires
- **React Testing Library** — Tests de composants

## Principes architecturaux

### 1. Feature-based architecture
Chaque feature est autonome dans `src/features/{feature}/` avec:
- `api/` — Repository pattern (couche données)
- `components/` — Composants UI de la feature
- `hooks/` — Hooks React (TanStack Query)
- `types.ts` — Types TypeScript + schémas Zod

### 2. Design System partagé
Les composants UI réutilisables sont dans `src/shared/ui/`:
- Button, Input, Card, Badge, Skeleton
- EmptyState, ErrorState, AsyncBoundary

### 3. Repository pattern
La couche données utilise le pattern Repository:
```typescript
// features/tasks/api/tasks-repository.ts
export class TasksRepository {
  constructor(private client: ApiClient) {}
  async list(): Promise<Task[]> { ... }
  async create(input: CreateTaskInput): Promise<Task> { ... }
}
```

### 4. TanStack Query
Les hooks utilisent TanStack Query pour le cache:
```typescript
// features/tasks/hooks/use-tasks.ts
export function useTasks() {
  return useQuery({ queryKey: ['tasks'], queryFn: () => repo.list() });
}
```

### 5. États complets
Tous les composants gèrent 4 états:
- **Loading** — Skeleton
- **Error** — ErrorState avec retry
- **Empty** — EmptyState avec CTA
- **Success** — Contenu

## Décisions techniques (ADR)

### ADR-001: Vite + React (pas Next.js)
**Contexte**: Application SPA sans besoin SSR.
**Décision**: Vite + React pour la simplicité et la rapidité.
**Conséquences**: Pas de SEO server-side, mais build rapide et DX excellente.

### ADR-002: TanStack Query (pas Redux)
**Contexte**: Gestion du cache serveur.
**Décision**: TanStack Query pour le cache serveur, Zustand pour l'UI state.
**Conséquences**: Moins de boilerplate, cache automatique, invalidation intelligente.

### ADR-003: Zod (pas Yup)
**Contexte**: Validation runtime des données.
**Décision**: Zod pour l'inférence de types TypeScript.
**Conséquences**: Types et validation synchronisés, DX améliorée.

## Qualité code

- **TypeScript strict+** (noUncheckedIndexedAccess, exactOptionalPropertyTypes)
- **ESLint** avec règles TypeScript + React + a11y
- **Prettier** pour le formatage
- **Tests** avec coverage 80%+
- **CI/CD** via GitHub Actions

---

Généré par **React Forge** — Gold Grade Industrial
