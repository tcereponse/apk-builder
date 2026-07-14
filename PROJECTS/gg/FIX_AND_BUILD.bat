@echo off
echo Nettoyage du cache...
rmdir /s /q node_modules
rmdir /s /q dist
del package-lock.json
echo Installation des dependances...
call npm install
echo Build du projet...
call npm run build
echo Build termine avec succes!