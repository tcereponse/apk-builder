## PRD 07 : Paiements et IntÃ©gration

### Problem Statement & Solution
Le processus de paiement doit Ãªtre sÃ©curisÃ© et simple. Nous simulons un paiement pour la dÃ©mo, mais l'architecture doit permettre d'ajouter facilement un fournisseur de paiement rÃ©el (Stripe/PayPal).

### User Stories
1. En tant qu'utilisateur, je choisis une mÃ©thode de paiement (carte bancaire, PayPal, etc.) mais les options seront mockÃ©es.
2. En tant qu'utilisateur, je saisis les dÃ©tails de carte (mock) ou je suis redirigÃ© vers une page de paiement factice.
3. En tant qu'utilisateur, je vois un rÃ©capitulatif avant de valider.
4. En tant qu'utilisateur, aprÃ¨s validation, je suis redirigÃ© vers une page de confirmation avec un numÃ©ro de commande.
5. En tant qu'utilisateur, je reÃ§ois un mail (mock) de confirmation.
6. En tant qu'admin, je vois les commandes avec leur statut de paiement (payÃ©, impayÃ©).
7. En tant qu'utilisateur, si le paiement Ã©choue, je peux rÃ©essayer.
8. En tant que dÃ©veloppeur, je peux basculer entre mode mock et mode rÃ©el via variable d'environnement.
9. En tant que dÃ©veloppeur, je dois valider les montants et les donnÃ©es de transaction avec Zod.
10. En tant que utilisateur, je veux que les informations de paiement ne soient pas stockÃ©es en clair (mock uniquement).

### Implementation Decisions (Deep Modules, HashRouter, Zod, React Query)
- Module Payment : expose usePayment avec mÃ©thode processPayment(order).
- Deep Module : La logique d'appel Ã  l'API de paiement est encapsulÃ©e ; on utilise un PaymentProvider qui peut Ãªtre mock ou rÃ©el.
- Zod : SchÃ©ma PaymentDetailsSchema pour valider les donnÃ©es saisies.
- React Query : Mutation useProcessPayment.
- HashRouter : Routes /checkout/payment, /checkout/success, /checkout/failure.

### Testing Decisions
- Tester le succÃ¨s du paiement mock.
- Tester l'Ã©chec et la gestion d'erreur.
- Tester la redirection vers succÃ¨s/Ã©chec.

### Out of Scope
- IntÃ©gration Stripe/PayPal rÃ©elle (V2).
- Gestion des remboursements.
- Paiement en plusieurs fois.