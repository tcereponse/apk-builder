#!/bin/bash
echo "[FORGE] Installation des dependances..."
npm install --legacy-peer-deps
if [ $? -ne 0 ]; then
echo "ERREUR: Installation echouee"
exit 1
fi
echo "[FORGE] Demarrage du serveur de developpement..."
npm run dev -- --host --port 5173