batch
@echo off
echo 🔧 JACK - Installation et lancement (Windows)
echo ==========================================
cd /d "%~dp0"
echo 📦 Installation des dépendances...
call pnpm install --legacy-peer-deps
echo.
echo 🔥 Démarrage du serveur de développement...
call pnpm dev
pause