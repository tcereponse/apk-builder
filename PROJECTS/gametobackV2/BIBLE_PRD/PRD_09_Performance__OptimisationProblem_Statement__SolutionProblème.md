Solution : Mettre en œuvre plusieurs stratégies : code splitting, lazy loading, optimisation des images, memoization, virtualisation (si nécessaire), et utilisation du cache React Query pour limiter les appels API. Le build Vite produit des bundles optimisés.
User StoriesEn tant qu'utilisateur, je veux que la page s'affiche en moins de 2 secondes sur une connexion 4G, afin de ne pas attendre.

En tant qu'utilisateur, je veux que le défilement des carrousels reste fluide même avec de nombreuses cartes, afin d'éviter les saccades.

En tant qu'utilisateur, je veux que les images de fond ne bloquent pas le chargement du texte, afin de voir les informations rapidement.

En tant que développeur, je veux que le bundle final soit léger (< 200 kB gzipped), afin d'optimiser le temps de téléchargement.

Implementation DecisionsCode splitting : Utiliser React.lazy pour les pages (Home, Favorites, GameDetail) et éventuellement pour le composant Carousel. Le routeur gère le lazy loading.

Optimisation des images : Utiliser les paramètres de l'API RAWG pour redimensionner les images (ex: ?width=400&height=600). Ajouter loading="lazy" et decoding="async".

Memoization : Utiliser React.memo sur les composants lourds (GameCard, Carousel) si nécessaire. Utiliser useCallback et useMemo pour éviter les re-rendus inutiles.

Virtualisation : Pas nécessaire pour les carrousels (nombre limité par page), mais pourrait être envisagé pour une liste infinie de favoris (à suivre).

Bundle analysis : Utiliser vite-bundle-analyzer pour vérifier la taille des bundles et optimiser les imports.

Tree shaking : Vite le fait automatiquement ; importer les composants Lucide de manière nommée.

Cache : Configurer les headers de cache via Vite (ou via le serveur) pour les assets statiques.

React Query : Mettre en place un cache persistant avec persistQueryClient (optionnel) pour réduire les chargements.

Testing DecisionsTester les performances avec Lighthouse (ou équivalent) en mode développement et production.

Tester que le lazy loading fonctionne correctement (les bundles sont chargés à la demande).

Surveiller les temps de chargement et les métriques Core Web Vitals.

Out of ScopeMise en place d'un Service Worker (PWA) – pas prévu pour cette phase.

CDN externe pour les images.