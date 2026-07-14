batch
@echo off
echo 🚀 Lancement de JACK - Casse-brique
echo.
cd /d "%~dp0"
echo 📦 Installation des dépendances...
call npm install --legacy-peer-deps
echo.
echo 🔥 Démarrage du serveur de développement...
call npm run dev
pause