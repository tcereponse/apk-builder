Solution : Un GameProvider qui encapsule l'état du jeu via useReducer et expose state (lecture seule) et dispatch (pour les actions). Le moteur de jeu est couplé au reducer : chaque action dispatchée appelle une méthode du moteur, qui met à jour son état interne et notifie le provider via un callback, ce qui déclenche un nouvel état dans le reducer. Les composants consomment useGame() pour accéder à state et aux actions.
User StoriesEn tant que développeur, je veux que l'état du jeu soit centralisé dans un contexte, afin de le partager facilement entre les composants sans props.

En tant que développeur, je veux que les mises à jour soient optimisées (seuls les composants qui consomment les données modifiées sont re-rendus), afin de maintenir des performances élevées.

En tant que développeur, je veux que les actions (déplacement, rotation, etc.) soient déclenchées via des fonctions dispatchées, afin de séparer la logique de présentation de la logique métier.

En tant que joueur, je veux que l'interface réagisse instantanément à mes actions, sans latence perceptible.

Implementation Decisions (Deep Modules)Deep Module : GameProvider – fournit le contexte via createContext. Utilise useReducer avec un reducer qui appelle les méthodes du GameEngine. Le reducer reçoit l'état actuel et une action, et retourne le nouvel état (calculé par le moteur). Le GameEngine est instancié une fois dans le provider et notifie le reducer via un callback enregistré.

Hook personnalisé : useGame() qui lève une erreur si utilisé hors du provider.

État : contient grid, currentPiece, nextPiece, score, level, lines, gameStatus, ghostPiece, statistics, theme, soundEnabled.

Actions : MOVE_LEFT, MOVE_RIGHT, ROTATE, SOFT_DROP, HARD_DROP, PAUSE, RESET, TICK, SET_THEME, TOGGLE_SOUND.

Optimisation : Utilisation de useSelector ou de React.memo sur les composants pour éviter les re-renders inutiles (ou bien décomposer le contexte en plusieurs contextes (ex: GameStateContext et GameDispatchContext) pour séparer lecture et écriture.

Testing DecisionsIntégration : Tester que le provider transmet correctement l'état aux composants enfants. Tester que les actions dispatchées provoquent les bonnes mises à jour (via des tests avec render de React Testing Library et vérification des valeurs affichées).

Comportement : Tester que le tick (appelé par la boucle) met à jour l'état automatiquement.

Unitaires : Tester le reducer (fonctions pures) avec des actions simulées.

Out of ScopeGestion d'états globaux autres que le jeu (ex: préférences utilisateur sont gérées par PersistanceService).

Usage de Redux ou MobX (contexte suffisant).