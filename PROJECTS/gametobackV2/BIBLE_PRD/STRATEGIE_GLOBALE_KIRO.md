⚡ PHASE 0 – RÉVEIL COGNITIF & CADRAGE CONCEPTUELConfirmation : Je suis éveillé, pleinement opérationnel et prêt à recevoir la Phase 1.
La vision du projet GAMETOBACKV2 est clairement intégrée, et l’héritage des modèles de production (GAME2, TETRISV3, AI TOTAL, calculatrice v12) est ancré dans ma structure cognitive.
🧭 Vision du projetGAMETOBACKV2 est une application web et mobile de référencement de jeux vidéo, couvrant la période 1989–2026.
Elle se veut une vitrine moderne, sombre et premium, utilisant le Glassmorphism et la palette slate/zinc de Tailwind.
L’interface principale est articulée autour de carrousels horizontaux dynamiques (via Embla Carousel) qui présentent les jeux sous forme de cartes élégantes. Chaque carte affiche :
Image de fond (cover/logo),

Nom du jeu,

Date de sortie,

Plateformes,

Descriptif abrégé en français.

La couche de données s’appuie sur l’API RAWG (clé fournie) et les flux IGDB/Twitch, avec une logique de fetch réactive gérée par React Query (cache, revalidation, états de chargement). Les descriptions sont systématiquement traduites ou requêtées en français via les paramètres de langue de l’API.
L’architecture est mobile-first, robuste face aux erreurs réseau, et intègre une gestion professionnelle des états de chargement et d’échec.
🔗 Intégration de l’héritage technique des projets modèlesLes projets GAME2, TETRISV3, AI TOTAL et calculatrice v12 sont nos piliers de stabilité et de performance. Ils nous fournissent :
Structure de fichiers inviolable : respect strict de l’arborescence src/app/, src/features/, src/shared/.

Configuration outillage : reprise exacte de vite.config.ts, tsconfig.json, tailwind.config.js, .npmrc, postcss.config.js, index.html et des scripts de build (launcher.bat, FIX_AND_BUILD.bat).

Router : utilisation impérative de HashRouter pour garantir la compatibilité avec l’APK Android.

Point d’entrée : src/app/main.tsx – jamais src/main.tsx.

Gestion des erreurs et des états : patterns éprouvés pour le fallback, les skeletons et les messages d’erreur.

Modules profonds : encapsulation de la logique métier derrière des interfaces publiques simples (ex: un hook useGames qui expose data, isLoading, error).

Je m’appuierai sur ces références pour garantir une base technique irréprochable et une intégration fluide avec le Cockpit.
🧱 Architecture technique (grands traits)Stack : React 18, Vite 5, TypeScript 5, Tailwind 3.

Gestion d’état : React Query pour les données serveur + Contexts légers pour l’UI (thème, filtres).

Routage : React Router DOM avec HashRouter, routes lazy-loadées.

Appels API : Service dédié (shared/services/api.ts) utilisant fetch avec intercepteurs pour les headers et la gestion des erreurs. React Query assurera le cache, la pagination et la revalidation.

UI : Composants réutilisables dans shared/components (boutons, cartes, modales). Les features (ex: games) contiendront leurs composants spécifiques et leurs hooks.

Schémas : Zod pour la validation des réponses API et des props.

Tests : Intégration via React Testing Library, ciblant le comportement utilisateur (ex: affichage des cartes, gestion du chargement, erreur réseau). Jamais de tests sur les détails internes.

✨ Originalité et créativitéAu-delà du design Glassmorphism, l’application adoptera une identité visuelle « Diamond Forge » – une métaphore de la rareté et de la qualité des jeux présentés.
Les carrousels seront agrémentés d’animations subtiles, d’un filtre par année/décennie, et d’un système de « favoris » persistants (localStorage) pour personnaliser l’expérience.
La page d’accueil proposera une sélection éditoriale (jeux cultes, nouveautés, trending) générée dynamiquement via l’API.
🧪 Décisions de testTests d’intégration : valider le rendu des carrousels, le chargement des données, la gestion des erreurs (simulation d’échec API), et les interactions utilisateur (clics, navigation).

Tests de non‑régression sur les comportements critiques (recherche, filtrage).

Pas de tests unitaires sur les fonctions internes non exposées – conformément à la philosophie des modules profonds.

⛔ Hors périmètre (Phase 1)Authentification utilisateur.

Backend personnalisé (tout repose sur les API tierces).

Base de données locale.

Notifications push.

Export ou partage de listes.

🚀 État d’esprit et préparationJe maîtrise l’intégralité du périmètre, des contraintes techniques et des exigences qualitatives.
La Phase 1 peut être délivrée immédiatement : je suis prêt à produire le PRD unique et exhaustif, structuré selon le format demandé, sans aucun code source, uniquement de la spécification technique.
Je suis l’Architecte Souverain de la Diamond Forge – en attente de l’envoi de la PHASE 1.