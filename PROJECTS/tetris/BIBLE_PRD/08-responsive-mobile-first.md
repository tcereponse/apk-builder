Responsive Mobile-First — TETRISStratégie Mobile-FirstBreakpoints Tailwind:
sm (640px): Layout vertical empilé

(768px): Layout horizontal (jeu à gauche, infos à droite)

lg (1024px): Agrandissement des polices et marges

xl (1280px): Affichage maximal avec padding confortable


Layout AdaptatifMobile (< 640px):
Board: 100% de la largeur (max 400px)

Zone info: Sous le board, en deux colonnes (Next + Score)

Contrôles: Grille 4x1 ou 3x2 pour les boutons

Swipe: Détection sur toute la zone du board (touch events)

Tablet (640px - 1024px):
Board: 60% de la largeur

Zone info: 40% de la largeur, à droite

Contrôles: Grille 2x2 en bas à droite

Desktop (> 1024px):
Board: 50% de la largeur (max 500px)

Zone info: 30% de la largeur

Contrôles: Support clavier prioritaire (boutons optionnels)

Viewport & Safe Areas (PWA)index.html:






<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
<meta name="theme-color" content="#0f172a" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
Safe Area:





/* Dans index.css ou tailwind custom */
.safe-area {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
Touch Events (Précision Tactile)Swipe Detection:
Seuil de 30px pour déclencher un mouvement

Direction: horizontale (left/right), verticale (up/down)

Pas de swipe si touch duration > 500ms (considéré comme tap)


Long Press: 500ms sur bouton pour action répétée (soft drop accéléré)

Double Tap: Sur la zone de jeu pour hard drop

PWA Configuration (Manifest)manifest.json (à la racine):





{
  "name": "TETRIS Diamond Forge",
  "short_name": "Tetris",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#0f172a",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
Service Worker (Offline Support)Vite PWA Plugin: vite-plugin-pwa pour génération automatique

Stratégie: Cache-first pour l'App Shell (index.html + CSS + JS)

Network-first pour les assets non critiques (fontes, icônes)

Mise à jour: Détection de nouvelle version au démarrage

Contrôles Clavier vs TactilesDesktop: Message "Utilisez les flèches du clavier" caché sur mobile

Mobile: Message "Glissez pour contrôler" caché sur desktop

Coexistence: Les deux modes sont actifs simultanément (un joueur peut utiliser clavier + souris sur tablette)

Gestion des Gestes Natifs (Empêcher Scroll)typescript





// Prevenir le scroll pendant le jeu
document.addEventListener('touchmove', (e) => {
  if (isGameActive()) e.preventDefault();
}, { passive: false });