@echo off
rmdir /s /q node_modules
rmdir /s /q .vite
rmdir /s /q dist
npm install --legacy-peer-deps
npm run build