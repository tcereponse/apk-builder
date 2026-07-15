Solution : Utiliser IndexedDB (via idb) pour stocker les identifiants des jeux favoris. Fournir un bouton "Cœur" sur chaque carte pour ajouter/supprimer un favori. Afficher une page/liste des favoris, avec les données récupérées via l'API à partir des IDs stockés.
User StoriesEn tant qu'utilisateur, je veux ajouter un jeu à mes favoris en cliquant sur une icône de cœur, afin de le retrouver facilement.

En tant qu'utilisateur, je veux retirer un jeu de mes favoris en recliquant sur le cœur, afin de gérer ma liste.

En tant qu'utilisateur, je veux que mes favoris soient persistants entre les sessions (stockage local), afin de ne pas les perdre.

En tant qu'utilisateur, je veux consulter ma liste de favoris sur une page dédiée, afin de voir tous les jeux que j'ai aimés.

En tant qu'utilisateur, je veux que les favoris soient synchronisés avec l'état du cœur sur les cartes, afin d'avoir une interface cohérente.

Implementation DecisionsDeep Module : useFavorites hook dans src/features/favorites/hooks/useFavorites.ts qui expose favorites: number[], addFavorite(id), removeFavorite(id), toggleFavorite(id), isFavorite(id). En interne, utilise idb pour lire/écrire dans la table favorites.

Stockage : IndexedDB via idb – création d'une base GAMETOBACKV2 avec une table favorites contenant id (numérique).

Récupération des données : Sur la page des favoris, utiliser useGamesByIds (hook personnalisé) qui appelle fetchGamesByIds du service API (avec requête ?ids=1,2,3 ou plusieurs appels). Mettre en cache via React Query.

Bouton favori : Composant FavoriteButton dans src/features/favorites/components/ ; il utilise useFavorites et affiche un cœur plein/vide.

Mise à jour en temps réel : Le hook useFavorites notifie les composants via un état global (Context ou Recoil ?). On peut utiliser un Context FavoritesProvider qui fournit favorites et les actions.

Erreur : Si l'API ne répond pas, afficher les jeux favoris à partir du cache ou un message d'erreur.

Testing DecisionsTester l'ajout/suppression d'un favori via le bouton, et vérifier que la persistance est effective (lecture dans IndexedDB mocké).

Tester la page des favoris : affichage des jeux récupérés, message "Aucun favori" si liste vide.

Simuler une erreur API et vérifier le comportement.

Out of ScopeSynchronisation entre plusieurs appareils (pas de backend).

Export/import des favoris.