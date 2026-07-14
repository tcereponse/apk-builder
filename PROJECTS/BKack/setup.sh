#!/bin/bash
echo "🔧 Installation des dépendances..."
pnpm install
if [ $? -ne 0 ]; then
echo "❌ Erreur lors de l'installation"
exit 1
fi
echo "🚀 Démarrage du serveur de développement..."
pnpm dev