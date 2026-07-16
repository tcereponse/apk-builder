## PRD 05 : Authentification et Utilisateur

### Problem Statement & Solution
Les utilisateurs doivent pouvoir crÃ©er un compte, se connecter, et accÃ©der Ã  leur espace personnel (profil, commandes). Nous gÃ©rons les sessions via JWT stockÃ© dans localStorage ou sessionStorage, avec rafraÃ®chissement automatique.

### User Stories
1. En tant que visiteur, je peux m'inscrire avec email/mot de passe (validation Zod).
2. En tant que visiteur, je peux me connecter avec mes identifiants.
3. En tant qu'utilisateur, je peux me dÃ©connecter.
4. En tant qu'utilisateur, je peux consulter mon profil (nom, email).
5. En tant qu'utilisateur, je peux modifier mon mot de passe.
6. En tant qu'utilisateur, je peux accÃ©der Ã  mon historique de commandes.
7. En tant qu'utilisateur, je peux voir les dÃ©tails d'une commande passÃ©e.
8. En tant qu'utilisateur, je peux annuler une commande (si statut permet).
9. En tant qu'admin, je peux voir la liste des utilisateurs.
10. En tant qu'admin, je peux dÃ©sactiver un compte utilisateur.

### Implementation Decisions (Deep Modules, HashRouter, Zod, React Query)
- Module Auth : expose useAuth hook avec login, register, logout, user.
- HashRouter : Routes privÃ©es protÃ©gÃ©es par un composant ProtectedRoute.
- Zod : SchÃ©mas LoginSchema, RegisterSchema.
- React Query : Mutations pour login/register ; query pour le profil.
- Contexte : AuthProvider pour stocker l'utilisateur et le token.
- Intercepteur : Ajout du token dans les headers des requÃªtes API via un interceptor fetch.

### Testing Decisions
- Tester l'inscription avec validation (mots de passe identiques, email valide).
- Tester la connexion avec succÃ¨s/Ã©chec.
- Tester la persistance de session (rechargement).
- Tester la protection des routes (redirection si non authentifiÃ©).

### Out of Scope
- OAuth (Google, Facebook) â seulement email/mot de passe.
- VÃ©rification par email (activation de compte).
- Gestion des rÃ´les avancÃ©s (admin vs user simple) â nous aurons un flag isAdmin dans le profil.