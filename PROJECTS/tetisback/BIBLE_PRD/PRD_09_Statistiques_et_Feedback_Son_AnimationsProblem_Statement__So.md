Solution : Intégration d'animations (framer-motion) pour les événements clés (ligne supprimée, rotation, drop), d'effets sonores (via Web Audio API) pour les actions, et d'un module StatisticsTracker qui calcule et expose les métriques.
User StoriesEn tant que joueur, je veux voir une animation de scintillement lorsque des lignes sont supprimées, afin de rendre l'action plus satisfaisante.

En tant que joueur, je veux entendre un son bref lors de la rotation, du drop et de la suppression de lignes, afin d'avoir un retour auditif.

En tant que joueur, je veux pouvoir désactiver les sons via un bouton, afin de jouer en silence.

En tant que joueur, je veux voir mes statistiques (temps de jeu, pièces posées, lignes supprimées, ratio) mises à jour en direct, afin de mesurer ma performance.

En tant que joueur, je veux que le Game Over soit accompagné d'une animation de fondu et d'un son spécifique, pour marquer la fin de partie.

Implementation Decisions (Deep Modules)Deep Module : StatisticsTracker – expose :
start(), stop(), reset(), getStats(): Stats

Écoute les événements du moteur (via callback) pour incrémenter les compteurs (pièces posées, lignes supprimées).


Deep Module : SoundService – utilise l'API Web Audio (AudioContext) pour générer des sons simples (oscillateurs) ou jouer des fichiers audio courts. Expose play(sound: SoundName), toggleMute(), isMuted().

Animations : framer-motion pour :
Scintillement des lignes (variation d'opacité).

Transition de la pièce suivante (slide).

Apparition/disparition de l'écran de Game Over (fade).


Feedback visuel immédiat : Léger flash sur la grille lors des déplacements/rotations (optionnel).

Testing DecisionsIntégration : Vérifier que les statistiques s'incrémentent correctement après des actions simulées.

Comportement : Tester que les sons sont joués ou non selon l'état du mute.

Unitaires : Tester le StatisticsTracker avec des événements mockés.

Out of ScopeSons personnalisables par l'utilisateur (upload de fichiers).

Effets visuels 3D ou lourds (particules) pour préserver les performances mobiles.