Solution : Créer un service de données modulaire (Deep Module) qui expose des hooks React Query simples (useGames, useGameDetails, etc.) encapsulant la logique de fetch, la validation Zod, la construction des paramètres (langue, pagination, filtres) et la gestion des erreurs. Le cache est géré automatiquement par React Query avec des stratégies de stale-while-revalidate.
User StoriesEn tant qu'utilisateur, je veux que les jeux soient affichés avec leurs descriptions en français, afin de comprendre facilement le contenu.

En tant qu'utilisateur, je veux que les données soient mises en cache et revalidées en arrière-plan, afin de voir les informations les plus récentes sans attendre un chargement complet.

En tant qu'utilisateur, je veux que l'application récupère les jeux par lots (pagination), afin de ne pas surcharger le réseau et d'afficher rapidement les premiers résultats.

En tant que développeur, je veux un module de requête unique qui gère tous les appels API, afin de centraliser la configuration (URL de base, clé API, headers) et les intercepteurs d'erreur.

En tant que développeur, je veux que les réponses soient validées par Zod, afin de garantir l'intégrité des données avant leur utilisation dans l'UI.

Implementation DecisionsDeep Module : src/shared/services/api.ts expose une classe ou des fonctions (fetchGames, fetchGameById, etc.) avec une interface publique simple (paramètres typés) et une logique interne complexe (construction URL, gestion des headers, transformation des données).

React Query : Provider dans App.tsx ; création de hooks personnalisés (par feature) utilisant useQuery et useInfiniteQuery pour la pagination.

Paramètres de langue : Utiliser le paramètre ?language=fr de l'API RAWG (ou ?lang=fr pour IGDB) pour obtenir les descriptions en français. En cas de fallback, une traduction automatique (via un service tiers) n'est pas prévue – se fier à l'API.

Schémas Zod : Définir dans src/shared/types/game.schema.ts les schémas pour Game, GameListResponse, etc., et les réutiliser dans les hooks.

Gestion des erreurs : Intercepteur global dans le service pour transformer les erreurs réseau en erreurs métier (ex: ApiError avec code et message). React Query propage error au hook.

Cache : Configuration de staleTime: 5 minutes et cacheTime: 30 minutes pour les listes, staleTime: 10 minutes pour les détails.

Clé API : Stockée dans src/shared/constants/api.ts (exposée mais non sensible car publique). À terme, possibilité de la mettre dans .env.

Flux IGDB/Twitch : Non prioritaire en phase 1, mais prévoir une extension du service pour interroger ces sources en complément (via un adaptateur).

Testing DecisionsTester le service en simulant des réponses API (avec msw ou vitest + fetch-mock) pour vérifier la transformation des données et la gestion des erreurs.

Tester les hooks React Query avec @testing-library/react en enveloppant dans QueryClientProvider ; vérifier les états de chargement, succès et erreur.

Ne pas tester les appels réels à l'API externe ; se concentrer sur le comportement du module.

Out of ScopeImplémentation d'un cache local persistant (hors React Query) – le cache est uniquement en mémoire.

Mode hors ligne.

Utilisation d'axios (fetch natif est utilisé).