#!/bin/bash
echo "🔍 Verification de la configuration et du build..."
echo ""
echo "📦 Verification des fichiers critiques..."
[ -f package.json ] || { echo "❌ package.json manquant!"; exit 1; }
[ -f vite.config.ts ] || { echo "❌ vite.config.ts manquant!"; exit 1; }
[ -f tsconfig.json ] || { echo "❌ tsconfig.json manquant!"; exit 1; }
[ -f index.html ] || { echo "❌ index.html manquant!"; exit 1; }
[ -f src/app/main.tsx ] || { echo "❌ src/app/main.tsx manquant!"; exit 1; }
echo "✅ Tous les fichiers critiques sont presents."
echo ""
echo "🧹 Nettoyage du cache..."
rm -rf node_modules/.vite 2>/dev/null
echo ""
echo "📦 Installation des dependances..."
pnpm install --no-frozen-lockfile || { echo "❌ Echec de l'installation"; exit 1; }
echo ""
echo "🚀 Lancement du build..."
pnpm run build || { echo "❌ ECHEC DU BUILD - Consultez les erreurs ci-dessus"; exit 1; }
echo ""
echo "✅ BUILD REUSSI ! Le dossier 'dist' a ete cree."
Fichier: .env.example
VITE_RAWG_API_KEY=431a4b53e7f54290b1de7e69c904fcbe
Fichier: .gitignore
Logslogs
.log
npm-debug.log
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
node_modules
dist
dist-ssr
*.local
Editor directories and files.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
.ntvs
*.njsproj
*.sln
*.sw?
Environment variables.env
.env.local
.env.*.local
Cache.pnpm-store
.eslintcache
*.tsbuildinfo