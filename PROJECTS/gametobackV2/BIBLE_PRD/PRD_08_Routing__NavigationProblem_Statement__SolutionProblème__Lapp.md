Solution : Implémenter un routeur React Router DOM v6 avec HashRouter. Définir les routes principales : / (accueil), /favorites (liste des favoris), /game/:id (détail d'un jeu). Utiliser une barre de navigation inférieure (mobile) ou latérale (desktop) avec des liens.
User StoriesEn tant qu'utilisateur, je veux accéder à la page d'accueil avec les carrousels principaux, afin de découvrir les jeux.

En tant qu'utilisateur, je veux naviguer vers ma liste de favoris via un onglet dédié, afin de consulter rapidement mes jeux préférés.

En tant qu'utilisateur, je veux cliquer sur une carte de jeu pour voir ses détails complets (synopsis, note, capture d'écran, etc.), afin d'en savoir plus.

En tant qu'utilisateur, je veux que la navigation soit fluide avec des transitions, afin d'améliorer l'expérience.

En tant que développeur, je veux utiliser HashRouter pour garantir le fonctionnement sur Android (APK), car BrowserRouter pose problème.

Implementation DecisionsRouteur : Dans src/app/App.tsx, envelopper l'application avec <HashRouter> (obligatoire). Utiliser <Routes> et <Route> pour définir les chemins.

Routes :
/ : HomePage (accueil)

/favorites : FavoritesPage

/game/:id : GameDetailPage

* : redirection vers / (ou 404).


Navigation : Composant BottomNav (pour mobile) et SideNav (pour desktop) dans src/app/layouts/ ; utiliser NavLink de React Router.

Lazy loading : Utiliser React.lazy pour charger les pages à la demande, avec un Suspense et un skeleton.

Transitions : Framer Motion avec AnimatePresence pour animer les changements de route.

Hash : L'URL sera du type /#/favorites (HashRouter).

Testing DecisionsTester la navigation avec MemoryRouter (de React Router) pour simuler les clics sur les liens et vérifier le rendu des pages.

Tester que la route /game/:id affiche bien les détails du jeu correspondant.

Vérifier que les paramètres d'URL (comme les filtres) persistent après navigation.

Out of ScopeGestion des paramètres d'URL avancés (query string) – on utilisera useSearchParams pour les filtres.

Authentification et routes privées.