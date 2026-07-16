Z## PRD 02 : Architecture Technique

### Problem Statement & Solution
L'application doit Ãªtre maintenable, Ã©volutive et optimisÃ©e pour mobile. Nous adoptons une architecture par features (DDD lÃ©ger) avec une sÃ©paration claire entre les couches prÃ©sentation, logique mÃ©tier et accÃ¨s aux donnÃ©es. La stack est React 18 + TypeScript 5 + Vite 5 + Tailwind 3.

### User Stories
1. En tant que dÃ©veloppeur, je veux une structure de dossiers cohÃ©rente pour trouver facilement les composants.
2. En tant que dÃ©veloppeur, je veux utiliser des alias d'importation (@, @app, @features, @shared) pour Ã©viter les chemins relatifs.
3. En tant que dÃ©veloppeur, je veux un fichier de configuration Vite simple avec le plugin React.
4. En tant que dÃ©veloppeur, je veux un