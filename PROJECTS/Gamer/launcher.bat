batch
@echo off
echo 🚀 Lancement de GAMER...
cd /d "%~dp0"
echo 📦 Installation des dependances...
call npm install --legacy-peer-deps
echo.
echo ⚡ Lancement du serveur de developpement...
call npm run dev
pause