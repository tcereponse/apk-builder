@echo off
title FORGE LAUNCHER - SPORT TETRIS
cd /d "%~dp0"
echo [FORGE] Lancement de SPORT TETRIS...
if exist package.json (
if not exist node_modules.bin (
echo [FORGE] Dependances absentes. Installation...
npm install --legacy-peer-deps
)
)
echo [FORGE] Demarrage dev server...
npm run dev -- --host --port 5173
pause