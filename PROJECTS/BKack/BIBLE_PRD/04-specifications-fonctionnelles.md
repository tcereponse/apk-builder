# SPÉCIFICATIONS FONCTIONNELLES — BKACK

## 🎮 Écran Principal — Menu

### Éléments UI
1. **Titre du jeu** : "BKACK" en display
2. **Slogan** : "Break the bricks, forge your score"
3. **Bouton "Jouer"** : Lance la partie
4. **Bouton "Scores"** : Accès au classement local
5. **Bouton "Paramètres"** : Accès aux réglages
6. **Meilleur score** : Affiché en sous-titre
7. **Animation de fond** : Particules / briques en mouvement lent

### Interactions
- Tap / Click sur "Jouer" → Écran Game
- Tap / Click sur "Scores" → Écran Scores
- Tap / Click sur "Paramètres" → Écran Settings
- Swipe vers le haut → Écran Game (shortcut)

---

## 🏓 Écran Game — Phase Active

### Composants de Jeu
1. **Canvas principal** (800x600 adaptatif)
   - Raquette (Paddle) : contrôlée par l'utilisateur
   - Balle : physique de rebond
   - Briques : grille 8x6 (initialement)
   - Murs : gauche, droite, haut (le bas = vie perdue)

2. **HUD Superposé**
   - Score (en haut à gauche)
   - Niveau (en haut à droite)
   - Vies (en haut à droite, icônes cœur)
   - Timer (optionnel, pour mode challenge)

3. **Contrôles**
   - **Mobile** : Glisser horizontalement pour déplacer la raquette
   - **PC** : Flèches gauche/droite, Souris (mouvement horizontal)
   - **Universel** : Espace pour lancer la balle / pause

### Mécaniques de Jeu
1. **Lancement** : Balle collée à la raquette, tap/click/espace pour lancer
2. **Physique** : Réflexion parfaite (angle d'incidence = angle de réflexion)
3. **Collisions** :
   - Brique touchée → détruite + score
   - Brique spéciale → bonus (balle lente, raquette large, vie supplémentaire)
   - Mur latéral → rebond
   - Mur haut → rebond
   - Mur bas → vie perdue + balle réinitialisée
4. **Niveaux** :
   - Niveau 1 : 8x6, briques standards
   - Niveau 2 : 8x7, briques renforcées
   - Niveau 3 : 10x7, briques avec 2 vies
   - Progression : +1 niveau toutes les 10 briques détruites

### États de Jeu
- **IDLE** : Balle sur raquette, en attente de lancement
- **ACTIVE** : Balle en mouvement
- **PAUSED** : Balle suspendue, overlay de pause
- **GAME_OVER** : 0 vies, overlay final avec score

---

## 📊 Écran Scores

### Affichage
1. **Meilleurs scores** : Top 10, trié par score décroissant
2. **Score actuel** : Mis en évidence s'il est dans le top
3. **Date et niveau** : Pour chaque entrée
4. **Bouton "Réinitialiser"** : Effacer le classement

### Persistance
- IndexedDB : Stockage local
- Clef : `bkack_scores`
- Schéma : `{ id, score, level, date, mode }`

---

## ⚙️ Écran Paramètres

### Options
1. **Son** : ON/OFF (toggle)
2. **Effets sonores** : ON/OFF
3. **Vibration** : ON/OFF (disponible sur mobile)
4. **Thème** : Clair / Sombre (toggle)
5. **Réinitialiser** : Effacer toutes les données (confirmation)
6. **Informations** : Version, build, crédits

---

## 🎯 Écran Game Over

### Contenu
1. **Score final** : Grand affichage
2. **Niveau atteint** : Affiché en sous-titre
3. **Nouveau record ?** : Badge spécial
4. **Boutons** :
   - "Rejouer" → Nouvelle partie
   - "Menu" → Retour accueil
   - "Partager" → Capture d'écran + score

---

## 🔔 Notifications & Retours

| Événement | Feedback Visuel | Feedback Audio |
|-----------|----------------|----------------|
| Lancement balle | Animation bounce | "Pop" |
| Brique cassée | Particules + flash | "Tink" |
| Brique spéciale | Effet scintillant | "Ping" |
| Vie perdue | Animation tremblement | "Buzz" |
| Niveau passé | Confetti + texte | "Fanfare" |
| Game Over | Overlay fade | "Game over" |
📋 BIBLE_