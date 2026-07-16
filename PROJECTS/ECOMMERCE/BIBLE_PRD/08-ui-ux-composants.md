## PRD 08 : UI/UX et Composants

### Problem Statement & Solution
L'interface doit Ãªtre moderne, responsive, avec des animations fluides. Nous utilisons Tailwind pour le styling, Framer Motion pour les animations, et Embla Carousel pour les carrousels. Les composants UI sont rÃ©utilisables et suivent un design system cohÃ©rent.

### User Stories
1. En tant qu'utilisateur, je vois un header avec logo, navigation, recherche et panier.
2. En tant qu'utilisateur, je vois un footer avec informations lÃ©gales.
3. En tant qu'utilisateur, j'ai des boutons, inputs, cards, modales cohÃ©rents.
4. En tant qu'utilisateur, les transitions entre pages sont douces (fade/slide).
5. En tant qu'utilisateur, les carrousels de produits sont fluides et automatiques.
6. En tant qu'utilisateur, les messages de succÃ¨s/erreur sont affichÃ©s via des toasts (sonneries).
7. En tant qu'utilisateur, le site est responsive (mobile-first).
8. En tant qu'utilisateur, les images sont optimisÃ©es (lazy loading).
9. En tant que dÃ©veloppeur, les composants sont documentÃ©s (Storybook optionnel mais pas requis).
10. En tant que dÃ©veloppeur, les composants sont typÃ©s avec TypeScript.

### Implementation Decisions (Deep Modules, HashRouter, Zod, React Query)
- Shared UI : Composants comme Button, Input, Card, Modal, Toast, Spinner dans @shared/ui.
- Hooks : useMediaQuery pour la dÃ©tection mobile/desktop.
- Deep Module : Le composant ProductCarousel utilise Embla et expose une API simple (slides, autoplay).
- Framer Motion : UtilisÃ© pour les animations de page et les transitions.
- Tailwind : Configuration personnalisÃ©e (couleurs, typographie).
- HashRouter : Le routing est compatible avec les animations.

### Testing Decisions
- Tester le rendu des composants UI dans diffÃ©rents Ã©tats (hover, focus, disabled).
- Tester la responsivitÃ© avec des tests de viewport.
- Tester les animations (visuelles, pas de tests automatisÃ©s complexes).

### Out of Scope
- Storybook ou documentation interactive.
- ThÃ¨me sombre pour la V1.
- AccessibilitÃ© avancÃ©e (ARIA) â nous ferons un minimum.