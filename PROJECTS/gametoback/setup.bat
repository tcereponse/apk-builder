@echo off
title GAMETOBACK - SETUP
cd /d "%~dp0"
echo [FORGE] Installation des dependances...
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo [ERREUR] Echec de l'installation
    pause
    exit /b 1
)
echo [FORGE] Lancement du serveur de developpement...
call npm run dev
pause