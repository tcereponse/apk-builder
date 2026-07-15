pour configurer les mocks (ex: fetch, IndexedDB).

Tests d'intégration : Par feature, tester les pages et les composants en les montant avec un QueryClientProvider et un MemoryRouter.

Tests de modules profonds : Tester les hooks personnalisés via renderHook de @testing-library/react.

Tests de service : Utiliser fetch-mock ou msw pour simuler les appels API.

Couverture : Configurer Vitest avec coverage (via @vitest/coverage-c8) et définir un seuil minimal (ex: 80% pour les lignes critiques).

CI : Intégration avec GitHub Actions ou autre pour exécuter les tests à chaque push.

Testing DecisionsScénarios de test :
Affichage de l'accueil et des carrousels.

Recherche avec filtre.

Ajout/suppression de favoris.

Navigation entre pages.

Gestion des erreurs (simulation d'échec API).

Réinitialisation des filtres.


Ne pas tester : Les composants purement stylistiques (sauf si comportement), les détails internes des hooks (ex: appels fetch précis), les implémentations de cache de React Query (on teste les effets visibles).

Tests de non-régression : S'assurer que les corrections de bugs sont accompagnées d'un test reproduisant le bug.

Out of ScopeTests de performance automatisés.

Tests de sécurité.

Intégration continue avec déploiement automatique (à définir ultérieurement).