@echo off
echo 🔧 Installation des dependances...
call pnpm install
if %errorlevel% neq 0 (
echo ❌ Erreur lors de l'installation
pause
exit /b %errorlevel%
)
echo 🚀 Demarrage du serveur de developpement...
call pnpm dev