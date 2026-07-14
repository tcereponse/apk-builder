# SPÉCIFICATIONS FONCTIONNELLES — JACK

## 1. Écran d'Accueil (/)
- **Titre** : "JACK" en grand
- **Bouton** "Jouer" (démarre la partie)
- **Bouton** "Scores" (affiche le top 10)
- **Bouton** "Paramètres" (son, thème, difficulté)
- **Footer** : version, crédits

## 2. Écran de Jeu (/game)
- **Canvas** : zone de jeu (raquette, balle, briques)
- **HUD** (superposé) :
  - Score actuel
  - Niveau
  - Vies (3 cœurs)
  - Bouton Pause (⏸)
- **Contrôles** :
  - Mobile : glisser horizontalement
  - Desktop : souris (déplacement) + clic (lancer)
  - Clavier : flèches gauche/droite + espace (lancer)
- **Game Over** : popup avec score final, bouton "Rejouer", "Accueil"

## 3. Écran Scores (/scores)
- **Top 10** : classement local (IndexedDB)
- **Score actuel** : mis en évidence
- **Bouton** "Retour"

## 4. Écran Paramètres (/settings)
- **Son** : toggle ON/OFF
- **Thème** : clair/sombre (toggle)
- **Difficulté** : Facile, Normal, Difficile (affecte vitesse balle)
- **Vibrations** : ON/OFF (mobile)
- **Bouton** "Réinitialiser les scores"

## 5. Écran Pause (modale)
- **Message** : "Partie en pause"
- **Bouton** "Reprendre"
- **Bouton** "Abandonner" (retour accueil)

## 6. Mécaniques de Jeu
- **Balle** : rebond sur raquette, murs (haut, gauche, droite), perte en bas
- **Raquette** : suit le doigt/souris, ne dépasse pas les bords
- **Briques** : grille 8x5, couleurs par niveau, certains bonus (balle plus large, multi-balles, etc.)
- **Niveaux** : 10 niveaux prédéfinis, difficulté croissante
- **Score** : +10 par brique, +50 pour combo (3 briques consécutives)
- **Vies** : 3 vies, perte quand balle tombe
- **Victoire** : toutes briques détruites → niveau suivant