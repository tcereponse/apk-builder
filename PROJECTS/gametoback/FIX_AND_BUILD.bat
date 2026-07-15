@echo off
cd /d "%~dp0"
echo === NETTOYAGE COMPLET ===
del /f /q package.js tsconfig.js tsconfig.node.js app.js App.ts pnpm-lock.yaml 2>nul
if exist src (
    cd src
    del /f /s /q *.vue >nul 2>&1
    cd ..
)
if exist node_modules (
    echo Suppression du dossier node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json del /f /q package-lock.json
if exist .vite del /f /q .vite 2>nul
echo === INSTALLATION ===
call pnpm install --no-frozen-lockfile
if errorlevel 1 (
    echo ERREUR INSTALLATION
    exit /b 1
)
echo === BUILD ===
call pnpm run build
if errorlevel 1 (
    echo ERREUR BUILD
    exit /b 1
)
echo === BUILD REUSSI ===