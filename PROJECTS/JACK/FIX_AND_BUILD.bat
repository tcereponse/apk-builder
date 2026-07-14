batch
@echo off
echo 🔧 Nettoyage et build de JACK
cd /d "%~dp0"
echo 🧹 Nettoyage du cache...
rmdir /s /q node_modules
rmdir /s /q .vite
del package-lock.json
echo.
echo 📦 Réinstallation des dépendances...
call npm install --legacy-peer-deps
echo.
echo 🏗️ Build de production...
call npm run build
echo.
echo ✅ Build terminé avec succès !
pause

/// <reference types="vite/client" />