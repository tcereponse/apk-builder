@echo off
cd /d "%~dp0"
echo === NETTOYAGE ===
del /f /q package.js tsconfig.js tsconfig.node.js app.js App.ts pnpm-lock.yaml 2>nul
if exist src (
cd src
del /f /s /q *.vue >nul 2>&1
cd ..
)
if exist node_modules (
echo Suppression du dossier node_modules en cours...
rmdir /s /q node_modules
)
if exist package-lock.json del /f /q package-lock.json
echo === INSTALLATION ===
echo Installation des dependances...
call npm install
if errorlevel 1 (
echo ERREUR INSTALLATION
exit /b 1
)
echo === BUILD ===
call npm run build
if errorlevel 1 (
echo ERREUR BUILD
exit /b 1
)
Les fichiers ci-dessus corrigent le problème : ajout explicite d'esbuild en devDependencies et simplification du .npmrc. Exécute FIX_AND_BUILD.bat pour un build propre.