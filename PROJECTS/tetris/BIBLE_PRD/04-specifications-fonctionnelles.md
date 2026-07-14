Spécifications Fonctionnelles — TETRISÉcran 1: Menu PrincipalTitre "TETRIS" en gros (font-bold, text-6xl) avec sous-titre "Diamond Forge Edition"

Boutons:
"Nouvelle Partie" (bouton principal, 100% de largeur)

"Statistiques" (bouton secondaire)

"Paramètres" (icône roue dentée en haut à droite)


Affichage: High Score persistent (localStorage) en bas à droite

Animations: Fade-in des éléments (stagger 100ms)

Écran 2: Partie ActiveZone de Jeu (Grid):
Grille 10x20 (largeur 100%, max 400px, aspect ratio 1:2)

Cellules avec bordure 1px (slate-800)

Pièce active avec couleur + ombre portée (drop-shadow)

Pièce fantôme (ghost) en transparence (slate-400/30) à la position de chute maximale

Zone d'Information (droite sur desktop, en dessous sur mobile):
Prochaine pièce (Next): Prévisualisation de la prochaine pièce

Score: En temps réel

Niveau: Actuel (1 à 15)

Lignes: Nombre de lignes supprimées

Timer: Durée de la partie (mm:ss)

Contrôles Desktop (Clavier):
← / → : Déplacement horizontal

↑ : Rotation

↓ : Accélération (soft drop)

Espace : Drop direct (hard drop)

P : Pause

R : Redémarrer

Contrôles Mobile (Tactiles):
Zone Swipe: Sur la zone de jeu, swiper gauche/droite = déplacement, haut = rotation, bas = soft drop

Boutons: 4 boutons en bas de l'écran: ←, →, ↻ (rotation), ↓ (soft drop)

Drop direct: Double-tap sur le centre de l'écran (ou bouton dédié "⬇️⬇️")

Pause: Bouton "⏸" en haut à gauche

Écran 3: Game OverOverlay: Fond semi-transparent (slate-950/80) avec blur

Texte: "GAME OVER" en énorme (text-6xl, rose-500)

Score final: text-4xl avec animation de comptage

High Score: Indicateur si nouveau record (🔥 "Nouveau Record !")

Boutons: "Rejouer" (principal), "Menu" (secondaire)

Animation: Entrée en fondu + zoom des éléments

Écran 4: StatistiquesMeilleur score: Historique des 5 meilleurs scores avec date

Total de parties: Nombre de parties jouées

Temps total joué: Somme des durées de parties

Lignes totales: Cumul des lignes supprimées

Niveau maximum atteint: Plus haut niveau jamais atteint

Bouton "Réinitialiser les stats": Confirmation requise

Écran 5: ParamètresToggle "Son" (désactivé par défaut - out of scope pour V1)

Toggle "Vibrations" (activation haptique sur mobile - out of scope)

Toggle "Mode Sombre" (obligatoire, toujours actif - pas de mode clair)

Sélecteur de vitesse initiale: "Normal" / "Rapide" / "Expert" (modifie le niveau de départ)

Bouton "Réinitialiser High Score" avec confirmation

Règles Métier (Gameplay)Pièces: Les 7 pièces classiques (I, O, T, S, Z, J, L) avec rotation standard (SRS simplifié)

Wall Kick: Si rotation bloquée, tentative de décalage de 1 case à gauche/droite (max 2 tentatives)

Ghost Piece: Toujours affichée, indique la position finale en chute libre

Niveau: Augmente toutes les 10 lignes supprimées

Vitesse: Intervalle de chute = max(50ms, 1000 - (niveau-1) * 50ms)

Score: Lignes × 100 × niveau (1 ligne=100, 2=300, 3=500, 4=800)

Game Over: Si une nouvelle pièce ne peut pas apparaître (collision en haut)