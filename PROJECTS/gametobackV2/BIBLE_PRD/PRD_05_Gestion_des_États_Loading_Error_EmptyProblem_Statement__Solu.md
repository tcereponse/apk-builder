Solution : Implémenter des composants de chargement (skeletons) et de gestion d'erreur (toasts ou écrans d'erreur) réutilisables, intégrés aux hooks React Query. Utiliser un système de fallback dans les composants de carrousel pour afficher un message "Aucun jeu" ou "Erreur de chargement".
User StoriesEn tant qu'utilisateur, je veux voir des squelettes (skeleton) lors du chargement initial, afin de savoir que les données arrivent et éviter un écran blanc.

En tant qu'utilisateur, je veux qu'un message d'erreur clair soit affiché si l'API ne répond pas, avec une option de réessayer, afin de pouvoir agir.

En tant qu'utilisateur, je veux qu'un message "Aucun jeu trouvé" s'affiche si les filtres ne correspondent à rien, afin de comprendre que le résultat est vide.

En tant qu'utilisateur, je veux que les erreurs réseau (timeout, 5xx) soient distinguées des erreurs de validation (4xx), afin de savoir si le problème vient du serveur ou de ma requête.

En tant que développeur, je veux une stratégie de fallback centralisée via React Query (onError) et un composant <ErrorBoundary> pour les erreurs de rendu, afin de garantir la robustesse.

Implementation DecisionsSkeletons : Composant GameCardSkeleton dans src/shared/components/ui/Skeleton ; utiliser des classes Tailwind animées (animate-pulse) avec des blocs de couleurs grises.

Messages d'erreur : Composant ErrorMessage dans shared/components/ui/Error ; peut être utilisé en tant que fallback dans le carrousel ou dans un toast global.

Toasts : Utiliser une librairie légère (ex: sonner ou react-hot-toast) pour les erreurs non bloquantes.

React Query : Configurer un QueryClient avec defaultOptions pour gérer les erreurs globalement (afficher un toast). Mais chaque composant peut aussi gérer son état d'erreur localement.

Error Boundary : Ajouter un ErrorBoundary (de react-error-boundary) autour des sections critiques pour capturer les erreurs de rendu et afficher une UI de repli.

État vide : Vérifier data.length === 0 dans les composants et afficher un composant EmptyState.

Testing DecisionsTester l'affichage du skeleton pendant le chargement (simuler un délai avec jest.useFakeTimers ou via React Query).

Tester que l'erreur est affichée lorsque le hook renvoie error ; simuler une erreur réseau dans le service.

Tester que l'état vide est rendu quand data est un tableau vide.

Out of ScopeGestion des erreurs de validation de formulaire (voir PRD filtres).

Journalisation des erreurs côté serveur (pas de backend).