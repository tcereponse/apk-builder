#!/bin/bash
echo "🔧 GAMETOBACKV2 - Setup & Launch"
echo "📦 Installation des dépendances..."
pnpm install --no-frozen-lockfile
if [ $? -ne 0 ]; then
echo "❌ Erreur d'installation"
exit 1
fi
echo "🚀 Lancement du serveur de développement..."
pnpm dev