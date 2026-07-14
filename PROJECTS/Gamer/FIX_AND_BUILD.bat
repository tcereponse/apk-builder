batch
@echo off
echo 🔧 Nettoyage et build de GAMER...
cd /d "%~dp0"
echo 🧹 Nettoyage du cache...
rmdir /s /q node_modules 2>nul
rmdir /s /q dist 2>nul
del package-lock.json 2>nul
echo.
echo 📦 Reinstallation...
call npm install --legacy-peer-deps
echo.
echo 🏗️ Build de production...
call npm run build
echo.
echo ✅ Build termine dans le dossier dist/
pause

/// <reference types="vite/client" />