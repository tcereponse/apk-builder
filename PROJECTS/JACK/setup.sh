#!/bin/bash
echo "🔧 JACK - Installation et lancement (Unix)"
echo "=========================================="
cd "$(dirname "$0")"
echo "📦 Installation des dépendances..."
pnpm install --legacy-peer-deps
echo ""
echo "🔥 Démarrage du serveur de développement..."
pnpm dev