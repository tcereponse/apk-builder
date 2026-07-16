## PRD 04 : Panier et Checkout

### Problem Statement & Solution
Le panier doit Ãªtre persistant mÃªme si l'utilisateur quitte le site. Le processus de checkout doit Ãªtre simple, avec collecte des informations de livraison et de paiement (mockÃ©). Un rÃ©sumÃ© clair est prÃ©sentÃ© avant validation.

### User Stories
1. En tant que visiteur, je peux ajouter un produit au panier depuis la liste ou la fiche produit.
2. En tant que visiteur, je peux modifier la quantitÃ© d'un article dans le panier.
3. En tant que visiteur, je peux supprimer un article du panier.
4. En tant que visiteur, je peux vider le panier.
5. En tant que visiteur, je vois le nombre d'articles et le total dans l'icÃ´ne du panier (header).
6. En tant que visiteur, je consulte mon panier Ã  tout moment via la page /panier.
7. En tant que visiteur, je lance le checkout depuis le panier.
8. En tant que visiteur, je remplis un formulaire d'adresse de livraison (validÃ© par Zod).
9. En tant que visiteur, je choisis un mode de paiement (carte, virement, etc., mais mockÃ©).
10. En tant que visiteur, je vois un rÃ©capitulatif final et je confirme la commande.

### Implementation Decisions (Deep Modules, HashRouter, Zod, React Query)
- Module Panier : Store local (zustand ou context) avec persistance dans localStorage; ou utiliser idb pour une persistance plus robuste.
- Checkout : Hook useCheckout gÃ¨re les Ã©tapes (livraison, paiement, confirmation).
- Zod : SchÃ©mas pour OrderSchema, ShippingAddressSchema.
- React Query : Mutation pour soumettre la commande (POST /orders).
- HashRouter : Routes /cart, /checkout, /checkout/success.
- Framer Motion : Animations lors de l'ajout au panier.

### Testing Decisions
- Tester l'ajout/suppression/modification de quantitÃ©.
- Tester la persistance du panier aprÃ¨s rechargement.
- Tester la validation du formulaire d'adresse.
- Tester la soumission de commande et la redirection vers succÃ¨s.

### Out of Scope
- IntÃ©gration rÃ©elle de paiement ; nous simulons un paiement rÃ©ussi.
- Gestion des frais de livraison dynamiques.
- Support de codes promo / rÃ©ductions pour la V1.