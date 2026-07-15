Solution : GAMETOBACKV2 est une application web/mobile unique qui agrège en temps réel les données de l'API RAWG (et flux IGDB/Twitch) pour présenter les jeux sous forme de carrousels horizontaux dynamiques, avec design Glassmorphism premium. Elle offre une expérience de navigation immersive, réactive et personnalisable (favoris), tout en garantissant une performance optimale sur mobile grâce à une architecture React/Vite/Tailwind, et un routage HashRouter compatible APK.
User StoriesEn tant qu'utilisateur, je veux accéder à l'application depuis mon navigateur ou mon appareil Android, afin de consulter le catalogue de jeux n'importe où.

En tant qu'utilisateur, je veux que l'interface soit sombre et premium (Glassmorphism, palette slate/zinc), afin de bénéficier d'un confort visuel et d'une identité moderne.

En tant qu'utilisateur, je veux voir les jeux organisés en carrousels horizontaux (par année, popularité, etc.), afin de parcourir visuellement une grande quantité de titres rapidement.

En tant qu'utilisateur, je veux que chaque carte affiche l'image, le nom, la date, les plateformes et un descriptif en français, afin d'avoir une vue d'ensemble complète sans clic supplémentaire.

En tant qu'utilisateur, je veux que les données soient chargées rapidement avec des indicateurs de chargement, afin de ne pas rester sur un écran vide.

En tant qu'utilisateur, je veux que l'application gère les erreurs réseau et affiche des messages clairs, afin de comprendre les problèmes éventuels.

En tant que développeur, je veux une architecture modulaire (features/) avec des modules profonds (Deep Modules) pour faciliter la maintenance et les évolutions.

Implementation DecisionsArchitecture : React 18 + Vite 5 + TypeScript 5 – monocouche front-end sans backend dédié.

Routage : HashRouter (React Router DOM v6) impératif pour la compatibilité APK Android.

Gestion d'état : React Query (TanStack) pour les données serveur (caching, revalidation) ; contexts React pour les préférences UI (thème, favoris).

Structure de dossiers : conforme au modèle GAME2 – src/app/ (main, App, router, layouts, contexts), src/features/ (dossier par fonctionnalité), src/shared/ (composants, hooks, services, types, utils, constants).

Aliases : @, @app, @features, @shared dans Vite et TypeScript.

Validation : Zod pour les schémas de réponse API et les props complexes.

UI : Tailwind CSS 3 avec plugin de glassmorphism personnalisé ; utilisation de clsx et tailwind-merge.

Animation : Framer Motion pour les transitions fluides.

Icônes : Lucide React.

Base de données locale : IndexedDB (via idb) pour les favoris.

Gestion des dates : date-fns.

Formulaires : react-hook-form + @hookform/resolvers (zod) pour les filtres.

Carrousel : Embla Carousel avec plugin autoplay.

Point d'entrée : index.html → <script type="module" src="./src/app/main.tsx"> ; main.tsx rend <App /> via ReactDOM.createRoot.

Testing DecisionsTests d'intégration : avec React Testing Library, cibler les comportements utilisateur (rendu des carrousels, gestion des chargements/erreurs, interactions de filtrage et favoris).

Tests de modules profonds : tester l'interface publique (hooks personnalisés) – ne jamais tester les détails internes.

Outils : Vitest (compatible Vite) pour l'exécution, avec @testing-library/react et @testing-library/user-event.

Out of ScopeAuthentification / comptes utilisateurs.

Backend personnalisé (API tierces uniquement).

Notifications push.

Partage social.

Mode hors ligne complet (hors favoris persistants).

Export CSV ou autre.