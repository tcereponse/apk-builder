## PRD 06 : Gestion des Commandes

### Problem Statement & Solution
Les commandes doivent Ãªtre tracÃ©es : depuis la validation jusqu'Ã  la livraison. L'utilisateur peut consulter ses commandes, et l'admin peut les gÃ©rer (changer statut).

### User Stories
1. En tant qu'utilisateur, je vois la liste de mes commandes (date, total, statut).
2. En tant qu'utilisateur, je clique sur une commande pour voir le dÃ©tail (articles, adresse, statut).
3. En tant qu'utilisateur, je peux annuler une commande si elle n'est pas encore expÃ©diÃ©e.
4. En tant qu'admin, je vois toutes les commandes avec filtres (statut, date).
5. En tant qu'admin, je peux changer le statut d'une commande (en prÃ©paration, expÃ©diÃ©e, livrÃ©e).
6. En tant qu'admin, je peux ajouter un suivi (numÃ©ro de colis).
7. En tant qu'utilisateur, je reÃ§ois une notification (toast) quand le statut change (via polling ou websocket, mais on utilisera un refetch).
8. En tant qu'utilisateur, je peux tÃ©lÃ©charger la facture (PDF) â optionnel.
9. En tant qu'admin, je peux exporter les commandes (CSV).
10. En tant qu'utilisateur, je vois un historique complet des statuts.

### Implementation Decisions (Deep Modules, HashRouter, Zod, React Query)
- Module Orders : expose useOrders (list), useOrderDetails(id), useUpdateOrderStatus (admin).
- Deep Module : Logique de filtrage et pagination dans le hook.
- Zod : SchÃ©ma OrderStatusSchema pour les valeurs autorisÃ©es.
- React Query : useQuery avec cache persistant ; mutations pour mises Ã  jour.
- HashRouter : Routes /orders, /orders/:id, /admin/orders.

### Testing Decisions
- Tester l'affichage de la liste avec diffÃ©rents statuts.
- Tester le changement de statut (admin).
- Tester l'annulation par l'utilisateur (condition sur statut).

### Out of Scope
- Notifications push ou emails rÃ©els (seulement des toasts).
- SystÃ¨me de suivi de livraison en temps rÃ©el.