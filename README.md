# backtogame

"Je veux créer une application web et mobile de référencement de jeux vidéo couvrant les sorties de 1989 à 2026. L'application doit avoir un design moderne, sombre et premium (Glassmorphism, Tailwind CSS, palette slate/zinc).

L'interface principale doit afficher les jeux sous forme de carrousels horizontaux dynamiques (utiliser Embla Carousel ou équivalent). Chaque carte de jeu doit afficher : l'image de fond du jeu (format cover/logo), le nom, la date de sortie, la ou les plateformes, ainsi qu'un descriptif abrégé en français.

Techniquement, la couche de données (Data Layer) doit récupérer toutes ces informations en temps réel via l'API RAWG (clé API : 431a4b53e7f54290b1de7e69c904fcbe) et les flux IGDB/Twitch, en implémentant une logique de Fetch avec React Query (TanStack Query) pour g

## 🚀 Démarrage rapide

```bash
npm install
npm run dev
```

Le serveur de développement démarre sur http://localhost:5173

## 📜 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre le serveur de développement (avec vérification TS) |
| `npm run build` | Build de production |
| `npm run preview` | Prévisualise le build de production |
| `npm run verifySyntax` | Vérification TypeScript (tsc --noEmit) |


## 🛠️ Stack technique

- **React** 18
- **Build tool**: vite
- **TypeScript** 5
- **Styling**: tailwind
- **Routing**: React Router DOM v6 (HashRouter)

## ✨ Fonctionnalités

- (aucune feature supplémentaire)

## 📁 Structure du projet

```
backtogame/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    └── components/
        └── MainComponent.tsx
```

---

Généré par **React Forge** le 15/07/2026
