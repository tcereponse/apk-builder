Solution : TETISBACK offre une expérience de jeu unifiée, réactive et personnalisable, avec une interface "Diamond" distinctive. Le produit repose sur un moteur de jeu robuste (encapsulé) et une couche UI découplée, permettant d'ajouter des fonctionnalités innovantes (mode Zen, statistiques, conseil IA) sans dégrader la performance. L'adaptation automatique au device garantit une expérience optimale sur mobile (gestes tactiles, boutons adaptés) et desktop (contrôles clavier). Le thème visuel, les animations et les retours sonores sont entièrement configurables pour répondre aux goûts personnels.
User StoriesEn tant que joueur, je veux lancer le jeu et voir immédiatement une grille propre avec la première pièce, afin de commencer à jouer sans délai.

En tant que joueur, je veux que l'interface s'adapte automatiquement à la taille de mon écran (mobile, tablette, desktop), afin de profiter d'une disposition optimale des éléments.

En tant que joueur, je veux que les couleurs des pièces soient vives et distinctives, avec un thème "Diamond" (effet brillant), afin d'améliorer le confort visuel et l'immersion.

En tant que joueur, je veux pouvoir basculer entre plusieurs thèmes visuels (clair, sombre, diamond) en un clic, afin d'adapter l'ambiance à mes préférences ou à la luminosité ambiante.

En tant que joueur, je veux voir des animations subtiles lors de la suppression de lignes (scintillement, disparition), afin de rendre l'action gratifiante et dynamique.

En tant que joueur, je veux un affichage clair des informations essentielles (score, niveau, lignes, pièce suivante) pour suivre ma progression en temps réel.

En tant que joueur, je veux que les statistiques (temps de jeu, pièces posées, efficacité) soient visibles en cours de partie, afin de mesurer ma performance.

En tant que joueur, je veux pouvoir activer/désactiver les sons (effets de jeu) via un bouton dédié, afin de jouer en silence si nécessaire.

En tant que joueur, je veux que le meilleur score soit sauvegardé automatiquement entre les sessions, afin de pouvoir tenter de le battre à chaque partie.

En tant que joueur, je veux un écran de Game Over élégant affichant mon score final, mes statistiques et un bouton de redémarrage, afin de clore la partie proprement.

En tant que joueur, je veux un bouton de redémarrage rapide accessible à tout moment, afin de recommencer une partie sans recharger la page.

En tant que joueur, je veux que l'application soit disponible en tant qu'APK Android, via Capacitor, afin de l'installer sur mon téléphone comme une application native.

Implementation Decisions (Deep Modules)Deep Module : ThemeManager – encapsule la logique de gestion des thèmes (clair, sombre, diamond). Interface publique simple : setTheme(theme), getCurrentTheme(), subscribe(observer). En interne, il applique les classes CSS Tailwind dynamiques et gère la persistance des préférences dans localStorage via Zod validation.

Deep Module : StatisticsTracker – suit en temps réel les métriques de jeu : temps écoulé, nombre de pièces posées, lignes supprimées, ratio efficacité. Interface : start(), stop(), reset(), getStats(). Il est indépendant du moteur de jeu, écoute les événements (pièce posée, ligne supprimée) et met à jour un état interne.

Architecture : React 18 + Vite 5 + TypeScript 5. Router : HashRouter (React Router DOM) obligatoire pour APK. Point d'entrée : src/app/main.tsx. Aliases : @, @app, @features, @shared.

Gestion d'état global : GameProvider utilisant useReducer pour l'état du jeu (lecture seule via useGame()). Le GameEngine (moteur) notifie le provider via un callback.

Persistance : PersistanceService avec Zod schemas pour UserSettings (thème, son activé, high score). Stockage localStorage.

Dépendances : react-router-dom, lucide-react pour les icônes, framer-motion pour les animations, date-fns pour le formatage du temps.

Testing DecisionsIntégration : Tests de parcours utilisateur complets (Cypress ou Playwright) : lancer le jeu, changer de thème, vérifier que le thème persiste après rechargement, quitter et voir le score final. Vérifier que les animations ne bloquent pas les interactions.

Comportement : Tester que le ThemeManager applique correctement les classes CSS pour chaque thème et que le changement est réactif. Tester que StatisticsTracker met à jour les valeurs après des actions simulées.

Unitaires : Validation des schémas Zod pour les paramètres utilisateur.

Out of ScopeSupport de thèmes personnalisés par l'utilisateur (import de fichiers CSS).

Animations complexes (particules, 3D) pour ne pas alourdir le rendu mobile.

Synchronisation des préférences entre appareils (pas de backend).

Accessibilité avancée (lecteur d'écran, navigation clavier complète).

Mode portrait / paysage forcé – l'application s'adapte mais ne bloque pas l'orientation.