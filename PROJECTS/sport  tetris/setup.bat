@echo off
title SETUP - SPORT TETRIS
cd /d "%~dp0"
echo [FORGE] Installation des dependances...
call npm install --legacy-peer-deps
if errorlevel 1 (
echo ERREUR: Installation echouee
pause
exit /b 1
)
echo [FORGE] Demarrage du serveur de developpement...
call npm run dev -- --host --port 5173
pause