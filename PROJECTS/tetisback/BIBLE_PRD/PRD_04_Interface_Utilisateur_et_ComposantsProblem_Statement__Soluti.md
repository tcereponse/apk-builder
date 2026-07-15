Solution : Une collection de composants UI stateless (présentateurs) qui reçoivent les données du contexte et ne font que les afficher. La grille est un composant qui rend chaque cellule avec la couleur appropriée. La pièce suivante est affichée dans une mini-grille. Les informations (score, niveau, lignes, statistiques) sont dans des cartes. Les boutons de contrôle (mobile) sont des composants avec des icônes Lucide. L'ensemble est responsive via Tailwind.
User StoriesEn tant que joueur, je veux voir la grille principale (10x20) au centre de l'écran, avec une bordure et un fond contrasté, afin de distinguer clairement les pièces.

En tant que joueur, je veux voir la pièce suivante dans un encadré à côté de la grille (ou en dessous sur mobile), afin d'anticiper mes mouvements.

En tant que joueur, je veux que le score, le niveau et le nombre de lignes soient affichés en grand et bien lisibles, afin de suivre ma progression.

En tant que joueur, je veux que la pièce fantôme soit affichée en transparence sur la grille, afin de savoir où la pièce va se poser.

En tant que joueur, je veux que les lignes complètes scintillent brièvement avant de disparaître, afin de rendre la suppression gratifiante.

En tant que joueur mobile, je veux que les boutons de contrôle soient regroupés en bas de l'écran, avec des tailles adaptées aux pouces, afin de ne pas gêner la vue de la grille.

En tant que joueur, je veux que l'interface passe en mode sombre ou clair selon le thème sélectionné, avec des couleurs cohérentes.

Implementation Decisions (Deep Modules)Deep Module : GridRenderer – composant qui reçoit une matrice 10x20 et la rend avec des cellules de taille fixe (responsive). Utilise display: grid ou flex. Gère les couleurs via un mapping des valeurs de la matrice.

Deep Module : NextPiecePreview – affiche la pièce suivante dans une mini-grille 4x4.

Deep Module : ScoreBoard – affiche score, niveau, lignes, statistiques.

Composants partagés : Button, IconButton, Card, Container (dans shared/components).

Responsive : Tailwind avec breakpoints sm, md, lg pour adapter la disposition (grille à gauche, infos à droite sur desktop ; tout en colonne sur mobile).

Animations : framer-motion pour le scintillement des lignes, la transition de la pièce suivante, l'apparition du Game Over.

Thème : Utilisation de variables CSS (ou classes Tailwind) gérées par ThemeManager.

Testing DecisionsIntégration : Vérifier que les composants affichent correctement les données du contexte (ex: grille avec pièces colorées, score mis à jour).

Comportement : Tester le responsive en changeant la taille de la fenêtre. Vérifier que les boutons tactiles apparaissent uniquement sur mobile.

Snapshot : (optionnel) pour éviter les régressions visuelles.

Out of ScopeÉditeur de grille ou de pièces.

Personnalisation de la taille des cellules par l'utilisateur.

Affichage de publicités ou de messages tiers.