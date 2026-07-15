@echo off
title GAMETOBACKV2 - Setup & Launch
echo 🔧 GAMETOBACKV2 - Setup & Launch
echo 📦 Installation des dependances...
call pnpm install --no-frozen-lockfile
if errorlevel 1 (
echo ❌ Erreur d'installation
pause
exit /b 1
)
echo 🚀 Lancement du serveur de developpement...
call pnpm dev
pause