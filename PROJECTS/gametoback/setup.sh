#!/bin/bash
echo "[FORGE] Installation des dependances..."
npm install --legacy-peer-deps
if [ $? -ne 0 ]; then
    echo "[ERREUR] Echec de l'installation"
    exit 1
fi
echo "[FORGE] Lancement du serveur de developpement..."
npm run dev