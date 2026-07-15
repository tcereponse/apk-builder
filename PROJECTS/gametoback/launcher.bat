@echo off
title FORGE LAUNCHER - GAMETOBACK
cd /d "%~dp0"
echo [FORGE] Lancement de GAMETOBACK...
if exist package.json (
    if not exist node_modules\.bin (
        echo [FORGE] Dependances absentes. Installation...
        pnpm install --no-frozen-lockfile
    )
)
echo [FORGE] Demarrage dev server...
pnpm run dev -- --host --port 5173
pause