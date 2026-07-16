## PRD 09 : Performance et Optimisation

### Problem Statement & Solution
L'application doit se charger rapidement, surtout sur mobile. Nous optimisons le bundle, utilisons le lazy loading des routes, le caching avec React Query, et la compression des assets. Les Core Web Vitals doivent Ãªtre bons.

### User Stories
1. En tant qu'utilisateur, le chargement initial est infÃ©rieur Ã  2s (3G).
2. En tant qu'utilisateur, le temps d'interaction (clic, navigation) est fluide (<100ms).
3. En tant qu'utilisateur, les images se chargent en lazy loading.
4. En tant qu'utilisateur, les donnÃ©es sont mises en cache pour Ã©viter des appels rÃ©pÃ©tÃ©s.
5. En tant qu'utilisateur, la pagination est efficace (chargement infini).
6. En tant que dÃ©veloppeur, le bundle est dÃ©coupÃ© par routes (code splitting).
7. En tant que dÃ©veloppeur, les dÃ©pendances sont Ã  jour et minimisÃ©es.
8. En tant que dÃ©veloppeur, le build de production est optimisÃ© (minification, tree shaking).
9. En tant que dÃ©veloppeur, nous utilisons des mÃ©triques (Lighthouse) pour suivre les performances.
10. En tant qu'utilisateur, les animations sont optimisÃ©es (GPU).

### Implementation Decisions (Deep Modules, HashRouter, Zod, React Query)
- Lazy Loading : React.lazy pour les pages (catalog, cart, checkout, admin).
- React Query : Cache persistant avec staleTime et gcTime.
- Vite : Build avec rollupOptions pour le code splitting.
- Images : Utiliser srcset ou des composants d'image optimisÃ©e (pas de librairie externe).
- Analytics : Mesurer les performances avec web-vitals (optionnel).
- HashRouter : Pas d'impact nÃ©gatif sur les performances.

### Testing Decisions
- Tester les temps de chargement avec Lighthouse.
- Tester le bon fonctionnement du lazy loading.
- Tester que le cache de React Query fonctionne.

### Out of Scope
- Mise en place d'un CDN.
- Optimisation des polices (utilisation de polices systÃ¨me).
- Service Worker pour la PWA (hors scope V1).