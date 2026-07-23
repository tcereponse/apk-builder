@echo off
echo Nettoyage des anciens builds...
if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite
echo Construction du projet...
call npm run build
if %errorlevel% neq 0 (
 echo Erreur lors de la construction
 pause
 exit /b %errorlevel%
)
echo Build termine avec succes
pause