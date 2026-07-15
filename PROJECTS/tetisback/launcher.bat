@echo off
title FORGE LAUNCHER - TETISBACK
cd /d "%~dp0"
echo [FORGE] Lancement de TETISBACK...
if exist package.json (
if not exist node_modules.bin (
echo [FORGE] Dependances absentes. Installation...
call npm install
)
)
echo [FORGE] Demarrage dev server...
call npm run dev -- --host --port 5173
pause