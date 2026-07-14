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
echo Suppression du dossier node_modules en cours - cela peut prendre 1 a 2 minutes...
rmdir /s /q node_modules
)
if exist package-lock.json del /f /q package-lock.json
echo === INSTALLATION ===
echo Installation des dependances...
call npm install --legacy-peer-deps
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