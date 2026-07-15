Solution : Deux modes : Classique (Game Over lorsque la grille est pleine) et Zen (le jeu continue indéfiniment, les lignes sont supprimées, mais le score et le niveau progressent sans fin). Le mode est sélectionnable au démarrage (bouton sur l'écran d'accueil ou dans les paramètres).
User StoriesEn tant que joueur, je veux choisir le mode de jeu avant de commencer (Classique ou Zen), afin d'adapter l'expérience à mon niveau.

En tant que joueur, je veux que le mode Classique se termine par un Game Over lorsque la pièce ne peut pas être placée, avec affichage du score final.

En tant que joueur en mode Zen, je veux que le jeu ne se termine jamais, même si la grille est pleine (les lignes sont supprimées normalement), afin de m'entraîner sans limite.

En tant que joueur en mode Zen, je veux que le score et le niveau augmentent indéfiniment, pour suivre ma progression sur la durée.

En tant que joueur, je veux pouvoir basculer entre les modes uniquement en redémarrant la partie, afin d'éviter les confusions en cours de jeu.

Implementation Decisions (Deep Modules)Deep Module : GameEngine – accepte un paramètre zenMode dans reset(). En mode Zen, la condition de Game Over est désactivée (la nouvelle pièce est toujours générée même si elle chevauche une pièce fixée, les lignes sont supprimées, et le jeu continue). Toute autre logique (collisions, score) reste inchangée.

Interface de sélection : Écran d'accueil avec deux boutons (ou un toggle) avant de démarrer. Le choix est passé au moteur via reset({ zenMode: true/false }).

Affichage : Un indicateur du mode actuel (ex: badge "Zen" ou "Classique") dans l'interface.

Testing DecisionsIntégration : Lancer une partie en mode Zen, remplir la grille, vérifier que le jeu continue (pas de Game Over). Lancer en mode Classique et vérifier que le Game Over se déclenche.

Comportement : Tester que le score et le niveau continuent d'augmenter en Zen.

Out of ScopeMode "Survie" avec des pièces qui accélèrent différemment.

Mode "Puzzle" avec des objectifs spécifiques.

Sauvegarde de progression en Zen (score max seulement).