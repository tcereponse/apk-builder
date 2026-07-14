- Couche d'adaptation React. Gère le timer, les événements clavier/tactiles, la synchronisation UI.
Interface publique: { state, actions: { moveLeft, moveRight, rotate, drop, pause, restart } }

Utilise useReducer pour gérer les actions utilisateur et les ticks du jeu