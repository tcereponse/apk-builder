Solution : Un module GameEngine (classe ou ensemble de fonctions pures) encapsulant toute la logique de jeu. Il expose une interface publique minimaliste (moveLeft, moveRight, rotate, softDrop, hardDrop, getState, reset, togglePause) et notifie les changements d'état via un callback. La grille, les pièces, le score, le niveau, le statut (playing, paused, gameOver) sont gérés en interne. Les wall kicks sont implémentés selon les règles standard (SRS). Le moteur est agnostique de l'UI et peut être testé unitairement.
User StoriesEn tant que moteur, je dois initialiser une grille vide de 10x20 avec la première pièce aléatoire, afin que le jeu soit prêt.

En tant que moteur, je dois gérer les 7 pièces classiques (I, J, L, O, S, T, Z) avec leurs couleurs, formes et rotations.

En tant que moteur, je dois détecter les collisions avec les bords et les pièces fixées, afin d'empêcher les déplacements illégaux.

En tant que moteur, je dois appliquer les wall kicks (décalages automatiques) lors des rotations pour éviter les blocages sur les bords.

En tant que moteur, je dois fixer la pièce active lorsqu'elle ne peut plus descendre, et générer la pièce suivante.

En tant que moteur, je dois supprimer les lignes complètes, incrémenter le score (100/300/500/800 selon le nombre de lignes) et le niveau (toutes les 10 lignes).

En tant que moteur, je dois gérer la chute automatique avec un intervalle dépendant du niveau (vitesse croissante).

En tant que moteur, je dois détecter le Game Over lorsque la nouvelle pièce ne peut pas être placée en haut de la grille.

En tant que moteur, je dois proposer un mode Zen où le Game Over est désactivé (les pièces continuent, les lignes sont supprimées normalement).

En tant que moteur, je dois fournir un état complet (grille, pièce active, pièce suivante, score, niveau, lignes, statut, pièce fantôme) pour que l'UI puisse le rendre.

Implementation Decisions (Deep Modules)Deep Module : GameEngine – expose uniquement :
moveLeft(), moveRight(), rotate(), softDrop(), hardDrop()

togglePause(), reset(options: { zenMode?: boolean, level?: number })

getState(): GameState (lecture seule)

onStateChange(callback: (state: GameState) => void)

tick() (appelé par la boucle de jeu)


Interne :
Matrice 10x20 avec valeurs représentant les couleurs/pièces.

Pièces définies dans un tableau constant avec leurs formes et rotations.

Fonctions de rotation avec wall kicks (SRS).

Gestion du timer via requestAnimationFrame ou setInterval (découplé, le moteur ne gère pas le temps, il expose tick()).

Calcul du score et du niveau.

Génération de pièce aléatoire avec sac (7-bag) pour éviter les séries défavorables.

Calcul de la pièce fantôme (position finale).


Schéma Zod : GameStateSchema pour validation (utilisé dans le contexte).

Architecture : Le moteur est instancié dans le GameProvider et appelé via les actions dispatchées.

Testing DecisionsUnitaires :
Rotation de chaque pièce avec wall kicks (vérifier les décalages).

Détection de collision (bords, pièces).

Suppression de lignes et calcul de score (simuler des grilles).

Passage de niveau.

Génération de pièces (sac).


Intégration :
Simuler une séquence de déplacements et rotations, vérifier l'état final.

Tester un scénario complet jusqu'au Game Over.

Mode Zen : vérifier qu'il n'y a pas de Game Over même si la grille est pleine.


Règle : Ne jamais tester les variables privées ; tester via l'interface publique et l'état observable.

Out of ScopeGestion des high scores (confié au PersistanceService).

Sons et animations (confiés à l'UI).

Historique des coups pour l'IA (confié à un module externe).

Mode multijoueur ou réseau.