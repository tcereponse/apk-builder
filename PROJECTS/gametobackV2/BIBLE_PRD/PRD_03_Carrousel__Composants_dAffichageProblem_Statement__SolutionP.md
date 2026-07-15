Solution : Utiliser Embla Carousel pour créer des carrousels horizontaux par catégorie (ex: "Nouveautés", "Tendances", "Années 90"). Chaque carte affiche une image de fond (cover/logo), le nom, la date de sortie, les plateformes et un descriptif court. Le tout est responsive, avec des animations subtiles (Framer Motion) et des interactions tactiles.
User StoriesEn tant qu'utilisateur, je veux faire défiler horizontalement les jeux d'un carrousel en faisant glisser ou en cliquant sur les flèches, afin de naviguer confortablement.

En tant qu'utilisateur, je veux que les carrousels s'adaptent à la taille de mon écran (une, deux ou trois cartes visibles), afin d'optimiser l'affichage mobile-first.

En tant qu'utilisateur, je veux que chaque carte de jeu soit complète : image de fond, nom, date, plateformes (icônes), et descriptif abrégé (tronqué si trop long), afin de tout voir en un coup d'œil.

En tant qu'utilisateur, je veux que l'image de fond soit prioritaire et que le texte soit lisible par-dessus (avec un overlay sombre), afin de préserver la qualité visuelle.

En tant qu'utilisateur, je veux que les cartes aient un effet glassmorphism au survol (ou au focus) pour renforcer le premium, afin d'améliorer l'expérience interactive.

Implementation DecisionsDeep Module : Composant Carousel dans src/features/games/components/Carousel.tsx avec une interface publique recevant games: Game[], title: string, options? (autoplay, slidesPerView). En interne, il gère l'initialisation d'Embla, les plugins (autoplay), la gestion des événements de scroll et le rendu des cartes via un composant GameCard.

Composant GameCard : dans src/features/games/components/GameCard.tsx ; utilise useGameCard hook (encapsulant la logique de formatage des dates, plateformes). Affiche l'image avec object-fit: cover, overlay semi-transparent, texte superposé.

Responsive : via Tailwind et les options d'Embla (breakpoints). Utiliser slidesToScroll variable.

Animations : Framer Motion pour l'apparition des cartes au scroll, et pour le survol (scale, shadow).

Performance : Utiliser React.memo sur GameCard si nécessaire ; images optimisées via loading="lazy".

Structure : Les carrousels sont organisés par sections (ex: GamesSection qui utilise useGames pour récupérer les données et les passer au Carousel).

Testing DecisionsTester le rendu du Carousel avec des données mockées ; vérifier que le nombre d'éléments affichés correspond et que la navigation (clic sur flèche) déclenche un défilement.

Tester le GameCard : affichage correct des informations, troncature du descriptif, overlay.

Utiliser user-event pour simuler le glisser-déposer (si possible) ou le clic sur les flèches.

Out of ScopeGestion de la vidéo d'arrière-plan.

Animation 3D.

Mode "plein écran" pour le carrousel.