Solution : Un ControlsManager unifié qui écoute les événements clavier et tactiles, les traduit en actions (LEFT, RIGHT, ROTATE, SOFT_DROP, HARD_DROP, PAUSE, RESET), et les transmet au moteur via un callback. Il gère également les gestes tactiles (glisser, tapoter) et les boutons UI. La détection du device active ou désactive les contrôles appropriés.
User StoriesEn tant que joueur desktop, je veux utiliser les flèches directionnelles pour déplacer la pièce, la flèche haut pour tourner, la flèche bas pour accélérer, et la barre d'espace pour le drop instantané, afin de contrôler le jeu précisément.

En tant que joueur desktop, je veux appuyer sur 'P' pour mettre en pause et sur 'R' pour redémarrer, afin d'avoir des raccourcis rapides.

En tant que joueur mobile, je veux voir des boutons tactiles (gauche, droite, rotation, bas, drop, pause) sur l'écran, afin de jouer sans clavier.

En tant que joueur mobile, je veux glisser mon doigt sur la grille pour déplacer la pièce horizontalement, et tapoter pour la tourner, afin d'avoir des gestes intuitifs.

En tant que joueur mobile, je veux que les boutons tactiles soient dimensionnés et positionnés pour éviter les erreurs de frappe, et qu'ils soient réactifs (feedback haptique ou visuel).

En tant que joueur, je veux que les commandes soient désactivées pendant le Game Over ou la pause (sauf pour reprendre/redémarrer), afin d'éviter les actions inattendues.

En tant que joueur, je veux que la détection du device soit automatique (via user-agent ou taille d'écran) pour afficher les contrôles adaptés.

Implementation Decisions (Deep Modules)Deep Module : ControlsManager – expose :
registerKeyboard(), registerTouch(), registerGesture() (activés automatiquement selon device)

setCommandCallback(callback: (command: Command) => void)

enable(), disable(), destroy()


Interne :
Mapping des keyCodes aux commandes.

Gestion des événements tactiles (touchstart, touchmove, touchend) : calcul du delta pour le glisser, détection de tapotement (durée courte).

Debounce pour éviter les déclenchements multiples (ex: rotation rapide).

Répétition automatique des déplacements (longue pression sur les boutons ou touches).

Détection du device via window.innerWidth (ou navigator.userAgent) pour activer les contrôles appropriés.


Commandes standardisées : 'LEFT', 'RIGHT', 'ROTATE', 'SOFT_DROP', 'HARD_DROP', 'PAUSE', 'RESET'.

Architecture : Le ControlsManager est instancié dans le GameProvider et connecté au moteur via le callback.

Testing DecisionsIntégration : Simuler des événements clavier (via KeyboardEvent) et vérifier que les commandes sont émises correctement. Simuler des événements tactiles (via des mocks) et vérifier les commandes.

Comportement : Tester la répétition (longue pression) et le debounce. Tester la désactivation en pause/Game Over.

Unitaires : Tester les fonctions de détection de device et de mapping.

Out of ScopeSupport des manettes de jeu (gamepad).

Personnalisation des touches par l'utilisateur.

Gestes avancés (double tap, swipe longue distance).

Retour haptique (vibration) – optionnel.