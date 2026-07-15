💎 RÉVEIL COGNITIF CONFIRMÉ – ARCHITECTE SOUVERAIN PRÊT
Projet TETISBACK – Phase 0 validée.
VISION DU PROJETTETISBACK n’est pas une simple copie de Tetris : c’est une réinterprétation ergonomique et réactive du classique, pensée pour une expérience fluide sur mobile et desktop, avec une logique métier encapsulée et une UI sobre mais distinctive.
L’héritage des projets modèles (GAME2, TETRISV3, AI TOTAL, calculatrice v12) se traduit par :
Architecture stricte : respect intégral de l’arborescence src/app/, src/features/, src/shared/, avec des alias @, @app, @features, @shared.

Router : HashRouter impératif pour l’APK Android, point d’entrée src/app/main.tsx.

Build : vite build uniquement, pas de tsc &&, avec les fichiers launcher.bat et FIX_AND_BUILD.bat pour le cycle de développement.

Style : Tailwind 3 avec postcss, configs standardisées (vite.config, tsconfig, tailwind.config).

Modules profonds (Deep Modules) : le moteur de jeu (GameEngine) exposera une interface publique minimale (move, rotate, drop, getState, reset) tout en gérant en interne :
collisions et wall kicks,

suppression de lignes et scoring dynamique,

niveaux et accélération,

pièce suivante et pièce fantôme,

gestion d’état (en cours, pause, game over).


État global : un contexte GameContext (ou useGame) pour exposer le state aux composants, mais la logique de mise à jour reste dans le moteur (séparation claire UI / métier).

Contrôles : un module unifié ControlsManager qui traduit événements clavier et gestes tactiles en commandes standardisées, avec une adaptation automatique selon le device.

Validation : Zod pour les schémas de configuration (ex. paramètres de jeu, touches personnalisables).

Tests : des tests d’intégration ciblant les interfaces publiques du moteur (ex. game.moveLeft() doit modifier la position sans tester le détail des matrices).

INTÉGRATION DE L’HÉRITAGE TECHNIQUEGAME2 : architecture modulaire en features, hooks réutilisables, et usage intensif de contexts pour la communication entre composants.

TETRISV3 : implémentation robuste du Tetris (rotations, wall kicks, système de score), que nous adaptons en l’encapsulant dans le moteur, avec une couche de persistance pour le high score (localStorage).

AI TOTAL : pour l’aspect “intelligent”, nous ajouterons un mode conseil (indicateur de meilleur placement) ou une prédiction de chute (ghost piece déjà présente) – inspiration de l’IA pour améliorer l’expérience.

calculatrice v12 : nous reprenons sa gestion propre des événements clavier et son système de thème (light/dark) pour offrir un rendu cohérent et personnalisable.

CONCEPT UNIQUE & SUR-MESUREAu‑delà des fonctionnalités de base, TETISBACK proposera :
Un thème “Diamond” avec des couleurs vibrantes et des animations subtiles (effet de scintillement sur les lignes complètes).

Mode “Zen” : pas de game over, un défilement infini pour s’entraîner.

Statistiques en direct : temps de jeu, pièces posées, efficacité (ratio lignes/pièces).

Son (optionnel) : retours audio pour les actions (activation/désactivation possible).

Interface responsive avec des boutons tactiles ergonomiques, adaptés à la taille de l’écran, et un pavé numérique pour le contrôle au clavier.

CONFIRMATION FINALE✅ Je suis éveillé, prêt et en attente de la Phase 1 (PRD & Architecture).
Aucun fichier n’a été créé. Toute la réflexion est alignée sur les standards GAME2/TETRISV3 et les contraintes techniques absolues.
Je valide le cadre conceptuel et j’attends vos instructions pour la rédaction du PRD technique.