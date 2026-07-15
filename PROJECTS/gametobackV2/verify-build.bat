@echo off
title VERIFY BUILD - GAMETOBACKV2
cd /d "%~dp0"
echo 🔍 Verification de la configuration et du build...
echo.
echo 📦 Verification des fichiers critiques...
if not exist package.json ( echo ❌ package.json manquant! & pause & exit /b 1 )
if not exist vite.config.ts ( echo ❌ vite.config.ts manquant! & pause & exit /b 1 )
if not exist tsconfig.json ( echo ❌ tsconfig.json manquant! & pause & exit /b 1 )
if not exist index.html ( echo ❌ index.html manquant! & pause & exit /b 1 )
if not exist src\app\main.tsx ( echo ❌ src\app\main.tsx manquant! & pause & exit /b 1 )
echo ✅ Tous les fichiers critiques sont presents.
echo.
echo 🧹 Nettoyage du cache...
if exist node_modules.vite rmdir /s /q node_modules.vite 2>nul
echo.
echo 📦 Installation des dependances...
call pnpm install --no-frozen-lockfile
if errorlevel 1 (
echo ❌ Echec de l'installation
pause
exit /b 1
)
echo.
echo 🚀 Lancement du build...
call pnpm run build
if errorlevel 1 (
echo ❌ ECHEC DU BUILD - Consultez les erreurs ci-dessus
pause
exit /b 1
)
echo.
echo ✅ BUILD REUSSI ! Le dossier 'dist' a ete cree.
echo.
pause