Solution : Une configuration Vite standardisée (aliases, base ./), des scripts launcher.bat et FIX_AND_BUILD.bat pour le développement et le build, et une intégration avec Capacitor pour générer l'APK. Les fichiers de configuration (tsconfig, postcss, tailwind, .npmrc) sont alignés sur les projets modèles.
User StoriesEn tant que développeur, je veux lancer le serveur de développement avec npm run dev qui utilise Vite et ouvre le navigateur, afin de tester rapidement.

En tant que développeur, je veux exécuter launcher.bat pour un démarrage local rapide sans commandes manuelles.

En tant que développeur, je veux que FIX_AND_BUILD.bat nettoie le cache et produise un build dist/ prêt pour la production, afin de résoudre les problèmes de cache.

En tant que développeur, je veux que npm run build génère les fichiers optimisés (minifiés, avec hash) dans dist/, sans exécuter tsc (uniquement vite build).

En tant que développeur, je veux pouvoir générer un APK Android via Capacitor, en utilisant npx cap add android et npx cap sync, puis npx cap open android pour build dans Android Studio.

En tant qu'utilisateur final, je veux pouvoir installer l'APK sur mon téléphone et jouer hors ligne.

Implementation Decisions (Deep Modules)Configuration Vite : vite.config.ts avec base: './', plugin react(), aliases @, @app, @features, @shared.

: tsconfig.json avec include: ["src", "vite-env.d.ts"], paths pour les aliases.

Tailwind : tailwind.config.ts avec content pointant vers index.html et src/**/*.{ts,tsx}.

PostCSS : postcss.config.js exportant un objet avec tailwindcss et autoprefixer.

.npmrc : package-import-method=copy et store-dir=.pnpm-store.

Scripts package.json :
dev: vite

build: vite build

preview: vite preview

cap:sync: npx cap sync

cap:open: npx cap open android


Fichiers batch :
launcher.bat : lance npm run dev ou pnpm dev.

FIX_AND_BUILD.bat : supprime node_modules/.vite, dist/, puis exécute npm run build.


Capacitor : Installation de @capacitor/core, @capacitor/cli, @capacitor/android. Configuration capacitor.config.json avec webDir: "dist", server: { androidScheme: "https" }.

Testing DecisionsIntégration : Vérifier que le build se termine sans erreur (lancer npm run build dans un pipeline CI). Vérifier que les alias fonctionnent.

Comportement : Tester que l'APK généré s'ouvre sur un émulateur Android (via tests manuels).

Out of ScopeDéploiement sur les stores (Play Store, App Store).

Génération d'APK automatisée (CI/CD).

Support iOS (seul Android est ciblé).

Mise à jour en direct (OTA).