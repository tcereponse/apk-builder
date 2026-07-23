@echo off
echo Installation des dependances...
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
 echo Erreur lors de l'installation
 pause
 exit /b %errorlevel%
)
echo Lancement du serveur de developpement...
call npm run dev
pause