Solution : Ajouter une barre de recherche et des filtres (dropdowns ou champs) qui modifient la requête API. Les paramètres sont gérés par React Query via une clé de requête dynamique. L'interface permet une recherche en temps réel (debounced) et des filtres persistants dans l'URL (via le router) pour partager les résultats.
User StoriesEn tant qu'utilisateur, je veux rechercher un jeu par son nom, afin de trouver rapidement un titre connu.

En tant qu'utilisateur, je veux filtrer les jeux par année de sortie (range ou sélection), afin de voir les titres d'une période précise.

En tant qu'utilisateur, je veux filtrer par plateforme (PlayStation, Xbox, PC, etc.), afin de ne voir que les jeux compatibles.

En tant qu'utilisateur, je veux que les filtres soient faciles à réinitialiser, afin de revenir à la vue complète.

En tant qu'utilisateur, je veux que les paramètres de recherche soient reflétés dans l'URL (HashRouter), afin de partager ou bookmarker une recherche précise.

Implementation DecisionsDeep Module : useGamesFilters hook dans src/features/games/hooks/useGamesFilters.ts qui gère l'état des filtres (via useSearchParams de React Router) et construit l'objet de paramètres pour l'API.

Composants : SearchBar, FilterDropdown dans src/features/games/components/. Utiliser react-hook-form avec validation Zod pour la recherche et les filtres.

Debounce : Utiliser useDebounce custom hook (ou lodash-es interdit, donc utiliser setTimeout/clearTimeout) pour retarder la requête de recherche.

Paramètres API : L'API RAWG accepte search, dates, platforms, genres. On utilisera ces paramètres directement. Les dates au format YYYY-MM-DD,YYYY-MM-DD.

Persistance dans l'URL : Utiliser useSearchParams pour lire/écrire les filtres. Ainsi, un refresh conserve les filtres et le partage est possible.

Validation : Zod pour valider que les dates sont cohérentes.

Testing DecisionsTester que la saisie dans la barre de recherche déclenche une nouvelle requête après le debounce.

Tester que les filtres changent l'URL et que le chargement des données est relancé avec les bons paramètres.

Tester le comportement du bouton "Réinitialiser".

Out of ScopeFiltrage avancé (genre, note, etc.) – se limiter aux paramètres de l'API RAWG.

Recherche en temps réel sur plusieurs champs simultanés.

Sauvegarde des filtres dans localStorage.