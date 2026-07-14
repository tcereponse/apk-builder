, random.ts, collision.ts
Alias Vite (OBLIGATOIRES)typescript





// vite.config.ts
resolve: {
  alias: {
    '@': '/src',
    '@app': '/src/app',
    '@features': '/src/features',
    '@shared': '/src/shared'
  }
}
Deep Modules (Encapsulation Maximale)shared/lib/game-engine.ts - 100% pur TypeScript, zéro React. Encapsule la logique métier : grille, pièces, collisions, suppression de lignes, score.
Interface publique: createGame(), move(), rotate(), drop(), getState(), pause(), reset()

Pas d';
export de détails internes (matrices, positions internes)