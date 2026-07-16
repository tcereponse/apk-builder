## PRD 03 : Gestion des Produits

### Problem Statement & Solution
Les produits sont le cÅur du site. Nous devons afficher un catalogue paginÃ©, permettre la recherche et le filtrage, et afficher les dÃ©tails d'un produit. Les donnÃ©es proviennent d'une API mock (via React Query) et sont mises en cache.

### User Stories
1. En tant que visiteur, je vois une liste de produits sur la page d'accueil (pagination infinie ou par pages).
2. En tant que visiteur, je peux filtrer par catÃ©gorie (ex: vÃªtements, Ã©lectronique).
3. En tant que visiteur, je peux trier par prix croissant/dÃ©croissant.
4. En tant que visiteur, je peux rechercher un produit par nom (texte libre).
5. En tant que visiteur, je clique sur un produit pour voir sa fiche complÃ¨te (images, description, prix, stock).
6. En tant que visiteur, je vois des produits similaires ou recommandÃ©s sur la fiche produit.
7. En tant qu'admin, je peux ajouter un nouveau produit (formulaire avec validation Zod).
8. En tant qu'admin, je peux modifier un produit existant.
9. En tant qu'admin, je peux supprimer un produit.
10. En tant qu'admin, je peux gÃ©rer les catÃ©gories (CRUD).

### Implementation Decisions (Deep Modules, HashRouter, Zod, React Query)
- Module Catalogue : expose un hook useProducts(filters) qui gÃ¨re la requÃªte, le cache et le refetch.
- Deep Module : le composant ProductList utilise le hook, mais la logique de pagination et de filtrage est encapsulÃ©e dans le hook.
- Zod : SchÃ©ma ProductSchema pour valider les donnÃ©es API et les formulaires d'admin.
- React Query : useInfiniteQuery pour la pagination; useMutation pour les opÃ©rations admin.
- HashRouter : Routes pour /products/:id et /admin/products.
- Embla Carousel : UtilisÃ© pour les images du produit dans la fiche.

### Testing Decisions
- Tester le hook useProducts avec des mocks API.
- Tester le formulaire d'ajout avec Zod (validation).
- Tester la navigation entre la liste et la fiche produit.

### Out of Scope
- Gestion des images (upload) â nous utilisons des URLs externes.
- SystÃ¨me de notation/avis.
- Filtres avancÃ©s (fourchette de prix, couleurs, tailles) pour la V1.