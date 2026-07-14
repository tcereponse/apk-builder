#!/bin/bash
echo "🚀 Lancement de GAMER..."
cd "$(dirname "$0")"
echo "📦 Installation des dependances..."
pnpm install
echo ""
echo "⚡ Lancement du serveur de developpement..."
pnpm run dev