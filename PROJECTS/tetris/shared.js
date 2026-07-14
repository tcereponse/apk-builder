(Utils + Services + Constants): ~8KB gzip

Total: < 80KB gzip

Performance Optimizations (React)React.memo sur tous les composants de rendu (Board, Cell, ScoreBoard, NextPiece)

useCallback pour toutes les actions passées aux enfants (évite les re-rendus)

useMemo pour les calculs coûteux (position ghost, vérification de lignes)

useReducer au lieu de useState pour les actions complexes (game logic)

Suspense + lazy pour le code splitting automatique

Virtualization: Pas nécessaire (grille 10x20 uniquement)

DevTools: Profiler React pour identifier les re-rendus inutiles

Rendering Optimizations (Canvas vs DOM)Décision: DOM avec Tailwind (pas de Canvas) pour plusieurs raisons:
Meilleure accessibilité (texte et rôles ARIA)

Facilité d'animation avec Tailwind (transition, transform)

Pas de gestion de contexte Canvas (simplification)

Performances suffisantes (10x20 = 200 cellules, re-rendu uniquement sur changement)

Optimisation DOM:
Chaque cellule est un div avec background-color + border

La grille est une grid CSS avec 10 colonnes

Les cellules vides ne sont pas rendues (grid avec grid-template-columns: repeat(10, 1fr))

Accessibility (WCAG 2.1 AA)Checklist:
Contrast: Vérifié avec outil (contraste > 4.5:1 pour tous les textes)

Focus: Outline visible sur tous les boutons et éléments interactifs

ARIA:
role="grid" sur le board

role="button" sur les contrôles

aria-label sur tous les boutons (ex: "Déplacer à gauche")

aria-live="polite" sur le score


Keyboard Navigation: Tous les contrôles accessibles au clavier (même sur mobile)


Screen Reader: Les annonces de changement d'état (pause, game over) via aria-live

Game Loop Performance (60fps)requestAnimationFrame avec delta-time

Calcul du delta pour respecter l'intervalle de chute

Pas de setInterval (imprécis, ne respecte pas le refresh rate)

Pause = arrêt de la boucle (pas de calcul inutile)

Memory ManagementPas de fuites mémoire: Cleanup des event listeners et timers dans useEffect

Pas de références circulaires: Éviter les closures qui capturent des objets lourds

Garbage Collection: Les pièces et grid sont recréées à chaque reset (pas de mutation)

Testing Strategy (Jest + React Testing Library)1. Unit Tests (Game Engine):
game-engine.test.ts: Toutes les fonctions pures du moteur (100% coverage)

Utiliser des fixtures de grilles pour les scénarios complexes

2. Integration Tests (Hooks + Contexts):
useGame.test.ts: Simuler des actions utilisateur (keydown, click)

ScoreContext.test.ts: Vérifier la persistance des high scores

SettingsContext.test.ts: Validation des settings avec Zod

3. E2E Tests (Playwright - Optionnel):
Scénario complet: Menu → Partie → Game Over → High Score

Test tactile: Simuler des événements touch

Test clavier: Simuler des keydown

4. Performance Tests:
Lighthouse CI en CI/CD

Bundle size monitoring avec bundlesize ou size-limit

CI/CD Pipeline (GitHub Actions)Lint: ESLint + Prettier

Type Check: tsc --noEmit

Unit Tests: npm run test:unit

Build: npm run build

Bundle Analysis: npm run analyze (vite-bundle-visualizer)

Lighthouse CI: Score sur build de preview

Monitoring (V1)Aucun tracking externe (privacy-first)

Logs: Uniquement en développement

Performance: Mesurée manuellement avec Lighthouse

Erreurs: Console + ErrorBoundary UI