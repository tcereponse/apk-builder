@echo off
title FORGE LAUNCHER - GAMETOBACKV2
cd /d "%~dp0"
echo [FORGE] Lancement de GAMETOBACKV2...
if exist package.json (
if not exist node_modules.bin (
echo [FORGE] Dependances absentes. Installation...
pnpm install --no-frozen-lockfile
)
)
echo [FORGE] Demarrage dev server...
pnpm run dev -- --host --port 5173
pause